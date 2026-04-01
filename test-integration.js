#!/usr/bin/env node

/**
 * End-to-End Test: Frontend ↔ Backend Integration
 * Tests all API endpoints the frontend uses
 */

const http = require('http');

const API_BASE = 'http://localhost:5000/api';

function testEndpoint(endpoint, description) {
  return new Promise((resolve) => {
    http.get(`${API_BASE}${endpoint}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const success = res.statusCode === 200;
          console.log(`${success ? '✅' : '❌'} ${description}`);
          if (success && endpoint === '/clusters') {
            console.log(`   Found ${parsed.length} story clusters`);
          }
          if (success && endpoint === '/sources') {
            console.log(`   Found ${parsed.length} news sources`);
          }
          if (success && endpoint === '/clusters/blindspots/feed') {
            console.log(`   Found ${parsed.length} coverage blindspots`);
          }
          resolve(success);
        } catch (e) {
          console.log(`❌ ${description} - Parse error`);
          resolve(false);
        }
      });
    }).on('error', () => {
      console.log(`❌ ${description} - Connection failed`);
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║    Frontend ↔ Backend Integration Tests               ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  const tests = [
    ['/health', 'Health check'],
    ['/clusters', 'Dashboard: Get all story clusters'],
    ['/sources', 'BiasSpectrum: Get all news sources'],
    ['/clusters/blindspots/feed', 'BlindspotFeed: Get coverage gaps'],
  ];

  let passed = 0;
  for (const [endpoint, desc] of tests) {
    const result = await testEndpoint(endpoint, desc);
    if (result) passed++;
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n${passed}/${tests.length} API endpoints working\n`);

  if (passed === tests.length) {
    console.log('✅ ALL TESTS PASSED');
    console.log('\n🎉 Frontend and Backend are integrated and working!\n');
    console.log('Next steps:');
    console.log('  1. Open browser: http://localhost:5173');
    console.log('  2. Click through Dashboard, Blindspots, and Comparisons');
    console.log('  3. Watch data load from backend API');
    console.log('');
    process.exit(0);
  } else {
    console.log('⚠️  Some endpoints failed');
    console.log('Make sure backend is running: node server-demo.js');
    process.exit(1);
  }
}

runTests();
