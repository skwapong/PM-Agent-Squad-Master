# Quick Start Guide - Campaign Strategist & Planner Agent

## 🚀 Getting Started in 5 Minutes

This guide will help you set up and start using the Campaign Strategist & Planner AI agent on Amazon Bedrock Agent Foundry.

---

## Step 1: Upload Knowledge Bases (2 minutes)

1. Navigate to Amazon Bedrock Agent Foundry console
2. Create a new agent or select existing agent
3. Go to "Knowledge Bases" section
4. Upload all 10 files from `Campaign_Strategist_Knowledge_Bases/` folder:
   - KB1_Campaign_Planning_Fundamentals.txt
   - KB2_Meta_Advertising_Best_Practices.txt
   - KB3_Pinterest_Advertising_Best_Practices.txt
   - KB4_Google_Ads_Best_Practices.txt
   - KB5_Campaign_Metrics_KPIs_Performance.txt
   - KB6_Audience_Targeting_Segmentation.txt
   - KB7A_Creative_Best_Practices_Part1.txt
   - KB7B_Creative_Best_Practices_Part2.txt
   - KB9A_TikTok_Advertising_Part1.txt
   - KB9B_TikTok_Advertising_Part2.txt

✅ **Verification**: All 10 files should show as uploaded successfully

---

## Step 2: Configure Agent Instructions (2 minutes)

Copy and paste this into the Agent Instructions field:

```
You are an expert Campaign Strategist and Planner specializing in digital marketing campaigns across Meta (Facebook & Instagram), Pinterest, Google Ads, and TikTok platforms.

Help brand managers develop comprehensive campaign plans by:
- Asking clarifying questions about business objectives, target audience, budget, and timeline
- Providing platform-specific recommendations based on campaign goals
- Developing audience targeting strategies
- Creating creative briefs and specifications
- Recommending budget allocation across platforms and funnel stages
- Establishing KPIs and measurement frameworks

Always structure responses with:
1. Strategic recommendations with rationale
2. Platform-specific tactical guidance
3. Actionable next steps
4. Expected outcomes and benchmarks

Reference the knowledge bases to provide expert, data-driven recommendations.
```

✅ **Verification**: Instructions saved successfully

---

## Step 3: Test the Agent (1 minute)

Try one of these test prompts:

**Option 1 - Campaign Planning:**
```
Help me plan a Q4 holiday campaign for my e-commerce store selling home decor.
Budget: $8,000/month, Target: Women 25-45
```

**Option 2 - Platform Selection:**
```
I have a new fitness app. Should I advertise on TikTok, Meta, or Google?
Budget: $5,000/month
```

**Option 3 - Budget Allocation:**
```
How should I split $10,000/month across platforms for my B2C subscription box service?
```

✅ **Expected Response**: Agent should ask clarifying questions and provide structured recommendations

---

## 💡 Quick Tips for Best Results

### 1. **Provide Context**
Instead of: *"How do I advertise?"*
Better: *"How do I advertise my sustainable fashion brand to women 25-40 with a $6K budget?"*

### 2. **Be Specific About Goals**
Instead of: *"I want more sales"*
Better: *"I want to achieve 4:1 ROAS for new customer acquisition"*

### 3. **Share Constraints**
Mention budget limits, timeline, resource limitations, platform restrictions

### 4. **Ask Follow-Up Questions**
Dive deeper: *"Can you explain the Meta targeting strategy in more detail?"*

### 5. **Request Examples**
Ask for: *"Give me an example creative brief for this campaign"*

---

## 📝 Common Use Cases

### Use Case 1: New Campaign Planning
**Prompt**: "I'm launching [product] targeting [audience]. Budget is $[X]/month. Help me plan the campaign."

**Agent Will Provide**:
- Platform recommendations
- Funnel-based budget allocation
- Audience targeting strategy
- Creative direction
- KPIs and benchmarks
- Timeline and phases

### Use Case 2: Platform-Specific Strategy
**Prompt**: "How should I structure my [platform] campaign for [objective]?"

**Agent Will Provide**:
- Campaign structure recommendations
- Targeting strategies
- Ad format suggestions
- Budget recommendations
- Creative best practices
- Optimization tactics

### Use Case 3: Budget Optimization
**Prompt**: "My campaign is spending $[X] with [Y] ROAS. How can I improve performance?"

**Agent Will Provide**:
- Performance analysis
- Optimization opportunities
- Testing recommendations
- Budget reallocation suggestions
- Timeline expectations

### Use Case 4: Audience Strategy
**Prompt**: "How do I target [specific audience] on [platform]?"

**Agent Will Provide**:
- Targeting options available
- Audience segmentation approach
- Lookalike strategies
- Budget sizing recommendations
- Expected reach and costs

### Use Case 5: Creative Development
**Prompt**: "Create a creative brief for [platform] targeting [audience] for [product]"

**Agent Will Provide**:
- Complete creative brief structure
- Platform-specific specifications
- Copy and messaging guidelines
- Visual design principles
- Testing recommendations

---

## 🎯 Sample Conversation Flow

**User**: "I need help planning a campaign for my new coffee subscription service."

**Agent**: "I'd be happy to help plan your coffee subscription campaign! To provide the most relevant recommendations, I need to understand a few things:

1. What's your primary campaign objective? (Brand awareness, lead generation, direct subscriptions)
2. Who is your target audience? (Demographics, behaviors, interests)
3. What's your monthly budget range?
4. What's your timeline? (Launch date, campaign duration)
5. Do you have existing customer data or is this a brand new service?"

**User**: "Primary goal is getting new subscriptions. Target is coffee enthusiasts 25-45, urban professionals. Budget is $7,000/month. Launch in 2 weeks for 3 months. We have 500 current customers."

**Agent**: [Provides comprehensive campaign plan with platform mix, budget allocation, targeting strategy, creative direction, and KPIs]

**User**: "Can you explain the Pinterest strategy in more detail?"

**Agent**: [Provides detailed Pinterest-specific tactics including keyword targeting, Pin formats, budget recommendations, and creative specifications]

---

## ⚠️ Troubleshooting

### Agent gives generic responses
**Fix**: Provide more specific context (budget, audience, objectives, timeline)

### Agent doesn't answer my question
**Fix**: Rephrase question to be more specific or ask for clarification on what the agent needs

### Budget recommendations seem off
**Fix**: Share your constraints, industry, and expected performance targets

### Platform recommendations don't fit my situation
**Fix**: Explain your specific constraints (resource limitations, in-house capabilities, platform access)

---

## 📚 Deep Dive Resources

For more detailed information, refer to:

1. **README.md** - Complete agent overview and capabilities
2. **AGENT_CONFIGURATION.md** - Detailed configuration guide
3. **Campaign_Strategist_Knowledge_Bases/README.txt** - Knowledge base documentation

---

## 🔄 Next Steps After Setup

### Week 1: Familiarization
- [ ] Test with 3-5 different campaign scenarios
- [ ] Explore each platform's capabilities
- [ ] Try budget allocation exercises
- [ ] Request creative briefs

### Week 2: Real Campaign Planning
- [ ] Input your actual campaign requirements
- [ ] Iterate on recommendations with follow-up questions
- [ ] Export and refine the campaign plan
- [ ] Share with team for feedback

### Week 3: Optimization
- [ ] Use agent for ongoing campaign questions
- [ ] Get creative refresh recommendations
- [ ] Optimize budget allocation
- [ ] Troubleshoot performance issues

### Ongoing
- [ ] Regular campaign planning sessions
- [ ] Quarterly strategy reviews
- [ ] Budget forecasting
- [ ] Platform evaluation

---

## 💬 Example Prompts Library

### Campaign Strategy
- "Help me develop a campaign strategy for [product/service]"
- "What's the best approach for [objective] targeting [audience]?"
- "Review this campaign plan: [details]"

### Platform Selection
- "Which platform should I use for [product] targeting [audience]?"
- "Compare Meta vs. Google for [use case]"
- "Should I add TikTok to my platform mix?"

### Budget & ROI
- "How should I allocate $[X] across platforms?"
- "What ROAS should I expect for [industry/product]?"
- "How can I improve my current [X]:1 ROAS?"

### Audience Targeting
- "How do I target [specific audience] on [platform]?"
- "Create an audience strategy for [campaign objective]"
- "What's the best way to build lookalike audiences?"

### Creative Strategy
- "Create a creative brief for [platform] campaign"
- "What creative formats work best for [objective]?"
- "How should I structure video ads for [platform]?"

### Performance & Optimization
- "What KPIs should I track for [objective]?"
- "How do I optimize a campaign with [performance issue]?"
- "What are benchmarks for [metric] in [industry]?"

---

## ✅ Success Checklist

Your agent is ready to use when:
- [ ] All 10 knowledge bases uploaded
- [ ] Agent instructions configured
- [ ] Test prompts returning quality responses
- [ ] Agent asks clarifying questions appropriately
- [ ] Recommendations are specific and actionable
- [ ] Platform coverage is comprehensive
- [ ] Budget guidance is detailed and realistic

---

**Ready to start?** Try your first prompt now! 🚀

**Need help?** Refer to README.md or AGENT_CONFIGURATION.md for detailed guidance.

---

**Version**: 1.0
**Last Updated**: November 5, 2025
**Platform**: Amazon Bedrock Agent Foundry
