#!/bin/bash

# Start TD Database Proxy Server
# This script ensures only one instance runs at a time

echo "🔧 TD Database Proxy Server Startup Script"
echo "=========================================="

# Kill any existing servers
echo "🛑 Stopping any existing servers..."
lsof -ti:3334 2>/dev/null | xargs kill -9 2>/dev/null
sleep 1

# Navigate to directory
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard

# Start server
echo "🚀 Starting proxy server on port 3334..."
node local-proxy-server.js > /tmp/td-proxy-server.log 2>&1 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Check if server is running
if lsof -ti:3334 > /dev/null 2>&1; then
    echo "✅ Server started successfully!"
    echo "📊 PID: $SERVER_PID"
    echo "🔗 Endpoint: http://localhost:3334"
    echo "📝 Logs: tail -f /tmp/td-proxy-server.log"
    echo ""
    echo "To stop: kill $SERVER_PID"
else
    echo "❌ Server failed to start"
    echo "Check logs: cat /tmp/td-proxy-server.log"
    exit 1
fi
