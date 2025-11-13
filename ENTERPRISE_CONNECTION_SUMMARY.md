# Enterprise Claude Code Connection - Quick Start

**For:** Enterprise Claude Code Users
**Date:** November 13, 2025
**Status:** ✅ Ready to Use

---

## 🎯 TL;DR - What You Need to Do

Since you're using **Enterprise Claude Code**, here are your options from easiest to most secure:

### Option 1: Quick Test (5 minutes) ⚡
1. Ask your admin for enterprise Anthropic API key
2. Open `agent-builder-wizard/index-ai.html`
3. Enter API key when prompted
4. Start building agents!

### Option 2: Production Setup (30 minutes) 🔒
1. Get enterprise API key
2. Set up backend proxy (files created for you)
3. Deploy backend to your infrastructure
4. Connect wizard to backend
5. Secure, scalable, ready for team use!

---

## 📋 Step-by-Step: Quick Test

### Step 1: Get Enterprise API Key

**Email your admin:**
```
Subject: Enterprise Anthropic API Key Request

Hi [Admin],

I need our organization's Anthropic API key for the Agent Builder
Wizard project (builds agents for Treasure Data AI Agent Foundry).

Expected usage: ~50-100 agents/month (~$5-10/month)

Can you provide:
- Enterprise API key (sk-ant-...)
- Any usage guidelines or limits

Thanks!
```

**Or find it yourself:**
1. Go to your organization's Anthropic Console
2. Look for API Keys section
3. Check if you have access to org-wide keys
4. Copy the key (starts with `sk-ant-...`)

### Step 2: Test the Wizard
```bash
# Open the wizard
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard
open index-ai.html
```

### Step 3: Configure API Key
1. API key modal will appear
2. Enter your enterprise API key
3. Click "Save & Enable Live AI"
4. Status indicator turns 🟢 green
5. Start chatting with real Claude!

### Step 4: Build an Agent
```
You: I want to build a campaign planning agent
Claude: [Real-time AI response with streaming text] ✨
        Great! Let's design a campaign planning agent...
```

**Done!** You're now using live Claude AI.

---

## 🔒 Production Setup (Recommended for Teams)

### Why Use Backend Proxy?
- ✅ API key never exposed to browser
- ✅ Centralized usage tracking
- ✅ Rate limiting and cost control
- ✅ Better security for team use

### Files Created for You

I've already created everything you need:

```
agent-builder-wizard/backend/
├── server.js           # Express backend with all endpoints
├── package.json        # Dependencies
├── .env.example        # Environment template
└── README.md          # Backend documentation
```

### Setup Steps

**1. Install Backend**
```bash
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard/backend

# Install dependencies
npm install
```

**2. Configure**
```bash
# Create .env file
cp .env.example .env

# Edit and add your enterprise API key
nano .env
```

**In `.env`:**
```bash
ANTHROPIC_API_KEY=sk-ant-your-enterprise-key-here
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=http://localhost:8000,https://your-domain.com
```

**3. Start Backend**
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

**4. Test Backend**
```bash
# Health check
curl http://localhost:3000/health

# Test chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

**5. Update Frontend**

Create `claude-api-enterprise.js` (already provided in docs) or update `claude-api.js`:

```javascript
// In claude-api.js, change this line:
this.apiUrl = 'http://localhost:3000/api/chat';
// Instead of 'https://api.anthropic.com/v1/messages'
```

**6. Deploy**

Deploy backend to your infrastructure:
- Docker
- Kubernetes
- AWS/GCP/Azure
- Vercel/Netlify Functions

---

## 🎯 Quick Reference

### Backend Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /health` | Health check |
| `GET /api/status` | Check API key status |
| `POST /api/chat` | Non-streaming chat |
| `POST /api/chat/stream` | Streaming chat (SSE) |
| `POST /api/generate-kbs` | Generate knowledge bases |
| `POST /api/generate-prompt` | Generate system prompt |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Enterprise API key | ✅ Yes |
| `PORT` | Server port | No (default: 3000) |
| `NODE_ENV` | Environment | No (default: dev) |
| `ALLOWED_ORIGINS` | CORS origins | No (default: localhost) |

---

## 💰 Cost Estimate

### Enterprise Pricing (Claude 3.5 Sonnet)
- **Input:** $3 per million tokens
- **Output:** $15 per million tokens

### Typical Wizard Usage
- **Per agent created:** ~$0.06
- **50 agents/month:** ~$3
- **100 agents/month:** ~$6
- **500 agents/month:** ~$30

**Billed to:** Your organization's account

---

## 🔒 Security Checklist

### For Quick Test
- ✅ Use enterprise API key (not personal)
- ✅ API key stored in browser session only
- ✅ Cleared when browser closes
- ✅ Good for personal testing

### For Production
- ✅ Backend proxy hides API key
- ✅ Add authentication/SSO
- ✅ Set up rate limiting
- ✅ Monitor usage and costs
- ✅ Use environment variables
- ✅ Never commit `.env` to git

---

## 📚 Documentation

### Main Guides
1. **`ENTERPRISE_CLAUDE_CODE_SETUP.md`** - Complete enterprise setup guide
2. **`backend/README.md`** - Backend deployment guide
3. **`LIVE_AI_SETUP.md`** - General live AI integration
4. **`LIVE_AI_INTEGRATION_SUMMARY.md`** - Technical overview

### Code Files
1. **`backend/server.js`** - Backend proxy server
2. **`claude-api.js`** - Frontend API client
3. **`wizard-ai.js`** - Wizard integration

---

## 🆘 Common Issues

### Issue: Can't Find Enterprise API Key
**Solution:**
1. Ask your admin/IT team
2. Check your org's Anthropic Console
3. Contact your Treasure Data account manager

### Issue: Backend Won't Start
**Solution:**
```bash
# Check if .env exists
ls -la backend/.env

# Check if API key is set
cat backend/.env | grep ANTHROPIC_API_KEY

# Check if port is available
lsof -i :3000
```

### Issue: CORS Error in Browser
**Solution:**
```bash
# Update ALLOWED_ORIGINS in backend/.env
ALLOWED_ORIGINS=http://localhost:8000,https://your-domain.com
```

### Issue: Rate Limit Errors
**Solution:**
- Check your org's rate limits in Anthropic Console
- Contact admin to increase limits
- Implement request throttling

---

## ✅ Next Steps

### For Testing (Right Now)
1. Get enterprise API key from admin
2. Open `index-ai.html`
3. Enter API key
4. Start building!

### For Production (This Week)
1. Review `ENTERPRISE_CLAUDE_CODE_SETUP.md`
2. Set up backend proxy
3. Deploy to your infrastructure
4. Share with team

### For Optimization (Later)
1. Add authentication
2. Set up usage monitoring
3. Implement cost alerts
4. Add team analytics

---

## 🎓 Resources

### Internal
- Your IT/DevOps team
- Your Treasure Data account manager
- Your organization's AI/LLM guidelines

### External
- [Anthropic Enterprise Docs](https://docs.anthropic.com/)
- [Claude API Reference](https://docs.anthropic.com/claude/reference/)
- Backend code in `agent-builder-wizard/backend/`

---

## 🎉 You're Ready!

**Quick Test Path:**
1. Get enterprise API key
2. Open wizard
3. Enter key
4. Build agents! ✨

**Production Path:**
1. Set up backend (files ready)
2. Deploy to infrastructure
3. Connect wizard
4. Share with team! 🚀

---

**Questions?** Check the detailed guides:
- `ENTERPRISE_CLAUDE_CODE_SETUP.md` (full setup guide)
- `backend/README.md` (backend docs)

**Version:** 1.0.0
**Date:** November 13, 2025
**Status:** Ready to Use ✅
