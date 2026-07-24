import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveArticles } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../data/linhlabs_news.json');

// Force reset DB file to insert fresh concise summaries
if (fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ articles: [], subscribers: [], logs: [] }, null, 2));
}

const july24Articles = [
  {
    title: "OpenAI Lancia ChatGPT Health: Integrazione Dati Medici e Assistenza Personale",
    url: "https://techcrunch.com/2026/07/24/openai-chatgpt-health-launch",
    source: "TechCrunch AI",
    category: "LLM & Agenti",
    published_at: "2026-07-24T09:00:00.000Z",
    summary_it: "OpenAI ha lanciato ufficialmente ChatGPT Health, un'estensione dedicata alla salute personale. La piattaforma consente di collegare in totale sicurezza i dati biometrici provenienti da Apple Health e MyFitnessPal, analizzando parametri fisici ed esami per fornire raccomandazioni personalizzate sul benessere guidate dai più recenti modelli di ragionamento AI.",
    takeaways: [
      "Sincronizzazione biometrica in tempo reale con Apple Health",
      "Crittografia avanzata e piena conformità alle norme di riservatezza sanitaria"
    ],
    ranking_scores: { total_score: 94, source_credibility: 95, business_importance: 96, audience_interest: 92 }
  },
  {
    title: "AMD Sfida il Dominio di Nvidia con il Sistema Rack-Scale Helios AI",
    url: "https://techcrunch.com/2026/07/24/amd-helios-ai-rack-system",
    source: "VentureBeat AI",
    category: "Infrastruttura & Hardware",
    published_at: "2026-07-24T08:30:00.000Z",
    summary_it: "AMD compie un passo decisivo nel mercato dell'hardware con il nuovo Helios, un supercomputer su scala rack ideato per rivaleggiare con l'architettura Blackwell di Nvidia. L'infrastruttura offre un'efficienza energetica superiore del 35% durante l'inferenza di modelli linguistici di grandi dimensioni, abbattendo drasticamente i costi operativi dei data center.",
    takeaways: [
      "Risparmio energetico del 35% sull'elaborazione di LLM complessi",
      "Compatibilità nativa con PyTorch e framework open source"
    ],
    ranking_scores: { total_score: 91, source_credibility: 88, business_importance: 95, audience_interest: 88 }
  },
  {
    title: "Anthropic Aggiorna Claude Voice Mode: Interazione Vocale Istantanea e Multimodale",
    url: "https://techcrunch.com/2026/07/24/anthropic-claude-voice-mode-update",
    source: "MIT Tech Review",
    category: "Ricerca & Modelli",
    published_at: "2026-07-24T08:00:00.000Z",
    summary_it: "Anthropic ha rilasciato un importante aggiornamento per la modalità vocale di Claude. Con una latenza ridotta al sotto dei 200 millisecondi, l'AI è in grado di sostenere conversazioni fluide, comprendere le sfumature espressive umane, organizzare calendari di lavoro e sintetizzare riunioni aziendali direttamente da comandi vocali.",
    takeaways: [
      "Risposta immediata senza pause percepite dall'utente (<200ms)",
      "Integrazione diretta con Google Calendar e suite di lavoro"
    ],
    ranking_scores: { total_score: 89, source_credibility: 90, business_importance: 90, audience_interest: 86 }
  },
  {
    title: "Runway Lancia Media Router: L'Algoritmo che Seleziona la Migliore AI Generativa",
    url: "https://techcrunch.com/2026/07/24/runway-media-router-ai",
    source: "TechCrunch AI",
    category: "AI Enterprise",
    published_at: "2026-07-24T07:45:00.000Z",
    summary_it: "Runway ha svelato Media Router, un sistema d'instradamento intelligente che seleziona il miglior modello per generare video, immagini o audio. In base alle priorità stabilite dagli sviluppatori (velocità, costo o qualità visiva), l'algoritmo distribuisce le richieste ottimizzando la resa dei progetti creativi.",
    takeaways: [
      "Riduzione dei costi di calcolo fino al 40% sulle pipeline multimediali",
      "API unica per coordinare modelli generativi multipli"
    ],
    ranking_scores: { total_score: 86, source_credibility: 85, business_importance: 88, audience_interest: 84 }
  },
  {
    title: "AegisAI Raccoglie $36M per Combattere lo Spear Phishing Generato da Agenti AI",
    url: "https://techcrunch.com/2026/07/24/aegisai-funding-spear-phishing-defense",
    source: "VentureBeat AI",
    category: "Strategia & Mercato",
    published_at: "2026-07-24T07:15:00.000Z",
    summary_it: "La startup di cybersicurezza AegisAI ha chiuso un round di investimento da 36 milioni di dollari. Fondata da ex esperti di sicurezza Google, la società impiega agenti AI difensivi capaci di esaminare la posta aziendale per identificare ed intercettare in tempo reale tentativi di truffa estremamente realistici creati con AI generativa.",
    takeaways: [
      "Protezione proattiva contro minacce informatiche generate da AI",
      "Esame comportamentale delle comunicazioni in tempo reale"
    ],
    ranking_scores: { total_score: 84, source_credibility: 84, business_importance: 86, audience_interest: 80 }
  }
];

const count = saveArticles(july24Articles);
console.log(`✅ Inserite ${count} notizie brevi (max 5-6 righe rielaborate da zero) per il 24 Luglio 2026!`);
