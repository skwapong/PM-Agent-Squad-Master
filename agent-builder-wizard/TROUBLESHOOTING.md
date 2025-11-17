# Troubleshooting Guide

## Common Issues and Solutions

### Issue: "Claude CLI failed to respond" or "No output"

**Symptoms:**
```
📝 Prompt file created: /Users/username/.../prompt-xxxxx.txt
🤖 Calling Claude Code CLI...
❌ Claude CLI error: No output
❌ Error: Claude CLI failed to respond
```

**Root Cause:**
The Claude Code CLI is not properly responding to stdin input. This can happen due to:
1. Authentication issues
2. CLI running in interactive mode instead of batch mode
3. Version incompatibility
4. Proxy configuration issues

---

### Solution 1: Verify Claude CLI Installation and Authentication

**Step 1: Check if Claude CLI is installed**
```bash
claude --version
```

Expected output: `claude-code version x.x.x` or similar

If you get "command not found":
```bash
# Install Claude Code CLI
npm install -g @anthropics/claude-code

# Verify installation
claude --version
```

**Step 2: Check authentication status**
```bash
claude auth status
```

If not authenticated, login:
```bash
claude auth login
```

Follow the prompts to authenticate with your Anthropic account.

**Step 3: Test Claude CLI directly**
```bash
echo "Hello, can you respond to this?" | claude chat
```

You should see a response from Claude. If this works, the proxy should work too.

---

### Solution 2: Update the Proxy to Use Alternative Method

If `claude chat` doesn't work with stdin, try using a file-based approach:

**Edit `claude-code-proxy.cjs`:**

Replace the `callClaudeCLI` function with this alternative implementation:

```javascript
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

        // Write prompt to temp file
        const promptFile = join(TEMP_DIR, `prompt-${Date.now()}.txt`);
        writeFileSync(promptFile, fullPrompt, 'utf8');

        console.log('📝 Prompt file created:', promptFile);
        console.log('🤖 Calling Claude Code CLI with file...');

        // Try using file input instead of stdin
        const claude = spawn('claude', ['chat', '-f', promptFile], {
            stdio: ['inherit', 'pipe', 'pipe'],
            env: { ...process.env }
        });

        let stdout = '';
        let stderr = '';

        claude.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        claude.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        claude.on('close', (code) => {
            // Clean up temp file
            try {
                if (existsSync(promptFile)) {
                    unlinkSync(promptFile);
                }
            } catch (e) {
                console.error('Failed to cleanup temp file:', e.message);
            }

            if (stdout.trim()) {
                console.log('✅ Claude response received');
                resolve(stdout.trim());
            } else {
                console.error('❌ Claude CLI error:', stderr || 'No output');
                reject(new Error(stderr || 'Claude CLI failed to respond'));
            }
        });

        claude.on('error', (error) => {
            console.error('❌ Failed to spawn Claude CLI:', error.message);
            reject(new Error(`Failed to execute Claude Code CLI: ${error.message}`));
        });
    });
}
```

---

### Solution 3: Check Claude CLI Help

Check what commands and options are available:

```bash
claude --help
claude chat --help
```

Look for options related to:
- Reading from stdin
- File input (`-f`, `--file`)
- Non-interactive mode
- Batch processing

---

### Solution 4: Alternative - Use HTTP API Instead

If the CLI continues to have issues, you can switch to using the Anthropic HTTP API directly:

**Create a `.env` file in `agent-builder-wizard/` directory:**
```env
ANTHROPIC_API_KEY=your_api_key_here
```

**Update the proxy to use HTTP API:**

Add this at the top of `claude-code-proxy.cjs`:
```javascript
require('dotenv').config();
```

Replace `callClaudeCLI` with:
```javascript
async function callClaudeAPI(userMessage, conversationHistory = []) {
    const API_KEY = process.env.ANTHROPIC_API_KEY;

    if (!API_KEY) {
        throw new Error('ANTHROPIC_API_KEY not found in environment variables');
    }

    const messages = [];

    // Add conversation history
    conversationHistory.forEach(msg => {
        messages.push({
            role: msg.role,
            content: msg.content
        });
    });

    // Add current message
    messages.push({
        role: 'user',
        content: userMessage
    });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            system: SYSTEM_PROMPT,
            messages: messages
        })
    });

    const data = await response.json();

    if (data.content && data.content[0] && data.content[0].text) {
        return data.content[0].text;
    } else {
        throw new Error('Invalid API response');
    }
}
```

---

### Solution 5: Enable Debug Logging

Get more detailed logs to diagnose the issue:

**Add this to the top of `claude-code-proxy.cjs`:**
```javascript
const DEBUG = true;

function debug(...args) {
    if (DEBUG) {
        console.log('[DEBUG]', ...args);
    }
}
```

**Add debug statements throughout the code:**
```javascript
debug('Spawning claude with args:', ['chat']);
debug('Prompt length:', fullPrompt.length);
debug('stdin writable:', claude.stdin.writable);
```

---

### Solution 6: Check for Conflicting Processes

Make sure no other processes are interfering:

```bash
# Check if port 3333 is already in use
lsof -i :3333

# If something is using it, kill it:
kill -9 [PID]

# Restart the proxy
node claude-code-proxy.cjs
```

---

### Solution 7: Permissions and PATH Issues

**Check PATH:**
```bash
echo $PATH
which claude
```

The `claude` command should be in your PATH.

**If using nvm or similar:**
```bash
# Make sure you're using the right Node version
nvm use stable

# Reinstall Claude CLI
npm install -g @anthropics/claude-code
```

---

## Getting Help

If none of these solutions work, please provide the following information when asking for help:

1. **Output of diagnostic commands:**
   ```bash
   claude --version
   claude auth status
   node --version
   npm --version
   which claude
   echo $PATH
   ```

2. **Full error output from the proxy server**

3. **Operating system and version:**
   ```bash
   uname -a  # Mac/Linux
   # or
   ver  # Windows
   ```

4. **Test if this works:**
   ```bash
   echo "test" | claude chat
   ```

5. **Contents of the temp prompt file** (look in `.temp/` directory when the error occurs)

---

## Quick Diagnostic Script

Save this as `diagnose.sh` and run it:

```bash
#!/bin/bash

echo "=== Claude Code CLI Diagnostic ==="
echo ""

echo "1. Checking Claude CLI installation..."
if command -v claude &> /dev/null; then
    echo "✅ Claude CLI found"
    claude --version
else
    echo "❌ Claude CLI not found"
    echo "   Install with: npm install -g @anthropics/claude-code"
fi

echo ""
echo "2. Checking authentication..."
claude auth status

echo ""
echo "3. Testing stdin pipe..."
echo "Hello from diagnostic script" | claude chat

echo ""
echo "4. Checking Node.js..."
node --version

echo ""
echo "5. Checking npm..."
npm --version

echo ""
echo "6. Checking if port 3333 is available..."
if lsof -i :3333 &> /dev/null; then
    echo "⚠️  Port 3333 is in use:"
    lsof -i :3333
else
    echo "✅ Port 3333 is available"
fi

echo ""
echo "=== Diagnostic Complete ==="
```

Make it executable and run:
```bash
chmod +x diagnose.sh
./diagnose.sh
```

---

## Still Having Issues?

Create an issue on GitHub with:
- Output from the diagnostic script
- Full error logs from the proxy
- Your operating system

Repository: https://github.com/skwapong/PM-Agent-Squad-Master/issues
