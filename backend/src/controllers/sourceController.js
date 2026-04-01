import Source from '../models/Source.js';
import Article from '../models/Article.js';

/**
 * Get all sources
 */
export async function getSources(req, res) {
  try {
    const sources = await Source.find().sort({ name: 1 });

    // Add article count for each source
    const sourcesWithCounts = await Promise.all(
      sources.map(async (source) => {
        const count = await Article.countDocuments({ source_id: source._id });
        return {
          ...source.toObject(),
          article_count: count,
        };
      })
    );

    res.json(sourcesWithCounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get single source details
 */
export async function getSource(req, res) {
  try {
    const { id } = req.params;

    const source = await Source.findById(id);

    if (!source) {
      return res.status(404).json({ error: 'Source not found' });
    }

    // Get recent articles from this source
    const recentArticles = await Article.find({ source_id: id })
      .sort({ published_at: -1 })
      .limit(10)
      .select('title published_at cluster_id');

    res.json({
      ...source.toObject(),
      recent_articles: recentArticles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get sources by bias category
 */
export async function getSourcesByBias(req, res) {
  try {
    const { category } = req.query;

    let query = {};
    if (category) {
      query.bias_category = category;
    }

    const sources = await Source.find(query).sort({ bias_score: 1 });

    res.json(sources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
