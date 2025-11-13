# Agent Builder Wizard - Live Claude API

## 🎉 Demo Mode Removed

All responses now come from **real Claude AI** via the Anthropic API!

## Quick Start (3 Steps)

### 1️⃣ Install Dependencies

```bash
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard
npm install
```

### 2️⃣ Configure Your API Key

```bash
# Copy the template
cp .env.example .env

# Edit and add your key
nano .env
```

Add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

**Get your API key:** https://console.anthropic.com/settings/keys

### 3️⃣ Start & Use

```bash
# Terminal 1: Start the proxy
npm start

# Terminal 2: Open the wizard
open index-ai.html
```

## What You Get

### Real AI Responses

- ✅ Intelligent, context-aware suggestions
- ✅ Personalized agent configurations
- ✅ Dynamic knowledge base recommendations
- ✅ Adaptive model and temperature suggestions
- ✅ Conversation history tracking

### No More Templates

- ❌ Keyword matching removed
- ❌ Hardcoded responses removed
- ❌ Generic fallbacks removed
- ❌ Demo mode completely eliminated

## Architecture

```
Browser              Localhost Proxy         Anthropic API
(Wizard)     ───►    (Port 3333)      ───►   (Claude 3.5)
             HTTP    .env API key            HTTPS
```

### Files

| File | Purpose |
|------|---------|
| `index-ai.html` | Wizard UI |
| `wizard-ai.js` | Wizard logic (demo removed) |
| `claude-api.js` | API client |
| `claude-code-proxy.cjs` | Localhost proxy server |
| `.env` | Your API key (not in git) |
| `package.json` | Dependencies |

## Test Your Setup

### Health Check

```bash
curl http://localhost:3333/health
```

Expected:

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

Should return a real AI response (not a template)!

## Browser Console

When the wizard loads, you should see:

```
🔍 Checking Claude API connection...
  claudeAPI exists: true
  claudeAPI.hasApiKey(): true
  claudeAPI.apiUrl: http://localhost:3333/chat
✅ Claude API connected via localhost proxy
```

When you send a message:

```
📤 Sending message to Claude API: I want to build a campaign agent...
🌐 Calling localhost proxy: http://localhost:3333/chat
📨 Message: I want to build a campaign agent
🤖 Calling Claude API...
✅ Response: "Perfect! Let's create a Campaign Strategist..."
```

## Troubleshooting

### "ANTHROPIC_API_KEY not configured"

**Fix:** Create `.env` file with your API key and restart the proxy.

### "Claude API not loaded"

**Fix:** Hard refresh the browser (`Cmd+Shift+R` on Mac).

### Port 3333 in use

**Fix:**
```bash
lsof -i :3333
kill -9 <PID>
npm start
```

### Dependencies missing

**Fix:**
```bash
npm install @anthropic-ai/sdk dotenv
```

## Security

- ✅ API key stored in `.env` (not in browser)
- ✅ `.env` excluded from git
- ✅ Server-side API calls only
- ✅ No API key exposed to frontend

**Never commit `.env` to git!**

## What Changed?

| Before (Demo Mode) | After (Live API) |
|-------------------|------------------|
| Keyword matching | Real AI understanding |
| Template responses | Dynamic, contextual responses |
| Fixed suggestions | Personalized recommendations |
| No conversation memory | Full conversation history |
| Generic fallbacks | Intelligent error handling |

## Usage Example

1. Start proxy: `npm start`
2. Open wizard: `open index-ai.html`
3. Send message: "I want to build a campaign planning agent"
4. Get real AI response with:
   - Domain analysis
   - Knowledge base suggestions
   - Model recommendations
   - Temperature settings
   - Next steps

## API Usage

- **Model:** Claude 3.5 Sonnet (`claude-3-5-sonnet-20241022`)
- **Max Tokens:** 2048 per response
- **System Prompt:** Agent building context included
- **History:** Full conversation tracked

## Cost

Anthropic charges per token:

- Input: ~$3 per million tokens
- Output: ~$15 per million tokens

Typical wizard conversation: ~$0.01 - $0.05

Check your usage: https://console.anthropic.com/settings/usage

## Support

- 📚 **API Docs:** https://docs.anthropic.com/
- 🔑 **Get API Key:** https://console.anthropic.com/settings/keys
- 💬 **Claude Code:** https://docs.claude.com/claude-code
- 📖 **Setup Guide:** See `LIVE_API_SETUP.md`

---

**Version:** 2.0.0
**Status:** Demo mode completely removed
**Date:** November 13, 2025
