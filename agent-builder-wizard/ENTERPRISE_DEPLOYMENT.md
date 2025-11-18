# Enterprise Deployment Guide (Without Direct API Key Access)

For enterprise Anthropic subscriptions where you don't have direct access to the API key, here are your deployment options:

---

## 🏢 Option 1: Use Treasure Data's Existing AI Infrastructure ⭐ RECOMMENDED

Since you're building for Treasure Data's Agent Foundry, leverage TD's existing AI infrastructure.

### Benefits
- ✅ No API key management needed
- ✅ Enterprise SSO/auth already configured
- ✅ Cost tracking and governance built-in
- ✅ Same security policies as other TD services
- ✅ Centralized monitoring and logging

### Implementation

#### Approach A: Use TD Agent Foundry API Directly

Instead of proxying to Claude, call TD's Agent Foundry API which handles auth internally:

```javascript
// Update claude-api.js

class ClaudeAPI {
    constructor() {
        // Use TD Agent Foundry endpoint instead of Claude direct
        this.apiUrl = 'https://api.treasuredata.com/agent-foundry/v1/chat';
        // Or your internal TD endpoint
        this.tdApiKey = null; // TD API key (you likely have this)
    }

    async sendMessage(userMessage, conversationHistory = [], onChunk = null, signal = null) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getTDToken()}`, // TD auth token
                'TD-API-Key': this.tdApiKey
            },
            body: JSON.stringify({
                message: userMessage,
                history: conversationHistory,
                // TD-specific parameters
                agent_config: {
                    model: 'claude-3-5-sonnet-v2',
                    temperature: 0.7
                }
            })
        });

        const data = await response.json();
        return data.response;
    }

    getTDToken() {
        // Get TD auth token from session/cookie
        // This is likely already handled by your TD SSO
        return sessionStorage.getItem('td_auth_token') ||
               document.cookie.match(/td_session=([^;]+)/)?.[1];
    }
}
```

**Contact:** Ask your TD platform team for:
1. Internal Agent Foundry API endpoint
2. Authentication mechanism (OAuth, API key, JWT)
3. Request/response format documentation

---

#### Approach B: Proxy Through TD Infrastructure

Deploy your proxy within TD's existing infrastructure (same VPC/network):

```javascript
// api/td-claude-proxy.js
// Deploy this on TD's internal infrastructure

export default async function handler(req, res) {
    try {
        const { message, history } = req.body;

        // Auth: Verify TD user token
        const userToken = req.headers.authorization?.replace('Bearer ', '');
        const isAuthorized = await verifyTDUser(userToken);

        if (!isAuthorized) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // TD infrastructure already has Claude API access configured
        // Use internal TD service account
        const response = await callClaudeViaT DServiceAccount({
            message,
            history,
            user: req.user.email // For tracking/billing
        });

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function verifyTDUser(token) {
    // Verify against TD's auth service
    const response = await fetch('https://auth.treasuredata.com/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.ok;
}

async function callClaudeViaTDServiceAccount(data) {
    // Use TD's service account to call Claude
    // This is configured at infrastructure level
    const response = await fetch(process.env.TD_CLAUDE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // TD service account auth - handled by infrastructure
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}
```

---

## 🔐 Option 2: Request API Key from Your Admin Team

Even with enterprise subscriptions, you can often get a service account API key for specific use cases.

### Steps

1. **Create Business Case Document:**
```
To: Enterprise IT / Security Team
Subject: API Key Request for Agent Builder Tool

Purpose: Internal tool for building TD Agent Foundry configurations
Use Case: Wizard UI to help teams create AI agents faster
Users: Internal TD employees only
Security: Key stored in Vercel environment variables (encrypted)
Cost Control: Read-only access, rate limited to 100 calls/hour
Monitoring: All usage logged with user attribution
```

2. **Request Limited Scope Key:**
- Read-only access
- Specific model access (Claude 3.5 Sonnet only)
- Rate limits (100 requests/hour)
- IP whitelist (Vercel IPs only)

3. **Once Approved:**
- Store in Vercel as secret: `vercel env add ANTHROPIC_API_KEY`
- Use the Vercel proxy solution from CLOUD_PROXY_DEPLOYMENT.md
- Implement additional rate limiting and logging

---

## 🔄 Option 3: Use TD LLM Service (If Available)

Many enterprises have a centralized LLM service that manages API keys centrally.

### Check if TD Has:
- Internal LLM Gateway
- AI Platform Service
- Model Catalog Service

### Implementation

```javascript
// claude-api.js

class ClaudeAPI {
    constructor() {
        // Use TD's internal LLM service
        this.apiUrl = 'https://llm-service.td.internal/v1/chat';
        // Or: 'https://ai-platform.treasuredata.com/api/llm'
    }

    async sendMessage(userMessage, conversationHistory = []) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Use employee SSO token
                'Authorization': `Bearer ${this.getEmployeeToken()}`,
                // Specify which model to use
                'X-Model-Provider': 'anthropic',
                'X-Model-Name': 'claude-3-5-sonnet-v2'
            },
            body: JSON.stringify({
                messages: [
                    ...conversationHistory,
                    { role: 'user', content: userMessage }
                ],
                // Cost tracking
                project: 'agent-builder-wizard',
                department: 'product-engineering'
            })
        });

        const data = await response.json();
        return data.response || data.choices[0].message.content;
    }

    getEmployeeToken() {
        // Employee OAuth token from TD SSO
        return sessionStorage.getItem('employee_token');
    }
}
```

**Contact:** Your AI/ML Platform team or DevOps/Infrastructure team

---

## 🌐 Option 4: Hybrid Approach (Static Wizard + Enterprise API)

Host the static wizard publicly, but connect to enterprise-only API.

### Architecture

```
┌─────────────────────┐
│ Static UI           │
│ (Vercel/CloudFlare) │  ← Public, no secrets
│                     │
└──────────┬──────────┘
           │ HTTPS
           ↓
┌─────────────────────┐
│ TD Internal API     │
│ (Behind VPN/SSO)    │  ← Enterprise only
│                     │
└──────────┬──────────┘
           │ Service Account
           ↓
┌─────────────────────┐
│ Claude API          │
│ (Anthropic)         │
└─────────────────────┘
```

### Implementation

#### Step 1: Deploy Static UI Publicly
```bash
# Deploy to Vercel
cd agent-builder-wizard
vercel deploy --prod
```

#### Step 2: Configure API Endpoint
```javascript
// claude-api.js

class ClaudeAPI {
    constructor() {
        // Detect environment
        const isInternal = window.location.hostname.includes('.treasuredata.com') ||
                          window.location.hostname.includes('.td.internal');

        if (isInternal) {
            // Internal employees: use enterprise API
            this.apiUrl = 'https://ai-api.treasuredata.com/chat';
        } else {
            // External demo: show error or use demo mode
            this.apiUrl = null;
            this.demoMode = true;
        }
    }

    async sendMessage(userMessage, conversationHistory = []) {
        if (this.demoMode) {
            return this.getDemoResponse(userMessage);
        }

        // Enterprise API call with SSO
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            credentials: 'include', // Send SSO cookies
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': this.getCSRFToken()
            },
            body: JSON.stringify({
                message: userMessage,
                history: conversationHistory
            })
        });

        if (response.status === 401) {
            // Redirect to SSO login
            window.location.href = '/sso/login?redirect=' + encodeURIComponent(window.location.href);
            return;
        }

        const data = await response.json();
        return data.response;
    }

    getDemoResponse(message) {
        // Hardcoded responses for demo/external users
        return `Demo Mode: This is a sample response. Sign in with your TD account for live AI assistance.`;
    }

    getCSRFToken() {
        return document.querySelector('meta[name="csrf-token"]')?.content;
    }
}
```

---

## 📋 Implementation Checklist

### For TD Internal Deployment:

- [ ] 1. **Identify existing AI infrastructure**
  - [ ] Check if TD has Agent Foundry API
  - [ ] Check if TD has LLM Gateway Service
  - [ ] Check if TD has AI Platform team

- [ ] 2. **Contact relevant teams**
  - [ ] AI/ML Platform team
  - [ ] Agent Foundry product team
  - [ ] DevOps/Infrastructure team
  - [ ] Security/InfoSec team

- [ ] 3. **Get authentication details**
  - [ ] SSO integration method
  - [ ] API endpoint URLs
  - [ ] Required headers/tokens
  - [ ] Rate limits and quotas

- [ ] 4. **Deploy wizard UI**
  - [ ] Deploy to Vercel/CloudFlare (static)
  - [ ] Configure CORS for TD domains
  - [ ] Add SSO redirect logic

- [ ] 5. **Test with real users**
  - [ ] Internal employee access
  - [ ] SSO login flow
  - [ ] API connectivity
  - [ ] Error handling

- [ ] 6. **Monitor and optimize**
  - [ ] Track usage metrics
  - [ ] Monitor API costs
  - [ ] Collect user feedback

---

## 🔍 Who to Contact at TD

Based on your use case, contact:

### 1. **Agent Foundry Product Team**
- Best for: Getting access to existing Agent Foundry infrastructure
- Ask about: Internal APIs, service accounts, usage quotas

### 2. **AI/ML Platform Team**
- Best for: Centralized LLM service, model gateway
- Ask about: Existing Claude integration, service catalog

### 3. **DevOps/Infrastructure Team**
- Best for: Deploying internal services, VPC access
- Ask about: Deployment options, network access, SSO integration

### 4. **Security/InfoSec Team**
- Best for: API key management, security requirements
- Ask about: Service accounts, key rotation, audit logging

---

## Sample Email Template

```
Subject: Agent Builder Wizard - Enterprise Claude API Access

Hi [Team],

I'm building an internal tool (Agent Builder Wizard) to help TD teams create Agent Foundry configurations more easily. The tool needs access to Claude API for the AI assistant feature.

Current Status:
- Static wizard UI is ready to deploy
- Need backend API connectivity to Claude
- Using enterprise Anthropic subscription (no direct API key)

Questions:
1. Does TD have an internal LLM service/gateway I should use?
2. If not, can we get a service account API key for this use case?
3. What's the recommended approach for employee authentication?
4. Are there existing Claude integrations I can leverage?

Use Case Details:
- Purpose: Internal tool for Agent Foundry config generation
- Users: TD employees only (SSO authenticated)
- Volume: ~500-1000 API calls/month estimated
- Security: All data stays within TD infrastructure

Let me know the best path forward!

Thanks,
[Your Name]
```

---

## Recommended Path Forward

**For your situation (enterprise without direct API key):**

1. ✅ **Best:** Contact Agent Foundry team - they likely have infrastructure you can use
2. ✅ **Good:** Use TD's LLM gateway if available
3. ✅ **Fallback:** Request service account API key from admin team
4. ⚠️ **Last Resort:** Deploy local-only (keep using localhost:3333)

**Next steps:**
1. Reach out to Agent Foundry product team
2. Ask about internal API access
3. Share this document with them
4. They'll guide you to the right solution

---

## Local-Only Alternative (No Cloud Needed)

If cloud hosting isn't approved, you can:

1. **Keep wizard as localhost-only tool**
   - Users run locally: `python3 -m http.server 8000`
   - Claude proxy stays on localhost:3333
   - No cloud deployment needed

2. **Distribute as desktop app**
   - Package with Electron
   - Include built-in proxy
   - Users download and run locally

3. **Internal network deployment**
   - Deploy on TD internal network only
   - Accessible via VPN
   - No internet exposure

---

## Questions?

For help with enterprise deployment:
- GitHub Issues: https://github.com/skwapong/PM-Agent-Squad-Master/issues
- Label: `enterprise-deployment`
- Or contact your TD AI Platform team directly
