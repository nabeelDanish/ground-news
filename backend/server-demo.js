import express from 'express';
import cors from 'cors';
import { mockStore } from './src/services/mockDataStore.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
}));

// Routes - Clusters
app.get('/api/clusters', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  res.json(mockStore.getAllClusters(page, limit));
});

app.get('/api/clusters/stats/overview', (req, res) => {
  res.json(mockStore.getClusterStats());
});

app.get('/api/clusters/blindspots/feed', (req, res) => {
  const type = req.query.type || 'all';
  res.json(mockStore.getBlindspots(type));
});

app.get('/api/clusters/:id', (req, res) => {
  const cluster = mockStore.getCluster(req.params.id);
  if (!cluster) return res.status(404).json({ error: 'Cluster not found' });
  res.json(cluster);
});

// Routes - Articles
app.get('/api/articles/search', (req, res) => {
  const q = req.query.q || '';
  res.json(mockStore.searchArticles(q));
});

app.get('/api/articles/:id/comparison', (req, res) => {
  const comparison = mockStore.getArticleComparison(req.params.id);
  if (!comparison) return res.status(404).json({ error: 'Article not found' });
  res.json(comparison);
});

app.get('/api/articles/:id', (req, res) => {
  const article = mockStore.getArticle(req.params.id);
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json(article);
});

// Routes - Sources
app.get('/api/sources', (req, res) => {
  res.json(mockStore.getAllSources());
});

app.get('/api/sources/:id', (req, res) => {
  const source = mockStore.getSource(req.params.id);
  if (!source) return res.status(404).json({ error: 'Source not found' });
  res.json(source);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mode: 'demo-local',
    timestamp: new Date(),
    dataPoints: {
      clusters: mockStore.clusters.length,
      articles: mockStore.articles.length,
      sources: mockStore.sources.length,
      blindspots: mockStore.getClusterStats().blindspots.total,
    },
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 Ground News Clone - LOCAL DEMO SERVER');
  console.log('='.repeat(60));
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Mode: LOCAL DEMO (Using in-memory mock data)\n`);

  const stats = mockStore.getClusterStats();
  console.log('📈 Data Summary:');
  console.log(`   • Stories: ${mockStore.clusters.length}`);
  console.log(`   • Articles: ${mockStore.articles.length}`);
  console.log(`   • Sources: ${mockStore.sources.length}`);
  console.log(`   • Blindspots: ${stats.blindspots.total}`);
  console.log(`     └─ Left-only: ${stats.blindspots.leftOnly}`);
  console.log(`     └─ Right-only: ${stats.blindspots.rightOnly}`);

  console.log('\n📡 API Endpoints:');
  console.log('   GET  /api/clusters');
  console.log('   GET  /api/clusters/:id');
  console.log('   GET  /api/clusters/blindspots/feed');
  console.log('   GET  /api/clusters/stats/overview');
  console.log('   GET  /api/articles/:id');
  console.log('   GET  /api/articles/:id/comparison');
  console.log('   GET  /api/articles/search?q=climate');
  console.log('   GET  /api/sources');
  console.log('   GET  /api/sources/:id');
  console.log('   GET  /api/health');

  console.log('\n🧪 Try these URLs:');
  console.log(`   • http://localhost:${PORT}/api/health`);
  console.log(`   • http://localhost:${PORT}/api/clusters`);
  console.log(`   • http://localhost:${PORT}/api/clusters/blindspots/feed`);
  console.log(`   • http://localhost:${PORT}/api/sources`);

  console.log('\n' + '='.repeat(60) + '\n');
});
