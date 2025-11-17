# Quick Start Guide - PM Agent Squad Master

> **For colleagues who just want to start building agents NOW!**

---

## ⚡ 5-Minute Setup

### 1. Clone & Setup (First Time Only)
```bash
# Clone the repository
git clone https://github.com/skwapong/PM-Agent-Squad-Master.git
cd PM-Agent-Squad-Master/agent-builder-wizard

# Install dependencies
npm install

# Authenticate with Claude Code CLI
claude auth login
```

> **Note:** No `.env` file or API key needed! Claude Code CLI handles authentication.

### 2. Start Every Time
```bash
cd /path/to/PM-Agent-Squad-Master/agent-builder-wizard
./START.sh
```

### 3. Open the App
Double-click `index-ai.html` or open it in your browser

---

## 🔄 Update to Latest Version (Run Before Each Use)

```bash
cd /path/to/PM-Agent-Squad-Master
git pull origin main
cd agent-builder-wizard
npm install
./START.sh
```

**Or use this one-liner:**
```bash
cd /path/to/PM-Agent-Squad-Master && git pull && cd agent-builder-wizard && npm install && ./START.sh
```

---

## 🎯 Usage

1. **Check for 🟢 green indicator** (top-right)
2. **Describe your agent** in the text box
3. **Click "✨ Auto-Generate Agent"**
4. **Download your files** and deploy to Treasure Data

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| 🔴 Red indicator | Run `./START.sh` in terminal |
| Permission denied | Run `chmod +x START.sh` |
| Port in use | Run `lsof -i :3333` and kill the process |
| Can't find Claude | Install: `npm install -g @anthropics/claude-code` |

---

## 📞 Need Help?

- **Full Guide:** See `USER_GUIDE.md`
- **Detailed Docs:** See `agent-builder-wizard/README-START-HERE.md`
- **Issues:** https://github.com/skwapong/PM-Agent-Squad-Master/issues

---

**Pro Tip:** Always run `git pull` before starting to get the latest version! 🚀
