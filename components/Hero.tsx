import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n';

export const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = React.useState(false);
  const { t } = useI18n();

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const yText = useTransform(scrollY, [0, 500], [0, 250]);
  const yBg = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.15] pointer-events-none" />

      {/* Gradient Orbs */}
      <motion.div
        style={{ y: isMobile ? 0 : yBg }}
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"
      />
      <motion.div
        style={{ y: isMobile ? 0 : yBg }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
      />

      <div className="container mx-auto px-6 text-center z-10 relative">
        <motion.div style={{ y: isMobile ? 0 : yText, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase">
              {t('hero.badge')}
            </span>
          </motion.div>

          <h1 className="font-display text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tighter mb-10">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="block text-slate-100"
            >
              {t('hero.title1')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500 animate-gradient pb-2"
            >
              {t('hero.title2')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="block text-slate-400 text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light mt-4"
            >
              {t('hero.title3')}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-slate-400 text-base md:text-base lg:text-lg max-w-3xl mx-auto mb-8 font-light leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mb-16 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="/#ai-assessment"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Scopri il tuo potenziale AI
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </a>
            <a
              href="https://ragchat-production-8651.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest text-white hover:scale-105 active:scale-95 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                boxShadow: '0 0 24px rgba(16,185,129,0.45), 0 4px 16px rgba(16,185,129,0.3)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(16,185,129,0.65), 0 4px 24px rgba(16,185,129,0.45)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(16,185,129,0.45), 0 4px 16px rgba(16,185,129,0.3)'; }}
            >
              Prova Ragalo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-[-100px]"
          >
            <a
              href="#mission"
              className="flex flex-col items-center text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] mb-2">{t('hero.scroll')}</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/0 group-hover:h-20 transition-all duration-500"></div>
              <ChevronDown className="w-4 h-4 mt-2 animate-bounce opacity-50" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};