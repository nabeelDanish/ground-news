# Ground News Clone - Backend

Media bias analysis news aggregation backend built with Node.js, Express, and MongoDB.

## Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free: mongodb.com/cloud/atlas)
- NewsAPI key (free: newsapi.org)

### 2. Setup Environment
```bash
cd backend
cp .env.example .env
```

Then edit `.env` with your credentials:
- `MONGODB_URI` - Your MongoDB connection string
- `NEWSAPI_KEY` - Your NewsAPI key

### 3. Seed Database with News Sources
```bash
npm run seed
```

This populates MongoDB with 18 pre-configured news sources (MSNBC to Breitbart) organized by political bias.

### 4. Start Development Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Story Clusters
- `GET /api/clusters` - Get all story clusters with bias distribution
- `GET /api/clusters/:id` - Get single cluster with all articles
- `GET /api/clusters/blindspots/feed?type=left-only|right-only|all` - Get coverage gaps
- `GET /api/clusters/stats/overview` - Cluster statistics

### Articles
- `GET /api/articles/:id` - Get article with source info & fact-checks
- `GET /api/articles/:id/comparison` - Get side-by-side comparison data
- `GET /api/articles/search?q=keyword` - Search articles
- `GET /api/articles/recent?limit=20` - Get recent articles

### News Sources
- `GET /api/sources` - Get all sources with bias ratings & ownership
- `GET /api/sources/:id` - Get source details
- `GET /api/sources/filter/bias?category=Left` - Filter by bias category

### Health
- `GET /api/health` - Health check

## Data Models

### Article
```javascript
{
  title: String,
  description: String,
  content: String,
  source_id: ObjectId,   // Reference to Source
  cluster_id: ObjectId,  // Reference to Cluster
  url: String,
  published_at: Date,
  fact_check_ids: [ObjectId]  // References to FactCheck
}
```

### Cluster
```javascript
{
  headline: String,
  article_ids: [ObjectId],
  bias_distribution: {
    left: Number,
    center: Number,
    right: Number
  },
  coverage_gap: Boolean,  // true if left-only or right-only
  gap_type: String        // "left-only", "right-only", or null
}
```

### Source
```javascript
{
  name: String,
  bias_score: Number,     // -1 (left) to 1 (right)
  bias_category: String,  // "Left", "Center", "Right", etc
  ownership: {
    parent_company: String,
    owner: String,
    founded_year: Number
  }
}
```

### FactCheck
```javascript
{
  article_id: ObjectId,
  claim: String,
  verdict: String,  // "True", "Mostly True", "False", etc
  source: String,   // "Snopes", "FactCheck.org", etc
  url: String
}
```

## Features

### ✅ Implemented
- [x] Full REST API with all endpoints
- [x] MongoDB integration
- [x] Article clustering (string similarity algorithm)
- [x] Blindspot detection (coverage gap identification)
- [x] Bias distribution calculation
- [x] 18 pre-configured news sources
- [x] Source ownership tracking
- [x] CORS support

### 🚀 Next Steps
- [ ] Fetch articles from NewsAPI
- [ ] Run clustering algorithm
- [ ] Identify blindspot stories
- [ ] Build React frontend
- [ ] Deploy to production

## Development

### npm Scripts
```bash
npm start   # Run production server
npm run dev # Run with auto-reload (--watch)
npm run seed # Populate sources database
```

### Project Structure
```
backend/
├── config/
│   └── database.js         # MongoDB connection
├── src/
│   ├── models/             # Mongoose schemas
│   ├── controllers/        # Route handlers
│   ├── services/           # Business logic
│   ├── routes/             # API routes
│   ├── jobs/               # Tasks (seeding, fetching)
│   └── app.js              # Express app
├── server.js               # Entry point
├── package.json
├── .env.example
└── .gitignore
```

## Key Algorithms

### Article Clustering
Groups articles covering the same story using string similarity:
- Compares article titles with TF-IDF similarity
- Threshold: 0.65 = same cluster
- Updates bias distribution for each cluster

### Blindspot Detection
Identifies stories with one-sided coverage:
```javascript
if (all_sources_are_left) → "left-only" blindspot
if (all_sources_are_right) → "right-only" blindspot
else → balanced coverage
```

### Bias Calculation
Categorizes news sources on spectrum:
```
-1.0 to -0.6  → Far Left (MSNBC, Salon)
-0.6 to -0.2  → Left (CNN, NPR, Guardian)
-0.2 to 0.2   → Center (BBC, Reuters, AP)
0.2 to 0.6    → Right (WSJ, Economist)
0.6 to 1.0    → Far Right (Fox, Breitbart)
```

## Troubleshooting

### MongoDB Connection Error
- Check connection string in .env
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### NewsAPI Rate Limit
- Free tier: 100 requests/day
- Implement caching for production
- Consider upgrading for higher limits

### Clustering Not Grouping Articles
- Lower similarity threshold from 0.65 to 0.55
- Check article titles are similar enough
- Verify source assignment is correct

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [NewsAPI Documentation](https://newsapi.org/docs)
- [Mongoose ODM](https://mongoosejs.com/)

## License

MIT
