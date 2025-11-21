import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-24 pb-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Col 1: Brand */}
          <div className="space-y-8">
            <div className="scale-100 origin-left">
              <Logo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Trasformiamo la complessità tecnologica in vantaggio competitivo. 
              Il tuo partner di fiducia per l'era dell'AI.
            </p>
          </div>

          {/* Col 2: Link Utili */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-xs">Link Utili</h4>
            <ul className="space-y-4">
              {['Home', 'Chi Siamo', 'Servizi', 'Contatti'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contatti */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-xs">Contatti</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-slate-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                  <Mail className="w-4 h-4 text-cyan-500" />
                </div>
                <a href="mailto:info@linhlabs.com" className="hover:text-white transition-colors text-sm mt-1.5">info@linhlabs.com</a>
              </li>
              <li className="flex items-start gap-4 text-slate-400 group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                  <Phone className="w-4 h-4 text-cyan-500" />
                </div>
                <a href="tel:+393355200646" className="hover:text-white transition-colors text-sm mt-1.5">+39 3355200646</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location / Map */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-xs">Location</h4>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-48 relative group shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89553.23978771758!2d9.09525316664465!3d45.46282466956998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c1493f1275e7%3A0x3cffcd13c6740e8d!2sMilan%2C%20Metropolitan%20City%20of%20Milan%2C%20Italy!5e0!3m2!1sen!2sus!4v1715600000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></iframe>
            </div>
            <div className="flex items-center gap-3 mt-6 text-slate-400 text-xs">
              <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
              <span>Via Arcivescovo Calabiana, Milano</span>
            </div>
          </div>

        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} Linh Labs. All rights reserved.
          </div>
          <div className="flex gap-6">
             <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Privacy Policy</a>
             <a href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};