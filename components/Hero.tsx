import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  const yText = useTransform(scrollY, [0, 500], [0, 250]);
  const yBg = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.15] pointer-events-none" />
      
      {/* Gradient Orbs */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" 
      />
      <motion.div 
        style={{ y: yBg }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" 
      />

      <div className="container mx-auto px-6 text-center z-10 relative">
        <motion.div style={{ y: yText, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
             <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase">
                Next Gen AI Consulting
             </span>
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tighter mb-10">
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="block text-slate-100"
            >
              Trasforma
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500 animate-gradient pb-2"
            >
              l'Intelligenza Artificiale
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="block text-slate-400 text-4xl md:text-6xl lg:text-7xl font-light mt-4"
            >
              in vantaggio competitivo reale.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-light leading-relaxed"
          >
            Non solo teoria. Costruiamo soluzioni AI che scalano il tuo business oggi.
          </motion.p>

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
              <span className="text-[10px] uppercase tracking-[0.3em] mb-2">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/0 group-hover:h-20 transition-all duration-500"></div>
              <ChevronDown className="w-4 h-4 mt-2 animate-bounce opacity-50" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};