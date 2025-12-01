import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { Timer, TrendingDown, Zap } from 'lucide-react';

// Helper component for counting up numbers
const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const metrics = [
  {
    id: 1,
    value: 90,
    suffix: "%",
    label: "Tempo ridotto nei processi",
    icon: <Timer className="w-6 h-6 text-cyan-400" />,
    color: "cyan"
  },
  {
    id: 2,
    value: 85,
    suffix: "%",
    label: "Ottimizzazione dei costi operativi",
    icon: <TrendingDown className="w-6 h-6 text-blue-400" />,
    color: "blue"
  },
  {
    id: 3,
    value: 10,
    suffix: "x",
    label: "Incremento dell'efficienza interna",
    icon: <Zap className="w-6 h-6 text-purple-400" />,
    color: "purple"
  }
];

export const Mission: React.FC = () => {
  return (
    <section id="mission" className="py-32 bg-slate-950 relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-start">

          {/* Mission Text */}
          <div className="lg:w-5/12 relative lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-cyan-500"></div>
                <h2 className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm">La nostra mission</h2>
              </div>

              <h3 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-[1.1] text-white">
                Siamo il partner strategico per aziende che vogliono <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">superare i propri limiti.</span>
              </h3>

              <div className="text-slate-300 text-lg space-y-6 font-light leading-relaxed">
                <p>
                  Con un approccio pragmatico uniamo ricerca e applicazione concreta dell'AI.
                </p>
                <p className="pl-6 border-l-2 border-cyan-500/50 text-white font-normal">
                  Collaboriamo fianco a fianco con te per far sì che la tecnologia non resti teoria,
                  ma produca risultati tangibili.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Metrics Cards */}
          <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className={`glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border-t border-white/10 relative overflow-hidden ${index === 2 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
              >
                <div className={`absolute top-0 right-0 p-32 bg-${metric.color}-500/5 rounded-full blur-3xl group-hover:bg-${metric.color}-500/10 transition-colors duration-500`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="p-3 bg-slate-900/50 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                      {metric.icon}
                    </span>
                  </div>
                  <div className="font-display text-6xl md:text-7xl font-bold text-white mb-4 tracking-tighter">
                    <Counter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                    {metric.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};