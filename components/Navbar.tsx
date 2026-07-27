import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  const navLinks = [
    { name: t('nav.home'), href: '/#home' },
    { name: t('nav.about'), href: '/#mission' },
    { name: t('nav.services'), href: '/#services' },
    { name: 'AI Radar', href: '/#ai-news' },
    { name: t('nav.catalogue'), href: '/catalogo' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'it' ? 'en' : 'it');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? 'bg-slate-900/60 backdrop-blur-lg py-3 shadow-lg shadow-cyan-900/5'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="origin-left hover:opacity-90 transition-opacity">
          <Logo imgClassName="h-16 md:h-20 w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors uppercase tracking-widest group overflow-hidden"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
            </Link>
          ))}

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            title={lang === 'it' ? 'Switch to English' : 'Passa a Italiano'}
          >
            <Globe className="w-4 h-4" />
            {lang === 'it' ? 'EN' : 'IT'}
          </button>

          <Link
            to="/#ai-assessment"
            className="relative overflow-hidden bg-white text-slate-950 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors duration-300"
          >
            {t('nav.contact')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-display font-medium text-slate-200 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
              >
                <Globe className="w-4 h-4" />
                {lang === 'it' ? 'English' : 'Italiano'}
              </button>

              <Link
                to="/#ai-assessment"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-white text-slate-950 px-6 py-4 rounded-xl font-bold uppercase tracking-wider mt-4"
              >
                {t('nav.contact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};