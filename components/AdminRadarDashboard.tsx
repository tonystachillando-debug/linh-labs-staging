import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Send, Image, Users, ShieldCheck, CheckCircle2, Edit3, Trash2, Eye, ExternalLink, Play, Layout } from 'lucide-react';

export const AdminRadarDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'newsletter' | 'instagram' | 'subscribers'>('articles');
  const [articles, setArticles] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const resNews = await fetch('/api/news/latest?limit=20');
      if (resNews.ok) {
        const data = await resNews.json();
        setArticles(data.articles || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleScanTrigger = async () => {
    setActionMsg('Scansione testate AI ed elaborazione in corso...');
    try {
      const res = await fetch('/api/news/trigger-scan', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setActionMsg(`🎉 Scansione completata! ${data.added} nuove notizie elaborate.`);
        loadData();
      } else {
        setActionMsg('⚠️ Errore durante la scansione.');
      }
    } catch (err) {
      setActionMsg('❌ Errore di connessione.');
    }
  };

  const handleNewsletterTrigger = async () => {
    setActionMsg('Invio newsletter a tutti gli iscritti in corso...');
    try {
      const res = await fetch('/api/news/trigger-newsletter', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setActionMsg(`✅ Newsletter inviata con successo a ${data.recipientCount || 0} iscritti!`);
        loadData();
      } else {
        setActionMsg('⚠️ Errore invio newsletter.');
      }
    } catch (err) {
      setActionMsg('❌ Errore invio newsletter.');
    }
  };

  const handlePublishEdition = async () => {
    setActionMsg('Pubblicazione immediata sul sito live ed invio newsletter in corso...');
    try {
      const res = await fetch('/api/news/publish-edition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sendEmail: true })
      });
      const data = await res.json();
      if (data.success) {
        setActionMsg(`🚀 PUBBLICATO! ${data.publishedCount} notizie sono ora visibili sul sito e inviate via email.`);
        loadData();
      } else {
        setActionMsg('⚠️ Errore durante la pubblicazione.');
      }
    } catch (err) {
      setActionMsg('❌ Errore durante la pubblicazione.');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Linh Labs Admin Command Center
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Gestione AI Radar & Newsletter <span className="text-cyan-400">— 24 Luglio 2026</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleScanTrigger}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider transition"
            >
              <RefreshCw className="w-4 h-4" /> 1. Scansiona AI
            </button>
            
            <button
              onClick={handlePublishEdition}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-xl"
            >
              <Play className="w-4 h-4 fill-white" /> 2. Approva & Pubblica Live sul Sito
            </button>
          </div>
        </div>

        {actionMsg && (
          <div className="mb-8 p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 text-cyan-200 text-sm font-semibold flex items-center gap-3 shadow-lg">
            <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <span>{actionMsg}</span>
          </div>
        )}

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-800 mb-8 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
              activeTab === 'articles'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layout className="w-4 h-4" /> Notizie Pubblicate ({articles.length})
          </button>

          <button
            onClick={() => setActiveTab('newsletter')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
              activeTab === 'newsletter'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" /> Anteprima Email Newsletter
          </button>

          <button
            onClick={() => setActiveTab('instagram')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
              activeTab === 'instagram'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Image className="w-4 h-4" /> Caroselli Instagram AI
          </button>
        </div>

        {/* Tab 1: Articles Management */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-200 mb-4">Edizione del 24 Luglio 2026</h2>
            <div className="grid grid-cols-1 gap-4">
              {articles.map((art, idx) => (
                <div key={art.id || idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-purple-500/40 transition">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-extrabold uppercase rounded-full">
                        {art.category}
                      </span>
                      {art.ranking_scores && (
                        <span className="px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold rounded-full">
                          ⭐ Score Oggettivo: {art.ranking_scores.total_score}/100
                        </span>
                      )}
                      <span className="text-xs text-slate-500 font-medium">{art.source} • {new Date(art.published_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">{art.title}</h3>
                    <p className="text-slate-300 text-sm">{art.summary_it}</p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={async () => {
                        setActionMsg(`✏️ Correzione di bozza AI in corso per "${art.title.slice(0, 30)}..."`);
                        const res = await fetch('/api/news/proofread', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ articleId: art.id, article: art })
                        });
                        const data = await res.json();
                        if (data.success) {
                          setActionMsg(`✨ Bozza corretta ed aggiornata con successo!`);
                          loadData();
                        }
                      }}
                      className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Sparkles className="w-4 h-4 text-purple-400" /> Correttore Bozze AI
                    </button>

                    <a href={art.url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4" /> Fonte
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Newsletter Preview */}
        {activeTab === 'newsletter' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <h2 className="font-display text-xl font-bold text-white">Anteprima Newsletter HTML (24 Luglio 2026)</h2>
              <button onClick={handleNewsletterTrigger} className="px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-full font-bold text-xs uppercase">
                Invia a tutti gli iscritti
              </button>
            </div>
            <div className="bg-[#020617] border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest">LINH LABS · DAILY AI RADAR</span>
                <h3 className="font-display text-2xl font-extrabold text-white mt-1">Le Novità AI del Giorno 🚀 — 24 Luglio 2026</h3>
              </div>
              {articles.map((art, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <span className="text-[10px] font-bold uppercase text-purple-400">{art.category}</span>
                  <h4 className="font-display text-lg font-bold text-white mt-1">{art.title}</h4>
                  <p className="text-slate-300 text-sm mt-2">{art.summary_it}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Instagram Carousel Generator Preview */}
        {activeTab === 'instagram' && (
          <div className="space-y-6 text-center">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 max-w-3xl mx-auto">
              <Image className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <h2 className="font-display text-2xl font-bold text-white mb-2">Generatore Immagini Slide Instagram AI (1080x1350px)</h2>
              <p className="text-slate-400 text-sm mb-6">Genera i file immagini ad alta risoluzione (1080x1350px) pronti per essere pubblicati direttamente sul profilo Instagram di Linh Labs.</p>
              
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a
                  href="/api/news/carousel-preview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-widest transition"
                >
                  <Eye className="w-4 h-4" /> Anteprima Slide HTML
                </a>

                <button
                  onClick={async () => {
                    setActionMsg('Generazione delle immagini 1080x1350px in corso...');
                    const res = await fetch('/api/news/generate-carousel-images', { method: 'POST' });
                    const data = await res.json();
                    if (data.success) {
                      setActionMsg(data.message);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition duration-300"
                >
                  <Sparkles className="w-4 h-4" /> Genera File Immagini Slide (1080x1350px)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminRadarDashboard;
