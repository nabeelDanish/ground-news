import express from 'express';
import {
  getClusters,
  getCluster,
  getBlindspots,
  getClusterStats,
} from '../controllers/clusterController.js';

const router = express.Router();

// Get all clusters
router.get('/', getClusters);

// Get cluster statistics
router.get('/stats/overview', getClusterStats);

// Get blindspot stories
router.get('/blindspots/feed', getBlindspots);

// Get single cluster
router.get('/:id', getCluster);

export default router;
