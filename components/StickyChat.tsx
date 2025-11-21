import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { sendMessageToAgent } from '../services/chatService';
import { motion, AnimatePresence } from 'framer-motion';

export const StickyChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    setIsSending(true);
    const currentInput = input;
    setInput('');
    
    // Show a mini popup with response
    try {
      const res = await sendMessageToAgent(currentInput);
      setResponse(res);
      // Auto hide response after 8 seconds
      setTimeout(() => setResponse(null), 8000);
    } catch (err) {
       // silent fail on UI, maybe log
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-0 w-full z-40 px-4 pointer-events-none">
      <div className="container mx-auto max-w-3xl relative pointer-events-auto">
        
        {/* Response Popover */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full left-0 mb-4 w-full bg-slate-900/95 border border-cyan-500/30 p-4 rounded-xl shadow-2xl backdrop-blur-xl"
            >
              <div className="flex justify-between items-start">
                 <p className="text-slate-200 text-sm">{response}</p>
                 <button onClick={() => setResponse(null)} className="text-slate-500 hover:text-white text-xs ml-4">Chiudi</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Field */}
        <form 
          onSubmit={handleSubmit}
          className="glass-panel p-2 rounded-full flex items-center shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 transition-all focus-within:border-cyan-500/50 focus-within:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi un messaggio..."
            className="bg-transparent border-none text-white px-6 py-2 w-full focus:outline-none placeholder:text-slate-500"
          />
          <button 
            type="submit" 
            disabled={isSending || !input.trim()}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-white p-3 rounded-full transition-colors shrink-0"
          >
            {isSending ? (
               <span className="block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};