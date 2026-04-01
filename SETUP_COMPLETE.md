# Ground News Clone - Quick Start Guide

## 🚀 Running Locally (Everything Configured!)

Your backend is **now running** with local mock data. No external setup needed!

### Status
```
✅ Backend Server: http://localhost:5000
✅ Mode: Local demo (in-memory mock data)
✅ API: All endpoints working
```

---

## 📊 What's Running

### Mock Data Included:
- **4 Story Clusters** (climate, economy, healthcare, politics)
- **8 News Articles** (2 per story from different sources)
- **8 News Sources** (MSNBC → Fox News on bias spectrum)
- **Coverage Gaps Identified** (blindspot analysis)

### Available Story Categories:
1. **Climate** - Left vs Center coverage (Left-only blindspot)
2. **Economy** - Right vs Center coverage (Balanced)
3. **Healthcare** - Left-Center coverage (Balanced)
4. **Politics/Elections** - Center vs Left coverage (Balanced)

---

## 🌐 API Endpoints (Try These!)

### Test the Endpoints:

**1. See all stories:**
```
http://localhost:5000/api/clusters
```
Returns: 4 story clusters with bias distribution

**2. Find coverage blindspots:**
```
http://localhost:5000/api/clusters/blindspots/feed
```
Returns: Stories covered by only left or right media

**3. See one story with all perspectives:**
```
http://localhost:5000/api/clusters/1
```
Returns: Climate story with CNN, BBC, MSNBC, Fox articles

**4. Compare how different outlets frame same story:**
```
http://localhost:5000/api/articles/1/comparison
```
Returns: Side-by-side comparison of headlines

**5. Get all news sources with bias ratings:**
```
http://localhost:5000/api/sources
```
Returns: 8 sources from MSNBC (far left) to Fox (far right)

**6. Search for articles:**
```
http://localhost:5000/api/articles/search?q=climate
```
Returns: Articles matching your keyword

**7. Health check:**
```
http://localhost:5000/api/health
```
Returns: Server status + data statistics

---

## 📁 Open in Browser / Postman

You can now open these directly or use Postman/Insomnia:

### In Browser (just click these):
- [http://localhost:5000/api/health](http://localhost:5000/api/health)
- [http://localhost:5000/api/clusters](http://localhost:5000/api/clusters)
- [http://localhost:5000/api/sources](http://localhost:5000/api/sources)
- [http://localhost:5000/api/clusters/1](http://localhost:5000/api/clusters/1)

### In Terminal (if curl works):
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/clusters
curl http://localhost:5000/api/sources
```

---

## 📋 Data Structure Example

### Story Cluster Response:
```json
{
  "id": "1",
  "headline": "New Climate Report Warns of Accelerating Change",
  "category": "Environment",
  "bias_distribution": {
    "left": 1,
    "center": 1,
    "right": 0
  },
  "coverage_gap": true,
  "gap_type": "right-only",
  "articles": [
    {
      "id": "1",
      "title": "New Climate Report Warns of Accelerating Change",
      "source": {
        "name": "MSNBC",
        "bias_score": -0.8,
        "bias_category": "Far Left",
        "ownership": { "parent_company": "NBCUniversal" }
      }
    }
  ]
}
```

### Source Response:
```json
{
  "id": "1",
  "name": "MSNBC",
  "bias_score": -0.8,
  "bias_category": "Far Left",
  "credibility_score": 78,
  "ownership": {
    "parent_company": "NBCUniversal (Comcast)",
    "owner": "Phil Griffin",
    "founded_year": 1996
  },
  "article_count": 2
}
```

---

## 🎯 Next: Build the Frontend

The backend is ready! Next step is to build the React frontend that displays:
- Dashboard with story clusters
- Bias spectrum visualization (Left-Center-Right bars)
- Blindspot feed highlighting coverage gaps
- Side-by-side article comparison
- Source directory with ownership info

### Ready to start Day 2 frontend? 

Let me know and I'll create the React project!

---

## 🔧 Server Commands

```bash
# Run local demo (current state)
node /Users/ndanish/Desktop/Learning/ground-news/backend/server-demo.js

# Or with npm (from backend folder):
cd /Users/ndanish/Desktop/Learning/ground-news/backend
npm run demo

# Stop server:
# Press Ctrl+C in the terminal
```

---

## ✨ Key Features Working Now

- ✅ **Media Bias Ratings** - Sources rated from -1 (far left) to 1 (far right)
- ✅ **Story Clustering** - Same stories grouped together
- ✅ **Coverage Gap Detection** - Identifies left-only or right-only coverage
- ✅ **Source Ownership** - Parent company + owner visible
- ✅ **Side-by-Side Comparison** - Compare how different outlets frame stories
- ✅ **Search** - Find articles by keyword
- ✅ **API Pagination** - Handle large result sets

---

## 📝 Backend Architecture

```
server-demo.js
├── In-memory mock data store
├── 8 pre-configured news sources
├── 4 story clusters with articles
├── All endpoints working
└── CORS enabled for frontend
```

Everything is self-contained - no external APIs, no database needed! Perfect for local development.

---

## 🚀 You're Ready to Go!

Backend: ✅ Running  
APIs: ✅ Working  
Data: ✅ Loaded  
Frontend: ⏳ Next!

What's next?
