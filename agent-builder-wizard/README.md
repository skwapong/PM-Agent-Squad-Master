# Agent Builder Wizard

**Interactive UI for Building AWS Bedrock Agents**

A step-by-step guided interface that helps you create a custom AI agent using the PM-Agent-Squad-Master template.

---

## 🎯 What Is This?

The Agent Builder Wizard is a browser-based UI that guides you through the entire process of building an AI agent for Amazon Bedrock Agent Foundry. It follows the correct workflow order:

1. **Knowledge Bases First** - Create your domain knowledge
2. **Project Setup** - Configure your project container
3. **Agent Configuration** - Set up your AI agent
4. **Tools & Output** - Configure agent capabilities
5. **Download & Deploy** - Get your files and deploy

---

## 🚀 Quick Start

### Step 1: Open the Wizard

**Option A: Double-click to open**
```bash
# Navigate to the wizard folder
cd /Users/sam.kwapong/PM-Agent-Squad-Master/agent-builder-wizard

# Double-click index.html in Finder
# OR open from command line:
open index.html
```

**Option B: Use a local server (recommended)**
```bash
# If you have Python installed:
python3 -m http.server 8000

# Then open in browser:
# http://localhost:8000/index.html
```

**Option C: Use npm script (if added to package.json)**
```bash
npm run wizard
```

### Step 2: Follow the 5-Step Process

The wizard will guide you through each step with clear instructions and examples.

---

## 📋 Step-by-Step Guide

### Step 1: Create Your Knowledge Bases

**What You'll Do:**
- Select your agent's domain (HR, Support, IT, Sales, Marketing, or Custom)
- See suggested knowledge base topics for your domain
- Create 3+ knowledge bases with titles and content
- Validate character limits (18,000 chars per KB)

**Domain Suggestions Provided:**

| Domain | Suggested Knowledge Bases |
|--------|---------------------------|
| **HR** | Company HR Policies, Employee Benefits Guide, Time Off Procedures, Performance Reviews, Onboarding Process |
| **Support** | Product Documentation, Troubleshooting Guide, FAQs, Common Issues Solutions, Escalation Procedures |
| **IT** | System Setup Guides, Software Installation, Security Protocols, Network Configuration, Backup Procedures |
| **Sales** | Product Catalog, Sales Techniques, Pricing Guidelines, Customer Objections, Sales Process |
| **Marketing** | Campaign Planning, Meta Advertising, Pinterest Ads, TikTok Marketing, Social Media Strategy |

**Features:**
- ✅ Add/remove knowledge bases dynamically
- ✅ Real-time character counter with visual warnings
- ✅ Domain-based suggestions
- ✅ Validation before proceeding

**Tips:**
- Create at least 3 knowledge bases
- Keep each under 18,000 characters
- Be specific and comprehensive
- Use markdown formatting

---

### Step 2: Project Setup

**What You'll Do:**
- Enter your project name
- Write a project description
- Define the project's purpose and goals

**Example:**
```
Project Name: Employee HR Support System
Description: A comprehensive HR assistant that helps employees with
policies, benefits, time off, and general HR questions.
```

**Validation:**
- Project name is required
- Description should be clear and concise
- Both fields must be filled to proceed

---

### Step 3: Agent Configuration

**What You'll Do:**
- Set your agent's display name
- Choose AI model (Claude Sonnet 4.5, GPT-4, etc.)
- Set temperature (0.0-1.0 for creativity vs precision)
- Customize the system prompt

**Model Options:**
- Amazon Nova Pro
- Amazon Nova Lite
- Amazon Nova Micro
- Claude 3.5 Sonnet v2
- Claude 3.5 Haiku
- Claude 3 Opus
- Claude 3 Sonnet
- GPT-4o
- GPT-4o Mini
- GPT-4 Turbo
- Gemini 2.0 Flash
- Gemini 1.5 Pro
- Llama 3.1 405B
- ...and 20+ more models

**Temperature Guide:**
- **0.0-0.3**: Precise, factual, consistent (good for HR, Support, IT)
- **0.4-0.6**: Balanced creativity and accuracy
- **0.7-1.0**: Creative, varied, conversational (good for Marketing, Sales)

**System Prompt Templates:**

The wizard provides domain-specific system prompt templates:

**HR Example:**
```
You are an expert HR Assistant with comprehensive knowledge of company
policies, employee benefits, time off procedures, and HR best practices.
You provide accurate, helpful, and empathetic support to employees.
```

**Support Example:**
```
You are an expert Customer Support Assistant with deep knowledge of our
products, troubleshooting procedures, and customer service best practices.
You provide clear, helpful, and patient support.
```

**Features:**
- ✅ Pre-filled templates based on your domain
- ✅ Fully customizable
- ✅ Character counter for system prompt
- ✅ Model selection with descriptions

---

### Step 4: Tools & Output Configuration

**What You'll Do:**
- Review your knowledge base tools (auto-generated from Step 1)
- Configure output format preferences
- Set guardrails and safety settings

**Knowledge Base Tools:**

The wizard automatically creates tool configurations for each KB you created:

```javascript
{
  "name": "kb_company_hr_policies",
  "description": "Search and retrieve information from Company HR Policies",
  "type": "knowledge-base"
}
```

**Output Configuration:**
- Structured responses
- Markdown formatting
- Citation requirements
- Response length preferences

**Guardrails:**
- Content filtering
- Topic restrictions
- Safety settings
- Compliance requirements

---

### Step 5: Download & Deploy

**What You'll Do:**
- Review your complete configuration
- Download all generated files
- Follow deployment instructions

**Files Generated:**

1. **Knowledge Base Files** (`.md` files)
   ```
   KB1_[Your_Title].md
   KB2_[Your_Title].md
   KB3_[Your_Title].md
   ...
   ```

2. **Project Configuration Guide** (`PROJECT_SETUP.md`)
   - Project details
   - Setup instructions
   - Configuration steps

3. **Agent Configuration Guide** (`AGENT_CONFIG.md`)
   - Agent settings
   - Model configuration
   - System prompt
   - Tool configurations

4. **Deployment Checklist** (`DEPLOYMENT_CHECKLIST.md`)
   - Pre-deployment verification
   - AWS Bedrock setup steps
   - Post-deployment testing

**Download Options:**
- Download individual file types
- Download all files at once (ZIP)
- Copy configuration to clipboard

---

## 🎨 Features

### Real-Time Validation
- ✅ Character count warnings (18,000 limit per KB)
- ✅ Required field indicators
- ✅ Step completion tracking
- ✅ Visual progress indicators

### Smart Suggestions
- ✅ Domain-based knowledge base topics
- ✅ Pre-configured system prompts
- ✅ Model recommendations
- ✅ Temperature guidance

### File Generation
- ✅ Markdown-formatted knowledge bases
- ✅ Configuration guides
- ✅ Deployment checklists
- ✅ Ready-to-upload files

### User-Friendly Design
- ✅ Clean, modern interface
- ✅ Step-by-step progression
- ✅ Help text and examples
- ✅ Responsive design

---

## 📊 Workflow Diagram

```
┌─────────────────────────────────────────────────┐
│  Step 1: Knowledge Bases                        │
│  ┌──────────────────────────────────────┐       │
│  │ • Select Domain                       │       │
│  │ • Create 3+ KBs                       │       │
│  │ • Add Content (< 18K chars each)      │       │
│  │ • Validate                            │       │
│  └──────────────────────────────────────┘       │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Step 2: Project Setup                          │
│  ┌──────────────────────────────────────┐       │
│  │ • Project Name                        │       │
│  │ • Project Description                 │       │
│  │ • Purpose & Goals                     │       │
│  └──────────────────────────────────────┘       │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Step 3: Agent Configuration                    │
│  ┌──────────────────────────────────────┐       │
│  │ • Agent Name                          │       │
│  │ • Model Selection                     │       │
│  │ • Temperature                         │       │
│  │ • System Prompt                       │       │
│  └──────────────────────────────────────┘       │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Step 4: Tools & Output                         │
│  ┌──────────────────────────────────────┐       │
│  │ • Review KB Tools (auto-generated)    │       │
│  │ • Output Format                       │       │
│  │ • Guardrails                          │       │
│  └──────────────────────────────────────┘       │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Step 5: Download & Deploy                      │
│  ┌──────────────────────────────────────┐       │
│  │ • Download KB Files                   │       │
│  │ • Download Config Guides              │       │
│  │ • Download Deployment Checklist       │       │
│  │ • Follow Deployment Guide             │       │
│  └──────────────────────────────────────┘       │
└─────────────────────────────────────────────────┘
```

---

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first styling (via CDN)
- **Vanilla JavaScript**: No framework dependencies
- **Browser Blob API**: File download functionality

### Browser Requirements
- Modern browser with JavaScript enabled
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- No server required (can run locally)

### File Structure
```
agent-builder-wizard/
├── index.html          # Main wizard interface
├── wizard.js           # Wizard functionality
└── README.md           # This file
```

### Key Functions

**Knowledge Base Management:**
```javascript
addKnowledgeBase()      // Add new KB editor
removeKnowledgeBase(id) // Remove KB editor
updateCharCount(id)     // Update character counter
```

**Navigation:**
```javascript
nextStep()              // Move to next step
prevStep()              // Move to previous step
updateStepDisplay()     // Update UI
```

**Validation:**
```javascript
validateCurrentStep()   // Validate before proceeding
validateKnowledgeBases() // Check KB requirements
```

**File Generation:**
```javascript
downloadKnowledgeBases()  // Download all KB .md files
downloadProjectConfig()   // Download PROJECT_SETUP.md
downloadAgentConfig()     // Download AGENT_CONFIG.md
downloadAllFiles()        // Download everything
```

---

## 💡 Tips & Best Practices

### Knowledge Base Tips
1. **Be Specific**: Each KB should cover a focused topic
2. **Use Markdown**: Proper formatting helps the AI understand structure
3. **Stay Under Limit**: Keep each KB under 18,000 characters
4. **Include Examples**: Real examples help the agent provide better answers
5. **Update Regularly**: Keep knowledge bases current

### Model Selection Tips
1. **Claude 3.5 Sonnet**: Best for complex reasoning, analysis
2. **GPT-4o**: Strong general-purpose performance
3. **Amazon Nova**: Cost-effective for simple tasks
4. **Gemini 2.0 Flash**: Fast responses, good for chat
5. **Llama 3.1**: Open-source option

### Temperature Tips
- **HR/Support/IT**: Use 0.2-0.4 for consistency
- **Sales**: Use 0.5-0.7 for personalization
- **Marketing**: Use 0.6-0.8 for creativity
- **Technical Docs**: Use 0.0-0.3 for precision

### System Prompt Tips
1. **Define Role**: "You are an expert [role]..."
2. **State Knowledge**: "...with comprehensive knowledge of..."
3. **Set Tone**: "You provide [helpful/professional/friendly] support..."
4. **Include Constraints**: "Always cite sources, maintain privacy..."
5. **Add Examples**: Include example responses if needed

---

## 🚨 Common Issues

### Issue 1: Character Limit Exceeded
**Problem**: KB content exceeds 18,000 characters

**Solution**:
- Split into multiple knowledge bases
- Remove redundant content
- Use more concise language
- Watch the character counter (turns orange at 15,000, red at 18,000)

### Issue 2: Can't Proceed to Next Step
**Problem**: Next button is disabled

**Solution**:
- Check for required fields (marked with red asterisk)
- Ensure at least 3 knowledge bases created
- Verify character limits not exceeded
- Fill in all mandatory fields

### Issue 3: Files Not Downloading
**Problem**: Download button doesn't work

**Solution**:
- Check browser's download settings
- Allow pop-ups for this page
- Try a different browser
- Check browser console for errors

### Issue 4: Lost Progress
**Problem**: Accidentally closed the wizard

**Solution**:
- Currently no auto-save (feature coming soon)
- Keep browser tab open while working
- Download files frequently
- Use "Save Draft" feature (if available)

---

## 📚 Next Steps After Wizard

Once you've downloaded your files:

### 1. Review Generated Files
```bash
# Check your downloads folder
ls ~/Downloads/

# You should see:
# - KB1_[title].md
# - KB2_[title].md
# - KB3_[title].md
# - PROJECT_SETUP.md
# - AGENT_CONFIG.md
# - DEPLOYMENT_CHECKLIST.md
```

### 2. Move Files to Template
```bash
# Navigate to template
cd /Users/sam.kwapong/PM-Agent-Squad-Master

# Move KB files
mv ~/Downloads/KB*.md Agent_Knowledge_Bases/

# Review configuration guides
cat ~/Downloads/PROJECT_SETUP.md
cat ~/Downloads/AGENT_CONFIG.md
```

### 3. Follow Deployment Guide
```bash
# Read the main deployment guide
cat Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md

# Or use the generated checklist
cat ~/Downloads/DEPLOYMENT_CHECKLIST.md
```

### 4. Upload to AWS Bedrock
1. Log into AWS Console
2. Navigate to Amazon Bedrock > Agent Foundry
3. Create new project (use your PROJECT_SETUP.md guide)
4. Upload knowledge bases (your KB .md files)
5. Configure agent (use your AGENT_CONFIG.md guide)
6. Add tools (auto-configured from KBs)
7. Test and deploy

---

## 🎯 Examples by Domain

### HR Assistant Example

**Step 1: Knowledge Bases**
- KB1: Company HR Policies (employment policies, code of conduct)
- KB2: Employee Benefits Guide (health insurance, 401k, perks)
- KB3: Time Off Procedures (vacation, sick leave, holidays)
- KB4: Performance Reviews (review process, expectations, forms)

**Step 3: Agent Configuration**
- Name: "HR Support Assistant"
- Model: Claude 3.5 Sonnet (good reasoning for policy questions)
- Temperature: 0.3 (consistent, accurate responses)
- Prompt: "You are an expert HR Assistant..."

**Result**: Agent can answer employee questions about policies, benefits, time off, and reviews with accurate, empathetic responses.

---

### Customer Support Example

**Step 1: Knowledge Bases**
- KB1: Product Documentation (features, specs, usage)
- KB2: Troubleshooting Guide (common issues, solutions)
- KB3: FAQs (frequently asked questions)
- KB4: Escalation Procedures (when to escalate, to whom)

**Step 3: Agent Configuration**
- Name: "Customer Support Assistant"
- Model: GPT-4o (strong at understanding varied questions)
- Temperature: 0.4 (helpful but consistent)
- Prompt: "You are an expert Customer Support Assistant..."

**Result**: Agent can help customers with product questions, troubleshooting, and knows when to escalate complex issues.

---

### IT Support Example

**Step 1: Knowledge Bases**
- KB1: System Setup Guides (OS installation, network setup)
- KB2: Software Installation (apps, drivers, configurations)
- KB3: Security Protocols (passwords, permissions, policies)
- KB4: Backup Procedures (backup schedules, recovery processes)

**Step 3: Agent Configuration**
- Name: "IT Support Assistant"
- Model: Claude 3.5 Sonnet (technical reasoning)
- Temperature: 0.2 (precise technical guidance)
- Prompt: "You are an expert IT Support Assistant..."

**Result**: Agent can guide users through technical setups, installations, and security procedures with precise, step-by-step instructions.

---

## 🔄 Version History

**Version 1.0.0** - November 13, 2025
- Initial release
- 5-step wizard workflow
- Domain-based suggestions (HR, Support, IT, Sales, Marketing)
- Real-time validation
- File download functionality
- System prompt templates
- Character count validation

**Planned Features:**
- Auto-save progress
- Load saved configurations
- Multi-agent support
- Advanced tool configuration
- Custom template uploads
- Integration with AWS CLI
- Direct deployment to Bedrock

---

## 📞 Support

### Documentation
- Main README: `/Users/sam.kwapong/PM-Agent-Squad-Master/README.md`
- Reference Guides: `/Users/sam.kwapong/PM-Agent-Squad-Master/Reference Files/`
- Deployment Guide: `/Users/sam.kwapong/PM-Agent-Squad-Master/Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md`

### Template Resources
- Knowledge Base Guide: `Reference Files/01_Create_Knowledge_Base_Guide.md`
- Project Guide: `Reference Files/02_Create_Project_Guide.md`
- Agent Guide: `Reference Files/03_Create_Agents_Guide.md`
- Template Guide: `TEMPLATE_VS_EXAMPLES_GUIDE.md`

### Questions?
Refer to the comprehensive guides in the Reference Files folder. Each guide includes:
- Step-by-step instructions
- Screenshots
- Examples
- Troubleshooting tips

---

## ⚖️ License

Part of the PM-Agent-Squad-Master template.

---

**Happy Agent Building!** 🚀

Use this wizard to create powerful AI agents for AWS Bedrock in minutes instead of hours.

**Remember the correct order:**
1. Knowledge Bases FIRST
2. Project Setup
3. Agent Configuration
4. Tools & Output
5. Deploy

The wizard guides you through this exact workflow!
