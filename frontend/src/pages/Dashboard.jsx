import React, { useState, useEffect } from 'react';
import { StoryCard, BiasSpectrum } from '../components';
import { api } from '../services/api';

export const Dashboard = ({ onSelectStory }) => {
  const [clusters, setClusters] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [clustersData, sourcesData] = await Promise.all([
          api.getClusters(),
          api.getSources(),
        ]);
        setClusters(clustersData);
        setSources(sourcesData);
      } catch (err) {
        setError('Failed to load data. Make sure the backend is running on http://localhost:5000');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading stories...</div>;
  }

  if (error) {
    return <div style={styles.error}>⚠️ {error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📰 Ground News Clone</h1>
        <p style={styles.subtitle}>Understand media bias and coverage gaps</p>
      </div>

      {sources.length > 0 && <BiasSpectrum sources={sources} />}

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          📍 Top Stories ({clusters.length})
        </h2>
        <div style={styles.storiesList}>
          {clusters.map((cluster) => (
            <StoryCard
              key={cluster._id}
              cluster={cluster}
              onClick={() => onSelectStory(cluster)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e0e0e0',
  },
  title: {
    margin: 0,
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    margin: '10px 0 0 0',
    fontSize: '16px',
    color: '#666',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  storiesList: {
    display: 'grid',
    gap: '16px',
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
    margin: '20px',
    fontSize: '14px',
  },
};
