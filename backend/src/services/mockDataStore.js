/**
 * Mock Data Store - In-memory database for local development
 * This allows the app to run completely locally without MongoDB or external APIs
 */

export class MockDataStore {
  constructor() {
    this.sources = [
      {
        id: '1',
        name: 'MSNBC',
        url: 'https://www.msnbc.com',
        bias_score: -0.8,
        bias_category: 'Far Left',
        credibility_score: 78,
        logo_url: 'https://via.placeholder.com/100x50?text=MSNBC',
        ownership: {
          parent_company: 'NBCUniversal (Comcast)',
          owner: 'Phil Griffin',
          founded_year: 1996,
        },
      },
      {
        id: '2',
        name: 'CNN',
        url: 'https://www.cnn.com',
        bias_score: -0.35,
        bias_category: 'Left-Center',
        credibility_score: 80,
        logo_url: 'https://via.placeholder.com/100x50?text=CNN',
        ownership: {
          parent_company: 'Warner Bros Discovery',
          owner: 'David Zaslav',
          founded_year: 1980,
        },
      },
      {
        id: '3',
        name: 'BBC News',
        url: 'https://www.bbc.com/news',
        bias_score: 0.0,
        bias_category: 'Center',
        credibility_score: 95,
        logo_url: 'https://via.placeholder.com/100x50?text=BBC',
        ownership: {
          parent_company: 'BBC (British Broadcasting Corporation)',
          owner: 'Public Charter',
          founded_year: 1922,
        },
      },
      {
        id: '4',
        name: 'The Wall Street Journal',
        url: 'https://www.wsj.com',
        bias_score: 0.25,
        bias_category: 'Right-Center',
        credibility_score: 87,
        logo_url: 'https://via.placeholder.com/100x50?text=WSJ',
        ownership: {
          parent_company: 'News Corp',
          owner: 'Rupert Murdoch',
          founded_year: 1889,
        },
      },
      {
        id: '5',
        name: 'Fox News',
        url: 'https://www.foxnews.com',
        bias_score: 0.75,
        bias_category: 'Right',
        credibility_score: 68,
        logo_url: 'https://via.placeholder.com/100x50?text=Fox',
        ownership: {
          parent_company: 'Fox Corporation',
          owner: 'Rupert Murdoch',
          founded_year: 1996,
        },
      },
      {
        id: '6',
        name: 'Reuters',
        url: 'https://www.reuters.com',
        bias_score: 0.05,
        bias_category: 'Center',
        credibility_score: 98,
        logo_url: 'https://via.placeholder.com/100x50?text=Reuters',
        ownership: {
          parent_company: 'Thomson Reuters',
          owner: 'David Thomson',
          founded_year: 1851,
        },
      },
      {
        id: '7',
        name: 'NPR',
        url: 'https://www.npr.org',
        bias_score: -0.15,
        bias_category: 'Left-Center',
        credibility_score: 88,
        logo_url: 'https://via.placeholder.com/100x50?text=NPR',
        ownership: {
          parent_company: 'NPR (Public Broadcasting)',
          owner: 'Non-profit',
          founded_year: 1970,
        },
      },
      {
        id: '8',
        name: 'The Guardian',
        url: 'https://www.theguardian.com',
        bias_score: -0.25,
        bias_category: 'Left-Center',
        credibility_score: 85,
        logo_url: 'https://via.placeholder.com/100x50?text=Guardian',
        ownership: {
          parent_company: 'The Guardian Media Group',
          owner: 'Guardian Holdings Limited',
          founded_year: 1821,
        },
      },
    ];

    this.articles = [
      {
        id: '1',
        title: 'New Climate Report Warns of Accelerating Change',
        description: 'Scientists say climate change is happening faster than expected',
        content: 'A new report from the UN shows that global temperatures are rising faster than previously predicted. The findings are concerning for policymakers worldwide.',
        source_id: '1', // MSNBC (left)
        url: 'https://example.com/climate-msnbc',
        image_url: 'https://via.placeholder.com/400x300?text=Climate+Report',
        published_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: 'Environment',
      },
      {
        id: '2',
        title: 'Climate Crisis Accelerates - Urgent Action Needed',
        description: 'Environmental experts warn of critical tipping points',
        content: 'Environmental advocates are pushing for immediate policy action as climate indicators show alarming trends. The UN warns we have limited time to act.',
        source_id: '3', // BBC (center)
        url: 'https://example.com/climate-bbc',
        image_url: 'https://via.placeholder.com/400x300?text=Climate+Crisis',
        published_at: new Date(Date.now() - 1.8 * 60 * 60 * 1000),
        category: 'Environment',
      },
      {
        id: '3',
        title: 'Economic Data Shows Mixed Signals',
        description: 'Jobs report surprises economists with strong growth',
        content: 'New employment figures released today show unexpected strength in job creation across multiple sectors. Economists debate what this means for inflation.',
        source_id: '4', // WSJ (right-center)
        url: 'https://example.com/economy-wsj',
        image_url: 'https://via.placeholder.com/400x300?text=Economy',
        published_at: new Date(Date.now() - 3 * 60 * 60 * 1000),
        category: 'Economy',
      },
      {
        id: '4',
        title: 'Strong Job Market Continues Despite Rate Hikes',
        description: 'Employment growth remains resilient',
        content: 'The labor market continues to show resilience as employers keep hiring despite Federal Reserve interest rate increases. Unemployment remains near historic lows.',
        source_id: '5', // Fox (right)
        url: 'https://example.com/economy-fox',
        image_url: 'https://via.placeholder.com/400x300?text=Jobs',
        published_at: new Date(Date.now() - 2.8 * 60 * 60 * 1000),
        category: 'Economy',
      },
      {
        id: '5',
        title: 'Healthcare Bill Sparks Major Debate',
        description: 'Partisan divisions widen over medical policy proposal',
        content: 'A proposed healthcare reform bill has sparked intense debate on Capitol Hill with Republicans and Democrats offering competing visions for healthcare access and cost containment.',
        source_id: '2', // CNN (left-center)
        url: 'https://example.com/healthcare-cnn',
        image_url: 'https://via.placeholder.com/400x300?text=Healthcare',
        published_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
        category: 'Healthcare',
      },
      {
        id: '6',
        title: 'Fight for Healthcare Access and Affordability',
        description: 'Patient advocates push for comprehensive medical reform',
        content: 'Patient advocacy groups are calling for sweeping changes to ensure healthcare access for all Americans. They argue current systems leave millions uninsured or underinsured.',
        source_id: '7', // NPR (left-center)
        url: 'https://example.com/healthcare-npr',
        image_url: 'https://via.placeholder.com/400x300?text=Health+Reform',
        published_at: new Date(Date.now() - 3.8 * 60 * 60 * 1000),
        category: 'Healthcare',
      },
      {
        id: '7',
        title: 'Election Year Shaping Up to Be Highly Competitive',
        description: 'Early polling shows extremely close race ahead',
        content: 'As we enter the election year, political analysts predict one of the closest races in recent history. Key battleground states remain highly contested.',
        source_id: '6', // Reuters (center)
        url: 'https://example.com/election-reuters',
        image_url: 'https://via.placeholder.com/400x300?text=Election',
        published_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
        category: 'Politics',
      },
      {
        id: '8',
        title: 'Critical Issues at Stake in Upcoming Election',
        description: 'Voters face major policy choices this cycle',
        content: 'Major policy differences between candidates are becoming clearer as the election cycle intensifies. Economy, healthcare, and climate change are top voter concerns.',
        source_id: '8', // Guardian (left-center)
        url: 'https://example.com/election-guardian',
        image_url: 'https://via.placeholder.com/400x300?text=Vote+2024',
        published_at: new Date(Date.now() - 4.8 * 60 * 60 * 1000),
        category: 'Politics',
      },
    ];

    this.clusters = [];
    this.factChecks = [];

    // Generate clusters from articles
    this.generateClusters();
  }

  generateClusters() {
    // Group articles by story (similar titles)
    const groups = {
      climate: ['1', '2'],
      economy: ['3', '4'],
      healthcare: ['5', '6'],
      election: ['7', '8'],
    };

    Object.entries(groups).forEach(([key, articleIds], index) => {
      const articles = articleIds.map((id) => this.articles.find((a) => a.id === id));
      const clusterId = String(index + 1);

      // Calculate bias distribution
      let left = 0,
        center = 0,
        right = 0;
      articles.forEach((article) => {
        const source = this.sources.find((s) => s.id === article.source_id);
        if (source.bias_score < -0.2) left++;
        else if (source.bias_score > 0.2) right++;
        else center++;
      });

      // Detect blindspot
      const hasCoverage = { left: left > 0, center: center > 0, right: right > 0 };
      let coverage_gap = false;
      let gap_type = null;
      if ((hasCoverage.left || hasCoverage.right) && !hasCoverage.center) {
        coverage_gap = true;
        gap_type = hasCoverage.left ? 'left-only' : 'right-only';
      }

      this.clusters.push({
        id: clusterId,
        headline: articles[0].title,
        description: articles[0].description,
        category: articles[0].category,
        article_ids: articleIds,
        bias_distribution: { left, center, right },
        coverage_gap,
        gap_type,
        createdAt: new Date(),
      });
    });
  }

  // API Methods
  getAllClusters(page = 1, limit = 20) {
    const start = (page - 1) * limit;
    return {
      clusters: this.clusters.slice(start, start + limit),
      pagination: {
        page,
        limit,
        total: this.clusters.length,
        pages: Math.ceil(this.clusters.length / limit),
      },
    };
  }

  getCluster(id) {
    const cluster = this.clusters.find((c) => c.id === id);
    if (!cluster) return null;

    return {
      ...cluster,
      articles: cluster.article_ids.map((aid) => ({
        ...this.articles.find((a) => a.id === aid),
        source: this.sources.find((s) => s.id === this.articles.find((a) => a.id === aid).source_id),
      })),
    };
  }

  getBlindspots(type = 'all') {
    let filtered = this.clusters.filter((c) => c.coverage_gap);
    if (type === 'left-only') filtered = filtered.filter((c) => c.gap_type === 'left-only');
    if (type === 'right-only') filtered = filtered.filter((c) => c.gap_type === 'right-only');

    return {
      blindspots: filtered.map((cluster) => this.getCluster(cluster.id)),
      count: filtered.length,
      type,
    };
  }

  getAllSources() {
    return this.sources.map((source) => ({
      ...source,
      article_count: this.articles.filter((a) => a.source_id === source.id).length,
    }));
  }

  getSource(id) {
    const source = this.sources.find((s) => s.id === id);
    if (!source) return null;

    const recentArticles = this.articles
      .filter((a) => a.source_id === id)
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
      .slice(0, 10);

    return {
      ...source,
      recent_articles: recentArticles,
    };
  }

  getArticle(id) {
    const article = this.articles.find((a) => a.id === id);
    if (!article) return null;

    const cluster = this.clusters.find((c) => c.article_ids.includes(id));

    return {
      ...article,
      source: this.sources.find((s) => s.id === article.source_id),
      cluster: cluster ? { headline: cluster.headline, bias_distribution: cluster.bias_distribution } : null,
      fact_checks: [],
    };
  }

  getArticleComparison(id) {
    const article = this.articles.find((a) => a.id === id);
    if (!article) return null;

    const cluster = this.clusters.find((c) => c.article_ids.includes(id));
    if (!cluster) return null;

    const clusterArticles = cluster.article_ids.map((aid) => ({
      ...this.articles.find((a) => a.id === aid),
      source: this.sources.find((s) => s.id === this.articles.find((a) => a.id === aid).source_id),
    }));

    return {
      mainArticle: { ...article, source: this.sources.find((s) => s.id === article.source_id) },
      clusterHeadline: cluster.headline,
      allArticles: clusterArticles,
      biasDistribution: cluster.bias_distribution,
    };
  }

  searchArticles(q) {
    if (!q) return { articles: [], pagination: { page: 1, limit: 20, total: 0, pages: 0 } };

    const regex = new RegExp(q, 'i');
    const results = this.articles.filter(
      (a) =>
        regex.test(a.title) ||
        regex.test(a.description) ||
        regex.test(a.content)
    );

    return {
      articles: results.map((a) => ({
        ...a,
        source: this.sources.find((s) => s.id === a.source_id),
      })),
      pagination: {
        page: 1,
        limit: 20,
        total: results.length,
        pages: 1,
      },
    };
  }

  getClusterStats() {
    const blindspots = this.clusters.filter((c) => c.coverage_gap);
    const leftOnly = blindspots.filter((c) => c.gap_type === 'left-only');
    const rightOnly = blindspots.filter((c) => c.gap_type === 'right-only');

    return {
      totalClusters: this.clusters.length,
      blindspots: {
        total: blindspots.length,
        leftOnly: leftOnly.length,
        rightOnly: rightOnly.length,
      },
    };
  }
}

export const mockStore = new MockDataStore();
