import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

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

// Lead Quiz submission endpoint
app.post('/api/lead', async (req, res) => {
  try {
    const { name, email, company, phone, score, profile, services, answers, lang } = req.body;
    const isIT = lang !== 'en'; // default italiano se manca

    // Validate required fields
    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Name, email, and company are required.' });
    }

    // ─── 1. INTERNAL TEAM EMAIL ────────────────────────────────────────────────

    const answersHtml = answers
      .map((a, i) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;">Q${i + 1}: ${a.question}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:13px;">${a.answer}</td></tr>`)
      .join('');

    const servicesHtml = services.length > 0
      ? services.map(s => `<span style="display:inline-block;background:#7c3aed20;color:#7c3aed;padding:4px 12px;border-radius:20px;font-size:12px;margin:2px 4px;font-weight:600;">${s}</span>`).join(' ')
      : '<span style="color:#999;font-style:italic;">Nessun servizio selezionato</span>';

    const langBadge = isIT
      ? `<span style="display:inline-block;background:#16a34a20;color:#16a34a;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;letter-spacing:0.05em;">🇮🇹 IT</span>`
      : `<span style="display:inline-block;background:#2563eb20;color:#2563eb;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;letter-spacing:0.05em;">🇬🇧 EN</span>`;

    const internalHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:32px 40px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;display:inline;">🚀 Nuovo Lead — Valutazione AI</h1>
            &nbsp;&nbsp;${langBadge}
          </div>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Profilo: <strong>${profile}</strong> (Score: ${score}/12)</p>
        </td></tr>

        <!-- Contact Info -->
        <tr><td style="padding:32px 40px 20px;">
          <h2 style="margin:0 0 16px;font-size:16px;color:#1e293b;border-bottom:2px solid #7c3aed;padding-bottom:8px;">📋 Informazioni Contatto</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:120px;">Nome</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#1e293b;">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Email</td><td style="padding:6px 0;font-size:14px;"><a href="mailto:${email}" style="color:#7c3aed;text-decoration:none;">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Azienda</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#1e293b;">${company}</td></tr>
            ${phone ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px;">Telefono</td><td style="padding:6px 0;font-size:14px;color:#1e293b;">${phone}</td></tr>` : ''}
          </table>
        </td></tr>

        <!-- Services -->
        <tr><td style="padding:12px 40px 20px;">
          <h2 style="margin:0 0 12px;font-size:16px;color:#1e293b;border-bottom:2px solid #06b6d4;padding-bottom:8px;">🎯 Servizi di Interesse</h2>
          <div style="padding:4px 0;">${servicesHtml}</div>
        </td></tr>

        <!-- Quiz Answers -->
        <tr><td style="padding:12px 40px 32px;">
          <h2 style="margin:0 0 12px;font-size:16px;color:#1e293b;border-bottom:2px solid #f59e0b;padding-bottom:8px;">📝 Risposte Valutazione</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden;">
            ${answersHtml}
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:#94a3b8;font-size:11px;">Inviata automaticamente da Linh Labs Lead Quiz</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Linh Labs Lead Quiz" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `🚀 Nuovo Lead: ${name} — ${company} (${profile})`,
      text: `NUOVO LEAD\nNome: ${name}\nEmail: ${email}\nAzienda: ${company}\nLingua: ${lang || 'it'}\nProfilo: ${profile} (Score: ${score}/12)\nServizi: ${services.join(', ') || 'nessuno'}`,
      html: internalHtml,
    });

    console.log(`✅ Internal lead email sent: ${name} <${email}> — ${profile} [${lang || 'it'}]`);

    // ─── 2. THANK YOU EMAIL TO LEAD ────────────────────────────────────────────

    const thankYouSubject = isIT
      ? `Grazie per averci contattato, ${name.split(' ')[0]}!`
      : `Thank you for reaching out, ${name.split(' ')[0]}!`;

    const thankYouHtml = isIT ? `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:40px 40px 36px;text-align:center;">
          <p style="margin:0 0 16px;font-size:40px;">✨</p>
          <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3;">Grazie, ${name.split(' ')[0]}!</h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Linh Labs — AI Consulting</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px 40px 32px;">
          <p style="margin:0 0 20px;font-size:15px;color:#334155;line-height:1.8;">
            Ti ringraziamo per averci contattato. Abbiamo ricevuto il tuo messaggio e un membro del nostro team tecnico lo sta già esaminando per capire come le nostre soluzioni AI possano integrarsi al meglio con i vostri processi attuali.
          </p>
          <p style="margin:0 0 32px;font-size:15px;color:#334155;line-height:1.8;">
            Ti contatteremo nelle prossime <strong style="color:#7c3aed;">24/48 ore</strong> per fissare una prima call conoscitiva.
          </p>

          <!-- CTA -->
          <div style="text-align:center;margin-bottom:32px;">
            <a href="https://linhlabs.it" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:700;letter-spacing:0.05em;">Visita il nostro sito →</a>
          </div>

          <!-- Divider -->
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 28px;">

          <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;">
            A presto,<br>
            <strong style="color:#1e293b;">Il Team di LinhLabs</strong>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:#94a3b8;font-size:11px;">© 2025 Linh Labs · AI Consulting · <a href="https://linhlabs.it" style="color:#94a3b8;">linhlabs.it</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>` : `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:40px 40px 36px;text-align:center;">
          <p style="margin:0 0 16px;font-size:40px;">✨</p>
          <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3;">Thank you, ${name.split(' ')[0]}!</h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Linh Labs — AI Consulting</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px 40px 32px;">
          <p style="margin:0 0 20px;font-size:15px;color:#334155;line-height:1.8;">
            Thank you for reaching out to us. We have received your message and a member of our technical team is already reviewing it to understand how our AI solutions can best integrate with your current processes.
          </p>
          <p style="margin:0 0 32px;font-size:15px;color:#334155;line-height:1.8;">
            We will reach out within the next <strong style="color:#7c3aed;">24–48 hours</strong> to schedule a first introductory call.
          </p>

          <!-- CTA -->
          <div style="text-align:center;margin-bottom:32px;">
            <a href="https://linhlabs.it" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:700;letter-spacing:0.05em;">Visit our website →</a>
          </div>

          <!-- Divider -->
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 28px;">

          <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;">
            Talk soon,<br>
            <strong style="color:#1e293b;">The LinhLabs Team</strong>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:#94a3b8;font-size:11px;">© 2025 Linh Labs · AI Consulting · <a href="https://linhlabs.it" style="color:#94a3b8;">linhlabs.it</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Linh Labs" <${process.env.SMTP_USER}>`,
      to: email,
      subject: thankYouSubject,
      html: thankYouHtml,
    });

    console.log(`✅ Thank you email sent to lead: ${name} <${email}> [${lang || 'it'}]`);
    res.json({ success: true });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Lead API server running on http://localhost:${PORT}`);
});
