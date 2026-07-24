import React, { useState } from 'react';
import { Mail, MessageSquare, ShieldCheck, ArrowRight, Loader2, Lock, Sparkles } from 'lucide-react';

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
        const res = await fetch('/api/whatsapp/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, consent })
        });
        const data = await res.json();
        if (data.success) {
          setResponseMsg({ success: true, text: 'Iscrizione WhatsApp registrata! Riceverai gli aggiornamenti AI giornalieri direttamente su WhatsApp.' });
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
    <div className="relative rounded-3xl bg-slate-900/80 p-8 sm:p-14 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Brand Glowing Accent Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          Iscrizione 100% GDPR Compliant
        </div>

        {/* Heading in Space Grotesk font */}
        <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
          Ricevi il Digest AI Quotidiano di Linh Labs
        </h3>

        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Niente spam, solo il meglio dell'Intelligenza Artificiale applicata. Scegli il tuo canale preferito.
        </p>

        {/* Channel Selector Tabs */}
        <div className="flex justify-center mt-8 mb-10">
          <div className="inline-flex p-1.5 bg-slate-950/90 rounded-full border border-slate-800/90 shadow-inner">
            <button
              type="button"
              onClick={() => setChannel('email')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition duration-300 ${
                channel === 'email'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" /> Email Newsletter
            </button>

            <button
              type="button"
              onClick={() => setChannel('whatsapp')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition duration-300 ${
                channel === 'whatsapp'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Automazione WhatsApp
            </button>
          </div>
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
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
                  className="w-full pl-12 pr-4 py-4 bg-slate-950/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl transition duration-300 shadow-xl flex items-center justify-center gap-2.5 disabled:opacity-50 whitespace-nowrap"
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
                  className="w-full pl-12 pr-4 py-4 bg-slate-950/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl transition duration-300 shadow-xl flex items-center justify-center gap-2.5 disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Attiva WhatsApp <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          )}

          {/* Explicit GDPR Checkbox */}
          <div className="flex items-start gap-3 text-left pt-2">
            <input
              type="checkbox"
              id="gdpr-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-950 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900 cursor-pointer"
            />
            <label htmlFor="gdpr-consent" className="text-xs text-slate-400 leading-relaxed cursor-pointer font-medium">
              Acconsento al trattamento dei dati personali ai sensi del regolamento GDPR (UE 2016/679). Posso disiscrivermi in qualsiasi momento con 1 singolo click.
            </label>
          </div>
        </form>

        {responseMsg && (
          <div className={`mt-5 p-4 rounded-2xl text-xs font-semibold backdrop-blur-md ${
            responseMsg.success
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
          }`}>
            {responseMsg.text}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-purple-400" /> Dati Crittografati</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Zero Spam</span>
          <span>•</span>
          <span>1-Click Unsubscribe</span>
        </div>

      </div>
    </div>
  );
};

export default GDPRNewsletterForm;
