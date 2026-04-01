import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import Source from '../models/Source.js';
import Article from '../models/Article.js';
import Cluster from '../models/Cluster.js';

dotenv.config();

// Sample articles pre-populated for demo
const sampleArticles = [
  {
    title: 'New Climate Report Warns of Accelerating Change',
    description: 'Scientists say climate change is happening faster than expected',
    content: 'A new report from the UN shows that global temperatures are rising faster than previously predicted...',
    url: 'https://example.com/climate-1',
    image_url: 'https://via.placeholder.com/400x300?text=Climate',
    published_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    category: 'Environment',
  },
  {
    title: 'Climate Crisis Accelerates - Urgent Action Needed',
    description: 'Environmental experts warn of critical tipping points',
    content: 'Environmental advocates are pushing for immediate policy action as climate indicators show alarming trends...',
    url: 'https://example.com/climate-2',
    image_url: 'https://via.placeholder.com/400x300?text=Climate',
    published_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
    category: 'Environment',
  },
  {
    title: 'Economic Data Shows Mixed Signals',
    description: 'Jobs report surprises economists',
    content: 'New employment figures released today show unexpected strength in job creation...',
    url: 'https://example.com/economy-1',
    image_url: 'https://via.placeholder.com/400x300?text=Economy',
    published_at: new Date(Date.now() - 3 * 60 * 60 * 1000),
    category: 'Economy',
  },
  {
    title: 'Jobs Market Remains Strong Despite Rate Hikes',
    description: 'Employment growth continues amid Fed tightening',
    content: 'The labor market continues to show resilience as employers keep hiring...',
    url: 'https://example.com/economy-2',
    image_url: 'https://via.placeholder.com/400x300?text=Economy',
    published_at: new Date(Date.now() - 2.8 * 60 * 60 * 1000),
    category: 'Economy',
  },
  {
    title: 'Healthcare Bill Debate Heats Up in Congress',
    description: 'Republicans and Democrats clash over medical policy',
    content: 'A proposed healthcare reform bill has sparked intense debate on Capitol Hill...',
    url: 'https://example.com/healthcare-1',
    image_url: 'https://via.placeholder.com/400x300?text=Healthcare',
    published_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
    category: 'Healthcare',
  },
  {
    title: 'Major Push for Healthcare Access Expansion',
    description: 'Advocates call for comprehensive medical coverage reform',
    content: 'Patient advocacy groups are calling for sweeping changes to ensure healthcare access for all...',
    url: 'https://example.com/healthcare-2',
    image_url: 'https://via.placeholder.com/400x300?text=Healthcare',
    published_at: new Date(Date.now() - 3.8 * 60 * 60 * 1000),
    category: 'Healthcare',
  },
  {
    title: 'Election Year 2024 Shaping Up to Be Highly Competitive',
    description: 'Early polling shows tight race',
    content: 'As we enter the election year, political analysts are predicting one of the closest races in recent history...',
    url: 'https://example.com/election-1',
    image_url: 'https://via.placeholder.com/400x300?text=Election',
    published_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
    category: 'Politics',
  },
  {
    title: 'Voters Face Critical Choices in Upcoming Election',
    description: 'Major issues at stake in 2024 race',
    content: 'Key policy differences between candidates are becoming clearer as the election cycle intensifies...',
    url: 'https://example.com/election-2',
    image_url: 'https://via.placeholder.com/400x300?text=Election',
    published_at: new Date(Date.now() - 4.8 * 60 * 60 * 1000),
    category: 'Politics',
  },
];

async function seedLocalDatabase() {
  try {
    // Note: For local development without MongoDB, this will show helpful messages
    console.log('\n📋 LOCAL DEVELOPMENT SEED DATA\n');
    console.log('===============================================');

    // Show sources that would be created
    const sources = await Source.find().catch(() => null);
    if (sources && sources.length > 0) {
      console.log(`✅ Found ${sources.length} sources in database`);
    } else {
      console.log('⚠️  MongoDB not connected - running in demo mode');
      console.log('\n📰 SAMPLE ARTICLES THAT WOULD BE CREATED:');
      sampleArticles.forEach((article, i) => {
        console.log(`\n${i + 1}. "${article.title}"`);
        console.log(`   Category: ${article.category}`);
        console.log(`   URL: ${article.url}`);
      });
    }

    console.log('\n===============================================');
    console.log('\n🚀 To run the full app:');
    console.log('1. Start MongoDB locally:');
    console.log('   brew install mongodb-community');
    console.log('   brew services start mongodb-community');
    console.log('\n2. OR use MongoDB Atlas:');
    console.log('   Update MONGODB_URI in .env with your connection string');
    console.log('   Get key from: https://www.mongodb.com/cloud/atlas');
    console.log('\n3. Get NewsAPI key from: https://newsapi.org');
    console.log('\n4. Update .env with real credentials');
    console.log('\n5. Run: npm run dev\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

seedLocalDatabase();
