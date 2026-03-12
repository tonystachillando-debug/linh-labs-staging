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

    // Lead Quiz
    'lead.badge': 'Valutazione Gratuita',
    'lead.title': 'Scopri il tuo Potenziale ',
    'lead.titleHighlight': 'IA',
    'lead.subtitle': 'Fai questa valutazione di 30 secondi per vedere come IA e Growth Hacking possono trasformare il tuo business.',
    'lead.cta': 'Inizia la Valutazione',
    'lead.step': 'Domanda',
    'lead.of': 'di',
    'lead.q1': "Qual è il tuo livello di familiarità con l'IA?",
    'lead.q1.a1': 'Ne ho sentito parlare, ma non la uso.',
    'lead.q1.a2': 'Uso ChatGPT occasionalmente.',
    'lead.q1.a3': 'Uso strumenti IA quotidianamente (Claude, API, Midjourney).',
    'lead.q2': 'Quanto è pronta digitalmente la tua azienda?',
    'lead.q2.a1': 'Processi per lo più manuali o cartacei.',
    'lead.q2.a2': 'Usiamo alcuni software (CRM, Contabilità).',
    'lead.q2.a3': 'Tutto è in cloud e integrato.',
    'lead.q3': 'Come gestisci le attività ripetitive quotidiane?',
    'lead.q3.a1': 'Esecuzione manuale da parte del team.',
    'lead.q3.a2': 'Strumenti semplici o approssimazioni di base.',
    'lead.q3.a3': 'Agenti e pipeline completamente autonomi.',
    'lead.q4': 'Come prendi decisioni aziendali critiche?',
    'lead.q4.a1': 'Istinto e intuizione.',
    'lead.q4.a2': 'Fogli di calcolo e report settimanali.',
    'lead.q4.a3': 'Modelli predittivi e dashboard in tempo reale.',
    'lead.services.label': 'Quali servizi ti interessano? (Opzionale)',
    'lead.services.placeholder': 'Seleziona uno o più servizi...',
    'lead.svc.chatbot': 'Chatbot Avanzati',
    'lead.svc.models': 'Modelli Personalizzati',
    'lead.svc.rag': 'Sistemi RAG',
    'lead.svc.genai': 'AI Generativa',
    'lead.svc.automation': 'Automazioni',
    'lead.svc.growth': 'Strategie di Crescita',
    'lead.services.continue': 'Vedi il Risultato',
    'lead.result.badge': 'Il tuo Profilo IA',
    'lead.result1.title': 'Opportunità Fondamentale',
    'lead.result1.desc': 'Il tuo business opera con attrito manuale. Questa è una buona notizia: hai il più alto potenziale di guadagno immediato in efficienza.',
    'lead.result1.win': 'Digitalizza un flusso di lavoro chiave (come la gestione lead) per risparmiare subito 10+ ore a settimana.',
    'lead.result2.title': "Pronto per l'Integrazione",
    'lead.result2.desc': 'Hai gli strumenti giusti, ma non comunicano tra loro. I tuoi dati sono isolati, impedendoti di vedere il quadro completo.',
    'lead.result2.win': 'Integra il CRM con i tuoi strumenti di marketing per un unico motore di crescita che traccia la vera fonte del fatturato.',
    'lead.result3.title': "Pronto per l'Automazione",
    'lead.result3.desc': "Hai una solida base digitale. È ora di rimuovere gli umani dal loop ripetitivo e focalizzarli sulla strategia ad alto valore.",
    'lead.result3.win': 'Implementa agenti IA per qualificare i lead 24/7 con flussi di lavoro autonomi che scalano senza nuovo personale.',
    'lead.result4.title': 'Dominio Predittivo',
    'lead.result4.desc': "La tua infrastruttura è d'élite. Sei pronto per passare dalla gestione della crescita alla sua ingegnerizzazione predittiva.",
    'lead.result4.win': 'Usa il Machine Learning per prevedere il LTV dei clienti e automatizzare le offerte in tempo reale.',
    'lead.quickwin': 'La tua Quick Win',
    'lead.form.title': 'Parliamone insieme',
    'lead.form.name': 'Nome e Cognome',
    'lead.form.email': 'Email',
    'lead.form.company': 'Azienda',
    'lead.form.phone': 'Telefono (opzionale)',
    'lead.form.submit': 'Richiedi la Consulenza Gratuita',
    'lead.form.submitting': 'Invio in corso...',
    'lead.form.success': 'Richiesta Inviata!',
    'lead.form.successMsg': 'Grazie! Ti contatteremo a breve per una consulenza personalizzata.',
    'lead.form.restart': 'Rifai la Valutazione',

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

    // Lead Quiz
    'lead.badge': 'Free Assessment',
    'lead.title': 'Discover Your AI ',
    'lead.titleHighlight': 'Potential',
    'lead.subtitle': 'Take this 30-second assessment to see how AI and Growth Hacking can transform your business.',
    'lead.cta': 'Start the Assessment',
    'lead.step': 'Question',
    'lead.of': 'of',
    'lead.q1': 'What is your level of familiarity with AI?',
    'lead.q1.a1': "I've heard of it, but I don't use it.",
    'lead.q1.a2': 'I use ChatGPT occasionally.',
    'lead.q1.a3': 'I use AI tools daily (Claude, APIs, Midjourney).',
    'lead.q2': 'How digitally ready is your company?',
    'lead.q2.a1': 'Mostly manual or paper-based processes.',
    'lead.q2.a2': 'We use some software (CRM, Accounting).',
    'lead.q2.a3': 'Everything is cloud-based and integrated.',
    'lead.q3': 'How do you handle daily repetitive tasks?',
    'lead.q3.a1': 'Manual execution by the team.',
    'lead.q3.a2': 'Simple tools or basic approximations.',
    'lead.q3.a3': 'Fully autonomous agents and pipelines.',
    'lead.q4': 'How do you make critical business decisions?',
    'lead.q4.a1': 'Gut feeling and intuition.',
    'lead.q4.a2': 'Spreadsheets and weekly reports.',
    'lead.q4.a3': 'Predictive models and real-time dashboards.',
    'lead.services.label': 'Which services interest you? (Optional)',
    'lead.services.placeholder': 'Select one or more services...',
    'lead.svc.chatbot': 'Advanced Chatbots',
    'lead.svc.models': 'Custom Models',
    'lead.svc.rag': 'RAG Systems',
    'lead.svc.genai': 'Generative AI',
    'lead.svc.automation': 'Automations',
    'lead.svc.growth': 'Growth Strategies',
    'lead.services.continue': 'See Your Result',
    'lead.result.badge': 'Your AI Profile',
    'lead.result1.title': 'Fundamental Opportunity',
    'lead.result1.desc': 'Your business operates with manual friction. The good news: you have the highest potential for immediate efficiency gains.',
    'lead.result1.win': 'Digitize a key workflow (like lead management) to immediately save 10+ hours per week.',
    'lead.result2.title': 'Ready for Integration',
    'lead.result2.desc': "You have the right tools, but they don't talk to each other. Your data is siloed, preventing you from seeing the full picture.",
    'lead.result2.win': 'Integrate your CRM with marketing tools for a single growth engine that tracks the true source of revenue.',
    'lead.result3.title': 'Automation Ready',
    'lead.result3.desc': "You have a solid digital foundation. It's time to remove humans from repetitive loops and focus them on high-value strategy.",
    'lead.result3.win': 'Implement AI agents to qualify leads 24/7 with autonomous workflows that scale without new hires.',
    'lead.result4.title': 'Predictive Dominance',
    'lead.result4.desc': "Your infrastructure is elite. You're ready to shift from managing growth to engineering it with predictive intelligence.",
    'lead.result4.win': 'Use Machine Learning to predict customer LTV and automate ad bidding in real time.',
    'lead.quickwin': 'Your Quick Win',
    'lead.form.title': "Let's talk about it",
    'lead.form.name': 'Full Name',
    'lead.form.email': 'Email',
    'lead.form.company': 'Company',
    'lead.form.phone': 'Phone (optional)',
    'lead.form.submit': 'Request Free Consultation',
    'lead.form.submitting': 'Submitting...',
    'lead.form.success': 'Request Sent!',
    'lead.form.successMsg': "Thank you! We'll contact you shortly for a personalized consultation.",
    'lead.form.restart': 'Retake Assessment',

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
