# Live Claude API Setup Guide

**Demo mode has been completely removed.** All responses now come from the real Claude API.

## Quick Start

### 1. Install Dependencies

```bash
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard
npm install @anthropic-ai/sdk dotenv
```

### 2. Configure API Key

Create a `.env` file in the `agent-builder-wizard` directory:

```bash
# Copy the example file
cp .env.example .env

# Edit with your API key
nano .env
```

Add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

**Get your API key:** https://console.anthropic.com/settings/keys

### 3. Start the Proxy

```bash
node claude-code-proxy.cjs
```

You should see:

```
╔════════════════════════════════════════════════════════════════╗
║  🚀 Claude API Localhost Proxy                                 ║
║                                                                 ║
║  ✅ Running on http://localhost:3333                            ║
║  ✅ API Key: Configured                                         ║
║  ✅ Connected to Claude API                                     ║
╚════════════════════════════════════════════════════════════════╝
```

### 4. Open the Wizard

```bash
open index-ai.html
```

The wizard will automatically connect to the localhost proxy and use real Claude AI for all responses!

## How It Works

```
┌─────────────────┐
│   Browser       │
│  (index-ai.html)│
└────────┬────────┘
         │
         │ HTTP POST
         │ http://localhost:3333/chat
         │
         ▼
┌─────────────────────────┐
│  Localhost Proxy        │
│  (claude-code-proxy.cjs)│
│                          │
│  Reads .env file         │
│  Adds system prompt      │
└────────┬────────────────┘
         │
         │ HTTPS
         │ API calls with key
         │
         ▼
┌─────────────────────┐
│  Anthropic API      │
│  Claude 3.5 Sonnet  │
└─────────────────────┘
```

## Verify Connection

### Check Proxy Health

```bash
curl http://localhost:3333/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "Claude API proxy is running",
  "connectedToClaude": true,
  "apiConfigured": true
}
```

### Test Chat

```bash
curl -X POST http://localhost:3333/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "I want to build a campaign agent"}'
```

You should get a real AI response!

## Troubleshooting

### "ANTHROPIC_API_KEY not configured"

**Problem:** The proxy can't find your API key.

**Solution:**
1. Make sure `.env` file exists in the `agent-builder-wizard` directory
2. Check that the file contains: `ANTHROPIC_API_KEY=sk-ant-...`
3. Restart the proxy after creating/editing `.env`

### "Claude API not loaded"

**Problem:** The browser can't find `claude-api.js`

**Solution:**
1. Hard refresh the page: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Check browser console for errors
3. Verify `claude-api.js` exists in the same directory as `index-ai.html`

### Proxy Won't Start

**Problem:** Port 3333 already in use or dependencies missing

**Solution:**
```bash
# Install dependencies
npm install @anthropic-ai/sdk dotenv

# Check if port is in use
lsof -i :3333

# Kill existing process if needed
kill -9 <PID>

# Start proxy again
node claude-code-proxy.cjs
```

### API Rate Limits

**Problem:** Getting 429 errors from Anthropic

**Solution:**
- The proxy uses Claude 3.5 Sonnet with 2048 max tokens
- Rate limits depend on your Anthropic plan
- Check your usage: https://console.anthropic.com/settings/usage
- Consider upgrading your plan if needed

## File Structure

```
agent-builder-wizard/
├── index-ai.html              # Main wizard UI
├── wizard-ai.js               # Wizard logic (demo mode removed)
├── claude-api.js              # API client (calls localhost proxy)
├── claude-code-proxy.cjs      # Localhost proxy server
├── .env                       # Your API key (not in git)
├── .env.example               # Template for .env
├── package.json               # Node dependencies
└── LIVE_API_SETUP.md         # This file
```

## Security Notes

- **Never commit `.env` to git** - it contains your API key
- The `.env` file is already in `.gitignore`
- API key is stored server-side (in proxy), not in browser
- Only the proxy communicates with Anthropic API
- Browser only talks to localhost:3333

## What Changed?

### Removed

- ❌ Demo mode keyword matching
- ❌ `generateAIResponse()` function
- ❌ `useLiveAI` flag
- ❌ Fallback to template responses
- ❌ All hardcoded agent suggestions

### Added

- ✅ Real Claude API integration via localhost proxy
- ✅ System prompt for agent building context
- ✅ Conversation history tracking
- ✅ Streaming response support
- ✅ Proper error handling with helpful messages

## Next Steps

Once the proxy is running and the wizard is open:

1. Send a message like "I want to build a campaign agent"
2. Get real AI suggestions from Claude
3. Click "✨ Auto-Generate Agent" for intelligent configuration
4. Build your agent with real AI assistance!

## Support

- **API Documentation:** https://docs.anthropic.com/
- **Get API Key:** https://console.anthropic.com/settings/keys
- **Claude Code Docs:** https://docs.claude.com/claude-code

---

**Version:** 2.0.0 (Demo mode removed)
**Date:** November 13, 2025
