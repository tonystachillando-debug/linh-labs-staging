import { getConfirmedSubscribers, getPendingNewsletterArticles, markArticlesAsSent } from './db.js';

export async function sendDailyNewsletter(transporter, siteUrl = 'https://linhlabs.it') {
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

  const articlesHtml = articles.map(art => `
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="display:inline-block;background:linear-gradient(135deg,#7c3aed20,#06b6d420);color:#7c3aed;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.05em;">
        ${art.category || 'AI News'}
      </div>
      <h3 style="margin:0 0 12px;font-size:18px;color:#0f172a;line-height:1.4;">${art.title}</h3>
      <p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.6;">${art.summary_it}</p>
      
      ${art.takeaways && art.takeaways.length > 0 ? `
        <div style="background:#f8fafc;border-left:3px solid #7c3aed;padding:12px 16px;border-radius:0 8px 8px 0;margin-bottom:16px;">
          <strong style="display:block;font-size:12px;color:#334155;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.04em;">Key Takeaways:</strong>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:#334155;line-height:1.5;">
            ${art.takeaways.map(t => `<li style="margin-bottom:4px;">${t}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="font-size:12px;color:#94a3b8;display:flex;justify-content:space-between;align-items:center;">
        <span>Fonte: ${art.source}</span>
        <a href="${art.url}" target="_blank" style="color:#7c3aed;text-decoration:none;font-weight:600;">Leggi notizia originale →</a>
      </div>
    </div>
  `).join('');

  let sentCount = 0;

  for (const sub of subscribers) {
    const unsubUrl = `${siteUrl}/api/unsubscribe?token=${sub.confirmation_token || sub.id}`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0f172a,#1e1b4b);padding:36px 40px;text-align:left;">
          <div style="font-size:12px;color:#06b6d4;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">LINH LABS · DAILY AI RADAR</div>
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.02em;">Le Novità AI del Giorno 🚀</h1>
          <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">${todayStr}</p>
        </td></tr>

        <!-- Intro -->
        <tr><td style="padding:32px 40px 10px;">
          <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;">
            Ecco la tua selezione quotidiana curata dall'IA di Linh Labs. Abbiamo scansionato le principali testate internazionali ed eliminato i duplicati per offrirti solo l'essenziale.
          </p>
        </td></tr>

        <!-- Articles Digest -->
        <tr><td style="padding:20px 40px 20px;">
          ${articlesHtml}
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:10px 40px 32px;text-align:center;">
          <a href="${siteUrl}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:14px;font-weight:700;">Visita Linh Labs per altri approfondimenti AI →</a>
        </td></tr>

        <!-- Footer GDPR -->
        <tr><td style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
          <p style="margin:0 0 8px;color:#64748b;font-size:12px;">Ricevi questa email perché sei iscritto alla Newsletter AI di Linh Labs (GDPR EU 2016/679).</p>
          <p style="margin:0;color:#94a3b8;font-size:11px;">
            <a href="${unsubUrl}" style="color:#64748b;text-decoration:underline;">Disiscriviti con 1 click</a> · <a href="${siteUrl}/privacy" style="color:#64748b;text-decoration:underline;">Privacy Policy</a>
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
