import express from 'express';
import cors from 'cors';

import clusterRoutes from './routes/clusters.js';
import articleRoutes from './routes/articles.js';
import sourceRoutes from './routes/sources.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}));

// Routes
app.use('/api/clusters', clusterRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/sources', sourceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

export default app;
