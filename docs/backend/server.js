/**
 * Enterprise Backend Proxy for Agent Builder Wizard
 * Handles Claude API calls with enterprise credentials
 */

const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8000', 'http://localhost:3000'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize Anthropic with enterprise API key
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

// System prompt for agent building
const AGENT_BUILDER_SYSTEM_PROMPT = `You are an expert AI assistant helping users build custom AI agents for Treasure Data's AI Agent Foundry.

Your role is to:
- Analyze the user's requirements for their agent
- Suggest appropriate knowledge bases (topics and content areas)
- Recommend optimal AI model settings (model choice, temperature)
- Provide strategic guidance on agent configuration
- Keep responses concise, helpful, and actionable

When the user describes what they want their agent to do:
1. Identify the domain/industry (marketing, HR, support, IT, sales, etc.)
2. Suggest 4-5 specific knowledge base topics
3. Recommend the best AI model and temperature setting
4. Encourage them to use the "Auto-Generate" button

Be encouraging, professional, and focus on practical agent-building advice.`;

// Chat endpoint (non-streaming)
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [], systemPrompt } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Build messages array
        const messages = [
            ...history,
            { role: 'user', content: message }
        ];

        console.log(`[Chat] Processing message: "${message.substring(0, 50)}..."`);

        // Call Claude API
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            system: systemPrompt || AGENT_BUILDER_SYSTEM_PROMPT,
            messages: messages
        });

        const responseText = response.content[0].text;

        res.json({
            response: responseText,
            usage: {
                input_tokens: response.usage.input_tokens,
                output_tokens: response.usage.output_tokens
            }
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            error: error.message || 'Internal server error'
        });
    }
});

// Streaming chat endpoint
app.post('/api/chat/stream', async (req, res) => {
    try {
        const { message, history = [], systemPrompt } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const messages = [
            ...history,
            { role: 'user', content: message }
        ];

        console.log(`[Stream] Processing message: "${message.substring(0, 50)}..."`);

        // Set headers for SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Create streaming response
        const stream = await anthropic.messages.stream({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            system: systemPrompt || AGENT_BUILDER_SYSTEM_PROMPT,
            messages: messages
        });

        // Handle stream events
        stream.on('text', (text) => {
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
        });

        stream.on('message', async (message) => {
            // Stream complete
            res.write(`data: ${JSON.stringify({ done: true, usage: message.usage })}\n\n`);
            res.write('data: [DONE]\n\n');
            res.end();
        });

        stream.on('error', (error) => {
            console.error('Stream Error:', error);
            res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
            res.end();
        });

    } catch (error) {
        console.error('Streaming Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Knowledge base generation endpoint
app.post('/api/generate-kbs', async (req, res) => {
    try {
        const { description, domain } = req.body;

        if (!description) {
            return res.status(400).json({ error: 'Description is required' });
        }

        const prompt = `Based on this agent description:
"${description}"

Domain: ${domain || 'general'}

Generate 4-5 specific knowledge base topics that would be essential for this agent. For each knowledge base, provide:
1. A clear, concise name (3-5 words)
2. A brief description (1-2 sentences)
3. Sample content outline (3-5 bullet points of what this KB should contain)

Format your response as a JSON array of objects with keys: name, description, contentOutline (array of strings).

Example format:
[
  {
    "name": "Campaign Planning Fundamentals",
    "description": "Core concepts and frameworks for planning marketing campaigns",
    "contentOutline": ["Campaign objectives and KPIs", "Target audience definition", "Channel selection criteria"]
  }
]`;

        console.log(`[KB Gen] Generating knowledge bases for domain: ${domain}`);

        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            messages: [{ role: 'user', content: prompt }]
        });

        const responseText = response.content[0].text;

        // Extract JSON from response
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const knowledgeBases = JSON.parse(jsonMatch[0]);
            res.json({ knowledgeBases });
        } else {
            throw new Error('Could not parse knowledge bases from response');
        }

    } catch (error) {
        console.error('KB Generation Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// System prompt generation endpoint
app.post('/api/generate-prompt', async (req, res) => {
    try {
        const { description, domain, tone, audience } = req.body;

        if (!description) {
            return res.status(400).json({ error: 'Description is required' });
        }

        const prompt = `Create a detailed system prompt for an AI agent with these specifications:

Domain: ${domain || 'general'}
Description: ${description}
Tone: ${tone || 'professional'}
Target Audience: ${audience || 'general users'}

The system prompt should:
- Clearly define the agent's role and expertise
- List key responsibilities and capabilities
- Provide operational guidelines
- Set the appropriate tone and communication style
- Include any domain-specific best practices

Write a comprehensive system prompt (200-300 words) that would be used to configure this agent.`;

        console.log(`[Prompt Gen] Generating system prompt for domain: ${domain}`);

        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [{ role: 'user', content: prompt }]
        });

        const systemPrompt = response.content[0].text;

        res.json({ systemPrompt });

    } catch (error) {
        console.error('Prompt Generation Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        mode: 'enterprise',
        timestamp: new Date().toISOString()
    });
});

// Status endpoint (check if API key is configured)
app.get('/api/status', (req, res) => {
    res.json({
        configured: !!process.env.ANTHROPIC_API_KEY,
        model: 'claude-3-5-sonnet-20241022',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║  Enterprise Agent Builder Backend                      ║
║  Running on port ${PORT}                                  ║
║  Mode: ${process.env.NODE_ENV || 'development'}                               ║
║  API Key: ${process.env.ANTHROPIC_API_KEY ? '✅ Configured' : '❌ Missing'}                      ║
╚════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
