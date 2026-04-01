# Ground News Clone - Project Requirements & Scope

## Project Overview
A Ground News clone focused on **media bias analysis and story comparison**. Designed for a single power user to discover blindspots in news coverage, compare how different outlets frame stories, and understand media ownership and bias patterns.

**Target**: Solo user (personal use)  
**Timeline**: Weekend sprint (2-3 days)  
**Tech Stack**: Node.js/Express (backend) + React (frontend)  
**Scope**: Phased approach with core bias/comparison features

---

## Phase 1: MVP (Core Functionality) - Days 1-2

### 1.1 Features
- **Media Bias Ratings**: Display stories with source bias spectrum (Left ← Center → Right)
- **Side-by-Side Comparison**: View same story from 3+ different outlets with framing differences
- **Blindspot Feed**: Identify stories covered only by left/right media (coverage gaps)
- **Fact-Check Integration**: Show fact-checks from Snopes, FactCheck.org, etc.
- **Ownership Tracking**: Display who owns each media outlet (parent company, funding)
- **Article Details**: Show full text, compare headlines and leads between sources
- **No Authentication** (solo user mode, optional later)

### 1.2 Data Ingestion
- Fetch articles from external news APIs (NewsAPI, Guardian API, etc.)
- Optional: Web scraping for additional perspectives
- Background job to fetch/update articles daily

### 1.3 Frontend Pages
1. **Dashboard/Home** - Grid view of story clusters with bias spectrum
2. **Story Comparison** - Side-by-side article view from multiple sources
3. **Blindspot Feed** - Stories with coverage gaps (only left/right coverage)
4. **Ownership Directory** - All media outlets with ownership info
5. **Fact-Checks** - Articles with fact-check integrations

---

## Phase 2: Enhanced Features - Future

### 2.1 User Features
- User accounts & saved/bookmarked stories
- Personalized bias preferences (see what stories matter to you)
- Export reports (PDF of unbiased coverage)
- Browser extension to show bias on any news site
- Push notifications for blindspot stories

### 2.2 Data Enhancements
- Real-time article updates (WebSockets)
- ML-based framing detection (detect subtle bias in article text)
- Sentiment analysis on headlines vs. content
- Author tracking (track individual journalists' bias over time)
- Citation network analysis (who quotes who)

### 2.3 Community Features
- User comments highlighting bias/framing issues
- Community fact checks
- Bias ratings from users
- Share curated story comparisons

---

## Technical Architecture

### Backend Structure
```
backend/
├── src/
│   ├── models/          # Database schemas
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic (APIs, scraping, clustering)
│   ├── middleware/      # Auth, error handling
│   ├── routes/          # Express routes
│   ├── jobs/            # Background tasks (article fetching)
│   ├── utils/           # Helpers, constants
│   └── app.js           # Main Express app
├── config/
│   └── database.js      # DB connection
├── .env                 # Environment variables
├── package.json
└── server.js            # Entry point
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # Page components
│   ├── services/        # API calls
│   ├── hooks/           # Custom hooks
│   ├── context/         # React context (global state)
│   ├── styles/          # CSS/styling
│   ├── utils/           # Helpers
│   ├── App.jsx
│   └── index.jsx
├── public/
└── package.json
```

---

## Database Schema (Phase 1)

### Collections/Tables

**Articles**
```javascript
{
  id: ObjectId,
  title: String,
  description: String,
  content: String,
  headline: String (original headline from source),
  source_id: ObjectId (ref: Sources),
  url: String,
  image_url: String,
  published_at: Date,
  fetched_at: Date,
  category: String,
  cluster_id: ObjectId (ref: ArticleClusters),
  fact_checks: [ObjectId] (ref: FactChecks),
  word_count: Number,
  raw_data: Object
}
```

**ArticleClusters**
```javascript
{
  id: ObjectId,
  headline: String (main story headline),
  description: String,
  category: String,
  article_ids: [ObjectId],
  bias_distribution: {
    left: Number,      // count of left-leaning sources
    center: Number,
    right: Number
  },
  coverage_gap: Boolean, // true if only left/right coverage
  gap_type: String,      // "left-only", "right-only", "balanced"
  created_at: Date,
  updated_at: Date,
  story_date: Date
}
```

**Sources**
```javascript
{
  id: ObjectId,
  name: String,
  url: String,
  logo_url: String,
  bias_score: Number (-1 left to 1 right, 0 = center),
  bias_category: String ("Left", "Left-Center", "Center", "Right-Center", "Right"),
  credibility_score: Number (0 to 100),
  country: String,
  category: [String],
  ownership: {
    parent_company: String,
    owner_name: String,
    majority_owner: String,
    founded_year: Number,
    description: String
  }
}
```

**FactChecks**
```javascript
{
  id: ObjectId,
  article_id: ObjectId (ref: Articles),
  claim: String,
  verdict: String ("True", "Mostly True", "False", "Mostly False", "Unproven"),
  source: String ("Snopes", "FactCheck.org", "PolitiFact", etc),
  url: String,
  fact_check_date: Date,
  rating_score: Number (0-100)
}
```

---

## API Endpoints (MVP)

### Story Clusters
- `GET /api/clusters` - Get all story clusters (paginated)
  - Query: `?page=1&limit=20&sort=trending`
- `GET /api/clusters/:id` - Get cluster details with all articles + fact checks
- `GET /api/clusters/blindspots` - Get stories with coverage gaps (left/right only)
  - Query: `?type=left-only|right-only|all`

### Articles
- `GET /api/articles` - Get all articles
  - Query: `?clusterId=123&page=1&limit=20`
- `GET /api/articles/:id` - Get single article with fact checks
- `GET /api/articles/:id/comparison` - Get side-by-side comparison data

### Sources
- `GET /api/sources` - Get all sources with bias/ownership
- `GET /api/sources/:id` - Get source details (ownership, bias history)

### Fact Checks
- `GET /api/factchecks?articleId=123` - Get fact checks for article

### Search
- `GET /api/search?q=keyword` - Search stories/articles

---

## Data Sources

### News APIs
1. **NewsAPI** (https://newsapi.org/)
   - Free tier: 100 req/day, 1 month history
   - Use for: General news aggregation

2. **Guardian API** (https://open-platform.theguardian.com/)
   - Free tier: 300 req/day
   - Use for: UK/international news perspective

### Fact-Checking APIs & Data
1. **Snopes API** - Limited API, mostly web scraping
   - Site: https://www.snopes.com/
   - Use for: Fact-check search & linking

2. **FactCheck.org** - API available
   - Site: https://www.factcheck.org/
   - Use for: Political fact-checks

3. **ClaimBuster** - Research API
   - For: Claim detection in articles

### Media Ownership Data
1. **Curated Lists** (seed data approach)
   - AllSides Media Bias Chart
   - Media Bias Fact Check database
   - Wikipedia list of media ownership

2. **Web Scraping**
   - Scrape AllSides for bias ratings + ownership
   - Use `axios` + `cheerio` for parsing
   - Cache data (ownership changes slowly)

### Optional: Web Scraping
- BBC, Reuters, AP News for additional perspectives
- Use `axios` + `cheerio` or `puppeteer`
- Respect robots.txt and rate limiting

---

## Development Roadmap (Updated)

### Day 1: Backend Core & Data Pipeline
- [ ] Initialize Node.js/Express project
- [ ] Setup MongoDB with collections (Articles, Clusters, Sources, FactChecks)
- [ ] Create source seed data with bias + ownership
- [ ] Integrate NewsAPI for article fetching
- [ ] Implement article clustering logic (group same stories)
- [ ] Build blindspot detection (identify coverage gaps)
- [ ] Create REST API endpoints (clusters, articles, sources)
- [ ] Start fact-check data integration (manual seed for MVP)

### Day 2: Frontend & Visualization
- [ ] Create React project with Vite
- [ ] Build UI components:
  - StoryCard (with bias spectrum)
  - SideBySideComparison (frame different headlines)
  - SourceBadge (bias + ownership info)
  - BlindspotHighlight
- [ ] Implement Dashboard page (story clusters with bias)
- [ ] Implement Story Comparison page (side-by-side view)
- [ ] Implement Blindspot Feed page
- [ ] Connect all pages to backend API
- [ ] Responsive design for mobile

### Day 3: Polish & Deploy
- [ ] Bug fixes & edge case handling
- [ ] Improve article clustering accuracy
- [ ] Add more fact-check data
- [ ] Performance optimization
- [ ] Deploy backend (Railway/Render)
- [ ] Deploy frontend (Vercel/Netlify)

---

## Key Decisions

### 1. Database
- **MongoDB** (recommended for MVP): Flexible schema, easy to start, good for varied API responses
- **PostgreSQL**: More structured, better for strict schema

### 2. Article Clustering
- **MVP**: Simple clustering by title similarity + keywords
- **Future**: ML-based clustering (sklearn, TensorFlow)

### 3. Bias Scores
- **MVP**: Hardcoded source ratings based on research (AllSides, MediaBiasChart)
- **Future**: Community voting system or API integration

### 4. Caching
- Cache API responses to avoid hitting rate limits
- Use Redis in Phase 2

### 5. Real-time Updates
- MVP: Fetch articles on schedule (every 6-12 hours)
- Phase 2: WebSocket updates, push notifications

---

## Success Criteria (MVP)

- ✅ Display 50+ articles clustered by story
- ✅ Show bias spectrum for each story (Left-Center-Right)
- ✅ Identify coverage blindspots (left/right only stories)
- ✅ Side-by-side article comparison (different framing)
- ✅ Source ownership information displayed
- ✅ Fact-checks linked to articles (at least 10+ fact checks)
- ✅ Dashboard showing bias distribution for each story
- ✅ Responsive mobile-friendly UI
- ✅ No bugs blocking core functionality
- ✅ Can identify at least 5 stories with coverage gaps

---

## Deployment Checklist

- [ ] Backend API running on server
- [ ] Database hosted and backed up
- [ ] Frontend deployed with proper API URLs
- [ ] Environment variables configured
- [ ] CORS properly setup
- [ ] Rate limiting implemented
- [ ] Error handling and logging
- [ ] Performance monitoring

---

## Notes

- Focus on MVP first - resist feature creep
- Keep UI simple but clean
- Test with real data from APIs
- Plan for easy migration to Phase 2
- Document API as you build (helps frontend team)
