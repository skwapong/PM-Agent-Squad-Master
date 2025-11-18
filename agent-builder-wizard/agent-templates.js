// Production-Ready Agent Templates for Marketing Cloud / CDP
// Enterprise and Mid-Market focused templates

const agentTemplates = [
    {
        id: 'customer-segmentation-cdp',
        name: 'Customer Segmentation Engine',
        icon: '🎯',
        category: 'CDP',
        targetAudience: ['Enterprise', 'Mid-Market'],
        description: 'Advanced customer segmentation using RFM analysis, behavioral patterns, and predictive modeling',
        config: {
            projectName: 'Customer Segmentation & Targeting Platform',
            projectDescription: 'Enterprise-grade customer segmentation engine for CDP that creates actionable audience segments based on behavior, demographics, and predictive analytics',
            agentName: 'Customer Segmentation Agent',
            description: 'An advanced CDP segmentation agent that analyzes customer data to create high-value audience segments for personalized marketing campaigns',
            tone: 'analytical',
            audience: 'Data analysts, marketing operations teams, and campaign managers',
            domain: 'Customer Data Platform & Marketing Analytics',
            model: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
            temperature: 0.3,
            maxToolsIterations: 5,
            systemPrompt: `You are an expert Customer Segmentation Agent specializing in enterprise Customer Data Platforms (CDP).

**Your Primary Role:**
Analyze unified customer data to create actionable, high-value audience segments that drive personalized marketing campaigns and improve customer lifetime value.

**Core Capabilities:**

1. **RFM Segmentation (Recency, Frequency, Monetary)**
   - Calculate RFM scores across customer base
   - Identify Champions, Loyal Customers, At-Risk, and Lost customers
   - Recommend retention vs acquisition strategies per segment

2. **Behavioral Segmentation**
   - Product affinity analysis
   - Channel preference identification
   - Engagement pattern recognition
   - Purchase journey stage mapping

3. **Predictive Segmentation**
   - Churn risk scoring
   - Lifetime value prediction
   - Next-best-action recommendations
   - Propensity modeling (buy, churn, upgrade)

4. **Demographic & Firmographic Segmentation**
   - B2C: Age, location, income, family status
   - B2B: Industry, company size, revenue, tech stack

**Data Sources to Leverage:**
- Transaction history (purchases, returns, refunds)
- Website/app behavioral data (page views, clicks, time spent)
- Email engagement (opens, clicks, unsubscribes)
- Customer service interactions
- Social media engagement
- Third-party enrichment data

**Output Requirements:**

For each segment, provide:
- Segment name and description
- Size (estimated % of customer base)
- Key characteristics and behaviors
- Recommended marketing strategies
- Channel preferences
- Expected ROI/LTV
- Activation recommendations (platforms, timing, messaging)

**Analysis Framework:**

When creating segments:
1. Ask clarifying questions about business objectives
2. Review available data sources in CDP
3. Propose 3-5 strategic segments with rationale
4. Provide SQL-like pseudo-queries for segment definition
5. Recommend testing/validation approach
6. Suggest measurement KPIs

**Best Practices:**
- Ensure segments are Measurable, Accessible, Substantial, and Actionable (MASA framework)
- Avoid over-segmentation (diminishing returns <1% of base)
- Balance static vs dynamic segmentation
- Consider data privacy regulations (GDPR, CCPA)
- Account for data quality and completeness

**Compliance & Privacy:**
- Never request PII directly
- Work with anonymized/aggregated data
- Respect opt-out preferences
- Follow data retention policies
- Ensure segments comply with consent management

Always provide data-driven recommendations with clear business impact and implementation guidance.`
        },
        knowledgeBases: [
            {
                name: 'RFM Segmentation Framework',
                content: `# RFM Segmentation Best Practices

## RFM Model Overview

**RFM** analyzes customer value across three dimensions:
- **Recency (R):** How recently did the customer purchase?
- **Frequency (F):** How often do they purchase?
- **Monetary (M):** How much do they spend?

## Scoring System

### 5-Point Scale (Most Common)
- **5:** Top 20% (best)
- **4:** Next 20%
- **3:** Middle 20%
- **2:** Next 20%
- **1:** Bottom 20% (worst)

### Recency Scoring
- Score 5: 0-30 days
- Score 4: 31-60 days
- Score 3: 61-90 days
- Score 2: 91-180 days
- Score 1: 180+ days

### Frequency Scoring
- Score 5: 10+ purchases
- Score 4: 7-9 purchases
- Score 3: 4-6 purchases
- Score 2: 2-3 purchases
- Score 1: 1 purchase

### Monetary Scoring
- Score 5: $1000+ total spend
- Score 4: $500-$999
- Score 3: $250-$499
- Score 2: $100-$249
- Score 1: <$100

## Customer Segments

### Champions (R:5, F:5, M:5)
- **Characteristics:** Recent, frequent, high-value buyers
- **Size:** Typically 5-10% of base
- **Strategy:** VIP treatment, exclusive access, loyalty rewards
- **Channels:** Email, SMS, direct mail
- **Messaging:** Premium products, early access, personalization

### Loyal Customers (R:4-5, F:3-5, M:3-5)
- **Characteristics:** Regular buyers, moderate-to-high value
- **Size:** 15-20% of base
- **Strategy:** Upsell, cross-sell, subscription programs
- **Channels:** Email, personalized web, app notifications
- **Messaging:** Product recommendations, bundle offers

### Potential Loyalists (R:4-5, F:1-2, M:1-3)
- **Characteristics:** Recent buyers, low frequency
- **Strategy:** Nurture campaigns, second purchase incentives
- **Channels:** Email, retargeting ads
- **Messaging:** Product education, use cases, limited-time offers

### At-Risk (R:2-3, F:3-5, M:3-5)
- **Characteristics:** Were good customers, declining engagement
- **Size:** 10-15% of base
- **Strategy:** Win-back campaigns, surveys, special offers
- **Channels:** Email, direct outreach, phone
- **Messaging:** "We miss you," exclusive discounts, feedback requests

### Can't Lose Them (R:1-2, F:4-5, M:4-5)
- **Characteristics:** High-value customers losing interest
- **Strategy:** Aggressive retention, personalized outreach
- **Channels:** Multi-channel (email, phone, mail)
- **Messaging:** VIP recovery offers, relationship-building

### Hibernating (R:1-2, F:1-2, M:1-3)
- **Characteristics:** Long inactive, low value
- **Strategy:** Cost-effective reactivation or suppression
- **Channels:** Low-cost email, social ads
- **Messaging:** Big discounts, new product announcements

### Lost (R:1, F:1-2, M:1-2)
- **Characteristics:** Churned, unlikely to return
- **Strategy:** Minimal investment or suppression
- **Action:** Survey for feedback, remove from expensive channels

## Implementation in CDP

### Data Requirements
\`\`\`sql
SELECT
    customer_id,
    DATEDIFF(CURRENT_DATE, MAX(purchase_date)) as recency_days,
    COUNT(DISTINCT order_id) as frequency,
    SUM(order_total) as monetary_value
FROM transactions
WHERE purchase_date >= DATE_SUB(CURRENT_DATE, INTERVAL 365 DAY)
GROUP BY customer_id
\`\`\`

### Segment Activation
1. **CDP Export:** Sync segments to marketing platforms
2. **Real-time:** Update segments on behavioral triggers
3. **Batch:** Daily/weekly recalculation
4. **API:** Expose segments for personalization engines

## Advanced RFM Techniques

### Weighted RFM
Weight dimensions differently based on business model:
- **E-commerce:** R:40%, F:30%, M:30%
- **Subscription:** R:30%, F:50%, M:20%
- **Retail:** R:35%, F:35%, M:30%

### Time-Decay RFM
Apply decay function to older transactions to emphasize recent behavior.

### Category-Specific RFM
Calculate RFM per product category for targeted campaigns.

## Performance Metrics

Track segment performance:
- **Conversion Rate:** % who purchase in next 30 days
- **Revenue Per Customer:** Average spend per segment
- **Retention Rate:** % who remain active
- **Campaign ROI:** Revenue / campaign cost per segment
- **Lift:** Segment performance vs control group

## Common Pitfalls

❌ **Don't:**
- Use outdated recency thresholds (adjust for purchase cycle)
- Ignore industry benchmarks
- Create too many micro-segments
- Apply same strategy across all channels
- Forget to test and iterate

✅ **Do:**
- Align scoring to business model and purchase frequency
- Validate segments with historical performance
- A/B test messaging and offers per segment
- Monitor segment migration over time
- Integrate with customer journey mapping`
            },
            {
                name: 'Behavioral Segmentation Strategies',
                content: `# Behavioral Segmentation for CDP

## Engagement-Based Segments

### High Engagement
**Definition:** Frequent interactions across multiple channels
**Indicators:**
- Email: 50%+ open rate, 10%+ click rate
- Web: 5+ sessions/month, 10+ minutes avg session
- App: Daily active user
- Social: Regular likes, shares, comments

**Strategy:** Upsell premium products, request reviews/referrals, beta testing

### Medium Engagement
**Definition:** Regular but selective interaction
**Indicators:**
- Email: 20-50% open rate, 3-10% click rate
- Web: 2-4 sessions/month
- App: Weekly active user

**Strategy:** Content marketing, educational campaigns, nurture programs

### Low Engagement
**Definition:** Minimal interaction, risk of churn
**Indicators:**
- Email: <20% open rate
- Web: <2 sessions/month
- App: Monthly active or less

**Strategy:** Re-engagement campaigns, surveys, win-back offers

## Purchase Behavior Segments

### Product Affinity Clusters
Use collaborative filtering to identify:
- **Luxury Buyers:** High AOV, premium brands
- **Bargain Hunters:** High discount usage, price-sensitive
- **Variety Seekers:** Diverse category purchases
- **Brand Loyalists:** Repeat purchases of same brands
- **Seasonal Shoppers:** Holiday/event-driven purchases

### Purchase Frequency Tiers
- **Power Users:** Weekly purchases
- **Regular Customers:** Monthly purchases
- **Occasional Buyers:** Quarterly purchases
- **One-Time Buyers:** Single purchase, no repeat

### Cart Behavior
- **High Cart Abandoners:** 3+ abandoned carts
- **Browse-Heavy, Buy-Light:** High sessions, low conversion
- **Impulse Buyers:** Quick purchase decisions
- **Researchers:** Long consideration period

## Channel Preference Segmentation

### Email-Preferred
- High email engagement, low other channels
- Strategy: Email-first campaigns, exclusive email offers

### Mobile-First
- Majority of traffic/purchases from mobile
- Strategy: App push notifications, mobile-optimized experiences

### Social Natives
- High social engagement, shares content
- Strategy: Influencer partnerships, UGC campaigns

### Omnichannel
- Engages across all touchpoints
- Strategy: Consistent cross-channel messaging, unified experiences

## Content Consumption Patterns

### Content Topics
Segment by preferred content:
- **Product-Focused:** Specs, reviews, comparisons
- **Educational:** How-tos, guides, webinars
- **Entertainment:** Stories, videos, behind-the-scenes
- **Community:** Forums, user-generated content

### Content Format
- **Video Watchers:** High video engagement
- **Blog Readers:** Long-form content consumers
- **Visual Learners:** Infographic, image engagement
- **Podcast Listeners:** Audio content preference

## Journey Stage Segmentation

### Awareness Stage
**Behaviors:**
- First-time visitors
- Top-of-funnel content consumption
- General category browsing

**Strategy:** Educational content, brand awareness, thought leadership

### Consideration Stage
**Behaviors:**
- Product comparison views
- Multiple sessions before purchase
- Email opt-in for more information

**Strategy:** Product demos, case studies, comparison guides, nurture emails

### Decision Stage
**Behaviors:**
- Pricing page views
- Cart adds
- Customer review reading

**Strategy:** Limited-time offers, free trials, testimonials, guarantees

### Post-Purchase
**Behaviors:**
- Order tracking
- Support ticket creation
- Product review submission

**Strategy:** Onboarding emails, cross-sell, loyalty programs, referral requests

## Predictive Behavioral Segments

### Churn Risk Tiers
**High Risk (Score: 80-100)**
- Declining engagement
- Increasing time between purchases
- Negative sentiment signals

**Medium Risk (Score: 50-79)**
- Flat engagement
- Competitive research behavior

**Low Risk (Score: 0-49)**
- Growing engagement
- Increasing purchase frequency

### Propensity to Buy
**High Propensity**
- Added to cart in last 7 days
- Viewed product 3+ times
- High engagement score

**Medium Propensity**
- Category browsing
- Email engagement

**Low Propensity**
- Inactive 90+ days
- Low engagement

## Micro-Moments Segmentation

### "I-Want-to-Know" Moments
- Blog readers, video watchers
- Strategy: SEO content, educational campaigns

### "I-Want-to-Go" Moments
- Local store searches, location-based
- Strategy: Local inventory ads, store locators

### "I-Want-to-Buy" Moments
- High purchase intent signals
- Strategy: Retargeting, cart recovery, urgency messaging

### "I-Want-to-Do" Moments
- How-to searches, tutorial viewers
- Strategy: Instructional content, product demos

## Implementation Best Practices

### Data Collection
\`\`\`javascript
// Example event tracking structure
{
  event_type: "page_view",
  user_id: "12345",
  session_id: "abc-def-ghi",
  timestamp: "2025-01-17T10:30:00Z",
  page_url: "/products/widget-pro",
  category: "products",
  subcategory: "premium",
  time_on_page: 120,
  scroll_depth: 75,
  interactions: ["add_to_cart", "watch_video"]
}
\`\`\`

### Segment Activation Rules
\`\`\`
IF customer.email_open_rate > 50%
   AND customer.sessions_30d > 5
   AND customer.category_views CONTAINS "premium"
THEN assign_segment("High-Engagement-Premium-Browsers")
AND trigger_campaign("Premium-Product-Launch")
\`\`\`

### Testing Framework
1. **Holdout Group:** 10% control for baseline
2. **A/B Test:** Messaging, offers, timing per segment
3. **Measure:** Conversion lift, revenue impact, engagement
4. **Iterate:** Refine segments based on performance`
            },
            {
                name: 'CDP Integration & Activation Guide',
                content: `# CDP Segment Activation Guide

## Supported CDP Platforms

### Treasure Data CDP
- **Activation Method:** Audience segments via API
- **Real-time:** Event-triggered segment updates
- **Batch:** Scheduled segment exports (hourly/daily)
- **Destinations:** 200+ marketing tools

### Salesforce CDP (Formerly Interaction Studio)
- **Activation:** Einstein segmentation API
- **Real-time:** Behavioral triggers
- **Integration:** Native Salesforce Marketing Cloud

### Adobe Experience Platform
- **Activation:** Real-Time Customer Profile
- **Segmentation:** Query service, segment builder
- **Destinations:** Adobe suite + 100+ partners

### Segment (Twilio)
- **Activation:** Computed traits, audiences
- **Real-time:** Event streaming
- **Destinations:** 300+ integrations

## Activation Workflow

### 1. Segment Definition
Define segments in CDP using:
- **UI Builder:** Drag-and-drop segment builder
- **SQL:** Custom queries on unified customer table
- **API:** Programmatic segment creation

Example SQL:
\`\`\`sql
SELECT customer_id
FROM unified_customer_profile
WHERE
  rfm_score >= 400
  AND last_purchase_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
  AND total_lifetime_value >= 1000
  AND email_consent = TRUE
\`\`\`

### 2. Sync Destinations

#### Email Marketing Platforms
- **Marketo:** Segment → Smart List
- **HubSpot:** Segment → Active List
- **Braze:** Segment → Canvas Audience
- **Iterable:** Segment → User List

#### Advertising Platforms
- **Google Ads:** Customer Match audiences
- **Facebook:** Custom Audiences
- **LinkedIn:** Matched Audiences
- **The Trade Desk:** First-party segments

#### Personalization Engines
- **Dynamic Yield:** Behavioral segments
- **Monetate:** Audience targeting
- **Optimizely:** Audience conditions

### 3. Real-Time Activation

**Event-Based Triggers:**
\`\`\`javascript
// Pseudocode for real-time segment entry
ON EVENT customer.cart_abandoned:
  IF customer NOT IN segment.cart_abandonment_30d:
    ADD customer TO segment.cart_abandonment_30d
    TRIGGER email.cart_recovery
    WAIT 24 hours
    IF cart STILL abandoned:
      TRIGGER sms.cart_reminder
      ADD 10% discount
\`\`\`

### 4. Multi-Touch Attribution

Track segment performance across touchpoints:
\`\`\`
Segment: High-Value-At-Risk
│
├─ Email Campaign: Win-back offer
│  ├─ Open Rate: 45%
│  ├─ Click Rate: 12%
│  └─ Conversions: 3%
│
├─ Retargeting Ads: Facebook/Instagram
│  ├─ Impressions: 50K
│  ├─ Clicks: 1.2K
│  └─ Conversions: 28
│
└─ Direct Mail: Exclusive catalog
   ├─ Delivered: 5K
   ├─ QR Code Scans: 450
   └─ Purchases: 67

Total Revenue: $45,000
Total Cost: $8,500
ROI: 429%
\`\`\`

## Segment Hygiene & Maintenance

### Daily Tasks
- Monitor segment population trends
- Check for segment overlap (>30% = redundancy)
- Validate segment sizes (min 1000 for statistical significance)

### Weekly Tasks
- Review segment performance metrics
- A/B test new segment hypotheses
- Optimize underperforming segments

### Monthly Tasks
- Audit segment definitions for data drift
- Update scoring models with fresh data
- Document segment strategies and results

## Privacy & Compliance

### GDPR Compliance
- **Right to Access:** Export all customer segment memberships
- **Right to Erasure:** Remove from all segments on deletion
- **Right to Object:** Suppress from marketing segments
- **Consent Management:** Respect opt-out preferences per channel

### CCPA Compliance
- **Do Not Sell:** Exclude from third-party ad audiences
- **Opt-Out Honoring:** Remove from sale/share segments
- **Transparency:** Disclose segment categories collected

### Consent Management Platform Integration
\`\`\`javascript
// Respect consent preferences
IF customer.consent.email_marketing == FALSE:
  EXCLUDE FROM email_segments

IF customer.consent.third_party_ads == FALSE:
  EXCLUDE FROM advertising_platforms

IF customer.location IN gdpr_countries:
  REQUIRE explicit_consent FOR profiling_segments
\`\`\`

## Performance Optimization

### Segment Calculation Efficiency
- **Incremental Updates:** Only recalculate changed customers
- **Materialized Views:** Pre-compute complex segments
- **Caching:** Cache segment membership for 24 hours
- **Partitioning:** Partition data by date for faster queries

### API Rate Limiting
- **Batch Updates:** Send updates in batches of 1000
- **Throttling:** Respect platform rate limits (e.g., 100 req/min)
- **Retry Logic:** Exponential backoff on failures

## Troubleshooting

### Issue: Segment Size Unexpectedly Changed
**Check:**
- Data source connection status
- Recent schema changes
- Filter condition drift (e.g., date ranges)
- Duplicate customer records

### Issue: Low Sync Success Rate
**Check:**
- API credentials/authentication
- Destination platform rate limits
- Data format mismatches
- Required field mappings

### Issue: Segment Not Updating in Real-Time
**Check:**
- Event streaming pipeline health
- Webhook delivery status
- Trigger conditions properly configured
- Destination platform processing time

## Best Practices

✅ **Do:**
- Test segments with small audiences first
- Monitor segment overlap to avoid fatigue
- Document segment definitions and business logic
- Version control segment queries (SQL)
- Set up alerts for segment size changes >20%

❌ **Don't:**
- Activate untested segments to paid channels
- Create segments <1000 customers (statistical noise)
- Sync PII to unsecured destinations
- Ignore destination sync errors
- Activate to all channels simultaneously (test sequentially)`
            }
        ]
    },

    {
        id: 'journey-orchestration',
        name: 'Customer Journey Orchestrator',
        icon: '🗺️',
        category: 'Marketing Automation',
        targetAudience: ['Enterprise', 'Mid-Market'],
        description: 'Design and optimize multi-touch customer journeys across email, SMS, web, and mobile channels',
        config: {
            projectName: 'Omnichannel Journey Orchestration Platform',
            projectDescription: 'Enterprise journey builder that creates intelligent, adaptive customer experiences across all marketing touchpoints with AI-powered optimization',
            agentName: 'Journey Orchestrator Agent',
            description: 'An intelligent journey orchestration agent that designs, executes, and optimizes multi-channel customer experiences based on behavior, preferences, and business goals',
            tone: 'strategic',
            audience: 'Marketing automation specialists, campaign managers, and CRM teams',
            domain: 'Marketing Automation & Customer Experience',
            model: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
            temperature: 0.5,
            maxToolsIterations: 7,
            systemPrompt: `You are an expert Customer Journey Orchestration Agent specializing in enterprise marketing automation and omnichannel customer experiences.

**Your Primary Role:**
Design, execute, and continuously optimize customer journeys that deliver personalized experiences across email, SMS, push notifications, in-app messages, web personalization, and direct mail.

**Core Capabilities:**

1. **Journey Design & Strategy**
   - Map customer lifecycle stages (acquisition, onboarding, nurture, retention, win-back)
   - Design trigger-based vs time-based journey flows
   - Define entry criteria, exit conditions, and flow logic
   - Incorporate branching based on behavior, demographics, and engagement
   - Set up A/B/n testing for journey variants

2. **Multi-Channel Orchestration**
   - **Email:** Transactional, promotional, lifecycle campaigns
   - **SMS:** Time-sensitive offers, reminders, alerts
   - **Push Notifications:** App engagement, personalized recommendations
   - **In-App Messages:** Onboarding, feature adoption, upsell
   - **Web Personalization:** Dynamic content, pop-ups, banners
   - **Direct Mail:** High-value customer touchpoints
   - **Paid Media:** Retargeting, lookalike audiences

3. **Personalization & Dynamic Content**
   - Personalize messaging based on:
     * Behavioral data (browsing, purchases, engagement)
     * Demographic/firmographic attributes
     * Predictive scores (churn risk, LTV, propensity)
     * Real-time context (location, device, weather, inventory)
   - Dynamic content blocks (product recommendations, offers, CTAs)
   - Send-time optimization (best time to engage per individual)

4. **Journey Analytics & Optimization**
   - Track journey performance metrics:
     * Entry/exit rates at each stage
     * Conversion rates per touchpoint
     * Time-to-conversion
     * Channel attribution
     * Revenue/ROI per journey
   - Identify bottlenecks and drop-off points
   - Recommend optimization opportunities
   - Implement AI-powered next-best-action

5. **Compliance & Governance**
   - Respect channel consent preferences
   - Enforce frequency caps (daily, weekly, monthly)
   - Implement quiet hours and time zone awareness
   - Ensure GDPR, CCPA, CAN-SPAM compliance
   - Manage opt-out and suppression lists

**Journey Design Framework:**

When creating journeys, follow this process:

1. **Discovery**
   - Understand business objective (acquisition, retention, revenue)
   - Define success metrics (conversion rate, revenue, engagement)
   - Identify target audience and segments
   - Map current state customer experience

2. **Strategy**
   - Propose journey triggers (behavioral, demographic, time-based)
   - Design touchpoint sequence and timing
   - Define personalization variables
   - Recommend channel mix based on audience preferences

3. **Execution Blueprint**
   - Provide journey map visualization (text-based flowchart)
   - Specify entry and exit criteria
   - Detail decision logic (if/then conditions)
   - Define content requirements per touchpoint
   - Set up measurement framework

4. **Optimization Plan**
   - Identify test hypotheses (messaging, timing, channels)
   - Recommend A/B test structure
   - Define success criteria and sample sizes
   - Suggest holdout group (10-20% for baseline)

**Output Format:**

For journey designs, structure your response as:

\`\`\`
JOURNEY NAME: [Descriptive name]
OBJECTIVE: [Business goal]
TARGET AUDIENCE: [Segment description]
ESTIMATED IMPACT: [Expected uplift in key metrics]

ENTRY TRIGGERS:
- [Condition 1]
- [Condition 2]

JOURNEY FLOW:
┌─────────────────┐
│ Entry Point     │
│ [Trigger]       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Day 0: Email    │
│ Subject: [...]  │
│ Goal: [...]     │
└────────┬────────┘
         │
    [Decision]
    /        \\
Opened   Not Opened
   │           │
   ▼           ▼
 [Next     [Wait 2d
  Step]     + SMS]

PERSONALIZATION VARIABLES:
- {{first_name}}
- {{recommended_product}}
- {{cart_total}}
- {{days_since_last_purchase}}

SUCCESS METRICS:
- Primary: [Metric + target]
- Secondary: [Metric + target]

TESTING PLAN:
- Variant A: [Description]
- Variant B: [Description]
- Sample Size: [Number]
- Duration: [Days]
\`\`\`

**Best Practices:**

✅ **Do:**
- Start with simple journeys, add complexity iteratively
- Test one variable at a time for clear insights
- Use consistent branding and messaging across channels
- Monitor unsubscribe rates for fatigue signals
- Leverage behavioral triggers over batch-and-blast
- Provide clear opt-out options in every message

❌ **Don't:**
- Over-message customers (respect frequency caps)
- Send at inconvenient times (use send-time optimization)
- Ignore engagement signals (adapt journey based on behavior)
- Create journeys without clear exit criteria
- Forget to test on mobile devices
- Mix promotional and transactional messages

**Platform Integration:**

Mention specific platform capabilities when relevant:
- Salesforce Marketing Cloud: Journey Builder
- Adobe Campaign: Cross-channel workflows
- Braze: Canvas multi-channel journeys
- Iterable: Workflow Studio
- HubSpot: Workflows
- Marketo Engage: Engagement Programs

Always provide actionable, production-ready journey designs with clear implementation steps and measurement frameworks.`
        },
        knowledgeBases: [
            {
                name: 'Journey Mapping Best Practices',
                content: `# Customer Journey Orchestration Best Practices

## Journey Types

### 1. Acquisition Journeys
**Goal:** Convert prospects to first-time customers

**Welcome Series Example:**
\`\`\`
Day 0: Welcome Email
- Subject: "Welcome to [Brand]! Here's 15% off your first order"
- CTA: Shop Now
- Personalization: Recommend products based on signup source

Day 2: Value Proposition Email (if no purchase)
- Subject: "Why 2M+ customers choose [Brand]"
- Content: Customer testimonials, awards, guarantees
- CTA: Explore Best Sellers

Day 5: Social Proof + Urgency (if no purchase)
- Subject: "[First Name], your 15% offer expires in 48 hours!"
- Content: User-generated content, limited-time reminder
- CTA: Claim Discount

Day 7: Last Chance (if no purchase)
- Subject: "Final hours: Your exclusive welcome offer"
- Send Time: 10 AM recipient's timezone
- Alternative: Exit journey and move to nurture

Post-Purchase: Order Confirmation + Cross-sell
- Transactional: Order details, shipping timeline
- Cross-sell: "People who bought X also loved Y"
- CTA: Track Order
\`\`\`

**Metrics:**
- Conversion Rate: 15-25% (industry avg)
- Revenue Per Recipient: $12-$45
- Time to First Purchase: 3-7 days median

### 2. Onboarding Journeys
**Goal:** Activate new customers, drive repeat purchase

**SaaS Onboarding Example:**
\`\`\`
Day 0: Account Created
- Email: "Get started in 3 easy steps"
- In-App: Product tour widget
- Goal: Complete profile setup

Day 1: Feature Highlight
- Email: "Unlock your first win with [Core Feature]"
- In-App: Tooltip on core feature
- Goal: First meaningful action

Day 3: Social Proof
- Email: "How [Similar Company] achieved [Result] with [Product]"
- Goal: Increase perceived value

Day 7: Check-in + Support Offer
- Email: "How's it going? We're here to help"
- Include: Booking link for 1:1 demo
- Goal: Reduce early churn

Day 14: Upsell/Cross-sell (if engaged)
- Email: "Ready to unlock advanced features?"
- Goal: Upgrade to paid plan

Day 30: Success Milestone
- Email: "You've achieved [Metric]! What's next?"
- Goal: Reinforce value, request testimonial
\`\`\`

### 3. Nurture Journeys
**Goal:** Move prospects through consideration stage

**B2B Lead Nurture:**
\`\`\`
Entry: Downloaded whitepaper / attended webinar

Week 1: Educational Email
- Content: Related use case or industry insight
- CTA: Read blog post

Week 2: Social Proof
- Content: Customer success story in their industry
- CTA: Watch video case study

Week 3: Product-Focused
- Content: "How [Feature] solves [Pain Point]"
- CTA: Book a demo

Week 4: Competitive Comparison
- Content: "[Product] vs [Competitor]"
- CTA: See full comparison

Engagement-Based Branching:
- High Engagement → Sales handoff
- Medium Engagement → Continue nurture
- Low Engagement → Pause journey, retarget ads
\`\`\`

### 4. Retention & Loyalty Journeys
**Goal:** Increase repeat purchase, prevent churn

**Subscription Renewal Journey:**
\`\`\`
90 Days Before Renewal: Highlight Value
- Email: "Your year in review: [Usage stats]"
- Goal: Reinforce value received

60 Days Before: Early Renewal Incentive
- Email: "Renew early, save 10%"
- SMS: "Exclusive early renewal offer inside"
- Goal: Secure renewal early

30 Days Before: Reminder + Upsell
- Email: "Your subscription renews on [Date]"
- Content: "Upgrade to [Tier] for [Benefits]"
- Goal: Upsell or confirm renewal

7 Days Before: Final Reminder
- Email: "Renewing in 7 days. Update billing if needed."
- SMS: Short reminder with CTA
- Goal: Reduce payment failures

Post-Renewal: Thank You + Referral
- Email: "Thanks for another year! Refer a friend, get $50"
- Goal: Acquire new customers
\`\`\`

### 5. Win-Back Journeys
**Goal:** Re-engage churned or dormant customers

**E-commerce Win-Back:**
\`\`\`
Entry: No purchase in 90 days (adjust based on your purchase cycle)

Day 0: "We Miss You" Email
- Subject: "It's been a while, [Name]. Here's 20% off to come back"
- Content: Highlight new products/features
- CTA: Shop Now

Day 7: Survey Email (if no engagement)
- Subject: "Quick question: Why did you stop shopping with us?"
- Content: 2-question survey (reason for leaving, what would bring you back)
- Incentive: "Complete survey for 25% off"

Day 14: High-Value Offer (if survey completed or engaged)
- Subject: "Here's 30% off, just for you"
- Content: Personalized product recommendations
- Urgency: 48-hour expiration

Day 21: Final Attempt (if still no purchase)
- Subject: "Last call: Your exclusive offer expires tonight"
- Send: Evening hours for urgency

Exit: If no response after 30 days, suppress from email for 90 days, move to low-cost retargeting ads
\`\`\`

## Channel Selection Matrix

| Channel | Best For | Typical Open/Engagement Rate | Cost | Speed |
|---------|----------|------------------------------|------|-------|
| Email | Detailed content, nurture | 20-30% OR | $ | Hours |
| SMS | Urgent, high-intent | 90%+ OR | $$ | Seconds |
| Push | App engagement, real-time | 5-10% OR | $ | Instant |
| In-App | Feature adoption, contextual | 40-60% engagement | $ | Instant |
| Web Push | Browse abandonment, promotions | 5-15% CTR | $ | Instant |
| Direct Mail | High LTV, VIP | 5-10% response | $$$$ | Days |

## Timing Best Practices

### Email Send Times (B2C)
- **Best Days:** Tuesday, Wednesday, Thursday
- **Best Times:** 10 AM - 11 AM, 2 PM - 3 PM (recipient timezone)
- **Worst Times:** Weekends (unless retail), before 6 AM, after 8 PM

### Email Send Times (B2B)
- **Best Days:** Tuesday, Wednesday
- **Best Times:** 9 AM - 11 AM, 1 PM - 3 PM (work hours)
- **Worst Times:** Mondays (inbox overload), Fridays after 3 PM

### SMS Send Times
- **Best Times:** 12 PM - 3 PM, 5 PM - 7 PM
- **Avoid:** Before 9 AM, after 9 PM (unless urgent/transactional)
- **Respect Quiet Hours:** 9 PM - 9 AM local time

### Push Notification Times
- **Morning:** 7 AM - 9 AM (commute time)
- **Lunch:** 12 PM - 1 PM
- **Evening:** 6 PM - 8 PM (after work)
- **Avoid:** Late night (unless time-sensitive)

## Frequency Caps

### Email
- **Promotional:** Max 3-4 per week
- **Transactional:** No limit (but batch when possible)
- **Nurture:** 1-2 per week

### SMS
- **Promotional:** Max 4 per month
- **Transactional:** As needed
- **Urgent:** As needed but sparingly

### Push Notifications
- **Promotional:** Max 1-2 per day
- **Behavioral:** As triggered, but cap at 5/day

**Fatigue Monitoring:**
- Track unsubscribe rate (>0.5% = concern)
- Monitor engagement decline
- Implement global frequency cap across all journeys
- Respect user preference center settings

## Decision Logic & Branching

### Engagement-Based Branching
\`\`\`
IF email.opened AND link.clicked:
    CONTINUE to Variant A (High Engagement Path)
ELSE IF email.opened AND NOT link.clicked:
    WAIT 2 days → Send alternative CTA
ELSE:
    WAIT 3 days → Try different subject line
\`\`\`

### Behavioral Branching
\`\`\`
IF cart.abandoned:
    WAIT 1 hour → Send Cart Recovery Email
    IF cart STILL abandoned after 24 hours:
        SEND SMS reminder with discount code
    IF purchase completed:
        EXIT journey → Enter Post-Purchase journey
\`\`\`

### Propensity-Based Branching
\`\`\`
IF churn_risk_score > 70:
    SEND high-value retention offer
ELSE IF churn_risk_score 40-70:
    SEND standard retention message
ELSE:
    CONTINUE standard journey
\`\`\`

## Testing Framework

### A/B Test Ideas
1. **Subject Lines:** Emoji vs no emoji, length, personalization
2. **Send Times:** Morning vs afternoon vs evening
3. **Content:** Short vs long, image-heavy vs text
4. **CTA:** Button color, copy, placement
5. **Personalization:** Generic vs personalized
6. **Offers:** % off vs $ off vs free shipping

### Multivariate Testing
Test combinations of variables:
- Subject Line A/B × CTA A/B × Send Time A/B = 8 variants

### Statistical Significance
- **Minimum Sample Size:** 1,000 per variant (email)
- **Minimum Runtime:** 7 days (to cover weekly patterns)
- **Confidence Level:** 95% (p-value < 0.05)
- **Winner Criteria:** >10% improvement to be meaningful

## Advanced Techniques

### Predictive Send-Time Optimization
Use ML to determine best send time per individual based on historical engagement patterns.

### AI-Powered Next-Best-Action
Recommend next message/channel/offer based on:
- Similar customer behaviors
- Historical conversion patterns
- Real-time context (browsing, cart contents)

### Cross-Journey Orchestration
Coordinate multiple journeys to avoid message conflicts:
\`\`\`
Customer in BOTH:
- Onboarding Journey (Day 3)
- Cart Abandonment Journey (just triggered)

RULE: Cart Abandonment takes priority (higher intent)
ACTION: Pause onboarding, resume after purchase or 3 days
\`\`\``
            },
            {
                name: 'Marketing Automation Platform Guides',
                content: `# Platform-Specific Implementation Guides

## Salesforce Marketing Cloud (SFMC)

### Journey Builder Overview
- **Trigger Type:** Event-triggered (API, Data Extension), Scheduled (batch)
- **Entry Sources:** Data Extensions, Audiences, API events, Sales/Service Cloud
- **Activities:** Email, SMS, Push, Wait, Decision Split, Einstein AI, Update Contact

### Sample Journey Configuration

**1. Entry Source Setup**
\`\`\`sql
-- Data Extension for Cart Abandonment
CREATE DATA EXTENSION CartAbandonment (
    SubscriberKey VARCHAR(50) PRIMARY KEY,
    Email VARCHAR(100),
    FirstName VARCHAR(50),
    CartTotal DECIMAL(10,2),
    CartItems VARCHAR(MAX), -- JSON array
    AbandonmentDate DATETIME,
    CartURL VARCHAR(500)
)

-- Journey Entry: Contacts added to this DE in last 1 hour
\`\`\`

**2. Decision Split Examples**
\`\`\`
Split by Attribute:
  IF CartTotal > 200 THEN High-Value Path
  ELSE IF CartTotal > 50 THEN Medium-Value Path
  ELSE Low-Value Path

Split by Engagement:
  IF Email Opened within 1 day THEN Engaged Path
  ELSE Not Engaged Path
\`\`\`

**3. Wait Activities**
\`\`\`
Wait Duration:
- 1 hour after entry
- Until specific date/time
- Until contact enters another journey

Wait Until:
- Monday at 10 AM
- Business hours only (M-F 9-5)
- Specific timezone (Contact's timezone)
\`\`\`

**4. Einstein Recommendations**
\`\`\`
Activity: Einstein Product Recommendations
- Algorithm: Collaborative Filtering
- Number of Products: 3
- Fallback: Best Sellers
- Insert into Email via AMPscript:
  %%[ FOR @i = 1 TO 3 DO ]%%
    <img src="%%=v(@rec_img_%i)=%%" />
    <p>%%=v(@rec_name_%i)=%%</p>
  %%[ NEXT @i ]%%
\`\`\`

### SFMC Best Practices
✅ Use Contact Builder for unified customer view
✅ Leverage Einstein AI for send-time optimization
✅ Implement Triggered Sends for transactional emails
✅ Use Journey Builder for complex, multi-touch campaigns
✅ Enable Journey Analytics for performance dashboards

---

## Adobe Campaign

### Workflow Canvas
- **Trigger Types:** Scheduler, Signal, API call, Event-triggered
- **Activities:** Query, Split, Wait, Email, SMS, Enrichment, Update data
- **Personalization:** JavaScript expressions, Dynamic content blocks

### Sample Workflow

**1. Query Activity (Entry)**
\`\`\`sql
-- Select customers with upcoming subscription renewal
SELECT * FROM Recipients
WHERE
  subscriptionEndDate BETWEEN CURRENT_DATE
    AND CURRENT_DATE + INTERVAL '30 days'
  AND emailOptIn = TRUE
  AND subscriptionStatus = 'ACTIVE'
\`\`\`

**2. Enrichment Activity**
\`\`\`javascript
// Add custom variables
recipient.daysTillRenewal = dateDiff(
  recipient.subscriptionEndDate,
  currentDate,
  'day'
);

recipient.renewalIncentive =
  recipient.tier == 'premium' ? '20% off' : '10% off';
\`\`\`

**3. Split Activity**
\`\`\`
Complement splits:
- Set 1: daysTillRenewal <= 7 (Send urgent email)
- Set 2: daysTillRenewal 8-15 (Send reminder email)
- Set 3: daysTillRenewal 16-30 (Send early renewal offer)
\`\`\`

**4. Email Delivery**
\`\`\`javascript
// Dynamic subject line
<%= recipient.firstName %>, your <%= recipient.planName %>
renews in <%= recipient.daysTillRenewal %> days

// Dynamic content block
<% if (recipient.tier == 'premium') { %>
  <p>As a premium member, enjoy 20% off renewal!</p>
<% } else { %>
  <p>Renew now and save 10%</p>
<% } %>
\`\`\`

### Adobe Campaign Best Practices
✅ Use built-in fatigue management rules
✅ Implement seed lists for QA testing
✅ Leverage typology rules for compliance
✅ Use JavaScript for complex personalization
✅ Enable tracking for all deliveries

---

## Braze Canvas

### Canvas Structure
- **Entry:** Scheduled, Action-Based (custom events), API-triggered
- **Steps:** Message, Delay, Decision Split, Experiment, Update User
- **Channels:** Email, Push, In-App, SMS, Webhook, Content Cards

### Sample Canvas

**1. Action-Based Entry**
\`\`\`
Event: "trial_started"
Properties:
  - trial_start_date (timestamp)
  - plan_type (string)
  - source (string)

Entry Filters:
- trial_start_date is less than 1 hour ago
- email_subscribed is true
\`\`\`

**2. Delay Step**
\`\`\`
Delay Options:
- For a duration: 2 days
- Until a specific time: Next Tuesday at 10 AM
- Until event occurs: "trial_converted" or 14 days max
\`\`\`

**3. Decision Split (Audience)**
\`\`\`
Path 1: Engaged Users
  - session_count > 3 in last 7 days
  → Send feature highlight email

Path 2: Low Engagement
  - session_count <= 3 in last 7 days
  → Send activation email with support offer

Path 3: Everyone Else
  → Continue to next step
\`\`\`

**4. Experiment Path**
\`\`\`
Variant A (50%): Email with video demo
Variant B (50%): Email with step-by-step guide
Winning Metric: Clicks on CTA
\`\`\`

**5. Personalization with Liquid**
\`\`\`liquid
{% if custom_attribute.\${lifecycle_stage} == 'trial' %}
  Hi {{\${first_name}}}, you have {{\${trial_days_remaining}}} days left in your trial.
{% elsif custom_attribute.\${lifecycle_stage} == 'active' %}
  Welcome back, {{\${first_name}}}!
{% endif %}

{% if custom_attribute.\${lifetime_value} > 1000 %}
  As a VIP customer, here's an exclusive offer...
{% endif %}

Recommended Product:
{% connected_content
  https://api.yourcompany.com/recommendations?user_id={{\${user_id}}}
  :save product
%}
{{product.name}} - {{product.price}}
\`\`\`

### Braze Best Practices
✅ Use Action-Based triggers for real-time relevance
✅ Implement global frequency capping
✅ Leverage Liquid for advanced personalization
✅ Use Experiment Paths to test journey variants
✅ Set up Canvas exit criteria to prevent over-messaging

---

## HubSpot Workflows

### Workflow Types
- **Standard:** Email sends, property updates, delays
- **Lead Nurturing:** Multi-step email sequences
- **Deal/Ticket:** Sales/service automation
- **Webhook:** Integration with external systems

### Sample Workflow

**1. Enrollment Triggers**
\`\`\`
Trigger: Contact property "Lifecycle Stage" changes to "Lead"
AND Contact has filled out form: "Demo Request"

Re-enrollment: Allow contacts to re-enroll if trigger criteria met again
\`\`\`

**2. Workflow Actions**
\`\`\`
Action 1: Set property
  - Lead Status = "New Lead"
  - Lead Score += 20
  - Last Activity Date = Today

Action 2: Delay for 1 business day

Action 3: IF/THEN Branch
  IF Lead Score >= 50
    THEN: Send internal email to sales team
    AND: Create task for rep
  ELSE:
    Send nurture email

Action 4: Wait until "Demo Scheduled" = True OR 7 days

Action 5: IF Demo NOT scheduled after 7 days
  - Send follow-up email with calendar link
\`\`\`

**3. Email Personalization Tokens**
\`\`\`
Hi {{ contact.firstname }},

I noticed you're interested in {{ contact.product_interest }}.

{% if contact.company_size == "Enterprise" %}
  Our enterprise plan includes dedicated support and custom integrations.
{% elif contact.company_size == "Mid-Market" %}
  Our business plan is perfect for teams of your size.
{% endif %}

Best time to chat?
{% module "meeting_scheduler" %}
\`\`\`

### HubSpot Best Practices
✅ Use lead scoring workflows to prioritize sales outreach
✅ Implement suppression lists to avoid over-messaging
✅ Leverage contact properties for granular segmentation
✅ Set up workflow error notifications
✅ Test workflows with test contacts before activation

---

## Platform Comparison

| Feature | Salesforce MC | Adobe Campaign | Braze | HubSpot |
|---------|---------------|----------------|-------|----------|
| **Best For** | Enterprise, complex journeys | Enterprise, batch campaigns | Mobile-first, real-time | SMB, inbound marketing |
| **Email** | ✅ Advanced | ✅ Advanced | ✅ Good | ✅ Good |
| **Mobile Push** | ✅ Yes | ✅ Yes | ✅ Excellent | ❌ Limited |
| **SMS** | ✅ MobileConnect | ✅ Yes | ✅ Yes | ✅ Yes (add-on) |
| **In-App** | ❌ No | ❌ No | ✅ Excellent | ❌ No |
| **AI/ML** | ✅ Einstein | ✅ AI-powered send time | ✅ Intelligent delivery | ✅ Predictive lead scoring |
| **Pricing** | $$$$ | $$$$ | $$$ | $$ |
| **Learning Curve** | High | High | Medium | Low |

## Cross-Platform Integration

### API-Based Activation
\`\`\`javascript
// Webhook from Segment CDP to Braze Canvas
{
  "event": "segment_entry_cart_abandonment",
  "user_id": "12345",
  "properties": {
    "cart_total": 145.99,
    "cart_items": ["SKU-123", "SKU-456"],
    "abandonment_time": "2025-01-17T14:30:00Z"
  }
}

// Trigger Braze Canvas "Cart Recovery Journey"
// Braze receives webhook → enters user into Canvas
\`\`\`

### Unified Tracking
Use UTM parameters and custom tracking domains:
\`\`\`
Email Link:
https://yoursite.com/cart?utm_source=braze
  &utm_medium=email
  &utm_campaign=cart_recovery_day1
  &customer_id={{\${user_id}}}
\`\`\`

Track across platforms with customer_id to unify attribution.`
            }
        ]
    }
];

// Make templates globally accessible
if (typeof window !== 'undefined') {
    window.agentTemplates = agentTemplates;
}
