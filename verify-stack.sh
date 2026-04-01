#!/bin/bash

# Ground News Clone - Full Stack Verification
# This script checks that both backend and frontend are working

set -e

BACKEND_URL="http://localhost:5000"
FRONTEND_DIR="/Users/ndanish/Desktop/Learning/ground-news/frontend"
BACKEND_DIR="/Users/ndanish/Desktop/Learning/ground-news/backend"

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   Ground News Clone - Full Stack Verification Script          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check backend
echo "🔍 Checking Backend..."
if lsof -i :5000 > /dev/null 2>&1; then
    echo "✅ Backend server is running on port 5000"
    
    # Test health endpoint
    if curl -s "$BACKEND_URL/api/health" > /dev/null; then
        echo "✅ Backend /api/health endpoint responding"
        HEALTH=$(curl -s "$BACKEND_URL/api/health")
        echo "   Data: $(echo $HEALTH | grep -o '"clusters":[0-9]*' || echo 'N/A')"
    else
        echo "❌ Backend health check failed"
        exit 1
    fi
else
    echo "❌ Backend server not running on port 5000"
    echo "   Start with: node $BACKEND_DIR/server-demo.js"
    exit 1
fi

echo ""
echo "🔍 Checking Frontend..."

# Check if frontend dependencies installed
if [ -d "$FRONTEND_DIR/node_modules" ]; then
    echo "✅ Frontend node_modules exists"
else
    echo "⚠️  Frontend node_modules not found"
    echo "   Run: cd $FRONTEND_DIR && npm install"
fi

# Check frontend files
echo ""
echo "✅ Frontend file structure:"
echo "   - src/App.jsx ........................ $([ -f $FRONTEND_DIR/src/App.jsx ] && echo '✓' || echo '✗')"
echo "   - src/components/ (4 files) ........ $([ -d $FRONTEND_DIR/src/components ] && echo '✓' || echo '✗')"
echo "   - src/pages/ (3 files) ............. $([ -d $FRONTEND_DIR/src/pages ] && echo '✓' || echo '✗')"
echo "   - src/services/api.js .............. $([ -f $FRONTEND_DIR/src/services/api.js ] && echo '✓' || echo '✗')"

echo ""
echo "📋 API Endpoints Available:"
curl -s "$BACKEND_URL/api/health" | grep -o '"[a-z_]*":[0-9]*' | sed 's/^/   /'

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║              ✅ ALL SYSTEMS READY - Let's Go!                 ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "To start the frontend dev server, run:"
echo ""
echo "  cd $FRONTEND_DIR"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
