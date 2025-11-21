import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Chi Siamo', href: '#mission' },
  { name: 'Servizi', href: '#services' },
  { name: 'Contatti', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="scale-90 origin-left">
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors uppercase tracking-widest group overflow-hidden"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
            </a>
          ))}
          <a
            href="#contact"
            className="relative overflow-hidden bg-white text-slate-950 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors duration-300"
          >
            Contact Us
          </a>
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
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-display font-medium text-slate-200 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-white text-slate-950 px-6 py-4 rounded-xl font-bold uppercase tracking-wider mt-4"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};