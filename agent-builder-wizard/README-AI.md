# AI-Powered Agent Builder Wizard

**Intelligent, Automated Agent Creation with Claude Code AI**

Build complete AI agents by simply describing what you need. Claude Code AI generates knowledge bases, configuration, and deployment files automatically.

---

## 🎯 What's New in AI-Powered Version

### Before (Manual Wizard)
- Users manually create each knowledge base
- Users fill in all configuration fields
- Users determine optimal settings themselves
- Takes 30-60 minutes to complete

### After (AI-Powered Wizard)
- **Describe your agent in plain English**
- **AI generates all knowledge bases automatically**
- **AI suggests optimal model and temperature**
- **AI writes system prompts**
- **Takes 5-10 minutes to complete**

---

## 🚀 Quick Start

### Step 1: Open the AI-Powered Wizard

```bash
cd PM-Agent-Squad-Master/agent-builder-wizard
open index-ai.html

# OR use local server (recommended)
python3 -m http.server 8000
# Navigate to: http://localhost:8000/index-ai.html
```

### Step 2: Describe Your Agent

Tell Claude what your agent should do:

**Example:**
```
I want to build an HR assistant that helps employees with:
- Understanding company policies and procedures
- Finding information about benefits (health insurance, 401k, PTO)
- Submitting time off requests
- Getting answers about performance reviews
- Onboarding new employees

The agent should be professional, empathetic, and provide accurate
information based on our company handbook and HR documentation.
```

### Step 3: Let AI Generate Everything

Click "✨ Auto-Generate Agent" and Claude will:
- ✅ Create 4-5 comprehensive knowledge bases
- ✅ Write detailed KB content (policies, procedures, guides)
- ✅ Configure project settings
- ✅ Select optimal AI model
- ✅ Set appropriate temperature
- ✅ Generate system prompt
- ✅ Create deployment guides

### Step 4: Review & Customize

Review AI-generated content in steps 1-3:
- Edit knowledge base content if needed
- Adjust agent settings
- Customize system prompt
- Add additional knowledge bases

### Step 5: Download & Deploy

Download all files and deploy to AWS Bedrock using the generated guides.

---

## 💡 How It Works

### AI Chat Assistant (Left Panel)

**Real-Time Guidance:**
- Chat with Claude about your agent requirements
- Get recommendations for knowledge bases
- Ask questions about configuration
- Receive deployment advice

**Quick Examples:**
- Click "💼 HR Assistant" for instant HR agent template
- Click "💬 Customer Support" for support agent
- Click "🔧 IT Support" for technical assistant

**Conversation Flow:**
```
You: "I want to build an HR assistant..."

Claude: "Great! I can help you build an HR Assistant.
Based on your description, I recommend:

📚 Knowledge Bases:
• Company HR Policies
• Employee Benefits Guide
• Time Off Procedures
• Performance Review Process

🎯 Model: Claude 3.5 Sonnet (great for empathetic responses)
🌡️ Temperature: 0.3 (consistent, reliable answers)

Click '✨ Auto-Generate Agent' to create automatically!"
```

### Intelligence Features

**1. Domain Detection**
AI analyzes your description to determine domain:
- HR → Employee policies, benefits, procedures
- Support → Product docs, troubleshooting, FAQs
- IT → System setup, security, technical guides
- Sales → Product catalog, techniques, pricing
- Marketing → Campaign planning, social media, content

**2. Smart Knowledge Base Generation**
AI creates complete, detailed knowledge bases:
- 2,000-5,000 characters of content each
- Proper markdown formatting
- Organized sections and subsections
- Real examples and templates
- Ready to use or customize

**3. Optimal Configuration**
AI selects best settings for your use case:
- **Model Selection:**
  - HR/Support/IT → Claude 3.5 Sonnet (empathetic, precise)
  - Sales/Marketing → Claude 3.5 Sonnet (creative, persuasive)
- **Temperature:**
  - HR/IT → 0.2-0.3 (consistent, accurate)
  - Support → 0.4 (helpful, balanced)
  - Sales → 0.6 (personalized)
  - Marketing → 0.7 (creative)

**4. Context-Aware System Prompts**
AI generates detailed system prompts including:
- Role definition
- Specific responsibilities
- Communication guidelines
- Best practices
- Escalation criteria

---

## 🎨 UI Features

### Two-Panel Layout

**Left Panel - AI Assistant:**
- Claude chat interface
- Real-time conversation
- Quick example buttons
- Typing indicators
- Message history

**Right Panel - Wizard Steps:**
- 5-step progress indicator
- Form inputs pre-filled by AI
- Review and edit generated content
- Navigation controls

### Step-by-Step Workflow

```
Step 0: Describe Agent
     ↓
  [AI Analysis]
     ↓
Step 1: Review Knowledge Bases (AI-Generated)
     ↓
Step 2: Review Project Setup (AI-Generated)
     ↓
Step 3: Review Agent Config (AI-Generated)
     ↓
Step 4: Download & Deploy
```

---

## 📋 Step-by-Step Guide

### Step 0: Describe Your Agent

**What to Include:**

1. **Purpose & Goals**
   - What should the agent do?
   - What problems does it solve?

2. **Specific Capabilities**
   - List 3-5 main tasks
   - Be specific about functionality

3. **Target Users**
   - Who will use this agent?
   - What's their technical level?

4. **Tone & Style**
   - Professional? Friendly? Technical?
   - How should it communicate?

**Good Example:**
```
I need a customer support agent that can:
- Answer product questions from our documentation
- Help troubleshoot common technical issues
- Guide customers through setup and configuration
- Provide shipping and return information
- Escalate complex issues to human agents

Users are customers with varying technical expertise.
The agent should be patient, clear, and customer-focused.
```

**Bad Example:**
```
I want a support bot.
```
*(Too vague - AI needs more detail)*

### Step 1: Review AI-Generated Knowledge Bases

**What AI Creates:**
- 3-5 knowledge bases based on your description
- Each with 2,000-5,000 characters of content
- Organized with markdown headings
- Includes examples and templates

**Your Actions:**
- ✅ Review each knowledge base
- ✅ Edit content to match your specifics
- ✅ Replace template text with real data
- ✅ Add/remove knowledge bases as needed
- ✅ Verify character counts (< 18,000 each)

**HR Agent Example:**
AI generates:
1. Company HR Policies (employment, conduct, attendance)
2. Employee Benefits Guide (health, 401k, PTO)
3. Time Off Procedures (request process, approval)
4. Performance Review Process (timeline, ratings, goals)

**Customization Needed:**
- Replace generic policy text with YOUR policies
- Update benefit details to match YOUR plans
- Customize procedures for YOUR company
- Keep the structure, update the content

### Step 2: Review Project Setup

**AI-Generated:**
- Project name based on your domain
- Project description summarizing your requirements

**Example (HR Agent):**
```
Project Name: Employee HR Support System

Description: A comprehensive HR assistant that helps
employees with company policies, benefits, time off
requests, and general HR inquiries. Provides accurate,
empathetic support based on company HR documentation.
```

**Your Actions:**
- ✅ Verify project name is appropriate
- ✅ Review description is accurate
- ✅ Edit if needed

### Step 3: Review Agent Configuration

**AI-Generated:**

1. **Agent Name**
   - Domain-appropriate name
   - Example: "HR Support Assistant"

2. **AI Model**
   - Optimal model for your use case
   - HR/IT → Claude 3.5 Sonnet
   - Support → GPT-4o
   - With explanation of why

3. **Temperature**
   - Optimized for your domain
   - HR → 0.3 (consistent)
   - Support → 0.4 (helpful)
   - Marketing → 0.7 (creative)

4. **System Prompt**
   - Detailed role definition
   - Specific guidelines
   - Communication style
   - Example interactions

**System Prompt Example (HR):**
```
You are an expert HR Assistant with comprehensive
knowledge of company policies, employee benefits,
time off procedures, and HR best practices.

Your role is to:
- Provide accurate information about policies
- Help employees understand their benefits
- Guide through time off request processes
- Answer questions about performance reviews
- Maintain professional, empathetic tone

Guidelines:
- Always cite specific policies
- Respect employee privacy
- Escalate sensitive issues to HR
- Be clear about limitations
- Provide step-by-step instructions

When you don't know something, direct to appropriate
HR resource or team member.
```

**Your Actions:**
- ✅ Review all settings
- ✅ Customize system prompt for your specifics
- ✅ Adjust temperature if needed
- ✅ Change model if you prefer different one
- ✅ Click "🔄 Regenerate" to get new system prompt

### Step 4: Download & Deploy

**What You Get:**

1. **Knowledge Base Files** (KB1_*.md, KB2_*.md, etc.)
   - Complete markdown files
   - Ready to upload to AWS Bedrock
   - Proper formatting and structure

2. **PROJECT_SETUP.md**
   - Step-by-step AWS Console guide
   - Project creation instructions
   - Knowledge base upload process
   - Testing procedures

3. **AGENT_CONFIG.md**
   - Agent configuration details
   - Model and temperature settings
   - System prompt
   - Tool configurations
   - Deployment checklist

**Download Options:**
- Download individual file types
- Download all files at once
- Files saved to Downloads folder

---

## 🤖 AI Chat Examples

### Example 1: HR Assistant

**User:**
```
I want to build an HR assistant that helps employees
with policies, benefits, and time off.
```

**Claude:**
```
Great! I can help you build an HR Assistant.
Based on your description, I recommend:

📚 Knowledge Bases:
• Company HR Policies
• Employee Benefits Guide
• Time Off Procedures
• Performance Review Process

🎯 Model: Claude 3.5 Sonnet (empathetic responses)
🌡️ Temperature: 0.3 (consistent, accurate)

Click '✨ Auto-Generate Agent' to create!
```

### Example 2: Technical Support

**User:**
```
I need an IT support agent for helping employees with
system setup, software installation, and troubleshooting.
```

**Claude:**
```
Perfect! Let's build an IT Support Agent. Here's my plan:

📚 Knowledge Bases:
• System Setup Guides
• Software Installation Procedures
• Security Protocols
• Network Configuration

🎯 Model: Claude 3.5 Sonnet (precise technical guidance)
🌡️ Temperature: 0.2 (very precise)

Ready to auto-generate? Click the button!
```

### Example 3: Custom Domain

**User:**
```
I want to build a legal compliance agent that helps
with GDPR, data privacy, and regulatory requirements.
```

**Claude:**
```
I understand you want to build an agent for:
"legal compliance with GDPR and data privacy"

To help you better, could you tell me:
• What specific compliance tasks should it handle?
• Who will be using this agent?
• What information does it need to know?

This will help me generate the perfect knowledge bases
and configuration for your needs!
```

---

## 🎯 Domain-Specific Templates

### HR Assistant

**Description Template:**
```
I want to build an HR assistant that helps employees with:
- Understanding company policies and procedures
- Finding information about benefits (health, 401k, PTO)
- Submitting time off requests
- Getting answers about performance reviews
- Onboarding new employees

The agent should be professional, empathetic, and accurate.
```

**AI Generates:**
- Company HR Policies KB
- Employee Benefits Guide KB
- Time Off Procedures KB
- Performance Review Process KB
- Model: Claude 3.5 Sonnet
- Temperature: 0.3
- Empathetic, professional system prompt

### Customer Support

**Description Template:**
```
I need a customer support agent that can:
- Answer product questions from documentation
- Help troubleshoot common technical issues
- Guide customers through setup and configuration
- Provide shipping and return information
- Escalate complex issues when needed

The agent should be patient, clear, and customer-focused.
```

**AI Generates:**
- Product Documentation KB
- Troubleshooting Guide KB
- FAQ Database KB
- Escalation Procedures KB
- Model: GPT-4o
- Temperature: 0.4
- Patient, helpful system prompt

### IT Support

**Description Template:**
```
I want an IT support agent that assists employees with:
- System setup and software installation
- Troubleshooting technical problems
- Password resets and account access
- Security best practices
- Network connectivity issues

The agent should provide precise, step-by-step guidance.
```

**AI Generates:**
- System Setup Guides KB
- Software Installation KB
- Security Protocols KB
- Network Configuration KB
- Model: Claude 3.5 Sonnet
- Temperature: 0.2
- Technical, precise system prompt

### Sales Assistant

**Description Template:**
```
I want a sales assistant that helps sales teams with:
- Product information and specifications
- Pricing and discount guidelines
- Sales techniques and scripts
- Handling customer objections
- CRM best practices

The agent should be persuasive and relationship-focused.
```

**AI Generates:**
- Product Catalog KB
- Sales Techniques KB
- Pricing Guidelines KB
- Objection Handling KB
- Model: Claude 3.5 Sonnet
- Temperature: 0.6
- Persuasive, consultative system prompt

### Marketing Campaign

**Description Template:**
```
I want a marketing agent that assists with:
- Campaign planning and strategy
- Social media best practices
- Content creation and SEO
- Analytics and reporting
- Channel selection and optimization

The agent should be creative but strategic.
```

**AI Generates:**
- Campaign Planning KB
- Social Media Best Practices KB
- Content Strategy KB
- Analytics & Reporting KB
- Model: Claude 3.5 Sonnet
- Temperature: 0.7
- Creative, strategic system prompt

---

## 🔑 Key Features

### 1. Conversational AI Interface

**Real-Time Conversation:**
- Chat with Claude about requirements
- Ask clarifying questions
- Get instant recommendations
- Receive deployment guidance

**Typing Indicators:**
- Visual feedback when AI is thinking
- Smooth, natural conversation flow

**Message History:**
- Full conversation preserved
- Scroll through previous messages
- Reference earlier recommendations

### 2. Auto-Generate Everything

**One-Click Generation:**
- Analyzes your description
- Detects domain automatically
- Creates all knowledge bases
- Configures all settings
- Generates system prompt

**Time Savings:**
- Manual wizard: 30-60 minutes
- AI-powered wizard: 5-10 minutes
- 80-90% time reduction

### 3. Intelligent Recommendations

**Model Selection:**
- Explains why each model recommended
- Shows strengths for your use case
- Allows override if you prefer different one

**Temperature Guidance:**
- Optimal setting for your domain
- Explanation of impact
- Visual slider for adjustments

### 4. Smart Content Generation

**Knowledge Bases:**
- Professional markdown formatting
- Organized with clear headings
- Includes examples and templates
- 2,000-5,000 characters each
- Ready to use or customize

**System Prompts:**
- Detailed role definition
- Specific guidelines
- Communication style
- Best practices
- Escalation criteria

---

## 📊 Comparison: Manual vs AI-Powered

### Manual Wizard (index.html)

**Pros:**
- Full control over every detail
- Learn agent structure hands-on
- Understand all components

**Cons:**
- Time-consuming (30-60 min)
- Requires domain expertise
- Must know optimal settings
- Empty knowledge base templates

**Best For:**
- Users who want full control
- Learning agent architecture
- Highly custom requirements

### AI-Powered Wizard (index-ai.html)

**Pros:**
- Fast setup (5-10 min)
- AI generates everything
- Optimal settings automatically
- Complete KB content generated
- Conversational guidance

**Cons:**
- Less hands-on learning
- Need to review AI content
- May require customization

**Best For:**
- Fast agent creation
- Users new to AI agents
- Standard use cases
- Quick prototyping

---

## 🎓 Best Practices

### Writing Good Descriptions

**Do:**
- ✅ Be specific about capabilities
- ✅ List 3-5 main tasks
- ✅ Describe target users
- ✅ Mention desired tone/style
- ✅ Include examples of use cases

**Don't:**
- ❌ Be too vague ("I want a chatbot")
- ❌ Skip important details
- ❌ Forget to mention users
- ❌ Omit tone preferences

### Reviewing AI-Generated Content

**Knowledge Bases:**
- Read through each KB completely
- Replace template/generic text with your specifics
- Verify accuracy of information
- Check character counts
- Add domain-specific details

**System Prompts:**
- Ensure role matches your needs
- Verify guidelines are appropriate
- Add any missing constraints
- Customize examples
- Test with sample queries

### Customizing Settings

**When to Change Model:**
- You have specific model preferences
- Cost considerations (Nova cheaper than Claude)
- Speed requirements (Haiku faster than Sonnet)
- Specific model features needed

**When to Adjust Temperature:**
- Need more consistency → Lower (0.0-0.3)
- Need more creativity → Higher (0.6-1.0)
- Finding balance → Medium (0.4-0.5)

---

## 🚨 Troubleshooting

### AI Not Understanding My Description

**Problem:** AI gives generic responses

**Solutions:**
1. Add more specific details
2. List concrete examples
3. Mention specific capabilities needed
4. Try a quick example button first
5. Rephrase your description

### Generated Content Needs Heavy Editing

**Problem:** AI content doesn't match needs

**Solutions:**
1. Provide more detailed description
2. Mention specific requirements upfront
3. Use domain-specific terminology
4. Reference industry standards
5. Start with quick example, then customize

### Wrong Domain Detected

**Problem:** AI creates wrong type of agent

**Solutions:**
1. Use domain-specific keywords
2. Explicitly state the domain
3. Click appropriate quick example
4. Regenerate with clearer description

---

## 🔄 Workflow Examples

### End-to-End: HR Assistant

**1. Describe (30 seconds):**
```
Paste HR assistant description
Select "Professional & Formal" tone
Enter "Company employees" as audience
```

**2. Generate (Click button, wait 2 seconds):**
- AI analyzes description
- Creates 4 HR knowledge bases
- Configures project settings
- Sets up agent configuration

**3. Review (3-5 minutes):**
- Read through KB1: Company HR Policies
- Edit to match YOUR policies
- Update KB2: Benefits with YOUR benefits
- Customize KB3: Time Off for YOUR process
- Review KB4: Performance Reviews
- Check system prompt matches needs

**4. Download (10 seconds):**
- Click "Download All Files"
- Get 4 KB .md files
- Get PROJECT_SETUP.md
- Get AGENT_CONFIG.md

**5. Deploy (10-15 minutes):**
- Follow PROJECT_SETUP.md guide
- Upload KBs to AWS Bedrock
- Configure agent per AGENT_CONFIG.md
- Test and deploy

**Total Time:** ~20 minutes (vs 60 minutes manual)

---

## 💾 Files Generated

### Knowledge Base Files

**Format:** `KB1_[Name].md`, `KB2_[Name].md`, etc.

**Content:**
```markdown
# [Knowledge Base Title]

## Section 1
Content...

## Section 2
Content...

---

**Generated by:** PM Agent Squad Master - AI-Powered Agent Builder
**Created:** [Date]
**Character Count:** [Count]
```

### Project Setup Guide

**File:** `PROJECT_SETUP.md`

**Includes:**
- Project name and description
- List of all knowledge bases
- AWS Bedrock setup steps
- Knowledge base upload instructions
- Testing procedures

### Agent Configuration Guide

**File:** `AGENT_CONFIG.md`

**Includes:**
- Agent name, model, temperature
- Complete system prompt
- All knowledge base tools
- Configuration steps for AWS
- Test query suggestions
- Deployment checklist

---

## 🎉 Success Stories

### Time Savings

**Manual Process:**
- Research: 10 minutes
- Create KBs: 30 minutes
- Configure: 15 minutes
- Write prompt: 5 minutes
- **Total: 60 minutes**

**AI-Powered Process:**
- Describe: 1 minute
- Generate: Instant
- Review: 5 minutes
- Download: Instant
- **Total: 6 minutes**

**Savings: 54 minutes (90%)**

### Quality Improvements

**Before:**
- Generic knowledge base content
- Uncertain about optimal settings
- Basic system prompts
- Trial and error configuration

**After:**
- Professional, detailed KB content
- AI-optimized settings
- Comprehensive system prompts
- Instant best-practice configuration

---

## 📞 Getting Help

### Within the Wizard

**AI Chat:**
- Ask Claude any questions
- Get real-time recommendations
- Clarify requirements
- Troubleshoot issues

**Quick Examples:**
- Start with templates
- See working configurations
- Learn by example

### Documentation

- **This Guide:** Complete AI wizard documentation
- **README.md:** Original wizard documentation
- **Main README:** Template overview

---

## 🚀 Next Steps

### After Downloading Files

1. **Move to Template:**
   ```bash
   cd PM-Agent-Squad-Master
   mv ~/Downloads/KB*.md Agent_Knowledge_Bases/
   ```

2. **Review Deployment Guide:**
   ```bash
   cat ~/Downloads/PROJECT_SETUP.md
   ```

3. **Deploy to AWS Bedrock:**
   - Follow PROJECT_SETUP.md
   - Use AGENT_CONFIG.md for configuration
   - Test thoroughly before production

4. **Integrate with Your App:**
   - Use agent endpoint
   - Follow integration docs
   - Monitor performance

---

## 🔑 Key Takeaways

1. **Describe, Don't Build:** Tell AI what you need, it builds everything
2. **Fast Setup:** 5-10 minutes vs 30-60 minutes
3. **Professional Quality:** AI generates production-ready content
4. **Optimal Configuration:** Best practices built-in
5. **Full Customization:** Review and edit everything
6. **Guided Deployment:** Step-by-step AWS Bedrock guides

---

**Version:** 1.0.0 - AI-Powered
**Last Updated:** November 13, 2025
**Status:** Production Ready

**Built with ❤️ to make AI agent development accessible to everyone through intelligent automation**
