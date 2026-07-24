import fetch from 'node-fetch';

/**
 * Generate Instagram Carousel Copy using Local AI (Ollama) or OpenRouter fallback
 */
export async function generateCarouselCopy(articles) {
  const provider = process.env.AI_PROVIDER || 'openrouter';
  const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
  const apiKey = process.env.OPENROUTER_API_KEY;

  const systemPrompt = `Sei il Social Media Strategist AI di Linh Labs.
Il tuo compito è trasformare le notizie AI del giorno in un CAROSELLO INSTAGRAM virale ed altamente ingaggiante (formato 1080x1350px, 5-7 slide).

Requisiti per ogni slide:
- Slide 1 (Copertina): Titolo ad altissimo impatto (Hook), sottotitolo provocatorio e badge "LINH LABS AI RADAR".
- Slide 2..N (Notizie): 1 Notizia per slide con titolo breve, 2 frasi spiegazione e 2 punti chiave ("perché è importante").
- Ultima Slide (CTA): Invito all'azione chiaro ("Salva questo post", "Iscriviti alla Newsletter nel link in bio").

Restituisci ESCLUSIVAMENTE un JSON con la seguente struttura:
{
  "carousel_title": "Titolo generale del carosello",
  "slides": [
    {
      "slide_number": 1,
      "type": "cover",
      "tag": "NOTIZIE AI DEL GIORNO",
      "headline": "Cosa è successo oggi nell'AI?",
      "subtitle": "5 Novità che stanno cambiando il mercato"
    },
    {
      "slide_number": 2,
      "type": "content",
      "tag": "LLM & AGENTI",
      "headline": "Titolo Notizia 1",
      "body": "Sintesi chiara in 2 frasi...",
      "takeaways": ["Impatto 1", "Impatto 2"]
    },
    {
      "slide_number": 7,
      "type": "cta",
      "tag": "LINH LABS",
      "headline": "Rimani sempre aggiornato sull'AI",
      "body": "Leggi il resoconto completo e iscriviti alla newsletter quotidiana su linhlabs.com",
      "cta_button": "Link in Bio 🔗"
    }
  ]
}`;

  const newsSummary = articles.map((a, i) => `[Notizia ${i + 1}] ${a.title}: ${a.summary_it}`).join('\n');

  try {
    if (provider === 'ollama') {
      console.log('🤖 Generazione testo Carosello Instagram con Ollama Locale...');
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL || 'llama3',
          prompt: `${systemPrompt}\n\nEcco le notizie del giorno:\n${newsSummary}`,
          stream: false,
          format: 'json'
        })
      });

      if (!response.ok) throw new Error(`Ollama HTTP error ${response.status}`);
      const data = await response.json();
      return JSON.parse(data.response);
    } else {
      console.log('⚡ Generazione testo Carosello Instagram con OpenRouter...');
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey || 'sk-dummy'}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Ecco le notizie del giorno:\n${newsSummary}` }
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
    console.error('⚠️ AI Carousel text generation error, using structured fallback:', err.message);
    return {
      carousel_title: `Linh Labs AI Radar — ${new Date().toLocaleDateString('it-IT')}`,
      slides: [
        {
          slide_number: 1,
          type: 'cover',
          tag: 'LINH LABS AI RADAR',
          headline: 'Le Notizie AI del Giorno ⚡',
          subtitle: 'Resoconto quotidiano selezionato e sintetizzato'
        },
        ...articles.slice(0, 4).map((a, idx) => ({
          slide_number: idx + 2,
          type: 'content',
          tag: a.category || 'AI NEWS',
          headline: a.title,
          body: a.summary_it,
          takeaways: a.takeaways || []
        })),
        {
          slide_number: 6,
          type: 'cta',
          tag: 'LINH LABS',
          headline: 'Vuoi la versione completa?',
          body: 'Iscriviti alla newsletter quotidiana su linhlabs.com per ricevere tutti gli approfondimenti.',
          cta_button: 'Link in Bio 🔗'
        }
      ]
    };
  }
}

/**
 * Render visual HTML slides (1080x1350px Instagram vertical format) with Linh Labs branding
 */
export function renderInstagramCarouselHTML(carouselData) {
  const slides = carouselData.slides || [];
  const totalSlides = slides.length;

  const slideCardsHTML = slides.map(slide => {
    const isCover = slide.type === 'cover';
    const isCTA = slide.type === 'cta';

    return `
      <!-- Instagram Slide (1080x1350 Aspect Ratio Container) -->
      <div style="width:540px;height:675px;background:#020617;color:#ffffff;border:1px solid #1e293b;border-radius:24px;position:relative;overflow:hidden;box-sizing:border-[#1e293b];margin-bottom:30px;box-shadow:0 20px 50px rgba(0,0,0,0.6);font-family:'Space Grotesk', system-ui, sans-serif;display:flex;flex-direction:column;justify-content:space-between;padding:40px;">
        
        <!-- Background Glows -->
        <div style="position:absolute;top:-80px;right:-80px;width:300px;height:300px;background:rgba(124,58,237,0.2);filter:blur(80px);border-radius:50%;pointer-events:none;"></div>
        <div style="position:absolute;bottom:-80px;left:-80px;width:300px;height:300px;background:rgba(6,182,212,0.2);filter:blur(80px);border-radius:50%;pointer-events:none;"></div>

        <!-- Slide Header -->
        <div style="display:flex;justify-content:space-between;align-items:center;z-index:10;">
          <div style="font-size:16px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;">
            LINH<span style="color:#38bdf8;">LABS</span>
          </div>
          <div style="font-size:12px;font-weight:700;color:#64748b;background:rgba(255,255,255,0.05);padding:4px 12px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);">
            ${slide.slide_number} / ${totalSlides}
          </div>
        </div>

        <!-- Slide Body Content -->
        <div style="z-index:10;margin:auto 0;">
          <div style="display:inline-block;background:linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.2));border:1px solid rgba(124,58,237,0.4);color:#38bdf8;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:20px;">
            ${slide.tag || 'AI RADAR'}
          </div>

          <h2 style="margin:0 0 16px;font-size:${isCover ? '32px' : '22px'};font-weight:800;line-height:1.25;color:#ffffff;letter-spacing:-0.02em;">
            ${slide.headline}
          </h2>

          ${slide.subtitle ? `<p style="margin:0 0 20px;font-size:16px;color:#94a3b8;line-height:1.5;font-family:'Inter',sans-serif;">${slide.subtitle}</p>` : ''}
          ${slide.body ? `<p style="margin:0 0 20px;font-size:14px;color:#cbd5e1;line-height:1.6;font-family:'Inter',sans-serif;">${slide.body}</p>` : ''}

          ${slide.takeaways && slide.takeaways.length > 0 ? `
            <div style="background:rgba(15,23,42,0.8);border-left:3px solid #38bdf8;padding:14px 16px;border-radius:0 12px 12px 0;margin-top:16px;">
              <span style="font-size:11px;color:#38bdf8;font-weight:800;text-transform:uppercase;display:block;margin-bottom:6px;">Punti Chiave:</span>
              <ul style="margin:0;padding-left:16px;font-size:12px;color:#94a3b8;font-family:'Inter',sans-serif;line-height:1.5;">
                ${slide.takeaways.map(t => `<li style="margin-bottom:4px;">${t}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${isCTA ? `
            <div style="margin-top:24px;text-align:center;">
              <span style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#ffffff;padding:14px 32px;border-radius:50px;font-weight:800;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;">
                ${slide.cta_button || 'Link in Bio 🔗'}
              </span>
            </div>
          ` : ''}
        </div>

        <!-- Slide Footer -->
        <div style="display:flex;justify-content:space-between;align-items:center;z-index:10;border-top:1px solid rgba(255,255,255,0.08);padding-top:14px;font-size:11px;color:#64748b;font-family:'Inter',sans-serif;">
          <span>linhlabs.com</span>
          <span>Scorri →</span>
        </div>

      </div>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Instagram Carousel Generator — Linh Labs</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body { background: #0b0f19; color: #fff; font-family: 'Inter', sans-serif; padding: 40px; display: flex; flex-direction: column; align-items: center; }
    h1 { font-family: 'Space Grotesk', sans-serif; margin-bottom: 10px; }
    p { color: #94a3b8; margin-bottom: 30px; }
    .slides-container { display: flex; flex-wrap: wrap; gap: 30px; justify-content: center; }
  </style>
</head>
<body>
  <h1>📸 Carosello Instagram Linh Labs (AI Generator)</h1>
  <p>Formato ottimizzato 1080x1350px per Instagram. Fai uno screenshot/export delle slide pronte da pubblicare!</p>
  
  <div class="slides-container">
    ${slideCardsHTML}
  </div>
</body>
</html>`;
}
