import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ExternalLink, Gamepad2, Swords, Bot, Link2, Globe,
  Sparkles, Shirt, Eye, Palette, MessageSquareText,
  FileSearch, Upload, Quote, Table, Image, FileSpreadsheet, Zap, ArrowRight,
  FlaskConical, Inbox, Calculator, CalendarClock, Users, WifiOff, HeartHandshake, ShieldCheck
} from 'lucide-react';
import { useI18n } from '../i18n';

interface ProjectSlide {
  id: string;
  image: string;
  url: string;
  badgeKey: string;
  titleKey?: string;
  titleHighlightKey: string;
  subtitleKey: string;
  ctaKey: string;
  hideCta?: boolean;
  accentColor: string;
  accentFrom: string;
  accentTo: string;
  glowClass: string;
  badgeIcon: React.ReactNode;
  features: { icon: React.ReactNode; labelKey: string; descKey: string }[];
  tags: string[];
  statusLabel?: string;
  number: string;
  /** Nasconde il progetto dal portfolio senza cancellarlo */
  hidden?: boolean;
  /** Nota legale/di attribuzione sotto le feature */
  noteKey?: string;
}

export const PortfolioSlider: React.FC = () => {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);

  const allProjects: ProjectSlide[] = [
    {
      id: 'galena',
      image: '/images/galena-hero.jpg',
      url: '',
      badgeKey: 'galena.badge',
      titleHighlightKey: 'galena.titleHighlight',
      subtitleKey: 'galena.subtitle',
      ctaKey: 'galena.cta',
      hideCta: true,
      accentColor: '#E3A857',
      accentFrom: 'from-amber-300',
      accentTo: 'to-amber-500',
      glowClass: 'bg-amber-500',
      badgeIcon: <FlaskConical className="w-3.5 h-3.5" />,
      features: [
        { icon: <Inbox />, labelKey: 'galena.feature1.label', descKey: 'galena.feature1.desc' },
        { icon: <FlaskConical />, labelKey: 'galena.feature2.label', descKey: 'galena.feature2.desc' },
        { icon: <Calculator />, labelKey: 'galena.feature3.label', descKey: 'galena.feature3.desc' },
        { icon: <CalendarClock />, labelKey: 'galena.feature4.label', descKey: 'galena.feature4.desc' },
      ],
      tags: ['Pharmacy', 'AI Agents', 'Human-in-the-loop', 'Galenica'],
      statusLabel: 'Pilot',
      number: '',
    },
    {
      id: 'faro',
      image: '/images/faro-dashboard.jpg',
      url: 'https://faro-aba.netlify.app/demo',
      badgeKey: 'faro.badge',
      titleHighlightKey: 'faro.titleHighlight',
      subtitleKey: 'faro.subtitle',
      ctaKey: 'faro.cta',
      accentColor: '#2DD4BF',
      accentFrom: 'from-teal-300',
      accentTo: 'to-teal-500',
      glowClass: 'bg-teal-500',
      badgeIcon: <HeartHandshake className="w-3.5 h-3.5" />,
      features: [
        { icon: <Users />, labelKey: 'faro.feature1.label', descKey: 'faro.feature1.desc' },
        { icon: <WifiOff />, labelKey: 'faro.feature2.label', descKey: 'faro.feature2.desc' },
        { icon: <HeartHandshake />, labelKey: 'faro.feature3.label', descKey: 'faro.feature3.desc' },
        { icon: <ShieldCheck />, labelKey: 'faro.feature4.label', descKey: 'faro.feature4.desc' },
      ],
      tags: ['HealthTech', 'ABA', 'PWA', 'AI Guardrails'],
      statusLabel: 'Pilot',
      number: '',
      noteKey: 'faro.note',
    },
    {
      id: 'ragalo',
      image: '/ragolo.png',
      url: 'https://www.ragalo.xyz/',
      badgeKey: 'ragalo.badge',
      titleHighlightKey: 'ragalo.titleHighlight',
      subtitleKey: 'ragalo.subtitle',
      ctaKey: 'ragalo.cta',
      accentColor: '#99F6E4',
      accentFrom: 'from-emerald-400',
      accentTo: 'to-cyan-500',
      glowClass: 'bg-emerald-500',
      badgeIcon: <MessageSquareText className="w-3.5 h-3.5" />,
      features: [
        { icon: <FileSearch />, labelKey: 'ragalo.feature1.label', descKey: 'ragalo.feature1.desc' },
        { icon: <Upload />, labelKey: 'ragalo.feature2.label', descKey: 'ragalo.feature2.desc' },
        { icon: <Quote />, labelKey: 'ragalo.feature3.label', descKey: 'ragalo.feature3.desc' },
        { icon: <MessageSquareText />, labelKey: 'ragalo.feature4.label', descKey: 'ragalo.feature4.desc' },
      ],
      tags: ['RAG', 'AI Chat', 'Document Intelligence', 'LLM-Powered'],
      statusLabel: 'Live',
      number: '',
    },
    {
      id: 'sfatify',
      image: '/sfatify.png',
      url: 'https://sfatify.vercel.app/',
      badgeKey: 'sfatify.badge',
      titleHighlightKey: 'sfatify.titleHighlight',
      subtitleKey: 'sfatify.subtitle',
      ctaKey: 'sfatify.cta',
      accentColor: '#FFB547',
      accentFrom: 'from-amber-400',
      accentTo: 'to-orange-500',
      glowClass: 'bg-amber-500',
      badgeIcon: <Table className="w-3.5 h-3.5" />,
      features: [
        { icon: <FileSpreadsheet />, labelKey: 'sfatify.feature1.label', descKey: 'sfatify.feature1.desc' },
        { icon: <Image />, labelKey: 'sfatify.feature2.label', descKey: 'sfatify.feature2.desc' },
        { icon: <Table />, labelKey: 'sfatify.feature3.label', descKey: 'sfatify.feature3.desc' },
        { icon: <Zap />, labelKey: 'sfatify.feature4.label', descKey: 'sfatify.feature4.desc' },
      ],
      tags: ['AI Assistant', 'Google Sheets', 'Image-to-Data', 'Automation'],
      statusLabel: 'Live',
      number: '',
    },
    {
      id: 'pumbo',
      image: '/pumbo.png',
      url: 'https://www.pumbo.style/',
      badgeKey: 'pumbo.badge',
      titleHighlightKey: 'pumbo.titleHighlight',
      subtitleKey: 'pumbo.subtitle',
      ctaKey: 'pumbo.cta',
      accentColor: '#E2E8F0',
      accentFrom: 'from-violet-400',
      accentTo: 'to-purple-600',
      glowClass: 'bg-violet-500',
      badgeIcon: <Sparkles className="w-3.5 h-3.5" />,
      features: [
        { icon: <Sparkles />, labelKey: 'pumbo.feature1.label', descKey: 'pumbo.feature1.desc' },
        { icon: <Eye />, labelKey: 'pumbo.feature2.label', descKey: 'pumbo.feature2.desc' },
        { icon: <Palette />, labelKey: 'pumbo.feature3.label', descKey: 'pumbo.feature3.desc' },
        { icon: <Shirt />, labelKey: 'pumbo.feature4.label', descKey: 'pumbo.feature4.desc' },
      ],
      tags: ['AI Stylist', 'Fashion Tech', 'Virtual Try-On', 'Style Agent'],
      statusLabel: 'Live',
      number: '',
    },
    {
      id: 'age-of-agents',
      image: '/images/age-of-agents.png',
      url: 'https://www.ageofagents.xyz/',
      badgeKey: 'aoa.badge',
      titleKey: 'aoa.title',
      titleHighlightKey: 'aoa.titleHighlight',
      subtitleKey: 'aoa.subtitle',
      ctaKey: 'aoa.cta',
      accentColor: '#facc15',
      accentFrom: 'from-yellow-400',
      accentTo: 'to-amber-500',
      glowClass: 'bg-yellow-500',
      badgeIcon: <Gamepad2 className="w-3.5 h-3.5" />,
      features: [
        { icon: <Swords />, labelKey: 'aoa.feature1.label', descKey: 'aoa.feature1.desc' },
        { icon: <Bot />, labelKey: 'aoa.feature2.label', descKey: 'aoa.feature2.desc' },
        { icon: <Link2 />, labelKey: 'aoa.feature3.label', descKey: 'aoa.feature3.desc' },
        { icon: <Globe />, labelKey: 'aoa.feature4.label', descKey: 'aoa.feature4.desc' },
      ],
      tags: ['MegaETH', 'AI Agents', 'Real-Time Strategy', 'On-Chain'],
      statusLabel: 'Live',
      number: '',
      hideCta: true,
      // Nascosto per ora: rimettere a false per ripubblicarlo
      hidden: true,
    },
  ];

  const projects = allProjects
    .filter(p => !p.hidden)
    .map((p, i) => ({ ...p, number: String(i + 1).padStart(2, '0') }));

  const AUTOPLAY_MS = 7000;
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((index: number) => {
    const n = projects.length;
    setCurrentSlide(((index % n) + n) % n);
    setProgress(0);
  }, [projects.length]);

  // Avanzamento automatico con barra di progresso; si ferma al passaggio del mouse
  useEffect(() => {
    if (paused || reduceMotion) return;
    const step = 50;
    const id = window.setInterval(() => {
      setProgress(p => {
        const next = p + step / AUTOPLAY_MS;
        if (next >= 1) {
          setCurrentSlide(c => (c + 1) % projects.length);
          return 0;
        }
        return next;
      });
    }, step);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, projects.length]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentSlide + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(currentSlide - 1); }
  };

  const project = projects[currentSlide];

  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden py-20 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Luce d'ambiente che segue il progetto attivo */}
      <div
        className="absolute top-1/4 right-[15%] w-[640px] h-[640px] rounded-full blur-[180px] pointer-events-none opacity-[0.12] transition-colors duration-1000"
        style={{ backgroundColor: project.accentColor }}
      />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── Sinistra: titolo ed elenco ── */}
          <div className="lg:col-span-4 min-w-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.02] tracking-tight mb-8 lg:mb-10"
            >
              {t('portfolio.title')}
              <span className="text-brand-gradient">{t('portfolio.titleHighlight')}</span>
            </motion.h2>

            <div
              role="tablist"
              aria-label={t('portfolio.titleHighlight')}
              onKeyDown={onKeyDown}
              className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-6 px-6 lg:mx-0 lg:px-0 pb-2 lg:pb-0"
              style={{ scrollbarWidth: 'none' }}
            >
              {projects.map((p, i) => {
                const active = i === currentSlide;
                return (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => goTo(i)}
                    className={`relative shrink-0 lg:w-full text-left rounded-2xl px-5 py-4 transition-colors duration-300 overflow-hidden ${
                      active ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-mono text-xs transition-colors duration-300"
                        style={{ color: active ? p.accentColor : 'rgba(139,152,159,0.6)' }}
                      >
                        {p.number}
                      </span>
                      <span
                        className={`font-display text-xl lg:text-2xl font-bold whitespace-nowrap transition-colors duration-300 ${
                          active ? 'text-white' : 'text-slate-500'
                        }`}
                      >
                        {p.titleKey && t(p.titleKey) !== p.titleKey ? t(p.titleKey) : ''}
                        {t(p.titleHighlightKey)}
                      </span>
                    </div>
                    {/* Barra di avanzamento */}
                    <span className="absolute left-5 right-5 bottom-1.5 h-[2px] rounded-full bg-white/[0.06] overflow-hidden">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: active ? `${(reduceMotion ? 1 : progress) * 100}%` : '0%',
                          backgroundColor: p.accentColor,
                          transition: active && progress > 0 ? 'none' : 'width 0.3s',
                        }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Destra: palco del progetto ── */}
          <div className="lg:col-span-8 min-w-0">
            <div
              className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]"
            >
              {/* Tutte le immagini restano montate: si cambia solo l'opacità, quindi l'altezza non salta */}
              {projects.map((p, i) => (
                <img
                  key={p.id}
                  src={p.image}
                  alt={t(p.titleHighlightKey)}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out"
                  style={{
                    opacity: i === currentSlide ? 1 : 0,
                    transform: i === currentSlide ? 'scale(1)' : 'scale(1.04)',
                  }}
                />
              ))}

              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,14,16,0.98) 0%, rgba(10,14,16,0.92) 38%, rgba(10,14,16,0.55) 60%, rgba(10,14,16,0.05) 85%, transparent 100%)' }}
              />

              {/* Frecce */}
              <div className="absolute top-4 right-4 flex gap-2">
                {[{ d: -1, label: '‹' }, { d: 1, label: '›' }].map(({ d, label }) => (
                  <button
                    key={d}
                    onClick={() => goTo(currentSlide + d)}
                    aria-label={d < 0 ? 'Progetto precedente' : 'Progetto successivo'}
                    className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white text-xl leading-none hover:bg-white hover:text-slate-950 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Testo sul fondo dell'immagine */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 bottom-0 p-6 md:p-8"
                >
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                    {t(project.titleHighlightKey)}
                  </h3>
                  <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-5 sm:line-clamp-3">
                    {t(project.subtitleKey)}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 min-h-[40px]">
                    {!project.hideCta && project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest text-slate-950 transition-transform duration-300 hover:scale-[1.04]"
                        style={{ background: project.accentColor }}
                      >
                        {t(project.ctaKey)}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.noteKey && (
                      <span className="text-xs text-slate-400">{t(project.noteKey)}</span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Funzioni: altezza fissa per non far saltare la pagina */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4"
              >
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 bg-white/[0.03] border border-white/[0.06] min-h-[150px] lg:min-h-0 lg:h-[116px] overflow-hidden"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span style={{ color: project.accentColor }}>
                        {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
                      </span>
                      <p className="text-white text-sm font-semibold leading-tight">{t(feature.labelKey)}</p>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed lg:line-clamp-3">{t(feature.descKey)}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
