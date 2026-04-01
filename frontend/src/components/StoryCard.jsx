import React from 'react';

export const StoryCard = ({ cluster, onClick }) => {
  const { _id, title, summary, article_ids, bias_distribution, coverage_gap } = cluster;
  const totalArticles = article_ids ? article_ids.length : 0;

  const getGapIndicator = () => {
    if (!coverage_gap) return null;
    const gapTypeLabel = coverage_gap.gap_type.replace('-', ' ').toUpperCase();
    return (
      <div style={styles.gapBadge}>
        ⚠️ {gapTypeLabel}
      </div>
    );
  };

  const getBiasDistribution = () => {
    if (!bias_distribution) return null;
    const left = bias_distribution.left || 0;
    const center = bias_distribution.center || 0;
    const right = bias_distribution.right || 0;
    return (
      <div style={styles.biasBar}>
        {left > 0 && (
          <div style={{ ...styles.biasSegment, backgroundColor: '#3399ff', width: `${(left / totalArticles) * 100}%` }} 
               title={`Left: ${left}`} />
        )}
        {center > 0 && (
          <div style={{ ...styles.biasSegment, backgroundColor: '#666666', width: `${(center / totalArticles) * 100}%` }} 
               title={`Center: ${center}`} />
        )}
        {right > 0 && (
          <div style={{ ...styles.biasSegment, backgroundColor: '#ff6666', width: `${(right / totalArticles) * 100}%` }} 
               title={`Right: ${right}`} />
        )}
      </div>
    );
  };

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        {getGapIndicator()}
      </div>
      <p style={styles.summary}>{summary}</p>
      <div style={styles.footer}>
        <span style={styles.articleCount}>📄 {totalArticles} articles</span>
        {getBiasDistribution()}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '10px',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  gapBadge: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '10px',
    whiteSpace: 'nowrap',
  },
  summary: {
    margin: '10px 0',
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '12px',
  },
  articleCount: {
    fontSize: '13px',
    color: '#999',
    whiteSpace: 'nowrap',
  },
  biasBar: {
    display: 'flex',
    height: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    overflow: 'hidden',
    flex: 1,
    minWidth: '150px',
  },
  biasSegment: {
    height: '100%',
    transition: 'width 0.3s ease',
  },
};
