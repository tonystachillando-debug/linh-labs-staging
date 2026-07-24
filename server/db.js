import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'linhlabs_news.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial DB Structure
const defaultData = {
  articles: [],
  subscribers: [],
  logs: []
};

// Load database
function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error loading DB file, initializing fresh DB:', err);
  }
  saveDB(defaultData);
  return defaultData;
}

// Save database atomically
function saveDB(data) {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error saving DB:', err);
  }
}

// Compute hash of URL or Title for deduplication
export function computeHash(text) {
  if (!text) return '';
  const normalized = text.toLowerCase().trim().replace(/https?:\/\//, '').replace(/[\W_]+/g, '');
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

// Check if article is already in DB (by URL hash or title similarity)
export function isArticleDuplicate(url, title) {
  const db = loadDB();
  const urlHash = computeHash(url);
  const titleHash = computeHash(title);

  return db.articles.some(art => {
    if (art.url_hash === urlHash || art.title_hash === titleHash) {
      return true;
    }
    // Also check title similarity fallback (Levenshtein/Words overlap)
    if (art.title && title) {
      const t1Words = art.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const t2Words = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const common = t1Words.filter(w => t2Words.includes(w));
      if (t1Words.length > 0 && common.length / Math.max(t1Words.length, t2Words.length) > 0.75) {
        return true;
      }
    }
    return false;
  });
}

// Save newly curated articles
export function saveArticles(articles) {
  const db = loadDB();
  let addedCount = 0;

  for (const art of articles) {
    const urlHash = computeHash(art.url);
    const titleHash = computeHash(art.title);

    if (!isArticleDuplicate(art.url, art.title)) {
      const newArticle = {
        id: crypto.randomUUID(),
        url_hash: urlHash,
        title_hash: titleHash,
        title: art.title,
        url: art.url,
        source: art.source || 'AI News Feed',
        category: art.category || 'AI Innovation',
        published_at: art.published_at || new Date().toISOString(),
        summary_it: art.summary_it || '',
        takeaways: art.takeaways || [],
        is_newsletter_sent: false,
        created_at: new Date().toISOString()
      };
      db.articles.unshift(newArticle);
      addedCount++;
    }
  }

  saveDB(db);
  return addedCount;
}

// Get latest published articles (for site & newsletter)
export function getLatestArticles(limit = 10, includeDrafts = false) {
  const db = loadDB();
  if (includeDrafts) {
    return db.articles.slice(0, limit);
  }
  return db.articles.filter(a => a.status === 'published' || a.status === undefined).slice(0, limit);
}

// Publish specific articles
export function publishArticles(articleIds) {
  const db = loadDB();
  let count = 0;
  db.articles.forEach(art => {
    if (!articleIds || articleIds.length === 0 || articleIds.includes(art.id)) {
      art.status = 'published';
      count++;
    }
  });
  saveDB(db);
  return count;
}

// Get pending articles for newsletter broadcast
export function getPendingNewsletterArticles() {
  const db = loadDB();
  return db.articles.filter(a => !a.is_newsletter_sent);
}

// Mark articles as sent in newsletter
export function markArticlesAsSent(articleIds) {
  const db = loadDB();
  db.articles.forEach(art => {
    if (articleIds.includes(art.id)) {
      art.is_newsletter_sent = true;
    }
  });
  saveDB(db);
}

// Add subscriber (GDPR compliant double opt-in)
export function addSubscriber({ email, phone = '', channel = 'email', ip = '' }) {
  const db = loadDB();
  const existing = db.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    if (existing.status === 'unsubscribed') {
      existing.status = 'pending';
      existing.confirmation_token = crypto.randomBytes(32).toString('hex');
      existing.consent_given_at = new Date().toISOString();
      saveDB(db);
      return { subscriber: existing, isNew: false };
    }
    return { subscriber: existing, isNew: false, alreadyActive: existing.status === 'confirmed' };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const subscriber = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    phone,
    channel, // 'email' or 'whatsapp'
    status: 'pending', // pending double opt-in
    confirmation_token: token,
    consent_given_at: new Date().toISOString(),
    ip_address: ip,
    created_at: new Date().toISOString()
  };

  db.subscribers.push(subscriber);
  saveDB(db);
  return { subscriber, isNew: true };
}

// Confirm subscription via double opt-in token
export function confirmSubscriber(token) {
  const db = loadDB();
  const sub = db.subscribers.find(s => s.confirmation_token === token);
  if (!sub) return null;

  sub.status = 'confirmed';
  sub.confirmed_at = new Date().toISOString();
  saveDB(db);
  return sub;
}

// Unsubscribe by email or token
export function unsubscribeSubscriber(identifier) {
  const db = loadDB();
  const sub = db.subscribers.find(s => s.email.toLowerCase() === identifier.toLowerCase() || s.confirmation_token === identifier || s.id === identifier);
  if (!sub) return null;

  sub.status = 'unsubscribed';
  sub.unsubscribed_at = new Date().toISOString();
  saveDB(db);
  return sub;
}

// Get active confirmed subscribers
export function getConfirmedSubscribers(channel = 'email') {
  const db = loadDB();
  return db.subscribers.filter(s => s.status === 'confirmed' && (s.channel === channel || channel === 'all'));
}
