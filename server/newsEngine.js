import { isArticleDuplicate, saveArticles } from './db.js';
import { rankAndSortArticles } from './newsRanking.js';

const FEEDS = [
  { name: 'OpenAI Blog', url: 'https://openai.com/news/rss.xml' },
  { name: 'ArXiv AI Digest', url: 'http://export.arxiv.org/rss/cs.AI' },
  { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml' },
  { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/' }
];

function parseRSS(xmlText, sourceName) {
  const items = [];
  const itemRegex = /<item[\s\S]*?>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const content = match[1];

    const titleMatch = content.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    const linkMatch = content.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
    const pubDateMatch = content.match(/<pubDate>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i) || content.match(/<dc:date>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/dc:date>/i);
    const descMatch = content.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);

    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    let url = linkMatch ? linkMatch[1].trim() : '';
    let pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();
    let desc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    if (title && url) {
      items.push({
        title,
        url,
        source: sourceName,
        published_at: pubDate,
        raw_description: desc.slice(0, 1000)
      });
    }
  }
  return items;
}

// Call AI Provider with STRICT 5-6 LINES MAX REWRITING PROMPT
async function summarizeWithAI(rawNewsList) {
  const provider = process.env.AI_PROVIDER || 'openrouter';
  const apiKey = process.env.OPENROUTER_API_KEY;
  const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

  const systemPrompt = `Sei il Chief Science & Tech Writer di Linh Labs.
Il tuo compito è analizzare la notizia originale e SCRIVERE UN RIASSUNTO COMPLETAMENTE ORIGINALE IN ITALIANO (NO COPIA-INCOLLA) DI MASSIMO 5-6 RIGHE TOTALI.

REGOLE RIGIDE:
1. LUNGHEZZA: Massimo 5-6 righe di testo in totale per ogni notizia (circa 50-70 parole).
2. RIELABORAZIONE: Non fare MAI copia-incolla delle frasi originali. Riscrivi da zero in italiano fluido, chiaro ed essenziale.
3. CONTENUTO: Cattura il senso dell'intera notizia (cosa è successo, perché è importante e qual è l'impatto).

Restituisci un JSON in formato ARRAY:
[
  {
    "title": "Titolo d'impatto in italiano (Max 1 riga)",
    "summary_it": "Riassunto sintetico di massimo 5-6 righe in italiano scorrevole che spiega l'intero senso della notizia senza copia-incolla.",
    "takeaways": [
      "Punto chiave 1",
      "Punto chiave 2"
    ],
    "category": "Una tra: 'LLM & Agenti', 'AI Enterprise', 'Infrastruttura & Hardware', 'Ricerca & Modelli', 'Strategia & Mercato'",
    "source_url": "URL originale"
  }
]
Restituisci ESCLUSIVAMENTE il JSON valido.`;

  const userPrompt = `Ecco le notizie da rielaborare da zero:\n` +
    rawNewsList.map((n, i) => `[${i + 1}] Titolo: ${n.title}\nFonte: ${n.source}\nURL: ${n.url}\nContesto completo: ${n.raw_description}\n`).join('\n---\n');

  try {
    if (provider === 'ollama') {
      console.log('🤖 Sintesi originale (5-6 righe max) con Ollama...');
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL || 'llama3',
          prompt: `${systemPrompt}\n\n${userPrompt}`,
          stream: false,
          format: 'json'
        })
      });

      if (!response.ok) throw new Error(`Ollama HTTP error ${response.status}`);
      const data = await response.json();
      return JSON.parse(data.response);
    } else {
      console.log('⚡ Sintesi originale (5-6 righe max) con OpenRouter (Gemini Flash)...');
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey || 'sk-or-dummy'}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://linhlabs.com',
          'X-Title': 'Linh Labs AI Radar'
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter HTTP ${response.status}: ${errText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '[]';
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : (parsed.news || parsed.articles || [parsed]);
    }
  } catch (err) {
    console.error('❌ Errore durante la sintesi originale:', err.message);
    return rawNewsList.map(n => ({
      title: n.title,
      summary_it: n.raw_description.slice(0, 250) + '...',
      takeaways: ['Notizia del giorno da fonte ufficiale', 'Approfondisci al link della fonte'],
      category: 'Novità AI',
      source_url: n.url
    }));
  }
}

export async function runNewsScan() {
  console.log('🌐 Avvio scansione testate AI...');
  const rawCandidates = [];

  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, { headers: { 'User-Agent': 'LinhLabs-Bot/1.0' } });
      if (!res.ok) continue;

      const xml = await res.text();
      const items = parseRSS(xml, feed.name);

      for (const item of items) {
        if (!isArticleDuplicate(item.url, item.title)) {
          rawCandidates.push(item);
        } else {
          console.log(`⏭️ Skippata notizia già presente in DB: "${item.title.slice(0, 40)}..."`);
        }
      }
    } catch (err) {
      console.warn(`⚠️ Impossibile scaricare RSS da ${feed.name}:`, err.message);
    }
  }

  if (rawCandidates.length === 0) {
    console.log('✅ Nessuna nuova notizia da pubblicare oggi (tutte già elaborate).');
    return { added: 0, articles: [] };
  }

  const rankedCandidates = rankAndSortArticles(rawCandidates);
  console.log(`📊 Valutazione oggettiva completata. Top 5 notizie selezionate da un totale di ${rankedCandidates.length} candidate.`);

  const selectedCandidates = rankedCandidates.slice(0, 5);
  const aiSummaries = await summarizeWithAI(selectedCandidates);

  const finalArticles = aiSummaries.map((s, idx) => {
    const raw = selectedCandidates[idx] || {};
    return {
      title: s.title || raw.title,
      url: s.source_url || raw.url,
      source: raw.source || 'Linh Labs AI Radar',
      category: s.category || 'AI Innovation',
      published_at: raw.published_at || new Date().toISOString(),
      summary_it: s.summary_it || raw.raw_description,
      takeaways: s.takeaways || [],
      ranking_scores: raw.ranking_scores || { total_score: 85 }
    };
  });

  const addedCount = saveArticles(finalArticles);
  console.log(`🎉 Inserite con successo ${addedCount} notizie (5-6 righe max) nel database Linh Labs.`);

  return { added: addedCount, articles: finalArticles };
}
