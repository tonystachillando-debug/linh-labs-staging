/**
 * AI Proofreader (Correttore di Bozze & Style Polisher) for Linh Labs
 */
export async function proofreadArticleContent(articleContent) {
  const provider = process.env.AI_PROVIDER || 'openrouter';
  const apiKey = process.env.OPENROUTER_API_KEY;
  const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

  const systemPrompt = `Sei l'Editor in Chief e Correttore di Bozze Ufficiale di Linh Labs.
Il tuo compito è revisionare, correggere e perfezionare il testo di una notizia o resoconto AI.

Direttive per la correzione di bozze:
1. Ortografia e Grammatica: Correggi qualsiasi errore grammaticale, di battitura o refuso in italiano.
2. Tono di Voce: Rendi il testo fluido, elegante, autorevole e moderno (stile Linh Labs).
3. Eliminazione Calchi dall'Inglese: Sostituisci anglicismi non necessari con espressioni italiane chiare e naturali (ad es. "inferenza" -> "capacità di calcolo/risposta").
4. Formattazione: Mantieni la punteggiatura impeccabile.

Input fornito:
- Titolo
- Riassunto in italiano
- Punti chiave (takeaways)

Restituisci ESCLUSIVAMENTE un JSON in questo formato:
{
  "title": "Titolo revisionato e corretto",
  "summary_it": "Sintesi italiana perfettamente corretta e fluida",
  "takeaways": [
    "Punto chiave 1 corretto",
    "Punto chiave 2 corretto"
  ],
  "corrections_made": [
    "Elenco sintetico delle correzioni grammaticali o di stile apportate"
  ]
}`;

  const userPrompt = `Ecco la bozza da revisionare:\n` +
    `Titolo: ${articleContent.title}\n` +
    `Sintesi: ${articleContent.summary_it}\n` +
    `Punti Chiave: ${(articleContent.takeaways || []).join('; ')}`;

  try {
    if (provider === 'ollama') {
      console.log('✏️ Correzione di bozze in corso con Ollama Locale...');
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
      console.log('✏️ Correzione di bozze in corso con OpenRouter (Gemini Flash)...');
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey || 'sk-or-dummy'}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://linhlabs.com'
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

      if (!response.ok) throw new Error(`OpenRouter HTTP ${response.status}`);
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '{}';
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('⚠️ Errore correzione bozze AI:', err.message);
    return {
      title: articleContent.title,
      summary_it: articleContent.summary_it,
      takeaways: articleContent.takeaways || [],
      corrections_made: ['Nessuna modifica (fallback manuale)']
    };
  }
}
