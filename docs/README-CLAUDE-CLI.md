# Agent Builder Wizard - Claude Code CLI Integration

## 🎉 No API Key Required!

The wizard now uses your **local Claude Code CLI** instance - no Anthropic API key needed!

## Quick Start (2 Steps)

### 1️⃣ Start the Proxy

```bash
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard
npm start
```

You should see:

```
╔════════════════════════════════════════════════════════════════╗
║  🚀 Claude Code CLI Localhost Proxy                            ║
║                                                                 ║
║  ✅ Running on http://localhost:3333                            ║
║  ✅ Claude CLI: Available                                       ║
║  ✅ Connected to Claude Code                                    ║
╚════════════════════════════════════════════════════════════════╝
```

### 2️⃣ Open the Wizard

```bash
open index-ai.html
```

That's it! The wizard will use your local Claude Code instance.

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
│  Spawns: claude -p       │
└────────┬────────────────┘
         │
         │ Shell command
         │
         ▼
┌─────────────────────┐
│  Claude Code CLI    │
│  (Your local CLI)   │
└─────────────────────┘
```

## Requirements

- **Claude Code CLI** installed (you already have it!)
- **Node.js** (for running the proxy)

## Verify Your Setup

### Check Claude CLI

```bash
claude --version
```

Should output something like: `2.0.22 (Claude Code)`

### Check Proxy Health

```bash
curl http://localhost:3333/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "Claude Code CLI proxy is running",
  "connectedToClaude": true,
  "cliAvailable": true,
  "method": "Claude Code CLI"
}
```

## What You Get

### Real AI from Your Local Claude Code

- ✅ Uses your authenticated Claude Code instance
- ✅ No API key configuration needed
- ✅ No additional costs (uses your existing Claude Code access)
- ✅ All responses from real Claude AI
- ✅ Conversation history preserved
- ✅ Intelligent, context-aware suggestions

### No Demo Mode

- ❌ No keyword matching
- ❌ No template responses
- ❌ No hardcoded suggestions
- ❌ No API key required

## Architecture Details

The proxy:

1. **Receives** HTTP requests from the browser
2. **Builds** a prompt with system context + conversation history + user message
3. **Calls** `claude -p "prompt"` (your local CLI)
4. **Returns** Claude's response back to the browser

### Files Created

- `.temp/` - Temporary directory for prompt files (auto-cleaned)
- `.temp/prompt-*.txt` - Temporary prompt files (deleted after use)

## Browser Console Output

When the wizard loads:

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
```

In the proxy terminal:

```
📨 Received: "I want to build a campaign agent..."
📝 Prompt file created: /path/to/.temp/prompt-1699999999999.txt
🤖 Calling Claude Code CLI...
✅ Claude response received
✅ Response: "Perfect! Let's create a Campaign Strategist..."
```

## Troubleshooting

### "Claude CLI: NOT FOUND"

**Problem:** The proxy can't find the `claude` command.

**Solution:**

```bash
# Check if Claude is in your PATH
which claude

# If not found, find where it's installed
find /usr/local -name claude 2>/dev/null
find /opt/homebrew -name claude 2>/dev/null

# Add to PATH if needed (add to ~/.zshrc or ~/.bashrc)
export PATH="/opt/homebrew/bin:$PATH"
```

### "Port 3333 already in use"

**Problem:** Another process is using port 3333.

**Solution:**

```bash
# Kill the existing process
lsof -ti :3333 | xargs kill -9

# Start the proxy again
npm start
```

### "EACCES: permission denied"

**Problem:** Can't create temp directory.

**Fix:** Already handled - the proxy creates `.temp` in the project directory.

### Claude CLI not responding

**Problem:** The CLI hangs or doesn't respond.

**Solution:**

```bash
# Test Claude CLI directly
claude -p "Hello, are you working?"

# If it prompts for authentication, follow the prompts
# Then restart the proxy
```

## Advantages Over API Key Approach

| Feature | Claude CLI | API Key |
|---------|-----------|---------|
| Setup | ✅ Already installed | ❌ Need to get key |
| Cost | ✅ Free (included) | ❌ Pay per token |
| Auth | ✅ Already logged in | ❌ Manage API key |
| Security | ✅ No key to manage | ⚠️ Must secure key |
| Access | ✅ Use existing access | ❌ Need separate plan |

## File Structure

```
agent-builder-wizard/
├── index-ai.html              # Main wizard UI
├── wizard-ai.js               # Wizard logic
├── claude-api.js              # API client (calls localhost)
├── claude-code-proxy.cjs      # Localhost proxy (calls CLI)
├── .temp/                     # Temp files (auto-created)
├── package.json               # Dependencies
└── README-CLAUDE-CLI.md       # This file
```

## System Prompt

The proxy adds this context to every conversation:

```
You are an expert AI assistant helping users build custom AI agents
for Treasure Data's AI Agent Foundry.

Your role is to:
- Analyze the user's requirements for their agent
- Suggest appropriate knowledge bases
- Recommend optimal AI model settings
- Provide strategic guidance on agent configuration
```

This ensures Claude understands it's helping with agent building.

## Conversation Flow Example

1. **User types:** "I want to build a campaign agent"

2. **Proxy sends to CLI:**
   ```
   System: You are an expert AI assistant helping users build...

   Human: I want to build a campaign agent

   Assistant:
   ```

3. **Claude CLI responds:** Real AI suggestion with knowledge bases, models, etc.

4. **Browser receives:** Formatted HTML response with recommendations

5. **User continues:** Conversation history maintained for context

## Stopping the Proxy

Press `Ctrl+C` in the terminal running the proxy:

```
^C
👋 Shutting down proxy...
✅ Proxy stopped
```

Temp files are automatically cleaned up on shutdown.

## Next Steps

1. **Start proxy:** `npm start`
2. **Open wizard:** `open index-ai.html`
3. **Build agents** with real AI assistance from your local Claude Code!

## Support

- **Claude Code Docs:** https://docs.claude.com/claude-code
- **Check CLI:** `claude --help`
- **Report Issues:** Check proxy logs in terminal

---

**Version:** 2.0.0 (Claude CLI Integration)
**Status:** Demo mode removed, using local Claude Code CLI
**Date:** November 13, 2025
