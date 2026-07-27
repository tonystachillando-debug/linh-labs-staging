import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveArticles } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../data/linhlabs_news.json');

// Ensure DB file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ articles: [], subscribers: [], logs: [] }, null, 2));
}

const july27Articles = [
  {
    title: "Google DeepMind Presenta Gemini 3 Flash & Project Mariner per Agenti Autonomi",
    url: "https://blog.google/technology/ai/deepmind-gemini-3-flash-mariner-2026",
    source: "Google DeepMind News",
    category: "LLM & Agenti",
    published_at: "2026-07-27T08:00:00.000Z",
    summary_it: "Google DeepMind ha svelato Gemini 3 Flash unitamente a Project Mariner, un'infrastruttura d'orchestrazione ad ultra-bassa latenza progettata per consentire agli agenti AI di navigare nel web ed eseguire flussi operativi complessi in completa autonomia e sicurezza.",
    takeaways: [
      "Latenza di risposta ridotta del 50% rispetto ai modelli precedenti",
      "Orchestrazione nativa di agenti per automazione browser e workflow aziendali"
    ],
    ranking_scores: { total_score: 96, source_credibility: 98, business_importance: 96, audience_interest: 94 }
  },
  {
    title: "Meta Rilascia Llama 4 Open-Weights: Architettura MoE ad Alta Efficienza",
    url: "https://ai.meta.com/blog/llama-4-open-weights-moe-release",
    source: "Meta AI Research",
    category: "Ricerca & Modelli",
    published_at: "2026-07-27T07:30:00.000Z",
    summary_it: "Meta ha reso disponibili i pesi aperti di Llama 4. Il nuovo modello sfrutta un'architettura Mixture-of-Experts (MoE) che consente di ridurre dell'80% i requisiti di memoria VRAM durante l'inferenza, permettendo l'esecuzione locale di modelli di classe enterprise su hardware standard.",
    takeaways: [
      "Abbattimento dell'80% dei costi di calcolo per l'inferenza locale",
      "Piena compatibilità open-source per integrazioni custom in azienda"
    ],
    ranking_scores: { total_score: 93, source_credibility: 95, business_importance: 94, audience_interest: 90 }
  },
  {
    title: "EU AI Act: Pubblicate le Linee Guida Ufficiali per l'Audit della Compliance B2B",
    url: "https://ec.europa.eu/commission/presscorner/detail/it/ai_act_compliance_guidelines_2026",
    source: "EU Tech Commission",
    category: "Regolamentazione & Compliance",
    published_at: "2026-07-27T07:00:00.000Z",
    summary_it: "La Commissione Europea ha rilasciato il quadro operativo finale per gli audit di conformità all'EU AI Act. Le nuove linee guida definiscono i requisiti minimi di tracciabilità dei dati e di sicurezza per le aziende che integrano modelli generativi nei processi di produzione e customer care.",
    takeaways: [
      "Standard ufficiali di audit trail per i log e la trasparenza dei dati AI",
      "Framework di sicurezza obbligatorio per i software enterprise operanti in UE"
    ],
    ranking_scores: { total_score: 90, source_credibility: 92, business_importance: 95, audience_interest: 83 }
  }
];

const saved = saveArticles(july27Articles);
console.log(`✅ Edizione 27 Luglio 2026 salvata con successo! Salvati ${saved.length} nuovi articoli.`);
