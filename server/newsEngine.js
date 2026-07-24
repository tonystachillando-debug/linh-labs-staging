import { isArticleDuplicate, saveArticles } from './db.js';

// Pre-configured top RSS feeds for daily AI news
const FEEDS = [
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
  { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/' },
  { name: 'OpenAI Blog', url: 'https://openai.com/news/rss.xml' },
  { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml' },
  { name: 'ArXiv AI Digest', url: 'http://export.arxiv.org/rss/cs.AI' }
];

// Helper to extract items from RSS XML text without heavy external libraries
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
        raw_description: desc.slice(0, 500)
      });
    }
  }
  return items;
}

// Call AI Provider (OpenRouter Gemini Flash OR Local Ollama)
async function summarizeWithAI(rawNewsList) {
  const provider = process.env.AI_PROVIDER || 'openrouter'; // 'openrouter' or 'ollama'
  const apiKey = process.env.OPENROUTER_API_KEY;
  const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

  const systemPrompt = `Sei l'Analista Strategico AI di Linh Labs (laboratorio di intelligenza artificiale applicata).
Il tuo compito è analizzare le notizie AI grezze del giorno, selezionare le più rilevanti e creare un resoconto chiaro, professionale e in italiano impeccabile.

Per ogni notizia valida, fornisci un JSON in formato ARRAY di oggetti con le seguenti proprietà:
[
  {
    "title": "Titolo d'impatto in italiano",
    "summary_it": "Riassunto chiaro in 2-3 frasi di cosa è successo e perché è importante.",
    "takeaways": [
      "Punto chiave 1",
      "Punto chiave 2",
      "Punto chiave 3"
    ],
    "category": "Una tra: 'LLM & Agenti', 'AI Enterprise', 'Infrastruttura & Hardware', 'Ricerca & Modelli', 'Strategia & Mercato'",
    "source_url": "URL originale della notizia"
  }
]
Restituisci ESCLUSIVAMENTE il JSON valido, senza testo introduttivo o markdown superfluo.`;

  const userPrompt = `Ecco le notizie del giorno estratte dalle testate internazionali:\n` +
    rawNewsList.map((n, i) => `[${i + 1}] Titolo: ${n.title}\nFonte: ${n.source}\nURL: ${n.url}\nContesto: ${n.raw_description}\n`).join('\n---\n');

  try {
    if (provider === 'ollama') {
      console.log('🤖 Scansione AI via Ollama Locale...');
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
      console.log('⚡ Scansione AI via OpenRouter (Gemini Flash)...');
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey || 'sk-or-dummy'}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://linhlabs.it',
          'X-Title': 'Linh Labs Daily AI News'
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
    console.error('❌ Errore durante il processo di summarization AI:', err.message);
    return rawNewsList.map(n => ({
      title: n.title,
      summary_it: n.raw_description.slice(0, 200) + '...',
      takeaways: ['Notizia del giorno da fonte ufficiale', 'Approfondisci al link della fonte'],
      category: 'Novità AI',
      source_url: n.url
    }));
  }
}

// Main scanner runner
export async function runNewsScan() {
  console.log('🌐 Avvio scansione testate AI...');
  const candidates = [];

  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, { headers: { 'User-Agent': 'LinhLabs-Bot/1.0' } });
      if (!res.ok) continue;

      const xml = await res.text();
      const items = parseRSS(xml, feed.name);

      for (const item of items) {
        if (!isArticleDuplicate(item.url, item.title)) {
          candidates.push(item);
        } else {
          console.log(`⏭️ Skippata notizia già presente in DB: "${item.title.slice(0, 40)}..."`);
        }
      }
    } catch (err) {
      console.warn(`⚠️ Impossibile scaricare RSS da ${feed.name}:`, err.message);
    }
  }

  if (candidates.length === 0) {
    console.log('✅ Nessuna nuova notizia da pubblicare oggi (tutte già elaborate).');
    return { added: 0, articles: [] };
  }

  console.log(`🔎 Trovate ${candidates.length} notizie non lette in precedenza. Elaborazione con AI...`);
  const selectedCandidates = candidates.slice(0, 6);
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
      takeaways: s.takeaways || []
    };
  });

  const addedCount = saveArticles(finalArticles);
  console.log(`🎉 Inserite con successo ${addedCount} nuove notizie uniche nel database Linh Labs.`);

  return { added: addedCount, articles: finalArticles };
}
