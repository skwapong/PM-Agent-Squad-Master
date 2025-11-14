# Enterprise Backend for Agent Builder Wizard

**Purpose:** Secure backend proxy for Claude API calls using enterprise credentials.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your enterprise API key
nano .env
```

### 3. Start Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

### 4. Test
```bash
# Health check
curl http://localhost:3000/health

# Status check
curl http://localhost:3000/api/status

# Test chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, I want to build a campaign agent"}'
```

---

## 📡 API Endpoints

### Health Check
```
GET /health
```
Returns server status and configuration.

### Status Check
```
GET /api/status
```
Returns API key configuration status.

### Chat (Non-Streaming)
```
POST /api/chat
Body: {
  "message": "User message",
  "history": [...],
  "systemPrompt": "Optional custom system prompt"
}
```

### Chat (Streaming)
```
POST /api/chat/stream
Body: {
  "message": "User message",
  "history": [...],
  "systemPrompt": "Optional"
}
```
Returns Server-Sent Events (SSE) stream.

### Generate Knowledge Bases
```
POST /api/generate-kbs
Body: {
  "description": "Agent description",
  "domain": "marketing|hr|support|it|sales"
}
```

### Generate System Prompt
```
POST /api/generate-prompt
Body: {
  "description": "Agent description",
  "domain": "marketing",
  "tone": "professional",
  "audience": "marketers"
}
```

---

## 🔒 Security

### API Key Storage
- ✅ Stored in `.env` file (never committed)
- ✅ Loaded via environment variables
- ✅ Never exposed to frontend

### CORS
- Configured to allow only specific origins
- Update `ALLOWED_ORIGINS` in `.env`

### Rate Limiting
- Default: 100 requests per 15 minutes
- Configure in `.env`

---

## 🚀 Deployment

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t agent-builder-backend .
docker run -p 3000:3000 --env-file .env agent-builder-backend
```

### Vercel/Netlify Functions
The endpoints can be adapted to serverless functions.

### AWS/GCP/Azure
Deploy as standard Node.js application.

---

## 📊 Monitoring

### Logs
All requests are logged to console with:
- Timestamp
- Endpoint
- Message preview
- Error details (if any)

### Metrics to Track
- Request count
- Response times
- Token usage
- Error rates

---

## 🔧 Development

### Run in Dev Mode
```bash
npm run dev
```
Uses `nodemon` for auto-reload on file changes.

### Environment Variables
```bash
# Required
ANTHROPIC_API_KEY=sk-ant-...

# Optional
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:8000
```

---

## ✅ Testing

### Manual Test
```bash
# Chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I want to build a marketing campaign agent",
    "history": []
  }'

# Streaming endpoint
curl -N -X POST http://localhost:3000/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about campaign agents",
    "history": []
  }'
```

---

## 🆘 Troubleshooting

### Error: API Key Not Configured
```
Check: .env file exists and has ANTHROPIC_API_KEY set
```

### Error: CORS Error
```
Update: ALLOWED_ORIGINS in .env to include your frontend URL
```

### Error: Port Already in Use
```
Change: PORT in .env to different port (e.g., 3001)
```

---

**Version:** 1.0.0
**Last Updated:** November 13, 2025
