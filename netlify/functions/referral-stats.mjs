// GET /api/admin/referrals  (header X-Admin-Password)
// Riepilogo per distributore: clic sul link, visite al sito, lead/call arrivate.
import { store, json } from '../lib/referrals.mjs';

export default async (req) => {
  const expected = Netlify.env.get('ADMIN_PASSWORD');
  const auth = req.headers.get('x-admin-password') || (req.headers.get('authorization') || '').replace(/^Bearer /, '');
  if (!expected || auth !== expected) return json({ error: 'Accesso negato' }, 401);

  const url = new URL(req.url);
  const since = url.searchParams.get('since'); // es. 2026-11-01
  const s = store();
  const { blobs } = await s.list();

  const byCode = {};
  const leadKeys = [];
  for (const { key } of blobs) {
    const [kind, code, stamp] = key.split('/');
    if (since && stamp < since) continue;
    if (!['click', 'visit', 'lead'].includes(kind)) continue;
    const row = (byCode[code] ||= { code: code === '_NONE' ? null : code, clicks: 0, visits: 0, leads: 0 });
    row[kind === 'click' ? 'clicks' : kind === 'visit' ? 'visits' : 'leads']++;
    if (kind === 'lead') leadKeys.push(key);
  }

  const leads = (await Promise.all(leadKeys.map((k) => s.get(k, { type: 'json' }))))
    .filter(Boolean)
    .map(({ at, ref, name, company, email, phone, profile, score, source }) => ({ at, ref, name, company, email, phone, profile, score, source }))
    .sort((a, b) => (a.at < b.at ? 1 : -1));

  const distributors = Object.values(byCode).sort((a, b) => b.leads - a.leads || b.visits - a.visits);
  return json({ success: true, since: since || null, distributors, leads });
};

export const config = { path: '/api/admin/referrals' };
