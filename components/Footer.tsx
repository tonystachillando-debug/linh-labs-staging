import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  const navLinks = [
    { name: t('nav.home'), href: '/#home' },
    { name: t('nav.about'), href: '/#mission' },
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.catalogue'), href: '/catalogo' },
    { name: t('nav.contact'), href: '/#ai-assessment' },
  ];

  return (
    <footer className="bg-slate-950 relative overflow-hidden">

      {/* Top gradient separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />



      {/* Main footer grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1 space-y-6">
            <Logo />
            <p className="text-slate-500 text-sm leading-relaxed font-light max-w-xs">
              {t('footer.description')}
            </p>

          </div>

          {/* Col 2: Link Utili */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">{t('footer.links')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-500 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-cyan-400 transition-all duration-300 inline-block" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contatti */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">{t('footer.contacts')}</h4>
            <ul className="space-y-5">
              <li>
                <a href="mailto:info@linhlabs.com" className="flex items-center gap-4 text-slate-500 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/15 group-hover:border-cyan-500/30 transition-all">
                    <Mail className="w-4 h-4 text-cyan-500" />
                  </div>
                  <span className="text-sm">info@linhlabs.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+393355200646" className="flex items-center gap-4 text-slate-500 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/15 group-hover:border-cyan-500/30 transition-all">
                    <Phone className="w-4 h-4 text-cyan-500" />
                  </div>
                  <span className="text-sm">+39 335 5200646</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-4 text-slate-500">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-cyan-500" />
                  </div>
                  <span className="text-sm">Via Arcivescovo Calabiana, Milano</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Map */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">{t('footer.location')}</h4>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-44 relative group shadow-xl shadow-black/40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89553.23978771758!2d9.09525316664465!3d45.46282466956998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c1493f1275e7%3A0x3cffcd13c6740e8d!2sMilan%2C%20Metropolitan%20City%20of%20Milan%2C%20Italy!5e0!3m2!1sen!2sus!4v1715600000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
               {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-6 pb-10">
        <div className="flex justify-center items-center pt-8 border-t border-white/5">
          <div className="text-slate-600 text-xs tracking-wide">
            © {new Date().getFullYear()} <span className="text-slate-500">Linh Labs</span>. {t('footer.rights')}
          </div>
        </div>
      </div>

    </footer>
  );
};