import nodemailer from 'nodemailer';

const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function buildLeadEmail(lead) {
  const { name, email, company, phone, score, profile, serviceNote, answers, lang, ref } = lead;
  const isIT = lang !== 'en';
  const answersHtml = Array.isArray(answers)
    ? answers.map((a, i) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;">Q${i + 1}: ${esc(a.question)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:13px;">${esc(a.answer)}</td></tr>`).join('')
    : '';
  const row = (label, value) =>
    `<tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:120px;">${label}</td><td style="padding:6px 0;font-size:14px;color:#1e293b;">${value}</td></tr>`;
  const refBadge = ref
    ? `<span style="display:inline-block;background:#f59e0b20;color:#b45309;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;">Distributore: ${esc(ref)}</span>`
    : '';

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:32px 40px;">
    <h1 style="margin:0;color:#fff;font-size:22px;">Nuovo Lead — Valutazione AI (${isIT ? 'IT' : 'EN'})</h1>
    <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Profilo: <strong>${esc(profile)}</strong> (Score: ${esc(score)}/12)</p>
  </td></tr>
  <tr><td style="padding:32px 40px 20px;">
    ${refBadge}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${row('Nome', `<strong>${esc(name)}</strong>`)}
      ${row('Email', `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
      ${row('Azienda', `<strong>${esc(company)}</strong>`)}
      ${phone ? row('Telefono', esc(phone)) : ''}
      ${serviceNote ? row('Note', esc(serviceNote)) : ''}
      ${row('Referral', ref ? esc(ref) : '—')}
    </table>
  </td></tr>
  <tr><td style="padding:12px 40px 32px;"><table width="100%" style="border:1px solid #eee;">${answersHtml}</table></td></tr>
</table></td></tr></table></body></html>`;

  return {
    subject: `Nuovo Lead: ${name} — ${company} (${profile})${ref ? ` [ref ${ref}]` : ''}`,
    text: `NUOVO LEAD\nNome: ${name}\nEmail: ${email}\nAzienda: ${company}\nTelefono: ${phone || '-'}\nReferral: ${ref || '-'}\nLingua: ${lang || 'it'}`,
    html,
  };
}

export async function sendLeadEmail(lead) {
  const env = (k) => (globalThis.Netlify ? Netlify.env.get(k) : process.env[k]);
  if (!env('SMTP_HOST') || !env('SMTP_USER')) throw new Error('SMTP non configurato');
  const transporter = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port: Number(env('SMTP_PORT')) || 465,
    secure: true,
    auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
    tls: { rejectUnauthorized: false },
  });
  const { subject, text, html } = buildLeadEmail(lead);
  await transporter.sendMail({
    from: `"Linh Labs Lead Quiz" <${env('SMTP_USER')}>`,
    to: env('SMTP_TO') || env('SMTP_USER'),
    replyTo: lead.email,
    subject,
    text,
    html,
  });
}
