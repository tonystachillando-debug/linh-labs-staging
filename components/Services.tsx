import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Target, Search, Sparkles, Settings2, TrendingUp } from 'lucide-react';
import { useI18n } from '../i18n';

export const Services: React.FC = () => {
  const { t } = useI18n();

  const servicesList = [
    { id: 1, title: t('services.s1.title'), icon: <Bot />, description: t('services.s1.desc') },
    { id: 2, title: t('services.s2.title'), icon: <Target />, description: t('services.s2.desc') },
    { id: 3, title: t('services.s3.title'), icon: <Search />, description: t('services.s3.desc') },
    { id: 4, title: t('services.s4.title'), icon: <Sparkles />, description: t('services.s4.desc') },
    { id: 5, title: t('services.s5.title'), icon: <Settings2 />, description: t('services.s5.desc') },
    { id: 6, title: t('services.s6.title'), icon: <TrendingUp />, description: t('services.s6.desc') },
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />
      
      <div className="container mx-auto px-6">
        
        {/* Value Proposition Text */}
        <div className="max-w-5xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight text-slate-300 font-light"
          >
            {t('services.title1')}<span className="font-bold text-white inline-block relative">
              {t('services.titleHighlight1')}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
            </span>{t('services.titleConnector')}<span className="font-bold text-white inline-block relative">
              {t('services.titleHighlight2')}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-purple-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
            </span>{`, applicando `}<span className="font-bold text-cyan-400 inline-block">{`l'AI`}</span>{` con una `}<span className="font-bold text-white inline-block relative">
              {t('services.titleHighlight3')}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
            </span>{t('services.titleEnd')}
          </motion.h2>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              
              <div className="relative h-full bg-slate-900/90 backdrop-blur-xl border border-white/5 p-8 rounded-2xl hover:border-white/20 transition-colors duration-300 overflow-hidden">
                
                {/* Hover Glow */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors" />

                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
                </div>
                
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};