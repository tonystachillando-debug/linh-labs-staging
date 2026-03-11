import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Cpu, Link2, Globe, Swords, Bot, ExternalLink } from 'lucide-react';

const features = [
  { icon: <Swords />, label: 'RTS Agentico', description: 'Strategia in tempo reale con agenti AI autonomi' },
  { icon: <Bot />, label: 'AI-Powered', description: 'Agenti che apprendono e si adattano on-chain' },
  { icon: <Link2 />, label: 'Blockchain', description: 'Costruito su MegaETH per trasparenza totale' },
  { icon: <Globe />, label: 'Multiplayer', description: 'Competizione globale in tempo reale' },
];

const stats = [
  { value: 'RTS', label: 'Game Genre' },
  { value: 'MegaETH', label: 'Blockchain' },
  { value: 'On-Chain', label: 'AI Agents' },
  { value: 'Live', label: 'Status' },
];

export const AgeOfAgents: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/30 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold tracking-[0.2em] uppercase">
            <Gamepad2 className="w-3.5 h-3.5" />
            Progetto Realizzato
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Age of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-400 to-blue-500">
              Agents
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Un gioco RTS agentico su blockchain — dove agenti AI autonomi combattono, apprendono e si evolvono on-chain sulla rete MegaETH.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          {/* Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-900/20">
              <img
                src="/images/age-of-agents.png"
                alt="Age of Agents - RTS Game"
                className="w-full h-auto"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

              {/* Live badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">Live</span>
              </div>
            </div>
          </motion.div>

          {/* Features & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-xl p-3"
                >
                  <div className="font-display text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="group/card flex items-start gap-4 p-4 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-xl hover:border-emerald-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover/card:scale-110 transition-transform">
                    {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white mb-0.5">{feature.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="https://www.ageofagents.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group"
            >
              Gioca ora
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Tech Stack bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {['MegaETH', 'AI Agents', 'Real-Time Strategy', 'On-Chain', 'Multiplayer', 'Autonomous'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 bg-slate-900/60 border border-white/5 rounded-full text-slate-500 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
