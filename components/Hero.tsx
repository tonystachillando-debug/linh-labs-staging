import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bot, UserCheck, Check, Loader2 } from 'lucide-react';
import { useI18n } from '../i18n';

// Passi della console: teal = lavoro dell'agente, ambra = decisione della persona
const STEPS: { key: string; human?: boolean }[] = [
  { key: 'hero.console.l1' },
  { key: 'hero.console.l2' },
  { key: 'hero.console.l3' },
  { key: 'hero.console.l4', human: true },
  { key: 'hero.console.l5', human: true },
];

const AgentConsole: React.FC = () => {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState(reduce ? STEPS.length : 0);

  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive(a => (a >= STEPS.length + 2 ? 0 : a + 1));
    }, 1300);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="ring-live rounded-3xl">
      <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/5 shadow-[0_30px_80px_-20px_rgba(45,212,191,0.25)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            3 {t('hero.console.title')}
          </div>
        </div>

        {/* Steps */}
        <ul className="p-5 space-y-2.5 font-mono text-[13px]">
          {STEPS.map((step, i) => {
            const done = i < active;
            const running = i === active;
            const color = step.human ? 'amber' : 'teal';
            return (
              <motion.li
                key={step.key}
                initial={false}
                animate={{ opacity: done || running ? 1 : 0.3, x: running ? 4 : 0 }}
                transition={{ duration: 0.35 }}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 border ${
                  running
                    ? step.human
                      ? 'border-amber-400/40 bg-amber-400/10'
                      : 'border-teal-400/30 bg-teal-400/10'
                    : 'border-transparent bg-white/[0.02]'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    color === 'amber' ? 'bg-amber-400/15 text-amber-300' : 'bg-teal-400/15 text-teal-300'
                  }`}
                >
                  {done ? (
                    <Check className="w-4 h-4" />
                  ) : running ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : step.human ? (
                    <UserCheck className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </span>
                <span className={done || running ? 'text-slate-100' : 'text-slate-500'}>{t(step.key)}</span>
              </motion.li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-white/5 bg-gradient-to-r from-teal-500/10 via-transparent to-amber-400/10">
          <p className="text-sm text-slate-300">{t('hero.console.human')}</p>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-teal-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const { t } = useI18n();

  const yBg = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <section id="home" className="relative min-h-[100dvh] pt-32 pb-24 lg:pt-28 flex items-center overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-white opacity-40 pointer-events-none" />

      {/* Aurora teal + ambra */}
      <motion.div
        style={{ y: reduce ? 0 : yBg }}
        className="absolute top-[-25%] right-[-10%] w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px] pointer-events-none bg-teal-400/20"
      />
      <motion.div
        style={{ y: reduce ? 0 : yBg }}
        className="absolute bottom-[-30%] left-[-15%] w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full blur-[140px] pointer-events-none bg-teal-700/30"
      />
      <div className="absolute top-[30%] right-[22%] w-48 h-48 rounded-full blur-[90px] pointer-events-none bg-amber-400/15" />


      <div className="container mx-auto px-6 relative z-10">
        <motion.div style={{ opacity }} className="grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Testo */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-7 flex justify-center lg:justify-start"
            >
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] tracking-tighter mb-8">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="block text-slate-50"
              >
                {t('hero.title1')}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="block text-brand-gradient animate-gradient pb-2"
              >
                {t('hero.title2')}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="block text-slate-400 text-3xl sm:text-4xl md:text-5xl font-light mt-3"
              >
                {t('hero.title3')}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-slate-300 text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 mb-10 font-light leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="/#ai-assessment"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-teal-400 text-slate-950 font-bold text-sm uppercase tracking-widest shadow-[0_10px_40px_-8px_rgba(45,212,191,0.7)] hover:bg-teal-300 hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                {t('hero.cta1')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/#portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest text-slate-100 border border-white/15 bg-white/[0.03] hover:border-teal-400/50 hover:text-teal-200 transition-all duration-300"
              >
                {t('hero.cta2')}
              </a>
            </motion.div>
          </div>

          {/* Console agenti */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 w-full max-w-lg mx-auto"
          >
            <AgentConsole />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
