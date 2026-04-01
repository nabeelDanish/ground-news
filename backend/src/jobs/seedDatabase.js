import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import Source from '../models/Source.js';
import FactCheck from '../models/FactCheck.js';

dotenv.config();

const sources = [
  // Far Left
  {
    name: 'MSNBC',
    url: 'https://www.msnbc.com',
    bias_score: -0.8,
    bias_category: 'Far Left',
    credibility_score: 78,
    ownership: {
      parent_company: 'NBCUniversal (Comcast)',
      owner: 'Phil Griffin',
      founded_year: 1996,
      description: 'Cable news network with strong liberal editorial voice',
    },
  },
  {
    name: 'Salon',
    url: 'https://www.salon.com',
    bias_score: -0.85,
    bias_category: 'Far Left',
    credibility_score: 62,
    ownership: {
      parent_company: 'Salon, Inc.',
      owner: 'Various shareholders',
      founded_year: 1995,
      description: 'Online news site with progressive political focus',
    },
  },
  {
    name: 'Buzzfeed News',
    url: 'https://www.buzzfeednews.com',
    bias_score: -0.6,
    bias_category: 'Left',
    credibility_score: 70,
    ownership: {
      parent_company: 'BuzzFeed, Inc.',
      owner: 'Jonah Peretti',
      founded_year: 2011,
      description: 'Digital media company with investigative reporting',
    },
  },

  // Left-Center
  {
    name: 'CNN',
    url: 'https://www.cnn.com',
    bias_score: -0.35,
    bias_category: 'Left-Center',
    credibility_score: 80,
    ownership: {
      parent_company: 'Warner Bros Discovery',
      owner: 'David Zaslav',
      founded_year: 1980,
      description: 'Major cable news network',
    },
  },
  {
    name: 'The Guardian',
    url: 'https://www.theguardian.com',
    bias_score: -0.25,
    bias_category: 'Left-Center',
    credibility_score: 85,
    ownership: {
      parent_company: 'The Guardian Media Group',
      owner: 'Guardian Holdings Limited',
      founded_year: 1821,
      description: 'Major UK newspaper known for investigative journalism',
    },
  },
  {
    name: 'NPR',
    url: 'https://www.npr.org',
    bias_score: -0.15,
    bias_category: 'Left-Center',
    credibility_score: 88,
    ownership: {
      parent_company: 'NPR (Public Broadcasting)',
      owner: 'Non-profit',
      founded_year: 1970,
      description: 'Public radio network with balanced reporting',
    },
  },
  {
    name: 'The New York Times',
    url: 'https://www.nytimes.com',
    bias_score: -0.2,
    bias_category: 'Left-Center',
    credibility_score: 88,
    ownership: {
      parent_company: 'The New York Times Company',
      owner: 'A.G. Sulzberger',
      founded_year: 1851,
      description: 'Major national newspaper with strong editorial presence',
    },
  },

  // Center
  {
    name: 'BBC News',
    url: 'https://www.bbc.com/news',
    bias_score: 0.0,
    bias_category: 'Center',
    credibility_score: 95,
    ownership: {
      parent_company: 'BBC (British Broadcasting Corporation)',
      owner: 'Public Charter',
      founded_year: 1922,
      description: 'State broadcaster with strict editorial standards',
    },
  },
  {
    name: 'Reuters',
    url: 'https://www.reuters.com',
    bias_score: 0.05,
    bias_category: 'Center',
    credibility_score: 98,
    ownership: {
      parent_company: 'Thomson Reuters',
      owner: 'David Thomson',
      founded_year: 1851,
      description: 'Major news agency known for factual reporting',
    },
  },
  {
    name: 'Associated Press',
    url: 'https://www.ap.org',
    bias_score: 0.0,
    bias_category: 'Center',
    credibility_score: 96,
    ownership: {
      parent_company: 'The Associated Press (Cooperative)',
      owner: 'Member-owned cooperative',
      founded_year: 1846,
      description: 'Oldest news agency in the US',
    },
  },

  // Right-Center
  {
    name: 'The Wall Street Journal',
    url: 'https://www.wsj.com',
    bias_score: 0.25,
    bias_category: 'Right-Center',
    credibility_score: 87,
    ownership: {
      parent_company: 'News Corp',
      owner: 'Rupert Murdoch',
      founded_year: 1889,
      description: 'Major newspaper with business focus',
    },
  },
  {
    name: 'Bloomberg',
    url: 'https://www.bloomberg.com',
    bias_score: 0.2,
    bias_category: 'Right-Center',
    credibility_score: 85,
    ownership: {
      parent_company: 'Bloomberg LP',
      owner: 'Michael Bloomberg',
      founded_year: 1981,
      description: 'Financial and business news provider',
    },
  },
  {
    name: 'The Economist',
    url: 'https://www.economist.com',
    bias_score: 0.15,
    bias_category: 'Right-Center',
    credibility_score: 90,
    ownership: {
      parent_company: 'The Economist Group',
      owner: 'Pearson PLC',
      founded_year: 1843,
      description: 'Magazine with centrist-right economic focus',
    },
  },

  // Right
  {
    name: 'Fox News',
    url: 'https://www.foxnews.com',
    bias_score: 0.75,
    bias_category: 'Right',
    credibility_score: 68,
    ownership: {
      parent_company: 'Fox Corporation',
      owner: 'Rupert Murdoch',
      founded_year: 1996,
      description: 'Cable news network with conservative editorial voice',
    },
  },
  {
    name: 'The National Review',
    url: 'https://www.nationalreview.com',
    bias_score: 0.7,
    bias_category: 'Right',
    credibility_score: 72,
    ownership: {
      parent_company: 'National Review LLC',
      owner: 'Various',
      founded_year: 1955,
      description: 'Conservative opinion and news magazine',
    },
  },
  {
    name: 'Breitbart',
    url: 'https://www.breitbart.com',
    bias_score: 0.85,
    bias_category: 'Far Right',
    credibility_score: 45,
    ownership: {
      parent_company: 'Breitbart News Network',
      owner: 'Larry Solov',
      founded_year: 2010,
      description: 'Far-right news website',
    },
  },
  {
    name: 'The Washington Post',
    url: 'https://www.washingtonpost.com',
    bias_score: -0.2,
    bias_category: 'Left-Center',
    credibility_score: 85,
    ownership: {
      parent_company: 'Nash Holdings LLC',
      owner: 'Jeff Bezos',
      founded_year: 1877,
      description: 'Major national newspaper',
    },
  },
  {
    name: 'USA Today',
    url: 'https://www.usatoday.com',
    bias_score: 0.0,
    bias_category: 'Center',
    credibility_score: 75,
    ownership: {
      parent_company: 'Gannett Co., Inc.',
      owner: 'Various shareholders',
      founded_year: 1982,
      description: 'Largest newspaper by circulation in the US',
    },
  },
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to database');

    // Clear existing sources
    await Source.deleteMany({});
    console.log('Cleared existing sources');

    // Insert sources
    const createdSources = await Source.insertMany(sources);
    console.log(`✅ Created ${createdSources.length} sources`);

    // Create sample fact-checks (these will be linked to articles later)
    const sampleFactChecks = [
      {
        claim: 'Climate change is primarily caused by human activity',
        verdict: 'True',
        source: 'FactCheck.org',
        url: 'https://example.com/factcheck/climate-1',
      },
      {
        claim: 'The economy added 300,000 jobs last month',
        verdict: 'Mostly True',
        source: 'PolitiFact',
        url: 'https://example.com/factcheck/jobs-1',
      },
    ];

    console.log('\n📰 Sources created:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const byBias = {};
    createdSources.forEach((source) => {
      const category = source.bias_category;
      if (!byBias[category]) byBias[category] = [];
      byBias[category].push(source.name);
    });

    Object.entries(byBias).forEach(([category, names]) => {
      console.log(`\n${category}:`);
      names.forEach((name) => console.log(`  • ${name}`));
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✅ Database seeding complete!');
    console.log('\nNext steps:');
    console.log('1. Setup .env file with NEWSAPI_KEY');
    console.log('2. Run: npm run dev');
    console.log('3. Fetch articles: curl http://localhost:5000/api/health');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
