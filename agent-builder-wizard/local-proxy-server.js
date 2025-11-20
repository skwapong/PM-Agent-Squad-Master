/**
 * Local Proxy Server for Agent Builder Wizard
 * Runs on localhost:3333 to proxy requests to Claude API and TD MCP
 *
 * Usage:
 *   node local-proxy-server.js
 *
 * Requirements:
 *   - Node.js installed
 *   - Set ANTHROPIC_API_KEY environment variable
 *   - TD MCP configured via `claude mcp add td`
 *   - Or create .env file with: ANTHROPIC_API_KEY=sk-ant-...
 */

const http = require('http');
const https = require('https');
const { spawn } = require('child_process');

// Configuration
const PORT = 3334;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const TD_API_KEY = process.env.TD_API_KEY || '1/ea89d2d2294a812e542b0f52db328da3248c0a5f';
const TD_SITE = process.env.TD_SITE || 'dev';
const TD_ACCOUNT = process.env.TD_ACCOUNT || 'TD1';

// Check for API key (optional - only needed for /chat endpoint)
if (!ANTHROPIC_API_KEY) {
    console.warn('⚠️ WARNING: ANTHROPIC_API_KEY not set - /chat endpoint will not work');
    console.warn('   TD MCP endpoints (/td/databases, /td/tables) will still work');
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Route requests
    if (req.method === 'POST' && req.url === '/chat') {
        handleChat(req, res);
        return;
    }

    if (req.method === 'GET' && req.url === '/td/databases') {
        handleTDDatabases(req, res);
        return;
    }

    if (req.method === 'GET' && req.url.startsWith('/td/tables/')) {
        handleTDTables(req, res);
        return;
    }

    // 404 for unknown routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

/**
 * Handle chat requests
 */
function handleChat(req, res) {
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
}

/**
 * Handle TD Databases request
 */
async function handleTDDatabases(req, res) {
    try {
        console.log('\n📡 Fetching databases from TD MCP...');

        const databases = await callTDMCP('list_databases', {});

        console.log(`✅ Retrieved ${databases.length} databases`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            databases: databases,
            total: databases.length,
            timestamp: new Date().toISOString()
        }));
    } catch (error) {
        console.error('❌ Error fetching databases:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
}

/**
 * Handle TD Tables request
 */
async function handleTDTables(req, res) {
    try {
        const database = req.url.split('/td/tables/')[1];

        if (!database) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Database name is required' }));
            return;
        }

        console.log(`\n📡 Fetching tables from database: ${database}`);

        const tables = await callTDMCP('list_tables', { database });

        console.log(`✅ Retrieved ${tables.length} tables from ${database}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            database: database,
            tables: tables,
            total: tables.length,
            timestamp: new Date().toISOString()
        }));
    } catch (error) {
        console.error('❌ Error fetching tables:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
}

/**
 * Call TD MCP server
 */
function callTDMCP(tool, args) {
    return new Promise((resolve, reject) => {
        const mcp = spawn('npx', ['@treasuredata/mcp-server'], {
            env: {
                ...process.env,
                TD_API_KEY: TD_API_KEY,
                TD_SITE: TD_SITE,
                TD_ACCOUNT: TD_ACCOUNT
            }
        });

        let output = '';
        let errorOutput = '';

        const request = {
            jsonrpc: '2.0',
            method: 'tools/call',
            params: {
                name: tool,
                arguments: args
            },
            id: 1
        };

        mcp.stdout.on('data', (data) => {
            output += data.toString();
        });

        mcp.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        mcp.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`TD MCP error: ${errorOutput}`));
                return;
            }

            try {
                const lines = output.split('\n').filter(line => line.trim());
                const response = JSON.parse(lines[lines.length - 1]);

                if (response.result && response.result.content) {
                    const text = response.result.content[0].text;

                    // Try to parse as JSON first (if TD MCP returns JSON)
                    try {
                        const parsed = JSON.parse(text);
                        if (parsed.databases) {
                            resolve(parsed.databases);
                            return;
                        }
                        if (parsed.tables) {
                            resolve(parsed.tables);
                            return;
                        }
                        if (Array.isArray(parsed)) {
                            resolve(parsed);
                            return;
                        }
                    } catch (jsonError) {
                        // Not JSON, parse as text list
                    }

                    // Parse the list from the text response
                    const items = text.split('\n')
                        .map(line => line.trim())
                        .filter(line => line && !line.startsWith('Available') && !line.startsWith('Total') && !line.startsWith('{') && !line.startsWith('[') && !line.startsWith(']') && !line.startsWith('}'));

                    resolve(items);
                } else {
                    reject(new Error('Unexpected TD MCP response format'));
                }
            } catch (error) {
                reject(new Error(`Failed to parse TD MCP response: ${error.message}`));
            }
        });

        // Send the request
        setTimeout(() => {
            mcp.stdin.write(JSON.stringify(request) + '\n');
            mcp.stdin.end();
        }, 1000);
    });
}

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
