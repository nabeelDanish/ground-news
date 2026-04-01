import React, { useState, useEffect } from 'react';
import { ComparisonView } from '../components';
import { api } from '../services/api';

export const ComparisonPage = ({ cluster, onBack }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComparison = async () => {
      try {
        setLoading(true);
        const data = await api.getArticleComparison(cluster._id);
        setArticles(data);
      } catch (err) {
        setError('Failed to load comparison articles');
        console.error(err);
        // Fallback to mock articles from cluster
        setArticles(cluster.articles || []);
      } finally {
        setLoading(false);
      }
    };
    loadComparison();
  }, [cluster._id, cluster.articles]);

  if (loading) {
    return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Dashboard
        </button>
        <div style={styles.loading}>Loading articles...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}>
        ← Back to Dashboard
      </button>
      {error && <div style={styles.error}>⚠️ {error}</div>}
      <ComparisonView articles={articles} title={`Story: ${cluster.title}`} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: '500',
  },
  loading: {
    textAlign: 'center',
    padding: '40px 20px',
    fontSize: '16px',
    color: '#666',
  },
  error: {
    backgroundColor: '#ffebee',
    border: '1px solid #ffcdd2',
    color: '#c62828',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
  },
};
