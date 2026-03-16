import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, Gamepad2, Swords, Bot, Link2, Globe, Sparkles, Shirt, Eye, Palette, MessageSquareText, FileSearch, Upload, Quote, Table, Image, FileSpreadsheet, Zap } from 'lucide-react';
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
  colorTheme: {
    gradient: string;
    accent: string;
    accentBg: string;
    accentBorder: string;
    accentText: string;
    glowColor: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    tagBg: string;
    tagBorder: string;
    tagText: string;
    ctaGradient: string;
    ctaShadow: string;
    radialFrom: string;
  };
  badgeIcon: React.ReactNode;
  features: {
    icon: React.ReactNode;
    labelKey: string;
    descKey: string;
  }[];
  stats: { value: string; label: string }[];
  tags: string[];
  statusLabel?: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export const PortfolioSlider: React.FC = () => {
  const { t } = useI18n();
  const [[currentSlide, direction], setSlide] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const projects: ProjectSlide[] = [
    {
      id: 'ragalo',
      image: '/ragolo.png',
      url: 'https://ragchat-production-8651.up.railway.app/',
      badgeKey: 'ragalo.badge',
      titleHighlightKey: 'ragalo.titleHighlight',
      subtitleKey: 'ragalo.subtitle',
      ctaKey: 'ragalo.cta',
      colorTheme: {
        gradient: 'from-emerald-950/30 via-slate-950 to-slate-950',
        accent: 'emerald',
        accentBg: 'bg-emerald-500/10',
        accentBorder: 'border-emerald-500/30',
        accentText: 'text-emerald-300',
        glowColor: 'bg-emerald-500/5',
        badgeBg: 'bg-emerald-500/10',
        badgeBorder: 'border-emerald-500/30',
        badgeText: 'text-emerald-300',
        tagBg: 'bg-slate-900/60',
        tagBorder: 'border-white/5',
        tagText: 'text-slate-500',
        ctaGradient: 'from-emerald-500 to-cyan-600',
        ctaShadow: 'hover:shadow-emerald-500/25',
        radialFrom: 'from-emerald-950/30',
      },
      badgeIcon: <MessageSquareText className="w-3.5 h-3.5" />,
      features: [
        { icon: <FileSearch />, labelKey: 'ragalo.feature1.label', descKey: 'ragalo.feature1.desc' },
        { icon: <Upload />, labelKey: 'ragalo.feature2.label', descKey: 'ragalo.feature2.desc' },
        { icon: <Quote />, labelKey: 'ragalo.feature3.label', descKey: 'ragalo.feature3.desc' },
        { icon: <MessageSquareText />, labelKey: 'ragalo.feature4.label', descKey: 'ragalo.feature4.desc' },
      ],
      stats: [
        { value: 'RAG', label: 'Technology' },
        { value: 'AI Chat', label: 'Interface' },
        { value: 'Docs', label: 'Knowledge' },
        { value: 'Live', label: 'Status' },
      ],
      tags: ['RAG', 'AI Chat', 'Document Intelligence', 'LLM-Powered', 'Knowledge Base', 'Conversational AI'],
      statusLabel: 'Live',
    },
    {
      id: 'sfatify',
      image: '/sfatify.png',
      url: 'https://sfatify.up.railway.app/',
      badgeKey: 'sfatify.badge',
      titleHighlightKey: 'sfatify.titleHighlight',
      subtitleKey: 'sfatify.subtitle',
      ctaKey: 'sfatify.cta',
      colorTheme: {
        gradient: 'from-amber-950/30 via-slate-950 to-slate-950',
        accent: 'amber',
        accentBg: 'bg-amber-500/10',
        accentBorder: 'border-amber-500/30',
        accentText: 'text-amber-300',
        glowColor: 'bg-amber-500/5',
        badgeBg: 'bg-amber-500/10',
        badgeBorder: 'border-amber-500/30',
        badgeText: 'text-amber-300',
        tagBg: 'bg-slate-900/60',
        tagBorder: 'border-white/5',
        tagText: 'text-slate-500',
        ctaGradient: 'from-amber-500 to-orange-600',
        ctaShadow: 'hover:shadow-amber-500/25',
        radialFrom: 'from-amber-950/30',
      },
      badgeIcon: <Table className="w-3.5 h-3.5" />,
      features: [
        { icon: <FileSpreadsheet />, labelKey: 'sfatify.feature1.label', descKey: 'sfatify.feature1.desc' },
        { icon: <Image />, labelKey: 'sfatify.feature2.label', descKey: 'sfatify.feature2.desc' },
        { icon: <Table />, labelKey: 'sfatify.feature3.label', descKey: 'sfatify.feature3.desc' },
        { icon: <Zap />, labelKey: 'sfatify.feature4.label', descKey: 'sfatify.feature4.desc' },
      ],
      stats: [
        { value: 'AI', label: 'Assistant' },
        { value: 'Sheets', label: 'Integration' },
        { value: 'Multi', label: 'Input' },
        { value: 'Live', label: 'Status' },
      ],
      tags: ['AI Assistant', 'Google Sheets', 'Spreadsheet AI', 'Image-to-Data', 'Automation', 'AI-Powered'],
      statusLabel: 'Live',
    },
    {
      id: 'pumbo',
      image: '/pumbo.png',
      url: 'https://www.pumbo.style/',
      badgeKey: 'pumbo.badge',
      titleHighlightKey: 'pumbo.titleHighlight',
      subtitleKey: 'pumbo.subtitle',
      ctaKey: 'pumbo.cta',
      colorTheme: {
        gradient: 'from-violet-950/30 via-slate-950 to-slate-950',
        accent: 'violet',
        accentBg: 'bg-violet-500/10',
        accentBorder: 'border-violet-500/30',
        accentText: 'text-violet-300',
        glowColor: 'bg-violet-500/5',
        badgeBg: 'bg-violet-500/10',
        badgeBorder: 'border-violet-500/30',
        badgeText: 'text-violet-300',
        tagBg: 'bg-slate-900/60',
        tagBorder: 'border-white/5',
        tagText: 'text-slate-500',
        ctaGradient: 'from-violet-500 to-purple-600',
        ctaShadow: 'hover:shadow-violet-500/25',
        radialFrom: 'from-violet-950/30',
      },
      badgeIcon: <Sparkles className="w-3.5 h-3.5" />,
      features: [
        { icon: <Sparkles />, labelKey: 'pumbo.feature1.label', descKey: 'pumbo.feature1.desc' },
        { icon: <Eye />, labelKey: 'pumbo.feature2.label', descKey: 'pumbo.feature2.desc' },
        { icon: <Palette />, labelKey: 'pumbo.feature3.label', descKey: 'pumbo.feature3.desc' },
        { icon: <Shirt />, labelKey: 'pumbo.feature4.label', descKey: 'pumbo.feature4.desc' },
      ],
      stats: [
        { value: 'AI', label: 'Stylist' },
        { value: 'Virtual', label: 'Try-On' },
        { value: 'Daily', label: 'Inspiration' },
        { value: 'Live', label: 'Status' },
      ],
      tags: ['AI Stylist', 'Fashion Tech', 'Virtual Try-On', 'Style Agent', 'Outfit Generator', 'AI-Powered'],
      statusLabel: 'Live',
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
      colorTheme: {
        gradient: 'from-yellow-950/30 via-slate-950 to-slate-950',
        accent: 'yellow',
        accentBg: 'bg-yellow-500/10',
        accentBorder: 'border-yellow-500/30',
        accentText: 'text-yellow-300',
        glowColor: 'bg-yellow-500/5',
        badgeBg: 'bg-yellow-500/10',
        badgeBorder: 'border-yellow-500/30',
        badgeText: 'text-yellow-300',
        tagBg: 'bg-slate-900/60',
        tagBorder: 'border-white/5',
        tagText: 'text-slate-500',
        ctaGradient: 'from-yellow-500 to-amber-600',
        ctaShadow: 'hover:shadow-yellow-500/25',
        radialFrom: 'from-yellow-950/30',
      },
      badgeIcon: <Gamepad2 className="w-3.5 h-3.5" />,
      features: [
        { icon: <Swords />, labelKey: 'aoa.feature1.label', descKey: 'aoa.feature1.desc' },
        { icon: <Bot />, labelKey: 'aoa.feature2.label', descKey: 'aoa.feature2.desc' },
        { icon: <Link2 />, labelKey: 'aoa.feature3.label', descKey: 'aoa.feature3.desc' },
        { icon: <Globe />, labelKey: 'aoa.feature4.label', descKey: 'aoa.feature4.desc' },
      ],
      stats: [
        { value: 'RTS', label: 'Game Genre' },
        { value: 'MegaETH', label: 'Blockchain' },
        { value: 'On-Chain', label: 'AI Agents' },
        { value: 'Live', label: 'Status' },
      ],
      tags: ['MegaETH', 'AI Agents', 'Real-Time Strategy', 'On-Chain', 'Multiplayer', 'Autonomous'],
      statusLabel: 'Live',
    },
  ];

  const paginate = useCallback((newDirection: number) => {
    setSlide(([prev]) => {
      const next = (prev + newDirection + projects.length) % projects.length;
      return [next, newDirection];
    });
  }, [projects.length]);

  const goToSlide = useCallback((index: number) => {
    setSlide(([prev]) => {
      const dir = index > prev ? 1 : -1;
      return [index, dir];
    });
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const project = projects[currentSlide];
  const theme = project.colorTheme;

  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden min-h-0 lg:min-h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${theme.radialFrom} via-slate-950 to-slate-950 -z-10 transition-all duration-700`} />
      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] ${theme.glowColor} rounded-full blur-[150px] pointer-events-none transition-all duration-700`} />
      <div className={`absolute bottom-0 right-0 w-[400px] h-[400px] ${theme.glowColor} rounded-full blur-[100px] pointer-events-none transition-all duration-700`} />

      {/* Section header */}
      <div className="container mx-auto px-6 pt-16 lg:pt-24 pb-6 lg:pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-4">
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${theme.badgeBorder} ${theme.badgeBg} ${theme.badgeText} text-xs font-bold tracking-[0.2em] uppercase`}>
            {t('portfolio.badge')}
          </span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('portfolio.title')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-400 to-violet-500">{t('portfolio.titleHighlight')}</span>
          </h2>
        </motion.div>
      </div>

      {/* Slide content */}
      <div className="container mx-auto px-6 pb-16 lg:pb-24 relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={project.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
          >
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center mb-8 lg:mb-12">
              {/* Left — Image */}
              <div className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${theme.ctaGradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src={project.image} alt={t(project.titleHighlightKey)} className="w-full h-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  {project.statusLabel && (
                    <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full ${theme.accentBg} backdrop-blur-md border ${theme.accentBorder}`}>
                      <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: theme.accent === 'yellow' ? '#facc15' : theme.accent === 'emerald' ? '#34d399' : theme.accent === 'amber' ? '#f59e0b' : '#a78bfa' }} />
                      <span className={`${theme.accentText} text-xs font-bold uppercase tracking-wider`}>{project.statusLabel}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right — Info */}
              <div>
                {/* Title */}
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {project.titleKey && t(project.titleKey) !== project.titleKey && t(project.titleKey)}
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.ctaGradient}`}>{t(project.titleHighlightKey)}</span>
                </h3>

                {/* Subtitle */}
                <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-xl font-light leading-relaxed mb-4 lg:mb-6">{t(project.subtitleKey)}</p>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 lg:gap-3 mb-4 lg:mb-6">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="text-center bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-xl p-2 lg:p-3">
                      <div className="font-display text-xs sm:text-base lg:text-lg font-bold text-white truncate">{stat.value}</div>
                      <div className="text-slate-500 text-[9px] lg:text-[10px] uppercase tracking-widest mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Features — hidden on mobile for a cleaner look */}
                <div className="hidden lg:block space-y-3 mb-6">
                  {project.features.map((feature, i) => (
                    <div key={i} className={`group/card flex items-start gap-4 p-3 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-xl hover:border-${theme.accent}-500/20 transition-all duration-300`}>
                      <div className={`w-9 h-9 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center ${theme.accentText} flex-shrink-0 group-hover/card:scale-110 transition-transform`}>
                        {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-white mb-0.5">{t(feature.labelKey)}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{t(feature.descKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 bg-gradient-to-r ${theme.ctaGradient} text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-lg ${theme.ctaShadow} transition-all duration-300 group`}
                >
                  {t(project.ctaKey)}
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Tags — hidden on mobile */}
            <div className="hidden lg:flex flex-wrap justify-center gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className={`px-4 py-1.5 ${theme.tagBg} border ${theme.tagBorder} rounded-full ${theme.tagText} text-xs font-medium`}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-12 lg:h-12 rounded-full bg-slate-900/70 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-slate-800/80 hover:border-white/20 transition-all duration-300 z-10"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-12 lg:h-12 rounded-full bg-slate-900/70 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-slate-800/80 hover:border-white/20 transition-all duration-300 z-10"
          aria-label="Next project"
        >
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>

        {/* Dot navigation */}
        <div className="flex justify-center gap-3 mt-6 lg:mt-10">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? `bg-gradient-to-r ${theme.ctaGradient} scale-125 shadow-lg`
                  : 'bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
