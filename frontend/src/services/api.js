const API_BASE = 'http://localhost:8080/api';

export const api = {
  // Clusters endpoints
  getClusters: async () => {
    const res = await fetch(`${API_BASE}/clusters`);
    return res.json();
  },

  getCluster: async (id) => {
    const res = await fetch(`${API_BASE}/clusters/${id}`);
    return res.json();
  },

  getBlindspots: async () => {
    const res = await fetch(`${API_BASE}/clusters/blindspots/feed`);
    return res.json();
  },

  // Articles endpoints
  getArticle: async (id) => {
    const res = await fetch(`${API_BASE}/articles/${id}`);
    return res.json();
  },

  getArticleComparison: async (clusterId) => {
    const res = await fetch(`${API_BASE}/articles/${clusterId}/comparison`);
    return res.json();
  },

  // Sources endpoints
  getSources: async () => {
    const res = await fetch(`${API_BASE}/sources`);
    return res.json();
  },

  getSource: async (id) => {
    const res = await fetch(`${API_BASE}/sources/${id}`);
    return res.json();
  },

  // Health check
  health: async () => {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },
};
