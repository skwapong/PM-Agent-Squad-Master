#!/usr/bin/env node

/**
 * Claude Code CLI Localhost Proxy
 * Connects your wizard to your local Claude Code CLI instance
 *
 * Usage:
 *   node claude-code-proxy.cjs
 *
 * Then open index-ai.html and it will connect automatically!
 */

const http = require('http');
const { spawn } = require('child_process');
const { writeFileSync, unlinkSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const os = require('os');

const PORT = 3333;

// System prompt for agent building context
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

Format your responses with HTML for better readability:
- Use <strong> for emphasis
- Use <br> for line breaks
- Use bullet points with • symbol
- Keep it concise and scannable

Be encouraging, professional, and focus on practical agent-building advice.`;

// Create temp directory for conversation files in the project directory
const TEMP_DIR = join(__dirname, '.temp');
if (!existsSync(TEMP_DIR)) {
    mkdirSync(TEMP_DIR, { recursive: true });
}

/**
 * Call Claude Code CLI with a message
 */
async function callClaudeCLI(userMessage, conversationHistory = []) {
    return new Promise((resolve, reject) => {
        // Build full conversation context
        let fullPrompt = `${SYSTEM_PROMPT}\n\n`;

        // Add conversation history
        if (conversationHistory.length > 0) {
            fullPrompt += "Previous conversation:\n\n";
            conversationHistory.forEach(msg => {
                const role = msg.role === 'user' ? 'Human' : 'Assistant';
                fullPrompt += `${role}: ${msg.content}\n\n`;
            });
        }

        // Add current message
        fullPrompt += `Human: ${userMessage}\n\nAssistant:`;

        // Write prompt to temp file for debugging
        const promptFile = join(TEMP_DIR, `prompt-${Date.now()}.txt`);
        writeFileSync(promptFile, fullPrompt, 'utf8');

        console.log('📝 Prompt file created:', promptFile);
        console.log('🤖 Calling Claude Code CLI...');

        // Use 'claude chat' instead of just 'claude' for better stdin handling
        const claude = spawn('claude', ['chat'], {
            stdio: ['pipe', 'pipe', 'pipe'],
            env: { ...process.env }
        });

        let stdout = '';
        let stderr = '';
        let resolved = false;

        // Add timeout to prevent hanging (60 seconds)
        const timeout = setTimeout(() => {
            if (!resolved) {
                resolved = true;
                claude.kill();
                console.error('⏱️ Claude CLI timed out after 60 seconds');
                reject(new Error('Claude CLI timed out. The request took too long to complete.'));
            }
        }, 60000);

        claude.stdout.on('data', (data) => {
            const chunk = data.toString();
            stdout += chunk;
            console.log('📥 Received chunk:', chunk.substring(0, 50));
        });

        claude.stderr.on('data', (data) => {
            const chunk = data.toString();
            stderr += chunk;
            console.error('⚠️ stderr:', chunk);
        });

        // Write prompt to stdin
        try {
            claude.stdin.write(fullPrompt);
            claude.stdin.end();
            console.log('✍️ Prompt sent to Claude CLI');
        } catch (error) {
            clearTimeout(timeout);
            resolved = true;
            console.error('❌ Failed to write to stdin:', error.message);
            reject(new Error(`Failed to send prompt to Claude CLI: ${error.message}`));
            return;
        }

        claude.on('close', (code) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(timeout);

            // Clean up temp file
            try {
                if (existsSync(promptFile)) {
                    unlinkSync(promptFile);
                }
            } catch (e) {
                console.error('Failed to cleanup temp file:', e.message);
            }

            console.log(`🔍 Claude CLI exited with code ${code}`);
            console.log(`📊 stdout length: ${stdout.length}`);
            console.log(`📊 stderr length: ${stderr.length}`);

            if (stdout.trim()) {
                console.log('✅ Claude response received');
                resolve(stdout.trim());
            } else if (code === 0) {
                console.error('❌ Claude CLI succeeded but returned no output');
                reject(new Error('Claude CLI returned no output. This may indicate an authentication issue or that the CLI is running in interactive mode. Try: claude auth login'));
            } else {
                console.error('❌ Claude CLI error:', stderr || `Exit code ${code}`);
                reject(new Error(stderr || `Claude CLI exited with code ${code}`));
            }
        });

        claude.on('error', (error) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(timeout);

            console.error('❌ Failed to spawn Claude CLI:', error.message);

            if (error.code === 'ENOENT') {
                reject(new Error('Claude Code CLI not found. Please install it: npm install -g @anthropics/claude-code'));
            } else {
                reject(new Error(`Failed to execute Claude Code CLI: ${error.message}`));
            }
        });
    });
}

const server = http.createServer((req, res) => {
    // Enable CORS for localhost
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Health check
    if (req.method === 'GET' && req.url === '/health') {
        // Check if Claude CLI is available
        const testClaude = spawn('which', ['claude']);
        let claudeAvailable = false;

        testClaude.on('close', (code) => {
            claudeAvailable = (code === 0);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'ok',
                message: 'Claude Code CLI proxy is running',
                connectedToClaude: claudeAvailable,
                cliAvailable: claudeAvailable,
                method: 'Claude Code CLI'
            }));
        });

        return;
    }

    // Chat endpoint
    if (req.method === 'POST' && req.url === '/chat') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { message, history = [] } = JSON.parse(body);

                console.log(`\n📨 Received: "${message.substring(0, 50)}..."`);

                // Call Claude Code CLI
                const response = await callClaudeCLI(message, history);

                console.log(`✅ Response: "${response.substring(0, 50)}..."\n`);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    response: response
                }));

            } catch (error) {
                console.error('❌ Error:', error.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: error.message,
                    hint: 'Make sure Claude Code CLI is installed and available in your PATH. Try running: claude --version'
                }));
            }
        });
        return;
    }

    // 404 for unknown routes
    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, () => {
    // Check if Claude CLI is available
    const testClaude = spawn('which', ['claude']);

    testClaude.on('close', (code) => {
        const cliAvailable = (code === 0);

        console.log(`
╔════════════════════════════════════════════════════════════════╗
║  🚀 Claude Code CLI Localhost Proxy                            ║
║                                                                 ║
║  ✅ Running on http://localhost:${PORT}                            ║
║  ${cliAvailable ? '✅' : '❌'} Claude CLI: ${cliAvailable ? 'Available' : 'NOT FOUND'}                              ║
║  ${cliAvailable ? '✅' : '❌'} Connected to Claude Code                             ║
║                                                                 ║
${!cliAvailable ? `║  ⚠️  WARNING: Claude CLI not found!                            ║
║                                                                 ║
║  Make sure Claude Code is installed:                           ║
║  npm install -g @anthropics/claude-code                        ║
║                                                                 ║
║  Or check if it's in your PATH:                                ║
║  which claude                                                  ║
║                                                                 ║
` : ''}║  Next Steps:                                                   ║
║  1. Keep this running in your terminal                         ║
║  2. Open agent-builder-wizard/index-ai.html                    ║
║  3. Start building agents with your local Claude Code!         ║
║                                                                 ║
║  Test: curl http://localhost:${PORT}/health                        ║
╚════════════════════════════════════════════════════════════════╝
        `);

        if (!cliAvailable) {
            console.log('\n⚠️  Test if Claude Code is available: claude --version\n');
        }
    });
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down proxy...');

    // Cleanup temp directory
    try {
        const files = require('fs').readdirSync(TEMP_DIR);
        files.forEach(file => {
            if (file.startsWith('prompt-')) {
                unlinkSync(join(TEMP_DIR, file));
            }
        });
    } catch (e) {
        // Ignore cleanup errors
    }

    server.close(() => {
        console.log('✅ Proxy stopped');
        process.exit(0);
    });
});
