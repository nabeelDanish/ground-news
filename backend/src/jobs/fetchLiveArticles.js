import dotenv from 'dotenv';
import { connectDB, disconnectDB } from '../config/database.js';
import { fetchArticlesFromNewsAPI, saveArticlesToDatabase } from '../services/newsApiService.js';
import { clusterArticles } from '../services/clusteringService.js';

dotenv.config();

async function fetchLiveArticles() {
  try {
    await connectDB();
    
    console.log('🔄 Starting live article fetch...\n');
    
    // Step 1: Fetch articles from NewsAPI
    const articles = await fetchArticlesFromNewsAPI();
    console.log(`\n✅ Fetched ${articles.length} articles\n`);
    
    if (articles.length === 0) {
      console.log('⚠️  No articles fetched');
      await disconnectDB();
      return;
    }
    
    // Step 2: Save to database
    const savedArticles = await saveArticlesToDatabase(articles);
    console.log(`✅ Saved articles to database\n`);
    
    // Step 3: Cluster articles
    const clusters = await clusterArticles();
    console.log(`✅ Created ${clusters.length} article clusters\n`);
    
    console.log('🎉 Live data sync complete!');
    
    await disconnectDB();
  } catch (error) {
    console.error('❌ Error fetching live articles:', error);
    await disconnectDB();
    process.exit(1);
  }
}

fetchLiveArticles();
