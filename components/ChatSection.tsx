import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToAgent } from '../services/chatService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Ciao! 👋 Sono l'assistente virtuale di Linh Labs. Come posso aiutarti oggi?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      // Using scrollTo on the container instead of scrollIntoView on an element
      // prevents the browser from scrolling the main window to this section on load.
      scrollRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          
          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-5/12"
          >
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight leading-[1.1]">
              Fai una prima <span className="text-cyan-400">chiacchierata</span> col nostro agente.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-light">
              Scopri come possiamo trasformare il tuo business. Il nostro agente è istruito per rispondere alle tue domande sui nostri servizi in tempo reale.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold">AI Powered</h4>
                  <p className="text-slate-500 text-xs">Risposte istantanee basate su LLM avanzati</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Widget Side */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="lg:w-7/12 w-full"
          >
            <div className="glass-panel rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col h-[600px] relative">
              
              {/* Widget Header */}
              <div className="bg-slate-900/80 backdrop-blur-md p-6 border-b border-white/5 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center relative shadow-lg shadow-cyan-500/20">
                     <BotIcon className="w-6 h-6 text-white" />
                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Linh Labs Assistant</h3>
                    <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider">Online Now</p>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/30 scrollbar-thin"
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-5 rounded-2xl text-base leading-relaxed shadow-md ${
                          msg.sender === 'user'
                            ? 'bg-cyan-600 text-white rounded-br-none'
                            : 'bg-slate-800/80 text-slate-200 rounded-bl-none border border-white/5'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                     <div className="bg-slate-800/80 p-4 rounded-2xl rounded-bl-none border border-white/5 flex gap-2 items-center">
                        <span className="text-xs text-slate-400 mr-2">Thinking</span>
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-150"></span>
                     </div>
                   </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-slate-900/80 border-t border-white/5 backdrop-blur-md">
                <form onSubmit={handleSend} className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 bg-slate-950/50 text-white px-6 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-all placeholder:text-slate-600"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-2xl transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </form>
              </div>
            </div>
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