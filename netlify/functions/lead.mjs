import { normalizeRefCode, recordEvent, json } from '../lib/referrals.mjs';
import { sendLeadEmail } from '../lib/leadEmail.mjs';

const clip = (v, n = 500) => (typeof v === 'string' ? v.slice(0, n) : v ?? null);

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: 'JSON non valido' }, 400); }

  const lead = {
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    company: clip(body.company, 200),
    phone: clip(body.phone, 40),
    score: Number(body.score) || 0,
    profile: clip(body.profile, 120),
    serviceNote: clip(body.serviceNote, 2000),
    answers: Array.isArray(body.answers)
      ? body.answers.slice(0, 30).map((a) => ({ question: clip(a?.question), answer: clip(a?.answer) }))
      : [],
    lang: body.lang === 'en' ? 'en' : 'it',
    ref: normalizeRefCode(body.ref),
    source: clip(body.source, 40) || 'lead-quiz',
  };
  if (!lead.name || !lead.email || !lead.company) {
    return json({ error: 'Nome, email e azienda sono obbligatori.' }, 400);
  }

  // Prima si salva, poi si manda l'email: se l'SMTP cade il lead resta comunque registrato.
  let saved = false;
  try {
    await recordEvent('lead', lead.ref, lead);
    saved = true;
  } catch (err) {
    console.error('lead non salvato:', err);
  }

  let emailed = false;
  try {
    await sendLeadEmail(lead);
    emailed = true;
  } catch (err) {
    console.error('email lead non inviata:', err);
  }

  if (!saved && !emailed) return json({ error: 'Impossibile registrare il lead.' }, 500);
  return json({ success: true, saved, emailed });
};

export const config = { path: '/api/lead' };
