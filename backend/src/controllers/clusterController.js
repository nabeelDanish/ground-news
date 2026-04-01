import Cluster from '../models/Cluster.js';
import Article from '../models/Article.js';
import Source from '../models/Source.js';

/**
 * Get all clusters with pagination
 */
export async function getClusters(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const clusters = await Cluster.find()
      .populate({
        path: 'article_ids',
        populate: {
          path: 'source_id',
          select: 'name bias_score bias_category ownership logo_url',
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Cluster.countDocuments();

    res.json({
      clusters,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get single cluster with details
 */
export async function getCluster(req, res) {
  try {
    const { id } = req.params;

    const cluster = await Cluster.findById(id).populate({
      path: 'article_ids',
      populate: [
        {
          path: 'source_id',
          select: 'name bias_score bias_category ownership logo_url credibility_score',
        },
        {
          path: 'fact_check_ids',
          select: 'claim verdict source url',
        },
      ],
    });

    if (!cluster) {
      return res.status(404).json({ error: 'Cluster not found' });
    }

    res.json(cluster);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get blindspot stories (coverage gaps)
 */
export async function getBlindspots(req, res) {
  try {
    const type = req.query.type || 'all';
    let query = { coverage_gap: true };

    if (type === 'left-only') {
      query.gap_type = 'left-only';
    } else if (type === 'right-only') {
      query.gap_type = 'right-only';
    }

    const blindspots = await Cluster.find(query)
      .populate({
        path: 'article_ids',
        populate: {
          path: 'source_id',
          select: 'name bias_score bias_category ownership logo_url',
        },
      })
      .sort({ createdAt: -1 });

    res.json({
      blindspots,
      count: blindspots.length,
      type,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get cluster statistics
 */
export async function getClusterStats(req, res) {
  try {
    const totalClusters = await Cluster.countDocuments();
    const blindspotsCount = await Cluster.countDocuments({ coverage_gap: true });
    const leftOnlyCount = await Cluster.countDocuments({ gap_type: 'left-only' });
    const rightOnlyCount = await Cluster.countDocuments({ gap_type: 'right-only' });

    res.json({
      totalClusters,
      blindspots: {
        total: blindspotsCount,
        leftOnly: leftOnlyCount,
        rightOnly: rightOnlyCount,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
