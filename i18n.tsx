import React, { createContext, useContext, useState, useCallback } from 'react';

export type Lang = 'it' | 'en';

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  it: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'Chi Siamo',
    'nav.services': 'Servizi',
    'nav.catalogue': 'Catalogo',
    'nav.contact': 'Contattaci',

    // Hero
    'hero.badge': 'Next Gen AI Consulting',
    'hero.title1': 'Trasforma',
    'hero.title2': "l'Intelligenza Artificiale",
    'hero.title3': 'in vantaggio competitivo reale.',
    'hero.subtitle': 'Non solo teoria. Costruiamo soluzioni AI che scalano il tuo business oggi.',
    'hero.scroll': 'Scroll',

    // Mission
    'mission.label': 'La nostra mission',
    'mission.title': 'Siamo il partner strategico per aziende che vogliono ',
    'mission.titleHighlight': 'superare i propri limiti.',
    'mission.text1': "Con un approccio pragmatico uniamo ricerca e applicazione concreta dell'AI.",
    'mission.text2': 'Collaboriamo fianco a fianco con te per far sì che la tecnologia non resti teoria, ma produca risultati tangibili.',
    'mission.metric1': 'Tempo ridotto nei processi',
    'mission.metric2': 'Ottimizzazione dei costi operativi',
    'mission.metric3': "Incremento dell'efficienza interna",

    // Services
    'services.title1': "Accompagniamo le aziende verso l'",
    'services.titleHighlight1': 'eccellenza operativa',
    'services.titleConnector': " e l'",
    'services.titleHighlight2': 'innovazione avanzata',
    'services.titleConnector2': ", applicando l'AI con una ",
    'services.titleHighlight3': 'visione strategica',
    'services.titleEnd': ' e lungimirante.',
    'services.s1.title': 'Chatbot avanzati',
    'services.s1.desc': 'Interazioni naturali 24/7',
    'services.s2.title': 'Modelli Personalizzati',
    'services.s2.desc': 'AI addestrata sui tuoi dati',
    'services.s3.title': 'Sistemi RAG',
    'services.s3.desc': 'Ricerca semantica intelligente',
    'services.s4.title': 'AI Generativa',
    'services.s4.desc': 'Creazione contenuti automatizzata',
    'services.s5.title': 'Automazioni',
    'services.s5.desc': 'Workflow ottimizzati',
    'services.s6.title': 'Strategie di crescita',
    'services.s6.desc': 'Scaling guidato dai dati',

    // Automation Catalogue (homepage)
    'catalogue.badge': 'Powered by N8N',
    'catalogue.title': 'Automazioni ',
    'catalogue.titleHighlight': "Pronte all'Uso",
    'catalogue.subtitle': 'Migliaia di workflow di automazione pronti da implementare. Scegli la categoria e trasforma il tuo business.',
    'catalogue.stat1.value': 'Migliaia',
    'catalogue.stat1.label': 'Automazioni',
    'catalogue.stat2.value': 'Centinaia',
    'catalogue.stat2.label': 'Integrazioni',
    'catalogue.stat3.value': 'Fino a 85%',
    'catalogue.stat3.label': 'Tempo Risparmiato',
    'catalogue.cta': 'Esplora il Catalogo Completo',
    'catalogue.workflows': 'workflows',

    // Category names
    'cat.ai': 'AI & Machine Learning',
    'cat.marketing': 'Marketing',
    'cat.sales': 'Sales',
    'cat.documentOps': 'Document Ops',
    'cat.support': 'Support',
    'cat.other': 'Other',
    'cat.ai.tagline': 'Chatbot, RAG, classificazione intelligente',
    'cat.marketing.tagline': 'Social media, SEO, email campaign',
    'cat.sales.tagline': 'Lead scoring, CRM sync, proposte',
    'cat.documentOps.tagline': 'Fatture, contratti, report PDF',
    'cat.support.tagline': 'Ticket routing, FAQ bot, sentiment',
    'cat.other.tagline': 'Backup, monitoring, webhook relay',

    // Age of Agents
    'aoa.badge': 'Progetto Realizzato',
    'aoa.title': 'Age of ',
    'aoa.titleHighlight': 'Agents',
    'aoa.subtitle': 'Un gioco RTS agentico su blockchain — dove agenti AI autonomi combattono, apprendono e si evolvono on-chain sulla rete MegaETH.',
    'aoa.feature1.label': 'RTS Agentico',
    'aoa.feature1.desc': 'Strategia in tempo reale con agenti AI autonomi',
    'aoa.feature2.label': 'AI-Powered',
    'aoa.feature2.desc': 'Agenti che apprendono e si adattano on-chain',
    'aoa.feature3.label': 'Blockchain',
    'aoa.feature3.desc': 'Costruito su MegaETH per trasparenza totale',
    'aoa.feature4.label': 'Multiplayer',
    'aoa.feature4.desc': 'Competizione globale in tempo reale',
    'aoa.cta': 'Gioca ora',

    // Partners
    'partners.title': 'Trusted by Industry Leaders',

    // Chat Section
    'chat.title': 'Fai una prima ',
    'chat.titleHighlight': 'chiacchierata',
    'chat.titleEnd': ' col nostro agente.',
    'chat.subtitle': 'Scopri come possiamo trasformare il tuo business. Il nostro agente è istruito per rispondere alle tue domande sui nostri servizi in tempo reale.',
    'chat.aiPowered': 'AI Powered',
    'chat.aiDesc': 'Risposte istantanee basate su LLM avanzati',
    'chat.assistantName': 'Linh Labs Assistant',
    'chat.online': 'Online Now',
    'chat.greeting': "Ciao! 👋 Sono l'assistente virtuale di Linh Labs. Come posso aiutarti oggi?",
    'chat.placeholder': 'Scrivi un messaggio...',
    'chat.thinking': 'Thinking',

    // Sticky Chat
    'sticky.title': 'Linh Labs AI',
    'sticky.placeholder': 'Chiedi qualcosa...',

    // Catalogue Page
    'catPage.back': 'Torna alla Home',
    'catPage.badge': 'N8N Workflows',
    'catPage.title': 'Catalogo ',
    'catPage.titleHighlight': 'Automazioni',
    'catPage.subtitle': 'Esplora la nostra selezione curata delle automazioni più popolari ed efficaci. Ogni workflow è pronto per essere personalizzato e implementato nel tuo business.',
    'catPage.filterAll': 'Tutti',
    'catPage.timeSaved': 'Risparmiato',
    'catPage.integrations': 'Integrazioni',
    'catPage.popularity': 'Popolarità',
    'catPage.ctaTitle': 'Pronto a implementare?',
    'catPage.ctaSubtitle': 'Il nostro team può personalizzare e implementare qualsiasi automazione per il tuo business entro pochi giorni. Contattaci per una demo gratuita.',
    'catPage.ctaBtn': 'Contattaci per Implementare',
    'catPage.ctaBack': 'Torna alla Home',

    // Footer
    'footer.description': "Trasformiamo la complessità tecnologica in vantaggio competitivo. Il tuo partner di fiducia per l'era dell'AI.",
    'footer.links': 'Link Utili',
    'footer.contacts': 'Contatti',
    'footer.location': 'Location',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.catalogue': 'Catalogue',
    'nav.contact': 'Contact Us',

    // Hero
    'hero.badge': 'Next Gen AI Consulting',
    'hero.title1': 'Transform',
    'hero.title2': 'Artificial Intelligence',
    'hero.title3': 'into real competitive advantage.',
    'hero.subtitle': 'Not just theory. We build AI solutions that scale your business today.',
    'hero.scroll': 'Scroll',

    // Mission
    'mission.label': 'Our Mission',
    'mission.title': 'We are the strategic partner for companies that want to ',
    'mission.titleHighlight': 'exceed their limits.',
    'mission.text1': 'With a pragmatic approach, we combine research and concrete AI application.',
    'mission.text2': 'We work side by side with you to ensure technology doesn\'t remain theory, but produces tangible results.',
    'mission.metric1': 'Process time reduced',
    'mission.metric2': 'Operating cost optimization',
    'mission.metric3': 'Internal efficiency increase',

    // Services
    'services.title1': 'We guide companies towards ',
    'services.titleHighlight1': 'operational excellence',
    'services.titleConnector': ' and ',
    'services.titleHighlight2': 'advanced innovation',
    'services.titleConnector2': ', applying AI with a ',
    'services.titleHighlight3': 'strategic vision',
    'services.titleEnd': ' and foresight.',
    'services.s1.title': 'Advanced Chatbots',
    'services.s1.desc': 'Natural 24/7 interactions',
    'services.s2.title': 'Custom Models',
    'services.s2.desc': 'AI trained on your data',
    'services.s3.title': 'RAG Systems',
    'services.s3.desc': 'Intelligent semantic search',
    'services.s4.title': 'Generative AI',
    'services.s4.desc': 'Automated content creation',
    'services.s5.title': 'Automations',
    'services.s5.desc': 'Optimized workflows',
    'services.s6.title': 'Growth Strategies',
    'services.s6.desc': 'Data-driven scaling',

    // Automation Catalogue (homepage)
    'catalogue.badge': 'Powered by N8N',
    'catalogue.title': 'Ready-to-Use ',
    'catalogue.titleHighlight': 'Automations',
    'catalogue.subtitle': 'Thousands of automation workflows ready to implement. Choose a category and transform your business.',
    'catalogue.stat1.value': 'Thousands',
    'catalogue.stat1.label': 'Automations',
    'catalogue.stat2.value': 'Hundreds',
    'catalogue.stat2.label': 'Integrations',
    'catalogue.stat3.value': 'Up to 85%',
    'catalogue.stat3.label': 'Time Saved',
    'catalogue.cta': 'Explore Full Catalogue',
    'catalogue.workflows': 'workflows',

    // Category names
    'cat.ai': 'AI & Machine Learning',
    'cat.marketing': 'Marketing',
    'cat.sales': 'Sales',
    'cat.documentOps': 'Document Ops',
    'cat.support': 'Support',
    'cat.other': 'Other',
    'cat.ai.tagline': 'Chatbots, RAG, intelligent classification',
    'cat.marketing.tagline': 'Social media, SEO, email campaigns',
    'cat.sales.tagline': 'Lead scoring, CRM sync, proposals',
    'cat.documentOps.tagline': 'Invoices, contracts, PDF reports',
    'cat.support.tagline': 'Ticket routing, FAQ bot, sentiment',
    'cat.other.tagline': 'Backup, monitoring, webhook relay',

    // Age of Agents
    'aoa.badge': 'Completed Project',
    'aoa.title': 'Age of ',
    'aoa.titleHighlight': 'Agents',
    'aoa.subtitle': 'An agentic RTS game on blockchain — where autonomous AI agents fight, learn and evolve on-chain on the MegaETH network.',
    'aoa.feature1.label': 'Agentic RTS',
    'aoa.feature1.desc': 'Real-time strategy with autonomous AI agents',
    'aoa.feature2.label': 'AI-Powered',
    'aoa.feature2.desc': 'Agents that learn and adapt on-chain',
    'aoa.feature3.label': 'Blockchain',
    'aoa.feature3.desc': 'Built on MegaETH for total transparency',
    'aoa.feature4.label': 'Multiplayer',
    'aoa.feature4.desc': 'Global real-time competition',
    'aoa.cta': 'Play Now',

    // Partners
    'partners.title': 'Trusted by Industry Leaders',

    // Chat Section
    'chat.title': 'Have a first ',
    'chat.titleHighlight': 'chat',
    'chat.titleEnd': ' with our agent.',
    'chat.subtitle': 'Discover how we can transform your business. Our agent is trained to answer your questions about our services in real time.',
    'chat.aiPowered': 'AI Powered',
    'chat.aiDesc': 'Instant responses based on advanced LLMs',
    'chat.assistantName': 'Linh Labs Assistant',
    'chat.online': 'Online Now',
    'chat.greeting': "Hi! 👋 I'm the Linh Labs virtual assistant. How can I help you today?",
    'chat.placeholder': 'Write a message...',
    'chat.thinking': 'Thinking',

    // Sticky Chat
    'sticky.title': 'Linh Labs AI',
    'sticky.placeholder': 'Ask something...',

    // Catalogue Page
    'catPage.back': 'Back to Home',
    'catPage.badge': 'N8N Workflows',
    'catPage.title': 'Automation ',
    'catPage.titleHighlight': 'Catalogue',
    'catPage.subtitle': 'Explore our curated selection of the most popular and effective automations. Every workflow is ready to be customized and implemented in your business.',
    'catPage.filterAll': 'All',
    'catPage.timeSaved': 'Time Saved',
    'catPage.integrations': 'Integrations',
    'catPage.popularity': 'Popularity',
    'catPage.ctaTitle': 'Ready to implement?',
    'catPage.ctaSubtitle': 'Our team can customize and implement any automation for your business within days. Contact us for a free demo.',
    'catPage.ctaBtn': 'Contact Us to Implement',
    'catPage.ctaBack': 'Back to Home',

    // Footer
    'footer.description': 'We transform technological complexity into competitive advantage. Your trusted partner for the AI era.',
    'footer.links': 'Useful Links',
    'footer.contacts': 'Contacts',
    'footer.location': 'Location',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
};

const I18nContext = createContext<I18nContextType>({
  lang: 'it',
  setLang: () => {},
  t: (key: string) => key,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('linhlabs-lang') as Lang) || 'it';
    }
    return 'it';
  });

  const handleSetLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('linhlabs-lang', newLang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[lang][key] || key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
