import express from 'express';
import {
  getArticle,
  getArticleComparison,
  searchArticles,
  getRecentArticles,
} from '../controllers/articleController.js';

const router = express.Router();

// Search articles
router.get('/search', searchArticles);

// Get recent articles
router.get('/recent', getRecentArticles);

// Get article with comparison data
router.get('/:id/comparison', getArticleComparison);

// Get single article
router.get('/:id', getArticle);

export default router;
