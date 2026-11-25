import React, { useEffect, useState, useMemo } from 'react';
import { 
  Sparkles, ExternalLink, RefreshCw, Layers, Calendar, CheckCircle2, 
  Search, X, Tag, Filter, ChevronDown, Flame, TrendingUp, SlidersHorizontal 
} from 'lucide-react';
import GDPRNewsletterForm from './GDPRNewsletterForm';

interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  category: string;
  brands?: string[];
  published_at: string;
  summary_it: string;
  takeaways: string[];
  ranking_scores?: {
    total_score?: number;
  };
}

// Brand color themes for visually appealing and recognizable badges
const BRAND_STYLES: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  'Gemini': {
    bg: 'bg-blue-500/10 hover:bg-blue-500/20',
    text: 'text-blue-300',
    border: 'border-blue-500/30 hover:border-blue-400/60',
    glow: 'shadow-blue-500/20'
  },
  'OpenAI': {
    bg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
    text: 'text-emerald-300',
    border: 'border-emerald-500/30 hover:border-emerald-400/60',
    glow: 'shadow-emerald-500/20'
  },
  'Claude': {
    bg: 'bg-amber-500/10 hover:bg-amber-500/20',
    text: 'text-amber-300',
    border: 'border-amber-500/30 hover:border-amber-400/60',
    glow: 'shadow-amber-500/20'
  },
  'Meta / Llama': {
    bg: 'bg-indigo-500/10 hover:bg-indigo-500/20',
    text: 'text-indigo-300',
    border: 'border-indigo-500/30 hover:border-indigo-400/60',
    glow: 'shadow-indigo-500/20'
  },
  'DeepSeek': {
    bg: 'bg-cyan-500/10 hover:bg-cyan-500/20',
    text: 'text-cyan-300',
    border: 'border-cyan-500/30 hover:border-cyan-400/60',
    glow: 'shadow-cyan-500/20'
  },
  'Mistral': {
    bg: 'bg-orange-500/10 hover:bg-orange-500/20',
    text: 'text-orange-300',
    border: 'border-orange-500/30 hover:border-orange-400/60',
    glow: 'shadow-orange-500/20'
  },
  'NVIDIA': {
    bg: 'bg-lime-500/10 hover:bg-lime-500/20',
    text: 'text-lime-300',
    border: 'border-lime-500/30 hover:border-lime-400/60',
    glow: 'shadow-lime-500/20'
  },
  'Microsoft': {
    bg: 'bg-sky-500/10 hover:bg-sky-500/20',
    text: 'text-sky-300',
    border: 'border-sky-500/30 hover:border-sky-400/60',
    glow: 'shadow-sky-500/20'
  },
  'Apple': {
    bg: 'bg-rose-500/10 hover:bg-rose-500/20',
    text: 'text-rose-300',
    border: 'border-rose-500/30 hover:border-rose-400/60',
    glow: 'shadow-rose-500/20'
  },
  'Runway': {
    bg: 'bg-pink-500/10 hover:bg-pink-500/20',
    text: 'text-pink-300',
    border: 'border-pink-500/30 hover:border-pink-400/60',
    glow: 'shadow-pink-500/20'
  },
  'Midjourney': {
    bg: 'bg-violet-500/10 hover:bg-violet-500/20',
    text: 'text-violet-300',
    border: 'border-violet-500/30 hover:border-violet-400/60',
    glow: 'shadow-violet-500/20'
  },
  'xAI / Grok': {
    bg: 'bg-zinc-500/10 hover:bg-zinc-500/20',
    text: 'text-zinc-300',
    border: 'border-zinc-500/30 hover:border-zinc-400/60',
    glow: 'shadow-zinc-500/20'
  },
  'Qwen': {
    bg: 'bg-teal-500/10 hover:bg-teal-500/20',
    text: 'text-teal-300',
    border: 'border-teal-500/30 hover:border-teal-400/60',
    glow: 'shadow-teal-500/20'
  }
};

const DEFAULT_BRAND_STYLE = {
  bg: 'bg-purple-500/10 hover:bg-purple-500/20',
  text: 'text-purple-300',
  border: 'border-purple-500/30 hover:border-purple-400/60',
  glow: 'shadow-purple-500/20'
};

const POPULAR_BRANDS = [
  'Gemini',
  'OpenAI',
  'Claude',
  'Meta / Llama',
  'DeepSeek',
  'Mistral',
  'NVIDIA',
  'Microsoft',
  'Apple',
  'Runway',
  'Midjourney',
  'xAI / Grok'
];

export const AINewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // Filters & Search
  const [selectedBrand, setSelectedBrand] = useState<string>('Tutti');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutte');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

  // Progressive display pagination
  const PAGE_INCREMENT = 6;
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news/latest?limit=100');
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
    setScanMessage('Scansione di 10+ fonti AI internazionali in corso...');
    try {
      const res = await fetch('/api/news/trigger-scan', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setScanMessage(data.added > 0 ? `🎉 Trovate e sintetizzate ${data.added} nuove notizie uniche!` : '✅ Le notizie del giorno sono già aggiornate (zero duplicati).');
        fetchNews();
      } else {
        setScanMessage('⚠️ Scansione completata. Controlla il pannello admin.');
      }
    } catch (err) {
      setScanMessage('❌ Errore durante la scansione.');
    } finally {
      setScanning(false);
      setTimeout(() => setScanMessage(null), 6000);
    }
  };

  // Extract all categories with count
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = { 'Tutte': articles.length };
    articles.forEach(art => {
      if (art.category) {
        counts[art.category] = (counts[art.category] || 0) + 1;
      }
    });
    return counts;
  }, [articles]);

  const categories = useMemo(() => {
    return ['Tutte', ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];
  }, [articles]);

  // Extract all brands with count
  const brandStats = useMemo(() => {
    const counts: Record<string, number> = { 'Tutti': articles.length };
    
    // First count from explicit brands array
    articles.forEach(art => {
      if (Array.isArray(art.brands)) {
        art.brands.forEach(b => {
          counts[b] = (counts[b] || 0) + 1;
        });
      }
    });

    // Also ensure popular brands are tracked
    POPULAR_BRANDS.forEach(pb => {
      if (!counts[pb]) {
        const pbLower = pb.toLowerCase();
        const matches = articles.filter(a => {
          const text = `${a.title} ${a.summary_it} ${a.source}`.toLowerCase();
          return text.includes(pbLower);
        }).length;
        if (matches > 0) {
          counts[pb] = matches;
        }
      }
    });

    return counts;
  }, [articles]);

  const availableBrands = useMemo(() => {
    const unique = new Set<string>();
    POPULAR_BRANDS.forEach(b => {
      if (brandStats[b] && brandStats[b] > 0) {
        unique.add(b);
      }
    });
    Object.keys(brandStats).forEach(b => {
      if (b !== 'Tutti' && brandStats[b] > 0) {
        unique.add(b);
      }
    });
    return ['Tutti', ...Array.from(unique)];
  }, [brandStats]);

  // Combined Filter logic
  const filteredArticles = useMemo(() => {
    let list = [...articles];

    // Filter by category
    if (selectedCategory !== 'Tutte') {
      list = list.filter(a => a.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand !== 'Tutti') {
      const bLower = selectedBrand.toLowerCase();
      list = list.filter(a => {
        if (Array.isArray(a.brands) && a.brands.some(b => b.toLowerCase().includes(bLower) || bLower.includes(b.toLowerCase()))) {
          return true;
        }
        const text = `${a.title} ${a.summary_it} ${a.source}`.toLowerCase();
        return text.includes(bLower);
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(a => {
        const titleMatch = (a.title || '').toLowerCase().includes(q);
        const summaryMatch = (a.summary_it || '').toLowerCase().includes(q);
        const sourceMatch = (a.source || '').toLowerCase().includes(q);
        const categoryMatch = (a.category || '').toLowerCase().includes(q);
        const brandMatch = Array.isArray(a.brands) && a.brands.some(b => b.toLowerCase().includes(q));
        const takeawayMatch = Array.isArray(a.takeaways) && a.takeaways.some(t => t.toLowerCase().includes(q));
        return titleMatch || summaryMatch || sourceMatch || categoryMatch || brandMatch || takeawayMatch;
      });
    }

    // Sort
    if (sortBy === 'score') {
      list.sort((a, b) => (b.ranking_scores?.total_score || 0) - (a.ranking_scores?.total_score || 0));
    } else {
      list.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    }

    return list;
  }, [articles, selectedCategory, selectedBrand, searchQuery, sortBy]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
  };

  const resetAllFilters = () => {
    setSelectedCategory('Tutte');
    setSelectedBrand('Tutti');
    setSearchQuery('');
  };

  const isFilterActive = selectedCategory !== 'Tutte' || selectedBrand !== 'Tutti' || searchQuery.trim().length > 0;

  return (
    <section id="ai-news" className="relative py-28 bg-[#0A0E10] text-slate-100 overflow-hidden font-sans border-t border-slate-900">
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              LINH LABS · DAILY AI RADAR 2026
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Novità AI & Modelli <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-300">
                sintetizzate in tempo reale
              </span>
            </h2>

            <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              Il radar di Linh Labs. Seguiamo ogni giorno gli annunci ufficiali dei principali attori del settore (Google, OpenAI, Anthropic, Meta, DeepSeek, NVIDIA e altri) e li riassumiamo in sintesi brevi, senza doppioni.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleManualScan}
              disabled={scanning}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white text-xs font-bold uppercase tracking-wider transition duration-300 shadow-xl hover:border-purple-500/50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-cyan-400 ${scanning ? 'animate-spin' : ''}`} />
              {scanning ? 'Scansione in corso...' : 'Aggiorna le notizie AI'}
            </button>
          </div>
        </div>

        {scanMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-sm flex items-center gap-3 backdrop-blur-md animate-fadeIn">
            <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span className="font-medium">{scanMessage}</span>
          </div>
        )}

        {/* ─── FILTERS & SEARCH CONTROL PANEL ──────────────────────────────── */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 backdrop-blur-xl shadow-2xl space-y-6">
          
          {/* Top Row: Search Input & Sort Selector */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca per brand, modello, parola chiave (es. Gemini, GPT-5, DeepSeek, Claude, VRAM, Agenti)..."
                className="w-full pl-12 pr-10 py-3.5 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  title="Cancella ricerca"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" /> Ordina:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
                className="bg-slate-950 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="date">📅 Più recenti</option>
                <option value="score">⭐ Rilevanza</option>
              </select>
            </div>
          </div>

          {/* Brand Filter Pills Bar */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                Filtra per brand e modello:
              </span>
              {selectedBrand !== 'Tutti' && (
                <button
                  onClick={() => setSelectedBrand('Tutti')}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-medium"
                >
                  Tutti i brand
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {availableBrands.map(brand => {
                const count = brandStats[brand] || 0;
                const isSelected = selectedBrand === brand;
                const style = BRAND_STYLES[brand] || DEFAULT_BRAND_STYLE;

                return (
                  <button
                    key={brand}
                    onClick={() => handleBrandSelect(brand)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-2 whitespace-nowrap border ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white border-cyan-400/50 shadow-lg shadow-purple-900/30 scale-105'
                        : `${style.bg} ${style.text} ${style.border}`
                    }`}
                  >
                    <span>{brand}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-950/60 text-slate-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Chips Bar */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-purple-400" />
                Filtra per categoria:
              </span>
              {selectedCategory !== 'Tutte' && (
                <button
                  onClick={() => setSelectedCategory('Tutte')}
                  className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-medium"
                >
                  Tutte le categorie
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map(cat => {
                const count = categoryStats[cat] || 0;
                const isSelected = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-2 whitespace-nowrap border ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-900/30 scale-105'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filters Summary & Results Counter */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-300">
                Risultati: <strong className="text-cyan-400 font-bold">{filteredArticles.length}</strong> notizie trovate
              </span>

              {isFilterActive && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-600">|</span>
                  {selectedBrand !== 'Tutti' && (
                    <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold flex items-center gap-1">
                      Brand: {selectedBrand}
                      <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedBrand('Tutti')} />
                    </span>
                  )}
                  {selectedCategory !== 'Tutte' && (
                    <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-semibold flex items-center gap-1">
                      Categoria: {selectedCategory}
                      <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedCategory('Tutte')} />
                    </span>
                  )}
                  {searchQuery.trim() && (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold flex items-center gap-1">
                      Cerca: "{searchQuery}"
                      <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSearchQuery('')} />
                    </span>
                  )}
                  <button
                    onClick={resetAllFilters}
                    className="text-xs text-red-400 hover:text-red-300 underline font-semibold ml-2"
                  >
                    Azzera i filtri
                  </button>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Mostrando {Math.min(displayedArticles.length, filteredArticles.length)} di {filteredArticles.length}
            </div>
          </div>

        </div>

        {/* ─── ARTICLE CARDS GRID ─────────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-80 rounded-3xl bg-slate-900/40 border border-slate-800/80 animate-pulse p-8" />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800/80 backdrop-blur-lg mb-16">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-slate-200">Nessuna notizia trovata con i filtri selezionati</h3>
            <p className="text-slate-400 text-sm mt-2 mb-6 max-w-md mx-auto">
              Nessun articolo corrisponde ai criteri attuali {selectedBrand !== 'Tutti' ? `per il brand "${selectedBrand}"` : ''} {selectedCategory !== 'Tutte' ? `nella categoria "${selectedCategory}"` : ''}.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-widest transition shadow-lg"
            >
              Azzera i filtri
            </button>
          </div>
        ) : (
          <div className="space-y-12 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedArticles.map(art => {
                const primaryBrand = (art.brands && art.brands.length > 0) ? art.brands[0] : null;
                const brandStyle = primaryBrand ? (BRAND_STYLES[primaryBrand] || DEFAULT_BRAND_STYLE) : null;

                return (
                  <div
                    key={art.id || art.url}
                    className="group relative flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-7 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-950/40 backdrop-blur-xl"
                  >
                    <div>
                      {/* Card Header: Category, Brands & Date */}
                      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => setSelectedCategory(art.category)}
                            className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-extrabold uppercase tracking-wider hover:bg-purple-500/20 transition cursor-pointer"
                            title={`Filtra per categoria ${art.category}`}
                          >
                            {art.category || 'AI Innovation'}
                          </button>

                          {/* Brand Pills */}
                          {art.brands && art.brands.map(brand => {
                            const bStyle = BRAND_STYLES[brand] || DEFAULT_BRAND_STYLE;
                            return (
                              <button
                                key={brand}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBrandSelect(brand);
                                }}
                                className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wide transition cursor-pointer ${bStyle.bg} ${bStyle.text} ${bStyle.border}`}
                                title={`Filtra per brand ${brand}`}
                              >
                                {brand}
                              </button>
                            );
                          })}
                        </div>

                        <span className="text-xs text-slate-500 flex items-center gap-1 font-medium ml-auto">
                          <Calendar className="w-3 h-3 text-slate-400" />
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
                            Punti chiave:
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
                        Leggi la fonte <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Pagination Button */}
            {hasMore && (
              <div className="text-center pt-6">
                <button
                  onClick={() => setVisibleCount(prev => prev + PAGE_INCREMENT)}
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-widest transition shadow-xl hover:scale-105 duration-300"
                >
                  <span>Carica Altre Notizie (+{PAGE_INCREMENT})</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="text-xs text-slate-500 mt-3">
                  Visualizzate {displayedArticles.length} di {filteredArticles.length} notizie
                </div>
              </div>
            )}
          </div>
        )}

        {/* Integrated GDPR Newsletter Section */}
        <GDPRNewsletterForm />

      </div>
    </section>
  );
};

export default AINewsFeed;
