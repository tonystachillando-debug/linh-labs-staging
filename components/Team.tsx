import React from 'react';
import { motion } from 'framer-motion';

export const Team = () => {
  const team = [
    {
      id: 'antonio',
      name: 'Antonio Visceglia',
      role: 'Co-founder',
      image: '/images/antonio.png',
      accentColor: '#34d399', // emerald
      gradient: 'from-emerald-400 to-cyan-500',
    },
    {
      id: 'daniele',
      name: 'Daniele Angelucci',
      role: 'Co-founder',
      image: '/images/daniele.png',
      accentColor: '#a78bfa', // violet
      gradient: 'from-violet-400 to-purple-600',
    },
    {
      id: 'giuliano',
      name: 'Giuliano Maria Lodi',
      role: 'Co-founder',
      image: '/images/giuliano.png',
      accentColor: '#38bdf8', // sky
      gradient: 'from-sky-400 to-blue-600',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-24 lg:py-32">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Team
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight">
            I fondatori di <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-400 to-sky-400">Linh Labs</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                {/* Outer rotating/glowing ring on hover */}
                <div 
                  className={`absolute -inset-1 rounded-full bg-gradient-to-tr ${member.gradient} opacity-0 group-hover:opacity-40 blur-md transition-all duration-700 group-hover:duration-300`}
                />
                
                {/* Avatar wrapper */}
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border border-white/10 bg-slate-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]">
                  {/* Inner subtle glow */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${member.gradient} opacity-20 mix-blend-overlay z-10`} />
                  
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Inner shadow overlay */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full z-20 pointer-events-none" />
                </div>
              </div>

              <h3 className="text-xl lg:text-2xl font-display font-bold text-white mb-2 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300">
                {member.name}
              </h3>
              <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: member.accentColor }}>
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
