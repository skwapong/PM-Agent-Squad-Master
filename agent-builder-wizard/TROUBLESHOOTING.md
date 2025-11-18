# Troubleshooting Guide - Agent Builder Wizard

## 🔴 Error: "AI generation failed. Using keyword-based generation instead"

This error occurs when the Claude API connection fails.

### Root Cause
The wizard tries to connect to `localhost:3333/chat` but the proxy server isn't running.

### Quick Fix

1. **Start the proxy server:**
```bash
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard
export ANTHROPIC_API_KEY=sk-ant-your-key-here
node local-proxy-server.js
```

2. **You should see:**
```
✅ Agent Builder Wizard - Local Proxy Server
🌐 Running on: http://localhost:3333
💡 Ready to accept requests
```

3. **Reload the wizard page** and try again

---

## For Enterprise Users (No API Key)

See **ENTERPRISE_DEPLOYMENT.md** for alternatives:
- Use TD's internal AI infrastructure
- Request service account API key  
- Use keyword-based mode (fallback)

---

## Full Troubleshooting Steps in TROUBLESHOOTING.md
