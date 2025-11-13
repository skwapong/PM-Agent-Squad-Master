# Agent Foundry - Add Tools Guide

## Overview

Tools extend your agent's capabilities beyond simple question-answering. This guide explains how to add and configure tools in Amazon Bedrock Agent Foundry.

## Tool Types

Agent Foundry supports four types of tools:

| Tool Type | Purpose | Use Case |
|-----------|---------|----------|
| **Knowledge Base** | Query structured data | Search databases, retrieve specific information |
| **Agent** | Call another agent | Multi-agent workflows, specialized tasks |
| **Image Generator** | Create/edit images | Visual content creation, image manipulation |
| **Workflow Executor** | Run complex workflows | Multi-step processes, automation |

## Tool Configuration Fields

### Common Fields (All Tool Types)

| Field | Description | Required | Example |
|-------|-------------|----------|---------|
| **Function Name** | Unique identifier for the tool | ✅ Yes | `search_campaign_data`, `generate_creative` |
| **Function Description** | How the tool should be used | ⚪ Optional | "Search for campaign performance metrics by date range and platform" |

### Knowledge Base Tool

| Field | Description | Instructions |
|-------|-------------|--------------|
| **Target** | Tool type | Select "Knowledge Base" |
| **Target Knowledge Base** | Which KB to query | Select from dropdown |
| **Target Function** | Query type | Options: List columns, Search schema, Query data directly |

**Available Functions:**
- `List columns` - List available tables and columns
- `Search schema` - Search database structure
- `Query data directly (Presto SQL)` - Execute custom SQL queries

**Database-Specific Functions:**
- `List segment folders` - List folders in parent segment
- `List by folder` - List instances in specific folder (requires folder ID)
- `List attributes` - Get attribute definitions
- `List behaviors` - Get behavior definitions
- `Get segment` - Get segment metadata (requires segment ID)
- `Get journey` - Get journey metadata (requires journey ID)
- `Get audience` - Get parent segment config (requires journey ID)
- `Get query` - Get count SQL for segment (requires segment ID)
- `Query segment analytics` - Analyze segment with SQL (requires segment ID)

### Agent Tool

| Field | Description | Instructions |
|-------|-------------|--------------|
| **Target** | Tool type | Select "Agent" |
| **Target Agent** | Which agent to call | Select from dropdown |
| **Output Mode** | How to handle output | Options: Return, Show |
| **JSON Schema** | Argument structure | Define input parameters |
| **Prompt Template** | Prompt for target agent | Use {{parameter_name}} for variables |

**Output Modes:**
- **Return**: Target agent passes output to caller agent, which formats final response
- **Show**: Target agent's output rendered directly to user

### Image Generator Tool

| Field | Description | Available Functions |
|-------|-------------|---------------------|
| **Target** | Tool type | Select "Image Generator" |
| **Target Image Generator** | Which generator to use | Select from existing generators |
| **Target Function** | Image operation | See options below |

**Available Functions:**
- **Text to Image** - Create image from text prompt (0-to-1 creation)
- **Outpaint** - Edit the surroundings of specified area
- **Inpaint** - Edit inside specific area
- **Image Variation** - Create variations from given image
- **Remove Background** - Remove surroundings of specified area

### Workflow Executor Tool

| Field | Description | Available Functions |
|-------|-------------|---------------------|
| **Target** | Tool type | Select "Workflow Executor" |
| **Target Function** | Workflow operation | See options below |

**Available Functions:**
- **Execute workflow** - Run workflow with workflow ID
- **Search workflow** - Find specific workflow to execute

## Examples

### Example 1: Knowledge Base Query Tool

**Use Case:** Search campaign performance data

```yaml
Function Name: search_campaign_metrics
Function Description: |
  Search for campaign performance metrics including impressions, clicks,
  conversions, and spend. Accepts date range and platform filters.

Target: Knowledge Base
Target Knowledge Base: Campaign_Performance_DB
Target Function: Query data directly (Presto SQL)
```

**How Agent Uses It:**
```
User: "Show me Meta campaign performance for last week"

Agent thinks: User wants campaign data for Meta platform from last 7 days
Agent calls: search_campaign_metrics
Agent receives: Performance data
Agent responds: "Here are your Meta campaign metrics..."
```

### Example 2: Multi-Agent Tool

**Use Case:** Email creation with specialized agent

```yaml
Function Name: create_email_draft
Function Description: |
  Creates a professional email draft based on the campaign brief.
  Returns formatted email with subject, body, and CTA.

Target: Agent
Target Agent: Email_Creator_Agent
Output Mode: Return

JSON Schema:
{
  "type": "object",
  "properties": {
    "campaign_name": {
      "type": "string",
      "description": "Name of the marketing campaign"
    },
    "target_audience": {
      "type": "string",
      "description": "Target audience description"
    },
    "key_message": {
      "type": "string",
      "description": "Main message to communicate"
    },
    "cta": {
      "type": "string",
      "description": "Call-to-action text"
    }
  },
  "required": ["campaign_name", "key_message"]
}

Prompt Template: |
  Create a professional email for the {{campaign_name}} campaign.
  Target audience: {{target_audience}}
  Key message: {{key_message}}
  Call-to-action: {{cta}}

  Generate an engaging subject line and email body that will drive conversions.
```

### Example 3: Image Generation Tool

**Use Case:** Create campaign visuals

```yaml
Function Name: generate_campaign_visual
Function Description: |
  Generate campaign visuals from text descriptions. Creates professional
  marketing images suitable for ads and social media.

Target: Image Generator
Target Image Generator: Marketing_Image_Gen
Target Function: Text to Image
```

**Usage:**
```
User: "Create an image for summer sale campaign with beach theme"

Agent calls: generate_campaign_visual
  Prompt: "Professional summer sale advertisement, beach theme,
           bright colors, tropical vibes, marketing quality"

Returns: Generated image URL
```

### Example 4: Workflow Executor

**Use Case:** Campaign approval workflow

```yaml
Function Name: submit_campaign_for_approval
Function Description: |
  Submits completed campaign plan to approval workflow. Notifies
  stakeholders and tracks approval status.

Target: Workflow Executor
Target Function: Execute workflow
```

## JSON Schema Guide

### Basic Schema Structure

```json
{
  "type": "object",
  "properties": {
    "parameter_name": {
      "type": "string|number|boolean|array|object",
      "description": "Clear description of parameter"
    }
  },
  "required": ["list", "of", "required", "parameters"]
}
```

### Data Types

**String:**
```json
{
  "campaign_name": {
    "type": "string",
    "description": "Name of the campaign",
    "minLength": 1,
    "maxLength": 100
  }
}
```

**Number:**
```json
{
  "budget": {
    "type": "number",
    "description": "Campaign budget in USD",
    "minimum": 0,
    "maximum": 1000000
  }
}
```

**Boolean:**
```json
{
  "is_active": {
    "type": "boolean",
    "description": "Whether campaign is currently active"
  }
}
```

**Array:**
```json
{
  "platforms": {
    "type": "array",
    "description": "List of advertising platforms",
    "items": {
      "type": "string",
      "enum": ["Meta", "Google", "Pinterest", "TikTok"]
    }
  }
}
```

**Object:**
```json
{
  "targeting": {
    "type": "object",
    "description": "Audience targeting parameters",
    "properties": {
      "age_min": {"type": "number"},
      "age_max": {"type": "number"},
      "locations": {
        "type": "array",
        "items": {"type": "string"}
      }
    }
  }
}
```

### Complete Example Schema

```json
{
  "type": "object",
  "properties": {
    "campaign_name": {
      "type": "string",
      "description": "Unique campaign identifier",
      "minLength": 3,
      "maxLength": 50
    },
    "platforms": {
      "type": "array",
      "description": "Advertising platforms to use",
      "items": {
        "type": "string",
        "enum": ["Meta", "Google Ads", "Pinterest", "TikTok"]
      },
      "minItems": 1
    },
    "budget": {
      "type": "number",
      "description": "Total campaign budget in USD",
      "minimum": 100,
      "maximum": 100000
    },
    "start_date": {
      "type": "string",
      "description": "Campaign start date (YYYY-MM-DD)",
      "pattern": "^\\d{4}-\\d{2}-\\d{2}$"
    },
    "target_audience": {
      "type": "object",
      "description": "Audience targeting details",
      "properties": {
        "age_range": {
          "type": "object",
          "properties": {
            "min": {"type": "number", "minimum": 18},
            "max": {"type": "number", "maximum": 65}
          }
        },
        "interests": {
          "type": "array",
          "items": {"type": "string"}
        }
      }
    }
  },
  "required": ["campaign_name", "platforms", "budget"]
}
```

## Prompt Template Guide

### Using Variables

Variables are defined in JSON schema and referenced in prompt template:

```
Prompt Template:
Create a {{campaign_type}} campaign for {{product_name}}.

Target audience: {{audience_description}}
Budget: ${{budget}}
Duration: {{duration}} days

Platform-specific requirements for {{platform}}:
[Continue with instructions...]
```

### Best Practices

1. **Be Specific**: Clear instructions get better results
2. **Provide Context**: Include relevant background information
3. **Set Expectations**: Define desired output format
4. **Use Examples**: Show what good output looks like

### Example Template

```
You are creating a comprehensive marketing campaign plan.

Campaign Details:
- Name: {{campaign_name}}
- Objective: {{objective}}
- Platform: {{platform}}
- Budget: ${{budget}}
- Duration: {{duration}} days

Target Audience:
{{audience_description}}

Requirements:
1. Create campaign structure with ad sets and ads
2. Recommend targeting parameters
3. Suggest creative concepts
4. Define success metrics
5. Provide budget allocation breakdown

Output Format:
Provide a detailed plan with clear sections for each requirement.
Use bullet points for clarity. Include specific recommendations
with rationale.
```

## Tool Best Practices

### 1. Descriptive Naming

✅ **Good:**
- `search_campaign_performance`
- `generate_creative_brief`
- `calculate_roi_metrics`

❌ **Avoid:**
- `tool1`
- `search`
- `function`

### 2. Clear Descriptions

✅ **Good:**
```
"Search campaign performance data by date range, platform, and metrics.
Returns impressions, clicks, conversions, spend, and calculated ROI."
```

❌ **Avoid:**
```
"Gets data"
```

### 3. Appropriate Tool Selection

- **Use Knowledge Base** for data queries
- **Use Agent** for complex, specialized tasks
- **Use Image Generator** for visual content
- **Use Workflow** for multi-step processes

### 4. Error Handling

Design tools to handle:
- Missing parameters
- Invalid inputs
- Empty results
- Connection issues

### 5. Testing

Test tools with:
- Valid inputs
- Edge cases
- Invalid inputs
- Missing required parameters

## Common Issues and Solutions

### Issue: Agent Doesn't Use Tool

**Solution:**
- Make function description more specific
- Include use case examples in description
- Ensure tool is properly attached to agent
- Check JSON schema is valid

### Issue: Tool Returns Errors

**Solution:**
- Validate JSON schema
- Check all required parameters
- Test prompt template variables
- Verify target resource exists

### Issue: Wrong Tool Selected

**Solution:**
- Make tool descriptions more distinct
- Add specific keywords to descriptions
- Reduce number of similar tools
- Be more explicit in tool purpose

## Next Steps

After adding tools:

1. [Configure Outputs](05_Add_Output_Guide.md)
2. [Set Up Prompt Variables](06_Add_Prompt_Variables_Guide.md)
3. [Test Tools](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)
4. [Deploy Agent](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)

---

**Last Updated**: November 12, 2025
**Version**: 2.0.0
**Related to**: PM Agent Squad Master Template
