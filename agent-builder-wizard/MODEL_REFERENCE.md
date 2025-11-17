# AI Model Reference Guide

## Quick Recommendations

### 🥇 Primary Recommendation: **Claude 3.5 Sonnet v2**
**Best for:** Most agent use cases (90% of scenarios)
- **Model ID:** `anthropic.claude-3-5-sonnet-20241022-v2:0`
- **Strengths:** Complex reasoning, empathy, long context (200K tokens), excellent instruction following
- **Price:** $3 per 1M input tokens, $15 per 1M output tokens
- **Use When:** Building customer-facing agents, complex multi-step workflows, analysis tasks

### 🥈 Second Choice: **Claude 3.5 Haiku**
**Best for:** High-volume, cost-sensitive use cases
- **Model ID:** `anthropic.claude-3-5-haiku-20241022-v1:0`
- **Strengths:** Fast (<3s latency), cost-effective, good for simple tasks
- **Price:** $0.80 per 1M input tokens, $4 per 1M output tokens (75% cheaper)
- **Use When:** Simple queries, high request volume, real-time responses needed

### 🥉 Third Choice: **GPT-4o**
**Best for:** OpenAI ecosystem integrations
- **Model ID:** `openai.gpt-4o`
- **Strengths:** Strong general capabilities, good vision support, structured outputs
- **Price:** $2.50 per 1M input tokens, $10 per 1M output tokens
- **Use When:** Already using OpenAI tools, need vision capabilities, prefer OpenAI API

---

## All Supported Models

### Anthropic Claude Models

#### Claude 3.5 Sonnet v2 ⭐ RECOMMENDED
- **Model ID:** `anthropic.claude-3-5-sonnet-20241022-v2:0`
- **Context Window:** 200,000 tokens
- **Max Output:** 8,192 tokens
- **Strengths:**
  - Best-in-class reasoning and analysis
  - Excellent at following complex instructions
  - Strong coding and technical knowledge
  - Nuanced understanding of context
  - Great for empathetic, human-like responses
- **Weaknesses:**
  - Higher cost than Haiku
  - Slower than Haiku (5-8s avg response time)
- **Ideal For:**
  - Customer service agents
  - Data analysis agents
  - Content creation agents
  - Complex multi-step workflows
  - Agents requiring nuanced understanding
- **Pricing:** $3 / $15 per 1M tokens (input/output)

#### Claude 3.5 Haiku
- **Model ID:** `anthropic.claude-3-5-haiku-20241022-v1:0`
- **Context Window:** 200,000 tokens
- **Max Output:** 8,192 tokens
- **Strengths:**
  - Fastest Claude model (<3s response)
  - Most cost-effective
  - Good for structured data extraction
  - Handles simple to moderate complexity well
- **Weaknesses:**
  - Less nuanced than Sonnet
  - Not ideal for complex reasoning
  - May struggle with ambiguous queries
- **Ideal For:**
  - FAQ chatbots
  - Data extraction agents
  - High-volume, simple queries
  - Real-time applications
  - Budget-conscious projects
- **Pricing:** $0.80 / $4 per 1M tokens (input/output)

#### Claude 3 Opus
- **Model ID:** `anthropic.claude-3-opus-20240229-v1:0`
- **Context Window:** 200,000 tokens
- **Max Output:** 4,096 tokens
- **Strengths:**
  - Highest intelligence (previous flagship)
  - Excellent at very complex tasks
  - Strong research and analysis
- **Weaknesses:**
  - **⚠️ Superseded by Claude 3.5 Sonnet v2** (better performance, lower cost)
  - Slower response times
  - Highest pricing
- **Why Not Recommended:**
  - Claude 3.5 Sonnet v2 outperforms Opus on most benchmarks
  - 3.5 Sonnet is 60% cheaper
  - No significant advantage over 3.5 Sonnet for agent use cases
- **Only Use If:** You have specific compatibility requirements with legacy systems
- **Pricing:** $15 / $75 per 1M tokens (input/output)

---

### OpenAI Models

#### GPT-4o
- **Model ID:** `openai.gpt-4o`
- **Context Window:** 128,000 tokens
- **Max Output:** 16,384 tokens
- **Strengths:**
  - Strong general-purpose model
  - Excellent vision capabilities (image understanding)
  - Good at structured output (JSON mode)
  - Fast (similar to Claude Sonnet)
- **Weaknesses:**
  - Smaller context window than Claude
  - Can be verbose (higher output tokens)
  - Less nuanced on empathetic tasks
- **Ideal For:**
  - Agents processing images/documents
  - Projects already using OpenAI ecosystem
  - Structured data generation
  - Function calling use cases
- **Pricing:** $2.50 / $10 per 1M tokens (input/output)

#### GPT-4o Mini
- **Model ID:** `openai.gpt-4o-mini`
- **Context Window:** 128,000 tokens
- **Max Output:** 16,384 tokens
- **Strengths:**
  - Very fast (< 2s response)
  - Cost-effective
  - Good for simple queries
- **Weaknesses:**
  - Less capable than full GPT-4o
  - Smaller context than Claude Haiku
  - Not ideal for complex reasoning
- **Ideal For:**
  - High-volume, simple tasks
  - Cost-sensitive projects
  - Quick responses needed
- **Pricing:** $0.15 / $0.60 per 1M tokens (input/output)

#### GPT-4 Turbo
- **Model ID:** `openai.gpt-4-turbo-2024-04-09`
- **Context Window:** 128,000 tokens
- **Max Output:** 4,096 tokens
- **Strengths:**
  - Reliable, well-tested model
  - Good general capabilities
- **Weaknesses:**
  - **⚠️ Superseded by GPT-4o** (better, faster, cheaper)
  - Slower than GPT-4o
  - More expensive than GPT-4o
- **Why Not Recommended:**
  - GPT-4o outperforms on all metrics
  - GPT-4o is 50% cheaper
- **Only Use If:** Specific compatibility requirements
- **Pricing:** $10 / $30 per 1M tokens (input/output)

---

### Amazon Bedrock Models

#### Amazon Nova Pro v1
- **Model ID:** `amazon.nova-pro-v1:0`
- **Context Window:** 300,000 tokens
- **Max Output:** 5,000 tokens
- **Strengths:**
  - Longest context window (300K)
  - AWS-native (good for AWS environments)
  - Cost-effective
  - Multimodal (text, image, video)
- **Weaknesses:**
  - Newer model, less battle-tested
  - Not as strong as Claude/GPT on complex reasoning
  - Limited community knowledge base
- **Ideal For:**
  - AWS-heavy infrastructure
  - Long document processing
  - Video/image understanding
  - Budget-conscious AWS users
- **Pricing:** $0.80 / $3.20 per 1M tokens (input/output)

#### Amazon Nova Lite v1
- **Model ID:** `amazon.nova-lite-v1:0`
- **Context Window:** 300,000 tokens
- **Max Output:** 5,000 tokens
- **Strengths:**
  - Fastest Amazon model
  - Very low cost
  - Good for simple tasks
- **Weaknesses:**
  - Least capable Nova model
  - Not recommended for complex agents
- **Ideal For:**
  - Very simple FAQ bots
  - High-volume, low-complexity
  - Extremely budget-constrained
- **Pricing:** $0.06 / $0.24 per 1M tokens (input/output)

#### Amazon Nova Micro v1
- **Model ID:** `amazon.nova-micro-v1:0`
- **Context Window:** 128,000 tokens
- **Max Output:** 5,000 tokens
- **Strengths:**
  - Lowest cost
  - Acceptable for very simple use cases
- **Weaknesses:**
  - **⚠️ NOT RECOMMENDED for agents**
  - Limited reasoning capability
  - Poor at complex instructions
- **Why Not Recommended:**
  - Too basic for most agent use cases
  - Low quality outputs
  - High likelihood of errors
- **Only Use If:** Extreme cost constraints + very simple tasks (e.g., classification)
- **Pricing:** $0.035 / $0.14 per 1M tokens (input/output)

---

### Meta Llama Models

#### Llama 3.1 405B Instruct
- **Model ID:** `meta.llama3-1-405b-instruct-v1:0`
- **Context Window:** 128,000 tokens
- **Max Output:** 4,096 tokens
- **Strengths:**
  - Open-source friendly
  - Strong reasoning for open model
  - Good for code generation
- **Weaknesses:**
  - Not as capable as Claude 3.5 or GPT-4o
  - Slower inference
  - Can be less reliable on edge cases
- **Ideal For:**
  - Open-source preference
  - Code-heavy agents
  - On-premise deployment needs
- **Pricing:** $2.65 / $3.50 per 1M tokens (input/output)

#### Llama 3.1 70B Instruct
- **Model ID:** `meta.llama3-1-70b-instruct-v1:0`
- **Context Window:** 128,000 tokens
- **Max Output:** 4,096 tokens
- **Strengths:**
  - Good balance of cost/performance for open models
  - Faster than 405B
- **Weaknesses:**
  - Less capable than proprietary models
  - Can struggle with nuanced tasks
- **Ideal For:**
  - Open-source projects
  - Moderate complexity agents
  - Cost-sensitive with open-source requirement
- **Pricing:** $0.99 / $0.99 per 1M tokens (input/output)

#### Llama 3.1 8B Instruct
- **Model ID:** `meta.llama3-1-8b-instruct-v1:0`
- **Context Window:** 128,000 tokens
- **Max Output:** 4,096 tokens
- **Strengths:**
  - Very fast
  - Low cost
  - Open-source
- **Weaknesses:**
  - **⚠️ NOT RECOMMENDED for production agents**
  - Inconsistent quality
  - Poor at complex instructions
- **Why Not Recommended:**
  - Too limited for most real-world agents
  - High error rate
- **Only Use If:** Testing/prototyping with open-source requirement
- **Pricing:** $0.22 / $0.22 per 1M tokens (input/output)

---

### Mistral Models

#### Mistral Large 2 (24.11)
- **Model ID:** `mistral.mistral-large-2411-v1:0`
- **Context Window:** 128,000 tokens
- **Max Output:** 8,192 tokens
- **Strengths:**
  - Strong European alternative
  - Good multilingual support
  - Competitive performance
- **Weaknesses:**
  - Not as refined as Claude/GPT
  - Smaller ecosystem
- **Ideal For:**
  - European data residency requirements
  - Multilingual agents (especially European languages)
  - Open-source preference
- **Pricing:** $2 / $6 per 1M tokens (input/output)

#### Mistral Small (24.09)
- **Model ID:** `mistral.mistral-small-2409-v1:0`
- **Context Window:** 128,000 tokens
- **Max Output:** 8,192 tokens
- **Strengths:**
  - Cost-effective
  - Good for simple-to-moderate tasks
- **Weaknesses:**
  - Less capable than Mistral Large
  - Not ideal for complex agents
- **Ideal For:**
  - Budget-conscious EU projects
  - Simple agents with EU requirements
- **Pricing:** $0.20 / $0.60 per 1M tokens (input/output)

---

## Model Selection Decision Tree

```
START: What's your primary constraint?

├─ COST is primary concern
│  ├─ Simple queries only → Claude 3.5 Haiku
│  ├─ Moderate complexity → GPT-4o Mini
│  └─ Complex reasoning still needed → Claude 3.5 Sonnet v2 (best value)
│
├─ SPEED is primary concern
│  ├─ Need <2s response → GPT-4o Mini or Claude Haiku
│  └─ <5s acceptable → Claude 3.5 Sonnet v2 or GPT-4o
│
├─ QUALITY is primary concern
│  ├─ Complex reasoning → Claude 3.5 Sonnet v2 ⭐
│  ├─ Vision/multimodal → GPT-4o or Nova Pro
│  └─ Code generation → Claude 3.5 Sonnet v2 or Llama 405B
│
├─ CONTEXT LENGTH is critical
│  ├─ Need >200K tokens → Amazon Nova Pro (300K)
│  └─ 200K sufficient → Claude 3.5 Sonnet v2
│
├─ COMPLIANCE/RESIDENCY
│  ├─ EU data residency → Mistral Large
│  ├─ AWS-only infrastructure → Amazon Nova Pro
│  └─ Open-source required → Llama 3.1 405B
│
└─ DEFAULT (most use cases) → Claude 3.5 Sonnet v2 ⭐
```

---

## Use Case Recommendations

### Customer Service Agents
**1st Choice:** Claude 3.5 Sonnet v2
- Empathetic, nuanced responses
- Excellent at understanding customer intent
- Good at de-escalation

**2nd Choice:** GPT-4o
- Good general capabilities
- Reliable performance

**Avoid:** Haiku, small models (lack empathy/nuance)

### Data Analysis Agents
**1st Choice:** Claude 3.5 Sonnet v2
- Best reasoning and analysis
- Excellent at explaining insights

**2nd Choice:** GPT-4o
- Good at structured outputs
- Strong data interpretation

**Avoid:** Small models (poor analytical reasoning)

### Content Creation Agents
**1st Choice:** Claude 3.5 Sonnet v2
- Creative, engaging writing
- Excellent tone matching
- Long-form content expertise

**2nd Choice:** GPT-4o
- Good writing quality
- Strong at formatting

**Avoid:** Technical/code-focused models

### FAQ / Simple Query Bots
**1st Choice:** Claude 3.5 Haiku
- Fast, cost-effective
- Good enough for FAQs

**2nd Choice:** GPT-4o Mini
- Very fast
- Low cost

**Can Use:** Nova Lite (if on AWS)

### Code Generation Agents
**1st Choice:** Claude 3.5 Sonnet v2
- Excellent at code understanding
- Good at debugging
- Strong explanation skills

**2nd Choice:** Llama 3.1 405B
- Open-source advantage
- Good code capabilities

**Avoid:** Small models, Nova models

---

## Cost Comparison (1M Tokens)

| Model | Input Cost | Output Cost | Total (1M in + 1M out) |
|-------|------------|-------------|------------------------|
| Nova Micro | $0.035 | $0.14 | $0.175 ⭐ Cheapest |
| Nova Lite | $0.06 | $0.24 | $0.30 |
| GPT-4o Mini | $0.15 | $0.60 | $0.75 |
| Mistral Small | $0.20 | $0.60 | $0.80 |
| Haiku | $0.80 | $4 | $4.80 |
| Llama 70B | $0.99 | $0.99 | $1.98 |
| Mistral Large | $2 | $6 | $8 |
| GPT-4o | $2.50 | $10 | $12.50 |
| Llama 405B | $2.65 | $3.50 | $6.15 |
| **Sonnet v2** | **$3** | **$15** | **$18** ⭐ Best Value |
| Nova Pro | $0.80 | $3.20 | $4 |
| GPT-4 Turbo | $10 | $30 | $40 |
| Opus | $15 | $75 | $90 ❌ Most Expensive |

**Note:** "Best Value" = Best performance per dollar. Sonnet v2 significantly outperforms cheaper models.

---

## When NOT to Use Recommended Models

### Don't Use Claude 3.5 Sonnet v2 When:
- ❌ Extreme budget constraints (<$1 per 1M tokens)
- ❌ Need sub-2 second responses consistently
- ❌ Simple FAQ bot (overkill, use Haiku)
- ❌ Already deeply integrated with OpenAI (use GPT-4o)
- ❌ Require AWS-native solution (use Nova Pro)

### Don't Use Claude 3.5 Haiku When:
- ❌ Need complex reasoning or analysis
- ❌ Require nuanced, empathetic responses
- ❌ Working with ambiguous or edge-case queries
- ❌ Quality is more important than speed/cost

### Don't Use GPT-4o When:
- ❌ Need >128K context window (use Claude or Nova)
- ❌ Budget is very tight (Claude Haiku is cheaper and often better)
- ❌ Don't need vision capabilities (Claude Sonnet is better at text)

---

## Testing Recommendations

Before committing to a model for production:

1. **Create Test Set:** 20-30 representative queries
2. **Test Top 3 Models:** Your use case may vary
3. **Measure:**
   - Response quality (human evaluation)
   - Latency (p50, p95, p99)
   - Cost (actual token usage)
4. **A/B Test:** Run 10-20% traffic on alternative model
5. **Monitor:** Track quality metrics in production

---

## Model Update Schedule

- **Claude:** ~Every 3-6 months
- **OpenAI:** ~Every 3-4 months
- **Amazon Nova:** ~Every 6 months (new)
- **Llama:** ~Every 6-12 months
- **Mistral:** ~Every 6-9 months

**Stay Updated:** Monitor model release announcements and re-evaluate periodically.

---

## Questions?

For detailed benchmarks, see:
- Anthropic Model Card: https://www.anthropic.com/claude
- OpenAI Model Specs: https://platform.openai.com/docs/models
- AWS Bedrock Docs: https://docs.aws.amazon.com/bedrock/

For agent-specific guidance, consult the Agent Foundry documentation.
