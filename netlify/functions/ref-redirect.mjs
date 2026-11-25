// /r/CODICE  -> registra il clic e porta al sito con ?ref=CODICE (+ UTM per GA4)
// /r/CODICE?to=/treasury  -> stessa cosa, verso una pagina interna
import { normalizeRefCode, recordEvent } from '../lib/referrals.mjs';

export default async (req, context) => {
  const url = new URL(req.url);
  const code = normalizeRefCode(context.params.code);
  const to = url.searchParams.get('to') || '/';
  // Solo percorsi interni: niente open redirect
  const path = to.startsWith('/') && !to.startsWith('//') ? to : '/';
  const target = new URL(path, url.origin);

  if (code) {
    target.searchParams.set('ref', code);
    target.searchParams.set('utm_source', code.toLowerCase());
    target.searchParams.set('utm_medium', 'referral');
    target.searchParams.set('utm_campaign', 'distributori');
    try {
      await recordEvent('click', code, { to: path });
    } catch (err) {
      console.error('ref click non registrato:', err);
    }
  }
  return Response.redirect(target.toString(), 302);
};

export const config = { path: '/r/:code' };
