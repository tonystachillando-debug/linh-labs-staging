import React from 'react';
import { ShieldCheck, Lock, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      <Navbar />

      <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition mb-6">
            <ArrowLeft className="w-4 h-4" /> Torna alla Home
          </Link>
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest block w-fit mb-4">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            Conforme al Regolamento UE 2016/679 (GDPR)
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Informativa sulla Privacy & Cookie Policy
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Ultimo aggiornamento: 24 Luglio 2026 • Ai sensi del Regolamento Europeo 2016/679 (GDPR) e della normativa italiana vigente.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-slate-300 leading-relaxed text-sm sm:text-base bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
          
          {/* Section 1: Titolare */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">1.</span> Titolare del Trattamento dei Dati
            </h2>
            <p>
              Il Titolare del Trattamento dei dati personali raccolti tramite il sito web <strong className="text-white">linhlabs.com</strong> è:
            </p>
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-sm space-y-1.5 font-mono text-slate-300">
              <p><strong className="text-white">Ragione Sociale:</strong> Linh Labs</p>
              <p><strong className="text-white">Sede Legale ed Operativa:</strong> Via Giovanni Lavaggi 37, 95123 Catania (CT), Italia</p>
              <p><strong className="text-white">Partita IVA:</strong> 06297460872</p>
              <p><strong className="text-white">Email di Contatto:</strong> <a href="mailto:info@linhlabs.com" className="text-cyan-400 hover:underline">info@linhlabs.com</a></p>
              <p><strong className="text-white">Posta Elettronica Certificata (PEC):</strong> <a href="mailto:linhlabs@pec.it" className="text-cyan-400 hover:underline">linhlabs@pec.it</a></p>
            </div>
          </section>

          {/* Section 2: Tipologia Dati */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">2.</span> Tipologia di Dati Raccolti e Modalità di Raccolta
            </h2>
            <p>I dati personali trattati dal Titolare includono:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li><strong className="text-white">Dati forniti volontariamente per la Newsletter "Linh Labs AI Radar":</strong> Indirizzo email, eventuale numero di telefono (per notifiche WhatsApp), consenso esplicito espresso tramite spunta e registro dell'indirizzo IP di iscrizione a fini di audit trail GDPR.</li>
              <li><strong className="text-white">Dati forniti nei Form di Contatto e Valutazione AI:</strong> Nome, cognome, email aziendale, nome azienda, numero di telefono e risposte al quiz di valutazione dei processi aziendali.</li>
              <li><strong className="text-white">Dati di Navigazione Tecnica:</strong> Indirizzi IP, log di sistema, tipo di browser ed orari di accesso raccolti automaticamente per garantire la sicurezza del server e prevenire abusi.</li>
            </ul>
          </section>

          {/* Section 3: Finalità e Base Giuridica */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">3.</span> Finalità e Base Giuridica del Trattamento
            </h2>
            <p>I dati vengono trattati esclusivamente per le seguenti finalità:</p>
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-1">A. Invio del Resoconto Quotidiano "Linh Labs AI Radar" (Newsletter)</h3>
                <p className="text-xs text-slate-400"><strong>Base Giuridica:</strong> Consenso esplicito dell'interessato (Art. 6 par. 1 lett. a GDPR) raccolto mediante procedura di Double Opt-In.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-1">B. Risposta a Richieste di Contatto, Preventivi e Valutazioni AI</h3>
                <p className="text-xs text-slate-400"><strong>Base Giuridica:</strong> Esecuzione di misure precontrattuali o contrattuali (Art. 6 par. 1 lett. b GDPR).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-1">C. Adempimento di Obblighi Legali e Fiscali</h3>
                <p className="text-xs text-slate-400"><strong>Base Giuridica:</strong> Obbligo legale al quale è soggetto il Titolare (Art. 6 par. 1 lett. c GDPR).</p>
              </div>
            </div>
          </section>

          {/* Section 4: Modalità di Conservazione */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">4.</span> Periodo di Conservazione dei Dati
            </h2>
            <p>
              I dati forniti per la Newsletter vengono conservati fino alla richiesta di disiscrizione da parte dell'utente, che può avvenire in qualsiasi momento mediante il link di disiscrizione in 1-click in calce ad ogni email inviata.
            </p>
            <p>
              I dati delle richieste commerciali e dei quiz vengono conservati per il tempo strettamente necessario all'evasione della richiesta o fino a 10 anni per gli obblighi di legge fiscali.
            </p>
          </section>

          {/* Section 5: Diritti dell'Interessato */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">5.</span> Diritti dell'Interessato (Art. 15–22 GDPR)
            </h2>
            <p>In qualità di interessato, l'utente ha il diritto di chiedere al Titolare in qualsiasi momento:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-300 text-sm">
              <li>L'accesso ai propri dati personali ed ottenerne copia (Art. 15).</li>
              <li>La rettifica o l'aggiornamento dei dati inesatti (Art. 16).</li>
              <li>La cancellazione dei dati personali ("Diritto all'oblio", Art. 17).</li>
              <li>La limitazione del trattamento o l'opposizione allo stesso (Art. 18 e 21).</li>
              <li>La portabilità dei dati in formato strutturato di uso comune (Art. 20).</li>
              <li>La revoca del consenso in qualsiasi momento senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca.</li>
            </ul>
            <p className="pt-2">
              Per esercitare i propri diritti è sufficiente inviare una comunicazione scritta a <a href="mailto:info@linhlabs.com" className="text-cyan-400 font-bold hover:underline">info@linhlabs.com</a> oppure via PEC a <a href="mailto:linhlabs@pec.it" className="text-cyan-400 font-bold hover:underline">linhlabs@pec.it</a>.
            </p>
          </section>

          {/* Section 6: Cookie Policy */}
          <section className="space-y-3 border-t border-slate-800 pt-8">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">6.</span> Cookie Policy & Tracciamento
            </h2>
            <p>
              Il sito <strong className="text-white">linhlabs.com</strong> utilizza esclusivamente cookie tecnici ed analitici essenziali ed anonimizzati indispensabili per il corretto funzionamento delle pagine e la sicurezza della sessione. Non vengono utilizzati cookie di profilazione o tracciamento pubblicitario di terze parti senza previo consenso.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
