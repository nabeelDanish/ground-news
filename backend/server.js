import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`\n✅ Server running on http://localhost:${PORT}`);
      console.log(`📊 API Documentation:`);
      console.log(`   - GET  /api/clusters - Get all story clusters`);
      console.log(`   - GET  /api/clusters/blindspots/feed - Get coverage gaps`);
      console.log(`   - GET  /api/clusters/:id - Get single cluster`);
      console.log(`   - GET  /api/sources - Get all news outlets`);
      console.log(`   - GET  /api/articles/:id - Get article details`);
      console.log(`   - GET  /api/health - Health check\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
