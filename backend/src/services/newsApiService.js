import axios from 'axios';
import Article from '../models/Article.js';
import Source from '../models/Source.js';

const NEWSAPI_BASE = 'https://newsapi.org/v2/everything';

/**
 * Fetch articles from NewsAPI for given keywords
 */
export async function fetchArticlesFromNewsAPI() {
  try {
    const keywords = ['politics', 'economy', 'climate', 'election', 'healthcare'];
    const allArticles = [];

    console.log('Fetching articles from NewsAPI...');

    for (const keyword of keywords) {
      try {
        const response = await axios.get(NEWSAPI_BASE, {
          params: {
            q: keyword,
            sortBy: 'publishedAt',
            language: 'en',
            pageSize: 100,
            apiKey: process.env.NEWSAPI_KEY,
          },
        });

        if (response.data.articles) {
          allArticles.push(...response.data.articles);
          console.log(`Fetched ${response.data.articles.length} articles for "${keyword}"`);
        }
      } catch (error) {
        console.error(`Error fetching articles for "${keyword}":`, error.message);
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(`Total articles fetched: ${allArticles.length}`);
    return allArticles;
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error.message);
    throw error;
  }
}

/**
 * Save articles to database
 */
export async function saveArticlesToDatabase(newsApiArticles) {
  try {
    let savedCount = 0;
    let skippedCount = 0;

    for (const article of newsApiArticles) {
      try {
        // Find or create source
        let source = await Source.findOne({ name: article.source.name });

        if (!source) {
          console.log(`Creating new source: ${article.source.name}`);
          // Create default source if not found
          source = new Source({
            name: article.source.name,
            url: article.source.id || '',
            bias_score: 0, // Default to center
            bias_category: 'Center',
            credibility_score: 75,
          });
          await source.save();
        }

        // Check if article already exists
        const existingArticle = await Article.findOne({ url: article.url });

        if (existingArticle) {
          skippedCount++;
          continue;
        }

        // Create article
        const newArticle = new Article({
          title: article.title,
          description: article.description,
          content: article.content,
          source_id: source._id,
          url: article.url,
          image_url: article.urlToImage,
          published_at: new Date(article.publishedAt),
          category: article.category,
          raw_data: article,
        });

        await newArticle.save();
        savedCount++;
      } catch (error) {
        // Duplicate or other error, skip
        skippedCount++;
      }
    }

    console.log(`Saved: ${savedCount}, Skipped: ${skippedCount}`);
    return { savedCount, skippedCount };
  } catch (error) {
    console.error('Error saving articles:', error);
    throw error;
  }
}

/**
 * Main function to fetch and save articles
 */
export async function fetchAndSaveArticles() {
  try {
    const newsApiArticles = await fetchArticlesFromNewsAPI();
    const result = await saveArticlesToDatabase(newsApiArticles);
    return result;
  } catch (error) {
    console.error('Error in fetchAndSaveArticles:', error);
    throw error;
  }
}
