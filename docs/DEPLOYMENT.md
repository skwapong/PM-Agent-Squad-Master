# Agent Builder Wizard - Deployment Guide

## ✅ Deployed to GitHub

**Repository:** https://github.com/skwapong/PM-Agent-Squad-Master

**Wizard Location:** `/agent-builder-wizard/`

---

## 🌐 Access Methods

### Option 1: GitHub Pages (Static Hosting)

Enable GitHub Pages to host the wizard online:

1. Go to your repository: https://github.com/skwapong/PM-Agent-Squad-Master
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Under "Folder", select **/ (root)**
5. Click **Save**

Wait a few minutes, then access at:
```
https://skwapong.github.io/PM-Agent-Squad-Master/agent-builder-wizard/index-ai.html
```

**⚠️ Note:** The Claude CLI proxy won't work in GitHub Pages (browser-only). Users will need to run the proxy locally.

---

### Option 2: Clone and Run Locally (Recommended)

For full functionality with Claude CLI:

```bash
# Clone the repository
git clone https://github.com/skwapong/PM-Agent-Squad-Master.git

# Navigate to wizard
cd PM-Agent-Squad-Master/agent-builder-wizard

# Start the proxy
npm start

# Open the wizard
open index-ai.html
```

This gives you the full experience with real Claude AI!

---

### Option 3: Download ZIP

1. Go to: https://github.com/skwapong/Campaign_Strategist_Planner_Agent
2. Click **Code** → **Download ZIP**
3. Extract the ZIP file
4. Navigate to `agent-builder-wizard/`
5. Run `npm start` and open `index-ai.html`

---

## 🚀 Quick Start for Users

Share these instructions with users:

### For Developers (Full AI Experience)

```bash
# Clone
git clone https://github.com/skwapong/PM-Agent-Squad-Master.git
cd PM-Agent-Squad-Master/agent-builder-wizard

# Start (requires Claude Code CLI installed)
bash START.sh
```

### For Non-Developers (View Only)

Visit the GitHub Pages link:
```
https://skwapong.github.io/PM-Agent-Squad-Master/agent-builder-wizard/index-ai.html
```

**Note:** Without the local proxy, the AI features won't work, but users can see the UI and understand the workflow.

---

## 📋 What Got Deployed

Files now on GitHub:

```
agent-builder-wizard/
├── index-ai.html                  # Main wizard UI
├── wizard-ai.js                   # Wizard logic (demo removed)
├── claude-api.js                  # API client
├── claude-code-proxy.cjs          # Localhost proxy
├── package.json                   # Dependencies
├── START.sh                       # Startup script
├── .gitignore                     # Excludes .temp, .env
│
├── README-START-HERE.md           # Quick start guide
├── README-CLAUDE-CLI.md           # Full documentation
├── SETUP-COMPLETE.md              # Setup summary
├── DIAGNOSTICS.md                 # Troubleshooting
│
└── backend/                       # Optional enterprise setup
    ├── server.js
    ├── package.json
    └── README.md
```

**Excluded** (via .gitignore):
- `.temp/` - Temporary prompt files
- `.env` - API keys (if used)
- `node_modules/` - Dependencies

---

## 🔧 GitHub Pages Setup (Detailed)

### Step 1: Enable Pages

1. **Navigate:** https://github.com/skwapong/PM-Agent-Squad-Master/settings/pages
2. **Source:** Deploy from a branch
3. **Branch:** main
4. **Folder:** / (root)
5. **Save**

### Step 2: Wait for Deployment

GitHub will build and deploy. Check status at:
```
https://github.com/skwapong/PM-Agent-Squad-Master/deployments
```

### Step 3: Access

Once deployed (usually 1-2 minutes):
```
https://skwapong.github.io/PM-Agent-Squad-Master/agent-builder-wizard/index-ai.html
```

---

## ⚠️ GitHub Pages Limitations

Since GitHub Pages is **static hosting only**:

✅ **Works:**
- Wizard UI loads
- User can see the interface
- Forms and navigation work
- Can export configurations

❌ **Doesn't Work:**
- Claude CLI proxy (needs Node.js server)
- Real AI responses (requires local proxy)
- Auto-generate feature (needs API)

**Solution:** Users must clone and run locally for full AI features.

---

## 🎯 Recommended Deployment Strategy

### For Public Sharing

1. **Enable GitHub Pages** for the UI preview
2. **Add README** explaining local setup is required for AI
3. **Provide clone instructions** in the repository README

### For Team Use

1. **Clone repository** to each developer's machine
2. **Run locally** with `bash START.sh`
3. **Share via git** for collaborative development

### For Enterprise

1. **Deploy backend proxy** to internal server
2. **Configure API key** in environment variables
3. **Point wizard** to enterprise proxy URL

---

## 📝 Update README

Add this to your main repository README:

```markdown
## 🧙 Agent Builder Wizard

Interactive UI for building AI agents with Claude Code CLI integration.

### Quick Start

\`\`\`bash
git clone https://github.com/skwapong/PM-Agent-Squad-Master.git
cd PM-Agent-Squad-Master/agent-builder-wizard
bash START.sh
\`\`\`

### Features

- ✅ Real Claude AI integration (local CLI)
- ✅ Auto-generate agent configurations
- ✅ Knowledge base suggestions
- ✅ Step-by-step guided workflow
- ✅ Export as JSON

**Docs:** See `/agent-builder-wizard/README-START-HERE.md`

**Demo:** https://skwapong.github.io/PM-Agent-Squad-Master/agent-builder-wizard/index-ai.html
```

---

## 🚦 Verification

### Check Deployment

```bash
# Local
curl -I http://localhost:3333/health

# GitHub Pages (after enabled)
curl -I https://skwapong.github.io/PM-Agent-Squad-Master/agent-builder-wizard/index-ai.html
```

### Test Locally

```bash
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard
npm start
open index-ai.html
```

---

## 📊 Sharing Options

### 1. Share GitHub Repository
```
https://github.com/skwapong/Campaign_Strategist_Planner_Agent
```

### 2. Share GitHub Pages Link (UI only)
```
https://skwapong.github.io/PM-Agent-Squad-Master/agent-builder-wizard/index-ai.html
```

### 3. Share Clone Instructions
```bash
git clone https://github.com/skwapong/PM-Agent-Squad-Master.git
cd PM-Agent-Squad-Master/agent-builder-wizard
bash START.sh
```

---

## ✅ Success!

Your Agent Builder Wizard is now:

- ✅ **Committed** to git
- ✅ **Pushed** to GitHub
- ✅ **Public** at https://github.com/skwapong/Campaign_Strategist_Planner_Agent
- ✅ **Ready** for GitHub Pages (enable in Settings)
- ✅ **Documented** with full setup guides

**Next:** Enable GitHub Pages to make the UI accessible online!

---

**Repository:** https://github.com/skwapong/Campaign_Strategist_Planner_Agent
**Path:** `/agent-builder-wizard/`
**Date:** November 13, 2025
