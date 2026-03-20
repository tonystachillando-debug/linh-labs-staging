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
    'mission.title': 'Non ci fermiamo alla strategia. ',
    'mission.titleHighlight': 'Costruiamo sistemi che funzionano.',
    'mission.text1': 'Chatbot, pipeline RAG, agenti autonomi e automazioni n8n: progettiamo e implementiamo soluzioni AI direttamente nei tuoi flussi di lavoro. Perché un\'ora di automazione vale più di cento slide.',
    'mission.text2': 'Ogni investimento in AI deve generare un ritorno misurabile. Partiamo sempre dall\'inefficienza più costosa della tua azienda e la trasformiamo in un vantaggio competitivo concreto.',
    'mission.metric1': 'Efficienza Operativa',
    'mission.metric1desc': 'Ore lavorative medie attualmente dedicate a task ripetitivi e automatizzabili.',
    'mission.metric2': 'Impatto sulla Produttività',
    'mission.metric2desc': "Incremento documentato della produttività individuale grazie all'assistenza AI.",
    'mission.metric3': 'Riduzione Costi Operativi',
    'mission.metric3desc': "Riduzione potenziale dei costi operativi attraverso l'ottimizzazione dei flussi di lavoro.",

    // Services
    'services.title1': "Accompagniamo le aziende verso ",
    'services.titleHighlight1': "l'eccellenza operativa",
    'services.titleConnector': " e ",
    'services.titleHighlight2': "l'innovazione avanzata",
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
    'aoa.subtitle': 'Un gioco RTS agentico su blockchain dove agenti AI autonomi combattono, apprendono e si evolvono on-chain sulla rete MegaETH.',
    'aoa.feature1.label': 'RTS Agentico',
    'aoa.feature1.desc': 'Strategia in tempo reale con agenti AI autonomi',
    'aoa.feature2.label': 'AI-Powered',
    'aoa.feature2.desc': 'Agenti che apprendono e si adattano on-chain',
    'aoa.feature3.label': 'Blockchain',
    'aoa.feature3.desc': 'Costruito su MegaETH per trasparenza totale',
    'aoa.feature4.label': 'Multiplayer',
    'aoa.feature4.desc': 'Competizione globale in tempo reale',
    'aoa.cta': 'Scopri di più',

    // Portfolio Section
    'portfolio.badge': 'Portfolio',
    'portfolio.title': 'I progetti da noi ',
    'portfolio.titleHighlight': 'realizzati',

    // Pumbo
    'pumbo.badge': 'Progetto Realizzato',
    'pumbo.title': '',
    'pumbo.titleHighlight': 'Pumbo',
    'pumbo.subtitle': 'Il tuo Personal Stylist AI: scopri outfit perfetti, prova virtualmente i capi e trova ispirazione quotidiana con la potenza dell\'intelligenza artificiale.',
    'pumbo.feature1.label': 'Style Agent AI',
    'pumbo.feature1.desc': 'Un agente AI dedicato che impara il tuo stile e suggerisce outfit personalizzati',
    'pumbo.feature2.label': 'Virtual Try-On',
    'pumbo.feature2.desc': 'Visualizza come ti stanno i capi prima di acquistarli',
    'pumbo.feature3.label': 'Ispirazione Quotidiana',
    'pumbo.feature3.desc': 'Feed personalizzato di outfit e tendenze basato sui tuoi gusti',
    'pumbo.feature4.label': 'Fashion Tech',
    'pumbo.feature4.desc': 'Tecnologia all\'avanguardia applicata al mondo della moda',
    'pumbo.cta': 'Scopri di più',

    // Ragalo
    'ragalo.badge': 'Progetto Realizzato',
    'ragalo.title': '',
    'ragalo.titleHighlight': 'Ragalo',
    'ragalo.subtitle': 'Un\'app RAG-powered che trasforma i tuoi documenti in conversazioni intelligenti. Carica, chiedi e ottieni risposte precise basate sui tuoi dati.',
    'ragalo.feature1.label': 'RAG Engine',
    'ragalo.feature1.desc': 'Retrieval-Augmented Generation per risposte accurate dai tuoi documenti',
    'ragalo.feature2.label': 'Upload & Chat',
    'ragalo.feature2.desc': 'Carica qualsiasi documento e inizia a conversare istantaneamente',
    'ragalo.feature3.label': 'Citazioni Precise',
    'ragalo.feature3.desc': 'Ogni risposta con riferimenti diretti alle fonti originali',
    'ragalo.feature4.label': 'Multi-formato',
    'ragalo.feature4.desc': 'Supporta PDF, DOCX, TXT e molti altri formati',
    'ragalo.cta': 'Prova ora',

    // Sfatify
    'sfatify.badge': 'Progetto Realizzato',
    'sfatify.title': '',
    'sfatify.titleHighlight': 'Sfatify',
    'sfatify.subtitle': 'L\'assistente AI per i tuoi fogli di calcolo. Invia istruzioni testuali, carica immagini o combina entrambi e lascia che l\'AI aggiorni i tuoi Google Sheets automaticamente.',
    'sfatify.feature1.label': 'Istruzioni Testuali',
    'sfatify.feature1.desc': 'Descrivi cosa vuoi fare e l\'AI aggiorna il foglio di calcolo per te',
    'sfatify.feature2.label': 'Upload Immagini',
    'sfatify.feature2.desc': 'Carica immagini con dati e l\'AI li estrae automaticamente',
    'sfatify.feature3.label': 'Google Sheets',
    'sfatify.feature3.desc': 'Integrazione nativa con Google Sheets per aggiornamenti istantanei',
    'sfatify.feature4.label': 'AI-Powered',
    'sfatify.feature4.desc': 'Intelligenza artificiale avanzata per comprendere e eseguire le tue richieste',
    'sfatify.cta': 'Prova ora',

    // Partners
    'partners.title': 'Trusted by',

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
    'lead.title': 'Scopri il potenziale ',
    'lead.titleHighlight': 'AI',
    'lead.titleEnd': ' per la tua azienda',
    'lead.subtitle': 'Un breve quiz di massimo 30 secondi per scoprire come Intelligenza Artificiale e Growth Hacking possono trasformare il tuo business.',
    'lead.cta': 'Inizia la Valutazione',
    'lead.step': 'Domanda',
    'lead.of': 'di',
    'lead.q1': "Qual è il tuo livello di familiarità con l'AI?",
    'lead.q1.a1': 'Ne ho sentito parlare, ma non la uso.',
    'lead.q1.a2': 'Uso ChatGPT occasionalmente.',
    'lead.q1.a3': 'Uso strumenti AI quotidianamente (Claude, API, Midjourney).',
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
    'lead.result.badge': 'Il tuo Profilo AI',
    'lead.result1.title': 'Opportunità Fondamentale',
    'lead.result1.desc': 'Il tuo business opera con attrito manuale. Questa è una buona notizia: hai il più alto potenziale di guadagno immediato in efficienza.',
    'lead.result1.win': 'Digitalizza un flusso di lavoro chiave (come la gestione lead) per risparmiare subito 10+ ore a settimana.',
    'lead.result2.title': "Pronto per l'Integrazione",
    'lead.result2.desc': 'Hai gli strumenti giusti, ma non comunicano tra loro. I tuoi dati sono isolati, impedendoti di vedere il quadro completo.',
    'lead.result2.win': 'Integra il CRM con i tuoi strumenti di marketing per un unico motore di crescita che traccia la vera fonte del fatturato.',
    'lead.result3.title': "Pronto per l'Automazione",
    'lead.result3.desc': "Hai una solida base digitale. È ora di rimuovere gli umani dal loop ripetitivo e focalizzarli sulla strategia ad alto valore.",
    'lead.result3.win': 'Implementa agenti AI per qualificare i lead 24/7 con flussi di lavoro autonomi che scalano senza nuovo personale.',
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
    'catPage.ctaTitle': 'Vuoi implementare una di queste automazioni?',
    'catPage.ctaSubtitle': 'Scopri in 30 secondi quali soluzioni AI si adattano meglio alla tua azienda. Compila il nostro quiz gratuito e ricevi una valutazione personalizzata.',
    'catPage.ctaBtn': 'Inizia la Valutazione Gratuita',
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
    'mission.title': 'We don\'t stop at strategy. ',
    'mission.titleHighlight': 'We build systems that work.',
    'mission.text1': 'Chatbots, RAG pipelines, autonomous agents and n8n automations: we design and implement AI solutions directly into your workflows. Because one hour of automation is worth more than a hundred slides.',
    'mission.text2': 'Every AI investment must generate a measurable return. We always start from your most expensive inefficiency and turn it into a concrete competitive advantage.',
    'mission.metric1': 'Operational Efficiency',
    'mission.metric1desc': 'Average working hours currently dedicated to repetitive and automatable tasks.',
    'mission.metric2': 'Productivity Impact',
    'mission.metric2desc': 'Documented increase in individual productivity through AI assistance.',
    'mission.metric3': 'Operational Cost Reduction',
    'mission.metric3desc': 'Potential reduction in operational costs through workflow optimization.',

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
    'aoa.subtitle': 'An agentic RTS game on blockchain where autonomous AI agents fight, learn and evolve on-chain on the MegaETH network.',
    'aoa.feature1.label': 'Agentic RTS',
    'aoa.feature1.desc': 'Real-time strategy with autonomous AI agents',
    'aoa.feature2.label': 'AI-Powered',
    'aoa.feature2.desc': 'Agents that learn and adapt on-chain',
    'aoa.feature3.label': 'Blockchain',
    'aoa.feature3.desc': 'Built on MegaETH for total transparency',
    'aoa.feature4.label': 'Multiplayer',
    'aoa.feature4.desc': 'Global real-time competition',
    'aoa.cta': 'Learn More',

    // Portfolio Section
    'portfolio.badge': 'Portfolio',
    'portfolio.title': 'Our ',
    'portfolio.titleHighlight': 'Projects',

    // Pumbo
    'pumbo.badge': 'Completed Project',
    'pumbo.title': '',
    'pumbo.titleHighlight': 'Pumbo',
    'pumbo.subtitle': 'Your AI Personal Stylist: discover perfect outfits, try clothes virtually and find daily inspiration powered by artificial intelligence.',
    'pumbo.feature1.label': 'AI Style Agent',
    'pumbo.feature1.desc': 'A dedicated AI agent that learns your style and suggests personalized outfits',
    'pumbo.feature2.label': 'Virtual Try-On',
    'pumbo.feature2.desc': 'Visualize how clothes look on you before buying',
    'pumbo.feature3.label': 'Daily Inspiration',
    'pumbo.feature3.desc': 'Personalized outfit and trend feed based on your taste',
    'pumbo.feature4.label': 'Fashion Tech',
    'pumbo.feature4.desc': 'Cutting-edge technology applied to the fashion world',
    'pumbo.cta': 'Learn More',

    // Ragalo
    'ragalo.badge': 'Completed Project',
    'ragalo.title': '',
    'ragalo.titleHighlight': 'Ragalo',
    'ragalo.subtitle': 'A RAG-powered app that turns your documents into intelligent conversations. Upload, ask and get precise answers based on your data.',
    'ragalo.feature1.label': 'RAG Engine',
    'ragalo.feature1.desc': 'Retrieval-Augmented Generation for accurate answers from your documents',
    'ragalo.feature2.label': 'Upload & Chat',
    'ragalo.feature2.desc': 'Upload any document and start conversing instantly',
    'ragalo.feature3.label': 'Precise Citations',
    'ragalo.feature3.desc': 'Every answer with direct references to original sources',
    'ragalo.feature4.label': 'Multi-format',
    'ragalo.feature4.desc': 'Supports PDF, DOCX, TXT and many other formats',
    'ragalo.cta': 'Try it now',

    // Sfatify
    'sfatify.badge': 'Completed Project',
    'sfatify.title': '',
    'sfatify.titleHighlight': 'Sfatify',
    'sfatify.subtitle': 'Your AI spreadsheet assistant: send text instructions, upload images, or combine both and let AI update your Google Sheets automatically.',
    'sfatify.feature1.label': 'Text Instructions',
    'sfatify.feature1.desc': 'Describe what you want and AI updates the spreadsheet for you',
    'sfatify.feature2.label': 'Image Upload',
    'sfatify.feature2.desc': 'Upload images with data and AI extracts it automatically',
    'sfatify.feature3.label': 'Google Sheets',
    'sfatify.feature3.desc': 'Native integration with Google Sheets for instant updates',
    'sfatify.feature4.label': 'AI-Powered',
    'sfatify.feature4.desc': 'Advanced artificial intelligence to understand and execute your requests',
    'sfatify.cta': 'Try it now',

    // Partners
    'partners.title': 'Trusted by',

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
    'lead.title': 'Discover the ',
    'lead.titleHighlight': 'AI',
    'lead.titleEnd': ' potential for your company',
    'lead.subtitle': 'A quick quiz of maximum 30 seconds to discover how Artificial Intelligence and Growth Hacking can transform your business.',
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
    'catPage.ctaTitle': 'Want to implement one of these automations?',
    'catPage.ctaSubtitle': 'Discover in 30 seconds which AI solutions best fit your company. Complete our free quiz and receive a personalized assessment.',
    'catPage.ctaBtn': 'Start Free Assessment',
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
  setLang: () => { },
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
