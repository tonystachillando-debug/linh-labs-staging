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
    const { name, email, company, phone, score, profile, services, answers } = req.body;

    // Validate required fields
    if (!name || !email || !company) {
      return res.status(400).json({ error: 'Name, email, and company are required.' });
    }

    // Format the answers for the email
    const answersHtml = answers
      .map((a, i) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;">Q${i + 1}: ${a.question}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:13px;">${a.answer}</td></tr>`)
      .join('');

    const servicesHtml = services.length > 0
      ? services.map(s => `<span style="display:inline-block;background:#7c3aed20;color:#7c3aed;padding:4px 12px;border-radius:20px;font-size:12px;margin:2px 4px;font-weight:600;">${s}</span>`).join(' ')
      : '<span style="color:#999;font-style:italic;">Nessun servizio selezionato</span>';

    // Beautiful HTML email
    const htmlEmail = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:32px 40px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">🚀 Nuovo Lead — Valutazione IA</h1>
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

    // Plain text fallback
    const textEmail = `
NUOVO LEAD - VALUTAZIONE IA
============================
Profilo: ${profile} (Score: ${score}/12)

CONTATTO
--------
Nome: ${name}
Email: ${email}
Azienda: ${company}
${phone ? `Telefono: ${phone}` : ''}

SERVIZI DI INTERESSE
---------------------
${services.length > 0 ? services.join(', ') : 'Nessun servizio selezionato'}

RISPOSTE VALUTAZIONE
---------------------
${answers.map((a, i) => `Q${i + 1}: ${a.question}\n   → ${a.answer}`).join('\n\n')}
`;

    // Send email
    await transporter.sendMail({
      from: `"Linh Labs Lead Quiz" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `🚀 Nuovo Lead: ${name} — ${company} (${profile})`,
      text: textEmail,
      html: htmlEmail,
    });

    console.log(`✅ Lead email sent: ${name} <${email}> — ${profile}`);
    res.json({ success: true });

  } catch (error) {
    console.error('❌ Error sending lead email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Lead API server running on http://localhost:${PORT}`);
});
