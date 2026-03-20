import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Check, Send, RotateCcw, Search } from 'lucide-react';
import { useI18n } from '../i18n';

type Phase = 'start' | 'quiz' | 'result';

interface Answer {
  question: string;
  answer: string;
  score: number;
}

const STORAGE_KEY = 'lihnlabs_quiz_progress';

interface SavedProgress {
  phase: Phase;
  currentQ: number;
  answers: Answer[];
  totalScore: number;
  serviceNote: string;
}

export const LeadQuiz: React.FC = () => {
  const { t, lang } = useI18n();

  const [phase, setPhase] = useState<Phase>('start');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [serviceNote, setServiceNote] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [savedProgress, setSavedProgress] = useState<SavedProgress | null>(null);

  // Load saved progress on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: SavedProgress = JSON.parse(raw);
        // Only show resume banner if there's meaningful progress
        if (saved.phase !== 'start' && (saved.currentQ > 0 || saved.answers.length > 0)) {
          setSavedProgress(saved);
        }
      }
    } catch {}
  }, []);

  // Auto-save progress whenever quiz state changes
  useEffect(() => {
    if (phase === 'start') return; // don't save the start screen
    try {
      const progress: SavedProgress = { phase, currentQ, answers, totalScore, serviceNote };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [phase, currentQ, answers, totalScore, serviceNote]);

  const resumeProgress = () => {
    if (!savedProgress) return;
    setPhase(savedProgress.phase);
    setCurrentQ(savedProgress.currentQ);
    setAnswers(savedProgress.answers);
    setTotalScore(savedProgress.totalScore);
    setServiceNote(savedProgress.serviceNote ?? '');
    setSavedProgress(null);
  };

  const clearSaved = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setSavedProgress(null);
  };

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
      setPhase('result');
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try { localStorage.removeItem(STORAGE_KEY); } catch {}

    const payload = {
      ...formData,
      score: totalScore,
      lang,
      profile: getResult().title,
      serviceNote,
      answers,
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormState('success');
      } else {
        console.error('Lead submission failed:', await res.text());
        // Still show success to user
        setFormState('success');
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      // Still show success to user even if API is unreachable
      setFormState('success');
    }
  };

  const restart = () => {
    setPhase('start');
    setCurrentQ(0);
    setAnswers([]);
    setTotalScore(0);
    setServiceNote('');
    setFormData({ name: '', email: '', company: '', phone: '' });
    setFormState('idle');
    setSavedProgress(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  const slideVariants = {
    enter: { opacity: 0, x: 60, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -60, scale: 0.98 },
  };

  return (
    <section id="ai-assessment" className="pt-32 pb-48 relative overflow-visible">
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
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                {t('lead.badge')}
              </span>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t('lead.title')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient">
                  {t('lead.titleHighlight')}
                </span>
                {t('lead.titleEnd')}
              </h2>

              <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed mb-12">
                {t('lead.subtitle')}
              </p>

              {/* Resume banner */}
              <AnimatePresence>
                {savedProgress && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    className="inline-flex flex-col sm:flex-row items-center gap-3 bg-slate-900/80 backdrop-blur-xl border border-purple-500/25 rounded-2xl px-6 py-4 mb-8 shadow-xl shadow-purple-900/10"
                  >
                    <span className="text-slate-300 text-sm">
                      ✦ Hai un quiz in corso —{' '}
                      <strong className="text-purple-300">
                        {savedProgress.phase === 'result'
                          ? 'sei arrivato al form'
                          : `domanda ${savedProgress.currentQ + 1} di ${questions.length}`}
                      </strong>
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={resumeProgress}
                        className="text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-full transition-colors"
                      >
                        Riprendi
                      </button>
                      <button
                        onClick={clearSaved}
                        className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        Ricomincia
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => { clearSaved(); setPhase('quiz'); }}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105"
              >
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
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-[0.15em] uppercase mb-6">
                        {t('lead.result.badge')}
                      </span>

                      <div className="mb-4">
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                          {getResult().title}
                        </h3>
                      </div>

                      <p className="text-slate-400 text-base leading-relaxed mb-6">
                        {getResult().desc}
                      </p>

                      <div className="bg-slate-800/60 border border-white/5 rounded-xl p-5">
                        <div className="mb-2">
                          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">{t('lead.quickwin')}</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {getResult().win}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form Card */}
                  <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10">
                    <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                      <h4 className="font-display text-xl font-bold text-white mb-6">
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

                        {/* Open text field for automation notes */}
                        <div>
                          <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                            Cosa vuoi automatizzare? <span className="normal-case text-slate-600">(Opzionale)</span>
                          </label>
                          <textarea
                            value={serviceNote}
                            onChange={(e) => setServiceNote(e.target.value)}
                            rows={3}
                            placeholder="Es. vorrei automatizzare la gestione dei lead, le email di follow-up..."
                            className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none text-sm leading-relaxed"
                          />
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
