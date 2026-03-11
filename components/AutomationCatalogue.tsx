import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Megaphone, TrendingUp, FileText, HeadsetIcon as Headset, Layers, ArrowRight, Zap } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'AI & Machine Learning',
    icon: <Brain />,
    count: 'Migliaia di',
    filterKey: 'AI',
    tagline: 'Chatbot, RAG, classificazione intelligente',
    gradient: 'from-violet-500 to-purple-600',
    glow: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    id: 2,
    name: 'Marketing',
    icon: <Megaphone />,
    count: 'Migliaia di',
    filterKey: 'Marketing',
    tagline: 'Social media, SEO, email campaign',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'bg-pink-500/20',
    iconColor: 'text-pink-400',
  },
  {
    id: 3,
    name: 'Sales',
    icon: <TrendingUp />,
    count: 'Centinaia di',
    filterKey: 'Sales',
    tagline: 'Lead scoring, CRM sync, proposte',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'bg-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    id: 4,
    name: 'Document Ops',
    icon: <FileText />,
    count: 'Centinaia di',
    filterKey: 'Document Ops',
    tagline: 'Fatture, contratti, report PDF',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    id: 5,
    name: 'Support',
    icon: <Headset />,
    count: 'Centinaia di',
    filterKey: 'Support',
    tagline: 'Ticket routing, FAQ bot, sentiment',
    gradient: 'from-emerald-500 to-green-600',
    glow: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    id: 6,
    name: 'Other',
    icon: <Layers />,
    count: 'Migliaia di',
    filterKey: 'Other',
    tagline: 'Backup, monitoring, webhook relay',
    gradient: 'from-slate-400 to-slate-600',
    glow: 'bg-slate-400/20',
    iconColor: 'text-slate-400',
  },
];

export const AutomationCatalogue: React.FC = () => {
  return (
    <section id="catalogue" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <Zap className="w-3.5 h-3.5" />
            Powered by N8N
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Automazioni{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
              Pronte all'Uso
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Migliaia di workflow di automazione pronti da implementare. Scegli la categoria e trasforma il tuo business.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-8 md:gap-16 mb-16 mt-10"
        >
          {[
            { value: 'Migliaia', label: 'Automazioni' },
            { value: 'Centinaia', label: 'Integrazioni' },
            { value: 'Fino a 85%', label: 'Tempo Risparmiato' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {categories.map((cat, index) => (
            <Link key={cat.id} to={`/catalogo?category=${encodeURIComponent(cat.filterKey)}`}>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative h-full"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                <div className="relative h-full bg-slate-900/80 backdrop-blur-xl border border-white/5 p-7 rounded-2xl hover:border-white/15 transition-all duration-300 cursor-pointer overflow-hidden">
                  {/* Corner glow */}
                  <div className={`absolute -right-8 -top-8 w-28 h-28 ${cat.glow} rounded-full blur-3xl group-hover:opacity-100 opacity-0 transition-opacity`} />

                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center ${cat.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      {React.cloneElement(cat.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
                    </div>
                    <span className="text-slate-600 text-xs font-mono">{cat.count} workflows</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group"
          >
            Esplora il Catalogo Completo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
