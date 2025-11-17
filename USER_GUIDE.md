# PM Agent Squad Master - User Guide

> **Quick Start for Team Members**
> Build custom AI agents for Treasure Data in minutes using the AI-Powered Agent Builder

---

## 🚀 Getting Started (First Time Setup)

### Prerequisites
- **Node.js** installed (version 14 or higher) - [Download here](https://nodejs.org/)
- **Claude Code CLI** installed and authenticated - [Installation guide](https://docs.anthropic.com/claude/docs/claude-cli)
- **Git** installed (for keeping project updated)

> **Note:** When using `./START.sh`, authentication is handled through Claude Code CLI. No `.env` file or API key needed!

### Step 1: Clone the Repository

Open Terminal (Mac) or Command Prompt (Windows) and run:

```bash
git clone https://github.com/skwapong/PM-Agent-Squad-Master.git
cd PM-Agent-Squad-Master/agent-builder-wizard
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Ensure Claude Code CLI is Authenticated

```bash
# Check if Claude Code CLI is installed
claude --version

# If not authenticated, run:
claude auth login
```

### Step 4: Start the Application

**Mac/Linux:**
```bash
./START.sh
```

**Windows:**
```bash
node claude-code-proxy.cjs
```

You should see:
```
╔════════════════════════════════════════════════════════════════╗
║  🚀 Claude Code CLI Localhost Proxy                            ║
║  ✅ Running on http://localhost:3333                           ║
║  ✅ Connected to Claude Code                                   ║
╚════════════════════════════════════════════════════════════════╝
```

### Step 5: Open the Application

Open your web browser and go to:
```
file:///[YOUR-PATH]/PM-Agent-Squad-Master/agent-builder-wizard/index-ai.html
```

Or simply open `index-ai.html` by double-clicking it.

> **✅ That's it!** No API keys to configure. Claude Code CLI handles authentication automatically.

---

## 🔄 Getting the Latest Version (Recommended Workflow)

To ensure you always have the latest features and fixes, run these commands **before starting work**:

### Quick Update Command

```bash
cd /path/to/PM-Agent-Squad-Master
git pull origin main
cd agent-builder-wizard
npm install
./START.sh
```

### Step-by-Step Update Process

1. **Navigate to project folder:**
   ```bash
   cd /path/to/PM-Agent-Squad-Master
   ```

2. **Pull latest changes from GitHub:**
   ```bash
   git pull origin main
   ```

3. **Update dependencies (if needed):**
   ```bash
   cd agent-builder-wizard
   npm install
   ```

4. **Start the application:**
   ```bash
   ./START.sh
   ```

> 💡 **Pro Tip:** Create a bash alias to make this easier:
> ```bash
> alias start-agent-builder="cd /path/to/PM-Agent-Squad-Master && git pull && cd agent-builder-wizard && npm install && ./START.sh"
> ```

---

## 📖 Using the Agent Builder

### Building Your First Agent

1. **Open the application** - You'll see the "AI-Powered Agent Builder" interface

2. **Check Connection Status:**
   - Look for 🟢 (green) indicator in the top-right
   - If you see 🔴 (red), click "API Settings" for troubleshooting steps

3. **Describe Your Agent:**
   - In the text area, describe what you want your agent to do
   - Example: *"I need a campaign planning agent that helps marketers create comprehensive marketing campaigns across Meta, Google, TikTok, and Pinterest"*

4. **Use the AI Assistant (Optional):**
   - Click "Ask Assistant" to chat with the AI about your agent requirements
   - Get recommendations for knowledge bases, configurations, and settings

5. **Auto-Generate or Build Manually:**
   - Click **"✨ Auto-Generate Agent"** to let AI build everything automatically
   - OR fill out each step manually (Describe → Knowledge → Project → Agent → Deploy)

6. **Download Your Configuration:**
   - After completing the wizard, download your agent configuration files
   - Use these files in Treasure Data's AI Agent Foundry

---

## 🔍 Understanding the Interface

### Top Navigation
- **🟢/🔴 Status Indicator** - Shows connection to Claude API
- **🌍 Language Selector** - Choose your preferred language
- **⚙️ API Settings** - Configure connection and view troubleshooting

### Left Sidebar
- **Agent Foundry Assistant** - AI helper to guide you through agent building
- **Ask Assistant** - Get expert advice on agent configuration
- **Auto-Generate Agent** - One-click AI-powered agent creation

### Main Wizard Steps
1. **Describe** - Define your agent's purpose and tone
2. **Knowledge** - Add knowledge bases (documentation, best practices)
3. **Project** - Configure project settings and tools
4. **Agent** - Set up agent-specific configurations
5. **Deploy** - Download and deploy to Treasure Data

---

## 🛠️ Troubleshooting

### Connection Issues (🔴 Red Indicator)

**Problem:** Red indicator showing "Connection Failed"

**Solution:**
1. Make sure the proxy is running (`./START.sh` or `node claude-code-proxy.cjs`)
2. Check that you're seeing the startup message in terminal
3. Verify your `.env` file has the correct API key
4. Click "API Settings" button for detailed troubleshooting steps

### Proxy Won't Start

**Problem:** Error when running `./START.sh`

**Solution:**
```bash
# Check if Node.js is installed
node --version

# If not installed, download from https://nodejs.org/

# Check if dependencies are installed
npm install

# Try running directly
node claude-code-proxy.cjs
```

### Permission Denied on Mac/Linux

**Problem:** `./START.sh: Permission denied`

**Solution:**
```bash
chmod +x START.sh
./START.sh
```

### Claude CLI Not Found

**Problem:** `Claude CLI: NOT FOUND`

**Solution:**
```bash
# Install Claude Code CLI
npm install -g @anthropics/claude-code

# Verify installation
claude --version

# Authenticate
claude auth login
```

### Not Authenticated with Claude

**Problem:** `Error: Not authenticated` or `401 Unauthorized`

**Solution:**
```bash
# Check authentication status
claude auth status

# If not logged in, authenticate
claude auth login

# Follow the prompts to log in with your Anthropic account
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3333`

**Solution:**
```bash
# Find what's using port 3333
lsof -i :3333

# Kill the process (replace PID with actual process ID)
kill -9 [PID]

# Or use a different port by editing claude-code-proxy.cjs
```

---

## 📁 Project Structure

```
PM-Agent-Squad-Master/
├── agent-builder-wizard/          # Main application folder
│   ├── index-ai.html              # Application UI (open this)
│   ├── wizard-ai.js               # Main JavaScript
│   ├── claude-api.js              # API client
│   ├── claude-code-proxy.cjs      # Local proxy server
│   ├── START.sh                   # Startup script
│   ├── .env                       # Your API key (create from .env.example)
│   ├── package.json               # Dependencies
│   └── README-START-HERE.md       # Detailed documentation
│
├── Agent_Config/                  # Configuration guides
│   ├── 01_Create_Agent.md
│   ├── 02_Add_Tools_Knowledge_Bases.md
│   └── 03_Add_Output.md
│
├── Agent_Knowledge_Bases/         # Knowledge base examples
│   └── examples/                  # Pre-built KB templates
│
└── Reference Files/               # Additional guides and resources
```

---

## 💡 Best Practices

### 1. Always Pull Before Starting
```bash
git pull origin main
```
This ensures you have the latest bug fixes and features.

### 2. Authentication is Handled by Claude Code CLI
- No API keys needed in the project
- Authentication happens through `claude auth login`
- Each team member authenticates individually

### 3. Use Descriptive Agent Names
- ✅ Good: "Meta Advertising Campaign Optimizer"
- ❌ Bad: "Agent 1"

### 4. Test Your Agent Configuration
- Download the configuration files
- Review them before deploying to production
- Test with sample queries first

### 5. Leverage the AI Assistant
- Ask questions about best practices
- Get recommendations for knowledge bases
- Seek advice on configuration settings

---

## 🆘 Getting Help

### Internal Resources
1. **Check the Documentation:**
   - `README-START-HERE.md` - Comprehensive setup guide
   - `Agent_Config/` - Step-by-step configuration guides
   - `Reference Files/` - Additional reference materials

2. **Connection Issues:**
   - Click "⚙️ API Settings" button in the app
   - Follow the troubleshooting steps shown

3. **Knowledge Base Examples:**
   - Check `Agent_Knowledge_Bases/examples/` for templates
   - Use these as starting points for your own KBs

### External Resources
- **Claude Code Documentation:** https://docs.anthropic.com/claude/docs/claude-cli
- **Treasure Data AI Agent Foundry:** [Internal Treasure Data docs]
- **Anthropic API Console:** https://console.anthropic.com/

### Contact
- **Project Owner:** Sam Kwapong
- **Repository:** https://github.com/skwapong/PM-Agent-Squad-Master
- **Issues:** https://github.com/skwapong/PM-Agent-Squad-Master/issues

---

## 🎯 Quick Reference Commands

### Daily Workflow
```bash
# 1. Navigate to project
cd /path/to/PM-Agent-Squad-Master

# 2. Get latest version
git pull origin main

# 3. Install any new dependencies
cd agent-builder-wizard && npm install

# 4. Start the application
./START.sh

# 5. Open index-ai.html in your browser
```

### One-Line Update & Start
```bash
cd /path/to/PM-Agent-Squad-Master && git pull && cd agent-builder-wizard && npm install && ./START.sh
```

### Check Status
```bash
# Check if proxy is running
lsof -i :3333

# Check Claude CLI
claude --version

# Check Node.js
node --version
```

---

## 📊 Feature Highlights

- ✅ **AI-Powered Generation** - Auto-generate complete agent configurations
- ✅ **Multi-Language Support** - English, Spanish, French, German, Japanese, Korean, Dutch, Chinese
- ✅ **Real-Time Connection Status** - Always know if you're connected
- ✅ **Interactive Assistant** - Get help and recommendations as you build
- ✅ **Knowledge Base Templates** - Pre-built examples for common use cases
- ✅ **Export & Download** - Download configurations in multiple formats
- ✅ **Step-by-Step Wizard** - Guided process from concept to deployment

---

## 🔐 Security Notes

1. **Authentication:**
   - Handled through Claude Code CLI (`claude auth login`)
   - No API keys stored in project files
   - Each user authenticates with their own Claude account

2. **Local Execution:**
   - All processing happens on your local machine
   - No data sent to external servers (except Claude API)
   - Proxy runs on `localhost:3333`

3. **Data Privacy:**
   - Your agent configurations stay on your machine
   - Download files are saved locally
   - No telemetry or tracking

---

## 📝 Version History

To see what's new in the latest version:
```bash
git log --oneline -10
```

Current version includes:
- ✅ Dynamic connection status
- ✅ Improved error messages
- ✅ Copy-to-clipboard for setup commands
- ✅ Auto-detected file paths
- ✅ Cleaned up project structure

---

## 🎓 Training Resources

### Video Tutorials
[To be added - Record screen captures of common workflows]

### Example Workflows
1. **Marketing Campaign Agent** - See `Agent_Knowledge_Bases/examples/`
2. **Customer Support Agent** - [Template coming soon]
3. **Data Analysis Agent** - [Template coming soon]

---

**Last Updated:** January 2025
**Maintainer:** Sam Kwapong
**License:** [Your License]

---

> 💡 **Remember:** Always run `git pull` before starting to ensure you have the latest version!
