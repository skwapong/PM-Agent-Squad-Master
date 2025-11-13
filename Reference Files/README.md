# Reference Files - Agent Foundry Configuration Guides

## Overview

This directory contains comprehensive guides for configuring agents in Amazon Bedrock Agent Foundry. These files help you generate the required outputs for successful agent deployment.

## 📚 Quick Navigation

| Guide | Purpose | When to Use |
|-------|---------|-------------|
| [01 - Create Knowledge Base](01_Create_Knowledge_Base_Guide.md) | Create knowledge bases | **First Step** - Before creating project |
| [02 - Create Project](02_Create_Project_Guide.md) | Set up your project container | After preparing knowledge bases |
| [03 - Create Agents](03_Create_Agents_Guide.md) | Configure AI agents | After project creation |
| [04 - Add Tools](04_Add_Tools_Guide.md) | Extend agent capabilities | When agents need external tools |
| [05 - Add Output](05_Add_Output_Guide.md) | Configure output formats | For structured responses |
| [06 - Add Prompt Variables](06_Add_Prompt_Variables_Guide.md) | Dynamic data in prompts | For data-driven prompts |
| [07 - Model Comparison](07_Model_Comparison_Guide.md) | Choose the right model | During agent configuration |

## 🚀 Quick Start Workflow

### Step 1: Create Knowledge Bases
📄 **Guide**: [01_Create_Knowledge_Base_Guide.md](01_Create_Knowledge_Base_Guide.md)

```
✓ Prepare your domain knowledge
✓ Create KB files in Markdown (<18,000 characters each)
✓ Use proper structure and formatting
✓ Validate with npm run validate:kb
```

**Why First?** Having your knowledge bases ready before creating the project ensures you know exactly what resources your agent will need.

### Step 2: Create Your Project
📄 **Guide**: [02_Create_Project_Guide.md](02_Create_Project_Guide.md)

```
✓ Define project name
✓ Choose project type (self-defined recommended)
✓ Write description
✓ Enable features (runtime text, workflow executor)
```

### Step 3: Create Your Agent
📄 **Guide**: [03_Create_Agents_Guide.md](03_Create_Agents_Guide.md)

```
✓ Name your agent
✓ Select model (Claude 3.5 Sonnet V2 recommended)
✓ Set temperature (0.5-0.7 for general use)
✓ Write system prompt
✓ Configure max tool iterations
```

### Step 4: Add Tools (Optional)
📄 **Guide**: [04_Add_Tools_Guide.md](04_Add_Tools_Guide.md)

```
✓ Define function name
✓ Write function description
✓ Select target type
✓ Configure parameters
```

### Step 5: Configure Outputs (Optional)
📄 **Guide**: [05_Add_Output_Guide.md](05_Add_Output_Guide.md)

```
✓ Define output structure
✓ Choose output type
✓ Set JSON schema or artifact type
```

### Step 6: Add Prompt Variables (Optional)
📄 **Guide**: [06_Add_Prompt_Variables_Guide.md](06_Add_Prompt_Variables_Guide.md)

```
✓ Define variable name
✓ Select target knowledge base
✓ Configure list of variables
```

## 📖 Detailed Guide Summaries

### 01 - Create Knowledge Base Guide

**Topics Covered:**
- Text vs. Database knowledge bases
- 18,000 character limit management
- Markdown formatting
- SQL query guidelines
- Database functions
- Validation best practices

**Key Takeaways:**
- **Create KBs FIRST** before setting up project
- Stay under 18,000 characters per KB
- Use Markdown for text KBs
- Split large topics into multiple KBs
- Database KBs great for dynamic data

**Validation:**
```bash
npm run validate:kb
```

**Why Create Knowledge Bases First?**
- Helps you understand your agent's scope
- Ensures you know what tools and capabilities you'll need
- Makes project and agent configuration more focused
- Allows for better planning of agent architecture

---

### 02 - Create Project Guide

**Topics Covered:**
- Project configuration fields
- Self-defined vs. Managed projects
- Runtime text resources
- Workflow executor
- Naming best practices
- Example configurations

**Key Takeaways:**
- Create after preparing knowledge bases
- Always use descriptive project names
- Enable features you'll need later
- Self-defined gives most flexibility

---

### 03 - Create Agents Guide

**Topics Covered:**
- 30+ available models
- Temperature settings (0.0 - 1.0)
- System prompt engineering
- Max tool iterations
- Model comparison
- Use case recommendations

**Key Takeaways:**
- Claude 3.5 Sonnet V2 recommended for most use cases
- Temperature 0.5-0.7 is good default
- System prompt structure is critical
- Use tool iterations for complex tasks

**Recommended Models by Use Case:**
- **High Reasoning**: Claude 4 Opus, GPT-5
- **Fast Response**: Claude 4.5 Haiku, Nova Lite
- **Balanced**: Claude 3.5 Sonnet V2 ⭐
- **Cost-Sensitive**: Nova Micro, GPT 4.1 nano

---

### 04 - Add Tools Guide

**Topics Covered:**
- 4 tool types (KB, Agent, Image, Workflow)
- JSON schema creation
- Prompt templates
- Output modes
- Tool best practices

**Key Takeaways:**
- Knowledge Base tools for data queries
- Agent tools for specialized tasks
- Descriptive naming is crucial
- Test tools thoroughly

**Tool Types:**
1. **Knowledge Base** - Query data
2. **Agent** - Call other agents
3. **Image Generator** - Create visuals
4. **Workflow Executor** - Complex processes

---

### 05 - Add Output Guide

**Topics Covered:**
- Output types (Custom, Artifact)
- JSON schema for outputs
- Artifact content types
- Structured responses
- React code outputs

**Key Takeaways:**
- Use Custom for JSON schemas
- Use Artifact for rendered content
- React artifacts can include Plotly.js
- Define clear output structures

**Artifact Types:**
- Text - Formatted text content
- Image - Visual content
- React - Interactive dashboards

---

### 06 - Add Prompt Variables Guide

**Topics Covered:**
- Dynamic data in prompts
- Variable expressions
- Pattern matching
- Column selection
- Table filtering

**Key Takeaways:**
- Variables inject data into prompts
- Use patterns for flexible selection
- Exclude unwanted columns/tables
- Great for data-driven agents

**Expression Examples:**
```
customers                    # All columns from customers
customers.*, !customers.time # All except time
behavior_*.*                 # All behavior tables
```

---

### 07 - Model Comparison Guide

**Topics Covered:**
- Model capabilities
- Performance metrics
- Cost comparison
- Use case matching
- Speed vs. accuracy tradeoffs

**Key Takeaways:**
- Different models for different needs
- Balance cost, speed, and accuracy
- Test multiple models
- Consider token limits

## 🎯 Use Case Examples

### Marketing Campaign Agent

**Configuration:**
```yaml
Project: Marketing Campaign Platform
Agent: Campaign Strategist
Model: Claude 3.5 Sonnet V2
Temperature: 0.6
Knowledge Bases:
  - KB1: Campaign Planning Fundamentals
  - KB2: Platform Best Practices
  - KB3: Creative Guidelines
Tools:
  - search_campaign_data (Knowledge Base)
  - generate_creative_brief (Agent)
Outputs:
  - campaign_plan (Custom JSON)
  - plotly_chart (Artifact - React)
```

### Customer Support Agent

**Configuration:**
```yaml
Project: Customer Support Hub
Agent: Support Assistant
Model: Claude 4.5 Haiku
Temperature: 0.4
Knowledge Bases:
  - KB1: Product Documentation
  - KB2: FAQs
  - KB3: Troubleshooting Guide
Tools:
  - search_orders (Database)
  - escalate_to_human (Workflow)
Outputs:
  - support_ticket (Custom JSON)
```

### HR Assistant

**Configuration:**
```yaml
Project: HR Platform
Agent: HR Assistant
Model: Claude 3.5 Sonnet V2
Temperature: 0.3
Knowledge Bases:
  - KB1: HR Policies
  - KB2: Benefits Information
  - KB3: Leave Procedures
Tools:
  - query_employee_data (Database)
  - submit_leave_request (Workflow)
Outputs:
  - policy_summary (Artifact - Text)
```

## 🔧 Validation Tools

### Knowledge Base Validation

```bash
# Validate all knowledge bases
npm run validate:kb

# Verbose output
npm run validate:kb:verbose
```

**Checks:**
- File size limits
- Markdown syntax
- UTF-8 encoding
- Required sections
- Duplicate content

### Configuration Validation

```bash
# Run tests
npm test

# Test configuration
npm test agent-config.test.js

# Test environment
npm test config/env.test.js
```

## 📝 Original CSV Files (Archived)

Original CSV files have been **converted to comprehensive Markdown guides** and archived.

**Why Markdown instead of CSV?**
- ✅ Better formatting with headers, code blocks, and tables
- ✅ Syntax highlighting in code editors
- ✅ Industry standard format for documentation
- ✅ Easier to maintain and update
- ✅ Can include detailed examples and explanations
- ✅ Better readability and structure

**All CSV content has been preserved and enhanced** in the Markdown guides (01-07) listed above.

If you need to reference the original CSV files, they are available in the `Archive/` subfolder.

## 🎓 Learning Path

### For Beginners

1. Start with [01_Create_Knowledge_Base_Guide.md](01_Create_Knowledge_Base_Guide.md) - **Prepare your knowledge first!**
2. Then [02_Create_Project_Guide.md](02_Create_Project_Guide.md) - Set up your project
3. Next [03_Create_Agents_Guide.md](03_Create_Agents_Guide.md) - Configure your agent
4. Review examples in each guide
5. Use validation tools

### For Advanced Users

1. Review [07_Model_Comparison_Guide.md](07_Model_Comparison_Guide.md)
2. Study [04_Add_Tools_Guide.md](04_Add_Tools_Guide.md) for complex integrations
3. Explore [05_Add_Output_Guide.md](05_Add_Output_Guide.md) for custom outputs
4. Check [06_Add_Prompt_Variables_Guide.md](06_Add_Prompt_Variables_Guide.md) for dynamic data

## 🆘 Troubleshooting

### Common Issues

**Issue**: Knowledge base too large
- **Solution**: See [03_Create_Knowledge_Base_Guide.md](03_Create_Knowledge_Base_Guide.md) - "Character Limit Management"

**Issue**: Agent not using tools
- **Solution**: See [04_Add_Tools_Guide.md](04_Add_Tools_Guide.md) - "Common Issues and Solutions"

**Issue**: Unclear which model to choose
- **Solution**: See [07_Model_Comparison_Guide.md](07_Model_Comparison_Guide.md) - "Model Selection Guide"

**Issue**: System prompt not working
- **Solution**: See [02_Create_Agents_Guide.md](02_Create_Agents_Guide.md) - "System Prompt Best Practices"

## 📚 Related Documentation

- [Agent Foundry Deployment Guide](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)
- [Template Guide](../TEMPLATE_GUIDE.md)
- [Implementation Summary](../IMPLEMENTATION_SUMMARY.md)
- [Quick Reference](../QUICK_REFERENCE.md)

## 🔄 Updates and Maintenance

These guides are maintained as part of the PM Agent Squad Master template.

**Current Version**: 2.0.0
**Last Updated**: November 12, 2025

**Update Schedule:**
- Review quarterly for model updates
- Update as Agent Foundry features change
- Add new examples from community

## 💡 Tips for Success

1. **Read Before Building**: Review relevant guides before starting
2. **Use Examples**: Adapt examples to your use case
3. **Validate Often**: Use validation tools frequently
4. **Test Thoroughly**: Test agents with various inputs
5. **Iterate**: Refine based on results
6. **Document**: Keep track of your configuration choices

## 🤝 Contributing

To improve these guides:
1. Test configurations with real use cases
2. Document what works and what doesn't
3. Share examples and best practices
4. Report issues or unclear sections
5. Suggest improvements

---

**Questions?** Check the specific guide for your topic or review the [main documentation](../README.md).

**Ready to Deploy?** See [Agent Foundry Deployment Guide](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md).
