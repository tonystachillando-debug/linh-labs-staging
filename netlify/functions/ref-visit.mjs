import { normalizeRefCode, recordEvent, json } from '../lib/referrals.mjs';

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let body = {};
  try { body = await req.json(); } catch {}
  const code = normalizeRefCode(body.code);
  if (!code) return json({ error: 'Codice non valido' }, 400);
  const path = typeof body.path === 'string' ? body.path.slice(0, 200) : '/';
  await recordEvent('visit', code, { path });
  return json({ success: true });
};

export const config = { path: '/api/ref/visit' };
