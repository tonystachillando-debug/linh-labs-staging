import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Gamepad2, Swords, Bot, Link2, Globe,
  Sparkles, Shirt, Eye, Palette, MessageSquareText,
  FileSearch, Upload, Quote, Table, Image, FileSpreadsheet, Zap, ArrowRight
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
}

export const PortfolioSlider: React.FC = () => {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);

  const projects: ProjectSlide[] = [
    {
      id: 'ragalo',
      image: '/ragolo.png',
      url: 'https://ragchat-production-8651.up.railway.app/',
      badgeKey: 'ragalo.badge',
      titleHighlightKey: 'ragalo.titleHighlight',
      subtitleKey: 'ragalo.subtitle',
      ctaKey: 'ragalo.cta',
      accentColor: '#34d399',
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
      number: '01',
    },
    {
      id: 'sfatify',
      image: '/sfatify.png',
      url: 'https://sfatify.up.railway.app/',
      badgeKey: 'sfatify.badge',
      titleHighlightKey: 'sfatify.titleHighlight',
      subtitleKey: 'sfatify.subtitle',
      ctaKey: 'sfatify.cta',
      accentColor: '#f59e0b',
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
      number: '02',
    },
    {
      id: 'pumbo',
      image: '/pumbo.png',
      url: 'https://www.pumbo.style/',
      badgeKey: 'pumbo.badge',
      titleHighlightKey: 'pumbo.titleHighlight',
      subtitleKey: 'pumbo.subtitle',
      ctaKey: 'pumbo.cta',
      accentColor: '#a78bfa',
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
      number: '03',
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
      number: '04',
      hideCta: true,
    },
  ];

  const goTo = useCallback((index: number) => {
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
  }, [currentSlide]);

  const project = projects[currentSlide];

  return (
    <section id="portfolio" className="relative w-full overflow-hidden">

      {/* Ambient glow that follows the accent */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-10 transition-all duration-1000"
        style={{ backgroundColor: project.accentColor }}
      />

      <div className="container mx-auto px-6 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* ── LEFT: Sticky editorial panel ── */}
          <div className="lg:w-5/12 lg:sticky lg:top-24 lg:self-start">

            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                {t('portfolio.badge')}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[0.95] tracking-tighter">
                {t('portfolio.title')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-400 to-violet-500">
                  {t('portfolio.titleHighlight')}
                </span>
              </h2>
            </motion.div>

            {/* Vertical project list / navigation */}
            <div className="flex flex-col gap-1">
              {projects.map((p, i) => {
                const isActive = i === currentSlide;
                return (
                  <button
                    key={p.id}
                    onClick={() => goTo(i)}
                    className="group w-full text-left px-4 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                      border: isActive ? `1px solid ${p.accentColor}22` : '1px solid transparent',
                    }}
                  >
                    {/* Active left indicator */}
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full transition-all duration-300"
                      style={{
                        height: isActive ? '60%' : '0%',
                        backgroundColor: p.accentColor,
                        boxShadow: isActive ? `0 0 12px ${p.accentColor}` : 'none',
                      }}
                    />

                    <div className="flex items-center gap-4 pl-2">
                      {/* Number */}
                      <span
                        className="font-display text-xs font-bold tracking-widest transition-colors duration-300"
                        style={{ color: isActive ? p.accentColor : 'rgba(100,116,139,0.6)' }}
                      >
                        {p.number}
                      </span>

                      {/* Project name */}
                      <span
                        className="font-display text-lg md:text-xl font-bold transition-colors duration-300 flex-1"
                        style={{ color: isActive ? '#fff' : 'rgba(148,163,184,0.5)' }}
                      >
                        {p.titleKey && t(p.titleKey) !== p.titleKey ? t(p.titleKey) : ''}
                        {t(p.titleHighlightKey)}
                      </span>

                      {/* Arrow */}
                      <ArrowRight
                        className="w-4 h-4 transition-all duration-300"
                        style={{
                          color: isActive ? p.accentColor : 'transparent',
                          transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                    </div>

                    {/* Tags (visible only when active) */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap gap-2 mt-3 pl-10"
                      >
                        {p.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{
                              background: `${p.accentColor}18`,
                              color: p.accentColor,
                              border: `1px solid ${p.accentColor}30`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Counter */}
            <div className="mt-8 pl-4 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-white">{project.number}</span>
              <span className="text-slate-600 text-sm font-display">/ {String(projects.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* ── RIGHT: Full project card ── */}
          <div className="lg:w-7/12">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Main image card */}
                <div className="relative rounded-3xl overflow-hidden mb-6 group"
                  style={{ border: `1px solid ${project.accentColor}20` }}>

                  {/* Image */}
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={t(project.titleHighlightKey)}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    {/* Gradient overlay bottom */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgb(2,6,23) 0%, rgba(2,6,23,0.92) 30%, rgba(2,6,23,0.5) 55%, transparent 100%)'
                    }} />
                  </div>

                  {/* Status badge */}
                  {project.statusLabel && (
                    <div
                      className="absolute top-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
                      style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}35` }}
                    >
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.accentColor }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: project.accentColor }}>
                        {project.statusLabel}
                      </span>
                    </div>
                  )}

                  {/* Overlaid project title at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                    <p className="text-slate-300 text-sm leading-relaxed max-w-sm flex-1">
                      {t(project.subtitleKey)}
                    </p>
                    {!project.hideCta && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-xl group/cta shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}aa)`,
                        boxShadow: `0 4px 16px ${project.accentColor}30`,
                      }}
                    >
                      {t(project.ctaKey)}
                      <ExternalLink className="w-3 h-3 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                    </a>
                    )}
                  </div>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-3 p-4 rounded-2xl transition-all duration-300 group/feat"
                      style={{
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = `${project.accentColor}0d`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${project.accentColor}25`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${project.accentColor}18`, color: project.accentColor }}
                      >
                        {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold mb-0.5">{t(feature.labelKey)}</p>
                        <p className="text-slate-500 text-xs leading-relaxed">{t(feature.descKey)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
