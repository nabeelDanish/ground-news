import React from 'react';

export const BiasSpectrum = ({ sources }) => {
  // Sort sources by bias score (left to right)
  const sorted = [...sources].sort((a, b) => a.bias_score - b.bias_score);

  const getBiasLabel = (score) => {
    if (score < -0.6) return 'Far Left';
    if (score < -0.3) return 'Left';
    if (score < 0.3) return 'Center';
    if (score < 0.6) return 'Right';
    return 'Far Right';
  };

  const getBiasColor = (score) => {
    if (score < -0.6) return '#0066cc'; // Dark blue
    if (score < -0.3) return '#3399ff'; // Light blue
    if (score < 0.3) return '#666666'; // Gray
    if (score < 0.6) return '#ff6666'; // Light red
    return '#cc0000'; // Dark red
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>News Source Bias Spectrum</h3>
      <div style={styles.spectrum}>
        {sorted.map((source) => (
          <div
            key={source._id}
            style={{
              ...styles.sourceBar,
              backgroundColor: getBiasColor(source.bias_score),
            }}
            title={`${source.name} (${getBiasLabel(source.bias_score)}) - ${source.owner}`}
          >
            <span style={styles.sourceLabel}>{source.name}</span>
          </div>
        ))}
      </div>
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#0066cc' }}>
          </div>
          <span>Far Left</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#3399ff' }}>
          </div>
          <span>Left</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#666666' }}>
          </div>
          <span>Center</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#ff6666' }}>
          </div>
          <span>Right</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#cc0000' }}>
          </div>
          <span>Far Right</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '30px',
  },
  title: {
    marginTop: 0,
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  spectrum: {
    display: 'flex',
    gap: '8px',
    marginBottom: '15px',
    flexWrap: 'wrap',
  },
  sourceBar: {
    flex: 1,
    minWidth: '100px',
    padding: '12px 8px',
    color: 'white',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  sourceLabel: {
    display: 'block',
    textOverflow: 'ellipsis',
  },
  legend: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    fontSize: '12px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendColor: {
    width: '20px',
    height: '20px',
    borderRadius: '3px',
  },
};
