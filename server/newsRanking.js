// Source credibility weight matrix (0 to 100)
const SOURCE_CREDIBILITY = {
  'ArXiv AI Digest': 95,
  'OpenAI Blog': 95,
  'Hugging Face Blog': 90,
  'MIT Tech Review': 88,
  'VentureBeat AI': 82,
  'TechCrunch AI': 80,
  'Linh Labs AI Radar': 85
};

/**
 * Objective News Ranking Algorithm
 * Score = (Source Credibility * 0.35) + (Business Importance * 0.45) + (Virality / Interest * 0.20)
 */
export function rankNewsArticle(article) {
  const sourceScore = SOURCE_CREDIBILITY[article.source] || 75;

  // Evaluate Importance Score based on keywords
  let importanceScore = 70;
  const titleAndDesc = `${article.title} ${article.raw_description || ''} ${article.summary_it || ''}`.toLowerCase();

  const highImpactKeywords = ['launch', 'lancia', 'model', 'modello', 'enterprise', 'security', 'sicurezza', 'benchmark', 'breakthrough', 'gpus', 'chip', 'funding', 'health', 'salute', 'voice', 'vocale'];
  highImpactKeywords.forEach(kw => {
    if (titleAndDesc.includes(kw)) importanceScore += 4;
  });
  importanceScore = Math.min(importanceScore, 100);

  // Evaluate Virality / Public Interest Score
  let viralityScore = 65;
  const viralKeywords = ['chatgpt', 'claude', 'openai', 'gemini', 'nvidia', 'amd', 'anthropic', 'meta', 'google', 'runway'];
  viralKeywords.forEach(kw => {
    if (titleAndDesc.includes(kw)) viralityScore += 5;
  });
  viralityScore = Math.min(viralityScore, 100);

  // Weighted total score (0 to 100)
  const totalScore = Math.round((sourceScore * 0.35) + (importanceScore * 0.45) + (viralityScore * 0.20));

  return {
    ...article,
    ranking_scores: {
      total_score: totalScore,
      source_credibility: sourceScore,
      business_importance: importanceScore,
      audience_interest: viralityScore
    }
  };
}

/**
 * Ranks an array of articles and sorts them in descending order of objective score
 */
export function rankAndSortArticles(articles) {
  return articles
    .map(rankNewsArticle)
    .sort((a, b) => b.ranking_scores.total_score - a.ranking_scores.total_score);
}
