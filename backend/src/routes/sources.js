import express from 'express';
import {
  getSources,
  getSource,
  getSourcesByBias,
} from '../controllers/sourceController.js';

const router = express.Router();

// Get sources by bias category
router.get('/filter/bias', getSourcesByBias);

// Get all sources
router.get('/', getSources);

// Get single source
router.get('/:id', getSource);

export default router;
