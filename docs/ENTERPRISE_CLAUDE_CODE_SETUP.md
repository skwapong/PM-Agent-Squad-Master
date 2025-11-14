# Enterprise Claude Code Integration Guide

**Date:** November 13, 2025
**For:** Claude Code Enterprise Users
**Status:** ✅ Complete

---

## 🎯 Overview

If you're using **Claude Code Enterprise**, you have several better options than using a personal Anthropic API key:

1. **Use your organization's API key** (shared/managed)
2. **Create a backend proxy** using enterprise credentials
3. **Use MCP (Model Context Protocol)** to connect directly to Claude Code
4. **Use Treasure Data's AI services** (if available)

---

## ✅ Option 1: Enterprise Anthropic API Key (Easiest)

### What You Need
Your organization should have an **Enterprise Anthropic account** with:
- Organization-level API keys
- Centralized billing
- Higher rate limits
- Better security controls

### How to Get It

**1. Ask Your Admin:**
```
Subject: API Key Request for Agent Builder Tool

Hi [Admin Name],

I'm building an internal tool using our Agent Builder Wizard and need
access to our organization's Anthropic API key for Claude integration.

The tool will help our team create AI agents for Treasure Data's
AI Agent Foundry.

Expected usage: ~50-100 agents/month (~$5-10/month cost)

Can you provide:
- Enterprise API key (or instructions to generate one)
- Any usage guidelines or rate limits

Thanks!
```

**2. Find It Yourself:**
1. Go to your organization's Anthropic Console
2. Check if you have access to API keys section
3. Look for organization-wide keys (not personal)
4. Copy the key (starts with `sk-ant-...`)

**3. Use It:**
- Open the wizard
- Click "API Settings"
- Enter the enterprise API key
- Start using live AI!

**Benefits:**
- ✅ Centralized billing (org pays)
- ✅ Higher rate limits
- ✅ Usage tracking at org level
- ✅ No personal cost

---

## 🔧 Option 2: Backend Proxy with Enterprise Credentials (Most Secure)

This is the **recommended approach for enterprise deployment**.

### Architecture
```
Browser (Wizard) → Your Backend Server → Anthropic API
                         ↑
                    Enterprise API Key
                    (stored securely)
```

### Implementation

**Step 1: Create Backend Service**

I'll create a simple Node.js backend for you:

**`backend/server.js`**
```javascript
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Anthropic with enterprise API key
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY // Enterprise key from env
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history, systemPrompt } = req.body;

        // Build messages array
        const messages = [
            ...history,
            { role: 'user', content: message }
        ];

        // Call Claude API
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            system: systemPrompt || 'You are a helpful AI assistant for building agents.',
            messages: messages
        });

        res.json({
            response: response.content[0].text
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            error: error.message
        });
    }
});

// Streaming chat endpoint
app.post('/api/chat/stream', async (req, res) => {
    try {
        const { message, history, systemPrompt } = req.body;

        const messages = [
            ...history,
            { role: 'user', content: message }
        ];

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const stream = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            system: systemPrompt || 'You are a helpful AI assistant.',
            messages: messages,
            stream: true
        });

        for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta') {
                const text = chunk.delta.text;
                res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
        }

        res.write('data: [DONE]\n\n');
        res.end();

    } catch (error) {
        console.error('Streaming Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', mode: 'enterprise' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Enterprise Claude proxy running on port ${PORT}`);
});
```

**`backend/package.json`**
```json
{
  "name": "agent-builder-backend",
  "version": "1.0.0",
  "description": "Enterprise backend for Agent Builder Wizard",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.30.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

**`backend/.env`**
```bash
# Enterprise Anthropic API Key
ANTHROPIC_API_KEY=sk-ant-your-enterprise-key-here

# Server Configuration
PORT=3000
NODE_ENV=production

# CORS (update with your domain)
ALLOWED_ORIGINS=http://localhost:8000,https://your-domain.com
```

**Step 2: Update Frontend**

Create a new version of `claude-api.js` for enterprise:

**`claude-api-enterprise.js`**
```javascript
class EnterpriseClaudeAPI {
    constructor() {
        // Backend URL (update based on deployment)
        this.backendUrl = window.location.hostname === 'localhost'
            ? 'http://localhost:3000'
            : 'https://your-backend-domain.com';
    }

    async sendMessage(userMessage, conversationHistory = [], onChunk = null) {
        const systemPrompt = `You are an expert AI assistant helping users build custom AI agents for Treasure Data's AI Agent Foundry.

Your role is to:
- Analyze the user's requirements for their agent
- Suggest appropriate knowledge bases
- Recommend optimal AI model settings
- Provide strategic guidance on agent configuration

Keep responses concise, helpful, and actionable.`;

        try {
            if (onChunk) {
                // Use streaming endpoint
                return await this.streamMessage(userMessage, conversationHistory, systemPrompt, onChunk);
            }

            // Use regular endpoint
            const response = await fetch(`${this.backendUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: conversationHistory,
                    systemPrompt: systemPrompt
                })
            });

            if (!response.ok) {
                throw new Error(`Backend error: ${response.status}`);
            }

            const data = await response.json();
            return data.response;

        } catch (error) {
            console.error('Enterprise API Error:', error);
            throw error;
        }
    }

    async streamMessage(userMessage, conversationHistory, systemPrompt, onChunk) {
        const response = await fetch(`${this.backendUrl}/api/chat/stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userMessage,
                history: conversationHistory,
                systemPrompt: systemPrompt
            })
        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.text) {
                            fullText += parsed.text;
                            onChunk(parsed.text, fullText);
                        }
                    } catch (e) {
                        // Skip invalid JSON
                    }
                }
            }
        }

        return fullText;
    }

    hasApiKey() {
        // Always return true for enterprise (backend handles auth)
        return true;
    }
}

// Export singleton
const claudeAPI = new EnterpriseClaudeAPI();
```

**Step 3: Deploy**

**Option A: Deploy to Your Company's Infrastructure**
```bash
# Using Docker
cd backend
docker build -t agent-builder-backend .
docker run -p 3000:3000 --env-file .env agent-builder-backend

# Or using your company's deployment platform (Kubernetes, ECS, etc.)
```

**Option B: Deploy to Vercel/Netlify Functions**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel --prod
```

---

## 🔌 Option 3: Use MCP (Model Context Protocol)

If your Claude Code instance supports MCP, you can connect directly.

### Check MCP Availability

```bash
# Check if MCP is available
claude mcp list

# Check Claude Code settings
cat ~/.config/claude/settings.json
```

### If MCP is Available

**Create MCP Server Configuration:**

**`.claude/mcp.json`**
```json
{
  "mcpServers": {
    "agent-builder": {
      "command": "node",
      "args": ["mcp-server.js"],
      "env": {
        "ANTHROPIC_API_KEY": "your-enterprise-key"
      }
    }
  }
}
```

**`mcp-server.js`**
```javascript
// MCP server that exposes Claude to your wizard
const { MCPServer } = require('@modelcontextprotocol/sdk');

const server = new MCPServer({
    name: 'agent-builder-mcp',
    version: '1.0.0'
});

// Register chat tool
server.tool({
    name: 'chat',
    description: 'Chat with Claude for agent building',
    inputSchema: {
        type: 'object',
        properties: {
            message: { type: 'string' },
            history: { type: 'array' }
        }
    },
    handler: async ({ message, history }) => {
        // Use Claude Code's internal Claude instance
        return await claudeCode.chat(message, history);
    }
});

server.start();
```

---

## 🏢 Option 4: Use Treasure Data's AI Services

If Treasure Data provides AI services for enterprise customers:

### Check TD AI Services

**Contact your TD account manager:**
```
Subject: AI Services for Agent Builder

Hi [Account Manager],

We're building AI agents using the Agent Builder Wizard for
Treasure Data's AI Agent Foundry.

Questions:
1. Does TD provide AI/LLM services we can use?
2. Can we integrate Claude through TD's infrastructure?
3. What are the authentication/API details?

Our use case: Agent creation wizard needs Claude for guidance
Expected usage: 50-100 requests/day

Thanks!
```

### If TD Provides AI APIs

**Update `claude-api.js`:**
```javascript
class TDClaudeAPI {
    constructor() {
        this.apiUrl = 'https://api.treasuredata.com/ai/chat'; // Example
        this.apiKey = process.env.TD_API_KEY;
    }

    async sendMessage(message, history) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [...history, { role: 'user', content: message }]
            })
        });

        const data = await response.json();
        return data.response;
    }
}
```

---

## 🎯 Recommended Approach for Enterprise

Based on your setup, here's what I recommend:

### For Development/Testing
**Use:** Enterprise API key directly in browser
- Quick setup
- Good for testing
- Shared org billing

### For Production
**Use:** Backend proxy with enterprise credentials
- Most secure
- Better control
- Usage tracking
- Rate limiting
- No API key exposure

### Quick Setup Steps

**1. Get Enterprise API Key**
```bash
# Ask your admin or find it in your org's Anthropic Console
```

**2. Test with Direct Key (Development)**
```bash
# Open wizard
open agent-builder-wizard/index-ai.html

# Enter enterprise API key in modal
# Start testing!
```

**3. Set Up Backend (Production)**
```bash
# Create backend
mkdir backend
cd backend
npm init -y
npm install express @anthropic-ai/sdk cors dotenv

# Copy server.js from above
# Add .env with enterprise key
# Start server
node server.js

# Update frontend to use backend URL
# Deploy both frontend and backend
```

---

## 🔒 Enterprise Security Best Practices

### API Key Management
```bash
# NEVER commit API keys
echo "ANTHROPIC_API_KEY=sk-ant-..." >> .env
echo ".env" >> .gitignore

# Use environment variables
export ANTHROPIC_API_KEY=sk-ant-your-enterprise-key

# Or use secret management (AWS Secrets Manager, Vault, etc.)
```

### Access Control
```javascript
// Add authentication to backend
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    // Verify with your SSO/auth system
    if (!isValidUser(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

app.use('/api', authenticateUser);
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api', limiter);
```

### Usage Tracking
```javascript
app.use((req, res, next) => {
    // Log usage for analytics
    analytics.track({
        user: req.user.email,
        action: 'api_call',
        endpoint: req.path,
        timestamp: new Date()
    });
    next();
});
```

---

## 📊 Cost Control for Enterprise

### Set Budget Alerts
```javascript
// Track monthly usage
const usageTracker = {
    monthly: 0,
    limit: 10000 // tokens

    track: async (tokens) => {
        this.monthly += tokens;
        if (this.monthly > this.limit) {
            await sendAlertToAdmin();
        }
    }
};
```

### Monitor Usage
```bash
# Check Anthropic Console regularly
# Set up billing alerts
# Review usage by team/project
```

---

## ✅ Quick Start (Enterprise)

**Fastest Path to Get Started:**

1. **Ask your admin for enterprise API key**
   ```
   Email template provided above ↑
   ```

2. **Test locally**
   ```bash
   open agent-builder-wizard/index-ai.html
   # Enter enterprise key in modal
   ```

3. **Works?** You're done for development!

4. **For production:** Set up backend proxy
   ```bash
   # Follow "Option 2" steps above
   ```

---

## 🆘 Need Help?

**Internal Resources:**
- Check with your DevOps/Platform team
- Review your company's AI/LLM usage guidelines
- Contact your Treasure Data account manager

**External Resources:**
- Anthropic Enterprise Docs: https://docs.anthropic.com/
- Contact Anthropic support: support@anthropic.com

---

## 📝 Summary

**For Enterprise Claude Code Users:**

✅ **Best for Development:** Use enterprise API key directly
✅ **Best for Production:** Backend proxy with enterprise credentials
✅ **Most Integrated:** MCP connection (if available)
✅ **Most Secure:** Treasure Data's AI services (if available)

**Next Steps:**
1. Contact your admin for enterprise API key
2. Test wizard with enterprise key
3. Set up backend proxy for production
4. Deploy to your company's infrastructure

---

**Version:** 1.0.0
**Date:** November 13, 2025
**For:** Enterprise Claude Code Users
**Status:** Ready to Use ✅
