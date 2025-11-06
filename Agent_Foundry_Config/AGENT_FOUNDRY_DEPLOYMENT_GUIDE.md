# Agent Foundry Deployment Guide
## Campaign Strategist & Planner Agent

This guide provides step-by-step instructions for deploying the Campaign Strategist & Planner agent on the Agent Foundry platform (AWS Bedrock-based).

---

## 📋 Prerequisites

Before you begin, ensure you have:
- [ ] Access to Agent Foundry platform
- [ ] All 10 knowledge base text files from `Campaign_Strategist_Knowledge_Bases/` folder
- [ ] The 3 configuration CSV files from `Agent_Foundry_Config/` folder
- [ ] Administrative permissions to create agents and upload knowledge bases

---

## 🚀 Deployment Steps

### STEP 1: Upload Knowledge Bases

First, you need to upload all 10 knowledge base files to the Agent Foundry platform.

1. **Navigate to Knowledge Bases section** in Agent Foundry
2. **Create new knowledge bases** for each of the following files:

#### Knowledge Base Upload Sequence:

| Order | Knowledge Base Name | File to Upload | Description |
|-------|-------------------|----------------|-------------|
| 1 | KB1_Campaign_Planning_Fundamentals | KB1_Campaign_Planning_Fundamentals.txt | Campaign planning frameworks |
| 2 | KB2_Meta_Advertising_Best_Practices | KB2_Meta_Advertising_Best_Practices.txt | Meta/Facebook/Instagram strategies |
| 3 | KB3_Pinterest_Advertising_Best_Practices | KB3_Pinterest_Advertising_Best_Practices.txt | Pinterest advertising guidance |
| 4 | KB4_Google_Ads_Best_Practices | KB4_Google_Ads_Best_Practices.txt | Google Ads comprehensive guide |
| 5 | KB5_Campaign_Metrics_KPIs_Performance | KB5_Campaign_Metrics_KPIs_Performance.txt | Metrics and KPIs frameworks |
| 6 | KB6_Audience_Targeting_Segmentation | KB6_Audience_Targeting_Segmentation.txt | Targeting strategies |
| 7 | KB7A_Creative_Best_Practices_Part1 | KB7A_Creative_Best_Practices_Part1.txt | Creative best practices (Part 1) |
| 8 | KB7B_Creative_Best_Practices_Part2 | KB7B_Creative_Best_Practices_Part2.txt | Creative best practices (Part 2) |
| 9 | KB9A_TikTok_Advertising_Part1 | KB9A_TikTok_Advertising_Part1.txt | TikTok strategies (Part 1) |
| 10 | KB9B_TikTok_Advertising_Part2 | KB9B_TikTok_Advertising_Part2.txt | TikTok strategies (Part 2) |

**Important Notes:**
- Use the exact knowledge base names listed above
- Ensure all files are uploaded successfully before proceeding
- Verify character count for each file (all should be <18,000 characters)

---

### STEP 2: Create the Agent

Use the configuration from `01_Create_Agent.csv` file:

1. **Navigate to "Create Agents"** section
2. **Fill in the following fields:**

**Agent name:**
```
Campaign Strategist & Planner
```

**Model name:** (Select from dropdown)
```
Claude 4.5 Sonnet
```

**Reasoning:**
- Excellent balance of performance, speed, and cost
- Advanced agentic capabilities with extended thinking
- Strong reasoning for complex multi-step campaign planning
- Best-in-class for consultative, structured responses

**Alternative Model Options:**
- **Claude 4 Sonnet**: Slightly cheaper, nearly as capable
- **GPT-5 mini**: If OpenAI models preferred, good balance
- **Gemini 2.5 Pro**: If deep Google ecosystem integration needed

**Max Tools iterations:**
```
5
```

**Temperature:**
```
0.7
```

**Reasoning:**
- Balanced creativity and consistency
- 0.7 provides good variation in recommendations while maintaining reliability
- Lower (0.3-0.5) for more deterministic responses
- Higher (0.8-0.9) for more creative ideation

**System Prompt:**

Copy the entire System Prompt from `01_Create_Agent.csv` file. The prompt includes:
- Role definition and core capabilities
- Interaction guidelines
- Response structure framework
- Knowledge base usage instructions
- Communication style and tone
- Do's and don'ts
- Example interaction flow

**Verification:**
- [ ] All fields filled correctly
- [ ] System prompt copied completely
- [ ] Model selected appropriately for use case
- [ ] Save the agent configuration

---

### STEP 3: Add Knowledge Base Tools

Use the configuration from `02_Add_Tools_Knowledge_Bases.csv` file:

For each of the 10 knowledge bases, create a tool:

1. **Navigate to "Add Tools"** section
2. **Select your newly created agent**
3. **Add each knowledge base tool** with the following configuration:

#### Tool 1: Campaign Fundamentals
- **Function name:** `kb_campaign_fundamentals`
- **Function description:** "Access comprehensive campaign planning fundamentals including SMART goals, funnel stages, target audience definition, competitive analysis, UVP development, campaign timeline, integration strategies, and risk assessment frameworks."
- **Target:** Knowledgebase
- **Target knowledge base:** KB1_Campaign_Planning_Fundamentals
- **Target function:** List columns

#### Tool 2: Meta Advertising
- **Function name:** `kb_meta_advertising`
- **Function description:** "Access Meta (Facebook & Instagram) advertising best practices including campaign structure, objectives, audience targeting (Core/Custom/Lookalike/Advantage+), ad formats (Feed/Stories/Reels/Carousel), creative guidelines, Meta Pixel tracking, and optimization strategies."
- **Target:** Knowledgebase
- **Target knowledge base:** KB2_Meta_Advertising_Best_Practices
- **Target function:** List columns

#### Tool 3: Pinterest Advertising
- **Function name:** `kb_pinterest_advertising`
- **Function description:** "Access Pinterest advertising strategies including platform demographics, campaign objectives, audience targeting (interests/keywords/Actalike), ad formats (Standard/Video/Carousel/Shopping), seasonal planning, and creative best practices for discovery-focused campaigns."
- **Target:** Knowledgebase
- **Target knowledge base:** KB3_Pinterest_Advertising_Best_Practices
- **Target function:** List columns

#### Tool 4: Google Ads
- **Function name:** `kb_google_ads`
- **Function description:** "Access Google Ads comprehensive guidance including Search campaigns (keyword strategy/RSAs/Quality Score), Display campaigns, YouTube video advertising, Shopping campaigns, Performance Max, bidding strategies, and conversion tracking."
- **Target:** Knowledgebase
- **Target knowledge base:** KB4_Google_Ads_Best_Practices
- **Target function:** List columns

#### Tool 5: Metrics & KPIs
- **Function name:** `kb_metrics_kpis`
- **Function description:** "Access campaign metrics and KPIs including funnel-based metrics (awareness/consideration/conversion/retention), platform-specific metrics, industry benchmarks, attribution models, ROI calculation, and performance measurement frameworks."
- **Target:** Knowledgebase
- **Target knowledge base:** KB5_Campaign_Metrics_KPIs_Performance
- **Target function:** List columns

#### Tool 6: Audience Targeting
- **Function name:** `kb_audience_targeting`
- **Function description:** "Access audience targeting and segmentation strategies including customer research methodologies, persona development, RFM/lifecycle/behavioral/demographic/psychographic segmentation, platform-specific audience hierarchies, testing frameworks, and optimization tactics."
- **Target:** Knowledgebase
- **Target knowledge base:** KB6_Audience_Targeting_Segmentation
- **Target function:** List columns

#### Tool 7: Creative Best Practices Part 1
- **Function name:** `kb_creative_part1`
- **Function description:** "Access creative best practices Part 1 including creative development framework, creative briefs, visual design principles, color psychology, photography guidelines, typography, copywriting frameworks (AIDA/PAS/FAB), headline formulas, CTA optimization, and video structure."
- **Target:** Knowledgebase
- **Target knowledge base:** KB7A_Creative_Best_Practices_Part1
- **Target function:** List columns

#### Tool 8: Creative Best Practices Part 2
- **Function name:** `kb_creative_part2`
- **Function description:** "Access creative best practices Part 2 including platform-specific creative guidelines (Meta/Pinterest/Google/TikTok), creative optimization tactics, A/B testing frameworks, creative personalization, production workflows, tools and resources, and quality checklists."
- **Target:** Knowledgebase
- **Target knowledge base:** KB7B_Creative_Best_Practices_Part2
- **Target function:** List columns

#### Tool 9: TikTok Advertising Part 1
- **Function name:** `kb_tiktok_part1`
- **Function description:** "Access TikTok advertising Part 1 including platform demographics, user behavior, campaign structure, objectives (awareness/consideration/conversion), audience targeting (demographic/interest/custom/lookalike/automatic), and ad formats (In-Feed/Spark/TopView/Brand Takeover/Hashtag Challenge/Branded Effects)."
- **Target:** Knowledgebase
- **Target knowledge base:** KB9A_TikTok_Advertising_Part1
- **Target function:** List columns

#### Tool 10: TikTok Advertising Part 2
- **Function name:** `kb_tiktok_part2`
- **Function description:** "Access TikTok advertising Part 2 including creative best practices (3-second rule/authenticity/sound strategy/visual techniques), content formulas, performance optimization, creative testing, audience scaling, budget recommendations, pixel tracking, influencer partnerships, trend participation, and performance benchmarks."
- **Target:** Knowledgebase
- **Target knowledge base:** KB9B_TikTok_Advertising_Part2
- **Target function:** List columns

**Verification:**
- [ ] All 10 knowledge base tools added successfully
- [ ] Function names match exactly
- [ ] Correct knowledge base mapped to each tool
- [ ] All descriptions are complete

---

### STEP 4: Add Outputs (Optional but Recommended)

Use the configuration from `03_Add_Output.csv` file:

Create structured outputs for common deliverables:

#### Output 1: Campaign Plan (Structured JSON)
- **Output name:** `campaign_plan`
- **Function name:** `generate_campaign_plan`
- **Function description:** "Generate a comprehensive digital marketing campaign plan including strategy overview, platform recommendations, budget allocation, audience targeting, creative direction, KPIs, and implementation timeline."
- **Output Type:** Custom
- **JSON schema:** Copy from `03_Add_Output.csv`

#### Output 2: Budget Allocation (Structured JSON)
- **Output name:** `budget_allocation`
- **Function name:** `generate_budget_allocation`
- **Function description:** "Generate detailed budget allocation breakdown across platforms and funnel stages with rationale and expected outcomes."
- **Output Type:** Custom
- **JSON schema:** Copy from `03_Add_Output.csv`

#### Output 3: Creative Brief (Structured JSON)
- **Output name:** `creative_brief`
- **Function name:** `generate_creative_brief`
- **Function description:** "Generate a comprehensive creative brief for a specific platform including campaign objective, target audience, key messages, visual direction, ad specifications, and success metrics."
- **Output Type:** Custom
- **JSON schema:** Copy from `03_Add_Output.csv`

#### Output 4: Campaign Text (Formatted)
- **Output name:** `campaign_text`
- **Function name:** `generate_campaign_text`
- **Function description:** "Generate campaign strategy and recommendations in formatted text for easy reading and sharing."
- **Output Type:** Artifact
- **Artifact content type:** Text

#### Output 5: Campaign Summary (Formatted)
- **Output name:** `campaign_summary`
- **Function name:** `generate_campaign_summary`
- **Function description:** "Generate a concise executive summary of campaign recommendations."
- **Output Type:** Artifact
- **Artifact content type:** Text

**Verification:**
- [ ] All output formats added
- [ ] JSON schemas valid and complete
- [ ] Artifact types configured correctly

---

### STEP 5: Test the Agent

Run comprehensive tests to ensure the agent is working correctly:

#### Test 1: Basic Campaign Planning
**Test Prompt:**
```
Help me plan a Q4 holiday campaign for my e-commerce store selling sustainable home goods.
Budget: $10,000/month
Target: Women 30-50, environmentally conscious
Timeline: October-December
```

**Expected Response:**
- Agent asks 2-4 clarifying questions
- Provides platform recommendations (likely Meta + Pinterest + Google Shopping)
- Suggests budget allocation breakdown
- Offers audience targeting strategy
- Includes creative direction
- Sets KPIs and benchmarks
- Provides implementation timeline

#### Test 2: Platform-Specific Strategy
**Test Prompt:**
```
How should I structure my Meta campaign for lead generation?
Target: B2B marketing managers
Budget: $5,000/month
```

**Expected Response:**
- Asks about business context and goals
- Recommends Meta campaign structure
- Details audience targeting options
- Suggests ad formats and placements
- Provides budget allocation within Meta
- Sets lead generation KPIs

#### Test 3: Budget Allocation
**Test Prompt:**
```
I have $15,000/month for my SaaS product. How should I allocate it across platforms?
Target: Small business owners
Goal: Free trial sign-ups
```

**Expected Response:**
- Asks about product, competitors, sales cycle
- Recommends platform mix with rationale
- Provides detailed budget breakdown
- Explains funnel allocation (40/30/30 or 60/40)
- Sets ROAS and CPA targets
- Includes testing budget

#### Test 4: Creative Strategy
**Test Prompt:**
```
Create a creative brief for TikTok targeting Gen Z for my sustainable fashion brand.
```

**Expected Response:**
- Asks about specific product, campaign objective
- Provides TikTok-specific creative brief
- Includes 3-second hook recommendations
- Suggests authentic, UGC-style approach
- Details trending sound and music strategy
- Provides ad specifications
- Recommends influencer partnership approach

**Verification Checklist:**
- [ ] Agent asks appropriate clarifying questions
- [ ] Recommendations are specific and platform-appropriate
- [ ] Budget allocations include rationale
- [ ] Industry benchmarks referenced
- [ ] Responses well-structured and actionable
- [ ] Knowledge bases being accessed correctly
- [ ] No errors or hallucinations
- [ ] Tone is professional and consultative

---

## 🔧 Troubleshooting

### Issue: Agent provides generic responses
**Solution:**
- Verify all 10 knowledge bases uploaded successfully
- Check that tools are configured with correct knowledge base mappings
- Review system prompt - ensure it's complete

### Issue: Agent doesn't ask clarifying questions
**Solution:**
- Review system prompt - "INTERACTION GUIDELINES" section
- Increase temperature slightly (0.7 → 0.8)
- Provide less context in test prompts to trigger questions

### Issue: Budget recommendations don't add up
**Solution:**
- Test with specific budget amounts
- Ask agent to show calculations
- Reference KB5 (Metrics) and KB8 (Budget Allocation)

### Issue: Platform recommendations seem off
**Solution:**
- Ensure KB2 (Meta), KB3 (Pinterest), KB4 (Google), KB9A/B (TikTok) are all uploaded
- Check that target audience and objectives are clearly stated
- Review platform selection criteria in knowledge bases

---

## 📊 Performance Optimization

### Improving Response Quality
1. **Refine System Prompt**: Adjust based on actual usage patterns
2. **Add Example Interactions**: Include more specific use cases in prompt
3. **Knowledge Base Updates**: Quarterly refresh with latest platform features
4. **Temperature Tuning**: Adjust based on consistency vs. creativity needs

### Reducing Costs
1. **Use Claude 4 Sonnet** instead of 4.5 Sonnet if budget-constrained
2. **Lower Max Tools iterations** from 5 to 3 if responses are too long
3. **Optimize knowledge base queries** - ensure targeted, not broad searches

### Scaling for Team Use
1. **Create agent variants** for specific use cases (e.g., "Meta Specialist", "Budget Planner")
2. **Set up workflows** for common scenarios
3. **Integrate with project management tools**
4. **Track usage and gather user feedback**

---

## 📚 Additional Resources

### Documentation Files
- **README.md**: Complete agent overview and capabilities
- **AGENT_CONFIGURATION.md**: Detailed configuration guide
- **QUICK_START_GUIDE.md**: 5-minute setup guide

### Knowledge Base Files
Located in `Campaign_Strategist_Knowledge_Bases/` folder:
- All 10 knowledge base text files
- README.txt with detailed descriptions

### Reference Files
Located in `Reference Files/` folder:
- Agent Squad CSV templates
- Model comparison guide

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] All 10 knowledge base files prepared
- [ ] Configuration CSV files reviewed
- [ ] Agent Foundry platform access confirmed
- [ ] Deployment plan reviewed

### Deployment
- [ ] All 10 knowledge bases uploaded
- [ ] Agent created with correct configuration
- [ ] All 10 knowledge base tools added
- [ ] Output formats configured (optional)
- [ ] Initial tests completed successfully

### Post-Deployment
- [ ] Comprehensive testing across use cases
- [ ] User access configured
- [ ] Team training conducted
- [ ] Feedback mechanism established
- [ ] Monitoring and optimization plan in place

---

## 🎯 Success Criteria

Your agent is successfully deployed when:
- ✅ All knowledge bases accessible
- ✅ Agent asks appropriate clarifying questions
- ✅ Recommendations are specific and platform-appropriate
- ✅ Budget allocations are accurate and justified
- ✅ Creative guidance is detailed and actionable
- ✅ Industry benchmarks correctly referenced
- ✅ Response structure is consistent and professional
- ✅ Users can accomplish campaign planning tasks independently

---

**Deployment Version**: 1.0
**Last Updated**: November 5, 2025
**Platform**: Agent Foundry (AWS Bedrock)
**Support**: Refer to README.md and AGENT_CONFIGURATION.md for additional guidance
