# Campaign Strategist & Planner AI Agent

## Overview
This is a comprehensive AI agent built for Amazon Bedrock Agent Foundry that assists brand managers and marketers in developing strategic digital marketing campaigns across multiple platforms including Meta (Facebook & Instagram), Pinterest, Google Ads, and TikTok.

## Agent Capabilities

### Primary Functions
1. **Campaign Strategy Development**
   - Define SMART goals and campaign objectives
   - Develop target audience personas
   - Create competitive analysis frameworks
   - Establish unique value propositions
   - Build comprehensive campaign timelines

2. **Platform-Specific Planning**
   - Meta (Facebook & Instagram) campaign strategies
   - Pinterest advertising best practices
   - Google Ads multi-format campaigns (Search, Display, Video, Shopping)
   - TikTok creative and targeting recommendations

3. **Audience Targeting & Segmentation**
   - Customer research methodologies
   - RFM and lifecycle segmentation
   - Platform-specific audience hierarchies
   - Lookalike and custom audience strategies

4. **Creative Strategy & Development**
   - Creative brief development
   - Visual design principles
   - Copywriting frameworks (AIDA, PAS, FAB)
   - Video creative best practices
   - Platform-specific creative specifications

5. **Budget Allocation & Media Planning**
   - Budget determination methodologies
   - Multi-platform allocation frameworks
   - Funnel-based budget strategies (40/30/30, 60/40)
   - ROI measurement and forecasting

6. **Performance Measurement**
   - KPI selection and benchmarking
   - Funnel-based metrics tracking
   - Attribution modeling
   - Reporting frameworks

## Target Users
- **Brand Managers**: Developing comprehensive campaign strategies
- **Marketing Directors**: Planning budget allocation and media mix
- **Digital Marketers**: Executing platform-specific campaigns
- **Growth Marketers**: Optimizing performance and scaling campaigns
- **Marketing Agencies**: Creating client campaign proposals

## Platform Coverage

### Meta (Facebook & Instagram)
- Campaign structure and objectives
- Audience targeting (Core, Custom, Lookalike, Advantage+)
- Ad formats (Feed, Stories, Reels, Carousel, Video)
- Meta Pixel and conversion tracking
- Budget optimization and bidding strategies

### Pinterest
- User demographics and behavior insights
- Campaign objectives and ad formats
- Keyword and interest targeting
- Actalike audiences
- Seasonal planning strategies

### Google Ads
- Search campaigns (keyword strategy, RSAs, Quality Score)
- Display campaigns (audience targeting, creative)
- YouTube video campaigns
- Shopping campaigns (feed optimization)
- Performance Max campaigns

### TikTok
- Platform demographics and user behavior
- Campaign objectives and ad formats
- Creative best practices (3-second rule, authenticity)
- Influencer partnerships
- Trend participation strategies

## Knowledge Base Structure

The agent is powered by 10 comprehensive knowledge base files located in the `Campaign_Strategist_Knowledge_Bases/` folder:

1. **KB1**: Campaign Planning Fundamentals & Strategy Framework
2. **KB2**: Meta (Facebook & Instagram) Advertising Best Practices
3. **KB3**: Pinterest Advertising Best Practices
4. **KB4**: Google Ads Best Practices
5. **KB5**: Campaign Metrics, KPIs & Performance Measurement
6. **KB6**: Audience Targeting & Segmentation Strategies
7. **KB7A & KB7B**: Creative Best Practices & Ad Formats (Parts 1 & 2)
8. **KB9A & KB9B**: TikTok Advertising Best Practices (Parts 1 & 2)

All knowledge bases are optimized to stay under 18,000 characters for platform compatibility.

## Setup Instructions

### Amazon Bedrock Agent Foundry Configuration

1. **Create New Agent**
   - Navigate to Amazon Bedrock Agent Foundry
   - Create new agent: "Campaign Strategist & Planner"
   - Set agent description: "Expert digital marketing campaign strategist specializing in Meta, Pinterest, Google Ads, and TikTok advertising"

2. **Upload Knowledge Bases**
   - Upload all 10 knowledge base files from `Campaign_Strategist_Knowledge_Bases/` folder
   - Ensure files are uploaded in order (KB1, KB2, KB3, etc.)
   - Verify character count compliance (all files <18,000 characters)

3. **Configure Agent Instructions**
   ```
   You are an expert Campaign Strategist and Planner specializing in digital marketing campaigns across Meta (Facebook & Instagram), Pinterest, Google Ads, and TikTok platforms.

   Your role is to help brand managers and marketers develop comprehensive, strategic campaign plans by:
   - Asking clarifying questions about business objectives, target audience, budget, and timeline
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
   ```

4. **Set Agent Behavior**
   - Conversational style: Professional and consultative
   - Ask clarifying questions when objectives are unclear
   - Provide both strategic and tactical recommendations
   - Include specific examples and benchmarks
   - Offer multiple options when applicable

5. **Configure Action Groups** (Optional)
   - Integration with analytics platforms (Google Analytics, Meta Business Suite)
   - Budget calculation tools
   - Creative specification generators
   - Reporting templates

## Sample Interactions

### Example 1: New Campaign Planning
**User**: "I need to launch a campaign for our new sustainable fashion line targeting women aged 25-40."

**Agent Response**:
- Asks clarifying questions about budget, timeline, current brand awareness, specific products
- Recommends platform mix (Pinterest for planning phase, Instagram for visual appeal, TikTok for Gen Z reach)
- Suggests funnel-based budget allocation
- Develops audience persona
- Provides creative direction
- Establishes KPIs and benchmarks

### Example 2: Platform Selection
**User**: "Should I use Google Ads or Meta for my B2B SaaS product?"

**Agent Response**:
- Analyzes use case (B2B, consideration cycle, audience behavior)
- Recommends Google Search for high-intent keywords
- Suggests LinkedIn (if in scope) or Meta for awareness and retargeting
- Provides budget split recommendations
- Details targeting strategies for each platform
- Sets expected performance benchmarks

### Example 3: Budget Optimization
**User**: "I have $10,000/month for my e-commerce store. How should I allocate it?"

**Agent Response**:
- Assesses business stage and goals
- Recommends 40/30/30 funnel framework or 60/40 performance framework
- Breaks down budget by platform based on product category
- Suggests testing vs. scaling allocation
- Provides minimum viable budgets per platform
- Sets ROAS targets by platform

## Best Practices for Agent Use

### Getting the Most from the Agent
1. **Provide Context**: Share business objectives, target audience, budget range, and timeline
2. **Be Specific**: Detail what you know vs. what you need help with
3. **Ask Follow-ups**: Dive deeper into specific recommendations
4. **Request Examples**: Ask for specific creative concepts, audience definitions, or budget models
5. **Iterate**: Refine recommendations based on your constraints and preferences

### Effective Prompts
- "Help me plan a Q4 holiday campaign for [product] with a budget of $X"
- "What's the best platform mix for reaching [audience] for [objective]?"
- "How should I structure my Meta campaign for [goal]?"
- "What KPIs should I track for a [type] campaign?"
- "Create a creative brief for [platform] targeting [audience]"

## Maintenance & Updates

### Knowledge Base Updates
- **Quarterly**: Review and update platform-specific features and best practices
- **As Needed**: Add new platforms, ad formats, or targeting options
- **Annually**: Refresh benchmarks and industry statistics

### Agent Improvements
- Monitor user interactions and common questions
- Identify gaps in knowledge base coverage
- Add examples and case studies
- Refine agent instructions based on usage patterns

## Support & Troubleshooting

### Common Issues
1. **Agent lacks specific platform knowledge**: Verify all 10 knowledge base files are uploaded
2. **Recommendations too generic**: Provide more detailed context in prompts
3. **Budget calculations unclear**: Ask for step-by-step breakdowns
4. **Platform recommendations don't fit**: Share constraints and preferences explicitly

### Getting Help
- Review knowledge base files for detailed platform guidance
- Check README files in knowledge base folder
- Consult Amazon Bedrock Agent Foundry documentation
- Review agent configuration and instructions

## Version History

### Version 1.0 (Current)
- Initial release with 10 knowledge bases
- Platform coverage: Meta, Pinterest, Google Ads, TikTok
- Comprehensive campaign planning frameworks
- Budget allocation and performance measurement guidance

## Future Enhancements

### Planned Features
- LinkedIn advertising integration
- Snapchat advertising best practices
- Twitter/X advertising guidance
- Influencer marketing frameworks
- Marketing automation integration
- Performance reporting templates
- Creative asset libraries with examples

### Potential Integrations
- Google Analytics 4 data integration
- Meta Business Suite API
- Budget forecasting tools
- Creative testing frameworks
- Competitive intelligence tools

## License & Usage

This agent and associated knowledge bases are designed for:
- Internal marketing team use
- Marketing agency client services
- Educational and training purposes
- Campaign planning and strategy development

## Contact & Feedback

For questions, suggestions, or issues:
- Review the knowledge base documentation
- Check agent configuration settings
- Consult Amazon Bedrock support resources

---

**Last Updated**: November 5, 2025
**Version**: 1.0
**Platform**: Amazon Bedrock Agent Foundry
**Knowledge Bases**: 10 files, optimized for <18,000 characters each
