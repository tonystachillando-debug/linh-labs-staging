import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { Timer, TrendingDown, Zap } from 'lucide-react';
import { useI18n } from '../i18n';

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

export const Mission: React.FC = () => {
  const { t } = useI18n();

  const metrics = [
    {
      id: 1,
      value: 40, suffix: "%",
      label: t('mission.metric1'),
      desc: t('mission.metric1desc'),
      icon: <Timer className="w-6 h-6 text-cyan-400" />,
      color: "cyan",
      isRange: false,
    },
    {
      id: 2,
      value: 35, suffix: "%",
      rangeDisplay: "14–35%",
      label: t('mission.metric2'),
      desc: t('mission.metric2desc'),
      icon: <TrendingDown className="w-6 h-6 text-blue-400" />,
      color: "blue",
      isRange: true,
    },
    {
      id: 3,
      value: 25, suffix: "%",
      label: t('mission.metric3'),
      desc: t('mission.metric3desc'),
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      color: "purple",
      isRange: false,
    }
  ];

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
                <h2 className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm">{t('mission.label')}</h2>
              </div>

              <h3 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-[1.1] text-white">
                {t('mission.title')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">{t('mission.titleHighlight')}</span>
              </h3>

              <div className="text-slate-300 text-lg space-y-6 font-light leading-relaxed">
                <p>
                  {t('mission.text1')}
                </p>
                <p className="pl-6 border-l-2 border-cyan-500/50 text-white font-normal">
                  {t('mission.text2')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Metrics Cards */}
          <div className="lg:w-7/12 flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className={`glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border-t border-white/10 relative overflow-hidden ${index === 2 ? 'md:col-span-2' : ''}`}
              >
                <div className={`absolute top-0 right-0 p-32 bg-${metric.color}-500/5 rounded-full blur-3xl group-hover:bg-${metric.color}-500/10 transition-colors duration-500`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="p-3 bg-slate-900/50 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                      {metric.icon}
                    </span>
                  </div>
                  <div className="font-display text-6xl md:text-7xl font-bold text-white mb-2 tracking-tighter">
                    {metric.isRange
                      ? metric.rangeDisplay
                      : <Counter value={metric.value} suffix={metric.suffix} />
                    }
                  </div>
                  <div className="text-slate-300 text-sm font-semibold uppercase tracking-widest mb-3">
                    {metric.label}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {metric.desc}
                  </p>
                </div>
              </motion.div>
            ))}
            </div>

            {/* Sources note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-slate-600 text-xs leading-relaxed border-l-2 border-white/10 pl-4"
            >
              I dati riportati rappresentano medie di mercato e benchmark di settore derivanti da studi condotti da McKinsey Global Institute, Goldman Sachs e MIT Sloan. L'integrazione di sistemi AI mira a intercettare queste inefficienze per trasformarle in vantaggi competitivi misurabili.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};