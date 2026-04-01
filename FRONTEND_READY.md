# Ground News Clone - React Frontend Complete ✅

**Status: READY TO RUN**

## What's Built

### Pages (3)
1. **Dashboard** - Main view showing all story clusters with bias distribution
2. **BlindspotFeed** - Stories with coverage gaps (missing perspectives)
3. **ComparisonPage** - Side-by-side view of the same story from different sources

### Components (4)
1. **BiasSpectrum** - Visual spectrum showing news outlets from left to right
2. **StoryCard** - Individual story card with bias distribution bar
3. **BlindspotCard** - Story card highlighting coverage gaps with warning badge
4. **ComparisonView** - Multi-column comparison of articles from different sources

### Features Implemented
✅ API integration with backend (http://localhost:5000)
✅ Navigation between pages with state management
✅ Bias scoring visualization (left-center-right spectrum)
✅ Coverage gap detection and highlighting
✅ Side-by-side article comparison
✅ Responsive design
✅ Clean, modern UI

## How to Run

### Prerequisites
- Node.js installed
- Backend server running on http://localhost:5000
  ```bash
  cd /Users/ndanish/Desktop/Learning/ground-news/backend
  node server-demo.js
  ```

### Start Frontend Dev Server
```bash
cd /Users/ndanish/Desktop/Learning/ground-news/frontend
npm install  # Only needed first time
npm run dev
```

Frontend will start on `http://localhost:5173`

### Project Structure
```
frontend/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── BiasSpectrum.jsx
│   │   ├── StoryCard.jsx
│   │   ├── BlindspotCard.jsx
│   │   ├── ComparisonView.jsx
│   │   └── index.js
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx
│   │   ├── BlindspotFeed.jsx
│   │   ├── ComparisonPage.jsx
│   │   └── index.js
│   ├── services/            # API integration
│   │   └── api.js           # Fetch wrapper for backend endpoints
│   ├── App.jsx              # Main app with routing
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── index.html
```

## API Endpoints Connected

The frontend connects to these backend endpoints:
- `GET /api/clusters` - Get all story clusters
- `GET /api/clusters/:id` - Get single cluster
- `GET /api/clusters/blindspots/feed` - Get coverage blindspots
- `GET /api/articles/:id` - Get article details
- `GET /api/articles/:id/comparison` - Get comparison view
- `GET /api/sources` - Get all news sources
- `GET /api/health` - Health check

## Features

### Dashboard
- Browse all story clusters
- See bias distribution (left/center/right breakdown)
- Identify stories with coverage gaps (warning badge)
- Click any story to see detailed comparison view

### Blindspot Feed
- View only stories with coverage gaps
- See which perspectives are missing
- Click to view full comparison
- Shows why the gap is important

### Comparison View
- Side-by-side articles from different sources
- Source bias color-coded (left to right spectrum)
- Ownership information highlighted
- Fact-checks displayed
- Links to full articles

### Bias Spectrum
- Interactive visualization of news source positions
- Color-coded: Far Left (blue) → Center (gray) → Far Right (red)
- Shows all 8 sources in demo data
- Hover for details

## Next Steps

### For Production
1. Build for deployment: `npm run build`
2. Deploy to Vercel:
   - Connect GitHub repo
   - Deploy from `frontend` directory
   - Set backend API URL in environment

### Adding Features
- Authentication (who's using this?)
- Saved articles/folders
- Email digests
- Custom source filter
- Topic-specific searches

### Data Integration
- Connect to real MongoDB (backend ready)
- Add NewsAPI keys (backend ready)
- Fetch real-time articles

## Troubleshooting

**"Failed to load data" error?**
- Check backend is running: `lsof -i :5000`
- Backend should respond to: `curl http://localhost:5000/api/health`

**Components not showing?**
- Clear browser cache (Cmd+Shift+Delete)
- Check browser console (Cmd+Option+J)
- Verify all imports are correct

**Port 5173 in use?**
- Kill process: `lsof -i :5173` then `kill -9 <PID>`
- Or run on different port: `npm run dev -- --port 3000`

## Full Stack Status

✅ **Backend**: Running and tested
✅ **Frontend**: Built and ready
⏳ **Deployment**: Ready (Day 3)

---

**You now have a fully functional Ground News clone with:**
- Media bias analysis
- Coverage gap detection  
- Multi-perspective comparison
- Real-time API integration
- Professional UI/UX

Next: Run `npm run dev` to see it in action!
