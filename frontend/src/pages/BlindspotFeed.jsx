import React, { useState, useEffect } from 'react';
import { BlindspotCard, ComparisonView } from '../components';
import { api } from '../services/api';

export const BlindspotFeed = ({ onBack }) => {
  const [blindspots, setBlindspots] = useState([]);
  const [selectedBlindspot, setSelectedBlindspot] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlindspots = async () => {
      try {
        setLoading(true);
        const data = await api.getBlindspots();
        setBlindspots(data);
      } catch (err) {
        setError('Failed to load blindspots');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBlindspots();
  }, []);

  const handleSelectBlindspot = (blindspot) => {
    setSelectedBlindspot(blindspot);
    // Articles are already populated in blindspot object
    setArticles(blindspot.article_ids || []);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading coverage gaps...</div>
      </div>
    );
  }

  if (selectedBlindspot) {
    return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={() => setSelectedBlindspot(null)}>
          ← Back to Blindspots
        </button>
        <ComparisonView
          articles={articles}
          title={`Coverage Analysis: ${selectedBlindspot.title}`}
        />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>🕵️ Coverage Blindspots</h1>
        <p style={styles.subtitle}>Stories missing key perspectives</p>
      </div>

      {error && <div style={styles.error}>⚠️ {error}</div>}

      <div style={styles.info}>
        <p>
          Below are stories that are covered by only one perspective of the political spectrum.
          These blindspots reveal potential biases and missing viewpoints in news coverage.
        </p>
      </div>

      <div style={styles.blindspotsList}>
        {blindspots.length === 0 ? (
          <div style={styles.noData}>
            ✓ No coverage blindspots detected! The stories are covered from multiple perspectives.
          </div>
        ) : (
          blindspots.map((blindspot) => (
            <BlindspotCard
              key={blindspot._id}
              blindspot={blindspot}
              onClick={() => handleSelectBlindspot(blindspot)}
            />
          ))
        )}
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
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e0e0e0',
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
  title: {
    margin: '0 0 10px 0',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    margin: '0',
    fontSize: '16px',
    color: '#666',
  },
  info: {
    backgroundColor: '#e3f2fd',
    border: '1px solid #bbdefb',
    color: '#01579b',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  blindspotsList: {
    display: 'grid',
    gap: '16px',
  },
  noData: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    color: '#666',
    fontSize: '16px',
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
