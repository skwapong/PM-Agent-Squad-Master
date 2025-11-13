# PM Agent Squad Master - Quick Reference

## 🚀 Quick Commands

### Development
```bash
npm run dev              # Start dev server (development mode)
npm run dev:staging      # Start dev server (staging mode)
```

### Building
```bash
npm run build                  # Production build
npm run build:staging          # Staging build
npm run build:production       # Production build (explicit)
```

### Testing & Validation
```bash
npm test                 # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report
npm run validate:kb      # Validate knowledge bases
npm run validate:kb:verbose  # Verbose KB validation
```

### Configuration
```bash
npm run config:edit      # Open visual config editor
```

### Deployment
```bash
npm run deploy                 # Deploy to production
npm run deploy:staging         # Deploy to staging
node scripts/deploy.js <env> <platform>  # Custom deployment
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `agent.config.json` | Agent configuration |
| `agents.config.json` | Multi-agent configuration |
| `deployment.config.json` | Deployment settings |
| `.env` | Environment variables |
| `.env.example` | Environment template |
| `package.json` | Dependencies & scripts |

## 🔧 Configuration Files

### Environment Variables (.env)
```bash
# Copy template
cp .env.example .env

# Edit configuration
nano .env
```

### Agent Configuration
```bash
# Visual editor (recommended)
npm run config:edit

# Manual editing
nano agent.config.json
```

### Multi-Agent Setup
```bash
# Enable multi-agent
nano agents.config.json
# Set multiAgentEnabled: true
```

## 📚 Knowledge Bases

### Location
```
Agent_Knowledge_Bases/
├── KB1_*.md
├── KB2_*.md
└── ...
```

### Validate
```bash
npm run validate:kb
```

### Requirements
- Markdown format (.md)
- Under 18,000 characters
- UTF-8 encoding
- Valid Markdown syntax

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Watch Mode
```bash
npm test -- --watch
```

### Coverage
```bash
npm run test:coverage
```

### Test Files
```
tests/
├── setup.js
├── agent-config.test.js
└── config/
    └── env.test.js
```

## 🔌 Plugins

### Enable Plugins
```env
# In .env file
VITE_ENABLED_PLUGINS=analytics,slack,my-plugin
```

### Built-in Plugins
- `analytics` - Google Analytics & custom tracking
- `slack` - Slack webhook integration

### Create Custom Plugin
```javascript
// src/plugins/my-plugin.js
export default {
  name: 'my-plugin',
  version: '1.0.0',

  async initialize() {
    console.log('Plugin loaded');
  },

  hooks: {
    onMessageSent: async (message) => message,
  },
};
```

### Register Plugin
```javascript
import pluginManager from './src/plugins/plugin-manager.js';
import myPlugin from './src/plugins/my-plugin.js';

pluginManager.register(myPlugin);
await pluginManager.initialize();
```

## 🌍 Environments

### Development
```bash
npm run dev
# URL: http://localhost:5173
# Features: Debug mode, mock Bedrock
```

### Staging
```bash
npm run deploy:staging
# Features: Real Bedrock, analytics, debug logs
```

### Production
```bash
npm run deploy
# Features: Optimized, analytics, error tracking
```

## 📦 Deployment

### Vercel
```bash
npm run deploy              # Production
npm run deploy:staging      # Staging
```

### Netlify
```bash
node scripts/deploy.js production netlify
node scripts/deploy.js staging netlify
```

### AWS S3
```bash
node scripts/deploy.js production aws-s3
```

## 🎨 Visual Config Editor

### Start Editor
```bash
npm run config:edit
# Opens: http://localhost:5174
```

### Features
- Agent settings
- Quick actions editor
- Knowledge bases manager
- Theme customization
- Download updated config

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### Validation Errors
```bash
# Check knowledge bases
npm run validate:kb:verbose

# Check environment
node -e "import('./src/config/env.js').then(m => console.log(m.validateEnv()))"
```

### Test Failures
```bash
# Run specific test
npm test -- agent-config.test.js

# Debug mode
npm test -- --reporter=verbose
```

## 🔐 Security

### Environment Variables
- Never commit `.env` to git
- Use `.env.example` as template
- Rotate credentials regularly
- Use IAM roles in production

### Plugin Security
- Only install trusted plugins
- Review plugin code
- Enable only needed plugins
- Monitor plugin activity

## 📊 Analytics

### Enable Analytics
```env
VITE_ENABLE_ANALYTICS=true
VITE_GA_TRACKING_ID=your-ga-id
```

### Custom Analytics
```env
VITE_ANALYTICS_ENDPOINT=https://your-analytics.com/api
```

### Tracked Events
- `message_sent` - User sends message
- `response_received` - Agent responds
- `quick_action_clicked` - Quick action used
- Custom events via plugins

## 🚨 Error Tracking

### Sentry Integration
```env
VITE_SENTRY_DSN=your-sentry-dsn
```

### Slack Notifications
```env
VITE_SLACK_WEBHOOK_URL=your-webhook-url
VITE_ENABLED_PLUGINS=slack
```

## 🔄 Multi-Agent

### Enable Multi-Agent
```json
// agents.config.json
{
  "multiAgentEnabled": true,
  "agents": [...]
}
```

### Switch Agents
```javascript
import agents from './src/config/agents.js';
await agents.switchAgent('agent-id');
```

### Agent Routes
- `/` - Default agent
- `/hr` - HR assistant
- `/support` - Customer support
- Custom routes in config

## 📖 Documentation

| Document | Description |
|----------|-------------|
| README.md | Main documentation |
| TEMPLATE_GUIDE.md | Customization guide |
| IMPLEMENTATION_SUMMARY.md | Features reference |
| QUICK_REFERENCE.md | This file |
| plugins/README.md | Plugin development |

## 🆘 Getting Help

1. Check TEMPLATE_GUIDE.md
2. Review IMPLEMENTATION_SUMMARY.md
3. Run validation: `npm run validate:kb`
4. Check tests: `npm test`
5. Enable debug: `VITE_ENABLE_DEBUG_MODE=true`

## 🎯 Common Tasks

### Add New Quick Action
```bash
# Use visual editor
npm run config:edit
# Go to "Quick Actions" tab
# Click "Add Action"
```

### Add Knowledge Base
```bash
# Add file to Agent_Knowledge_Bases/
echo "# New KB" > Agent_Knowledge_Bases/KB12_New.md

# Update agent.config.json
# Add "KB12_New.md" to knowledgeBases.files

# Validate
npm run validate:kb
```

### Change Agent Name
```bash
# Use visual editor
npm run config:edit
# Or edit agent.config.json manually
```

### Deploy to New Environment
```bash
# Create .env file
cp .env.example .env.mynewenv

# Edit environment-specific settings
nano .env.mynewenv

# Build
npm run build -- --mode mynewenv

# Deploy
vercel deploy
```

## 📝 Cheat Sheet

```bash
# Setup new project
./setup.sh

# Daily development
npm run dev
npm test
npm run validate:kb

# Before commit
npm test
npm run validate:kb
npm run build

# Deploy staging
npm run build:staging
npm run deploy:staging

# Deploy production
npm run build:production
npm run deploy

# Edit config visually
npm run config:edit

# Check environment
node -e "import('./src/config/env.js').then(m => console.log(m.default))"
```

---

**Version:** 2.0.0
**Last Updated:** November 12, 2025
**Status:** ✅ Production Ready
