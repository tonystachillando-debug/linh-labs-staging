import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Network, Database, MessagesSquare, Workflow, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n';

export const Services: React.FC = () => {
  const { t } = useI18n();

  const servicesList = [
    { id: 1, title: t('services.s1.title'), icon: <Bot />, description: t('services.s1.desc') },
    { id: 2, title: t('services.s2.title'), icon: <Network />, description: t('services.s2.desc') },
    { id: 3, title: t('services.s3.title'), icon: <Database />, description: t('services.s3.desc') },
    { id: 4, title: t('services.s4.title'), icon: <MessagesSquare />, description: t('services.s4.desc') },
    { id: 5, title: t('services.s5.title'), icon: <Workflow />, description: t('services.s5.desc') },
    { id: 6, title: t('services.s6.title'), icon: <ShieldCheck />, description: t('services.s6.desc') },
  ];

  return (
    <section id="services" className="py-20 lg:py-24 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />
      
      <div className="container mx-auto px-6">
        
        {/* Value Proposition Text */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-tight text-slate-300 font-light"
          >
            {t('services.title1')}<span className="font-bold text-white inline-block relative">
              {t('services.titleHighlight1')}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
            </span>{t('services.titleConnector')}<span className="font-bold text-white inline-block relative">
              {t('services.titleHighlight2')}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-purple-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
            </span>{t('services.titleConnector2')}<span className="font-bold text-white inline-block relative">
              {t('services.titleHighlight3')}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-500 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
            </span>{t('services.titleEnd')}
          </motion.h2>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-amber-400 rounded-2xl blur opacity-0 group-hover:opacity-25 transition-opacity duration-500" />
              
              <div className="relative h-full bg-slate-900/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl hover:border-teal-400/30 transition-colors duration-300 overflow-hidden">
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-6 right-6 font-mono text-xs text-slate-600 group-hover:text-teal-400 transition-colors">{String(index + 1).padStart(2, '0')}</span>
                
                {/* Hover Glow */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors" />

                <div className="w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center text-teal-300 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {React.cloneElement(service.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                </div>
                
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
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