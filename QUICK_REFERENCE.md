# Ground News Clone - Quick Reference (Revised)
## Focus: Media Bias Analysis & Coverage Blindspots

---

## 📊 Project Summary

| Aspect | Decision |
|--------|----------|
| **Purpose** | Understand media bias & coverage gaps |
| **Target User** | Solo power user (you) |
| **Timeline** | 2-3 days |
| **Tech Stack** | Node/Express + React + MongoDB |
| **Core Features** | Bias ratings + blindspots + comparison |

---

## 🎯 5 Core Features (MVP)

1. **Media Bias Ratings**
   - Each story shows bias spectrum (Left-Center-Right)
   - Color-coded: Red (left) | Gray (center) | Blue (right)
   - Shows count of sources in each category

2. **Blindspot Feed**
   - Identifies stories only covered by LEFT or RIGHT media
   - Highlights coverage gaps
   - Shows which perspective is completely missing

3. **Side-by-Side Comparison**
   - Compare same story from 3+ different outlets
   - See how framing differs
   - Show different headlines + leads
   - Display source ownership for each version

4. **Fact-Check Integration**
   - Link fact-checks to articles
   - Show verdict (True/False/Mostly True, etc)
   - Source: Snopes, FactCheck.org, PolitiFact

5. **Ownership Tracking**
   - Show who owns each media outlet
   - Display parent company + founder/owner
   - Context for understanding bias

---

## 🔨 Tech Stack Specifics

```
Backend:        Node.js + Express
Database:       MongoDB (Atlas free tier)
Frontend:       React 18 + Vite
Data Fetching:  NewsAPI + web scraping
Styling:        Tailwind CSS
Clustering:     string-similarity npm package
Deployment:     Railway (backend) + Vercel (frontend)
```

---

## 📁 Folder Structure

```bash
backend/
├── src/
│   ├── models/
│   │   ├── Article.js
│   │   ├── Cluster.js
│   │   ├── Source.js
│   │   └── FactCheck.js
│   ├── controllers/
│   │   ├── clusterController.js
│   │   ├── articleController.js
│   │   └── sourceController.js
│   ├── services/
│   │   ├── newsApiService.js       # Fetch articles
│   │   ├── clusteringService.js    # Group stories
│   │   ├── blindspotService.js     # Detect gaps
│   │   └── factCheckService.js     # Link fact-checks
│   ├── jobs/
│   │   └── articleFetcher.js       # Scheduled fetches
│   ├── routes/
│   │   ├── clusters.js
│   │   ├── articles.js
│   │   └── sources.js
│   └── app.js
├── server.js
└── package.json

frontend/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx           # Main story grid
│   │   ├── Comparison.jsx          # Side-by-side view
│   │   ├── Blindspots.jsx          # Coverage gap feed
│   │   ├── SourceDirectory.jsx     # All outlets
│   │   └── NotFound.jsx
│   ├── components/
│   │   ├── StoryCard.jsx           # Card with bias spectrum
│   │   ├── BiasSpectrum.jsx        # Visual bar: left|center|right
│   │   ├── SideBySideComparison.jsx# Article comparison
│   │   ├── BlindspotCard.jsx       # Coverage gap highlight
│   │   ├── SourceCard.jsx          # Outlet with ownership
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── services/
│   │   └── api.js                  # API wrapper
│   ├── hooks/
│   │   ├── useClusters.js
│   │   ├── useBlindspots.js
│   │   └── useSources.js
│   └── App.jsx
└── package.json
```

---

## 🌐 API Endpoints

```
Clusters (Stories)
GET  /api/clusters                    # All stories with bias distribution
GET  /api/clusters/:id                # Single story + all articles
GET  /api/clusters/blindspots?type=... # Coverage gap stories

Articles
GET  /api/articles/:id                # Single article + fact-checks + ownership
GET  /api/articles/:id/comparison     # For side-by-side view

Sources
GET  /api/sources                     # All outlets with bias + ownership
GET  /api/sources/:id                 # Single source details

FactChecks
GET  /api/factchecks?articleId=123    # Linked fact-checks
```

---

## 📚 Data Models

### Cluster (Story Group)
```javascript
{
  _id: ObjectId,
  headline: String,                  // Main story headline
  description: String,
  category: String,
  article_ids: [ObjectIds],          // All versions of this story
  
  bias_distribution: {
    left: Number,                    // Count of left-leaning sources
    center: Number,
    right: Number
  },
  
  coverage_gap: Boolean,             // true if coverage is one-sided
  gap_type: String,                  // "left-only", "right-only", null
  
  created_at: Date,
  story_date: Date                   // When story broke
}
```

### Article
```javascript
{
  _id: ObjectId,
  title: String,                     // Headline
  description: String,               // Lead paragraph
  content: String,                   // Full article text
  source_id: ObjectId,               // ref: Sources
  url: String,
  image_url: String,
  published_at: Date,
  cluster_id: ObjectId,              // Which story group
  fact_check_ids: [ObjectIds],       // Linked fact-checks
  word_count: Number
}
```

### Source (News Outlet)
```javascript
{
  _id: ObjectId,
  name: String,                      // "CNN", "Fox News", etc
  url: String,
  logo_url: String,
  
  bias_score: Number,                // -1 (left) to 1 (right), 0 = center
  bias_category: String,             // "Left", "Left-Center", "Center", etc
  credibility_score: Number,         // 0-100
  
  ownership: {
    parent_company: String,          // "Warner Bros Discovery"
    owner: String,                   // Name of owner/CEO
    founded_year: Number,
    description: String
  },
  
  country: String,
  category: [String]                 // ["news", "politics", etc]
}
```

### FactCheck
```javascript
{
  _id: ObjectId,
  article_id: ObjectId,
  claim: String,
  verdict: String,                   // "True", "False", "Mostly True", etc
  source: String,                    // "Snopes", "FactCheck.org", etc
  url: String,
  fact_check_date: Date,
  rating_score: Number               // 0-100
}
```

---

## 🎨 Frontend Pages Summary

### 1. Dashboard (`/`)
- Grid of story clusters (30 per page)
- Each card shows:
  - Headline
  - Bias spectrum bar (visual)
  - Source count: "5 left, 3 center, 2 right"
  - Tag if blindspot (⚠️ LEFT-ONLY)
  - Date
- Click card → go to Comparison page
- Filter: All | Blindspots | Your Topics

### 2. Story Comparison (`/clusters/:id`)
- Main headline + metadata
- Dropdown to select sources (pick 2-3 to compare)
- Side-by-side view:
  ```
  CNN             |    Fox News         |    NYT
  (Left-Center)   |    (Right)          |    (Center)
  "Stocks Rise..."| "Markets React..."  | "Economic Shift..."
  Lead: ...       | Lead: ...           | Lead: ...
  Owner: WB Disc  | Owner: Murdoch      | Owner: Sulzberger
  ```
- Show fact-checks linked to this story
- Highlight framing differences

### 3. Blindspot Feed (`/blindspots`)
- Stories only covered by LEFT or RIGHT media
- Filter: Left-Only | Right-Only | All Gaps
- Each card shows:
  - Story headline
  - Which side only covered it
  - Missing perspective
  - Sources covering: "CNN, MSNBC, Guardian (3 left)"
  - Missing: "No conservative outlets covering this"

### 4. Source Directory (`/sources`)
- Table/grid of all news outlets
- Columns: Name | Bias | Owner | Stories This Week
- Sort by: Name, Bias Score, Owner, Coverage
- Click row → source details

### 5. Not Found / Error Pages
- Graceful error handling
- Helpful messages

---

## 🚀 Core Algorithms

### Article Clustering
```javascript
// Group articles covering same story
// Uses string similarity (TF-IDF approach)
// Threshold: > 0.65 similarity = same cluster
```

### Blindspot Detection
```javascript
// Identify one-sided coverage
if (cluster.left_sources > 0 && cluster.center === 0 && cluster.right === 0) {
  coverage_gap = "left-only"
}
if (cluster.right_sources > 0 && cluster.center === 0 && cluster.left === 0) {
  coverage_gap = "right-only"
}
```

### Bias Distribution
```javascript
// For each cluster, count sources by bias category
left_count = articles.filter(a => a.source.bias_score < -0.2).length
center_count = articles.filter(a => -0.2 <= a.source.bias_score <= 0.2).length
right_count = articles.filter(a => a.source.bias_score > 0.2).length
```

---

## 📊 Data Sources

### News: NewsAPI.org
- **Free Tier**: 100 requests/day, 1 month history
- **Keywords to search**: politics, economy, healthcare, election, climate
- **Target**: 100+ articles from 15+ sources

### Fact-Checks
- **Snopes.com** - Manual scraping or API
- **FactCheck.org** - API available (check docs)
- **PolitiFact.com** - Manual scraping
- **Goal**: 20+ fact-checks linked to articles

### Media Ownership & Bias
- **AllSides Bias Chart** - Scrape for bias + ownership
- **Wikipedia** - Media ownership in US
- **Wikipedia** - News media in US
- **Seed Data**: Manually curate 30+ sources

---

## 🏷️ Bias Scores Reference

```
-1.0 to -0.6   : Far Left         (MSNBC, Salon, etc)
-0.6 to -0.2   : Left-leaning     (CNN, NPR, Guardian)
-0.2 to 0.2    : Center           (BBC, Reuters, AP)
0.2 to 0.6     : Right-leaning    (Wall Street Journal, Reuters)
0.6 to 1.0     : Far Right        (Fox News, National Review)
```

---

## 💾 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ground-news
NEWSAPI_KEY=your_newsapi_key_here
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000
```

### Production
```
VITE_API_URL=https://your-backend-url.com
```

---

## 🎯 Success Criteria

- ✅ 50+ articles clustered into 15+ story groups
- ✅ Bias spectrum working and accurate
- ✅ 5+ blindspot stories identified
- ✅ Side-by-side comparison shows framing differences
- ✅ Source ownership visible on all articles
- ✅ 10+ fact-checks linked
- ✅ Mobile responsive UI
- ✅ All pages deployed and live
- ✅ Can identify stories only left/right media covers

---

## 📱 UI Color Scheme

- **Left-leaning**: `#E74C3C` (Red/Pink) or `#C0392B` 
- **Center**: `#95A5A6` (Gray)
- **Right-leaning**: `#3498DB` (Blue) or `#2980B9`
- **Background**: `#F5F7FA` (Light gray)
- **Text**: `#2C3E50` (Dark gray)
- **Accent**: `#F39C12` (Orange) for blindspots

---

## 📦 npm Packages to Install

### Backend
```bash
npm install express axios dotenv cors mongoose cheerio string-similarity
```

### Frontend
```bash
npm install axios react-router-dom tailwindcss
```

---

## 🚀 Quick Start Commands

### Backend
```bash
mkdir backend && cd backend
npm init -y
npm install express axios dotenv cors mongoose cheerio string-similarity
mkdir -p src/{models,controllers,services,routes,jobs}
touch .env src/app.js server.js
# Update .env with credentials
node server.js
```

### Frontend
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install axios react-router-dom tailwindcss
npm run dev
```

---

## 🐛 Debugging Tips

**Clustering too broad?**
→ Lower similarity threshold from 0.65 to 0.55

**Clustering too narrow?**
→ Raise threshold from 0.65 to 0.75

**No blindspots found?**
→ Check if all articles in cluster are same bias
→ Adjust left/center/right bias boundaries

**API rate limit?**
→ Implement Redis caching (Phase 2)
→ Or use multiple API keys

**Ownership data missing?**
→ Manually fill in seed data for top 20 sources
→ Then expand with scraping

---

## ✅ Daily Checklist

### Day 1 EOD
- [ ] Backend running on localhost:5000
- [ ] 100+ articles in database
- [ ] 15+ clusters created
- [ ] 5+ blindspot stories detected
- [ ] All API endpoints tested
- [ ] Can query `/api/clusters/blindspots`

### Day 2 EOD
- [ ] All 5 pages rendering without errors
- [ ] API calls working from frontend
- [ ] Bias spectrum visualized correctly
- [ ] Side-by-side comparison showing articles
- [ ] Mobile responsive on real phone
- [ ] No console errors

### Day 3 EOD
- [ ] Backend deployed to production
- [ ] Frontend deployed to production
- [ ] Live URL working end-to-end
- [ ] All features functional in production
- [ ] 10+ fact-checks populated
- [ ] Ready to share as portfolio project

---

## 🎓 Learn About

- **String similarity**: How to compare article titles
- **Clustering algorithms**: K-means, hierarchical clustering
- **Media bias**: Left/center/right spectrum
- **Fact-checking**: How to evaluate claims
- **Web scrapers**: Cheerio basics for getting ownership data

---

## 📞 Troubleshooting Matrix

| Problem | Cause | Fix |
|---------|-------|-----|
| CORS error | Frontend/backend mismatch | Add CORS middleware |
| 429 error | API rate limit | Use caching with Redis |
| Empty clusters | Clustering threshold too high | Lower from 0.75 to 0.65 |
| No blindspots | Algorithm not detecting gaps | Debug bias distribution |
| Slow page load | Too many articles rendered | Implement pagination |
| Missing ownership | Data incomplete | Manually seed top 20 |

---

## 🎉 Definition of Done

Your MVP is complete when:
- You can see stories grouped by topic
- Each story shows left/center/right coverage count
- You can spot stories only one side covers
- You can compare headlines side-by-side
- You know who owns each outlet
- You can access it from phone
- You can share a live URL

Now let's build something powerful! 🚀
