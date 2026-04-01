const API_PORT = import.meta.env.VITE_API_PORT || 5000;
const API_BASE = `http://localhost:${API_PORT}/api`;

export const api = {
  // Clusters endpoints
  getClusters: async () => {
    const res = await fetch(`${API_BASE}/clusters`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : data.clusters || data.data || [];
  },

  getCluster: async (id) => {
    const res = await fetch(`${API_BASE}/clusters/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data || data;
  },

  getBlindspots: async () => {
    const res = await fetch(`${API_BASE}/clusters/blindspots/feed`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  },

  // Articles endpoints
  getArticle: async (id) => {
    const res = await fetch(`${API_BASE}/articles/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data || data;
  },

  getArticleComparison: async (clusterId) => {
    const res = await fetch(`${API_BASE}/articles/${clusterId}/comparison`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data || data;
  },

  // Sources endpoints
  getSources: async () => {
    const res = await fetch(`${API_BASE}/sources`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  },

  getSource: async (id) => {
    const res = await fetch(`${API_BASE}/sources/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data || data;
  },

  // Health check
  health: async () => {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },
};
