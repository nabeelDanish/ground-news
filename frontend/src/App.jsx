import React, { useState } from 'react';
import { Dashboard, BlindspotFeed, ComparisonPage } from './pages';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCluster, setSelectedCluster] = useState(null);

  const handleSelectStory = (cluster) => {
    setSelectedCluster(cluster);
    setCurrentPage('comparison');
  };

  return (
    <div style={styles.app}>
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <button
            style={{
              ...styles.navButton,
              ...(currentPage === 'dashboard' ? styles.navButtonActive : {}),
            }}
            onClick={() => setCurrentPage('dashboard')}
          >
            📰 Dashboard
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(currentPage === 'blindspots' ? styles.navButtonActive : {}),
            }}
            onClick={() => setCurrentPage('blindspots')}
          >
            🕵️ Blindspots
          </button>
        </div>
      </nav>

      <main style={styles.main}>
        {currentPage === 'dashboard' && (
          <Dashboard onSelectStory={handleSelectStory} />
        )}
        {currentPage === 'blindspots' && (
          <BlindspotFeed onBack={() => setCurrentPage('dashboard')} />
        )}
        {currentPage === 'comparison' && selectedCluster && (
          <ComparisonPage
            cluster={selectedCluster}
            onBack={() => setCurrentPage('dashboard')}
          />
        )}
      </main>


      <footer style={styles.footer}>
        <p>Ground News Clone | Understanding Media Bias & Coverage Gaps</p>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    backgroundColor: '#333',
    color: 'white',
    padding: '0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navContent: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    gap: '0',
  },
  navButton: {
    flex: 1,
    padding: '16px 20px',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    borderBottom: '3px solid transparent',
    transition: 'all 0.3s ease',
  },
  navButtonActive: {
    borderBottomColor: '#4caf50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  main: {
    flex: 1,
    width: '100%',
  },
  footer: {
    backgroundColor: '#333',
    color: '#ccc',
    textAlign: 'center',
    padding: '20px',
    marginTop: '40px',
    fontSize: '14px',
  },
};

export default App;
