import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import { getLatestArticles, addSubscriber, confirmSubscriber, unsubscribeSubscriber } from './server/db.js';
import { runNewsScan } from './server/newsEngine.js';
import { sendDailyNewsletter } from './server/newsletter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
dotenv.config({ path: resolve(__dirname, '.env.local') });

const app = express();
app.use(cors());
app.use(express.json());

// Create reusable SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // TLS/SSL on port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Ergonet/Aruba uses certificates Node doesn't trust by default
  },
});

// Verify SMTP connection on startup
transporter.verify()
  .then(() => console.log('✅ SMTP connection verified'))
  .catch((err) => console.error('❌ SMTP connection error:', err));

// ─── 1. LEAD QUIZ SUBMISSION ENDPOINT ──────────────────────────────────────
app.post('/api/lead', async (req, res) => {
  try {
    const { name, email, company, phone, score, profile, services, answers, lang } = req.body;
    const isIT = lang !== 'en';

    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Name, email, and company are required.' });
    }

    const answersHtml = answers
      ? answers.map((a, i) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;">Q${i + 1}: ${a.question}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:13px;">${a.answer}</td></tr>`).join('')
      : '';

    const servicesHtml = (services && services.length > 0)
      ? services.map(s => `<span style="display:inline-block;background:#7c3aed20;color:#7c3aed;padding:4px 12px;border-radius:20px;font-size:12px;margin:2px 4px;font-weight:600;">${s}</span>`).join(' ')
      : '<span style="color:#999;font-style:italic;">Nessun servizio selezionato</span>';

    const langBadge = isIT
      ? `<span style="display:inline-block;background:#16a34a20;color:#16a34a;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;">🇮🇹 IT</span>`
      : `<span style="display:inline-block;background:#2563eb20;color:#2563eb;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;">🇬🇧 EN</span>`;

    const internalHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:32px 40px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">🚀 Nuovo Lead — Valutazione AI</h1>
            &nbsp;&nbsp;${langBadge}
          </div>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Profilo: <strong>${profile}</strong> (Score: ${score}/12)</p>
        </td></tr>
        <tr><td style="padding:32px 40px 20px;">
          <h2 style="margin:0 0 16px;font-size:16px;color:#1e293b;border-bottom:2px solid #7c3aed;padding-bottom:8px;">📋 Informazioni Contatto</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:120px;">Nome</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#1e293b;">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Email</td><td style="padding:6px 0;font-size:14px;"><a href="mailto:${email}" style="color:#7c3aed;text-decoration:none;">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Azienda</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#1e293b;">${company}</td></tr>
            ${phone ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Telefono</td><td style="padding:6px 0;font-size:14px;color:#1e293b;">${phone}</td></tr>` : ''}
          </table>
        </td></tr>
        <tr><td style="padding:12px 40px 20px;">
          <h2 style="margin:0 0 12px;font-size:16px;color:#1e293b;border-bottom:2px solid #06b6d4;padding-bottom:8px;">🎯 Servizi di Interesse</h2>
          <div style="padding:4px 0;">${servicesHtml}</div>
        </td></tr>
        <tr><td style="padding:12px 40px 32px;">
          <h2 style="margin:0 0 12px;font-size:16px;color:#1e293b;border-bottom:2px solid #f59e0b;padding-bottom:8px;">📝 Risposte Valutazione</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden;">
            ${answersHtml}
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Linh Labs Lead Quiz" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `🚀 Nuovo Lead: ${name} — ${company} (${profile})`,
      text: `NUOVO LEAD\nNome: ${name}\nEmail: ${email}\nAzienda: ${company}\nLingua: ${lang || 'it'}`,
      html: internalHtml,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ error: 'Failed to send lead email.' });
  }
});

// ─── 2. AI NEWS & DEDUPLICATION API ENDPOINTS ─────────────────────────────

// Get latest AI articles for website feed
app.get('/api/news/latest', (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const articles = getLatestArticles(limit);
    res.json({ success: true, articles });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Trigger daily news scan & deduplication loop
app.post('/api/news/trigger-scan', async (req, res) => {
  try {
    const result = await runNewsScan();
    res.json({ success: true, ...result });
  } catch (err) {
    console.error('❌ Error during news scan trigger:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Trigger daily newsletter broadcast
app.post('/api/news/trigger-newsletter', async (req, res) => {
  try {
    const siteUrl = `${req.protocol}://${req.get('host')}`;
    const result = await sendDailyNewsletter(transporter, siteUrl);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error('❌ Error triggering newsletter:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── 3. GDPR NEWSLETTER SUBSCRIPTION ENDPOINTS ─────────────────────────────

// Subscribe endpoint with double opt-in email
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, phone, channel, consent } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Un indirizzo email valido è obbligatorio.' });
    }

    if (!consent) {
      return res.status(400).json({ success: false, error: 'È necessario accettare l’informativa sulla Privacy (GDPR).' });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const { subscriber, isNew, alreadyActive } = addSubscriber({ email, phone, channel: channel || 'email', ip: clientIp });

    if (alreadyActive) {
      return res.json({ success: true, message: 'Risulti già iscritto e attivo alla nostra newsletter AI!' });
    }

    // Send Double Opt-in confirmation email
    const confirmUrl = `${req.protocol}://${req.get('host')}/api/confirm-subscription?token=${subscriber.confirmation_token}`;

    const confirmationHtml = `
<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;padding:30px 15px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center">
      <table width="560" style="background:#fff;border-radius:14px;padding:32px;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
        <h2 style="color:#0f172a;margin-top:0;">Conferma la tua iscrizione a Linh Labs AI Radar ⚡</h2>
        <p style="color:#475569;font-size:15px;line-height:1.6;">
          Grazie per esserti iscritto al resoconto quotidiano sull'Intelligenza Artificiale di Linh Labs.
        </p>
        <p style="color:#475569;font-size:15px;line-height:1.6;">
          Per completare l'iscrizione ai sensi della normativa GDPR (EU 2016/679), per favore conferma la tua email cliccando sul pulsante sottostante:
        </p>
        <div style="text-align:center;margin:30px 0;">
          <a href="${confirmUrl}" style="background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;display:inline-block;">Conferma Iscrizione (Double Opt-In) →</a>
        </div>
        <p style="color:#94a3b8;font-size:12px;">Se non hai richiesto tu questa iscrizione, puoi ignorare questa email.</p>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Linh Labs Newsletter" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `⚡ Conferma la tua iscrizione — Linh Labs AI Radar`,
      html: confirmationHtml
    });

    res.json({
      success: true,
      message: 'Ti abbiamo inviato un’email di conferma (Double Opt-In). Clicca sul link nell’email per attivare l’iscrizione.'
    });
  } catch (err) {
    console.error('❌ Error processing subscription:', err);
    res.status(500).json({ success: false, error: 'Impossibile completare l’iscrizione.' });
  }
});

// Double opt-in confirmation handler
app.get('/api/confirm-subscription', (req, res) => {
  const { token } = req.query;
  const subscriber = confirmSubscriber(token);

  if (!subscriber) {
    return res.status(400).send(`
      <div style="font-family:sans-serif;text-align:center;padding:50px;">
        <h2 style="color:#ef4444;">Token di conferma non valido o scaduto.</h2>
      </div>
    `);
  }

  res.send(`
    <div style="font-family:sans-serif;text-align:center;padding:50px;background:#0f172a;color:#fff;min-height:100vh;">
      <h1 style="color:#38bdf8;">Iscrizione Confermata! 🎉</h1>
      <p style="color:#94a3b8;font-size:16px;">Ora sei iscritto a Linh Labs AI Radar. Riceverai ogni giorno le notizie più importanti dal mondo dell'Intelligenza Artificiale.</p>
      <a href="/" style="display:inline-block;margin-top:20px;padding:12px 28px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:30px;font-weight:bold;">Torna al Sito</a>
    </div>
  `);
});

// One-click unsubscribe handler (GDPR compliant)
app.get('/api/unsubscribe', (req, res) => {
  const { token } = req.query;
  const unsubbed = unsubscribeSubscriber(token);

  if (!unsubbed) {
    return res.status(400).send('<div style="font-family:sans-serif;padding:40px;text-align:center;">Link di disiscrizione non valido.</div>');
  }

  res.send(`
    <div style="font-family:sans-serif;text-align:center;padding:50px;background:#f8fafc;">
      <h2 style="color:#334155;">Ti sei disiscritto con successo. 👋</h2>
      <p style="color:#64748b;">Non riceverai più la newsletter quotidiana di Linh Labs.</p>
    </div>
  `);
});

// ─── 4. WHATSAPP BOT HOOK PLACEHOLDER (FOR FUTURE AUTOMATION) ─────────────
app.post('/api/whatsapp/webhook', async (req, res) => {
  try {
    const { phone, message, consent } = req.body;
    console.log('📱 Ricevuta richiesta iscrizione WhatsApp:', { phone, message, consent });

    if (phone && consent) {
      addSubscriber({ email: `${phone}@whatsapp.linhlabs`, phone, channel: 'whatsapp' });
      return res.json({ success: true, reply: 'Iscrizione WhatsApp Linh Labs registrata con successo! Riceverai gli alert AI giornalieri.' });
    }

    res.json({ success: true, message: 'WhatsApp webhook ready' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Linh Labs API & AI News Server running on http://localhost:${PORT}`);
});
