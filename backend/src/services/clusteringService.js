import stringSimilarity from 'string-similarity';
import Article from '../models/Article.js';
import Cluster from '../models/Cluster.js';
import Source from '../models/Source.js';

const SIMILARITY_THRESHOLD = 0.65;

/**
 * Calculate string similarity between two titles
 */
function calculateSimilarity(str1, str2) {
  return stringSimilarity.compareTwoStrings(str1.toLowerCase(), str2.toLowerCase());
}

/**
 * Calculate bias distribution for a cluster
 */
export async function calculateBiasDistribution(articleIds) {
  const articles = await Article.find({ _id: { $in: articleIds } }).populate('source_id');

  let left = 0,
    center = 0,
    right = 0;

  articles.forEach((article) => {
    const bias = article.source_id.bias_score;
    if (bias < -0.2) left++;
    else if (bias > 0.2) right++;
    else center++;
  });

  return { left, center, right };
}

/**
 * Detect if a cluster has a coverage gap (one-sided bias)
 */
export function detectCoverageGap(biasDistribution) {
  const { left, center, right } = biasDistribution;

  // Left-only coverage
  if (left > 0 && center === 0 && right === 0) {
    return { coverage_gap: true, gap_type: 'left-only' };
  }

  // Right-only coverage
  if (right > 0 && center === 0 && left === 0) {
    return { coverage_gap: true, gap_type: 'right-only' };
  }

  // Balanced or no gap
  return { coverage_gap: false, gap_type: null };
}

/**
 * Cluster articles by title similarity
 */
export async function clusterArticles() {
  try {
    console.log('Starting article clustering...');

    // Get all unclustered articles
    const unclusteredArticles = await Article.find({ cluster_id: null }).populate('source_id');

    if (unclusteredArticles.length === 0) {
      console.log('No unclustered articles found');
      return;
    }

    console.log(`Found ${unclusteredArticles.length} articles to cluster`);

    // Clear existing clusters
    await Cluster.deleteMany({});

    const clusteredIds = new Set();
    const clusters = [];

    // Process each article
    for (const article of unclusteredArticles) {
      if (clusteredIds.has(article._id.toString())) continue;

      const clusterArticles = [article];
      clusteredIds.add(article._id.toString());

      // Find similar articles
      for (const otherArticle of unclusteredArticles) {
        if (clusteredIds.has(otherArticle._id.toString())) continue;

        const similarity = calculateSimilarity(article.title, otherArticle.title);

        if (similarity > SIMILARITY_THRESHOLD) {
          clusterArticles.push(otherArticle);
          clusteredIds.add(otherArticle._id.toString());
        }
      }

      // Create cluster
      const articleIds = clusterArticles.map((a) => a._id);
      const biasDistribution = await calculateBiasDistribution(articleIds);
      const { coverage_gap, gap_type } = detectCoverageGap(biasDistribution);

      const cluster = new Cluster({
        headline: article.title,
        description: article.description,
        category: article.category,
        article_ids: articleIds,
        bias_distribution: biasDistribution,
        coverage_gap,
        gap_type,
      });

      clusters.push(cluster);

      // Update articles with cluster_id
      await Article.updateMany({ _id: { $in: articleIds } }, { cluster_id: cluster._id });
    }

    // Save all clusters
    await Cluster.insertMany(clusters);

    console.log(`Created ${clusters.length} clusters`);

    // Log blindspot statistics
    const blindspots = clusters.filter((c) => c.coverage_gap);
    console.log(`Found ${blindspots.length} blindspot stories (one-sided coverage)`);

    return clusters;
  } catch (error) {
    console.error('Error clustering articles:', error);
    throw error;
  }
}

/**
 * Add a new article and recluster if needed
 */
export async function addArticleAndCluster(articleData) {
  try {
    // Create article
    const article = new Article(articleData);
    await article.save();

    // Check if it should be added to existing cluster
    const existingClusters = await Cluster.find();

    for (const cluster of existingClusters) {
      const similarity = calculateSimilarity(article.title, cluster.headline);

      if (similarity > SIMILARITY_THRESHOLD) {
        // Add article to cluster
        cluster.article_ids.push(article._id);
        cluster.bias_distribution = await calculateBiasDistribution(cluster.article_ids);
        const { coverage_gap, gap_type } = detectCoverageGap(cluster.bias_distribution);
        cluster.coverage_gap = coverage_gap;
        cluster.gap_type = gap_type;
        await cluster.save();

        // Update article
        article.cluster_id = cluster._id;
        await article.save();

        return { article, cluster };
      }
    }

    // Create new cluster if no match found
    const biasDistribution = await calculateBiasDistribution([article._id]);
    const { coverage_gap, gap_type } = detectCoverageGap(biasDistribution);

    const newCluster = new Cluster({
      headline: article.title,
      description: article.description,
      category: article.category,
      article_ids: [article._id],
      bias_distribution: biasDistribution,
      coverage_gap,
      gap_type,
    });

    await newCluster.save();

    article.cluster_id = newCluster._id;
    await article.save();

    return { article, cluster: newCluster };
  } catch (error) {
    console.error('Error adding article:', error);
    throw error;
  }
}
