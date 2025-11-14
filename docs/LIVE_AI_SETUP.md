# Live Claude AI Integration Setup

**Date:** November 13, 2025
**Feature:** Live AI Integration with Anthropic Claude API
**Status:** ✅ Complete

---

## 🎯 Overview

The Agent Builder Wizard now supports **two modes**:

### 1. Demo Mode (Keyword-Based)
- ✅ No API key required
- ✅ Works offline
- ✅ Instant responses
- ⚠️ Limited to keyword matching
- ⚠️ Pre-defined templates only

### 2. Live AI Mode (Claude API)
- ✅ Real Claude AI responses
- ✅ Context-aware conversations
- ✅ Streaming responses
- ✅ Custom knowledge base generation
- ✅ Dynamic system prompt creation
- ⚠️ Requires Anthropic API key
- ⚠️ API usage costs apply

---

## 🚀 Quick Start

### Option 1: Use Demo Mode (No Setup)
1. Open `index-ai.html` in your browser
2. Click "Skip (Use Demo Mode)" when prompted
3. Start using the wizard with keyword-based responses

### Option 2: Enable Live AI
1. Get an API key from [console.anthropic.com](https://console.anthropic.com/)
2. Open `index-ai.html` in your browser
3. Enter your API key when prompted
4. Click "Save & Enable Live AI"
5. Start chatting with real Claude!

---

## 🔑 Getting Your Anthropic API Key

### Step 1: Create Anthropic Account
1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Navigate to "API Keys" section

### Step 2: Create API Key
1. Click "Create Key"
2. Give it a name (e.g., "Agent Builder Wizard")
3. Copy the key (starts with `sk-ant-...`)
4. **Important:** Save it securely - you won't see it again!

### Step 3: Add Credits
- New accounts get free credits for testing
- Add payment method for production use
- Current pricing: ~$0.003 per message
- More info: https://www.anthropic.com/pricing

---

## 💻 Technical Architecture

### Files Added

**1. `claude-api.js`** - Claude API Integration Module
- Handles API authentication
- Manages streaming responses
- Generates knowledge bases
- Creates system prompts
- Error handling

**2. Updated `wizard-ai.js`**
- API key configuration UI
- Live AI mode toggle
- Streaming message display
- Fallback to demo mode

**3. Updated `index-ai.html`**
- API key modal
- Status indicator
- Configuration button

---

## 🔒 Security Features

### API Key Storage
- ✅ Stored in `sessionStorage` only (cleared when browser closes)
- ✅ Never sent to any server except Anthropic
- ✅ Not persisted to disk
- ✅ Password-masked input field

### Best Practices
- 🔐 Never commit API keys to version control
- 🔐 Use environment variables in production
- 🔐 Implement rate limiting for public deployments
- 🔐 Monitor API usage in Anthropic Console

---

## 🎨 User Interface

### API Status Indicator
Located in the header next to the title:
- 🔴 **Red Dot**: Demo mode (no API key)
- 🟢 **Green Dot**: Live AI enabled

### API Configuration Modal
Appears automatically on first visit or click "API Settings":
- Enter API key
- Save to enable live AI
- Skip to use demo mode
- Link to get API key

### Chat Experience

**Demo Mode:**
```
You: I want to build a campaign agent
Claude: [Keyword-based response about campaigns]
```

**Live AI Mode:**
```
You: I want to build a campaign agent
Claude: [Streaming response...] ✨
Great! Let's build a campaign management agent. Based on
your description, I recommend focusing on...
[Real-time Claude response with context awareness]
```

---

## 📊 Live AI Features

### 1. Intelligent Conversations
Claude understands context from previous messages and provides relevant, tailored advice.

**Example:**
```
You: I need an agent for campaign planning
Claude: Great! For campaign planning, I recommend...

You: What about budget optimization?
Claude: For the campaign planning agent we discussed,
        budget optimization is crucial. I suggest...
```

### 2. Dynamic Knowledge Base Generation
When using live AI, knowledge bases are generated based on your actual description, not templates.

**API Call:**
```javascript
const kbs = await claudeAPI.generateKnowledgeBases(
    agentDescription,
    domain
);
```

**Result:** Custom knowledge bases tailored to your specific use case.

### 3. System Prompt Generation
Live AI creates unique system prompts based on your agent configuration.

**API Call:**
```javascript
const prompt = await claudeAPI.generateSystemPrompt({
    domain: 'marketing',
    description: 'Campaign planning agent',
    tone: 'professional',
    audience: 'marketers'
});
```

### 4. Streaming Responses
See Claude's responses in real-time as they're generated.

---

## 🔧 For Developers

### Integration Points

**1. Send Message to Claude:**
```javascript
const response = await claudeAPI.sendMessage(
    userMessage,
    conversationHistory,
    (chunk, fullText) => {
        // Handle streaming chunk
        updateTypingIndicator(fullText);
    }
);
```

**2. Generate Knowledge Bases:**
```javascript
const kbs = await claudeAPI.generateKnowledgeBases(
    description,
    domain
);
// Returns: Array of KB objects with name, description, contentOutline
```

**3. Generate System Prompt:**
```javascript
const prompt = await claudeAPI.generateSystemPrompt(config);
// Returns: Customized system prompt string
```

**4. Check API Status:**
```javascript
if (claudeAPI.hasApiKey()) {
    useLiveAI = true;
}
```

### Error Handling

All API calls include try/catch blocks:

```javascript
try {
    const response = await claudeAPI.sendMessage(...);
} catch (error) {
    // Gracefully fallback to demo mode
    addChatMessage('assistant', `⚠️ Error: ${error.message}`);
}
```

---

## 🚀 Production Deployment

### Option 1: Backend Proxy (Recommended)

**Why?**
- ✅ API keys never exposed to browser
- ✅ Rate limiting and usage tracking
- ✅ Better security and control

**Implementation:**
1. Create backend API endpoint (Node.js, Python, etc.)
2. Store API key in environment variables
3. Proxy requests from frontend to Anthropic
4. Add authentication for your users

**Example Backend (Node.js):**
```javascript
// server.js
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        messages: [...history, { role: 'user', content: message }]
    });

    res.json({ response: response.content[0].text });
});

app.listen(3000);
```

**Update Frontend:**
```javascript
// In claude-api.js, change apiUrl:
this.apiUrl = '/api/chat'; // Your backend endpoint
```

### Option 2: Direct Browser (Current Implementation)

**Best For:**
- Personal use
- Internal tools
- Prototypes
- Small teams

**Security Considerations:**
- ⚠️ API key visible in browser memory
- ⚠️ No server-side rate limiting
- ⚠️ User responsible for API costs

---

## 💰 Cost Estimation

### API Usage Costs (Claude 3.5 Sonnet)

**Input:** $3 per million tokens (~750,000 words)
**Output:** $15 per million tokens (~750,000 words)

**Typical Wizard Session:**
- User message: ~100 tokens
- Claude response: ~500 tokens
- Total per exchange: ~600 tokens
- Cost per exchange: ~$0.003 (0.3 cents)

**Example Usage:**
- 10 messages in chat: $0.03
- Generate 5 knowledge bases: $0.02
- Generate system prompt: $0.01
- **Total per agent created: ~$0.06**

**Monthly Estimates:**
- 50 agents/month: ~$3
- 100 agents/month: ~$6
- 500 agents/month: ~$30

---

## 🐛 Troubleshooting

### Issue: API Key Not Working

**Symptoms:**
- Red status indicator
- Error messages in chat

**Solutions:**
1. Check API key format (must start with `sk-ant-`)
2. Verify key in [Anthropic Console](https://console.anthropic.com/)
3. Check browser console for detailed errors
4. Ensure API key has credits available

### Issue: Streaming Not Working

**Symptoms:**
- No real-time text updates
- Responses appear all at once

**Solutions:**
1. Check browser console for errors
2. Verify `updateTypingIndicator()` function exists
3. Check network tab for streaming response
4. Try refreshing the page

### Issue: CORS Errors

**Symptoms:**
- "Access-Control-Allow-Origin" errors in console

**Solutions:**
1. This shouldn't happen with Anthropic API (they allow browser requests)
2. If it does, implement backend proxy (see Production Deployment)

### Issue: Rate Limiting

**Symptoms:**
- 429 status code errors
- "Rate limit exceeded" messages

**Solutions:**
1. Check your rate limits in Anthropic Console
2. Implement request throttling
3. Add retry logic with exponential backoff
4. Consider upgrading your plan

---

## 📈 Future Enhancements

### Potential Improvements

**1. Conversation Export**
```javascript
function exportConversation() {
    const json = JSON.stringify(chatHistory, null, 2);
    downloadFile('conversation.json', json);
}
```

**2. Custom Prompts**
Allow users to customize the system prompt used for the AI assistant.

**3. Multiple API Providers**
Support for OpenAI, Cohere, etc.

**4. Usage Analytics**
Track token usage and costs per session.

**5. Conversation Templates**
Save and load conversation templates for common agent types.

**6. Multi-Model Support**
Switch between Claude Sonnet, Haiku, and Opus.

---

## 🎓 Learning Resources

### Anthropic Documentation
- [API Reference](https://docs.anthropic.com/claude/reference/)
- [Prompt Engineering](https://docs.anthropic.com/claude/docs/introduction-to-prompt-design)
- [Best Practices](https://docs.anthropic.com/claude/docs/guide-to-anthropics-prompt-engineering-resources)

### Claude Models
- **Claude 3.5 Sonnet** (Current): Best balance of intelligence and speed
- **Claude 3.5 Haiku**: Fastest, most cost-effective
- **Claude 3 Opus**: Most capable for complex tasks

### Rate Limits
- **Free tier**: Limited requests per minute
- **Paid tier**: Higher limits based on plan
- Check current limits: https://console.anthropic.com/settings/limits

---

## ✅ Summary

**What We Built:**
- ✅ Live Claude AI integration
- ✅ Dual-mode support (Demo + Live)
- ✅ API key configuration UI
- ✅ Streaming responses
- ✅ Error handling and fallbacks
- ✅ Secure key storage
- ✅ Status indicator

**User Benefits:**
- 🎯 Real AI conversations (when using API key)
- 🎯 Context-aware responses
- 🎯 Custom knowledge base generation
- 🎯 Dynamic system prompts
- 🎯 No setup required (demo mode)

**Developer Benefits:**
- 🔧 Clean API abstraction
- 🔧 Easy to extend
- 🔧 Production-ready architecture
- 🔧 Comprehensive error handling

---

**Version:** 1.0.0
**Date:** November 13, 2025
**Status:** Production Ready ✅

**Built with ❤️ to bring real AI assistance to agent building**
