# Template vs. Examples Guide

## Understanding What to Customize

**Last Updated:** November 12, 2025
**Template Version:** 2.0.0

---

## 🎯 Quick Overview

The PM Agent Squad Master contains three types of content:

| Type | What It Is | What You Do |
|------|-----------|-------------|
| **📋 Template Files** | Infrastructure you customize | Modify for your agent |
| **📖 Reference Guides** | How-to documentation | Follow the instructions |
| **📤 Example Content** | Campaign marketing examples | Replace with your domain |

---

## 📋 TEMPLATE FILES (Customize These)

### What They Are
Core template files that you modify to create YOUR custom agent.

### Files List

| File | Purpose | Action Required |
|------|---------|-----------------|
| `agent.config.json` | Agent identity and branding | ✏️ Change name, description, icon, colors |
| `agents.config.json` | Multi-agent configuration | ✏️ Add/remove agents as needed |
| `.env.example` | Environment variables template | ✏️ Copy to `.env` and configure |
| `deployment.config.json` | Deployment settings | ✏️ Update for your deployment platform |
| `Agent_Chat_Interface.jsx` | Chat UI component | 🔧 Optionally customize UI |
| `setup.sh` | Setup wizard | ▶️ Run to configure template |

### Example Customization

**agent.config.json - BEFORE (Campaign Agent):**
```json
{
  "agent": {
    "name": "Campaign Strategist & Planner",
    "displayName": "Campaign Strategist & Planner",
    "description": "Expert digital marketing campaign strategist",
    "welcomeMessage": "👋 Hi! I'm your Campaign Strategist...",
    "icon": "🎯",
    "color": "#6366f1"
  }
}
```

**agent.config.json - AFTER (HR Agent):**
```json
{
  "agent": {
    "name": "HR Assistant",
    "displayName": "HR Assistant & Employee Support",
    "description": "Employee support and HR policy guide",
    "welcomeMessage": "👋 Hi! I'm your HR Assistant...",
    "icon": "👥",
    "color": "#10b981"
  }
}
```

---

## 📖 REFERENCE GUIDES (Follow These)

### What They Are
Universal how-to guides for configuring AWS Bedrock Agent Foundry. These are NOT domain-specific.

### Location
`Reference Files/` folder

### Files List

| Guide | Purpose | Domain-Specific? |
|-------|---------|------------------|
| `01_Create_Knowledge_Base_Guide.md` | How to create knowledge bases | ❌ No - Universal |
| `02_Create_Project_Guide.md` | How to create projects in Agent Foundry | ❌ No - Universal |
| `03_Create_Agents_Guide.md` | How to configure agents (all 30+ models) | ❌ No - Universal |
| `04_Add_Tools_Guide.md` | How to configure tools | ❌ No - Universal |
| `05_Add_Output_Guide.md` | How to configure outputs | ❌ No - Universal |
| `06_Add_Prompt_Variables_Guide.md` | How to use prompt variables | ❌ No - Universal |
| `07_Model_Comparison_Guide.md` | How to choose the right model | ❌ No - Universal |

### How to Use

**Scenario:** You're building an HR Assistant

1. ✅ **Start with** `01_Create_Knowledge_Base_Guide.md` to prepare your knowledge bases
2. ✅ **Then read** `03_Create_Agents_Guide.md` to understand agent configuration
3. ✅ **Follow** the instructions to configure YOUR HR agent
4. ✅ **Apply** the universal principles to your domain
5. ❌ **Don't** copy campaign-specific examples verbatim

**These guides teach you HOW to configure Agent Foundry, not WHAT to configure.**

**Note:** Always create your knowledge bases FIRST before setting up the project and agent.

---

## 📤 EXAMPLE CONTENT (Replace These)

### What They Are
Complete working examples showing a **Campaign Marketing Agent**. These demonstrate the concepts but are domain-specific.

### Files and Folders

#### 1. Agent_Knowledge_Bases/ ⚠️ REPLACE THESE

**Current Content:** Campaign marketing knowledge

| File | Domain | Replace With |
|------|--------|--------------|
| `KB1_Campaign_Planning_Fundamentals.md` | Marketing | YOUR domain fundamentals |
| `KB2_Meta_Advertising_Best_Practices.md` | Marketing | YOUR domain topic 2 |
| `KB3_Pinterest_Advertising_Best_Practices.md` | Marketing | YOUR domain topic 3 |
| ... (10 files total) | Marketing | YOUR knowledge bases |

**What to Do:**

**For HR Agent:**
```bash
# Delete or archive marketing KBs
mv Agent_Knowledge_Bases/*.md Agent_Knowledge_Bases/archive/

# Create HR knowledge bases
touch Agent_Knowledge_Bases/KB1_Company_HR_Policies.md
touch Agent_Knowledge_Bases/KB2_Employee_Benefits_Guide.md
touch Agent_Knowledge_Bases/KB3_Time_Off_Procedures.md
# ... etc
```

**For Support Agent:**
```bash
# Create support knowledge bases
touch Agent_Knowledge_Bases/KB1_Product_Documentation.md
touch Agent_Knowledge_Bases/KB2_Troubleshooting_Guide.md
touch Agent_Knowledge_Bases/KB3_FAQs.md
# ... etc
```

#### 2. Agent_Config/ ⚠️ USE AS TEMPLATES

**Current Content:** Campaign agent configuration examples

| File | What It Shows | How to Use |
|------|---------------|------------|
| `01_Create_Agent.md` | Campaign agent setup | Template - Adapt for your agent |
| `02_Add_Tools_Knowledge_Bases.md` | 12 campaign KB tools | Template - Adapt for your KBs |
| `03_Add_Output.md` | Campaign output formats | Template - Adapt for your outputs |
| `AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md` | Deployment steps | Universal guide - Follow as-is |

**What to Do:**

1. **Open** `01_Create_Agent.md`
2. **Read** the campaign agent configuration example
3. **Adapt** the system prompt for YOUR domain
4. **Replace** campaign-specific content with your requirements

**Example Adaptation:**

**Campaign Agent (Example):**
```
Agent name: Campaign Strategist & Planner
System Prompt: "You are an expert Campaign Strategist..."
Knowledge Bases: Marketing campaign knowledge
Tools: kb_campaign_fundamentals, kb_meta_advertising, etc.
```

**HR Agent (Your Version):**
```
Agent name: HR Assistant
System Prompt: "You are an expert HR Assistant..."
Knowledge Bases: HR policies and procedures
Tools: kb_hr_policies, kb_benefits, kb_leave_procedures, etc.
```

---

## 🔧 INFRASTRUCTURE (Keep As-Is)

### What They Are
Development tools, validation scripts, testing framework, plugin system. These work universally.

### Files and Folders

| Location | Purpose | Action |
|----------|---------|--------|
| `src/config/` | Environment configuration | ✅ Keep - Works universally |
| `src/plugins/` | Plugin system | ✅ Keep - Extend if needed |
| `tests/` | Test suite | ✅ Keep - Add your tests |
| `scripts/validate-kb.js` | KB validation | ✅ Keep - Use to validate YOUR KBs |
| `scripts/deploy.js` | Deployment automation | ✅ Keep - Use as-is |
| `config-editor/` | Visual config editor | ✅ Keep - Use to edit YOUR config |
| `vitest.config.js` | Test configuration | ✅ Keep - Works universally |

**No changes needed** - These work for any domain.

---

## 📊 Visual Distinction

```
PM-Agent-Squad-Master/
│
├── 📋 CUSTOMIZE (Your Agent)
│   ├── agent.config.json ← Change name, branding, settings
│   ├── agents.config.json ← Configure your agents
│   └── .env ← Your environment variables
│
├── 📖 FOLLOW (Instructions)
│   └── Reference Files/
│       ├── 01_Create_Knowledge_Base_Guide.md ← Start here!
│       ├── 02_Create_Project_Guide.md ← Read & follow
│       ├── 03_Create_Agents_Guide.md ← Read & follow
│       └── ... ← Universal how-to guides
│
├── 📤 REPLACE (Examples → Your Content)
│   ├── Agent_Knowledge_Bases/
│   │   ├── KB1_Campaign_*.md ← Replace with YOUR knowledge
│   │   └── KB2_Meta_*.md ← Replace with YOUR knowledge
│   │
│   └── Agent_Config/
│       ├── 01_Create_Agent.md ← Use as template
│       └── 02_Add_Tools_*.md ← Use as template
│
└── 🔧 KEEP (Infrastructure)
    ├── src/ ← Works universally
    ├── tests/ ← Works universally
    └── scripts/ ← Works universally
```

---

## 🎯 Step-by-Step: Building YOUR Agent

### Step 1: Understand What You Have

**Run this command to see the template:**
```bash
ls -la
```

**Identify:**
- ✅ Template files (agent.config.json, etc.)
- ✅ Reference guides (Reference Files/)
- ✅ Example content (Agent_Knowledge_Bases/, Agent_Config/)
- ✅ Infrastructure (src/, tests/, scripts/)

### Step 2: Customize Template Files

**Run the setup wizard:**
```bash
./setup.sh
```

**Or manually edit:**
```bash
# Edit agent identity
nano agent.config.json

# Configure environment
cp .env.example .env
nano .env
```

### Step 3: Replace Example Content

**3a. Knowledge Bases**
```bash
# Archive campaign examples
mkdir Agent_Knowledge_Bases/archive
mv Agent_Knowledge_Bases/KB*.md Agent_Knowledge_Bases/archive/

# Create your knowledge bases
# (See Agent_Knowledge_Bases/README.md for examples)
```

**3b. Agent Configuration**
```bash
# Read the examples in Agent_Config/
# Adapt them for your domain
# Don't copy campaign-specific content
```

### Step 4: Follow Reference Guides

**Read in this order:**
1. `Reference Files/01_Create_Knowledge_Base_Guide.md` - **Start here!**
2. `Reference Files/02_Create_Project_Guide.md`
3. `Reference Files/03_Create_Agents_Guide.md`
4. `Reference Files/04_Add_Tools_Guide.md`
5. `Reference Files/05_Add_Output_Guide.md`

**Apply to YOUR agent** as you read.

### Step 5: Use Infrastructure Tools

**Validate your knowledge bases:**
```bash
npm run validate:kb
```

**Test your configuration:**
```bash
npm test
```

**Run development server:**
```bash
npm run dev
```

---

## ❓ Common Questions

### Q: Can I use the campaign knowledge bases?

**A:** Only if you're building a campaign marketing agent. Otherwise, replace them with your domain knowledge.

### Q: Should I modify the Reference Guides?

**A:** No. Reference guides are universal how-to documentation. They work for any domain.

### Q: What if I want to build multiple agents?

**A:**
- Keep the same template infrastructure
- Create different knowledge base sets for each agent
- Use `agents.config.json` for multi-agent support
- See `Reference Files/02_Create_Agents_Guide.md` for multi-agent setup

### Q: Can I delete the campaign examples?

**A:** Yes! After understanding how they're structured:
```bash
mkdir Agent_Knowledge_Bases/archive
mv Agent_Knowledge_Bases/*.md Agent_Knowledge_Bases/archive/
```

### Q: How do I know what to change in Agent_Config files?

**A:** Look for campaign-specific content:
- ❌ "Campaign Strategist" → ✅ YOUR agent name
- ❌ "Meta advertising" → ✅ YOUR domain topics
- ❌ `kb_campaign_fundamentals` → ✅ YOUR tool names
- ✅ Keep the structure and format

---

## 📋 Checklist: Building Your Agent

### Understanding Phase
- [ ] Read this guide completely
- [ ] Identify template files vs. examples vs. infrastructure
- [ ] Understand what needs customization
- [ ] Read Agent_Knowledge_Bases/README.md
- [ ] Read Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md

### Customization Phase
- [ ] Run `./setup.sh` or manually configure
- [ ] Update `agent.config.json` with your agent identity
- [ ] Configure `.env` with your settings
- [ ] Create YOUR knowledge bases (replace campaign examples)
- [ ] Validate KBs: `npm run validate:kb`

### Configuration Phase
- [ ] Read Reference Files guides (01-07)
- [ ] Use Agent_Config files as templates (not verbatim)
- [ ] Configure YOUR agent in Agent Foundry
- [ ] Upload YOUR knowledge bases
- [ ] Set up YOUR tools

### Testing Phase
- [ ] Test knowledge base validation
- [ ] Test agent configuration
- [ ] Run development server
- [ ] Verify agent behavior
- [ ] Make adjustments

### Deployment Phase
- [ ] Follow AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md
- [ ] Deploy to Agent Foundry
- [ ] Test in production
- [ ] Monitor and iterate

---

## 🎓 Examples by Domain

### HR Assistant Template

**Customize:**
- `agent.config.json` → "HR Assistant"
- `Agent_Knowledge_Bases/` → HR policies, benefits, procedures
- `Agent_Config/` → HR-specific configuration

**Follow:**
- Reference Files (universal guides)

**Keep:**
- src/, tests/, scripts/ (infrastructure)

### Customer Support Template

**Customize:**
- `agent.config.json` → "Support Assistant"
- `Agent_Knowledge_Bases/` → Product docs, FAQs, troubleshooting
- `Agent_Config/` → Support-specific configuration

**Follow:**
- Reference Files (universal guides)

**Keep:**
- src/, tests/, scripts/ (infrastructure)

### IT Support Template

**Customize:**
- `agent.config.json` → "IT Support Agent"
- `Agent_Knowledge_Bases/` → System docs, setup guides, procedures
- `Agent_Config/` → IT-specific configuration

**Follow:**
- Reference Files (universal guides)

**Keep:**
- src/, tests/, scripts/ (infrastructure)

---

## 🔑 Key Takeaways

1. **Template Files** = Customize for your agent (agent.config.json, etc.)
2. **Reference Guides** = Follow instructions (universal, not domain-specific)
3. **Example Content** = Replace with your domain (KBs, config examples)
4. **Infrastructure** = Keep and use (validation, testing, deployment)

**The template gives you:**
- ✅ Working infrastructure
- ✅ Complete example to learn from
- ✅ Universal guides to follow
- ✅ Tools to validate and deploy

**You provide:**
- ✏️ Your agent's identity and branding
- ✏️ Your domain knowledge bases
- ✏️ Your agent's configuration
- ✏️ Your specific requirements

---

**Need Help?**
- Read: `TEMPLATE_GUIDE.md` for complete customization guide
- Check: `QUICK_REFERENCE.md` for command cheat sheet
- Review: `Agent_Knowledge_Bases/README.md` for KB guidelines
- See: `Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md` for deployment

---

**Template Version:** 2.0.0
**Last Updated:** November 12, 2025
**Status:** Production Ready
