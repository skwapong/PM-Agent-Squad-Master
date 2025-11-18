/**
 * Local Proxy Server for Agent Builder Wizard
 * Runs on localhost:3333 to proxy requests to Claude API
 *
 * Usage:
 *   node local-proxy-server.js
 *
 * Requirements:
 *   - Node.js installed
 *   - Set ANTHROPIC_API_KEY environment variable
 *   - Or create .env file with: ANTHROPIC_API_KEY=sk-ant-...
 */

const http = require('http');
const https = require('https');

// Configuration
const PORT = 3333;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

// Check for API key
if (!ANTHROPIC_API_KEY) {
    console.error('❌ ERROR: ANTHROPIC_API_KEY environment variable not set');
    console.error('\n📝 To fix this:');
    console.error('   1. Get your API key from: https://console.anthropic.com/');
    console.error('   2. Run: export ANTHROPIC_API_KEY=sk-ant-...');
    console.error('   3. Or create .env file with: ANTHROPIC_API_KEY=sk-ant-...');
    console.error('\n🏢 For enterprise users without API key:');
    console.error('   See ENTERPRISE_DEPLOYMENT.md for alternative solutions');
    process.exit(1);
}

// System prompt for agent building
const SYSTEM_PROMPT = `You are an expert AI assistant helping users build custom AI agents for Treasure Data's AI Agent Foundry.

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

// Create server
const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Only handle POST /chat
    if (req.method !== 'POST' || req.url !== '/chat') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }

    // Parse request body
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const { message, history = [] } = JSON.parse(body);

            console.log(`\n📨 Received message: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`);

            if (!message) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Message is required' }));
                return;
            }

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
            const response = await callClaudeAPI(messages);

            console.log(`✅ Response received (${response.length} characters)`);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                response: response,
                model: 'claude-3-5-sonnet-20241022',
                timestamp: new Date().toISOString()
            }));

        } catch (error) {
            console.error('❌ Error:', error.message);

            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: error.message,
                details: 'Check server logs for more information'
            }));
        }
    });
});

/**
 * Call Anthropic Claude API
 */
function callClaudeAPI(messages) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            system: SYSTEM_PROMPT,
            messages: messages
        });

        const options = {
            hostname: 'api.anthropic.com',
            path: '/v1/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const apiReq = https.request(options, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                if (apiRes.statusCode === 200) {
                    try {
                        const parsed = JSON.parse(data);
                        resolve(parsed.content[0].text);
                    } catch (e) {
                        reject(new Error(`Failed to parse API response: ${e.message}`));
                    }
                } else {
                    try {
                        const error = JSON.parse(data);
                        reject(new Error(`Anthropic API error (${apiRes.statusCode}): ${error.error?.message || data}`));
                    } catch (e) {
                        reject(new Error(`Anthropic API error (${apiRes.statusCode}): ${data}`));
                    }
                }
            });
        });

        apiReq.on('error', (error) => {
            reject(new Error(`Network error: ${error.message}`));
        });

        apiReq.write(postData);
        apiReq.end();
    });
}

// Start server
server.listen(PORT, () => {
    console.log('\n✅ Agent Builder Wizard - Local Proxy Server');
    console.log(`🌐 Running on: http://localhost:${PORT}`);
    console.log(`📡 Endpoint: http://localhost:${PORT}/chat`);
    console.log(`🔑 API Key: ${ANTHROPIC_API_KEY.substring(0, 12)}...${ANTHROPIC_API_KEY.substring(ANTHROPIC_API_KEY.length - 4)}`);
    console.log('\n💡 Ready to accept requests from Agent Builder Wizard');
    console.log('📝 Press Ctrl+C to stop\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down proxy server...');
    server.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
    });
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    console.error('\n❌ Uncaught Exception:', error.message);
    console.error('Stack:', error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('\n❌ Unhandled Rejection at:', promise);
    console.error('Reason:', reason);
});
