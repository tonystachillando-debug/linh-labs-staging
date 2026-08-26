import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, Cpu, Check, CheckCircle2, X, XCircle, 
  Coins, Car, UsersRound, Truck, Info, ArrowRight, Send, AlertTriangle 
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const TreasuryPage: React.FC = () => {
  const [transPerMonth, setTransPerMonth] = useState<number>(2000);
  const [hourlyCost, setHourlyCost] = useState<number>(25);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Calculations
  // ~3.5 min per manual transaction = 3.5 / 60 = 0.0583 hours
  const hoursPerMonth = transPerMonth * (3.5 / 60);
  const annualHours = Math.round(hoursPerMonth * 12);
  const annualEuros = Math.round(annualHours * hourlyCost);
  const monthlySavings = annualEuros / 12;
  const paybackMonths = monthlySavings > 0 ? (6900 / monthlySavings).toFixed(1) : '0';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar />

      {/* Background Glows & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-40"></div>
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[75vw] max-w-[850px] h-[450px] bg-blue-600/15 rounded-full blur-[140px] mix-blend-screen"></div>
        <div className="absolute top-[40%] -left-32 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[160px] mix-blend-screen"></div>
        <div className="absolute top-[70%] -right-32 w-[650px] h-[650px] bg-purple-600/10 rounded-full blur-[170px] mix-blend-screen"></div>
      </div>

      <main className="relative z-10 pt-36">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-8 pb-20 text-center">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Conforme Regolamento UE 2024/886 • Standard CBI ISO 20022</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] max-w-6xl mx-auto mb-8"
          >
            <span className="block text-slate-100">Elimina l’85% del tempo di</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500 pb-2">
              Payroll & Bonifici Bancari
            </span>
            <span className="block text-slate-400 text-3xl sm:text-5xl lg:text-6xl font-light mt-2">
              con l'automazione in 1 solo click.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto mb-10 font-light leading-relaxed"
          >
            Basta copia-incolla manuale sul remote banking e ansia da errore IBAN. Connetti il tuo gestionale aziendale direttamente ai canali bancari interbancari con generazione automatica di tracciati XML <code className="text-cyan-400 font-mono text-sm bg-slate-900 px-2 py-0.5 rounded border border-slate-800">pain.001</code> validati a zero errori.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-20"
          >
            <a 
              href="#calcolatore" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Calculator className="w-4 h-4" />
              <span>Calcola quanto risparmia la tua azienda</span>
            </a>
            <a 
              href="#come-funziona" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-slate-300 bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Architettura Software</span>
            </a>
          </motion.div>

          {/* Live KPI Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <div className="text-4xl font-display font-bold text-cyan-400">0%</div>
              <div className="text-[11px] text-slate-400 mt-2 font-mono uppercase tracking-wider">Errori IBAN</div>
              <div className="text-xs text-slate-500 mt-1">Validazione algoritmica Modulo 97</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <div className="text-4xl font-display font-bold text-teal-400">1-Click</div>
              <div className="text-[11px] text-slate-400 mt-2 font-mono uppercase tracking-wider">Batch Payout</div>
              <div className="text-xs text-slate-500 mt-1">Generazione distinta istantanea</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <div className="text-4xl font-display font-bold text-sky-400">5-10s</div>
              <div className="text-[11px] text-slate-400 mt-2 font-mono uppercase tracking-wider">Accredito SEPA Inst</div>
              <div className="text-xs text-slate-500 mt-1">Liquidazione immediata al banco</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <div className="text-4xl font-display font-bold text-emerald-400">&gt; 80h</div>
              <div className="text-[11px] text-slate-400 mt-2 font-mono uppercase tracking-wider">Liberate al mese</div>
              <div className="text-xs text-slate-500 mt-1">Per team amministrativo / payroll</div>
            </div>
          </div>
        </section>

        {/* SECTION: PRIMA vs DOPO */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase">Il Confronto Diretto</span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-3">
              Perché il metodo tradizionale frena la crescita
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* PRIMA */}
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-red-500/20 relative overflow-hidden bg-slate-950/60">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-red-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                    <X className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Processo Attuale</h3>
                    <p className="text-xs text-red-400/90 font-mono uppercase">Copia-Incolla Manuale</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">ALTO RISCHIO</span>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Risorse Payroll costose bloccate per giorni:</strong> figure qualificate passano ore a trascrivere IBAN, causali e cifre da file Excel a CBI/Home Banking.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Rischio costante di IBAN errati:</strong> un singolo errore di digitazione su bonifici di cassa o stipendi genera blocchi contabili e perdite finanziarie.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Attese fino a 4 ore per clienti/fornitori:</strong> l'operatore al banco deve aspettare che l'amministrazione sia libera per autorizzare il pagamento.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Rischio di bonifici duplicati:</strong> la mancanza di sincronizzazione bidirezionale espone al pericolo di pagare la stessa voce due volte.</span>
                </li>
              </ul>
            </div>

            {/* DOPO */}
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/40 relative overflow-hidden bg-slate-900/80 shadow-xl shadow-cyan-950/40">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Con Linh Treasury</h3>
                    <p className="text-xs text-cyan-400 font-mono uppercase">Flusso Automatico 1-Click</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/30">ZERO ERRORI</span>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Integrazione nativa con il tuo gestionale:</strong> i dati vengono letti direttamente via API sicure, Webhook o viste SQL dedicate.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Validazione algoritmica istantanea:</strong> l'algoritmo Modulo 97 convalida il CIN e la struttura IBAN prima della creazione del tracciato.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Tracciati XML pain.001 pronti all'uso:</strong> esportazione in 1 click o trasmissione Host-to-Host (DCM) alla tua banca per firma OTP.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Protezione antiduplicato nativa:</strong> nessun pagamento può essere trasmesso due volte grazie al fingerprinting univoco delle transazioni.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* SECTION: ARCHITETTURA 3 STEP */}
        <section id="come-funziona" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase">Architettura Software</span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-3">
              Come si integra nei tuoi sistemi in 3 Step
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4 font-light">
              Non devi cambiare gestionale o banca. Linh Treasury si posiziona come middleware sicuro e deterministico tra i tuoi database e il canale interbancario.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="glass-panel p-8 rounded-3xl relative hover:border-cyan-500/40 transition-all">
              <div className="text-xs font-mono text-cyan-400 mb-3 tracking-widest">FASE 01</div>
              <h4 className="text-xl font-display font-bold text-white mb-3">Data Ingestion</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Il connettore acquisisce in tempo reale le disposizioni di pagamento dal tuo software di cassa, ERP o gestionale paghe (Zucchetti, TeamSystem, custom DB).
              </p>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-400">
                <span className="text-cyan-400">&gt;</span> REST API / Webhooks / TLS 1.3
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl relative hover:border-cyan-500/40 transition-all">
              <div className="text-xs font-mono text-teal-400 mb-3 tracking-widest">FASE 02</div>
              <h4 className="text-xl font-display font-bold text-white mb-3">Validation & XML Engine</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Il motore applica il controllo Modulo 97, verifica i vincoli antiriciclaggio e compila istantaneamente il pacchetto standard ISO 20022 SEPA Instant.
              </p>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-400">
                <span className="text-teal-400">&gt;</span> EPC pain.001.001.03
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl relative hover:border-cyan-500/40 transition-all">
              <div className="text-xs font-mono text-purple-400 mb-3 tracking-widest">FASE 03</div>
              <h4 className="text-xl font-display font-bold text-white mb-3">1-Click Remote Banking</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                L'amministratore carica il flusso con 1 click o riceve la notifica per la firma via OTP/SCA sul canale telematico della banca (MPS DCM, CBI Multi-banca).
              </p>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-400">
                <span className="text-purple-400">&gt;</span> Direct Host-to-Host / CBI
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: SETTORI */}
        <section id="settori" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase">Settori ad Alto Dolore Operativo</span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-3">
              A chi fa risparmiare più tempo e denaro
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5">
                  <Coins className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-white text-base">Compro Oro & Banchi Metalli</h4>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Pagamento istantaneo al banco per catene con decine di negozi. Il cliente riceve il bonifico istantaneo in 5 secondi prima di uscire.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400">
                Volume: 50-200 bonifici/giorno
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                  <Car className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-white text-base">Concessionarie & Acquisto Auto</h4>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Liquidazione immediata al privato al momento della firma del passaggio di proprietà. Azzeramento frodi e attese.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400">
                Ticket: €2.000 - €30.000 / bonifico
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5">
                  <UsersRound className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-white text-base">Studi Paghe & Consulenti</h4>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Invio automatico di migliaia di stipendi a fine mese per decine di aziende clienti, integrato direttamente con i gestionali paghe.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400">
                Batch da 500+ dipendenti
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5">
                  <Truck className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-white text-base">Logistica & Ristorazione</h4>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Gestione massiva di acconti settimanali, rimborsi chilometrici e pagamenti a cooperative e padroncini su rete nazionale.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400">
                Frequenza: Settimanale / Quindicinale
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: CALCOLATORE ROI */}
        <section id="calcolatore" className="max-w-5xl mx-auto px-6 py-20 border-t border-slate-800/80">
          <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-cyan-500/30 relative overflow-hidden bg-slate-900/90 shadow-2xl shadow-cyan-950/30">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase">Simulatore Finanziario</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mt-2">
                Calcola il Ritorno sull’Investimento (ROI)
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-3">
                Sposta i selettori in base ai volumi della tua azienda per stimare il risparmio netto.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Sliders */}
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-slate-300">Bonifici gestiti al mese:</label>
                    <span className="font-mono text-cyan-400 font-bold text-lg bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                      {transPerMonth.toLocaleString('it-IT')}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="200" 
                    max="10000" 
                    step="100" 
                    value={transPerMonth} 
                    onChange={(e) => setTransPerMonth(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400" 
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                    <span>200 bonifici</span>
                    <span>5.000</span>
                    <span>10.000+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-slate-300">Costo orario lordo amministrazione:</label>
                    <span className="font-mono text-cyan-400 font-bold text-lg bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                      € {hourlyCost} / h
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="18" 
                    max="45" 
                    step="1" 
                    value={hourlyCost} 
                    onChange={(e) => setHourlyCost(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400" 
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                    <span>€18 / h</span>
                    <span>€30 / h</span>
                    <span>€45 / h</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                  <Info className="w-4 h-4 text-cyan-400 inline mr-1.5" />
                  Basato su un tempo medio di <strong>3,5 minuti a bonifico</strong> (lettura dati, digitazione, verifica Modulo 97 e autorizzazione su remote banking).
                </div>
              </div>

              {/* Result Display */}
              <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 text-center space-y-6 bg-slate-950/90">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Risparmio Netto Annuo Stimato</div>
                  <div className="text-4xl sm:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-300 mt-2">
                    € {annualEuros.toLocaleString('it-IT')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800 text-left">
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">ORE LIBERATE / ANNO</div>
                    <div className="text-2xl font-bold font-display text-white mt-1">{annualHours.toLocaleString('it-IT')} h</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">PAYBACK PERIOD</div>
                    <div className="text-2xl font-bold font-display text-emerald-400 mt-1">~ {paybackMonths.replace('.', ',')} Mesi</div>
                  </div>
                </div>

                <a 
                  href="#contatti" 
                  className="block w-full py-4 text-center text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Richiedi l'attivazione per la tua azienda
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: SICUREZZA */}
        <section id="sicurezza" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800/80">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase">Sicurezza & Affidabilità</span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-3 mb-6">
                Nessuna allucinazione.<br />
                Codice 100% deterministico.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Quando si muove denaro reale, non c'è spazio per probabilità o allucinazioni. Linh Treasury opera con script deterministici, logiche crittografiche e protocolli interbancari rigidi.
              </p>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs">✓</div>
                  <span><strong>Standard ISO 20022 (pain.001 / camt.053):</strong> compatibilità nativa CBI.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs">✓</div>
                  <span><strong>Firma finale obbligatoria dell'operatore:</strong> piena aderenza SCA / 2FA.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-xs">✓</div>
                  <span><strong>Audit trail immutabile:</strong> piena conformità antiriciclaggio (AML) e controlli fiscali.</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3 bg-slate-950 shadow-2xl">
              <div className="text-slate-500 flex items-center justify-between pb-3 border-b border-slate-800 text-[11px]">
                <span>// LINH TREASURY ENGINE LOG</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE ENGINE
                </span>
              </div>
              <div className="text-slate-400">[11:42:01] Ingesting transaction ID #TRX-94821 ...</div>
              <div className="text-cyan-400">[11:42:01] Modulo 97 Checksum: VALID (IT60X0542811101000000123456)</div>
              <div className="text-teal-400">[11:42:01] Duplicate Hash Check: OK (0 previous matches)</div>
              <div className="text-purple-400">[11:42:02] Generating ISO 20022 pain.001.001.03 XML packet...</div>
              <div className="text-emerald-400">[11:42:02] Batch ready for 1-click execution. Time elapsed: 38ms</div>
            </div>

          </div>
        </section>

        {/* PILOT CALLOUT */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/40 text-center relative overflow-hidden bg-gradient-to-b from-cyan-950/30 to-slate-950">
            <span className="inline-block text-xs font-mono text-cyan-300 bg-cyan-500/20 px-4 py-1.5 rounded-full mb-4 border border-cyan-500/30">
              FORMULA PILOTA PROTETTO
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-white mb-4">
              Guida la macchina prima di comprarla
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Non chiediamo alle aziende di investire a scatola chiusa. Attiviamo il sistema in prova sul tuo punto vendita o reparto con il maggior volume per 14 giorni: saldi il progetto solo quando hai verificato con mano l'efficacia sul campo.
            </p>
            <a 
              href="#contatti" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors duration-300 shadow-xl"
            >
              Richiedi l'Avvio del Pilota
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contatti" className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-800/80">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase">Parla con gli Ingegneri Linh Labs</span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-3">
              Richiedi uno Studio di Fattibilità Gratuito
            </h2>
            <p className="text-slate-400 text-sm mt-3 font-light">
              Analizziamo il tuo gestionale e la tua banca per confermare tempi di implementazione e ROI.
            </p>
          </div>

          {formSubmitted ? (
            <div className="glass-panel p-12 rounded-3xl border border-emerald-500/40 text-center bg-slate-950/90">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold text-white mb-2">Richiesta Inviata con Successo!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Un nostro ingegnere analizzerà la fattibilità tecnica con il tuo gestionale e ti contatterà entro 24 ore lavorative.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6 border border-slate-800 bg-slate-950/80">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">NOME E COGNOME *</label>
                  <input type="text" required placeholder="es. Alessandro Rossi" className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">AZIENDA &amp; RUOLO *</label>
                  <input type="text" required placeholder="es. Giallo Oro srl - CFO / Titolare" className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">EMAIL AZIENDALE *</label>
                  <input type="email" required placeholder="alessandro@azienda.it" className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">TELEFONO / WHATSAPP *</label>
                  <input type="tel" required placeholder="+39 333 1234567" className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">GESTIONALE IN USO</label>
                  <input type="text" placeholder="es. Zucchetti, TeamSystem, Custom..." className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">BANCA AZIENDALE PRINCIPALE</label>
                  <input type="text" placeholder="es. Monte dei Paschi, Intesa, UniCredit..." className="w-full px-4 py-3.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors" />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Invia Richiesta di Fattibilità &amp; Pilota</span>
                <Send className="w-4 h-4" />
              </button>

              <p className="text-center text-[11px] text-slate-500 font-mono">
                Rispondiamo entro 24h lavorative con un'analisi preliminare di fattibilità. Nessun vincolo commerciale.
              </p>
            </form>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
};
