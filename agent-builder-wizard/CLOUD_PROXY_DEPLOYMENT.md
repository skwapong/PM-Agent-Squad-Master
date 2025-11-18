# Cloud Proxy Deployment Guide

The Agent Builder Wizard currently uses a localhost proxy (`localhost:3333`) to call the Claude API. When cloud hosting the UI, you need a cloud-hosted proxy to handle API calls securely.

## 🎯 Why You Need a Proxy

1. **Security**: Never expose your Anthropic API key in client-side code
2. **CORS**: Browser security prevents direct API calls from web apps
3. **Rate Limiting**: Control and monitor API usage from a central location
4. **Cost Control**: Track and limit API spending

---

## Option 1: Vercel Serverless Functions ⭐ RECOMMENDED

**Best for:** Quick deployment, free tier, zero config
**Cost:** Free (100GB bandwidth/month, 100 hours compute)
**Difficulty:** ⭐ Easy

### Setup Steps

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Deploy to Vercel
```bash
cd agent-builder-wizard
vercel deploy
```

#### 3. Add API Key to Vercel
```bash
# Via CLI
vercel env add ANTHROPIC_API_KEY

# Or via Vercel Dashboard:
# 1. Go to your project settings
# 2. Environment Variables
# 3. Add: ANTHROPIC_API_KEY = sk-ant-...
```

#### 4. Update `claude-api.js`
```javascript
// Change this line (around line 9):
this.apiUrl = 'http://localhost:3333/chat';

// To your Vercel deployment URL:
this.apiUrl = 'https://your-project.vercel.app/api/chat';
```

#### 5. Redeploy
```bash
vercel --prod
```

### Files Included
- ✅ `api/chat.js` - Serverless function (already created)
- ✅ `vercel.json` - Configuration (already created)

### Vercel Dashboard URL
After deployment, your API will be at:
```
https://[your-project-name].vercel.app/api/chat
```

---

## Option 2: AWS Lambda + API Gateway

**Best for:** AWS-native environments, enterprise deployments
**Cost:** Free tier: 1M requests/month, then $0.20 per 1M requests
**Difficulty:** ⭐⭐ Moderate

### Setup Steps

#### 1. Create Lambda Function
1. Go to AWS Lambda console
2. Create function → Author from scratch
3. Runtime: Node.js 20.x
4. Upload code (see `aws-lambda/handler.js` below)

#### 2. Add Environment Variable
- Key: `ANTHROPIC_API_KEY`
- Value: Your Anthropic API key

#### 3. Create API Gateway
1. Create HTTP API
2. Add route: `POST /chat`
3. Integration: Lambda function
4. Enable CORS

#### 4. Update `claude-api.js`
```javascript
this.apiUrl = 'https://[api-id].execute-api.us-east-1.amazonaws.com/chat';
```

### Lambda Handler Code

Create `aws-lambda/handler.js`:
```javascript
const https = require('https');

exports.handler = async (event) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.requestContext.http.method === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { message, history = [] } = JSON.parse(event.body);

        if (!message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Message is required' })
            };
        }

        // Build messages
        const messages = history.map(msg => ({ role: msg.role, content: msg.content }));
        messages.push({ role: 'user', content: message });

        const systemPrompt = `You are an expert AI assistant helping users build custom AI agents...`;

        // Call Anthropic API
        const response = await callAnthropicAPI({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            system: systemPrompt,
            messages: messages
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                response: response.content[0].text,
                model: response.model,
                usage: response.usage
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};

function callAnthropicAPI(body) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);

        const options = {
            hostname: 'api.anthropic.com',
            path: '/v1/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(body));
                } else {
                    reject(new Error(`API returned ${res.statusCode}: ${body}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}
```

---

## Option 3: Cloudflare Workers

**Best for:** Global edge deployment, lowest latency
**Cost:** Free tier: 100k requests/day
**Difficulty:** ⭐⭐ Moderate

### Setup Steps

#### 1. Install Wrangler CLI
```bash
npm install -g wrangler
wrangler login
```

#### 2. Create Worker
```bash
wrangler init agent-proxy
cd agent-proxy
```

#### 3. Add Worker Code
Edit `src/index.js`:
```javascript
export default {
    async fetch(request, env) {
        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }

        try {
            const { message, history = [] } = await request.json();

            const messages = history.map(msg => ({ role: msg.role, content: msg.content }));
            messages.push({ role: 'user', content: message });

            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': env.ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-3-5-sonnet-20241022',
                    max_tokens: 2048,
                    system: 'You are an expert AI assistant...',
                    messages: messages
                })
            });

            const data = await response.json();

            return new Response(JSON.stringify({
                response: data.content[0].text,
                model: data.model,
                usage: data.usage
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }
};
```

#### 4. Add Secret
```bash
wrangler secret put ANTHROPIC_API_KEY
```

#### 5. Deploy
```bash
wrangler deploy
```

Your API will be at: `https://agent-proxy.[your-subdomain].workers.dev`

---

## Option 4: Google Cloud Functions

**Best for:** GCP-native environments
**Cost:** Free tier: 2M invocations/month
**Difficulty:** ⭐⭐ Moderate

### Setup Steps

#### 1. Install gcloud CLI
```bash
# Follow: https://cloud.google.com/sdk/docs/install
gcloud auth login
gcloud config set project [PROJECT_ID]
```

#### 2. Create Function
```bash
gcloud functions deploy claude-proxy \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point chat \
  --set-env-vars ANTHROPIC_API_KEY=sk-ant-...
```

#### 3. Function Code
Create `index.js`:
```javascript
const fetch = require('node-fetch');

exports.chat = async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).send('');
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, history = [] } = req.body;

        const messages = history.map(m => ({ role: m.role, content: m.content }));
        messages.push({ role: 'user', content: message });

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 2048,
                system: 'You are an expert AI assistant...',
                messages: messages
            })
        });

        const data = await response.json();

        return res.status(200).json({
            response: data.content[0].text,
            model: data.model,
            usage: data.usage
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
```

---

## Comparison Table

| Solution | Free Tier | Cold Start | Setup Time | Best For |
|----------|-----------|------------|------------|----------|
| **Vercel** | 100GB/mo | ~50ms | 5 min | ⭐ Fastest setup |
| **AWS Lambda** | 1M req/mo | ~100ms | 15 min | Enterprise AWS |
| **Cloudflare** | 100k req/day | ~10ms | 10 min | Global edge |
| **GCP Functions** | 2M req/mo | ~80ms | 15 min | GCP ecosystem |

---

## Security Best Practices

### ✅ DO:
- Store API keys in environment variables
- Use HTTPS only (all platforms provide this)
- Implement rate limiting (add to proxy code)
- Whitelist allowed origins in CORS
- Monitor API usage and costs
- Rotate API keys regularly

### ❌ DON'T:
- Hardcode API keys in code
- Allow all origins (`*`) in production
- Skip request validation
- Expose error details to clients
- Leave unused endpoints active

---

## Adding Rate Limiting (Optional)

Add this to any proxy to prevent abuse:

```javascript
// Simple in-memory rate limiter (for serverless, use Redis/DynamoDB)
const rateLimits = new Map();

function checkRateLimit(ip, maxRequests = 10, windowMs = 60000) {
    const now = Date.now();
    const userRequests = rateLimits.get(ip) || [];

    // Remove old requests outside window
    const recentRequests = userRequests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
        return false; // Rate limit exceeded
    }

    recentRequests.push(now);
    rateLimits.set(ip, recentRequests);
    return true;
}

// In your handler:
const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Too many requests' });
}
```

---

## Testing Your Proxy

After deployment, test with:

```bash
curl -X POST https://your-proxy-url.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, can you help me build an agent?",
    "history": []
  }'
```

Expected response:
```json
{
  "response": "Of course! I'd be happy to help...",
  "model": "claude-3-5-sonnet-20241022",
  "usage": {
    "input_tokens": 45,
    "output_tokens": 120
  }
}
```

---

## Updating the UI

Once your proxy is deployed, update `claude-api.js`:

```javascript
// Line 9: Change from localhost to your cloud URL
this.apiUrl = 'https://your-deployment.vercel.app/api/chat';
// Or AWS: 'https://abc123.execute-api.us-east-1.amazonaws.com/chat'
// Or Cloudflare: 'https://agent-proxy.your-subdomain.workers.dev'
// Or GCP: 'https://us-central1-project.cloudfunctions.net/claude-proxy'
```

Then redeploy your UI (Vercel, Netlify, GitHub Pages, etc.)

---

## Troubleshooting

### CORS Errors
- Verify CORS headers are set in proxy
- Check allowed origins match your domain
- Ensure preflight (OPTIONS) is handled

### 401 Unauthorized
- Confirm API key is set in environment variables
- Check environment variable name matches code
- Verify API key is valid (test with curl)

### 500 Internal Server Error
- Check proxy logs (Vercel: `vercel logs`, AWS: CloudWatch)
- Verify Anthropic API is reachable
- Check request format matches Anthropic API spec

### High Costs
- Implement rate limiting
- Add caching for common queries
- Monitor usage in provider dashboard
- Set billing alerts

---

## Cost Estimates

Based on 1,000 API calls per day:

| Provider | Monthly Requests | Monthly Cost | Notes |
|----------|------------------|--------------|-------|
| Vercel | 30,000 | **$0** | Within free tier |
| AWS Lambda | 30,000 | **$0** | Within free tier |
| Cloudflare | 30,000 | **$0** | Within free tier |
| GCP Functions | 30,000 | **$0** | Within free tier |

**Claude API Cost:** ~$5-20/month (depends on usage)

All providers offer generous free tiers. Choose based on your existing infrastructure.

---

## Next Steps

1. Choose your preferred cloud provider
2. Follow setup steps above
3. Test with curl command
4. Update `claude-api.js` with new URL
5. Deploy your UI
6. Monitor usage and costs

**Recommended:** Start with Vercel (easiest, fastest)

---

## Questions?

For issues or questions:
- GitHub Issues: https://github.com/skwapong/PM-Agent-Squad-Master/issues
- Label: `cloud-deployment`
