# Ground News Clone - Revised Roadmap
## Focus: Media Bias Analysis & Coverage Blindspots

---

## Phase Overview

### Phase 1: MVP (2-3 days)
**Core Value**: Understand media bias patterns and coverage gaps

**Deliverable**: 
- Dashboard showing stories with bias distribution
- Blindspot feed (stories only left/right covered)
- Side-by-side article comparison
- Source ownership tracking
- Basic fact-check integration

### Phase 2: Enhanced Analysis (Future)
- ML-based framing detection
- Sentiment analysis on headlines
- Author tracking over time
- Browser extension for bias on any site

### Phase 3: Community & Sharing (Future)
- User accounts & saved comparisons
- Export unbiased reports (PDF)
- Community bias ratings

---

## Day 1: Backend Setup & Data Pipeline

### Morning: Project Initialization
```bash
mkdir backend && cd backend
npm init -y
npm install express axios dotenv cors mongoose cheerio
mkdir -p src/{models,controllers,services,routes,jobs}
touch .env src/app.js server.js
```

**Create Structure:**
- `models/Article.js`, `Cluster.js`, `Source.js`, `FactCheck.js`
- `controllers/clusterController.js`, `articleController.js`
- `services/newsApiService.js`, `clusteringService.js`, `factCheckService.js`
- `routes/clusters.js`, `articles.js`, `sources.js`

### Database & Seeds
**MongoDB Collections Needed:**
1. `sources` - All news outlets with bias + ownership
2. `articles` - News articles from APIs
3. `clusters` - Grouped stories with bias distribution
4. `factchecks` - Linked fact-checks

**Seed Data:**
```javascript
// Seed at least 30 sources with:
// - name, url, logo
// - bias_score (-1 to 1)
// - bias_category ("Left", "Center", "Right")
// - ownership info (parent company, owner)

const sources = [
  {
    name: "CNN",
    bias_score: -0.3,
    bias_category: "Left-Center",
    ownership: { parent_company: "Warner Bros Discovery", owner: "David Zaslav" }
  },
  // ... more sources
];
```

### Article Ingestion
- Fetch from NewsAPI for 5 keywords: ("politics", "economy", "climate", "election", "healthcare")
- Store raw data + metadata
- Target: 100+ articles from 15+ different sources

### Clustering Logic
**Algorithm:**
1. Compare article titles using TF-IDF similarity
2. If similarity > 0.7, add to same cluster
3. Group into `ArticleClusters`
4. Calculate bias distribution per cluster

```javascript
// Pseudo-code
function clusterArticles(articles) {
  const clusters = {};
  
  articles.forEach(article => {
    let foundCluster = false;
    
    Object.values(clusters).forEach(cluster => {
      if (similarity(article.title, cluster.headline) > 0.7) {
        cluster.articles.push(article);
        foundCluster = true;
      }
    });
    
    if (!foundCluster) {
      clusters[article.id] = {
        headline: article.title,
        articles: [article],
        bias_distribution: calculateBiasDistribution([article])
      };
    }
  });
  
  return Object.values(clusters);
}
```

### Blindspot Detection
**Logic:**
- If all articles in cluster are from left-leaning sources → `coverage_gap: "left-only"`
- If all articles in cluster are from right-leaning sources → `coverage_gap: "right-only"`
- Otherwise → `coverage_gap: false`

### API Endpoints (Day 1)
```javascript
// Controllers/clusterController.js

// Get all clusters with bias distribution
GET /api/clusters
  Response: [
    {
      _id: "...",
      headline: "Economy Report Shows Mixed Signals",
      bias_distribution: { left: 5, center: 3, right: 2 },
      coverage_gap: false,
      articles: [article_ids...],
      storyDate: "2026-04-01"
    },
    ...
  ]

// Get blindspot stories only
GET /api/clusters/blindspots?type=left-only
  Response: [clustered stories only from left-leaning sources]

// Get single cluster with all articles
GET /api/clusters/:id
  Response: {
    cluster_data,
    articles: [full article objects with source info + ownership]
  }

// Get all sources with bias + ownership
GET /api/sources
  Response: [
    {
      name: "CNN",
      bias_score: -0.3,
      bias_category: "Left-Center",
      ownership: { parent_company: "...", owner: "..." },
      logo: "..."
    }
  ]

// Get article details
GET /api/articles/:id
  Response: {
    article,
    source: { name, bias, ownership },
    cluster: { headline, other_sources_covering_it },
    factchecks: [array of fact-checks]
  }
```

### Data Fetching Job
Create background job to:
1. Fetch articles from NewsAPI every 12 hours
2. Run clustering algorithm
3. Update database
4. Detect new blindspots

**Deliverable by EOD:**
✅ Backend running on localhost:5000  
✅ 100+ articles in database  
✅ 15+ story clusters created  
✅ At least 3 blindspot stories identified  
✅ All API endpoints tested in Postman

---

## Day 2: Frontend & Visualization

### Frontend Setup
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install axios react-router-dom tailwindcss
mkdir -p src/{pages,components,services,hooks}
```

### Core Components to Build

**1. StoryCard** - Display story with bias spectrum
```jsx
// Shows:
// - Headline
// - Bias distribution (visual bar showing left/center/right)
// - Number of sources covering story
// - Coverage gap tag (if blindspot)
// - Click to expand
```

**2. BiasSpectrum** - Visual representation
```jsx
// Horizontal bar showing:
// - Colors: Red (left) | Gray (center) | Blue (right)
// - Proportional width for each bias category
// - Shows exact count of sources
// Example: [████ Left-5] [██ Center-3] [██ Right-2]
```

**3. SideBySideComparison**
```jsx
// Shows same story from 3+ different sources:
// Source 1                Source 2               Source 3
// [CNN Logo]              [NYT Logo]             [Fox Logo]
// Headline: "Stocks Rise" Headline: "Market..."  Headline: "Economy..."
// Lead text...            Lead text...           Lead text...
// Bias: Left-Center       Bias: Center           Bias: Right
// Owner: Warner Bros      Owner: NYTimes Co      Owner: Rupert Murdoch
//
// Highlights differences in framing/bias
```

**4. BlindspotHighlight**
```jsx
// Special card for coverage gaps:
// ⚠️ BLINDSPOT: Stories only covered by LEFT media
// "Healthcare proposal debate - only 5 left-leaning sources"
// Click to see: Which right-leaning outlets are missing?
```

**5. SourceCard** - Show ownership + bias
```jsx
// CNN
// Bias: Left-Center [-0.3]
// Owner: David Zaslav (Warner Bros Discovery)
// Coverage: 12 stories this week
```

### Pages to Build

**1. Dashboard** (`/`)
```jsx
// Main landing page
// Shows:
// - Title: "Media Bias Dashboard"
// - Filter bar: [All Stories | Blindspots | My Topics]
// - Grid of story cards (30 visible, paginated)
// - Each card shows:
//   - Headline
//   - Bias spectrum visualization
//   - Source count
//   - Publication date
//   - "Compare" button
//
// Clicking card or button → Story Comparison page
```

**2. Story Comparison** (`/clusters/:id`)
```jsx
// Full story analysis
// Shows:
// - Main headline
// - List of all sources covering this story
// - Select 2-3 sources to compare side-by-side
// - Side-by-side view showing:
//   - Different headlines/framing
//   - Lead paragraphs
//   - Article lengths
//   - Source bias info + ownership
// - Fact-checks linked to story (if any)
// - Coverage gap indicator if blindspot
```

**3. Blindspot Feed** (`/blindspots`)
```jsx
// Specialized feed showing coverage gaps
// Filter:
// - [Left-Only] [Right-Only] [All Gaps]
// 
// Shows stories only covered by one side
// Highlights which perspectives are missing
// Example:
// "Election Impact on Healthcare"
// ← Only LEFT: CNN, MSNBC, Guardian (5 sources)
// → MISSING: Fox News, WSJ, Bloomberg perspective
```

**4. Source Directory** (`/sources`)
```jsx
// Table/grid of all news outlets
// Columns:
// - Name/Logo
// - Bias Category (visual)
// - Owner
// - # Stories This Week
// - Click for details
//
// Sort by: Name, Bias, Owner, Coverage
```

### Pages Wireframe Summary
```
Dashboard                Story Comparison        Blindspot Feed
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│ Story Cards: │        │ Headline     │        │ Left-Only    │
│ ┌──────────┐ │        │              │        │ ┌─────────┐  │
│ │Bias Spec │ │        │ Side-by-Side │        │ │Story x5 │  │
│ │########+ │ │        │ ┌─┬─┬─────┐ │        │ │Sources: │  │
│ │Compare   │ │        │ │C│N│Fox..│ │        │ │CNN      │  │
│ └──────────┘ │        │ └─┴─┴─────┘ │        │ │MSNBC    │  │
│              │        │              │        │ │Guardian │  │
│ [Next Page]  │        │ Fact-checks  │        │ │[Missing]│  │
└──────────────┘        │              │        │ │Right: 0 │  │
                        └──────────────┘        │ └─────────┘  │
                                               └──────────────┘
```

### Services Layer
```javascript
// src/services/api.js
const API_BASE = process.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  // Clusters
  getClusters: (page = 1) => 
    fetch(`${API_BASE}/api/clusters?page=${page}`).then(r => r.json()),
  
  getCluster: (id) => 
    fetch(`${API_BASE}/api/clusters/${id}`).then(r => r.json()),
  
  getBlindspots: (type = 'all') => 
    fetch(`${API_BASE}/api/clusters/blindspots?type=${type}`).then(r => r.json()),
  
  // Sources
  getSources: () => 
    fetch(`${API_BASE}/api/sources`).then(r => r.json()),
  
  // Articles
  getArticle: (id) => 
    fetch(`${API_BASE}/api/articles/${id}`).then(r => r.json()),
};
```

### Styling with Tailwind
- Use color coding for bias:
  - Red/Pink for Left-leaning
  - Gray for Center
  - Blue for Right-leaning
- Responsive grid: Mobile (1 col) → Tablet (2 cols) → Desktop (3-4 cols)
- Clean, modern design (like Ground News)

**Deliverable by EOD:**
✅ All pages rendering and connected to API  
✅ Story clustering visible with bias spectrum  
✅ Blindspot feed populated with real data  
✅ Side-by-side comparison working  
✅ Source directory showing ownership  
✅ Mobile responsive  
✅ No console errors

---

## Day 3: Polish, Optimization & Deployment

### Testing & Validation
- [ ] Manual testing of all pages
- [ ] Verify clustering accuracy (spot check clusters)
- [ ] Check mobile responsiveness on real device
- [ ] Test side-by-side comparison for correctness
- [ ] Verify fact-checks are linked properly

### Data Quality
- [ ] Validate 5+ blindspot stories exist
- [ ] Check source data completeness (ownership filled in)
- [ ] Verify bias scores are reasonable
- [ ] Check fact-check data is populated

### Optimization
- [ ] Paginate articles on each page (20 per page)
- [ ] Cache API responses (30 min timeout)
- [ ] Lazy load images
- [ ] Compress assets

### Polish
- [ ] Better error handling (no articles found, API down)
- [ ] Loading states on all pages
- [ ] Empty states (if no blindspots found)
- [ ] Add search by keyword

### Deployment

**Backend (Railway/Render):**
1. Create `railway.json` or similar
2. Set environment variables
3. Deploy database to MongoDB Atlas
4. Deploy backend
5. Test live API

**Frontend (Vercel/Netlify):**
1. Create `.env.production`
2. Set production API URL
3. Deploy frontend
4. Verify all pages work on live domain

**Deliverable:**
✅ Production URL for backend  
✅ Production URL for frontend  
✅ All features working in production  
✅ Shareable portfolio project

---

## Key Metrics to Track

### By End of Day 1:
- Number of articles fetched: 100+
- Number of clusters created: 15+
- Blindspot stories identified: 5+
- API endpoints working: 8/8

### By End of Day 2:
- Pages working: 5/5
- Components rendered: 10+
- API integration: 100%
- Mobile responsive: ✅

### By End of Day 3:
- Production deployed: ✅
- Live users can access: ✅
- All features functioning: ✅
- Bonus: Fact-check coverage: 20+

---

## Technical Deep Dives

### Article Clustering Algorithm
```javascript
// Use string similarity (npm: string-similarity)
import stringSimilarity from 'string-similarity';

const similarity = (str1, str2) => {
  return stringSimilarity.compareTwoStrings(str1, str2);
};

function clusterArticles(articles) {
  const clusters = {};
  const SIMILARITY_THRESHOLD = 0.65;
  
  articles.forEach((article) => {
    let bestMatch = null;
    let bestScore = 0;
    
    // Find best matching cluster
    for (const [clusterId, cluster] of Object.entries(clusters)) {
      const score = similarity(article.title, cluster.headline);
      if (score > bestScore && score > SIMILARITY_THRESHOLD) {
        bestScore = score;
        bestMatch = clusterId;
      }
    }
    
    if (bestMatch) {
      // Add to existing cluster
      clusters[bestMatch].articles.push(article);
      clusters[bestMatch].bias_distribution = calculateBias(
        clusters[bestMatch].articles
      );
    } else {
      // Create new cluster
      clusters[article._id] = {
        headline: article.title,
        articles: [article],
        bias_distribution: calculateBias([article]),
        coverage_gap: detectGap([article])
      };
    }
  });
  
  return Object.values(clusters);
}

function calculateBias(articles) {
  let left = 0, center = 0, right = 0;
  
  articles.forEach(article => {
    const bias = article.source.bias_score;
    if (bias < -0.2) left++;
    else if (bias > 0.2) right++;
    else center++;
  });
  
  return { left, center, right };
}

function detectGap(articles) {
  const dist = calculateBias(articles);
  if (dist.left > 0 && dist.center === 0 && dist.right === 0) return 'left-only';
  if (dist.right > 0 && dist.center === 0 && dist.left === 0) return 'right-only';
  return false;
}
```

### Feature Comparison
Show subtle differences in framing between articles on same story:

```javascript
// Compare two articles' headlines + leads
function compareArticles(article1, article2) {
  return {
    headline1: article1.title,
    headline2: article2.title,
    lead1: article1.description,
    lead2: article2.description,
    bias1: article1.source.bias_score,
    bias2: article2.source.bias_score,
    wordCount1: article1.content?.split(' ').length,
    wordCount2: article2.content?.split(' ').length,
    // Highlight differences: tone, emphasis, key facts included
  };
}
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Clustering too broad | Lower similarity threshold |
| Clustering too narrow | Raise similarity threshold |
| No blindspots found | Adjust bias thresholds |
| API rate limit hit | Implement caching |
| Ownership data incomplete | Use seed data + web scraping |
| Fact-checks missing | Seed manually first |

---

## Resources

### Libraries Already Chosen
- `string-similarity` - For article clustering
- `axios` - HTTP requests
- `mongoose` - MongoDB ORM
- `cheerio` - Web scraping (if needed)
- `Tailwind CSS` - Frontend styling
- `React Router` - URL routing

### Fact-Check Data Sources
- Snopes.com - Manual search/scraping
- FactCheck.org - API available
- PolitiFact.com - Manual search
- Mannying.org - Academic fact-checks

### Media Ownership Resources
- [AllSides Media Bias Chart](https://www.allsides.com/)
- [Media Ownership by WikiProjec News and Media](https://en.wikipedia.org/wiki/Media_ownership_in_the_United_States)
- [Who Owns the Media](https://www.businessinsider.com/who-owns-the-media-6-corporations-control-90-of-the-news)

---

## Success Checklist (MVP Complete)

- ✅ Dashboard showing 30+ story clusters
- ✅ Bias spectrum visualization working
- ✅ 5+ blindspot stories identified and displayed
- ✅ Side-by-side comparison page functional
- ✅ Source ownership shown on all articles
- ✅ Mobile responsive on iPhone/iPad
- ✅ At least 10 fact-checks linked to articles
- ✅ Backend & frontend deployed and live
- ✅ Can identify at least 3 stories only covered by one side

Let's build a powerful media bias analysis tool! 🚀
