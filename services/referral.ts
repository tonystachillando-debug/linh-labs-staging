// Referral distributori: legge ?ref=CODICE dall'URL, lo ricorda per 90 giorni
// (vince l'ultimo link cliccato) e conta una visita per sessione.

const STORAGE_KEY = 'linh_ref';
const SESSION_KEY = 'linh_ref_visit';
const TTL_MS = 90 * 24 * 60 * 60 * 1000;
const CODE_RE = /^[A-Z0-9_-]{2,40}$/;

export function normalizeRefCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const code = raw.trim().toUpperCase();
  return CODE_RE.test(code) ? code : null;
}

export function captureReferral(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const code = normalizeRefCode(params.get('ref'));
    if (!code) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ code, ts: Date.now() }));

    // Una visita per codice per sessione del browser
    if (sessionStorage.getItem(SESSION_KEY) === code) return;
    sessionStorage.setItem(SESSION_KEY, code);
    fetch('/api/ref/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // storage non disponibile (es. navigazione privata restrittiva): niente attribuzione
  }
}

export function getReferral(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { code, ts } = JSON.parse(raw);
    if (!code || Date.now() - ts > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return normalizeRefCode(code);
  } catch {
    return null;
  }
}
