import { getStore } from '@netlify/blobs';
import crypto from 'crypto';

const CODE_RE = /^[A-Z0-9_-]{2,40}$/;

export function normalizeRefCode(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const code = raw.trim().toUpperCase();
  return CODE_RE.test(code) ? code : null;
}

export function store() {
  return getStore('referrals');
}

function eventKey(kind, code) {
  return `${kind}/${code || '_NONE'}/${new Date().toISOString()}-${crypto.randomBytes(4).toString('hex')}`;
}

// Un evento = una chiave: niente contatori read-modify-write, niente conflitti tra richieste.
export async function recordEvent(kind, code, data = {}) {
  const key = eventKey(kind, code);
  await store().setJSON(key, { kind, code, at: new Date().toISOString(), ...data });
  return key;
}

export function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
