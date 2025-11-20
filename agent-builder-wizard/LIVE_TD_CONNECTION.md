# Live TD Database Connection Setup

## Overview

The Agent Builder Wizard now supports **live connections** to Treasure Data (TD) databases via the TD MCP (Model Context Protocol). You can fetch real databases and tables directly from your TD1 account.

## Features

✅ **Live Database Fetching** - Fetch 15,000+ databases from TD1 account in real-time
✅ **Live Table Fetching** - Fetch tables from any selected database
✅ **No Static Files** - Data is always fresh from TD
✅ **Automatic Parsing** - JSON responses parsed and formatted automatically

## Quick Start

### 1. Start the Proxy Server

The proxy server runs on `localhost:3333` and acts as a bridge between the wizard and TD MCP.

```bash
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard
node local-proxy-server.js
```

You should see:
```
✅ Agent Builder Wizard - Local Proxy Server
🌐 Running on: http://localhost:3333
📡 Endpoint: http://localhost:3333/chat
💡 Ready to accept requests from Agent Builder Wizard
```

### 2. Open the Wizard

```bash
open index-ai.html
```

Or navigate to: `file:///Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard/index-ai.html`

### 3. Use Database Knowledge Bases

1. In the wizard, go to **Step 1: Knowledge Bases**
2. Click **"+ Add Knowledge Base"**
3. Select **"🗄️ Database (TD Audience Data)"** as the type
4. Click **"🔄 Fetch from TD"** button
5. Wait for databases to load (15,874 databases from TD1)
6. Select a database from the dropdown
7. Click **"🔄 Fetch Tables"** button
8. Select a table from the dropdown

## How It Works

### Architecture

```
Wizard (Browser)
    ↓ HTTP
Local Proxy Server (localhost:3333)
    ↓ Spawn Process
TD MCP Server (@treasuredata/mcp-server)
    ↓ API Call
Treasure Data (TD1 account)
```

### Endpoints

#### GET /td/databases
Fetches all databases from TD1 account.

**Response:**
```json
{
  "databases": ["000", "0000c", "alex_cameron_llm_agent_database", ...],
  "total": 15874,
  "timestamp": "2025-11-19T17:34:29.823Z"
}
```

#### GET /td/tables/:database
Fetches all tables from a specific database.

**Response:**
```json
{
  "database": "alex_cameron_llm_agent_database",
  "tables": ["table1", "table2", ...],
  "total": 42,
  "timestamp": "2025-11-19T17:35:15.123Z"
}
```

## Configuration

The proxy server uses these environment variables (with defaults):

```javascript
TD_API_KEY = '1/ea89d2d2294a812e542b0f52db328da3248c0a5f'  // Your TD API key
TD_SITE = 'dev'                                            // TD region
TD_ACCOUNT = 'TD1'                                         // TD account name
```

To override, set environment variables before starting:

```bash
export TD_API_KEY="your-key"
export TD_SITE="us01"
export TD_ACCOUNT="your-account"
node local-proxy-server.js
```

## Files Modified

### local-proxy-server.js
- Added `/td/databases` endpoint
- Added `/td/tables/:database` endpoint
- Added `callTDMCP()` function to spawn TD MCP server

### wizard-ai.js
- Updated `fetchTDDatabases()` to call `http://localhost:3333/td/databases`
- Updated `fetchTDTables()` to call `http://localhost:3333/td/tables/:database`
- Both functions now populate dropdowns with live data

## Troubleshooting

### Error: "Make sure local proxy server is running"

**Solution:** Start the proxy server:
```bash
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard
node local-proxy-server.js
```

### Error: "EADDRINUSE: address already in use :::3333"

**Solution:** Kill the existing server and restart:
```bash
pkill -f "local-proxy-server.js"
node local-proxy-server.js
```

### Databases not loading in wizard

**Solution:**
1. Check that proxy server is running
2. Check browser console for errors
3. Verify TD MCP is configured: `claude mcp list`
4. Test endpoint directly: `curl http://localhost:3333/td/databases`

### TD MCP not configured

**Solution:**
```bash
claude mcp add td -e TD_API_KEY=1/ea89d2d2294a812e542b0f52db328da3248c0a5f -e TD_SITE=dev -e TD_ACCOUNT=TD1
```

## Testing

Test the endpoints directly:

```bash
# Test databases endpoint
curl http://localhost:3333/td/databases | python3 -m json.tool | head -30

# Test tables endpoint
curl http://localhost:3333/td/tables/alex_cameron_llm_agent_database | python3 -m json.tool
```

## Performance

- **Database fetch:** ~2-3 seconds for 15,874 databases
- **Table fetch:** ~1-2 seconds per database
- **Data size:** ~490KB for database list (uncompressed)

## Next Steps

Future improvements:
- [ ] Cache database list locally (1 hour TTL)
- [ ] Add search/filter for 15K+ databases
- [ ] Show table schema on selection
- [ ] Support for table column descriptions
- [ ] Query builder for database KBs

## Credits

Built for the PM Agent Squad Master project using:
- **TD MCP Server:** `@treasuredata/mcp-server`
- **TD API:** Treasure Data dev environment
- **Account:** TD1
