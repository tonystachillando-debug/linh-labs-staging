import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronDown, Check, Zap, Send, RotateCcw, Trophy, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n';

type Phase = 'start' | 'quiz' | 'services' | 'result';

interface Answer {
  question: string;
  answer: string;
  score: number;
}

export const LeadQuiz: React.FC = () => {
  const { t } = useI18n();

  const [phase, setPhase] = useState<Phase>('start');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const questions = [
    {
      question: t('lead.q1'),
      options: [
        { text: t('lead.q1.a1'), score: 1 },
        { text: t('lead.q1.a2'), score: 2 },
        { text: t('lead.q1.a3'), score: 3 },
      ],
    },
    {
      question: t('lead.q2'),
      options: [
        { text: t('lead.q2.a1'), score: 1 },
        { text: t('lead.q2.a2'), score: 2 },
        { text: t('lead.q2.a3'), score: 3 },
      ],
    },
    {
      question: t('lead.q3'),
      options: [
        { text: t('lead.q3.a1'), score: 1 },
        { text: t('lead.q3.a2'), score: 2 },
        { text: t('lead.q3.a3'), score: 3 },
      ],
    },
    {
      question: t('lead.q4'),
      options: [
        { text: t('lead.q4.a1'), score: 1 },
        { text: t('lead.q4.a2'), score: 2 },
        { text: t('lead.q4.a3'), score: 3 },
      ],
    },
  ];

  const serviceOptions = [
    { key: 'chatbot', label: t('lead.svc.chatbot') },
    { key: 'models', label: t('lead.svc.models') },
    { key: 'rag', label: t('lead.svc.rag') },
    { key: 'genai', label: t('lead.svc.genai') },
    { key: 'automation', label: t('lead.svc.automation') },
    { key: 'growth', label: t('lead.svc.growth') },
  ];

  const getResult = useCallback(() => {
    if (totalScore <= 5) return { title: t('lead.result1.title'), desc: t('lead.result1.desc'), win: t('lead.result1.win'), gradient: 'from-amber-500 to-orange-600', icon: '🌱' };
    if (totalScore <= 7) return { title: t('lead.result2.title'), desc: t('lead.result2.desc'), win: t('lead.result2.win'), gradient: 'from-cyan-500 to-blue-600', icon: '🔗' };
    if (totalScore <= 9) return { title: t('lead.result3.title'), desc: t('lead.result3.desc'), win: t('lead.result3.win'), gradient: 'from-purple-500 to-violet-600', icon: '⚡' };
    return { title: t('lead.result4.title'), desc: t('lead.result4.desc'), win: t('lead.result4.win'), gradient: 'from-emerald-500 to-cyan-600', icon: '🚀' };
  }, [totalScore, t]);

  const handleAnswer = (optionIndex: number) => {
    const q = questions[currentQ];
    const opt = q.options[optionIndex];
    const newScore = totalScore + opt.score;
    setTotalScore(newScore);
    setAnswers([...answers, { question: q.question, answer: opt.text, score: opt.score }]);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase('services');
    }
  };

  const toggleService = (key: string) => {
    setSelectedServices((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    const payload = {
      ...formData,
      score: totalScore,
      profile: getResult().title,
      services: selectedServices,
      answers,
    };
    console.log('Lead Quiz Submission:', payload);

    // Simulate submission
    setTimeout(() => {
      setFormState('success');
    }, 1200);
  };

  const restart = () => {
    setPhase('start');
    setCurrentQ(0);
    setAnswers([]);
    setTotalScore(0);
    setSelectedServices([]);
    setFormData({ name: '', email: '', company: '', phone: '' });
    setFormState('idle');
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  const slideVariants = {
    enter: { opacity: 0, x: 60, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -60, scale: 0.98 },
  };

  return (
    <section id="ai-assessment" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-3xl">
        <AnimatePresence mode="wait">
          {/* ======= START SCREEN ======= */}
          {phase === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                {t('lead.badge')}
              </span>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t('lead.title')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient">
                  {t('lead.titleHighlight')}
                </span>
              </h2>

              <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed mb-12">
                {t('lead.subtitle')}
              </p>

              <button
                onClick={() => setPhase('quiz')}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                {t('lead.cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* ======= QUIZ PHASE ======= */}
          {phase === 'quiz' && (
            <motion.div
              key={`quiz-${currentQ}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Progress */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-400 text-sm font-medium">
                    {t('lead.step')} {currentQ + 1} {t('lead.of')} {questions.length}
                  </span>
                  <span className="text-purple-400 text-sm font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                    initial={{ width: `${((currentQ) / questions.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-8 relative z-10">
                  {questions[currentQ].question}
                </h3>

                <div className="space-y-4 relative z-10">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="group w-full text-left flex items-center gap-4 bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-purple-500/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-700/50 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all font-display font-bold text-sm">
                        0{i + 1}
                      </span>
                      <span className="text-slate-300 group-hover:text-white transition-colors font-medium">
                        {opt.text}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-auto text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ======= SERVICE SELECTION ======= */}
          {phase === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden">
                <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    {t('lead.services.label')}
                  </h3>
                </div>

                {/* Custom dropdown */}
                <div className="relative z-20 max-w-md mx-auto mb-8">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between bg-slate-800/80 border border-white/10 rounded-xl px-5 py-4 text-left hover:border-purple-500/30 transition-colors"
                  >
                    <span className={selectedServices.length > 0 ? 'text-white' : 'text-slate-500'}>
                      {selectedServices.length > 0
                        ? `${selectedServices.length} ${selectedServices.length === 1 ? 'servizio selezionato' : 'servizi selezionati'}`
                        : t('lead.services.placeholder')}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/40 origin-top"
                      >
                        {serviceOptions.map((svc) => (
                          <button
                            key={svc.key}
                            type="button"
                            onClick={() => toggleService(svc.key)}
                            className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-700/50 transition-colors text-left"
                          >
                            <span className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              selectedServices.includes(svc.key)
                                ? 'bg-purple-500 border-purple-500'
                                : 'border-white/20 bg-transparent'
                            }`}>
                              {selectedServices.includes(svc.key) && <Check className="w-3 h-3 text-white" />}
                            </span>
                            <span className={`font-medium transition-colors ${
                              selectedServices.includes(svc.key) ? 'text-white' : 'text-slate-400'
                            }`}>
                              {svc.label}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Selected chips */}
                {selectedServices.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-8 relative z-10">
                    {selectedServices.map((key) => {
                      const svc = serviceOptions.find((s) => s.key === key);
                      return (
                        <motion.span
                          key={key}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold"
                        >
                          {svc?.label}
                          <button onClick={() => toggleService(key)} className="hover:text-white transition-colors">×</button>
                        </motion.span>
                      );
                    })}
                  </div>
                )}

                <div className="text-center relative z-10">
                  <button
                    onClick={() => setPhase('result')}
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105"
                  >
                    {t('lead.services.continue')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======= RESULT + FORM ======= */}
          {phase === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {formState === 'success' ? (
                /* Success message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-10 md:p-14 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                        {t('lead.form.success')}
                      </h3>
                      <p className="text-slate-400 text-lg max-w-md mx-auto mb-8">
                        {t('lead.form.successMsg')}
                      </p>
                      <button
                        onClick={restart}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors text-sm group"
                      >
                        <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
                        {t('lead.form.restart')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Result + Form */
                <div className="space-y-6">
                  {/* Profile Result Card */}
                  <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getResult().gradient} opacity-[0.03] pointer-events-none`} />
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-[0.15em] uppercase mb-6">
                        <Trophy className="w-3 h-3" />
                        {t('lead.result.badge')}
                      </span>

                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{getResult().icon}</span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                          {getResult().title}
                        </h3>
                      </div>

                      <p className="text-slate-400 text-base leading-relaxed mb-6">
                        {getResult().desc}
                      </p>

                      <div className="bg-slate-800/60 border border-white/5 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-amber-400" />
                          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">{t('lead.quickwin')}</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {getResult().win}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form Card */}
                  <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden">
                    <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                      <h4 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Send className="w-5 h-5 text-cyan-400" />
                        {t('lead.form.title')}
                      </h4>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                              {t('lead.form.name')} *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                              {t('lead.form.email')} *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                              {t('lead.form.company')} *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                              {t('lead.form.phone')}
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={formState === 'submitting'}
                          className="w-full group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        >
                          {formState === 'submitting' ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              {t('lead.form.submitting')}
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              {t('lead.form.submit')}
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
