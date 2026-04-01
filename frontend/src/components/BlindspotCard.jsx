import React from 'react';

export const BlindspotCard = ({ blindspot, onClick }) => {
  const { _id, title, summary, coverage_gap, articles } = blindspot;

  const getGapDescription = () => {
    if (!coverage_gap) return 'Unknown coverage gap';
    switch (coverage_gap.gap_type) {
      case 'left-only':
        return '⬅️ Only covered by left-leaning sources';
      case 'right-only':
        return '➡️ Only covered by right-leaning sources';
      case 'center-only':
        return '↔️ Only covered by center sources';
      default:
        return `Coverage gap: ${coverage_gap.gap_type}`;
    }
  };

  const getMissingPerspective = () => {
    if (!coverage_gap) return null;
    switch (coverage_gap.gap_type) {
      case 'left-only':
        return ['Right', 'Center'];
      case 'right-only':
        return ['Left', 'Center'];
      case 'center-only':
        return ['Left', 'Right'];
      default:
        return [];
    }
  };

  const missing = getMissingPerspective();

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.warningHeader}>
        <div style={styles.warningIcon}>⚠️</div>
        <div style={styles.headerContent}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.gapDescription}>{getGapDescription()}</p>
        </div>
      </div>
      
      <p style={styles.summary}>{summary}</p>
      
      <div style={styles.missingPerspectives}>
        <strong>Missing perspectives:</strong>
        <div style={styles.perspectiveList}>
          {missing && missing.map((perspective) => (
            <span key={perspective} style={styles.perspectiveBadge}>
              {perspective}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.footer}>
        <span style={styles.articleCount}>📄 {articles ? articles.length : 0} articles covering this</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff9e6',
    border: '2px solid #ffc107',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(255, 193, 7, 0.2)',
  },
  warningHeader: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
  },
  warningIcon: {
    fontSize: '24px',
    marginTop: '2px',
    flexShrink: 0,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  gapDescription: {
    margin: 0,
    fontSize: '14px',
    color: '#d89a1f',
    fontWeight: '600',
  },
  summary: {
    margin: '12px 0',
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  missingPerspectives: {
    backgroundColor: '#ffe0b2',
    padding: '10px 12px',
    borderRadius: '4px',
    marginBottom: '12px',
    fontSize: '13px',
  },
  perspectiveList: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
    flexWrap: 'wrap',
  },
  perspectiveBadge: {
    backgroundColor: '#ff6f00',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  footer: {
    fontSize: '13px',
    color: '#999',
  },
  articleCount: {
    fontSize: '13px',
    color: '#999',
  },
};
