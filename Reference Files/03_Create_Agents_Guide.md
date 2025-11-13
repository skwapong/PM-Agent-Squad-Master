# Agent Foundry - Create Agents Guide

## Overview

This guide explains how to create agents in Amazon Bedrock Agent Foundry. An agent is the core AI assistant that interacts with users and performs tasks.

## Agent Configuration Fields

### Basic Configuration

| Field | Description | Instructions | Example |
|-------|-------------|--------------|---------|
| **Agent Name** | Create a name that helps users understand what the agent is used for | Use clear, descriptive names that indicate the agent's purpose | "Campaign Strategist", "Email Creator", "HR Assistant" |
| **Model Name** | Select a model from the dropdown list | Choose based on your use case (reasoning vs. speed) | Claude 3.5 Sonnet V2, GPT-5, Nova Pro |

### Advanced Configuration

| Field | Description | Default | Range/Options |
|-------|-------------|---------|---------------|
| **Max Tools Iterations** | Tool iterations repeatedly refine and improve a tool by going through development cycles | 0 | 0-10 |
| **Temperature** | Controls the randomness of the LLM's output | 0.7 | 0.0 - 1.0 |
| **System Prompt** | Instruction for LLM model how it behaves, written in natural language | - | Natural language |

## Available Models

### AWS Nova Models
- **Nova Pro** - High performance, balanced capabilities
- **Nova Lite** - Lightweight, fast responses
- **Nova Micro** - Minimal resource usage

### Meta Llama Models
- **Llama 4 Maverick 17B** - Advanced reasoning
- **Llama 4 Scout 17B** - Fast inference

### Anthropic Claude Models
- **Claude 3.5 Sonnet V2** ⭐ Recommended for most use cases
- **Claude 3.5 Sonnet** - Previous generation
- **Claude 3.7 Sonnet** - Enhanced capabilities
- **Claude 4 Sonnet** - Latest generation
- **Claude 4 Opus** - Highest capability
- **Claude 4.5 Haiku** - Fast and efficient
- **Claude 4.5 Sonnet** - Latest balanced model
- **Claude 3 Haiku** - Legacy fast model

### OpenAI GPT Models
- **GPT-5** - Latest generation
- **GPT-5 mini** - Smaller, faster
- **GPT-5 nano** - Minimal size
- **GPT 4.1** - Previous generation
- **GPT 4.1 mini** - Compact version
- **GPT 4.1 nano** - Smallest version

### Google Gemini Models
- **Gemini 2.5 Flash** - Fast responses
- **Gemini 2.5 Pro** - High capability
- **Gemini 2.5 Flash-Lite** - Lightweight
- **Gemini 2.0 Flash-Lite** - Legacy fast model

## Model Selection Guide

### By Use Case

**High Reasoning Tasks** (Complex analysis, strategic planning):
- Claude 4 Opus
- GPT-5
- Gemini 2.5 Pro
- Nova Pro

**Fast Response Tasks** (Quick queries, simple Q&A):
- Claude 4.5 Haiku
- GPT-5 nano
- Gemini 2.5 Flash
- Nova Lite

**Balanced Tasks** (Most use cases):
- Claude 3.5 Sonnet V2 ⭐ **Recommended**
- GPT-5 mini
- Llama 4 Maverick 17B
- Gemini 2.5 Flash

**Cost-Sensitive Applications**:
- Nova Micro
- Claude 3 Haiku
- GPT 4.1 nano
- Gemini 2.0 Flash-Lite

## Temperature Settings

### What is Temperature?

Temperature controls the randomness/creativity of the model's responses:

- **Lower values (0.0 - 0.3)**: More deterministic and focused
- **Medium values (0.4 - 0.7)**: Balanced creativity and consistency
- **Higher values (0.8 - 1.0)**: More creative and varied

### Recommended Settings by Use Case

| Use Case | Temperature | Reasoning |
|----------|-------------|-----------|
| **Technical Documentation** | 0.1 - 0.3 | Need accuracy and consistency |
| **Customer Support** | 0.3 - 0.5 | Balance helpfulness and accuracy |
| **Creative Writing** | 0.7 - 0.9 | Need variety and creativity |
| **Data Analysis** | 0.2 - 0.4 | Need precision |
| **Marketing Copy** | 0.5 - 0.7 | Balance creativity and relevance |
| **General Q&A** | 0.5 - 0.7 | Good default range |

## System Prompt Best Practices

### Structure Your Prompt

A well-structured system prompt should include:

1. **Role Definition** - Who/what the agent is
2. **Responsibilities** - What the agent does
3. **Behavior Guidelines** - How the agent should act
4. **Output Format** - How responses should be structured
5. **Constraints** - What the agent should/shouldn't do

### Example System Prompts

#### Example 1: Campaign Strategist

```
You are an expert Campaign Strategist and Planner specializing in digital
marketing campaigns across Meta (Facebook & Instagram), Pinterest, Google
Ads, and TikTok platforms.

Your role is to help brand managers and marketers develop comprehensive,
strategic campaign plans by:
- Asking clarifying questions about business objectives, target audience,
  budget, and timeline
- Providing platform-specific recommendations based on campaign goals
- Developing audience targeting strategies
- Creating creative briefs and specifications
- Recommending budget allocation across platforms and funnel stages
- Establishing KPIs and measurement frameworks
- Providing industry benchmarks and best practices

Always structure your responses with:
1. Strategic recommendations with rationale
2. Platform-specific tactical guidance
3. Actionable next steps
4. Expected outcomes and benchmarks

Reference the knowledge bases to provide expert, data-driven recommendations.
Maintain a professional and consultative tone.
```

#### Example 2: Customer Support Agent

```
You are a helpful and empathetic Customer Support Agent for [Company Name].

Your responsibilities:
- Answer customer questions about products, orders, and policies
- Troubleshoot common issues using the knowledge base
- Escalate complex issues to human agents when necessary
- Maintain a friendly, professional tone

Response Guidelines:
1. Greet the customer warmly
2. Acknowledge their concern
3. Provide clear, step-by-step solutions
4. Confirm the issue is resolved
5. Offer additional help

Constraints:
- Do not make up information - only use knowledge base content
- Do not promise refunds without checking policies
- Always be respectful and patient
- If unsure, escalate to a human agent
```

#### Example 3: HR Assistant

```
You are an HR Assistant helping employees with HR-related questions and
processes.

You can help with:
- Company policies and procedures
- Benefits information
- Leave requests and time-off policies
- Onboarding processes
- General HR inquiries

Response Format:
1. Understand the employee's question
2. Provide accurate information from HR knowledge base
3. Include relevant policy references
4. Offer next steps or actions
5. Direct to appropriate HR contact if needed

Important:
- Maintain confidentiality
- Be objective and fair
- Follow company policies strictly
- Escalate sensitive matters to HR team
```

## Max Tools Iterations

### What are Tool Iterations?

Tool iterations allow the agent to:
1. Call a tool
2. Evaluate the result
3. Refine the approach
4. Call the tool again with improved parameters

### When to Use Multiple Iterations

**Use Higher Iterations (5-10) when:**
- Agent needs to refine searches
- Working with complex data queries
- Iterative problem-solving required
- Need to try multiple approaches

**Use Lower Iterations (0-2) when:**
- Simple, straightforward tasks
- Single-step operations
- Cost optimization is priority
- Response speed is critical

**Default (0) when:**
- No tools are used
- Simple Q&A agents
- Knowledge base queries only

## Step-by-Step Creation

### Step 1: Basic Configuration

1. **Agent Name**: Enter a descriptive name
   ```
   Example: "Campaign Strategist & Planner"
   ```

2. **Model Selection**: Choose appropriate model
   ```
   Recommended: Claude 3.5 Sonnet V2
   ```

### Step 2: Advanced Settings

1. **Temperature**: Set based on use case
   ```
   General Q&A: 0.5-0.7
   Technical: 0.1-0.3
   Creative: 0.7-0.9
   ```

2. **Max Tools Iterations**: Set based on complexity
   ```
   Simple agents: 0
   Standard agents: 2-5
   Complex agents: 5-10
   ```

### Step 3: System Prompt

1. Define the agent's role
2. List responsibilities
3. Specify behavior guidelines
4. Set output format
5. Define constraints

### Step 4: Review and Create

1. Review all settings
2. Test the prompt in preview (if available)
3. Click "Create Agent"
4. Proceed to add knowledge bases and tools

## Example Configurations

### Marketing Campaign Strategist

```yaml
Agent Name: Campaign Strategist & Planner
Model: Claude 3.5 Sonnet V2
Temperature: 0.6
Max Tools Iterations: 3

System Prompt: |
  You are an expert Campaign Strategist and Planner specializing in
  digital marketing campaigns...
  [See Example 1 above for full prompt]
```

### Customer Support Bot

```yaml
Agent Name: Customer Support Assistant
Model: Claude 4.5 Haiku
Temperature: 0.4
Max Tools Iterations: 2

System Prompt: |
  You are a helpful and empathetic Customer Support Agent...
  [See Example 2 above for full prompt]
```

### HR Assistant

```yaml
Agent Name: HR Assistant
Model: Claude 3.5 Sonnet V2
Temperature: 0.3
Max Tools Iterations: 1

System Prompt: |
  You are an HR Assistant helping employees...
  [See Example 3 above for full prompt]
```

## Testing Your Agent

After creation:

1. ✅ Send test queries
2. ✅ Verify tone and style match expectations
3. ✅ Check response accuracy
4. ✅ Test edge cases
5. ✅ Adjust temperature if needed
6. ✅ Refine system prompt based on results

## Common Issues and Solutions

### Issue: Agent Responses Too Random

**Solution:**
- Lower temperature (try 0.3-0.5)
- Make system prompt more specific
- Add more constraints

### Issue: Agent Responses Too Rigid

**Solution:**
- Increase temperature (try 0.6-0.8)
- Make system prompt more flexible
- Add creativity guidelines

### Issue: Agent Doesn't Follow Instructions

**Solution:**
- Make system prompt more explicit
- Use numbered lists and clear structure
- Add examples in the prompt
- Consider using a more capable model

## Next Steps

After creating your agent:

1. [Add Knowledge Bases](03_Create_Knowledge_Base_Guide.md)
2. [Configure Tools](04_Add_Tools_Guide.md)
3. [Set Up Outputs](05_Add_Output_Guide.md)
4. [Add Prompt Variables](06_Add_Prompt_Variables_Guide.md)

---

**Last Updated**: November 12, 2025
**Version**: 2.0.0
**Related to**: PM Agent Squad Master Template
