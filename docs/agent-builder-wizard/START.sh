#!/bin/bash

# Agent Builder Wizard - Start Script
# This starts the Claude Code CLI proxy and opens the wizard

echo "🚀 Starting Agent Builder Wizard..."
echo ""

# Check if Claude CLI is available
if ! command -v claude &> /dev/null; then
    echo "❌ Claude Code CLI not found!"
    echo ""
    echo "Please make sure Claude Code is installed:"
    echo "  which claude"
    echo ""
    exit 1
fi

echo "✅ Claude CLI found: $(which claude)"
echo "✅ Version: $(claude --version 2>&1 | head -1)"
echo ""

# Check if port 3333 is already in use
if lsof -Pi :3333 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 3333 is already in use"
    echo ""
    read -p "Kill existing process? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        lsof -ti :3333 | xargs kill -9 2>/dev/null
        echo "✅ Killed existing process"
        sleep 1
    else
        echo "❌ Cannot start - port in use"
        exit 1
    fi
fi

# Start the proxy in the background
echo "🔄 Starting Claude Code CLI proxy..."
node claude-code-proxy.cjs &
PROXY_PID=$!

# Wait for proxy to start
sleep 2

# Check if proxy started successfully
if curl -s http://localhost:3333/health > /dev/null 2>&1; then
    echo "✅ Proxy running on http://localhost:3333"
    echo "✅ Connected to Claude Code CLI"
    echo ""
    echo "📂 Opening wizard in browser..."
    echo ""

    # Open the wizard
    open index-ai.html

    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                                                                 ║"
    echo "║  ✅ Agent Builder Wizard is ready!                             ║"
    echo "║                                                                 ║"
    echo "║  The wizard is now open in your browser.                       ║"
    echo "║  The proxy is running in the background.                       ║"
    echo "║                                                                 ║"
    echo "║  To stop the proxy:                                            ║"
    echo "║    kill $PROXY_PID                                          ║"
    echo "║                                                                 ║"
    echo "║  Or run:                                                       ║"
    echo "║    lsof -ti :3333 | xargs kill -9                              ║"
    echo "║                                                                 ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Proxy PID: $PROXY_PID"
    echo ""
    echo "Press Ctrl+C to stop watching logs (proxy will keep running)"
    echo ""

    # Follow the proxy logs
    wait $PROXY_PID
else
    echo "❌ Failed to start proxy"
    kill $PROXY_PID 2>/dev/null
    exit 1
fi
