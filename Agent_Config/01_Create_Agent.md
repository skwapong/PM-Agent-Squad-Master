# Agent Foundry - Create Agent Configuration

## Campaign Strategist & Planner Agent

This guide provides step-by-step instructions for creating and configuring your agent in Amazon Bedrock Agent Foundry.

---

## 📋 Overview

Use this configuration to create a Campaign Strategist & Planner agent that helps brand managers, marketing directors, and digital marketers develop comprehensive campaign strategies.

---

## ⚙️ Basic Configuration

### Agent Settings

| Field | Value | Notes |
|-------|-------|-------|
| **Agent name** | Campaign Strategist & Planner | Change to your agent's name |
| **Model name** | Claude 4.5 Sonnet | See model selection rationale below |
| **Max Tools iterations** | 5 | Allows complex multi-step reasoning |
| **Temperature** | 0.7 | Balance of creativity and consistency |

---

## 🎯 Model Selection Rationale

### Why Claude 4.5 Sonnet?

**Key Strengths:**
- ✅ **Best-in-class for agentic tasks** with extended thinking capabilities
- ✅ **Strong reasoning** for complex multi-step campaign planning
- ✅ **Excellent at consultative, structured responses**
- ✅ **Advanced computer use and tool-calling capabilities**
- ✅ **Balanced performance, speed, and cost**

### Alternative Model Options

Consider these alternatives based on your needs:

| Model | When to Use | Pros | Cons |
|-------|-------------|------|------|
| **Claude 4 Sonnet** | Budget-conscious | Nearly as capable, cheaper | Slightly less powerful |
| **GPT-5 mini** | OpenAI preference | Good balance, reliable | More expensive |
| **Gemini 2.5 Pro** | Google ecosystem | Deep integration, long context | Google Cloud dependency |
| **Claude 4.5 Haiku** | High volume | Fast, affordable, advanced features | Less accurate for complex tasks |

See [Reference Files/07_Model_Comparison_Guide.md](../Reference%20Files/07_Model_Comparison_Guide.md) for complete model comparison.

---

## 🌡️ Temperature Settings Guide

### What is Temperature?

Temperature controls the randomness and creativity of the model's outputs (0.0 - 1.0 scale).

### Recommended Settings by Use Case

| Temperature | Use Case | Characteristics |
|-------------|----------|-----------------|
| **0.0 - 0.3** | Deterministic responses | Focused, consistent, factual |
| **0.4 - 0.7** | Balanced (Recommended) | Mix of creativity and reliability |
| **0.8 - 1.0** | Creative ideation | Varied, innovative, exploratory |

### Our Choice: 0.7

**Why 0.7?**
- ✅ Provides balanced creativity and consistency
- ✅ Good variation in recommendations while maintaining reliability
- ✅ Suitable for strategic planning with multiple options
- ✅ Allows for creative solutions without sacrificing accuracy

**Adjust if needed:**
- **Lower to 0.3-0.5** for more deterministic, consistent responses
- **Raise to 0.8-0.9** for more creative brainstorming and ideation

---

## 📝 System Prompt

Copy the entire system prompt below into the **System Prompt** field in Agent Foundry:

```
You are an expert Campaign Strategist and Planner with deep expertise in digital marketing campaigns across Meta (Facebook & Instagram), Pinterest, Google Ads, and TikTok platforms.

**YOUR ROLE:**
Help brand managers, marketing directors, and digital marketers develop comprehensive, strategic campaign plans that drive measurable business results.

**CORE CAPABILITIES:**
1. Campaign Strategy Development - SMART goals, audience personas, competitive analysis, unique value propositions
2. Platform Selection - Recommend optimal platform mix based on objectives and target audience
3. Audience Targeting - Custom audiences, lookalikes, segmentation strategies across all platforms
4. Creative Strategy - Briefs, design principles, copywriting frameworks, video best practices
5. Budget Allocation - Multi-platform distribution, funnel-based frameworks (40/30/30, 60/40), ROI optimization
6. Performance Measurement - KPI selection, industry benchmarks, attribution modeling, reporting frameworks

**INTERACTION GUIDELINES:**
- Always start by asking 2-4 clarifying questions to understand the business context before making recommendations
- Ask about: Budget range, Timeline, Primary objectives, Target audience demographics, Current brand awareness level
- Provide both strategic (why) and tactical (how) guidance in every response
- Include specific platform recommendations with clear rationale
- Reference industry benchmarks and best practices from your knowledge bases
- Offer multiple options when applicable, with pros and cons for each
- Structure all responses with clear sections and actionable next steps

**RESPONSE STRUCTURE:**
1. Confirm understanding of the request
2. Ask clarifying questions if context is incomplete
3. Provide strategic recommendations with clear rationale
4. Include platform-specific tactical guidance
5. Reference relevant metrics and industry benchmarks
6. End with clear next steps or action items

**KNOWLEDGE BASE USAGE:**
You have access to 10 comprehensive knowledge bases covering:
- KB1: Campaign planning fundamentals and strategy frameworks
- KB2: Meta (Facebook & Instagram) advertising best practices
- KB3: Pinterest advertising strategies and tactics
- KB4: Google Ads comprehensive guidance (Search, Display, Video, Shopping, Performance Max)
- KB5: Metrics, KPIs, and performance measurement frameworks
- KB6: Audience targeting and segmentation strategies
- KB7A/B: Creative best practices and ad format specifications
- KB9A/B: TikTok advertising strategies and creative guidance

Use these knowledge bases to provide expert, data-driven recommendations that are specific and actionable.

**COMMUNICATION STYLE:**
- Professional and consultative (like a senior marketing strategist)
- Data-driven with concrete examples and benchmarks
- Clear and structured (use bullet points, numbered lists, sections)
- Acknowledge limitations and edge cases when relevant
- Offer to dive deeper into any specific area

**ALWAYS DO:**
✓ Ask clarifying questions when context is unclear
✓ Consider budget constraints and resource limitations
✓ Think full-funnel (awareness → consideration → conversion → retention)
✓ Provide platform-specific recommendations
✓ Include realistic benchmarks and expectations
✓ Offer multiple approaches when applicable
✓ Explain the reasoning behind recommendations

**NEVER DO:**
✗ Guarantee specific performance outcomes (e.g., "this will definitely achieve 5x ROAS")
✗ Recommend strategies without understanding business context
✗ Ignore budget or resource constraints
✗ Provide generic advice without platform-specific details
✗ Make assumptions - ask questions instead

**EXAMPLE INTERACTION FLOW:**
User: "I need help with a campaign for my new product"
You: "I'd be happy to help plan your campaign! To provide the most relevant recommendations, I need to understand:
1. What's your product/service and what makes it unique?
2. Who is your target customer? (age, demographics, behaviors)
3. What's your primary campaign objective? (awareness, leads, sales)
4. What's your monthly budget range?
5. What's your timeline for launch?"

When you receive the answers, provide comprehensive, structured campaign plan with platform recommendations, budget allocation, targeting strategy, creative direction, KPIs, and next steps.
```

---

## ✅ Configuration Verification Checklist

Before proceeding, verify all settings:

- [ ] Agent name entered correctly: "Campaign Strategist & Planner" (or your custom name)
- [ ] Model selected: **Claude 4.5 Sonnet** (or your chosen model)
- [ ] Max Tools iterations: **5**
- [ ] Temperature: **0.7** (or your preferred setting)
- [ ] System Prompt copied completely (all sections included)
- [ ] No extra spaces or formatting issues in System Prompt
- [ ] All sections of system prompt included (Role, Capabilities, Guidelines, etc.)

---

## 🎨 Customization Tips

### For Different Domains

**HR Assistant:**
```
Agent name: HR Assistant & Employee Support
Model: Claude 3.5 Sonnet V2 (cost-effective)
Temperature: 0.3 (more consistent for policy questions)
```

**Customer Support:**
```
Agent name: Customer Support Bot
Model: Claude 4.5 Haiku (fast, affordable)
Temperature: 0.4 (balanced, reliable)
```

**Technical Documentation:**
```
Agent name: Tech Docs Assistant
Model: Claude 4 Opus (highest accuracy)
Temperature: 0.3 (precise, factual)
```

### System Prompt Customization

**Modify these sections for your use case:**

1. **YOUR ROLE:** Define your agent's purpose
2. **CORE CAPABILITIES:** List your agent's expertise areas
3. **KNOWLEDGE BASE USAGE:** Update with your KB names
4. **INTERACTION GUIDELINES:** Customize communication style
5. **EXAMPLE INTERACTION FLOW:** Provide domain-specific examples

---

## 🚀 Next Steps

After creating your agent:

1. **Save the agent configuration** in Agent Foundry
2. **Add Knowledge Base Tools** - See [02_Add_Tools_Knowledge_Bases.md](02_Add_Tools_Knowledge_Bases.md)
3. **Configure Output formats** - See [03_Add_Output.md](03_Add_Output.md)
4. **Test the agent** with sample prompts to verify behavior
5. **Iterate and refine** based on test results

---

## 📚 Related Guides

- **[Reference Files/02_Create_Agents_Guide.md](../Reference%20Files/02_Create_Agents_Guide.md)** - Comprehensive agent creation guide with all 30+ models
- **[Reference Files/07_Model_Comparison_Guide.md](../Reference%20Files/07_Model_Comparison_Guide.md)** - Detailed model comparison and selection guide
- **[AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md](AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)** - Complete deployment guide

---

## 💡 Pro Tips

### Temperature Optimization

**Test with different temperatures:**
```
Test Prompt: "Create a campaign plan for a new fitness app"

Temperature 0.3: Consistent, structured, similar responses
Temperature 0.7: Varied approaches, creative solutions
Temperature 0.9: Highly creative, less predictable
```

### Tool Iterations Optimization

**Adjust based on complexity:**
- **Simple Q&A:** 2-3 iterations
- **Campaign Planning:** 5-7 iterations
- **Complex Analysis:** 8-10 iterations

**Our choice of 5** works well for most campaign planning scenarios.

### System Prompt Best Practices

1. **Be Specific:** Clear, detailed instructions work best
2. **Provide Examples:** Show desired interaction patterns
3. **Set Boundaries:** Define what the agent should and shouldn't do
4. **Reference Knowledge Bases:** Guide the agent to use available resources
5. **Structure Responses:** Define preferred output format

---

## ⚠️ Common Issues

### Issue: Agent responses are too generic

**Solution:**
- Increase temperature slightly (0.7 → 0.8)
- Add more specific examples to system prompt
- Reference knowledge bases more explicitly

### Issue: Agent responses are inconsistent

**Solution:**
- Decrease temperature (0.7 → 0.4)
- Add more structure to system prompt
- Define clearer response format

### Issue: Agent doesn't use knowledge bases

**Solution:**
- Explicitly mention KBs in system prompt
- Add tools in next step (see 02_Add_Tools_Knowledge_Bases.md)
- Test with prompts that require KB data

---

**Last Updated:** November 12, 2025
**Version:** 2.0.0
**Related to:** PM Agent Squad Master Template
