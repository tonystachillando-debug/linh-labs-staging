import { getConfirmedSubscribers, getPendingNewsletterArticles, markArticlesAsSent } from './db.js';

export async function sendDailyNewsletter(transporter, siteUrl = 'https://linhlabs.com') {
  const articles = getPendingNewsletterArticles();
  if (articles.length === 0) {
    console.log('ℹ️ Nessuna notizia pendente da inviare via newsletter.');
    return { success: true, count: 0, recipientCount: 0 };
  }

  const subscribers = getConfirmedSubscribers('email');
  if (subscribers.length === 0) {
    console.log('ℹ️ Nessun iscritto confermato a cui inviare la newsletter.');
    return { success: true, count: articles.length, recipientCount: 0 };
  }

  console.log(`📧 Preparazione invio Newsletter a ${subscribers.length} iscritti con ${articles.length} notizie...`);

  const todayStr = new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // Render modern email cards for each article
  const articlesHtml = articles.map(art => `
    <div style="background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:28px;margin-bottom:24px;box-shadow:0 4px 20px rgba(0,0,0,0.2);">
      <div style="display:inline-block;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);color:#c084fc;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.08em;">
        ${art.category || 'AI Radar'}
      </div>
      <h3 style="margin:0 0 14px;font-family:'Space Grotesk', -apple-system, sans-serif;font-size:20px;font-weight:700;color:#ffffff;line-height:1.35;">
        ${art.title}
      </h3>
      <p style="margin:0 0 18px;font-family:'Inter', sans-serif;font-size:14px;color:#cbd5e1;line-height:1.65;">
        ${art.summary_it}
      </p>
      
      ${art.takeaways && art.takeaways.length > 0 ? `
        <div style="background:#020617;border-left:3px solid #06b6d4;padding:14px 18px;border-radius:0 10px 10px 0;margin-bottom:18px;">
          <strong style="display:block;font-size:11px;color:#22d3ee;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.06em;">Punti Chiave:</strong>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:#94a3b8;line-height:1.6;">
            ${art.takeaways.map(t => `<li style="margin-bottom:4px;">${t}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="font-size:12px;color:#64748b;display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid #1e293b;">
        <span>Fonte: <strong>${art.source}</strong></span>
        <a href="${art.url}" target="_blank" style="color:#38bdf8;text-decoration:none;font-weight:700;">Leggi Fonte Originale →</a>
      </div>
    </div>
  `).join('');

  let sentCount = 0;

  for (const sub of subscribers) {
    const unsubUrl = `${siteUrl}/api/unsubscribe?token=${sub.confirmation_token || sub.id}`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Linh Labs AI Radar</title>
</head>
<body style="margin:0;padding:0;background-color:#020617;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#020617;padding:40px 16px;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#0b0f19;border:1px solid #1e293b;border-radius:24px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.5);">
        
        <!-- Linh Labs Header -->
        <tr><td style="background:linear-gradient(135deg, #020617 0%, #1e1b4b 50%, #0f172a 100%);padding:40px 40px 32px;text-align:left;border-bottom:1px solid #1e293b;">
          <div style="margin-bottom:16px;">
            <span style="font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;">LINH<span style="color:#38bdf8;">LABS</span></span>
            <span style="display:block;font-size:10px;color:#94a3b8;letter-spacing:0.15em;text-transform:uppercase;margin-top:2px;">YOUR AI PARTNER</span>
          </div>
          
          <div style="display:inline-block;background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.3);color:#38bdf8;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;">
            DAILY AI RADAR
          </div>

          <h1 style="margin:0;font-family:'Space Grotesk',sans-serif;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;">
            Le Novità AI del Giorno 🚀
          </h1>
          <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;font-weight:500;">
            ${todayStr}
          </p>
        </td></tr>

        <!-- Intro -->
        <tr><td style="padding:32px 40px 12px;">
          <p style="margin:0;font-size:15px;color:#e2e8f0;line-height:1.7;">
            Ecco la tua selezione quotidiana curata dall'IA di Linh Labs. Abbiamo scansionato i principali centri di ricerca e testate internazionali, sintetizzando solo l'essenziale in italiano.
          </p>
        </td></tr>

        <!-- News Cards Section -->
        <tr><td style="padding:20px 40px 24px;">
          ${articlesHtml}
        </td></tr>

        <!-- Call To Action -->
        <tr><td style="padding:12px 40px 36px;text-align:center;">
          <a href="${siteUrl}" style="display:inline-block;background:linear-gradient(135deg, #7c3aed, #06b6d4);color:#ffffff;text-decoration:none;padding:16px 36px;border-radius:50px;font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;box-shadow:0 4px 20px rgba(124,58,237,0.4);">
            Esplora Linh Labs sul Sito →
          </a>
        </td></tr>

        <!-- Footer GDPR -->
        <tr><td style="background:#020617;padding:28px 40px;text-align:center;border-top:1px solid #1e293b;">
          <p style="margin:0 0 10px;color:#64748b;font-size:12px;line-height:1.5;">
            Ricevi questa email perché sei iscritto alla Newsletter AI di Linh Labs (GDPR EU 2016/679).
          </p>
          <p style="margin:0;color:#475569;font-size:11px;">
            <a href="${unsubUrl}" style="color:#94a3b8;text-decoration:underline;">Disiscriviti con 1 click</a> · <a href="${siteUrl}" style="color:#94a3b8;text-decoration:underline;">Privacy Policy</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    try {
      await transporter.sendMail({
        from: `"Linh Labs AI Radar" <${process.env.SMTP_USER}>`,
        to: sub.email,
        subject: `⚡ Linh Labs AI Radar — ${articles.length} novità di oggi (${todayStr})`,
        html: htmlBody
      });
      sentCount++;
    } catch (err) {
      console.error(`❌ Impossibile inviare newsletter a ${sub.email}:`, err.message);
    }
  }

  markArticlesAsSent(articles.map(a => a.id));
  console.log(`✅ Newsletter inviata a ${sentCount} iscritti.`);
  return { success: true, count: articles.length, recipientCount: sentCount };
}
