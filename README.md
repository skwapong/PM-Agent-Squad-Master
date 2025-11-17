# PM Agent Squad Master 🚀

A universal, production-ready template for building custom AI agents for Amazon Bedrock Agent Foundry. This template includes everything you need to create, customize, and deploy your own AI agent with a professional chat interface.

---

## 📖 Documentation for Team Members

- **🚀 [Quick Start Guide](QUICK_START.md)** - Get started in 5 minutes
- **📘 [Complete User Guide](USER_GUIDE.md)** - Comprehensive guide for colleagues
- **🔄 [How to Get Latest Version](USER_GUIDE.md#-getting-the-latest-version-recommended-workflow)** - Always stay updated

> **New to this project?** Start with the [Quick Start Guide](QUICK_START.md)!

---

## ✨ Features

### 🎯 NEW: Agent Builder Wizard
- **🎨 Interactive UI** - Browser-based wizard for building agents step-by-step
- **🎓 Domain Suggestions** - Pre-configured templates for HR, Support, IT, Sales, Marketing
- **✅ Real-Time Validation** - Character count warnings, required field checks
- **📝 Smart Templates** - Pre-filled system prompts based on your domain
- **💾 File Generation** - Download ready-to-deploy knowledge bases and configs
- **🚀 Zero Setup Required** - Open HTML file and start building

### Core Features
- **🎯 Fully Customizable Agent Configuration** - Easy-to-use config file for all agent settings
- **💬 Professional Chat Interface** - React-based UI with quick action buttons
- **📚 Knowledge Base System** - Markdown-based knowledge bases (optimized for Bedrock)
- **🚀 Ready-to-Deploy** - Pre-configured for Vercel, Netlify, AWS, and more
- **⚡ Quick Setup Script** - Automated setup wizard for fast customization
- **📖 Comprehensive Documentation** - Detailed guides and examples
- **🎨 Customizable UI** - Modern, responsive design with Tailwind CSS

### Advanced Features
- **🔧 Environment Variables Support** - Manage configs across dev/staging/production
- **✅ Knowledge Base Validation** - Auto-validate KB files before deployment
- **🧪 Testing Framework** - Built-in Vitest testing with React Testing Library
- **🎨 Visual Configuration Editor** - GUI for editing agent configs (no code needed)
- **🤖 Multi-Agent Support** - Deploy multiple agents with route-based switching
- **🚀 Deployment Profiles** - Environment-specific builds and deployment automation
- **🔌 Plugin System** - Extensible hook-based architecture for custom functionality
- **📚 Complete Agent Foundry Guides** - 7 comprehensive Markdown guides for AWS Bedrock

## 🎯 Perfect For

- Marketing Teams building campaign planning agents
- HR departments creating employee support bots
- Customer Service teams deploying support agents
- Product Teams building documentation assistants
- IT Teams creating technical support agents
- Any team needing a custom AI agent solution

## 📦 What's Included

```
PM-Agent-Squad-Master/
│
├── 🎯 AGENT BUILDER WIZARD (NEW! Start Here)
│   └── agent-builder-wizard/
│       ├── index.html                     # Interactive wizard UI
│       ├── wizard.js                      # Wizard functionality
│       └── README.md                      # Wizard documentation
│
├── 📋 TEMPLATE FILES (Customize These)
│   ├── 🎛️  agent.config.json              # Central agent configuration
│   ├── 🤖 agents.config.json              # Multi-agent support config
│   ├── 🔧 setup.sh                        # Automated setup wizard
│   ├── 💬 Agent_Chat_Interface.jsx        # Chat UI component
│   ├── 🌍 .env.example                    # Environment variables template
│   └── 🚀 deployment.config.json          # Deployment profiles
│
├── 📖 REFERENCE GUIDES (How-To Documentation)
│   └── Reference Files/                # Agent Foundry guides (7 comprehensive .md files)
│       ├── 01_Create_Knowledge_Base_Guide.md
│       ├── 02_Create_Project_Guide.md
│       ├── 03_Create_Agents_Guide.md
│       ├── 04_Add_Tools_Guide.md
│       ├── 05_Add_Output_Guide.md
│       ├── 06_Add_Prompt_Variables_Guide.md
│       └── 07_Model_Comparison_Guide.md
│
├── 📤 YOUR CONTENT GOES HERE
│   ├── 📚 Agent_Knowledge_Bases/          # Create YOUR knowledge bases here
│   │   ├── KB1_SAMPLE_Knowledge_Base_Template.md  # Sample template
│   │   ├── KB2_SAMPLE_Knowledge_Base_Template.md  # Sample template
│   │   ├── KB3_SAMPLE_Knowledge_Base_Template.md  # Sample template
│   │   └── examples/                               # Full marketing examples (for reference)
│   │
│   └── ⚙️  Agent_Config/                   # Example: Campaign agent configuration
│       ├── 01_Create_Agent.md              # Example configuration guide
│       ├── 02_Add_Tools_Knowledge_Bases.md # Example tools setup
│       ├── 03_Add_Output.md                # Example output formats
│       └── AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md
│
├── 🔧 DEVELOPMENT INFRASTRUCTURE
│   ├── 🔌 src/
│   │   ├── config/                       # Environment & agent configs
│   │   └── plugins/                      # Plugin system & examples
│   ├── 🧪 tests/                          # Test suite (Vitest)
│   ├── 📝 scripts/
│   │   ├── validate-kb.js                # KB validation tool
│   │   └── deploy.js                     # Deployment automation
│   └── 🎨 config-editor/                  # Visual configuration editor
│
└── 📚 DOCUMENTATION
    ├── 📖 TEMPLATE_GUIDE.md                    # Complete customization guide
    ├── 📋 TEMPLATE_VS_EXAMPLES_GUIDE.md        # Template vs Examples distinction
    ├── ⚡ QUICK_REFERENCE.md                   # Command cheat sheet
    └── 📘 README.md                            # This file
```

### 🎯 Key Distinction

**Template Files** = What you customize for your agent
**Reference Guides** = Instructions on how to configure Agent Foundry
**Your Content** = Sample templates + examples folder (create your KBs here)
**Infrastructure** = Development tools (use as-is)

## 🔄 What to Customize vs. What to Keep

### ✏️ CUSTOMIZE THESE (Your Agent's Content)

**1. Knowledge Bases** (`Agent_Knowledge_Bases/`)
- **Current:** 3 sample templates + examples folder with marketing KBs
- **Action:** Create YOUR domain knowledge bases
- **How:** Use sample templates as starting point, see examples folder for reference
- **Examples by Domain:**
  - HR: Employee policies, benefits, procedures
  - Support: Product docs, FAQs, troubleshooting
  - IT: System documentation, setup guides

**2. Agent Configuration** (`Agent_Config/`)
- **Current:** Campaign strategist configuration example
- **Action:** Use as a template for YOUR agent configuration
- **Files:**
  - `01_Create_Agent.md` - Shows campaign agent setup (adapt for your domain)
  - `02_Add_Tools_Knowledge_Bases.md` - Shows tool configuration (adapt for your KBs)
  - `03_Add_Output.md` - Shows output formats (adapt for your needs)

**3. Agent Identity** (`agent.config.json`)
- **Current:** Campaign Strategist branding
- **Action:** Change name, description, icon, welcome message
- **Result:** Your agent's personality and appearance

### 📚 USE THESE (Reference Documentation)

**Reference Files** (`Reference Files/01-07`)
- **Purpose:** Instructions for configuring AWS Bedrock Agent Foundry
- **Action:** Follow these guides when setting up YOUR agent
- **Content:** Universal how-to guides (not domain-specific)

### 🔧 KEEP THESE (Infrastructure)

**Development Tools** (`src/`, `tests/`, `scripts/`)
- **Purpose:** Template functionality (validation, testing, deployment)
- **Action:** Use as-is, no changes needed
- **Benefit:** Ready-to-use development environment

---

## 📘 Need Help Understanding What to Change?

**→ Read [TEMPLATE_VS_EXAMPLES_GUIDE.md](TEMPLATE_VS_EXAMPLES_GUIDE.md)**

This comprehensive guide explains:
- ✅ What files are templates vs. examples
- ✅ What to customize for YOUR agent
- ✅ What to keep as-is
- ✅ Step-by-step agent building process
- ✅ Examples for HR, Support, and IT domains

---

## 🚀 Quick Start

### Option 1: Agent Builder Wizard (NEW! 🎉 Easiest Way)

**Interactive UI that guides you step-by-step through building your agent:**

```bash
# Open the wizard in your browser
cd PM-Agent-Squad-Master/agent-builder-wizard
open index.html

# OR use a local server (recommended)
python3 -m http.server 8000
# Then navigate to: http://localhost:8000/index.html
```

**What the wizard does:**
- ✅ **Step 1:** Create knowledge bases with domain suggestions (HR, Support, IT, Sales, Marketing)
- ✅ **Step 2:** Configure your project settings
- ✅ **Step 3:** Set up your AI agent (choose from 30+ models)
- ✅ **Step 4:** Configure tools and outputs
- ✅ **Step 5:** Download all files ready for AWS Bedrock deployment

**Features:**
- 🎯 Domain-based suggestions for knowledge bases
- ✅ Real-time validation (character limits, required fields)
- 📝 Pre-filled system prompt templates
- 💾 Download ready-to-deploy configuration files
- 📖 Step-by-step guidance through correct workflow

**See:** [agent-builder-wizard/README.md](agent-builder-wizard/README.md) for complete wizard documentation.

---

### Option 2: Automated Setup Script

```bash
# Clone or download this template
cd PM-Agent-Squad-Master

# Run the setup script
./setup.sh

# Follow the prompts to customize your agent
```

### Option 3: Manual Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Update agent configuration
# Edit agent.config.json with your agent details

# Customize knowledge bases
# Edit files in Agent_Knowledge_Bases/

# Validate knowledge bases (optional)
npm run validate:kb

# Start development server
npm run dev
```

## 📝 Configuration

### agent.config.json

The central configuration file for your agent:

```json
{
  "agent": {
    "name": "Your Agent Name",
    "displayName": "Display Name",
    "description": "Agent description",
    "welcomeMessage": "Welcome message",
    "icon": "🤖",
    "color": "#6366f1"
  },
  "quickActions": [...],
  "knowledgeBases": {...},
  "deployment": {...}
}
```

### Knowledge Bases

Create your agent's knowledge in `Agent_Knowledge_Bases/`:

**Getting Started:**
- Start with `KB1_SAMPLE_Knowledge_Base_Template.md` as a guide
- Review `examples/` folder for complete marketing KB examples
- Create files named `KB1_YourTopic.md`, `KB2_YourTopic.md`, etc.

**Requirements:**
- Use Markdown (.md) format
- Keep files under 18,000 characters
- Organize by topic or domain
- Include examples and best practices

**See:** `Agent_Knowledge_Bases/README.md` for detailed guidelines

### Quick Actions

Pre-defined prompts triggered by button clicks:

```json
{
  "id": "unique-id",
  "label": "Button Text",
  "icon": "lightning",
  "prompt": "Prompt to send",
  "category": "category"
}
```

## 🎨 Customization

### Basic Customization

1. **Agent Identity**
   - Update name, description, and welcome message
   - Choose an icon/emoji
   - Set brand colors

2. **Knowledge Bases**
   - Replace example knowledge with your content
   - Organize information by topic
   - Include FAQs and common scenarios

3. **Quick Actions**
   - Define helpful shortcuts for users
   - Create category-specific actions
   - Customize prompts for your use case

### Advanced Customization

See [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) for:
- Custom UI styling
- API integrations
- Multi-language support
- Advanced agent configurations

## 🏗️ Use Case Examples

### Example 1: Customer Support Agent

```json
{
  "agent": {
    "name": "Support Bot",
    "description": "24/7 customer support assistant",
    "icon": "💬"
  },
  "quickActions": [
    {"label": "Track Order", "prompt": "Help me track my order"},
    {"label": "Return Request", "prompt": "I need to return a product"},
    {"label": "Product Help", "prompt": "I need help with a product"}
  ]
}
```

### Example 2: HR Assistant

```json
{
  "agent": {
    "name": "HR Assistant",
    "description": "Employee support and HR policy guide",
    "icon": "👥"
  },
  "quickActions": [
    {"label": "Request Time Off", "prompt": "How do I request time off?"},
    {"label": "Benefits Info", "prompt": "Tell me about benefits"},
    {"label": "Company Policies", "prompt": "Show me company policies"}
  ]
}
```

### Example 3: Technical Documentation Agent

```json
{
  "agent": {
    "name": "Tech Docs",
    "description": "Developer documentation assistant",
    "icon": "📚"
  },
  "quickActions": [
    {"label": "API Reference", "prompt": "Show me API documentation"},
    {"label": "Quick Start", "prompt": "How do I get started?"},
    {"label": "Code Examples", "prompt": "Show me code examples"}
  ]
}
```

## 🚀 Deployment

### Vercel (One-Click Deploy)

```bash
npm run deploy
```

Or click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify

1. Connect repository
2. Build: `npm run build`
3. Publish: `dist/`

### AWS S3 + CloudFront

```bash
npm run build
aws s3 sync dist/ s3://your-bucket
```

### Other Platforms

- GitHub Pages
- Azure Static Web Apps
- Google Cloud Storage
- Any static hosting service

## 📚 Amazon Bedrock Agent Foundry Setup

1. **Navigate to Agent Foundry Console**
   - Open AWS Console
   - Go to Amazon Bedrock → Agent Foundry

2. **Create New Agent**
   - Follow step-by-step guides in `Agent_Config/`
   - Start with `01_Create_Agent.md` for agent configuration
   - Upload knowledge bases from `Agent_Knowledge_Bases/`

3. **Configure Agent**
   - Add tools and knowledge bases per `02_Add_Tools_Knowledge_Bases.md`
   - Set output preferences per `03_Add_Output.md`
   - Test and deploy

See `Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md` for detailed steps.

## 🛠️ Development

### Available Scripts

#### Core Commands
```bash
npm run dev                  # Start development server
npm run build                # Build for production
npm run preview              # Preview production build
```

#### Environment-Specific Commands
```bash
npm run dev:staging          # Start in staging mode
npm run build:staging        # Build for staging
npm run build:production     # Build for production
```

#### Validation & Testing
```bash
npm run validate:kb          # Validate knowledge base files
npm run validate:kb:verbose  # Detailed validation output
npm test                     # Run test suite
npm run test:watch           # Run tests in watch mode
npm run test:ui              # Open Vitest UI
npm run test:coverage        # Generate coverage report
```

#### Configuration
```bash
npm run config:edit          # Open visual config editor
npm run config:validate      # Validate configuration files
```

#### Deployment
```bash
npm run deploy               # Deploy to default environment
npm run deploy:staging       # Deploy to staging
npm run deploy:production    # Deploy to production
```

### Project Structure

#### Core Files
- **Agent_Chat_Interface.jsx** - Main chat UI component
- **agent.config.json** - Agent configuration
- **agents.config.json** - Multi-agent configuration
- **package.json** - Dependencies and scripts

#### Configuration
- **.env.example** - Environment variables template
- **.env.development** - Development environment config
- **.env.staging** - Staging environment config
- **.env.production** - Production environment config
- **deployment.config.json** - Deployment profiles
- **vitest.config.js** - Test framework configuration
- **vite.config.editor.js** - Config editor setup

#### Source Code
- **src/config/env.js** - Environment configuration loader
- **src/config/agents.js** - Agent management utilities
- **src/plugins/plugin-manager.js** - Plugin system core
- **src/plugins/analytics-plugin.js** - Example analytics plugin
- **src/plugins/slack-plugin.js** - Example Slack plugin

#### Knowledge & Documentation
- **Agent_Knowledge_Bases/** - Knowledge base markdown files (.md)
- **Reference Files/** - 7 comprehensive Agent Foundry guides
- **Agent_Config/** - Bedrock deployment configuration

#### Tools & Scripts
- **scripts/validate-kb.js** - Knowledge base validator
- **scripts/deploy.js** - Deployment automation
- **config-editor/** - Visual configuration editor

#### Testing
- **tests/setup.js** - Test environment setup
- **tests/config/** - Configuration tests
- **tests/agent-config.test.js** - Agent config validation

#### Output
- **dist/** - Production build output

## 📖 Documentation

### Getting Started Guides
- **[TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)** - Comprehensive customization guide
- **[TEMPLATE_VS_EXAMPLES_GUIDE.md](TEMPLATE_VS_EXAMPLES_GUIDE.md)** - Template vs Examples distinction
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Command cheat sheet and quick tips

### Agent Foundry Reference Files
Complete guides for configuring agents in Amazon Bedrock Agent Foundry (in recommended order):

1. **[01_Create_Knowledge_Base_Guide.md](Reference%20Files/01_Create_Knowledge_Base_Guide.md)** - **START HERE** - Knowledge base design and validation
2. **[02_Create_Project_Guide.md](Reference%20Files/02_Create_Project_Guide.md)** - Project setup and configuration
3. **[03_Create_Agents_Guide.md](Reference%20Files/03_Create_Agents_Guide.md)** - Agent creation with 30+ model options
4. **[04_Add_Tools_Guide.md](Reference%20Files/04_Add_Tools_Guide.md)** - Tool configuration and JSON schemas
5. **[05_Add_Output_Guide.md](Reference%20Files/05_Add_Output_Guide.md)** - Output formats and artifacts
6. **[06_Add_Prompt_Variables_Guide.md](Reference%20Files/06_Add_Prompt_Variables_Guide.md)** - Dynamic data injection
7. **[07_Model_Comparison_Guide.md](Reference%20Files/07_Model_Comparison_Guide.md)** - Model selection guide

See **[Reference Files/README.md](Reference%20Files/README.md)** for complete navigation.

### Deployment & Configuration
- **[Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md](Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)** - Step-by-step deployment
- **[deployment.config.json](deployment.config.json)** - Deployment profiles reference
- **[.env.example](.env.example)** - Environment variables reference

## 🎯 Best Practices

### Knowledge Base Design
- Use clear, hierarchical headings
- Include examples and use cases
- Keep files under 18,000 characters
- Use consistent formatting

### Agent Instructions
- Define clear role and responsibilities
- Specify tone and communication style
- Set boundaries on capabilities
- Provide example interactions

### UI/UX
- Maintain accessibility standards
- Ensure mobile responsiveness
- Use consistent branding
- Test across devices

## 🚀 Advanced Features

### Environment Variables Support
Manage configurations across different environments:

```bash
# Development
npm run dev

# Staging
npm run dev:staging

# Production build
npm run build:production
```

Configure in `.env` files:
- `.env.development` - Local development settings
- `.env.staging` - Staging environment
- `.env.production` - Production settings

See [.env.example](.env.example) for all available variables.

---

### Knowledge Base Validation
Automatically validate KB files before deployment:

```bash
# Validate all knowledge bases
npm run validate:kb

# Detailed output
npm run validate:kb:verbose
```

**Checks:**
- File size limits (18,000 characters)
- Markdown syntax validation
- UTF-8 encoding
- Required sections
- Duplicate content detection

---

### Testing Framework
Built-in test suite with Vitest:

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Visual UI
npm run test:ui

# Coverage report
npm run test:coverage
```

**Test Coverage:**
- Agent configuration validation
- Environment variable loading
- Plugin system functionality
- Component rendering

---

### Visual Configuration Editor
Edit agent configs without touching code:

```bash
npm run config:edit
```

**Features:**
- Agent settings editor
- Quick actions manager
- Knowledge base configuration
- Theme customization
- Real-time preview
- Download updated configs

Open at `http://localhost:5174` when running.

---

### Multi-Agent Support
Deploy multiple agents with route-based switching:

**Configure in `agents.config.json`:**
```json
{
  "multiAgentEnabled": true,
  "agents": [
    {
      "id": "marketing-agent",
      "name": "Marketing Assistant",
      "route": "/marketing",
      "enabled": true
    },
    {
      "id": "support-agent",
      "name": "Support Bot",
      "route": "/support",
      "enabled": true
    }
  ]
}
```

**Benefits:**
- Single codebase, multiple agents
- Shared infrastructure
- Route-based switching
- Independent configurations

---

### Deployment Profiles
Environment-specific builds and deployment:

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

**Configured in `deployment.config.json`:**
- Platform-specific settings (Vercel, Netlify, AWS)
- Environment variables per environment
- Build optimization settings
- CDN and caching configurations

---

### Plugin System
Extend functionality with custom plugins:

**Example Plugin:**
```javascript
// src/plugins/custom-plugin.js
export default {
  name: 'custom-plugin',
  version: '1.0.0',

  hooks: {
    onMessageSent: async function(message) {
      // Process message
      console.log('Message sent:', message);
      return message;
    },

    onResponseReceived: async function(response) {
      // Process response
      return response;
    }
  }
}
```

**Enable in `.env`:**
```bash
VITE_ENABLED_PLUGINS=analytics,slack,custom-plugin
```

**Available Hooks:**
- `onMessageSent` - Before sending to Bedrock
- `onResponseReceived` - After receiving response
- `onError` - Error handling
- `onAgentSwitch` - Multi-agent switching

**Included Plugins:**
- **Analytics Plugin** - Track usage and interactions
- **Slack Plugin** - Send notifications to Slack

See [src/plugins/README.md](src/plugins/README.md) for plugin development guide.

---

## 🔧 Troubleshooting

### Common Issues

**Q: Agent not responding correctly**
- Verify knowledge base files are properly formatted
- Check that files are listed in agent.config.json
- Ensure agent instructions are clear

**Q: Build errors**
- Run `npm install` to install dependencies
- Clear cache: `rm -rf dist node_modules && npm install`
- Check Node.js version (v18+ recommended)

**Q: Quick actions not working**
- Verify agent.config.json is valid JSON
- Check icon names are correct
- Ensure prompts are properly formatted

**Q: Environment variables not loading**
- Ensure `.env` file exists (copy from `.env.example`)
- Restart dev server after changing `.env`
- Check variable names start with `VITE_`
- Run `npm run config:validate` to check configuration

**Q: Knowledge base validation failing**
- Check file size (max 18,000 characters)
- Validate Markdown syntax
- Ensure UTF-8 encoding
- Run `npm run validate:kb:verbose` for details

**Q: Tests failing**
- Update dependencies: `npm install`
- Clear test cache: `npm test -- --clearCache`
- Check test environment setup in `tests/setup.js`

**Q: Plugin not loading**
- Verify plugin name in `VITE_ENABLED_PLUGINS`
- Check plugin file exists in `src/plugins/`
- Ensure plugin exports default object with hooks
- Check browser console for errors

See [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) for more troubleshooting tips.

## 🤝 Contributing

This template is designed to be shared and improved:

1. Fork and customize for your use case
2. Share improvements with your team
3. Document unique customizations
4. Contribute enhancements back to the template

## 📄 License

MIT License - feel free to use this template for any purpose.

## 🆘 Support

For questions and issues:
- Check the [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)
- Review example configurations
- Consult [Amazon Bedrock documentation](https://docs.aws.amazon.com/bedrock/)

## 🎉 Example Agents Built with This Template

- **Campaign Strategist** - Marketing campaign planning agent
- **HR Assistant** - Employee support and policy guide
- **Customer Support Bot** - 24/7 customer service
- **Tech Docs Assistant** - Developer documentation helper
- **Product Guide** - Product information and recommendations

## 🎓 Learning Path

### For Beginners
1. Start with automated setup: `./setup.sh`
2. Read [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) for customization basics
3. Explore [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for common commands
4. Review [Reference Files/README.md](Reference%20Files/README.md) for Agent Foundry guides

### For Advanced Users
1. Set up environment variables and multi-agent support
2. Create custom plugins for extended functionality
3. Configure deployment profiles for staging/production
4. Implement automated testing and validation
5. Explore plugin system documentation in `src/plugins/`

### For Agent Foundry Deployment
1. **Start with KBs**: [Reference Files/01_Create_Knowledge_Base_Guide.md](Reference%20Files/01_Create_Knowledge_Base_Guide.md)
2. Create project: [Reference Files/02_Create_Project_Guide.md](Reference%20Files/02_Create_Project_Guide.md)
3. Configure agents: [Reference Files/03_Create_Agents_Guide.md](Reference%20Files/03_Create_Agents_Guide.md)
4. Deploy: [Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md](Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)

---

## 🚀 Get Started Today!

```bash
# Clone and set up
git clone <repository-url>
cd PM-Agent-Squad-Master

# Automated setup
./setup.sh

# Or manual setup
npm install
cp .env.example .env
npm run validate:kb
npm run dev
```

---

## 📊 Template Stats

- **7 Comprehensive Agent Foundry Guides** (30,000+ words)
- **30+ Available Models** (Nova, Llama, Claude, GPT, Gemini)
- **7 Major Features** (Environment vars, validation, testing, visual editor, multi-agent, deployment, plugins)
- **40+ npm Scripts** for development, testing, and deployment
- **100% Test Coverage** for configuration and core functionality
- **Production-Ready** with deployment profiles for all major platforms

---

**Built with ❤️ for AI Agent Builders**

**Version:** 2.0.0 | **Last Updated:** November 12, 2025

Need help? Check out:
- [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) - Complete customization guide
- [TEMPLATE_VS_EXAMPLES_GUIDE.md](TEMPLATE_VS_EXAMPLES_GUIDE.md) - Template vs Examples
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Command cheat sheet
- [Reference Files/README.md](Reference%20Files/README.md) - Agent Foundry guides
