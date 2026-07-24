import { runNewsScan } from './newsEngine.js';
import { getLatestArticles, isArticleDuplicate } from './db.js';

async function test() {
  console.log('🧪 Starting test run of Linh Labs AI News Engine...');

  // Pass 1: Run scan
  console.log('\n--- PASS 1: Initial Scan ---');
  const res1 = await runNewsScan();
  console.log('Scan Pass 1 Result:', res1);

  const articles = getLatestArticles(5);
  console.log(`\nFound ${articles.length} articles in DB.`);
  if (articles.length > 0) {
    console.log('Sample Article:', articles[0]);

    // Test deduplication check
    const isDup = isArticleDuplicate(articles[0].url, articles[0].title);
    console.log(`\nTesting deduplication on existing article [${articles[0].title.slice(0, 30)}...]: Duplicate = ${isDup} (Expected: true)`);
  }

  // Pass 2: Run scan again immediately to verify deduplication skips everything previously processed
  console.log('\n--- PASS 2: Immediate Re-Scan (Deduplication Check) ---');
  const res2 = await runNewsScan();
  console.log('Scan Pass 2 Result:', res2);

  if (res2.added === 0) {
    console.log('\n✅ PASS 2 SUCCESS: 0 duplicates added! Deduplication working perfectly!');
  } else {
    console.warn(`\n⚠️ PASS 2 WARNING: ${res2.added} articles added on re-scan.`);
  }

  process.exit(0);
}

test().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
