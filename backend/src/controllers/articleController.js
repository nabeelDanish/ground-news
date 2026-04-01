import Article from '../models/Article.js';

/**
 * Get single article with details
 */
export async function getArticle(req, res) {
  try {
    const { id } = req.params;

    const article = await Article.findById(id)
      .populate({
        path: 'source_id',
        select: 'name bias_score bias_category ownership logo_url credibility_score',
      })
      .populate('fact_check_ids')
      .populate({
        path: 'cluster_id',
        select: 'headline bias_distribution coverage_gap gap_type',
      });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get article comparison data (other articles in same cluster)
 */
export async function getArticleComparison(req, res) {
  try {
    const { id } = req.params;

    const article = await Article.findById(id)
      .populate('cluster_id')
      .populate({
        path: 'source_id',
        select: 'name bias_score bias_category ownership logo_url',
      });

    if (!article || !article.cluster_id) {
      return res.status(404).json({ error: 'Article or cluster not found' });
    }

    // Get all articles in the same cluster
    const clusterArticles = await Article.find({ cluster_id: article.cluster_id._id })
      .populate({
        path: 'source_id',
        select: 'name bias_score bias_category ownership logo_url credibility_score',
      })
      .populate('fact_check_ids');

    const comparisonData = {
      mainArticle: article,
      clusterHeadline: article.cluster_id.headline,
      allArticles: clusterArticles,
      biasDistribution: article.cluster_id.bias_distribution,
    };

    res.json(comparisonData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Search articles
 */
export async function searchArticles(req, res) {
  try {
    const { q, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const articles = await Article.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ],
    })
      .populate({
        path: 'source_id',
        select: 'name bias_score bias_category logo_url',
      })
      .populate('cluster_id')
      .sort({ published_at: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ],
    });

    res.json({
      articles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get recent articles
 */
export async function getRecentArticles(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 20;

    const articles = await Article.find()
      .populate({
        path: 'source_id',
        select: 'name bias_score bias_category logo_url',
      })
      .sort({ published_at: -1 })
      .limit(limit);

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
