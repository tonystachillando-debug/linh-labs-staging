import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToAgent } from '../services/chatService';
import { useI18n } from '../i18n';
import { MarkdownMessage } from './MarkdownMessage';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatSectionProps {
  newMessages?: Message[];
}

export const ChatSection: React.FC<ChatSectionProps> = ({ newMessages }) => {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: t('chat.greeting'), sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (newMessages && newMessages.length > 0) {
      setMessages(prev => {
        const existingIds = new Set(prev.map(m => m.id));
        const uniqueNew = newMessages.filter(m => !existingIds.has(m.id));
        return [...prev, ...uniqueNew];
      });
    }
  }, [newMessages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    const responseText = await sendMessageToAgent(userMsg.text);
    const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot' };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">

      {/* Rich background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-950/40 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-16 lg:items-start">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-5/12"
          >
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight leading-[1.05]">
              {t('chat.title')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                {t('chat.titleHighlight')}
              </span>
              {t('chat.titleEnd')}
            </h2>


            {/* Feature pills */}
            <div className="flex flex-col gap-3">
              {[
                { icon: <Zap className="w-4 h-4" />, title: t('chat.aiPowered'), desc: t('chat.aiDesc'), color: 'cyan' },
                { icon: <Shield className="w-4 h-4" />, title: 'Risposta immediata', desc: 'Sempre disponibile, 24/7', color: 'blue' },
                { icon: <Sparkles className="w-4 h-4" />, title: 'Personalizzato', desc: 'Conosce i tuoi servizi in dettaglio', color: 'purple' },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i + 0.3 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors group"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    f.color === 'cyan' ? 'bg-cyan-500/15 text-cyan-400' :
                    f.color === 'blue' ? 'bg-blue-500/15 text-blue-400' :
                    'bg-purple-500/15 text-purple-400'
                  }`}>
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{f.title}</p>
                    <p className="text-slate-500 text-xs">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Chat Widget ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-7/12 w-full"
          >
            {/* Outer glow ring */}
            <div className="relative p-[1px] rounded-3xl"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.4) 0%, rgba(59,130,246,0.2) 50%, rgba(6,182,212,0.05) 100%)' }}>

              <div className="rounded-3xl overflow-hidden flex flex-col h-[600px] relative"
                style={{ background: 'linear-gradient(160deg, rgba(15,23,42,0.98) 0%, rgba(2,6,23,0.99) 100%)' }}>

                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

                {/* ── Header ── */}
                <div className="relative z-10 px-6 py-5 flex items-center justify-between"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>

                  {/* Left: Avatar + info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar with pulsing ring */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping scale-110" />
                      <div className="relative w-11 h-11 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
                        <BotIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 shadow-lg shadow-emerald-500/50" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm tracking-wide">{t('chat.assistantName')}</p>
                      <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">{t('chat.online')}</p>
                    </div>
                  </div>

                  {/* Right: decorative traffic lights */}
                  <div className="flex items-center gap-2 opacity-40">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                </div>

                {/* ── Messages ── */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-5 scrollbar-thin" style={{ scrollbarColor: 'rgba(6,182,212,0.2) transparent' }}>
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {/* Bot avatar inline */}
                        {msg.sender === 'bot' && (
                          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-3 mt-1"
                            style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
                            <BotIcon className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}

                        <div className={`max-w-[80%] relative ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                          <div
                            className={`px-5 py-3.5 text-sm leading-relaxed shadow-xl ${
                              msg.sender === 'user'
                                ? 'text-white rounded-2xl rounded-br-sm'
                                : 'text-slate-200 rounded-2xl rounded-bl-sm border border-white/[0.07]'
                            }`}
                            style={msg.sender === 'user'
                              ? { background: 'linear-gradient(135deg, #0891b2, #2563eb)', boxShadow: '0 8px 32px rgba(6,182,212,0.25)' }
                              : { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }
                            }
                          >
                            {msg.sender === 'bot'
                              ? <MarkdownMessage text={msg.text} />
                              : msg.text
                            }
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  {isLoading && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
                        <BotIcon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="px-5 py-4 rounded-2xl rounded-bl-sm border border-white/[0.07] flex items-center gap-1.5"
                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <span className="text-xs text-slate-500 mr-1">{t('chat.thinking')}</span>
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={i}
                            className="block w-1.5 h-1.5 rounded-full bg-cyan-400"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* ── Input ── */}
                <div className="p-4 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <form onSubmit={handleSend} className="flex gap-3 items-center">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={t('chat.placeholder')}
                        className="w-full px-5 py-3.5 rounded-2xl text-sm text-white placeholder-slate-600 focus:outline-none transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                        onFocus={e => { e.currentTarget.style.border = '1px solid rgba(6,182,212,0.4)'; e.currentTarget.style.background = 'rgba(6,182,212,0.05)'; }}
                        onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                      style={{ background: 'linear-gradient(135deg, #06b6d4, #2563eb)', boxShadow: '0 4px 20px rgba(6,182,212,0.35)' }}
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.button>
                  </form>
                </div>

              </div>
            </div>

            {/* Bottom reflection */}
            <div className="mt-4 mx-8 h-6 rounded-b-3xl opacity-20 blur-sm"
              style={{ background: 'linear-gradient(180deg, rgba(6,182,212,0.3) 0%, transparent 100%)' }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const BotIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
    <path d="M12 8v4" />
    <rect x="4" y="12" width="16" height="10" rx="2" />
    <path d="M9 16v.01" />
    <path d="M15 16v.01" />
  </svg>
);