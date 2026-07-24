import { saveArticles } from './db.js';

const july24Articles = [
  {
    title: "OpenAI Lancia ChatGPT Health: Integrazione Dati Medici e Assistenza Personale",
    url: "https://techcrunch.com/2026/07/24/openai-chatgpt-health-launch",
    source: "TechCrunch AI",
    category: "LLM & Agenti",
    published_at: "2026-07-24T09:00:00.000Z",
    summary_it: "OpenAI ha esteso a livello globale la nuova suite ChatGPT Health. La piattaforma permette agli utenti di sincronizzare in modo sicuro i dati biometrici da Apple Health e MyFitnessPal, offrendo consigli personalizzati sul benessere supportati da modelli ragionativi dedicati.",
    takeaways: [
      "Integrazione diretta con dispositivi indossabili ed app di tracciamento salute",
      "Livello avanzato di crittografia end-to-end conforme alle normative mediche HIPAA",
      "Supporto in tempo reale per analisi di esami e routine di prevenzione"
    ]
  },
  {
    title: "AMD Sfida il Dominio di Nvidia con il Sistema Rack-Scale Helios AI",
    url: "https://techcrunch.com/2026/07/24/amd-helios-ai-rack-system",
    source: "VentureBeat AI",
    category: "Infrastruttura & Hardware",
    published_at: "2026-07-24T08:30:00.000Z",
    summary_it: "AMD ha annunciato il lancio commerciale di Helios, un sistema supercomputer su scala rack progettato per competere direttamente con le architetture Blackwell di Nvidia. Garantisce un'efficienza energetica superiore del 35% nell'inferenza di modelli LLM con centinaia di miliardi di parametri.",
    takeaways: [
      "Riduzione significativa dei consumi energetici per data center AI",
      "Compatibilità nativa con cluster PyTorch e framework open source",
      "Prime consegne previste entro la fine dell'anno ai principali cloud provider"
    ]
  },
  {
    title: "Anthropic Aggiorna Claude Voice Mode: Interazione Vocale Istantanea e Multimodale",
    url: "https://techcrunch.com/2026/07/24/anthropic-claude-voice-mode-update",
    source: "MIT Tech Review",
    category: "Ricerca & Modelli",
    published_at: "2026-07-24T08:00:00.000Z",
    summary_it: "Anthropic ha rilasciato il nuovo aggiornamento per la modalità vocale di Claude. Il modello risponde con una latenza inferiore ai 200 millisecondi ed è in grado di pianificare appuntamenti, riassumere riunioni dal vivo e redigere email complesse mediante comandi vocali naturali.",
    takeaways: [
      "Latenza quasi zero e comprensione delle sfumature emotive del parlato",
      "Integrazione immediata con Google Calendar e suite di produttività aziendale",
      "Disponibile sia per account individuali che per l'offerta Enterprise"
    ]
  },
  {
    title: "Runway Lancia Media Router: L'Algoritmo che Seleziona la Migliore AI Generativa",
    url: "https://techcrunch.com/2026/07/24/runway-media-router-ai",
    source: "TechCrunch AI",
    category: "AI Enterprise",
    published_at: "2026-07-24T07:45:00.000Z",
    summary_it: "Runway ha presentato Media Router, una soluzione avanzata che indirizza le richieste di generazione video e immagine verso il modello ottimale in base ai parametri di costo, velocità o risoluzione richiesti dallo sviluppatore.",
    takeaways: [
      "Ottimizzazione automatica dei costi di calcolo fino al 40%",
      "Routing intelligente tra modelli proprietari e di terze parti",
      "Interfaccia API unica per la produzione di contenuti multimediali"
    ]
  },
  {
    title: "AegisAI Raccoglie $36M per Combattere lo Spear Phishing Generato da Agenti AI",
    url: "https://techcrunch.com/2026/07/24/aegisai-funding-spear-phishing-defense",
    source: "VentureBeat AI",
    category: "Strategia & Mercato",
    published_at: "2026-07-24T07:15:00.000Z",
    summary_it: "La startup AegisAI, fondata da ex dirigenti della sicurezza Google, ha chiuso un round di finanziamento da 36 milioni di dollari. La tecnologia sviluppa agenti difensivi capaci di individuare in tempo reale email di truffa sofisticate create con intelligenza artificiale.",
    takeaways: [
      "Analisi comportamentale profonda sulle anomalie comunicative aziendali",
      "Risposta automatizzata e blocco immediato delle minacce prima della consegna",
      "Forte interesse da parte dei settori bancario ed assicurativo"
    ]
  }
];

const count = saveArticles(july24Articles);
console.log(`✅ Inserite ${count} notizie ufficiali per l'edizione del 24 Luglio 2026!`);
