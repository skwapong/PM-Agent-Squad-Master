/**
 * Vercel Serverless Function - Claude API Proxy
 * Deploy this to Vercel to enable cloud-hosted Claude API access
 *
 * Setup:
 * 1. Add ANTHROPIC_API_KEY to Vercel environment variables
 * 2. Deploy to Vercel (vercel deploy)
 * 3. Update claude-api.js apiUrl to your Vercel URL
 */

export default async function handler(req, res) {
    // Enable CORS for your domain
    const allowedOrigins = [
        'http://localhost:8000',
        'http://localhost:3000',
        'https://your-wizard.vercel.app', // Replace with your actual domain
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
    ].filter(Boolean);

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
    res.setHeader('Access-Control-Max-Age', '86400');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get API key from environment variable or request header
        const apiKey = process.env.ANTHROPIC_API_KEY || req.headers['x-api-key'];

        if (!apiKey) {
            return res.status(401).json({
                error: 'API key not configured',
                hint: 'Set ANTHROPIC_API_KEY environment variable in Vercel'
            });
        }

        // Build system prompt
        const systemPrompt = `You are an expert AI assistant helping users build custom AI agents for Treasure Data's AI Agent Foundry.

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

        // Build messages array
        const messages = history.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        messages.push({
            role: 'user',
            content: message
        });

        // Call Anthropic API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 2048,
                system: systemPrompt,
                messages: messages
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Anthropic API Error:', errorData);
            return res.status(response.status).json({
                error: errorData.error?.message || 'API request failed',
                type: errorData.error?.type
            });
        }

        const data = await response.json();
        const assistantMessage = data.content[0].text;

        return res.status(200).json({
            response: assistantMessage,
            model: data.model,
            usage: data.usage
        });

    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({
            error: error.message || 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
