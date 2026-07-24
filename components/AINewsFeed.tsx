import React, { useEffect, useState } from 'react';
import { Sparkles, ExternalLink, RefreshCw, Layers, Calendar, CheckCircle2, ChevronRight, Send } from 'lucide-react';
import GDPRNewsletterForm from './GDPRNewsletterForm';

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
    setScanMessage('Scansione testate ed elaborazione AI in corso...');
    try {
      const res = await fetch('/api/news/trigger-scan', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setScanMessage(data.added > 0 ? `🎉 Trovate e riassunte ${data.added} nuove notizie!` : '✅ Tutte le ultime notizie erano già state elaborate.');
        fetchNews();
      } else {
        setScanMessage('⚠️ Impossibile completare la scansione automatica.');
      }
    } catch (err) {
      setScanMessage('❌ Errore durante la scansione.');
    } finally {
      setScanning(false);
      setTimeout(() => setScanMessage(null), 5000);
    }
  };

  const categories = ['Tutte', ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];

  const filteredArticles = selectedCategory === 'Tutte' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <section id="ai-news" className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* Glow ambient backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              Linh Labs Daily AI Radar
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Novità AI del Giorno <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">in Tempo Reale</span>
            </h2>
            <p className="mt-3 text-slate-400 max-w-2xl text-base sm:text-lg">
              Scansione quotidiana automatizzata con Intelligenza Artificiale. Notizie verificate, deduplicate e sintetizzate in italiano.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleManualScan}
              disabled={scanning}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold transition shadow-lg hover:border-purple-500/50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-purple-400 ${scanning ? 'animate-spin' : ''}`} />
              {scanning ? 'Scansione in corso...' : 'Aggiorna Notizie'}
            </button>
          </div>
        </div>

        {scanMessage && (
          <div className="mb-8 p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-sm flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span>{scanMessage}</span>
          </div>
        )}

        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Feed Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-2xl bg-slate-900/40 border border-slate-800/80 animate-pulse p-6" />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-300">Nessuna notizia pubblicata ancora per oggi</h3>
            <p className="text-slate-500 text-sm mt-1 mb-4">Clicca su "Aggiorna Notizie" per avviare la scansione AI quotidiana.</p>
            <button
              onClick={handleManualScan}
              className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition"
            >
              Avvia Scansione Ora
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredArticles.map(art => (
              <div
                key={art.id || art.url}
                className="group relative flex flex-col justify-between bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-6 transition duration-300 shadow-xl backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-bold uppercase tracking-wider">
                      {art.category || 'AI News'}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(art.published_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-3">
                    {art.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {art.summary_it}
                  </p>

                  {art.takeaways && art.takeaways.length > 0 && (
                    <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 mb-6">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 block mb-2">
                        Punti Chiave:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {art.takeaways.map((t, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate max-w-[120px]">Fonte: {art.source}</span>
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-400 group-hover:text-cyan-300 font-semibold hover:underline"
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
