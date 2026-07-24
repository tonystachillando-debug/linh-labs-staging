import React, { useState } from 'react';
import { Mail, MessageSquare, Check, ShieldCheck, ArrowRight, Loader2, Lock } from 'lucide-react';

export const GDPRNewsletterForm: React.FC = () => {
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setResponseMsg({ success: false, text: 'Devi accettare l’informativa sulla privacy per procedere.' });
      return;
    }

    setLoading(true);
    setResponseMsg(null);

    try {
      if (channel === 'email') {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, channel: 'email', consent })
        });
        const data = await res.json();
        if (data.success) {
          setResponseMsg({ success: true, text: data.message });
          setEmail('');
          setConsent(false);
        } else {
          setResponseMsg({ success: false, text: data.error || 'Errore durante la registrazione.' });
        }
      } else {
        // WhatsApp registration
        const res = await fetch('/api/whatsapp/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, consent })
        });
        const data = await res.json();
        if (data.success) {
          setResponseMsg({ success: true, text: 'Iscrizione WhatsApp registrata! Riceverai i principali aggiornamenti AI sul tuo numero.' });
          setPhone('');
          setConsent(false);
        } else {
          setResponseMsg({ success: false, text: 'Errore registrazione WhatsApp.' });
        }
      }
    } catch (err) {
      setResponseMsg({ success: false, text: 'Errore di connessione al server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          Iscrizione 100% GDPR Compliant
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Ricevi il Digest AI Quotidiano di Linh Labs
        </h3>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          Scegli il tuo canale preferito. Inviamo solo le notizie più rilevanti dell'Intelligenza Artificiale, senza spam.
        </p>

        {/* Channel Selector Tabs */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="inline-flex p-1 bg-slate-950 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setChannel('email')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                channel === 'email'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" /> Newsletter Email
            </button>

            <button
              type="button"
              onClick={() => setChannel('whatsapp')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                channel === 'whatsapp'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Automazione WhatsApp
            </button>
          </div>
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          {channel === 'email' ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Mail className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Inserisci la tua email professionale..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Iscriviti Ora <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <MessageSquare className="w-5 h-5 text-emerald-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="Numero WhatsApp (es. +39 340 1234567)..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Attiva WhatsApp <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          )}

          {/* Explicit GDPR Consent Checkbox */}
          <div className="flex items-start gap-3 text-left pt-2">
            <input
              type="checkbox"
              id="gdpr-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-950 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900 cursor-pointer"
            />
            <label htmlFor="gdpr-consent" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
              Acconsento al trattamento dei dati personali ai sensi del regolamento GDPR (UE 2016/679). Posso disiscrivermi in qualsiasi momento con un solo click.
            </label>
          </div>
        </form>

        {responseMsg && (
          <div className={`mt-4 p-3.5 rounded-xl text-xs font-semibold ${
            responseMsg.success
              ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/60 border border-rose-500/30 text-rose-300'
          }`}>
            {responseMsg.text}
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-purple-400" /> Dati protetti & crittografati</span>
          <span>•</span>
          <span>Zero Spam</span>
          <span>•</span>
          <span>1-Click Unsubscribe</span>
        </div>
      </div>
    </div>
  );
};

export default GDPRNewsletterForm;
