import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain, Megaphone, TrendingUp, FileText, HeadsetIcon as Headset, Layers,
  ArrowLeft, Clock, Plug, Star, Zap, Bot, Search, Sparkles,
  Mail, Share2, BarChart3, Target, Users, FileCheck, FileSearch,
  MessageSquare, ThumbsUp, Database, Activity, Webhook,
  Send, PenTool, Filter, BadgeCheck
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface Automation {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  integrations: string[];
  timeSaved: string;
  integrationCount: number;
  popularity: number;
  badge?: string;
}

const categoryMeta: Record<string, { gradient: string; badgeColor: string; textColor: string }> = {
  'AI': { gradient: 'from-violet-500 to-purple-600', badgeColor: 'bg-violet-500/20 border-violet-500/30', textColor: 'text-violet-300' },
  'Marketing': { gradient: 'from-pink-500 to-rose-600', badgeColor: 'bg-pink-500/20 border-pink-500/30', textColor: 'text-pink-300' },
  'Sales': { gradient: 'from-cyan-500 to-blue-600', badgeColor: 'bg-cyan-500/20 border-cyan-500/30', textColor: 'text-cyan-300' },
  'Document Ops': { gradient: 'from-amber-500 to-orange-600', badgeColor: 'bg-amber-500/20 border-amber-500/30', textColor: 'text-amber-300' },
  'Support': { gradient: 'from-emerald-500 to-green-600', badgeColor: 'bg-emerald-500/20 border-emerald-500/30', textColor: 'text-emerald-300' },
  'Other': { gradient: 'from-slate-400 to-slate-600', badgeColor: 'bg-slate-500/20 border-slate-500/30', textColor: 'text-slate-300' },
};

const automations: Automation[] = [
  // AI
  {
    id: 1, name: 'AI Chatbot con Memoria', description: 'Chatbot intelligente con memoria conversazionale che ricorda il contesto tra le sessioni utente.',
    category: 'AI', icon: <Bot />, integrations: ['OpenAI', 'Slack', 'Telegram'], timeSaved: '12h/settimana', integrationCount: 3, popularity: 98, badge: 'Più Popolare',
  },
  {
    id: 2, name: 'Document Q&A con RAG', description: 'Sistema di domande e risposte su documenti aziendali con Retrieval-Augmented Generation.',
    category: 'AI', icon: <Search />, integrations: ['Pinecone', 'OpenAI', 'Google Drive'], timeSaved: '8h/settimana', integrationCount: 3, popularity: 95,
  },
  {
    id: 3, name: 'AI Email Classifier', description: 'Classificazione automatica delle email in arrivo con priorità, categorie e risposte suggerite.',
    category: 'AI', icon: <Sparkles />, integrations: ['Gmail', 'OpenAI', 'Notion'], timeSaved: '6h/settimana', integrationCount: 3, popularity: 90,
  },
  // Marketing
  {
    id: 4, name: 'Social Media Auto-Poster', description: 'Pianificazione e pubblicazione automatica su più piattaforme social con contenuti ottimizzati.',
    category: 'Marketing', icon: <Share2 />, integrations: ['Buffer', 'Instagram', 'LinkedIn'], timeSaved: '10h/settimana', integrationCount: 4, popularity: 94, badge: 'Trending',
  },
  {
    id: 5, name: 'SEO Content Pipeline', description: 'Pipeline automatizzata per la creazione di contenuti SEO-optimized con keyword research integrata.',
    category: 'Marketing', icon: <PenTool />, integrations: ['OpenAI', 'WordPress', 'Ahrefs'], timeSaved: '15h/settimana', integrationCount: 3, popularity: 88,
  },
  {
    id: 6, name: 'Email Campaign Automator', description: 'Automazione completa delle campagne email: segmentazione, A/B testing e follow-up intelligenti.',
    category: 'Marketing', icon: <Mail />, integrations: ['Mailchimp', 'HubSpot', 'Segment'], timeSaved: '8h/settimana', integrationCount: 3, popularity: 91,
  },
  // Sales
  {
    id: 7, name: 'Lead Scoring Automator', description: 'Scoring automatico dei lead basato su comportamento, engagement e dati demografici.',
    category: 'Sales', icon: <Target />, integrations: ['HubSpot', 'Clearbit', 'Slack'], timeSaved: '7h/settimana', integrationCount: 3, popularity: 92, badge: 'Top Rated',
  },
  {
    id: 8, name: 'CRM Sync Pipeline', description: 'Sincronizzazione bidirezionale tra CRM, email e tool di comunicazione in tempo reale.',
    category: 'Sales', icon: <Users />, integrations: ['Salesforce', 'Gmail', 'Slack'], timeSaved: '5h/settimana', integrationCount: 3, popularity: 87,
  },
  {
    id: 9, name: 'Proposal Generator', description: 'Generazione automatica di proposte commerciali personalizzate partendo dai dati del CRM.',
    category: 'Sales', icon: <BarChart3 />, integrations: ['OpenAI', 'HubSpot', 'Google Docs'], timeSaved: '6h/settimana', integrationCount: 3, popularity: 85,
  },
  // Document Ops
  {
    id: 10, name: 'Invoice Processor', description: 'Elaborazione automatica delle fatture: estrazione dati, validazione e caricamento nel gestionale.',
    category: 'Document Ops', icon: <FileCheck />, integrations: ['Google Drive', 'OpenAI', 'QuickBooks'], timeSaved: '9h/settimana', integrationCount: 3, popularity: 89, badge: 'Essenziale',
  },
  {
    id: 11, name: 'Contract Analyzer', description: 'Analisi intelligente dei contratti con estrazione clausole chiave e alert su scadenze.',
    category: 'Document Ops', icon: <FileSearch />, integrations: ['OpenAI', 'Dropbox', 'Notion'], timeSaved: '7h/settimana', integrationCount: 3, popularity: 84,
  },
  {
    id: 12, name: 'PDF Report Generator', description: 'Creazione automatica di report PDF professionali a partire da dati strutturati e template.',
    category: 'Document Ops', icon: <FileText />, integrations: ['Google Sheets', 'Puppeteer', 'S3'], timeSaved: '5h/settimana', integrationCount: 3, popularity: 82,
  },
  // Support
  {
    id: 13, name: 'Ticket Auto-Router', description: 'Routing intelligente dei ticket di supporto basato su contenuto, priorità e competenze del team.',
    category: 'Support', icon: <Filter />, integrations: ['Zendesk', 'Slack', 'OpenAI'], timeSaved: '8h/settimana', integrationCount: 3, popularity: 90, badge: 'Smart',
  },
  {
    id: 14, name: 'FAQ Bot', description: 'Bot automatico per le FAQ che risponde alle domande frequenti attingendo dalla knowledge base aziendale.',
    category: 'Support', icon: <MessageSquare />, integrations: ['Intercom', 'OpenAI', 'Notion'], timeSaved: '12h/settimana', integrationCount: 3, popularity: 93,
  },
  {
    id: 15, name: 'Customer Sentiment Tracker', description: 'Monitoraggio in tempo reale del sentiment dei clienti su ticket, review e social media.',
    category: 'Support', icon: <ThumbsUp />, integrations: ['OpenAI', 'Zendesk', 'Google Sheets'], timeSaved: '4h/settimana', integrationCount: 3, popularity: 80,
  },
  // Other
  {
    id: 16, name: 'Data Backup Scheduler', description: 'Backup automatizzato e schedulato di database, file e configurazioni su cloud storage.',
    category: 'Other', icon: <Database />, integrations: ['PostgreSQL', 'AWS S3', 'Slack'], timeSaved: '3h/settimana', integrationCount: 3, popularity: 86,
  },
  {
    id: 17, name: 'API Health Monitor', description: 'Monitoraggio continuo dello stato delle API con alert istantanei in caso di downtime o errori.',
    category: 'Other', icon: <Activity />, integrations: ['HTTP', 'PagerDuty', 'Slack'], timeSaved: '5h/settimana', integrationCount: 3, popularity: 88, badge: 'DevOps',
  },
  {
    id: 18, name: 'Webhook Relay Hub', description: 'Hub centralizzato per la gestione e il routing dei webhook tra servizi diversi con logging.',
    category: 'Other', icon: <Webhook />, integrations: ['HTTP', 'Redis', 'Elasticsearch'], timeSaved: '4h/settimana', integrationCount: 3, popularity: 78,
  },
];

const filterCategories = ['Tutti', 'AI', 'Marketing', 'Sales', 'Document Ops', 'Support', 'Other'];

export const CataloguePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Tutti');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = activeFilter === 'Tutti'
    ? automations
    : automations.filter((a) => a.category === activeFilter);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500/30">
      <Navbar />
      <main>
        {/* Hero / Header */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/60 via-slate-950 to-slate-950 -z-10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Torna alla Home
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-[0.15em] uppercase">
                  <Zap className="w-3 h-3" /> N8N Workflows
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Catalogo{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 animate-gradient">
                  Automazioni
                </span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
                Esplora la nostra selezione curata delle automazioni più popolari ed efficaci. Ogni workflow è pronto per essere personalizzato e implementato nel tuo business.
              </p>
            </motion.div>

            {/* Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap gap-3 mt-12"
            >
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    activeFilter === cat
                      ? 'bg-white text-slate-950 border-white shadow-lg shadow-white/10'
                      : 'bg-slate-900/60 text-slate-400 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="pb-32 relative">
          <div className="container mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((automation, index) => {
                  const meta = categoryMeta[automation.category];
                  return (
                    <motion.div
                      key={automation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative"
                    >
                      {/* Hover glow */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${meta.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                      <div className="relative h-full bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300">
                        {/* Top accent line */}
                        <div className={`h-[2px] bg-gradient-to-r ${meta.gradient}`} />

                        <div className="p-7">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-5">
                            <div className={`w-11 h-11 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center ${meta.textColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                              {React.cloneElement(automation.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                            </div>
                            <div className="flex items-center gap-2">
                              {automation.badge && (
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${meta.badgeColor} ${meta.textColor}`}>
                                  {automation.badge}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Category tag */}
                          <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3 border ${meta.badgeColor} ${meta.textColor}`}>
                            {automation.category}
                          </span>

                          {/* Title & Description */}
                          <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors leading-snug">
                            {automation.name}
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            {automation.description}
                          </p>

                          {/* Integrations */}
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {automation.integrations.map((integration) => (
                              <span
                                key={integration}
                                className="px-2.5 py-1 bg-slate-800/80 border border-white/5 rounded-lg text-[11px] text-slate-400 font-medium"
                              >
                                {integration}
                              </span>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/5">
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
                                <Clock className="w-3 h-3" />
                                <span className="font-display text-sm font-bold">{automation.timeSaved}</span>
                              </div>
                              <span className="text-slate-600 text-[10px] uppercase tracking-wider">Risparmiato</span>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                                <Plug className="w-3 h-3" />
                                <span className="font-display text-sm font-bold">{automation.integrationCount}</span>
                              </div>
                              <span className="text-slate-600 text-[10px] uppercase tracking-wider">Integrazioni</span>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                                <Star className="w-3 h-3" />
                                <span className="font-display text-sm font-bold">{automation.popularity}%</span>
                              </div>
                              <span className="text-slate-600 text-[10px] uppercase tracking-wider">Popolarità</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <div className="max-w-2xl mx-auto glass-panel rounded-2xl p-10 border border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                  <BadgeCheck className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                  Pronto a implementare?
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                  Il nostro team può personalizzare e implementare qualsiasi automazione per il tuo business entro pochi giorni. Contattaci per una demo gratuita.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    Contattaci per Implementare
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 bg-slate-800 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-700 hover:border-white/20 transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Torna alla Home
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
