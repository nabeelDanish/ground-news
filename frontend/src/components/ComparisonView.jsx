import React from 'react';

export const ComparisonView = ({ articles, title }) => {
  if (!articles || articles.length === 0) {
    return <div style={styles.noData}>No articles available for comparison</div>;
  }

  const getBiasLabel = (source) => {
    if (!source) return 'Unknown';
    const score = source.bias_score || 0;
    if (score < -0.6) return 'Far Left';
    if (score < -0.3) return 'Left';
    if (score < 0.3) return 'Center';
    if (score < 0.6) return 'Right';
    return 'Far Right';
  };

  const getBiasColor = (source) => {
    if (!source) return '#999';
    const score = source.bias_score || 0;
    if (score < -0.6) return '#0066cc';
    if (score < -0.3) return '#3399ff';
    if (score < 0.3) return '#666666';
    if (score < 0.6) return '#ff6666';
    return '#cc0000';
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{title}</h2>
      <div style={styles.comparisonGrid}>
        {articles.map((article, index) => (
          <div key={article._id || index} style={styles.articleColumn}>
            <div
              style={{
                ...styles.biasHeader,
                backgroundColor: getBiasColor(article.source_id),
              }}
            >
              <div style={styles.sourceInfo}>
                <h4 style={styles.sourceName}>{article.source_id?.name || 'Unknown'}</h4>
                <span style={styles.biasLabel}>{getBiasLabel(article.source_id)}</span>
              </div>
              {article.source_id?.ownership && (
                <p style={styles.owner}>🏢 {article.source_id.ownership}</p>
              )}
            </div>
            
            <div style={styles.articleContent}>
              <h5 style={styles.articleTitle}>{article.title}</h5>
              <p style={styles.articleDescription}>{article.description}</p>
              
              {article.fact_check_ids && article.fact_check_ids.length > 0 && (
                <div style={styles.factChecks}>
                  <strong style={styles.factCheckLabel}>Fact Checks:</strong>
                  {article.fact_check_ids.map((fc, idx) => (
                    <div key={idx} style={styles.factCheckItem}>
                      <span style={{ ...styles.verdict, backgroundColor: getVerdictColor(fc.verdict) }}>
                        {fc.verdict}
                      </span>
                      <span>{fc.claim}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {article.url && (
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                  Read Full Article →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getVerdictColor = (verdict) => {
  switch (verdict?.toLowerCase()) {
    case 'true':
    case 'verified':
      return '#4caf50';
    case 'false':
    case 'debunked':
      return '#f44336';
    case 'mostly true':
    case 'partially true':
      return '#ff9800';
    default:
      return '#999';
  }
};

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    marginTop: 0,
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  noData: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#999',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    fontSize: '16px',
  },
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  articleColumn: {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  biasHeader: {
    color: 'white',
    padding: '16px',
  },
  sourceInfo: {
    marginBottom: '8px',
  },
  sourceName: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  biasLabel: {
    fontSize: '12px',
    opacity: 0.9,
  },
  owner: {
    margin: '8px 0 0 0',
    fontSize: '12px',
    opacity: 0.85,
  },
  articleContent: {
    padding: '16px',
  },
  articleTitle: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  articleDescription: {
    margin: '0 0 12px 0',
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.5',
  },
  factChecks: {
    backgroundColor: '#f9f9f9',
    padding: '10px 12px',
    borderRadius: '4px',
    marginBottom: '12px',
    fontSize: '12px',
  },
  factCheckLabel: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '12px',
  },
  factCheckItem: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '6px',
  },
  verdict: {
    color: 'white',
    padding: '2px 8px',
    borderRadius: '3px',
    fontSize: '11px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  link: {
    display: 'inline-block',
    color: '#0066cc',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '500',
    marginTop: '8px',
    padding: '6px 0',
    borderBottom: '1px solid transparent',
    transition: 'border-color 0.2s',
  },
};
