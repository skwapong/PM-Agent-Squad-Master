# 🚀 Agent Builder Wizard - START HERE

**AI-Powered Agent Builder using your local Claude Code CLI**

No API key required! Uses your existing Claude Code installation.

---

## ⚡ Quick Start (30 seconds)

```bash
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard
bash START.sh
```

**That's it!** The wizard will open in your browser, connected to your local Claude Code.

---

## 📖 What You Get

✅ **Real AI from Claude** - No templates, no keyword matching
✅ **No API Key Needed** - Uses your local Claude Code CLI
✅ **Intelligent Suggestions** - Knowledge bases, models, settings
✅ **Context-Aware** - Conversation history preserved
✅ **Export Ready** - Download agent configurations

---

## 🎯 Manual Start (If you prefer)

### Terminal 1: Start Proxy

```bash
npm start
```

Should show:

```
╔════════════════════════════════════════════════════════════════╗
║  🚀 Claude Code CLI Localhost Proxy                            ║
║  ✅ Running on http://localhost:3333                            ║
║  ✅ Claude CLI: Available                                       ║
╚════════════════════════════════════════════════════════════════╝
```

### Terminal 2 (optional): Open Wizard

```bash
open index-ai.html
```

---

## ✅ Verify It's Working

### 1. Browser Status

Look for **🟢 green dot** next to "AI Chat Assistant"

### 2. Console Output

Press F12 → Console tab, should see:

```
✅ Claude API connected via localhost proxy
```

### 3. Send Test Message

Type: "I want to build a campaign agent"

You should get a **real AI response** (not a template)!

---

## 🔧 Troubleshooting

### "Claude CLI: NOT FOUND"

```bash
# Check if installed
which claude

# Should show: /opt/homebrew/bin/claude or similar
```

**Fix:** Make sure Claude Code is in your PATH

### "Port 3333 already in use"

```bash
# Kill existing process
lsof -ti :3333 | xargs kill -9

# Restart
npm start
```

### Browser shows red dot

1. Is the proxy running? Check terminal
2. Hard refresh: `Cmd+Shift+R` (Mac)
3. Test: `curl http://localhost:3333/health`

---

## 📚 More Info

- **Detailed docs:** `README-CLAUDE-CLI.md`
- **Troubleshooting:** `DIAGNOSTICS.md`
- **Original README:** `README.md`

---

## 🎉 You're Ready!

```bash
bash START.sh
```

Start building intelligent AI agents with real Claude assistance!

---

**Version:** 2.0.0 • **Demo Mode:** Removed ✅ • **Updated:** Nov 13, 2025
