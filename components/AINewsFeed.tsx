import React, { useEffect, useState } from 'react';
import { Sparkles, ExternalLink, RefreshCw, Layers, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import GDPRNewsletterForm from './GDPRNewsletterForm';
import { Logo } from './Logo';

interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  category: string;
  published_at: string;
  summary_it: string;
  takeaways: string[];
}

export const AINewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [scanning, setScanning] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutte');
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news/latest');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.articles)) {
          setArticles(data.articles);
        }
      }
    } catch (err) {
      console.error('Error loading AI news feed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleManualScan = async () => {
    setScanning(true);
    setScanMessage('Scansione testate internazionali ed elaborazione AI in corso...');
    try {
      const res = await fetch('/api/news/trigger-scan', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setScanMessage(data.added > 0 ? `🎉 Trovate e sintetizzate ${data.added} nuove notizie uniche!` : '✅ Le notizie del giorno erano già state elaborate (zero duplicati).');
        fetchNews();
      } else {
        setScanMessage('⚠️ Impossibile completare la scansione automatica.');
      }
    } catch (err) {
      setScanMessage('❌ Errore durante la scansione.');
    } finally {
      setScanning(false);
      setTimeout(() => setScanMessage(null), 6000);
    }
  };

  const categories = ['Tutte', ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];

  const filteredArticles = selectedCategory === 'Tutte' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <section id="ai-news" className="relative py-28 bg-[#020617] text-slate-100 overflow-hidden font-sans border-t border-slate-900">
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />

      {/* Atmospheric Brand Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              LINH LABS · DAILY AI RADAR
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Novità AI del Giorno <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-300">
                Sintetizzate in Tempo Reale
              </span>
            </h2>

            <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              Il radar quotidiano di Linh Labs. Selezioniamo le notizie più rilevanti dai principali centri di ricerca mondiali, eliminando duplicati e articoli ridondanti.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleManualScan}
              disabled={scanning}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white text-xs font-bold uppercase tracking-wider transition duration-300 shadow-xl hover:border-purple-500/50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-cyan-400 ${scanning ? 'animate-spin' : ''}`} />
              {scanning ? 'Scansione in corso...' : 'Aggiorna Notizie'}
            </button>
          </div>
        </div>

        {scanMessage && (
          <div className="mb-10 p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-sm flex items-center gap-3 backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span className="font-medium">{scanMessage}</span>
          </div>
        )}

        {/* Category Filter Chips */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-900/30 scale-105'
                    : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Article Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-72 rounded-3xl bg-slate-900/40 border border-slate-800/80 animate-pulse p-8" />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800/80 backdrop-blur-lg">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-slate-200">Nessuna nuova notizia memorizzata per oggi</h3>
            <p className="text-slate-500 text-sm mt-2 mb-6">Clicca su "Aggiorna Notizie" per avviare la prima scansione AI del giorno.</p>
            <button
              onClick={handleManualScan}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-widest transition shadow-lg"
            >
              Avvia Scansione Ora
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredArticles.map(art => (
              <div
                key={art.id || art.url}
                className="group relative flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-7 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 backdrop-blur-xl"
              >
                <div>
                  {/* Card Header: Category & Date */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-extrabold uppercase tracking-wider">
                      {art.category || 'AI News'}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(art.published_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 leading-snug mb-3">
                    {art.title}
                  </h3>

                  {/* Italian AI Summary */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {art.summary_it}
                  </p>

                  {/* Takeaways Box */}
                  {art.takeaways && art.takeaways.length > 0 && (
                    <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800/80 mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-2.5">
                        Punti Chiave:
                      </span>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {art.takeaways.map((t, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="leading-snug">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer Attribution & Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="truncate max-w-[130px] font-semibold text-slate-400">Fonte: {art.source}</span>
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-purple-400 group-hover:text-cyan-300 font-bold hover:underline"
                  >
                    Leggi Fonte <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Integrated GDPR Newsletter Section */}
        <GDPRNewsletterForm />

      </div>
    </section>
  );
};

export default AINewsFeed;
