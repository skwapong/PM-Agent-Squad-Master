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
            model: 'anthropic.claude-4.5-sonnet',
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
        ],
        outputs: [
            {
                outputName: 'customer_segmentation_report',
                functionName: 'generate_segmentation_report',
                functionDescription: 'Generate comprehensive customer segmentation analysis with RFM scores, behavioral patterns, and actionable marketing recommendations for each segment',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        segments: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    segment_name: { type: 'string' },
                                    segment_size: { type: 'number' },
                                    percentage_of_base: { type: 'number' },
                                    rfm_scores: { type: 'object' },
                                    key_characteristics: { type: 'array' },
                                    recommended_strategies: { type: 'array' },
                                    expected_ltv: { type: 'number' },
                                    activation_channels: { type: 'array' }
                                }
                            }
                        },
                        activation_plan: {
                            type: 'object',
                            properties: {
                                priority_segments: { type: 'array' },
                                quick_wins: { type: 'array' },
                                measurement_kpis: { type: 'array' }
                            }
                        }
                    },
                    required: ['segments', 'activation_plan']
                })
            },
            {
                outputName: ':plotly:',
                functionName: 'generate_segmentation_charts',
                functionDescription: 'Create interactive Plotly visualizations for segment distribution, RFM analysis, and customer value breakdown',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        data: { type: 'array' },
                        layout: { type: 'object' }
                    },
                    required: ['data', 'layout']
                })
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
            model: 'anthropic.claude-4.5-sonnet',
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
        ],
        outputs: [
            {
                outputName: 'journey_orchestration_plan',
                functionName: 'generate_journey_plan',
                functionDescription: 'Generate comprehensive customer journey orchestration plan with multi-touch touchpoints, trigger logic, personalization rules, and success metrics',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        journey_overview: {
                            type: 'object',
                            properties: {
                                journey_name: { type: 'string' },
                                objective: { type: 'string' },
                                target_audience: { type: 'object' },
                                expected_conversion_rate: { type: 'number' }
                            }
                        },
                        touchpoints: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    step_number: { type: 'number' },
                                    channel: { type: 'string' },
                                    trigger: { type: 'string' },
                                    timing: { type: 'string' },
                                    message_template: { type: 'string' },
                                    personalization_rules: { type: 'array' }
                                }
                            }
                        },
                        optimization_strategy: {
                            type: 'object',
                            properties: {
                                a_b_tests: { type: 'array' },
                                success_metrics: { type: 'array' },
                                optimization_opportunities: { type: 'array' }
                            }
                        }
                    },
                    required: ['journey_overview', 'touchpoints', 'optimization_strategy']
                })
            },
            {
                outputName: ':plotly:',
                functionName: 'generate_journey_flow_diagram',
                functionDescription: 'Create interactive Plotly visualization of customer journey flow with conversion rates and drop-off points',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        data: { type: 'array' },
                        layout: { type: 'object' }
                    },
                    required: ['data', 'layout']
                })
            }
        ]
    },

    // Marketing Templates - Detailed and Complete Versions
    {
        id: 'campaign-budget-optimizer',
        name: 'Campaign Budget Optimizer',
        icon: '💰',
        category: 'Marketing',
        targetAudience: ['Enterprise', 'Mid-Market'],
        description: 'Optimize marketing budget allocation across channels using performance data and predictive modeling',
        config: {
            projectName: 'Campaign Budget Optimization Platform',
            projectDescription: 'AI-powered budget optimization engine that analyzes campaign performance across channels and recommends optimal budget allocation to maximize ROI',
            agentName: 'Budget Optimization Agent',
            description: 'Expert marketing budget optimization agent that analyzes multi-channel campaign performance and provides data-driven budget allocation recommendations',
            tone: 'analytical',
            audience: 'Marketing managers, campaign planners, and marketing operations teams',
            domain: 'Digital Marketing & Budget Management',
            model: 'anthropic.claude-4.5-sonnet',
            temperature: 0.4,
            maxToolsIterations: 5,
            systemPrompt: `You are an expert Campaign Budget Optimization Agent specializing in multi-channel marketing budget allocation and performance optimization.

**Your Primary Role:**
Analyze campaign performance data across multiple channels (Meta, Google, TikTok, LinkedIn, etc.) and provide data-driven recommendations for optimal budget allocation to maximize ROI and achieve marketing objectives.

**Core Capabilities:**

1. **Budget Performance Analysis**
   - Calculate ROI, ROAS, CPA, and CPL by channel
   - Identify high-performing and underperforming channels
   - Analyze spend efficiency and conversion rates
   - Track budget pacing and delivery rates

2. **Optimization Recommendations**
   - Recommend budget reallocation based on performance
   - Identify opportunities to shift budget to high-ROI channels
   - Suggest budget increases for scaling campaigns
   - Flag channels with diminishing returns

3. **Predictive Budget Modeling**
   - Forecast performance impact of budget changes
   - Model "what-if" scenarios for budget allocation
   - Predict optimal budget mix for goal achievement
   - Estimate incremental ROI from budget increases

4. **Channel-Specific Insights**
   - Meta: Campaign objective optimization, audience scaling
   - Google: Keyword bidding, shopping feed optimization
   - TikTok: Creative testing budget allocation
   - LinkedIn: B2B lead generation efficiency

**Operational Guidelines:**

- Always base recommendations on actual performance data
- Consider both short-term efficiency and long-term brand building
- Account for attribution windows and customer journey complexity
- Balance risk and opportunity in budget reallocation
- Provide clear rationale for all budget recommendations

**Budget Allocation Framework:**

1. Assess current performance by channel and campaign
2. Identify budget reallocation opportunities
3. Calculate projected impact of changes
4. Recommend specific dollar amounts and percentages
5. Provide implementation timeline and monitoring plan

**Output Format:**

Provide structured budget recommendations with:
- Current budget allocation and performance
- Recommended budget changes with rationale
- Projected performance impact (ROI, conversions, revenue)
- Implementation steps and priority
- Monitoring KPIs and success criteria

**Constraints:**

- Never recommend budget cuts without clear performance justification
- Always consider minimum viable budgets for testing
- Account for seasonality and market trends
- Respect client budget limits and cash flow constraints
- Flag when insufficient data exists for confident recommendations

Use data-driven insights, clear financial analysis, and actionable recommendations to help marketers optimize their budget allocation for maximum impact.`
        },
        knowledgeBases: [
            {
                name: 'Budget Optimization Frameworks',
                content: `# Budget Optimization Frameworks

## ROI-Based Allocation Model

### Calculation Methods
**Return on Ad Spend (ROAS)**
- Formula: Revenue / Ad Spend
- Benchmark: 3:1 minimum for profitability
- Industry averages: E-commerce 4:1, B2B SaaS 5:1, Retail 3.5:1

**Cost Per Acquisition (CPA)**
- Formula: Ad Spend / Conversions
- Compare against Customer Lifetime Value (LTV)
- Target: CPA < 30% of LTV for sustainable growth

**Marketing Efficiency Ratio (MER)**
- Formula: Total Revenue / Total Marketing Spend
- Blended metric across all channels
- Helps identify overall marketing health

## Budget Allocation Strategies

**80/20 Rule Application**
- 80% to proven channels (Meta, Google)
- 20% to experimental channels (TikTok, Reddit, Influencer)
- Rebalance quarterly based on performance

**Incremental Budget Testing**
- Increase top-performing channel budgets by 10-20%
- Monitor for diminishing returns
- Scale gradually to maintain efficiency

**Channel Diversification**
- Avoid over-dependence on single platform
- Maintain 3-5 active channels minimum
- Balance brand and performance marketing

## Performance-Based Reallocation

**Reallocation Triggers**
1. Channel ROAS drops 20% below benchmark
2. CPA exceeds target by 15% for 2 weeks
3. Conversion rate declines 25% month-over-month
4. New channel shows 30% better efficiency

**Reallocation Process**
- Reduce underperforming channel by 15-30%
- Shift budget to top 2 performers
- Maintain 10% test budget for new opportunities
- Monitor weekly, adjust monthly

## Budget Pacing

**Even Pacing Strategy**
- Daily budget = Monthly budget / Days in month
- Prevents early month overspend
- Ensures full month visibility

**Accelerated Pacing**
- Front-load budget for product launches
- Capitalize on seasonal demand peaks
- Monitor closely to avoid premature depletion

**Weighted Pacing**
- Allocate more budget to high-converting days
- E-commerce: Increase Thursday-Sunday
- B2B: Increase Tuesday-Thursday`
            },
            {
                name: 'Channel Performance Benchmarks',
                content: `# Channel Performance Benchmarks

## Meta (Facebook & Instagram)

**Industry Benchmarks**
- E-commerce: ROAS 4-6x, CPA $15-40
- B2B: CPL $30-100, CTR 0.9-1.5%
- Retail: ROAS 3-5x, CPA $20-50

**Optimization Levers**
- Audience size: 500k-2M for best performance
- Creative refresh: Every 7-14 days
- Budget minimum: $50/day per ad set
- Scaling: Increase 20% every 3-4 days

**Budget Allocation by Objective**
- Conversion campaigns: 60-70% of budget
- Retargeting: 15-25% of budget
- Prospecting/TOF: 10-20% of budget

## Google Ads

**Search Campaigns**
- Avg CPC: $1-$3 (varies by industry)
- Conversion rate: 3-5% average
- Quality Score target: 7+ for efficiency
- ROAS benchmark: 4-8x

**Shopping Campaigns**
- ROAS target: 5-10x
- Impression share: Aim for 70%+
- Product feed optimization critical
- Budget: 30-40% of total Google budget

**Display & YouTube**
- ROAS: 2-4x (upper funnel)
- Viewthrough conversion attribution
- Budget: 10-20% for awareness

## TikTok Ads

**Performance Metrics**
- CPM: $3-$10
- CPC: $0.50-$2
- CTR: 1.5-3% (higher than Meta)
- Conversion rate: 1-2%

**Budget Requirements**
- Minimum: $20/day per ad group
- Creative testing: $50-100/day
- Scaling threshold: $200+/day

## LinkedIn Ads (B2B Focus)

**Lead Generation**
- CPL: $50-$150 (enterprise)
- CTR: 0.3-0.6%
- Conversion rate: 2-5%
- Minimum budget: $100/day

**Content Promotion**
- CPM: $30-$80 (premium audience)
- Engagement rate: 2-6%
- Budget for reach: $1,000+ monthly

## Budget Distribution Templates

**E-Commerce Balanced Mix**
- Meta: 40%
- Google Shopping: 30%
- Google Search: 20%
- TikTok/Other: 10%

**B2B SaaS**
- Google Search: 45%
- LinkedIn: 30%
- Retargeting: 15%
- Content/Display: 10%

**DTC Brand**
- Meta: 50%
- TikTok: 20%
- Google: 20%
- Influencer/Affiliate: 10%`
            },
            {
                name: 'Budget Optimization Tactics',
                content: `# Budget Optimization Tactics

## Scaling Strategies

**Vertical Scaling (Increase Budget)**
1. Identify campaigns with ROAS > Target
2. Increase budget by 15-20% every 3 days
3. Monitor CPA - pause if increases >25%
4. Test up to 2-3x original budget
5. Watch for plateau or diminishing returns

**Horizontal Scaling (Expand Reach)**
1. Duplicate winning ad sets with new audiences
2. Expand to similar geographic markets
3. Test new creative variations
4. Add complementary products/services
5. Launch on additional platforms

## Cost Reduction Techniques

**Improve Quality Score (Google)**
- Optimize landing page experience
- Increase ad relevance to keywords
- Improve expected CTR with better copy
- Can reduce CPC by 20-50%

**Reduce Frequency (Meta)**
- Refresh creative when frequency >3
- Expand audience to reduce saturation
- Implement frequency caps (3-5 per week)
- Prevents ad fatigue and wasted spend

**Bid Optimization**
- Start with target CPA bidding
- Migrate to maximize conversions once stable
- Use bid caps to control costs
- Test manual bidding for granular control

## Budget Reallocation Framework

**Weekly Analysis**
1. Calculate 7-day ROAS by channel
2. Identify channels ±20% from target
3. Flag campaigns for adjustment
4. Prepare reallocation recommendation

**Monthly Optimization**
1. Review month-over-month performance
2. Reallocate 10-30% from worst to best
3. Maintain 10% innovation budget
4. Update channel mix targets

**Quarterly Planning**
1. Analyze seasonal trends
2. Plan budget increases for peak periods
3. Test new channels with 5-10% budget
4. Revise annual budget forecast

## Attribution Considerations

**Multi-Touch Attribution**
- First-touch: Awareness channel credit
- Last-touch: Conversion channel credit
- Linear: Equal credit across touchpoints
- Time-decay: More credit to recent touches

**Cross-Device Tracking**
- Account for mobile research, desktop purchase
- Use customer ID tracking when possible
- Understand Meta/Google attribution differences
- Factor 20-30% view-through conversions

**Budget Implications**
- Upper-funnel channels drive lower-funnel conversions
- Don't cut awareness budget based solely on last-click
- Maintain balanced funnel investment
- Test holdout groups to measure incrementality

## Emergency Budget Adjustments

**Underperformance Response**
1. Pause if ROAS drops >40% for 3 days
2. Investigate: audience, creative, landing page, offer
3. Fix root cause before resuming
4. Reallocate budget to stable campaigns

**Rapid Scaling Opportunities**
1. Viral content or PR moment
2. Competitor exit or weakness
3. Product launch success
4. Seasonal demand spike

**Actions:**
- Shift budget within 24 hours
- Increase 50-100% for short periods
- Monitor hourly during rapid changes
- Return to baseline after event`
            },
            {
                name: 'ROI Calculation & Reporting',
                content: `# ROI Calculation & Reporting

## Core Metrics Definitions

**Revenue Metrics**
- Gross Revenue: Total sales from marketing
- Net Revenue: Revenue - Refunds - Discounts
- Attributed Revenue: Revenue tied to specific campaigns
- Lifetime Value (LTV): Total customer revenue over lifetime

**Cost Metrics**
- Ad Spend: Direct platform costs
- Fully-Loaded Costs: Ad spend + agency fees + tools + creative
- Cost Per Click (CPC): Spend / Clicks
- Cost Per Acquisition (CPA): Spend / Conversions

**Efficiency Metrics**
- Return on Ad Spend (ROAS): Revenue / Ad Spend
- Return on Investment (ROI): (Revenue - Cost) / Cost × 100
- Marketing Efficiency Ratio (MER): Total Revenue / Total Marketing Spend
- Customer Acquisition Cost (CAC): Total Marketing Cost / New Customers

## ROI Calculation Examples

**Basic ROAS**
- Ad Spend: $10,000
- Revenue: $45,000
- ROAS = $45,000 / $10,000 = 4.5x

**ROI Percentage**
- Ad Spend: $10,000
- Revenue: $45,000
- Profit Margin: 40%
- Profit = $45,000 × 0.40 = $18,000
- ROI = ($18,000 - $10,000) / $10,000 × 100 = 80%

**Fully-Loaded ROI**
- Ad Spend: $10,000
- Agency Fee (15%): $1,500
- Creative Costs: $500
- Total Cost: $12,000
- Revenue: $45,000 (40% margin = $18,000 profit)
- ROI = ($18,000 - $12,000) / $12,000 × 100 = 50%

## Budget Performance Dashboards

**Daily Monitoring Metrics**
- Spend vs. Budget (Pacing %)
- Impressions, Clicks, CTR
- Conversions, CPA
- Revenue, ROAS

**Weekly Review Metrics**
- 7-day ROAS by channel
- Week-over-week change
- Top/Bottom performing campaigns
- Budget utilization rate

**Monthly Reporting Template**
1. Executive Summary
   - Total spend: $X
   - Total revenue: $Y
   - Blended ROAS: Z.Zx
   - MoM change: +/- %

2. Channel Performance
   - Budget allocation vs. revenue contribution
   - ROAS by channel with YoY comparison
   - Cost efficiency trends

3. Recommendations
   - Budget reallocation suggestions
   - Scaling opportunities
   - Optimization priorities

## Profit-Based Budget Planning

**Break-Even Analysis**
- Calculate maximum CPA: LTV × Margin %
- Example: LTV $200, Margin 50% = Max CPA $100
- Set target CPA at 70-80% of maximum
- Ensures profitable customer acquisition

**Budget Sizing Formula**
- Monthly Revenue Goal: $500,000
- Target ROAS: 5x
- Required Ad Spend: $500,000 / 5 = $100,000
- Add 20% buffer for testing: $120,000 budget

**Growth Investment Model**
- Profitable Baseline: 60% of budget (proven channels)
- Scaling Budget: 30% (expand winning campaigns)
- Innovation Budget: 10% (test new channels/strategies)

## Advanced Attribution Reporting

**Data-Driven Attribution (DDA)**
- Use machine learning to assign credit
- Available in Google Ads, Google Analytics 4
- More accurate than rule-based models
- Requires sufficient conversion volume (30+ per month)

**Incrementality Testing**
- Hold out 10% of audience from marketing
- Measure conversion lift in exposed group
- Calculate true incremental ROAS
- Adjust budgets based on incrementality, not just correlation

**Marketing Mix Modeling (MMM)**
- Statistical analysis of all marketing inputs
- Accounts for non-digital: TV, radio, print, PR
- Requires 2+ years of data for accuracy
- Reveals optimal channel mix and budget allocation`
            }
        ],
        outputs: [
            {
                    outputName: 'budget_allocation_plan',
                    functionName: 'generate_budget_allocation',
                    functionDescription: 'Generate comprehensive budget allocation plan with performance analysis and optimization recommendations across all marketing channels',
                    outputType: 'custom',
                    jsonSchema: JSON.stringify({
                        type: 'object',
                        properties: {
                            current_performance: {
                                type: 'object',
                                properties: {
                                    total_spend: { type: 'number' },
                                    total_revenue: { type: 'number' },
                                    blended_roas: { type: 'number' },
                                    channel_breakdown: { type: 'array' }
                                }
                            },
                            recommendations: {
                                type: 'object',
                                properties: {
                                    budget_changes: { type: 'array' },
                                    rationale: { type: 'string' },
                                    projected_impact: { type: 'object' }
                                }
                            },
                            implementation_plan: {
                                type: 'object',
                                properties: {
                                    timeline: { type: 'string' },
                                    priority_actions: { type: 'array' },
                                    monitoring_kpis: { type: 'array' }
                                }
                            }
                        },
                        required: ['current_performance', 'recommendations', 'implementation_plan']
                    })
            },
            {
                    outputName: ':plotly:',
                    functionName: 'generate_budget_charts',
                    functionDescription: 'Create interactive Plotly visualizations for budget allocation, performance trends, and ROI analysis',
                    outputType: 'custom',
                    jsonSchema: JSON.stringify({
                        type: 'object',
                        properties: {
                            data: { type: 'array' },
                            layout: { type: 'object' }
                        },
                        required: ['data', 'layout']
                    })
            }
        ]
    },

    // Template 2: Audience Insights Analyzer
    {
        id: 'audience-insights-analyzer',
        name: 'Audience Insights Analyzer',
        icon: '👥',
        category: 'Marketing',
        targetAudience: ['Enterprise', 'Mid-Market'],
        description: 'Analyze audience behavior, demographics, and engagement patterns to optimize targeting and personalization',
        config: {
            projectName: 'Audience Intelligence Platform',
            projectDescription: 'AI-powered audience analysis engine that uncovers deep insights about customer segments, behaviors, and preferences to drive personalized marketing strategies',
            agentName: 'Audience Intelligence Agent',
            description: 'Expert audience analysis agent that processes customer data to identify behavioral patterns, segment characteristics, and optimization opportunities',
            tone: 'analytical',
            audience: 'Marketing strategists, data analysts, and audience managers',
            domain: 'Marketing Analytics & Audience Intelligence',
            model: 'anthropic.claude-4.5-sonnet',
            temperature: 0.3,
            maxToolsIterations: 5,
            systemPrompt: `You are an expert Audience Insights Analyzer specializing in customer behavior analysis, segmentation, and targeting optimization.

**Your Primary Role:**
Analyze audience data from multiple sources (CDP, analytics platforms, ad platforms) to uncover actionable insights about customer segments, behavior patterns, and engagement trends that drive marketing performance.

**Core Capabilities:**

1. **Demographic Analysis**
   - Age, gender, location distribution
   - Income, education, occupation profiles
   - Household composition and family status
   - Device and platform preferences

2. **Behavioral Pattern Recognition**
   - Purchase frequency and recency
   - Product/category affinity
   - Content engagement patterns
   - Channel preference and usage
   - Time-of-day and day-of-week behaviors

3. **Psychographic Profiling**
   - Lifestyle and interest clusters
   - Value and attitude segments
   - Brand affinity and loyalty indicators
   - Influence and advocacy potential

4. **Engagement Metrics**
   - Email open rates and click patterns
   - Social media interaction rates
   - Website session depth and duration
   - Ad engagement and conversion rates

**Analysis Framework:**

When analyzing audiences:
1. Identify data sources and coverage
2. Assess data quality and completeness
3. Segment audiences using multiple dimensions
4. Identify high-value characteristics
5. Compare segment performance
6. Recommend targeting strategies

**Output Requirements:**

For each audience segment provide:
- Segment definition and size
- Key demographic characteristics
- Behavioral patterns and preferences
- Engagement metrics and performance
- Channel affinity and optimal reach strategies
- Personalization recommendations
- Expected ROI and conversion rates

**Operational Guidelines:**

- Base insights on statistical significance (minimum segment size 1% or 1000 users)
- Identify correlation vs causation in behavior patterns
- Account for seasonality and temporal trends
- Consider cross-device and cross-channel behavior
- Respect privacy regulations and consent status

**Privacy & Compliance:**

- Work with anonymized, aggregated data only
- Never request personally identifiable information
- Respect GDPR, CCPA, and other privacy regulations
- Account for consent management and opt-out preferences
- Follow data retention and deletion policies

**Strategic Recommendations:**

- Prioritize segments by value and reachability
- Suggest lookalike audience expansion strategies
- Identify underserved or emerging segments
- Recommend content and messaging by segment
- Propose A/B testing opportunities

Provide data-driven audience insights with clear business implications and actionable marketing strategies.`
        },
        knowledgeBases: [
            {
                name: 'Audience Segmentation Methods',
                content: `# Audience Segmentation Methods

## Demographic Segmentation

**Age-Based Segments**
- Gen Z (1997-2012): Mobile-first, video content, authenticity
- Millennials (1981-1996): Digital natives, value experiences, social conscious
- Gen X (1965-1980): Work-life balance, brand loyal, multi-channel
- Baby Boomers (1946-1964): Traditional media, brand reputation, value quality

**Geographic Segmentation**
- Country/Region: Cultural preferences, language, payment methods
- Urban vs Rural: Lifestyle differences, delivery logistics, media consumption
- Climate: Seasonal products, weather-triggered campaigns
- Time Zone: Send-time optimization, live event targeting

**Income-Based Segmentation**
- Premium ($100k+): Luxury positioning, exclusive access, concierge service
- Mid-Market ($50-100k): Value + quality balance, aspirational messaging
- Budget (<$50k): Price sensitivity, promotions, financing options

## Behavioral Segmentation

**Purchase Behavior**
- New Customers: Welcome series, education, first-purchase incentives
- Repeat Customers: Loyalty rewards, cross-sell, VIP treatment
- Lapsed Customers: Win-back campaigns, special offers, re-engagement
- High-Value Customers: Retention focus, premium service, early access

**Engagement Level**
- Highly Engaged: Brand advocates, user-generated content, referral programs
- Moderately Engaged: Nurture campaigns, value demonstration
- Low Engagement: Re-activation, preference center, different channels
- Inactive: Sunset campaigns, suppression to save costs

**Product Usage**
- Power Users: Advanced features, beta testing, community building
- Casual Users: Tip campaigns, feature discovery, usage incentives
- Trial Users: Conversion optimization, proof points, limited-time offers

## Psychographic Segmentation

**Lifestyle Segments**
- Health & Wellness: Organic, sustainable, self-care messaging
- Tech Enthusiasts: Innovation, specs, early adopter positioning
- Budget Conscious: Price comparison, deals, ROI messaging
- Luxury Seekers: Exclusivity, craftsmanship, premium experience

**Value-Based Segments**
- Environmentally Conscious: Sustainability, eco-friendly, carbon footprint
- Socially Responsible: Fair trade, ethical sourcing, charitable giving
- Convenience-Driven: Time-saving, ease-of-use, instant gratification
- Quality-Focused: Craftsmanship, durability, heritage

## Intent-Based Segmentation

**Purchase Intent Signals**
- High Intent: Product page views, cart adds, price comparisons
- Research Phase: Category browsing, guide downloads, comparison reads
- Awareness Stage: Blog readers, social followers, ad clickers
- No Intent: Broad site visitors, bounce, minimal engagement

**Lifecycle Stage**
- Awareness: Educational content, brand story, problem identification
- Consideration: Product comparisons, case studies, reviews/testimonials
- Decision: Demos, trials, promotions, urgency messaging
- Retention: Support, upsells, loyalty programs, community

## RFM Segmentation

**Recency Quintiles**
- 0-30 days: Hot prospects, high engagement opportunity
- 31-60 days: Active customers, standard nurture
- 61-90 days: Cooling, re-engagement campaigns
- 91-180 days: At-risk, win-back needed
- 181+ days: Dormant, suppression candidate

**Frequency Scoring**
- 1 purchase: One-time buyer, retention critical
- 2-3 purchases: Repeat customer, loyalty building
- 4-6 purchases: Loyal customer, VIP consideration
- 7+ purchases: Champion, brand advocate

**Monetary Value**
- <$50: Low-value, volume strategy
- $50-$200: Mid-value, balanced approach
- $200-$500: High-value, white-glove service
- $500+: VIP, dedicated account management`
            },
            {
                name: 'Audience Data Sources & Collection',
                content: `# Audience Data Sources & Collection

## First-Party Data Sources

**Website Analytics**
- Google Analytics 4: Behavior flow, event tracking, conversions
- Adobe Analytics: Pathing analysis, segment builder, real-time
- Heap/Mixpanel: Automatic event capture, funnel analysis
- Data collected: Page views, sessions, bounce rate, time on site

**Customer Data Platform (CDP)**
- Segment, mParticle, Treasure Data
- Unified customer profiles across touchpoints
- Real-time data integration from all sources
- Identity resolution and customer lifetime view

**Email Marketing Platform**
- Mailchimp, HubSpot, Salesforce Marketing Cloud
- Open rates, click rates, engagement over time
- Subscription preferences and topic interests
- Device and client data (mobile vs desktop, Gmail vs Outlook)

**CRM Data**
- Salesforce, HubSpot, Microsoft Dynamics
- Purchase history, deal value, sales cycle length
- Customer service interactions and satisfaction
- Account information and firmographics (B2B)

**E-Commerce Platform**
- Shopify, Magento, WooCommerce
- Transaction data, cart abandonment, product views
- Average order value, purchase frequency
- Product affinity and cross-sell opportunities

## Second-Party Data Sources

**Partner Data Exchanges**
- Data shared directly between companies
- Often industry-specific (retail, travel, finance)
- Requires data sharing agreements and consent
- Example: Airline + hotel loyalty data exchange

**Publisher Data**
- Media companies with logged-in users
- Content consumption patterns and interests
- Demographic data from registration
- Example: Wall Street Journal subscriber interests

## Third-Party Data Providers

**Demographics & Firmographics**
- Acxiom, Experian, TransUnion
- Age, income, education, household composition
- B2B: Company size, industry, revenue, tech stack
- Appended to first-party records for enrichment

**Interest & Intent Data**
- Bombora (B2B intent), Oracle Data Cloud
- Website visit patterns across publisher network
- Content topic consumption (surging interest signals)
- In-market indicators for specific product categories

**Behavioral Data**
- LiveRamp, Epsilon, Neustar
- Online and offline purchase behavior
- Channel preferences and media consumption
- Lifestyle and psychographic attributes

## Platform-Specific Audience Data

**Meta (Facebook & Instagram)**
- Meta Pixel: Website events, conversions, custom audiences
- Engagement data: Post interactions, video views, ad clicks
- Page followers: Demographics, interests, location
- Lookalike audiences: ML-powered similar user finding

**Google Ads**
- Google Analytics: Site behavior, conversion paths
- YouTube: Video engagement, channel subscribers
- Google Tag Manager: Custom event tracking
- Customer Match: Upload email/phone for targeting

**LinkedIn (B2B)**
- Company data: Industry, size, growth rate
- Job function, seniority, skills
- LinkedIn Insight Tag: Website visitor demographics
- Matched Audiences: Account-based targeting

## Data Collection Best Practices

**Consent Management**
- Cookie consent banners (GDPR, CCPA)
- Explicit opt-in for email marketing
- Preference centers for communication control
- Granular consent for different data uses

**Data Quality**
- Deduplication: Merge duplicate customer records
- Validation: Email verification, address standardization
- Enrichment: Append missing demographic data
- Freshness: Regular data updates and purges

**Privacy Compliance**
- GDPR (EU): Right to access, delete, portability
- CCPA (California): Opt-out of data sales
- COPPA: No data collection from children under 13
- CAN-SPAM: Email unsubscribe requirements

**Attribution Setup**
- UTM parameters: Source, medium, campaign, content, term
- Server-side tracking: First-party cookies, bypass blockers
- Cross-device tracking: Customer ID matching
- Multi-touch attribution: Assign credit across touchpoints

## Data Integration Architecture

**Customer ID Graph**
- Email address (primary identifier)
- Phone number (SMS, WhatsApp)
- Device IDs (mobile app)
- Cookie IDs (web tracking)
- CRM ID (sales data)

**Data Warehouse**
- Snowflake, BigQuery, Redshift
- Centralized storage for all customer data
- SQL-based analysis and segmentation
- Feeds into CDP and BI tools

**Real-Time Data Streaming**
- Kafka, Kinesis for event streaming
- Immediate data availability for triggers
- Powers real-time personalization
- Enables moment-based marketing

**Data Governance**
- Data dictionary: Field definitions, sources
- Access controls: Role-based permissions
- Audit logs: Track data access and usage
- Retention policies: Automatic deletion schedules`
            },
            {
                name: 'Audience Analysis Techniques',
                content: `# Audience Analysis Techniques

## Cohort Analysis

**Definition**
Group users by shared characteristics or experiences, then track behavior over time.

**Common Cohorts**
- Acquisition cohort: Users acquired in same month
- First-purchase cohort: Grouped by first product bought
- Channel cohort: Users from same acquisition channel
- Campaign cohort: Responders to specific campaign

**Analysis Questions**
- Do newer cohorts perform better than older ones?
- Which acquisition channels produce highest LTV customers?
- How does retention differ by cohort?
- When do cohorts typically churn?

**Tools**
- Google Analytics 4: Built-in cohort reports
- Mixpanel: Behavioral cohort analysis
- SQL: Custom cohort queries in data warehouse

## Funnel Analysis

**Purchase Funnel**
1. Awareness: Ad impression, social post view
2. Interest: Website visit, content consumption
3. Consideration: Product page view, comparison
4. Intent: Add to cart, start checkout
5. Purchase: Complete transaction

**Conversion Rate Benchmarks**
- Visitor to Lead: 2-5%
- Lead to MQL: 10-15%
- MQL to SQL: 20-30%
- SQL to Customer: 20-40%
- Overall visitor to customer: 1-3%

**Drop-Off Analysis**
- Identify where users abandon the funnel
- Compare drop-off rates across segments
- A/B test improvements at bottleneck stages
- Implement retargeting for drop-offs

## Affinity Analysis (Market Basket)

**Product Affinity**
- Which products are frequently bought together?
- "Customers who bought X also bought Y"
- Cross-sell and bundle recommendations
- Example: Camera + Memory Card + Case

**Content Affinity**
- Which blog topics are consumed together?
- Related content recommendations
- Topic cluster identification
- Guides users deeper into content

**Channel Affinity**
- Which channels do users engage across?
- Optimal channel mix for each segment
- Sequential channel strategies
- Example: Instagram + Email for Gen Z

**Metrics**
- Support: % of transactions containing itemset
- Confidence: Likelihood of Y given X
- Lift: How much more likely Y is with X vs alone

## Clustering Analysis

**K-Means Clustering**
- Group customers into K distinct segments
- Based on multiple behavioral variables
- Unsupervised machine learning technique
- Reveals natural customer groupings

**Variables for Clustering**
- RFM scores (Recency, Frequency, Monetary)
- Product category purchases
- Channel engagement rates
- Demographic attributes
- Psychographic scores

**Optimal Cluster Count**
- Elbow method: Plot variance explained vs K
- Silhouette score: Cluster cohesion measure
- Business judgment: Actionable segment count (3-7)

**Cluster Profiling**
- Describe each cluster's characteristics
- Name segments (e.g., "Budget Shoppers", "Luxury Seekers")
- Size and revenue contribution
- Recommended strategies per cluster

## Lookalike Modeling

**Process**
1. Define seed audience (best customers, converters)
2. Extract key characteristics
3. Find similar users in broader population
4. Rank by similarity score
5. Target top percentiles (1%, 5%, 10%)

**Facebook Lookalike Audiences**
- Upload customer email list or use pixel data
- Facebook finds similar users based on:
  - Demographics (age, gender, location)
  - Interests (pages liked, content engaged)
  - Behaviors (purchase activity, device usage)
- Choose similarity: 1% (most similar) to 10% (broader)

**Google Similar Audiences**
- Based on Customer Match lists or remarketing tags
- Google's ML finds users with similar patterns
- Available in Display, YouTube, Gmail campaigns

**Custom Lookalike Models**
- Build in-house using logistic regression
- Features: Demographics, behaviors, interests
- Training data: Converters vs non-converters
- Score all users on conversion propensity

## Predictive Scoring

**Churn Prediction**
- Identify customers likely to stop engaging/buying
- Input features: Days since last purchase, email opens declining, support tickets
- Output: Churn probability score (0-1)
- Action: Proactive retention campaigns for high-risk

**Lead Scoring**
- Predict which leads will convert to customers
- Behavioral signals: Website visits, content downloads, email clicks
- Demographic fit: Company size, industry, role (B2B)
- Output: Score 0-100, threshold for sales-ready
- Action: Prioritize sales outreach

**Lifetime Value (LTV) Prediction**
- Estimate total revenue from customer over lifetime
- Inputs: First purchase value, purchase frequency, retention rate
- Formula: AOV × Purchase Frequency × Customer Lifespan
- Segment by predicted LTV for differentiated treatment

**Next-Best-Action**
- Recommend optimal next touchpoint for each customer
- Considers: Past behavior, segment, journey stage, business goals
- Example: Product recommendation, content offer, discount
- Omnichannel: Email, ad, SMS, push notification

## Sentiment & Social Listening

**Brand Sentiment Analysis**
- Monitor social media mentions (Twitter, Reddit, Reviews)
- Classify as positive, neutral, negative
- Track sentiment trends over time
- Identify crisis situations early

**Topic Modeling**
- What are customers talking about?
- Identify emerging trends and interests
- Product feedback and feature requests
- Competitive intelligence

**Influencer Identification**
- Find users with large followings in your niche
- Track engagement rates, not just follower count
- Micro-influencers (10k-100k) often higher ROI
- Partnership and sponsorship opportunities

**Tools**
- Brandwatch, Sprout Social, Hootsuite
- Native platform analytics (Twitter Analytics, FB Insights)
- Google Alerts for brand mentions
- Review aggregators (Trustpilot, G2, Yelp)`
            },
            {
                name: 'Targeting & Personalization Strategies',
                content: `# Targeting & Personalization Strategies

## Audience Targeting Methods

**Broad Targeting**
- Demographics: Age, gender, location
- Interests: Categories like "fitness", "travel"
- Use case: Brand awareness, new product launches
- Platform: Meta, Google Display, YouTube
- Budget: 40-50% of total for reach

**Narrow Targeting**
- Behaviors: In-market for specific products
- Lookalike: Similar to existing customers
- Use case: Prospecting for qualified leads
- Platform: Meta lookalike, Google similar audiences
- Budget: 30-40% for efficient acquisition

**Retargeting**
- Website visitors: Last 30, 60, 90 days
- Product viewers: Dynamic product ads
- Cart abandoners: 1-7 days, sequential discounts
- Past purchasers: Cross-sell, upsell, replenishment
- Budget: 15-20% for high-ROI conversions

**Custom Audiences**
- Email list: Upload for Customer Match (Google, Meta)
- Phone numbers: SMS and WhatsApp marketing
- CRM data: High-value accounts (B2B)
- App users: Mobile app engagement campaigns
- Use case: Retention, loyalty, VIP treatment

## Exclusion Strategies

**Suppress Converters**
- Exclude customers who already purchased
- Prevent wasted ad spend on converted users
- Exception: Subscription renewals, consumables

**Frequency Capping**
- Limit ad impressions per user per day/week
- Prevents ad fatigue and negative sentiment
- Recommended: 3-5 impressions per week

**Geographic Exclusions**
- Exclude areas you don't serve/ship to
- Block low-performing locations
- Optimize spend concentration in best regions

**Competitor Employees**
- Block IP ranges of competitor offices
- Prevents click fraud and intelligence gathering
- Use LinkedIn exclusions for job titles/companies

## Personalization Tactics

**Email Personalization**
- Subject line: First name, location, recent product viewed
- Content blocks: Recommended products based on browse history
- Send time: Optimized by past open behavior
- Dynamic content: Swap images/offers by segment

**Website Personalization**
- Hero banner: Different messaging by visitor segment
- Product recommendations: Behavioral or collaborative filtering
- Pop-ups: Exit intent offers tailored to cart value
- Chatbot: Proactive help based on page and past behavior

**Ad Personalization**
- Dynamic creative: Product feed for viewed items
- Audience messaging: Different copy for hot vs cold traffic
- Sequential ads: Tell brand story across exposures
- Platform-specific: Vertical video for Stories, landscape for Feed

**Mobile App Personalization**
- Push notifications: Triggered by behavior (cart abandonment, price drops)
- In-app messaging: Feature tips based on usage patterns
- Home screen: Curated content/products for each user
- Onboarding: Customized based on signup source and stated interests

## Channel-Specific Strategies

**Meta (Facebook & Instagram)**
- Advantage+ Shopping: AI-optimized targeting for e-commerce
- Broad targeting + Advantage Audience: Let AI find best users
- Lookalikes: 1% for highest quality, 5% for scale
- Retargeting: 7, 30, 60, 90-day windows with varied creative

**Google Ads**
- In-Market Audiences: Users researching product categories
- Affinity Audiences: Based on long-term interests
- Custom Intent: Users who searched specific keywords
- Customer Match + RLSA: Bid higher for past visitors/customers

**LinkedIn (B2B)**
- Job Title + Company Size + Industry combo
- Matched Audiences: Upload CRM list for ABM
- Lookalikes: Expand from best accounts
- Retargeting: Website visitors, video viewers, lead form openers

**TikTok**
- Interest targeting: Gaming, beauty, fitness, etc.
- Behavioral targeting: Video interaction, hashtag engagement
- Custom Audiences: App events, website pixels
- Lookalikes: Similar to best performers

## A/B Testing Framework

**What to Test**
- Audiences: Broad vs narrow vs lookalike
- Creative: Image vs video vs carousel
- Messaging: Benefit-driven vs feature-driven
- Offer: Discount % vs dollar amount vs free shipping
- Landing page: Long-form vs short-form

**Test Structure**
- Holdout control group: 10-20% of audience
- Test cell: Single variable change
- Duration: 7-14 days minimum for significance
- Sample size: Minimum 100 conversions per variant

**Statistical Significance**
- 95% confidence level standard
- Calculate using online calculators or chi-square test
- Don't call test early, wait for significance
- Consider practical significance (10%+ lift to justify change)

**Winner Implementation**
- Roll out to 100% of audience
- Monitor for sustained performance
- Archive learnings for future campaigns
- Iterate with new test on different variable

## Measurement & Optimization

**Key Metrics by Audience Type**
- Cold (New): CPM, CTR, CPC, view-through rate
- Warm (Engaged): Landing page conversion rate, form fill rate
- Hot (Retargeting): Purchase rate, ROAS, cart recovery rate

**Audience Performance Reports**
- Compare segments: Age, gender, location, interests
- Breakdown by: Device, placement, time of day
- Identify: Best performers, worst performers, outliers
- Action: Shift budget, create dedicated campaigns, exclude poor segments

**Audience Saturation Signals**
- Frequency >5: Refresh creative or expand audience
- Rising CPA: Auction fatigue, time to scale or pause
- Declining CTR: Ad fatigue, users have seen ad too many times
- Impressions plateau: Audience size limit reached

**Refresh Strategies**
- Expand audience: Increase lookalike % (1% → 3% → 5%)
- New creative: Different formats, messaging, offers
- Adjacent interests: Broaden targeting slightly
- New platforms: Test where audience hasn't seen you
- Seasonality: Pause and relaunch in future season`
            }
        ],
        outputs: [
            {
                outputName: 'audience_analysis_report',
                functionName: 'generate_audience_insights',
                functionDescription: 'Generate comprehensive audience analysis report with segment profiles, behavioral patterns, and targeting recommendations',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        segment_profiles: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    segment_name: { type: 'string' },
                                    size: { type: 'number' },
                                    demographics: { type: 'object' },
                                    behaviors: { type: 'object' },
                                    engagement_metrics: { type: 'object' }
                                }
                            }
                        },
                        targeting_recommendations: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    segment: { type: 'string' },
                                    channels: { type: 'array' },
                                    messaging: { type: 'string' },
                                    expected_roi: { type: 'number' }
                                }
                            }
                        },
                        key_insights: {
                            type: 'array',
                            items: { type: 'string' }
                        }
                    },
                    required: ['segment_profiles', 'targeting_recommendations']
                })
            },
            {
                outputName: ':plotly:',
                functionName: 'generate_audience_visualizations',
                functionDescription: 'Create interactive Plotly charts for audience demographics, behavior patterns, and segment comparisons',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        data: { type: 'array' },
                        layout: { type: 'object' }
                    },
                    required: ['data', 'layout']
                })
            }
        ]
    },

    // Template 3: Creative Performance Analyst
    {
        id: 'creative-performance-analyst',
        name: 'Creative Performance Analyst',
        icon: '🎨',
        category: 'Marketing',
        targetAudience: ['Enterprise', 'Mid-Market'],
        description: 'Analyze ad creative performance, identify winning elements, and optimize creative strategy across channels',
        config: {
            projectName: 'Creative Intelligence Platform',
            projectDescription: 'AI-powered creative analysis system that evaluates ad performance, identifies high-converting creative elements, and provides data-driven recommendations for creative optimization',
            agentName: 'Creative Intelligence Agent',
            description: 'Expert creative analysis agent that identifies winning creative patterns, optimizes ad performance, and guides creative strategy decisions',
            tone: 'analytical',
            audience: 'Creative teams, media buyers, and performance marketers',
            domain: 'Digital Advertising & Creative Optimization',
            model: 'anthropic.claude-4.5-sonnet',
            temperature: 0.4,
            maxToolsIterations: 4,
            systemPrompt: `You are an expert Creative Performance Analyst specializing in digital advertising creative optimization across Meta, Google, TikTok, and other platforms.

**Your Primary Role:**
Analyze creative performance data to identify winning elements, patterns, and opportunities for optimization. Provide actionable recommendations for improving ad creative performance and scaling winning concepts.

**Core Capabilities:**

1. **Creative Element Analysis**
   - Visual elements: Color schemes, imagery, video hooks
   - Copy elements: Headlines, CTAs, body text
   - Format performance: Image vs video vs carousel vs collection
   - Creative fatigue identification and refresh recommendations

2. **Performance Pattern Recognition**
   - Identify winning creative themes and concepts
   - Analyze engagement by creative element
   - Compare creative variations and test results
   - Recognize seasonal and trending patterns

3. **Platform-Specific Creative Best Practices**
   - Meta: Feed vs Stories vs Reels specifications
   - Google: Responsive display ads, YouTube formats
   - TikTok: Native content style, trending sounds
   - LinkedIn: Professional tone, B2B messaging

4. **Creative Testing Framework**
   - A/B test design and statistical analysis
   - Multivariate testing recommendations
   - Creative iteration strategies
   - Scaling winner identification

**Analysis Framework:**

1. Assess creative performance metrics (CTR, CPA, ROAS)
2. Identify top and bottom performing elements
3. Recognize patterns across winning creatives
4. Recommend optimization opportunities
5. Suggest new creative concepts based on insights

**Output Requirements:**

Provide structured creative analysis including:
- Performance metrics by creative element
- Winning patterns and themes
- Underperforming elements to avoid
- Specific optimization recommendations
- New creative concepts to test
- Refresh timeline and priorities

**Operational Guidelines:**

- Base recommendations on statistical significance
- Account for creative fatigue (frequency, time in market)
- Consider platform-specific best practices
- Balance proven winners with innovation
- Recommend sustainable creative production pipelines

Deliver actionable creative insights that drive performance improvement and efficient creative resource allocation.`
        },
        knowledgeBases: [
            {
                name: 'Creative Performance Metrics',
                content: `# Creative Performance Metrics

## Primary Metrics

**Click-Through Rate (CTR)**
- Formula: (Clicks / Impressions) × 100
- Meta benchmark: 0.9-1.5%
- Google Display: 0.5-1.0%
- TikTok: 1.5-3.0%
- Indicates initial engagement and relevance

**Cost Per Click (CPC)**
- Formula: Total Spend / Total Clicks
- Lower CPC = More efficient creative
- Compare across creative variations
- Platform and industry specific

**Conversion Rate**
- Formula: (Conversions / Clicks) × 100
- Landing page + creative alignment critical
- E-commerce: 2-5%, B2B: 5-10%
- Measures creative promise delivery

**Return on Ad Spend (ROAS)**
- Formula: Revenue / Ad Spend
- Ultimate creative performance measure
- Target: 3-5x minimum for profitability
- Compare creative variations at scale

**Cost Per Acquisition (CPA)**
- Formula: Total Spend / Conversions
- Must be lower than Customer LTV
- Creative directly impacts CPA
- Track by creative element

## Engagement Metrics

**Video Metrics**
- Hook rate: % watching first 3 seconds
- View-through rate: % watching to completion
- Average watch time: Engagement quality
- Thumb-stop rate: Scroll-stopping power

**3-Second View Rate**
- Critical for Meta video ads
- Benchmark: 40-60%
- First 3 seconds determine success
- Optimize hook for improvement

**Click-to-Site Rate**
- Clicks that reach landing page
- Indicates creative to LP alignment
- Low rate = Creative misleading
- High rate = Clear value proposition

**Engagement Rate**
- Likes, comments, shares / Impressions
- Higher engagement = Better reach
- Meta rewards engaging content
- Proxy for creative quality

## Creative Fatigue Indicators

**Frequency**
- Average impressions per user
- >5 typically indicates saturation
- CTR declines as frequency rises
- Trigger for creative refresh

**CTR Decline**
- Week-over-week CTR drop
- >20% decline = Refresh needed
- Natural decay over time
- Fresh creative restores performance

**CPA Increase**
- Rising CPA despite same targeting
- Creative fatigue primary cause
- Refresh or pause creative
- Test new angles/formats

**Reach Plateau**
- Impressions no longer growing
- Audience saturated with creative
- Expand audience or refresh creative
- Indicates creative exhaustion

## Creative Element Performance

**Headline Analysis**
- Test benefit vs feature headlines
- Question vs statement format
- With vs without numbers/stats
- Personalized vs generic

**CTA Performance**
- "Shop Now" vs "Learn More" vs "Get Started"
- Button color and placement impact
- Urgency vs non-urgency CTAs
- First-person vs second-person

**Image/Thumbnail Testing**
- Product-focused vs lifestyle imagery
- People vs no people
- Close-up vs wide shot
- Color psychology (red=urgency, blue=trust)

**Video Hook Testing**
- First 3 seconds critical
- Pattern interrupt techniques
- Question hooks vs statement hooks
- Visual hooks vs text hooks`
            },
            {
                name: 'Creative Testing Frameworks',
                content: `# Creative Testing Frameworks

## A/B Testing Best Practices

**Controlled Variables**
- Test ONE element at a time
- Keep audience, budget, placement constant
- Run for minimum 7 days
- Need 100+ conversions for significance

**Test Elements Priority**
1. Creative format (image vs video)
2. Hook/opening (first 3 seconds)
3. Headline/messaging
4. CTA button text/color
5. Visual style/aesthetic

**Statistical Significance**
- 95% confidence level standard
- Use chi-square test for conversion
- Don't call winner prematurely
- Account for day-of-week variations

**Winner Declaration**
- Minimum 100 conversions per variant
- 10%+ performance lift meaningful
- Consistent performance across days
- Consider practical vs statistical significance

## Multivariate Testing

**When to Use MVT**
- Large budgets ($1k+/day)
- Multiple elements to test simultaneously
- Need to understand element interactions
- Example: Headline × Image × CTA combinations

**Design Matrix**
- 2 headlines × 2 images × 2 CTAs = 8 variants
- Requires 8x budget and traffic
- More complex analysis required
- Reveals element interactions

**Analysis Approach**
- Main effects: Individual element impact
- Interaction effects: Combined element performance
- Identify best combination
- May find surprising interactions

## Creative Iteration Strategy

**Iterative Testing Process**
1. Launch 3-5 creative concepts
2. Identify top performer (7 days)
3. Create 3 variations of winner
4. Test variations against control
5. Repeat with new winner

**Variation Types**
- Minor tweaks: Color, CTA text
- Moderate changes: Different hook, headline
- Major pivots: New concept, format

**Refresh Cadence**
- New creatives: Weekly for high spend
- Rotate winners: Every 2-3 weeks
- Archive fatigued: When CTR drops 30%
- Seasonal updates: Quarterly minimums

## Platform-Specific Testing

**Meta Creative Testing**
- Dynamic Creative: Auto-test combinations
- A/B Test tool: Clean split testing
- 3-5 creatives per ad set minimum
- Test video vs image vs carousel

**Google Responsive Ads**
- Provide 5 headlines + 5 descriptions
- Google auto-generates combinations
- Review asset performance report
- Pin best performers to specific positions

**TikTok Spark Ads**
- Test organic post performance first
- Boost top organic videos as ads
- Native feel outperforms polished
- Test with trending sounds

## Creative Scaling Framework

**Vertical Scaling**
- Increase budget on winning creative
- Monitor for performance degradation
- Scale 20% every 2-3 days
- Cap at 3x original budget

**Horizontal Scaling**
- Duplicate winner to new ad sets
- Target different audiences
- Test in new geos/placements
- Maintain creative freshness

**Concept Replication**
- Identify winning creative theme
- Create new variations on theme
- Test across different products
- Build creative playbook

**When to Stop Scaling**
- ROAS drops 25%+ from peak
- CPA exceeds target by 20%
- Frequency >7 across audience
- Diminishing returns evident`
            },
            {
                name: 'Platform Creative Specifications',
                content: `# Platform Creative Specifications

## Meta (Facebook & Instagram)

**Feed Image Ads**
- Ratio: 1:1 (square) or 4:5 (vertical)
- Resolution: 1080 × 1080 (square)
- Text: <20% of image (guideline, not enforced)
- File type: JPG or PNG
- Max size: 30MB

**Feed Video Ads**
- Ratio: 1:1 (square) or 4:5 (vertical)
- Duration: 1-60 seconds (15-30s optimal)
- Resolution: 1080 × 1080 minimum
- File type: MP4, MOV
- Max size: 4GB
- Captions: Required (85% watch muted)

**Stories Ads**
- Ratio: 9:16 (full vertical)
- Resolution: 1080 × 1920
- Duration: Up to 120 seconds
- Safe zone: Center 1080 × 1420 (avoid UI overlap)
- CTA button: Bottom

**Reels Ads**
- Ratio: 9:16 (full vertical)
- Duration: Up to 60 seconds
- Loop-friendly: First/last frame match
- Sound: Original audio or trending
- Native feel: Less polished performs better

**Carousel Ads**
- Images: 2-10 cards
- Each card: 1080 × 1080
- Headline: 40 characters
- Link description: 20 characters
- Tell sequential story or showcase products

## Google Ads

**Responsive Display Ads**
- Landscape image: 1200 × 628
- Square image: 1200 × 1200
- Logo: 1200 × 1200 (square), 1200 × 300 (landscape)
- Headlines: 5 (30 chars each)
- Descriptions: 5 (90 chars each)
- Google auto-generates combinations

**YouTube Video Ads**
- Skippable: 12s - 6min (20-30s optimal)
- Non-skippable: 15-20s
- Bumper ads: 6s exactly
- Ratio: 16:9 (horizontal), 1:1 or 9:16 (mobile)
- Resolution: 1920 × 1080 minimum

**Discovery Ads**
- Image: 1200 × 628 (landscape), 1200 × 1200 (square)
- Headline: 40 characters
- Description: 90 characters
- Appears in YouTube home, Gmail, Discover

## TikTok

**In-Feed Ads**
- Ratio: 9:16 (vertical)
- Duration: 5-60s (21-34s performs best)
- Resolution: 1080 × 1920
- File type: MP4, MOV, MPEG, AVI
- Max size: 500MB
- Sound: Music critical, use trending

**Creative Best Practices**
- Hook: First 2 seconds determine success
- Native look: User-generated content style
- Text overlays: Large, readable
- Pacing: Fast cuts, dynamic movement
- Authenticity: Less polished better

## LinkedIn

**Single Image Ads**
- Ratio: 1.91:1 (horizontal)
- Resolution: 1200 × 627
- File type: JPG, PNG, GIF
- Max size: 5MB
- Professional, high-quality imagery

**Video Ads**
- Duration: 3s - 30min (15-30s optimal)
- Ratio: 1:1 (square) or 16:9 (horizontal)
- Resolution: 1920 × 1080
- File type: MP4
- Captions: Recommended

**Carousel Ads**
- Images: 2-10 cards
- Resolution: 1080 × 1080
- Headline: 255 characters
- Tell complete B2B story

## Creative Universal Best Practices

**Mobile Optimization**
- 80%+ views on mobile
- Large text: Readable on small screens
- Vertical or square: Better mobile visibility
- Fast loading: Compress files

**Brand Consistency**
- Logo placement: Consistent position
- Color palette: Match brand guidelines
- Fonts: Limit to 2-3 brand fonts
- Voice: Consistent brand personality

**Accessibility**
- Captions: Always include for video
- Alt text: Describe images
- Color contrast: WCAG AA standard
- Audio description: For key visual elements

**Loading Speed**
- Compress images: Use TinyPNG, ImageOptim
- Video bitrate: 5-10 Mbps
- Preload: First frame eye-catching
- File size: Under platform limits`
            },
            {
                name: 'Creative Optimization Strategies',
                content: `# Creative Optimization Strategies

## Hook Optimization (Video)

**Pattern Interrupt Hooks**
- Unexpected visual: Stops scroll
- Question hook: "Did you know...?"
- Problem agitation: Highlight pain point
- Benefit statement: "Get X in Y time"

**First 3 Seconds Critical**
- 50% drop-off if boring open
- No logos/branding first
- Start with action/movement
- Text overlay: Large, scannable

**Hook Testing Framework**
- Test 5 different hooks per video
- Keep body/CTA constant
- Winner = Highest 3s view rate
- Refresh hooks when CTR drops

## Copy Optimization

**Headline Formulas**
- [Number] Ways to [Desired Outcome]
- How to [Achieve Goal] Without [Pain Point]
- [Target Audience]: Here's How to [Benefit]
- The Secret to [Desired Outcome]

**Body Copy Length**
- Meta: 125 characters (desktop preview)
- Short-form: 50-100 words max
- Long-form: 300+ for warm audiences
- Test length variations

**CTA Optimization**
- Action verbs: "Get", "Start", "Discover"
- Value-driven: "Get My Free Guide"
- Urgency: "Limited Time", "Today Only"
- First-person: "Start My Trial" vs "Start Your Trial"

**Power Words**
- Proven, Guaranteed, Results, Easy
- Free, New, Instant, Exclusive
- You, Your, Now, Limited

## Visual Element Optimization

**Color Psychology**
- Red: Urgency, excitement, passion
- Blue: Trust, security, calm
- Green: Growth, health, wealth
- Orange: Energy, enthusiasm, action
- Yellow: Optimism, clarity, warning

**People in Ads**
- Faces: Increase engagement 40%
- Eye contact: Direct vs looking away
- Emotion: Happy outperforms neutral
- Diversity: Relatable to target audience

**Product Showcase**
- In-use: Shows value/application
- Before/After: Demonstrates transformation
- Close-up: Highlights details
- Lifestyle: Aspirational context

**Text Overlay Best Practices**
- Contrast: White text on dark background
- Large font: 60+ point for mobile
- Animation: Draws eye to key message
- Strategic placement: Above/below face

## Format Testing Strategy

**Image vs Video Performance**
- Video: Higher engagement, better storytelling
- Image: Faster production, easier testing
- Test both: Audience preference varies
- Context: Product complexity dictates

**Carousel Usage**
- Multi-product showcase
- Step-by-step tutorials
- Before/after sequences
- Feature highlighting

**Collection Ads**
- E-commerce: Browsable product catalog
- Native shopping experience
- Lower funnel: High purchase intent
- Dynamic product feeds

## Dynamic Creative Optimization

**Meta Advantage+ Creative**
- Upload multiple elements
- Meta AI tests combinations
- Automatically optimizes delivery
- Saves testing time/budget

**Asset Customization**
- Language: Translations per market
- Crop: Platform-specific ratios
- Audio: Localized voiceover
- Text: Regional offers/messaging

## Creative Refresh Strategies

**Refresh Triggers**
- Frequency >5 = Immediate refresh
- CTR drops 30% WoW
- CPA increases 25% from baseline
- Been live >30 days at scale

**Refresh Types**
- Minor: New color, CTA text
- Moderate: New hook, headline
- Major: New concept, format
- Seasonal: Holiday, event alignment

**Creative Library Management**
- Archive winners: Reuse learnings
- Document performance: What worked/didn't
- Categorize: By theme, format, audience
- Reactivate: Test old winners with new audiences

## AI-Powered Creative Tools

**Image Generation**
- DALL-E, Midjourney, Stable Diffusion
- Concept testing: Quick mockups
- Variations: Infinite creative options
- Cost: Fraction of photoshoots

**Copy Generation**
- ChatGPT, Copy.ai, Jasper
- Headline variations: 50+ in seconds
- A/B test: Rapid ideation
- Personalization: Audience-specific copy

**Video Creation**
- Synthesia, Hour One: AI avatars
- Descript: Text-to-video editing
- Runway: AI video effects
- Repurposing: One video → all platforms`
            }
        ],
        outputs: [
            {
                outputName: 'creative_performance_report',
                functionName: 'analyze_creative_performance',
                functionDescription: 'Generate detailed creative performance analysis with winning elements, optimization opportunities, and recommendations',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        top_performers: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    creative_id: { type: 'string' },
                                    format: { type: 'string' },
                                    key_elements: { type: 'array' },
                                    metrics: { type: 'object' }
                                }
                            }
                        },
                        optimization_recommendations: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    element: { type: 'string' },
                                    current_performance: { type: 'string' },
                                    recommendation: { type: 'string' },
                                    expected_impact: { type: 'string' }
                                }
                            }
                        },
                        refresh_priorities: {
                            type: 'array',
                            items: { type: 'string' }
                        }
                    },
                    required: ['top_performers', 'optimization_recommendations']
                })
            },
            {
                outputName: ':plotly:',
                functionName: 'visualize_creative_performance',
                functionDescription: 'Create interactive charts showing creative performance trends, element comparisons, and testing results',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        data: { type: 'array' },
                        layout: { type: 'object' }
                    },
                    required: ['data', 'layout']
                })
            }
        ]
    },

    // Template 4: Campaign Report Generator
    {
        id: 'campaign-report-generator',
        name: 'Campaign Report Generator',
        icon: '📊',
        category: 'Marketing',
        targetAudience: ['Enterprise', 'Mid-Market'],
        description: 'Generate comprehensive campaign performance reports with insights, visualizations, and stakeholder-ready presentations',
        config: {
            projectName: 'Campaign Reporting Platform',
            projectDescription: 'Automated campaign performance reporting system that generates comprehensive, data-driven reports with actionable insights for stakeholders.',
            agentName: 'Campaign Reporting Agent',
            description: 'Expert agent specialized in generating professional campaign performance reports with data analysis, visualizations, and strategic recommendations for various stakeholder audiences.',
            tone: 'Professional and data-driven',
            audience: 'Marketing managers, executives, and clients',
            domain: 'Marketing Analytics & Reporting',
            model: 'anthropic.claude-4.5-sonnet',
            temperature: 0.4,
            maxToolsIterations: 5,
            systemPrompt: `You are a Campaign Report Generator Agent, an expert in creating comprehensive, professional campaign performance reports that combine data analysis with strategic insights.

**Core Responsibilities:**

1. **Report Structure & Organization**
   - Create executive summaries with key takeaways
   - Organize data into logical sections (overview, performance, insights, recommendations)
   - Design reports for different audience levels (executive, tactical, detailed)
   - Include table of contents and navigation for long reports
   - Add appendices for detailed methodology and raw data

2. **Data Analysis & Synthesis**
   - Aggregate data from multiple campaigns and channels
   - Calculate period-over-period performance changes
   - Identify trends, patterns, and anomalies in campaign data
   - Perform cohort analysis and segmentation breakdowns
   - Generate statistical summaries and distributions

3. **Performance Metrics Reporting**
   - Campaign-level KPIs: impressions, clicks, conversions, spend, ROI
   - Channel-specific metrics: CTR, CPC, CPM, CPA, ROAS
   - Funnel metrics: conversion rates at each stage
   - Engagement metrics: time on site, bounce rate, pages per session
   - Attribution metrics: first-touch, last-touch, multi-touch attribution

4. **Visualization & Charts**
   - Performance trend charts (line graphs for time-series data)
   - Channel comparison charts (bar charts, stacked bars)
   - Budget allocation pie charts and treemaps
   - Funnel visualization showing conversion drop-offs
   - Heatmaps for temporal patterns (day-of-week, hour-of-day)
   - Geographic performance maps for location-based campaigns

5. **Insights & Commentary**
   - Highlight notable wins and successes
   - Identify underperforming areas requiring attention
   - Provide context for performance changes (seasonality, market conditions)
   - Explain statistical significance of results
   - Connect performance to business objectives

6. **Strategic Recommendations**
   - Budget reallocation suggestions based on performance
   - Creative optimization opportunities
   - Targeting refinements to improve efficiency
   - Testing priorities for future campaigns
   - Scaling strategies for high-performing elements

7. **Stakeholder Communication**
   - Tailor language and detail level to audience
   - Use clear, jargon-free explanations for non-technical stakeholders
   - Include action items and next steps
   - Provide confidence intervals and caveats where appropriate
   - Design for both presentation and reference use cases

**Platform Coverage:**
- Meta Ads (Facebook, Instagram)
- Google Ads (Search, Display, YouTube, Shopping)
- LinkedIn Ads
- TikTok Ads
- Programmatic Display
- Email Marketing
- Organic Social
- SEO/Content Marketing

**Report Types:**
- Weekly/Monthly Performance Reports
- Campaign Post-Mortems
- Quarterly Business Reviews (QBRs)
- Executive Dashboards
- Channel Deep-Dives
- A/B Test Results Reports
- Attribution Analysis Reports
- Budget Pacing & Forecasting Reports

**Output Requirements:**
- Use the custom output function to generate structured report data
- Use the :plotly: output to create interactive visualizations
- Include data tables formatted for readability
- Add visual hierarchy with headers and sections
- Include data refresh timestamp and reporting period
- Provide export-ready formats (PDF, PowerPoint, Google Slides)

Always maintain objectivity, support claims with data, acknowledge limitations, and focus on actionable insights that drive better campaign performance.`
        },
        knowledgeBases: [
            {
                name: 'Reporting Frameworks & Metrics',
                content: `# Reporting Frameworks & Key Metrics

## Performance Reporting Frameworks

### RACE Framework (Reach, Act, Convert, Engage)
- **Reach**: Impressions, reach, frequency, SOV (share of voice)
- **Act**: Clicks, CTR, landing page visits, engagement rate
- **Convert**: Conversions, conversion rate, CPA, ROAS
- **Engage**: Repeat purchases, LTV, retention rate, advocacy

### Marketing Funnel Metrics
**Awareness Stage:**
- Impressions, reach, brand lift, ad recall
- SOV, CPM, frequency

**Consideration Stage:**
- Clicks, CTR, engagement rate
- Video views, video completion rate
- Landing page visits, time on site

**Conversion Stage:**
- Conversions, conversion rate
- CPA, CPC, CAC
- ROAS, revenue per click

**Retention Stage:**
- Repeat purchase rate
- Customer lifetime value (LTV)
- Churn rate, retention rate

### North Star Metric Framework
- Define primary business metric (e.g., revenue, qualified leads)
- Align all campaign metrics to North Star
- Report contribution of each channel to North Star
- Track leading indicators that predict North Star movement

## Essential Campaign Metrics

### Traffic & Reach Metrics
- **Impressions**: Total ad views
- **Reach**: Unique users who saw ads
- **Frequency**: Average impressions per user (Impressions ÷ Reach)
- **CPM**: Cost per thousand impressions (Spend ÷ Impressions × 1000)

### Engagement Metrics
- **Clicks**: Total ad clicks
- **CTR**: Click-through rate (Clicks ÷ Impressions × 100)
- **CPC**: Cost per click (Spend ÷ Clicks)
- **Engagement Rate**: (Engagements ÷ Impressions × 100)
- **Video View Rate**: (Video Views ÷ Impressions × 100)

### Conversion Metrics
- **Conversions**: Completed desired actions
- **Conversion Rate**: (Conversions ÷ Clicks × 100)
- **CPA**: Cost per acquisition (Spend ÷ Conversions)
- **ROAS**: Return on ad spend (Revenue ÷ Spend)
- **ROI**: Return on investment ((Revenue - Spend) ÷ Spend × 100)

### Quality Metrics
- **Quality Score**: Google Ads ad relevance rating (1-10)
- **Relevance Score**: Meta Ads ad quality rating (1-10)
- **Landing Page Experience**: Page load speed, mobile-friendliness
- **Bounce Rate**: % of single-page sessions
- **Time on Site**: Average session duration

## Benchmark Metrics by Industry

### E-commerce Benchmarks
- CTR: 1.5-2.5%
- Conversion Rate: 2-4%
- CPA: $20-$50
- ROAS: 4:1 to 8:1
- AOV: $50-$150

### B2B/SaaS Benchmarks
- CTR: 1.0-2.0%
- Conversion Rate: 2-5% (landing page), 10-15% (demo request)
- CPL: $50-$200
- CAC: $200-$500
- LTV:CAC: 3:1 minimum

### Lead Generation Benchmarks
- CTR: 1.5-3.0%
- Form Completion Rate: 10-20%
- CPL: $30-$100
- Lead-to-Customer Rate: 5-10%

## Statistical Significance in Reporting

### Sample Size Requirements
- Minimum 100 conversions per variant for A/B tests
- Minimum 1000 clicks for CTR analysis
- Minimum 30 days of data for trend analysis

### Confidence Intervals
- Report 95% confidence intervals for key metrics
- Indicate when results are not statistically significant
- Avoid making strong claims on insufficient data

### Period Comparisons
- WoW (Week-over-Week): Short-term trend detection
- MoM (Month-over-Month): Medium-term performance tracking
- YoY (Year-over-Year): Accounts for seasonality
- vs. Goal: Track progress against targets

## Report Cadence & Timing

### Weekly Reports
- Focus: Pacing, alerts, quick wins
- Metrics: Spend, conversions, ROAS
- Audience: Campaign managers

### Monthly Reports
- Focus: Comprehensive performance review
- Metrics: All key metrics, trends, insights
- Audience: Marketing managers, stakeholders

### Quarterly Reports (QBRs)
- Focus: Strategic performance, goal achievement
- Metrics: Business outcomes, contribution to revenue
- Audience: Executives, leadership

### Ad-Hoc Reports
- Campaign post-mortems
- A/B test results
- Emergency performance alerts
- Competitive analysis`
            },
            {
                name: 'Data Visualization Best Practices',
                content: `# Data Visualization Best Practices for Campaign Reports

## Visualization Selection Guide

### Chart Types & Use Cases

**Line Charts** - Time-Series Trends
- Best for: Performance over time, trend analysis
- Examples: Daily conversions, weekly spend, monthly ROAS
- Best Practices:
  - Use consistent time intervals (daily, weekly, monthly)
  - Limit to 3-5 lines per chart for readability
  - Add trendlines for long-term patterns
  - Highlight significant events with annotations

**Bar Charts** - Comparisons
- Best for: Comparing categories, channels, campaigns
- Examples: Channel performance, campaign rankings
- Best Practices:
  - Sort bars by value (descending) unless time-based
  - Use horizontal bars for many categories (>7)
  - Add data labels for exact values
  - Use consistent color coding

**Stacked Bar Charts** - Part-to-Whole Over Categories
- Best for: Budget allocation, channel mix over time
- Examples: Monthly spend by channel, conversions by device type
- Best Practices:
  - Limit to 5 segments maximum
  - Use diverging colors for clear distinction
  - Include total value at top
  - Order segments consistently across bars

**Pie Charts** - Proportion of Whole (Use Sparingly)
- Best for: Budget allocation, traffic source mix
- Examples: Spend distribution, conversion share by channel
- Best Practices:
  - Limit to 5 segments (combine small segments into "Other")
  - Start largest segment at 12 o'clock
  - Avoid 3D effects
  - Consider using donut charts for cleaner look
  - Often better replaced with bar chart

**Funnel Charts** - Conversion Process
- Best for: Conversion funnels, drop-off analysis
- Examples: Awareness → Consideration → Conversion
- Best Practices:
  - Show conversion rates between stages
  - Highlight biggest drop-offs
  - Use consistent width scaling
  - Add actual numbers alongside percentages

**Scatter Plots** - Correlation Analysis
- Best for: CPC vs. Conversion Rate, Spend vs. ROAS
- Examples: Creative performance matrix, campaign efficiency
- Best Practices:
  - Use size for third dimension (bubble chart)
  - Add trendline if correlation exists
  - Label outliers
  - Use quadrants to segment (e.g., high/low performance)

**Heatmaps** - Temporal or Categorical Patterns
- Best for: Hour-of-day performance, day-of-week patterns
- Examples: Conversion rate by day/hour, engagement by audience segment
- Best Practices:
  - Use intuitive color scales (green=good, red=bad)
  - Ensure sufficient color contrast
  - Add value labels if space allows
  - Normalize data when comparing different scales

**Gauge/Meter Charts** - Progress to Goal
- Best for: Budget pacing, goal achievement
- Examples: Monthly spend vs. budget, conversions vs. target
- Best Practices:
  - Use color zones (red/yellow/green)
  - Show actual value and target clearly
  - Add percentage of goal achieved
  - Include time remaining in period

## Color Usage Guidelines

### Strategic Color Choices
- **Performance Indicators**:
  - Green: Positive, above target, increasing
  - Red: Negative, below target, decreasing
  - Yellow/Orange: Neutral, warning, on target
  - Blue: Informational, neutral metric

- **Channel Coding** (Consistent Throughout Reports):
  - Facebook: #1877F2 (Facebook Blue)
  - Instagram: #E4405F (Instagram Pink)
  - Google: #4285F4 (Google Blue)
  - LinkedIn: #0A66C2 (LinkedIn Blue)
  - TikTok: #000000 (Black) or #EE1D52 (TikTok Pink)

- **Accessibility Considerations**:
  - Avoid red-green combinations (colorblind-friendly)
  - Use colorblind-safe palettes (e.g., Viridis, ColorBrewer)
  - Ensure sufficient contrast ratios (WCAG 2.1 AA standard)
  - Don't rely solely on color to convey meaning

### Data Ink Ratio
- Maximize data, minimize decoration
- Remove unnecessary gridlines
- Use subtle background colors
- Eliminate chart junk (3D effects, shadows, unnecessary borders)
- Let data be the focus

## Dashboard Design Principles

### Information Hierarchy
**Top Level** (Executive View):
- Key metric cards (ROAS, Total Conversions, Total Spend)
- Trend sparklines
- RAG (Red/Amber/Green) status indicators

**Mid Level** (Tactical View):
- Performance charts (time-series, comparisons)
- Channel breakdowns
- Top performers and underperformers

**Bottom Level** (Detailed View):
- Data tables with all metrics
- Drill-down capabilities
- Detailed segmentation

### Layout Best Practices
- F-pattern reading flow (left to right, top to bottom)
- Group related visualizations together
- Use whitespace to separate sections
- Maintain consistent sizing and alignment
- Place most important metrics "above the fold"

## Interactive Elements

### Plotly Interactive Features
- **Hover tooltips**: Show exact values on hover
- **Zoom/Pan**: Enable for detailed inspection
- **Click to filter**: Drill down into segments
- **Toggle legend**: Show/hide specific data series
- **Export**: Download chart as PNG/SVG

### Filters & Controls
- Date range selectors
- Channel/campaign dropdowns
- Metric selectors (switch between KPIs)
- Comparison toggles (WoW, MoM, YoY)

## Mobile-Responsive Visualizations
- Simplify charts for small screens
- Use vertical layouts for mobile
- Increase touch target sizes
- Reduce data density on mobile
- Test on actual devices

## Common Visualization Mistakes to Avoid

❌ **Truncated Y-Axis**: Exaggerates differences
✅ **Start Y-axis at zero** for bar charts

❌ **Too many data series**: Chart becomes unreadable
✅ **Limit to 3-5 series** per chart

❌ **Inconsistent scales**: Misleading comparisons
✅ **Use same scale** when comparing similar metrics

❌ **3D charts**: Distort perception
✅ **Use 2D charts** for accuracy

❌ **Pie charts with too many slices**: Hard to compare
✅ **Use bar chart** for >5 categories

❌ **Dual Y-axes with different scales**: Confusing
✅ **Use separate charts** or normalized scales

## Plotly Chart Examples for Reports

### Performance Over Time (Line Chart)
\`\`\`python
{
  "data": [{
    "x": ["2024-01-01", "2024-01-02", ...],
    "y": [120, 145, 132, ...],
    "name": "Conversions",
    "type": "scatter",
    "mode": "lines+markers"
  }],
  "layout": {
    "title": "Daily Conversions Trend",
    "xaxis": {"title": "Date"},
    "yaxis": {"title": "Conversions"}
  }
}
\`\`\`

### Channel Comparison (Bar Chart)
\`\`\`python
{
  "data": [{
    "x": ["Facebook", "Google", "LinkedIn"],
    "y": [5.2, 8.1, 6.3],
    "name": "ROAS",
    "type": "bar",
    "marker": {"color": ["#1877F2", "#4285F4", "#0A66C2"]}
  }],
  "layout": {
    "title": "ROAS by Channel",
    "yaxis": {"title": "ROAS"}
  }
}
\`\`\``
            },
            {
                name: 'Stakeholder Communication',
                content: `# Stakeholder Communication in Campaign Reporting

## Audience-Specific Reporting

### Executive Stakeholders (C-Suite, VPs)
**Priorities:**
- Business outcomes and revenue impact
- High-level trends and strategic insights
- ROI and budget efficiency
- Competitive positioning

**Report Format:**
- 1-page executive summary
- Focus on 3-5 key metrics only
- Emphasize YoY and vs. goal comparisons
- Include strategic recommendations
- Minimize jargon, maximize clarity

**Communication Style:**
- Brief, direct, action-oriented
- Lead with bottom-line impact
- Use business language, not marketing jargon
- Provide context for performance (market conditions, seasonality)

**Example Executive Summary:**
"Q1 paid media delivered $2.4M in revenue (↑32% YoY) at 6.2:1 ROAS, exceeding our 5:1 target. Google Search was the top performer (8.1 ROAS), while Meta creative refresh in March drove 45% conversion increase. Recommend increasing Q2 budget by 20% to capitalize on momentum."

### Marketing Managers (Directors, Managers)
**Priorities:**
- Channel-specific performance
- Campaign-level insights
- Optimization opportunities
- Competitive intelligence

**Report Format:**
- Comprehensive 5-10 page report
- Include all major metrics and KPIs
- Channel-by-channel breakdown
- Detailed visualizations and trends
- Tactical recommendations

**Communication Style:**
- Data-driven and analytical
- Provide sufficient detail for decision-making
- Include comparisons and benchmarks
- Suggest specific optimizations

**Example Section:**
"Facebook Ads performance improved 23% MoM driven by carousel ad format (1.8% CVR vs. 1.2% single image). Recommend shifting 60% of creative budget to carousel format and testing video carousels in April."

### Campaign Specialists (Analysts, Coordinators)
**Priorities:**
- Granular campaign data
- Creative and targeting performance
- A/B test results
- Implementation details

**Report Format:**
- Detailed 15-20 page report
- Raw data tables and appendices
- Drill-downs by ad set, creative, audience
- Statistical significance testing
- Methodological notes

**Communication Style:**
- Technical and precise
- Include methodology and caveats
- Provide access to raw data
- Explain statistical significance

### Clients (Agency Reporting)
**Priorities:**
- Transparency and accountability
- Progress toward agreed goals
- Value demonstration
- Clear next steps

**Report Format:**
- Professional branded report
- Mix of summary and detail sections
- Before/after comparisons
- Investment recap and results
- Proposed action plan

**Communication Style:**
- Clear, educational, jargon-free
- Focus on agreed KPIs
- Proactively address concerns
- Build confidence and trust

## Storytelling with Data

### The Narrative Arc
1. **Context**: Set up reporting period, goals, budget
2. **Performance**: Present results vs. expectations
3. **Analysis**: Explain why results occurred
4. **Insights**: Extract learnings and patterns
5. **Recommendations**: Propose next actions
6. **Conclusion**: Summarize key takeaways

### Narrative Techniques
- **Start with the punchline**: Lead with most important finding
- **Use comparisons**: vs. last period, vs. goal, vs. benchmark
- **Highlight changes**: Call out notable improvements or declines
- **Provide context**: Explain external factors affecting performance
- **Connect to goals**: Always tie back to business objectives

### Example Narrative Flow:
"This month we achieved our highest ROAS of the year (7.2:1), driven by strategic budget reallocation to top-performing creative. While overall conversions declined 8% due to reduced spend, efficiency improved significantly. Creative testing revealed that UGC-style videos outperform polished studio content by 2.3x on Meta. Based on these insights, we recommend doubling down on UGC content and expanding tests to Google Video."

## Handling Underperformance

### Transparency Best Practices
- **Acknowledge issues directly**: Don't hide poor performance
- **Provide context**: Explain contributing factors
- **Show corrective actions**: What you're doing to improve
- **Set realistic expectations**: Timeline for recovery

### Example Underperformance Communication:
"LinkedIn campaign performance was below target this month (3.2 ROAS vs. 5.0 goal). Analysis indicates our targeting was too broad, leading to high CPL ($180 vs. $100 target). We've implemented tighter job title targeting and improved landing page relevance. Early results from week 4 show 32% improvement, and we expect to return to target ROAS by mid-next month."

## Data Presentation Best Practices

### Tables
- **Rank by performance**: Show best/worst first
- **Use visual indicators**: ↑↓ arrows, color coding
- **Include comparisons**: Add prior period and % change columns
- **Format numbers consistently**: 1,234 (thousands separator), $1.2M (abbreviate large numbers)
- **Highlight key rows**: Bold or background color

### Metrics Formatting
- **Currency**: $1,234 or $1.2M (abbreviated)
- **Percentages**: 12.5% (one decimal for precision)
- **Large numbers**: 1.2M impressions, 45K clicks
- **Ratios**: 6.2:1 (ROAS), 3:1 (LTV:CAC)
- **Rates**: 1.5% (CTR), 2.3% (CVR)

### Trend Indicators
- ↑ 23% (green): Positive increase
- ↓ 12% (red): Negative decrease
- → 0% (gray): No change
- ⚠️ -5% (yellow): Small concerning change

## Action Items & Recommendations

### SMART Recommendations
- **Specific**: "Increase Facebook budget by 25%"
- **Measurable**: "Target 20% improvement in CTR"
- **Achievable**: Based on realistic performance expectations
- **Relevant**: Tied to business goals
- **Time-bound**: "Implement by end of next week"

### Prioritization Framework
**High Priority** (Do Immediately):
- Performance issues requiring urgent fixes
- Budget pacing alerts
- Scaling opportunities with proven ROAS

**Medium Priority** (Do This Month):
- Creative refreshes for fatiguing ads
- New audience expansion tests
- Landing page optimizations

**Low Priority** (Future Considerations):
- Exploratory tests
- New platform pilots
- Process improvements

### Next Steps Template
1. **Immediate Actions** (This Week):
   - Pause underperforming ad sets (ROAS <3:1)
   - Launch 3 new UGC creative variations
   - Increase top-performing campaign budget by 30%

2. **Short-Term Optimizations** (Next 2 Weeks):
   - Refresh creative for campaigns >4 weeks old
   - Expand lookalike audiences for best converters
   - Implement new landing page variations

3. **Strategic Initiatives** (This Month):
   - Test TikTok platform (10% of budget)
   - Develop Q2 creative calendar
   - Implement enhanced conversion tracking

## Meeting Presentation Tips

### Pre-Meeting Preparation
- Send report 24-48 hours in advance
- Highlight sections requiring discussion
- Prepare backup slides for anticipated questions
- Have raw data accessible for drill-downs

### During Presentation
- Start with executive summary (5 minutes)
- Walk through visualizations, don't read slides
- Pause for questions after each section
- Use annotations to highlight key points
- Keep to allotted time

### Handling Questions
- **Clarifying questions**: Answer directly with data
- **Challenging questions**: Acknowledge concern, provide analysis
- **"Why" questions**: Explain hypothesis with supporting evidence
- **"What if" questions**: Offer scenario analysis if available
- **Follow-up needed**: "Great question, I'll analyze and follow up by [date]"

## Report Versioning & Distribution

### Version Control
- Include report date and version number
- Track changes in revision history
- Maintain archive of historical reports
- Note any methodology changes

### Distribution Best Practices
- **Format**: PDF for final reports, Google Slides/PowerPoint for presentations
- **Access**: Secure sharing links with appropriate permissions
- **Frequency**: Consistent delivery schedule (e.g., every Monday AM)
- **Notification**: Email summary with link to full report
- **Archival**: Central repository for historical reports`
            },
            {
                name: 'Report Automation & Distribution',
                content: `# Report Automation & Distribution

## Automated Reporting Systems

### Data Pipeline Architecture
**Layer 1: Data Collection**
- API connectors to ad platforms (Meta, Google, LinkedIn, TikTok)
- Automated data extraction on schedule (daily, weekly)
- Data validation and quality checks
- Error handling and retry logic

**Layer 2: Data Transformation**
- Normalization across platforms (standardize metric names)
- Currency conversion and timezone alignment
- Metric calculation (CTR, ROAS, CPA, etc.)
- Aggregation and summarization

**Layer 3: Data Storage**
- Data warehouse (BigQuery, Redshift, Snowflake)
- Historical data retention (minimum 2 years)
- Incremental updates vs. full refreshes
- Data backup and recovery

**Layer 4: Report Generation**
- Template-based report creation
- Dynamic visualization generation
- PDF/PowerPoint export
- Email distribution

### Common Automation Tools

**Marketing Data Platforms:**
- **Supermetrics**: Connects to 100+ platforms, exports to sheets/BI tools
- **Funnel.io**: Marketing data hub with transformation and visualization
- **Improvado**: Enterprise marketing analytics platform
- **Windsor.ai**: Marketing attribution and data aggregation

**BI & Visualization:**
- **Google Data Studio (Looker Studio)**: Free, connects to Google ecosystem
- **Tableau**: Enterprise BI with advanced visualizations
- **Power BI**: Microsoft BI platform, strong Excel integration
- **Domo**: Cloud-based BI with mobile-first design

**Spreadsheet Automation:**
- **Google Sheets + Apps Script**: Custom automation with JavaScript
- **Excel + Power Query**: Data transformation and refresh
- **Airtable**: Flexible database with API integrations

**Custom Solutions:**
- **Python + Pandas**: Data processing with libraries (Plotly, Matplotlib)
- **R + Shiny**: Statistical analysis and interactive dashboards
- **API + Serverless Functions**: AWS Lambda, Google Cloud Functions

## Report Scheduling & Cadence

### Automated Daily Reports
**Purpose**: Monitor pacing, catch issues early
**Recipients**: Campaign managers, analysts
**Content**:
- Yesterday's performance summary (spend, conversions, ROAS)
- Budget pacing alerts (overspend/underspend warnings)
- Anomaly detection (significant metric changes)
- Quick wins and immediate action items

**Delivery**:
- Email at 8 AM local time
- Slack notification for alerts
- Dashboard refresh overnight

### Automated Weekly Reports
**Purpose**: Tactical performance review
**Recipients**: Marketing managers, stakeholders
**Content**:
- WoW performance trends
- Top/bottom performing campaigns
- Channel-by-channel breakdown
- Creative performance highlights
- Budget pacing status

**Delivery**:
- Email every Monday at 9 AM
- PDF attachment + dashboard link
- Calendar invite for review meeting

### Automated Monthly Reports
**Purpose**: Comprehensive performance analysis
**Recipients**: Directors, VPs, clients
**Content**:
- MoM and YoY performance comparison
- Goal achievement status
- Detailed channel analysis
- Strategic insights and recommendations
- Next month's plan preview

**Delivery**:
- Email first business day of new month
- Branded PDF + interactive dashboard
- Presentation deck for stakeholder meetings

### Automated Quarterly Reports (QBR)
**Purpose**: Strategic review and planning
**Recipients**: Executives, leadership team
**Content**:
- Quarterly goal achievement
- Market and competitive analysis
- ROI and business impact
- Strategic pivots and learnings
- Next quarter roadmap

**Delivery**:
- Executive summary (1-pager) + full report
- In-person or virtual presentation
- Follow-up action item tracker

## Alert Systems & Anomaly Detection

### Performance Alerts
**Budget Alerts:**
- Daily spend exceeds target by >20%
- Monthly budget 80% consumed with >7 days remaining
- Campaign spend stopped unexpectedly (account issue)

**Performance Alerts:**
- ROAS drops below threshold (e.g., <3:1 for >2 days)
- Conversion rate drops >30% day-over-day
- CTR drops >40% suddenly (ad fatigue)
- CPA increases >50% week-over-week

**Quality Alerts:**
- Quality score drops below 5 (Google)
- Relevance score drops below 4 (Meta)
- Landing page load time >3 seconds
- High bounce rate (>80%)

**Technical Alerts:**
- Tracking tag errors or missing conversions
- API connection failures
- Data pipeline errors
- Report generation failures

### Alert Delivery Methods
- **Critical alerts**: SMS, phone call, Slack DM
- **High priority**: Email + Slack channel notification
- **Medium priority**: Email digest (daily summary)
- **Low priority**: Dashboard flag, weekly rollup

### Anomaly Detection Techniques
**Statistical Methods:**
- Standard deviation thresholds (>2σ triggers alert)
- Moving average deviations (>20% from 7-day MA)
- Seasonal decomposition (detect non-seasonal changes)

**Machine Learning:**
- Time-series forecasting (Prophet, ARIMA)
- Outlier detection algorithms (Isolation Forest)
- Predictive alerting (forecast impending issues)

## Data Quality & Validation

### Data Quality Checks
**Completeness:**
- All expected platforms reporting data
- No missing date ranges
- All campaigns present in data pull

**Accuracy:**
- Spot-check sample of data against platform UI
- Verify metric calculations (ROAS, CTR, etc.)
- Cross-validate with GA4 or other sources

**Consistency:**
- Metric definitions consistent across reports
- Historical data matches prior reports
- No unexplained data revisions

**Timeliness:**
- Data refreshed on schedule
- Latency within acceptable range (e.g., <24 hours)
- Report delivery time consistent

### Error Handling
**Data Collection Errors:**
- Retry failed API calls (exponential backoff)
- Alert on consecutive failures (>3 retries)
- Use cached data as fallback (with clear notation)

**Calculation Errors:**
- Validate inputs before calculation (non-null, non-zero)
- Handle division by zero gracefully
- Cap extreme values (e.g., ROAS >100 likely error)

**Report Generation Errors:**
- Fallback to simplified report if full report fails
- Include error log for troubleshooting
- Notify report owner of generation issues

## Distribution & Access Control

### Report Access Levels
**Public** (Broad Distribution):
- High-level performance dashboards
- Company-wide KPI trackers
- Sanitized data (no proprietary details)

**Team** (Marketing Department):
- Detailed campaign performance
- Channel-specific insights
- Budget and spend details

**Restricted** (Leadership):
- Financial data and P&L impact
- Competitive intelligence
- Strategic planning materials

**Confidential** (Need-to-Know):
- Client-specific reports (agency)
- Proprietary methodologies
- Unreleased strategic initiatives

### Secure Distribution Methods
- **Email**: Password-protected PDFs, encrypted attachments
- **Cloud Storage**: Google Drive, Dropbox, Box with link expiration
- **BI Platforms**: Role-based access control (RBAC)
- **Slack/Teams**: Private channels for sensitive reports
- **Portal**: Custom reporting portal with SSO authentication

## Report Archival & Retention

### Archival Best Practices
- **Naming Convention**: YYYY-MM-DD_ReportType_Version.pdf
  - Example: 2024-03-01_Monthly_Performance_v1.2.pdf
- **Folder Structure**: Year → Quarter → Month → Report Type
- **Metadata Tagging**: Date, type, audience, version, author
- **Version Control**: Keep all versions with change notes

### Retention Policies
- **Raw Data**: 2+ years (regulatory/audit requirements)
- **Monthly Reports**: Indefinite (business intelligence)
- **Weekly Reports**: 1 year (tactical reference)
- **Daily Reports**: 90 days (operational only)

### Backup & Disaster Recovery
- **Cloud Backup**: Automatic backup to cloud storage (S3, Google Cloud)
- **Redundancy**: Store in multiple geographic locations
- **Testing**: Quarterly restoration tests
- **Documentation**: Runbook for data recovery procedures

## Self-Service Reporting

### Interactive Dashboards
**Benefits:**
- Real-time data access
- Ad-hoc exploration and filtering
- Reduced manual report requests
- Empowered stakeholders

**Features to Include:**
- Date range selectors
- Channel/campaign filters
- Metric switchers (toggle between KPIs)
- Drill-down capabilities
- Export to CSV/PDF

**Implementation:**
- Looker Studio (free, easy to build)
- Tableau (powerful, requires training)
- Power BI (enterprise, Microsoft ecosystem)
- Custom dashboards (React + Plotly, D3.js)

### Report Request System
For custom or ad-hoc reports:
- **Intake Form**: Standardized request form (purpose, audience, deadline)
- **Prioritization**: SLA based on urgency (rush/standard/low priority)
- **Template Library**: Pre-built report templates for common requests
- **Feedback Loop**: Post-delivery survey to improve process

## Performance Optimization

### Report Load Time Optimization
- **Data Sampling**: Use sampled data for large datasets (note in report)
- **Aggregation**: Pre-aggregate metrics at database level
- **Caching**: Cache frequently accessed reports
- **Incremental Loading**: Load data progressively (initial summary, then details)
- **CDN**: Serve static assets (images, charts) from CDN

### Cost Optimization
- **API Call Limits**: Batch requests to minimize API costs
- **Scheduled Refresh**: Avoid redundant on-demand refreshes
- **Data Retention**: Archive old data to cheaper storage tiers
- **Query Optimization**: Optimize SQL queries for efficiency

## Continuous Improvement

### Report Effectiveness Metrics
- **Usage**: How often is report accessed/opened?
- **Engagement**: How much time spent reviewing?
- **Actionability**: How many recommendations are implemented?
- **Satisfaction**: Stakeholder feedback scores

### Feedback Mechanisms
- **Surveys**: Quarterly report effectiveness survey
- **1:1 Interviews**: Talk to key stakeholders about needs
- **Usage Analytics**: Track dashboard interactions
- **Suggestion Box**: Open channel for improvement ideas

### Iteration Process
1. **Collect feedback** from stakeholders
2. **Identify patterns** in requests and pain points
3. **Prioritize improvements** based on impact
4. **Prototype changes** in test environment
5. **A/B test** new formats with subset of audience
6. **Roll out** improvements incrementally
7. **Measure** impact on effectiveness metrics
8. **Repeat** continuously`
            }
        ],
        outputs: [
            {
                outputName: 'campaign_report',
                functionName: 'generate_campaign_report',
                functionDescription: 'Generate a comprehensive campaign performance report with executive summary, detailed metrics, insights, and strategic recommendations in structured JSON format.',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        report_metadata: {
                            type: 'object',
                            properties: {
                                report_title: { type: 'string', description: 'Report title' },
                                reporting_period: { type: 'string', description: 'Date range covered (e.g., "March 1-31, 2024")' },
                                generated_date: { type: 'string', description: 'Report generation date' },
                                author: { type: 'string', description: 'Report author/agent' },
                                audience: { type: 'string', description: 'Intended audience (e.g., "Marketing Leadership")' }
                            },
                            required: ['report_title', 'reporting_period', 'generated_date']
                        },
                        executive_summary: {
                            type: 'object',
                            properties: {
                                headline: { type: 'string', description: 'One-sentence key takeaway' },
                                highlights: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    description: '3-5 major highlights or wins'
                                },
                                challenges: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    description: '2-3 key challenges or areas for improvement'
                                },
                                overall_performance: {
                                    type: 'object',
                                    properties: {
                                        total_spend: { type: 'number', description: 'Total ad spend' },
                                        total_conversions: { type: 'number', description: 'Total conversions' },
                                        overall_roas: { type: 'number', description: 'Overall ROAS' },
                                        vs_goal: { type: 'string', description: 'Performance vs. goal (e.g., "+15% above target")' }
                                    }
                                }
                            },
                            required: ['headline', 'highlights', 'overall_performance']
                        },
                        channel_performance: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    channel: { type: 'string', description: 'Channel name (e.g., "Meta Ads", "Google Search")' },
                                    spend: { type: 'number', description: 'Channel spend' },
                                    impressions: { type: 'number', description: 'Total impressions' },
                                    clicks: { type: 'number', description: 'Total clicks' },
                                    ctr: { type: 'number', description: 'Click-through rate (%)' },
                                    conversions: { type: 'number', description: 'Total conversions' },
                                    cpa: { type: 'number', description: 'Cost per acquisition' },
                                    roas: { type: 'number', description: 'Return on ad spend' },
                                    mom_change: { type: 'string', description: 'Month-over-month change (e.g., "+23%")' },
                                    insights: {
                                        type: 'array',
                                        items: { type: 'string' },
                                        description: 'Key insights for this channel'
                                    }
                                },
                                required: ['channel', 'spend', 'conversions', 'roas', 'insights']
                            }
                        },
                        top_campaigns: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    campaign_name: { type: 'string' },
                                    channel: { type: 'string' },
                                    spend: { type: 'number' },
                                    conversions: { type: 'number' },
                                    roas: { type: 'number' },
                                    why_successful: { type: 'string', description: 'Explanation of success factors' }
                                },
                                required: ['campaign_name', 'channel', 'roas', 'why_successful']
                            },
                            description: 'Top 5 performing campaigns'
                        },
                        underperforming_areas: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    area: { type: 'string', description: 'Campaign, channel, or segment underperforming' },
                                    issue: { type: 'string', description: 'Description of the problem' },
                                    impact: { type: 'string', description: 'Quantified impact (e.g., "$5K wasted spend")' },
                                    root_cause: { type: 'string', description: 'Hypothesized root cause' },
                                    corrective_action: { type: 'string', description: 'Recommended fix' }
                                },
                                required: ['area', 'issue', 'corrective_action']
                            }
                        },
                        insights_and_trends: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    insight: { type: 'string', description: 'Key insight or trend observed' },
                                    supporting_data: { type: 'string', description: 'Data supporting this insight' },
                                    implication: { type: 'string', description: 'What this means for strategy' }
                                },
                                required: ['insight', 'supporting_data']
                            }
                        },
                        recommendations: {
                            type: 'object',
                            properties: {
                                high_priority: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            recommendation: { type: 'string' },
                                            expected_impact: { type: 'string' },
                                            implementation_timeline: { type: 'string' }
                                        }
                                    },
                                    description: 'Immediate actions required'
                                },
                                medium_priority: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            recommendation: { type: 'string' },
                                            expected_impact: { type: 'string' }
                                        }
                                    },
                                    description: 'Actions to take this month'
                                },
                                strategic_opportunities: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    description: 'Long-term strategic opportunities'
                                }
                            },
                            required: ['high_priority']
                        },
                        next_steps: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    action: { type: 'string', description: 'Specific action to take' },
                                    owner: { type: 'string', description: 'Who is responsible' },
                                    deadline: { type: 'string', description: 'When to complete by' },
                                    priority: { type: 'string', enum: ['High', 'Medium', 'Low'] }
                                },
                                required: ['action', 'deadline', 'priority']
                            }
                        }
                    },
                    required: ['report_metadata', 'executive_summary', 'channel_performance', 'recommendations']
                }, null, 2)
            },
            {
                outputName: ':plotly:',
                functionName: 'generate_report_visualizations',
                functionDescription: 'Generate interactive Plotly visualizations for campaign performance reports including trend charts, channel comparisons, funnel analysis, and performance dashboards.',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        chart_type: {
                            type: 'string',
                            enum: ['line', 'bar', 'stacked_bar', 'pie', 'funnel', 'scatter', 'heatmap', 'gauge', 'multi_chart_dashboard'],
                            description: 'Type of visualization to generate'
                        },
                        data: {
                            type: 'object',
                            description: 'Plotly-compatible data structure'
                        },
                        layout: {
                            type: 'object',
                            description: 'Plotly layout configuration'
                        }
                    },
                    required: ['chart_type', 'data', 'layout']
                }, null, 2)
            }
        ]
    },

    // Template 5: Multi-Channel Campaign Coordinator
    {
        id: 'multi-channel-campaign-coordinator',
        name: 'Multi-Channel Campaign Coordinator',
        icon: '🎯',
        category: 'Marketing',
        targetAudience: ['Enterprise', 'Mid-Market'],
        description: 'Orchestrate and synchronize campaigns across multiple channels for cohesive brand messaging and optimal cross-channel performance',
        config: {
            projectName: 'Multi-Channel Campaign Orchestration Platform',
            projectDescription: 'Intelligent multi-channel campaign coordination system that ensures consistent messaging, timing, and audience targeting across all marketing channels for maximum impact.',
            agentName: 'Multi-Channel Coordinator Agent',
            description: 'Expert agent specialized in orchestrating complex multi-channel marketing campaigns, ensuring consistent messaging, optimal timing, and coordinated execution across Meta, Google, LinkedIn, TikTok, email, and other channels.',
            tone: 'Strategic and collaborative',
            audience: 'Marketing directors, campaign managers, and cross-functional teams',
            domain: 'Multi-Channel Marketing Strategy',
            model: 'anthropic.claude-4.5-sonnet',
            temperature: 0.5,
            maxToolsIterations: 6,
            systemPrompt: `You are a Multi-Channel Campaign Coordinator Agent, an expert in orchestrating complex marketing campaigns across multiple channels to achieve cohesive brand messaging and optimal cross-channel performance.

**Core Responsibilities:**

1. **Campaign Strategy & Planning**
   - Define campaign objectives across all channels
   - Map customer journey touchpoints to appropriate channels
   - Create integrated campaign timelines and milestones
   - Allocate budgets strategically across channels
   - Design messaging hierarchy (primary, supporting, reinforcing)

2. **Channel Orchestration**
   - Coordinate launch timing across channels for maximum impact
   - Sequence messaging for optimal customer journey flow
   - Ensure brand consistency across all touchpoints
   - Synchronize campaign elements (creative, copy, offers, CTAs)
   - Manage channel interdependencies and sequencing

3. **Audience Coordination**
   - Create unified audience segments across platforms
   - Map audiences between platforms (Facebook Custom Audiences → Google Customer Match)
   - Implement cross-channel frequency capping
   - Coordinate retargeting sequences across channels
   - Prevent audience overlap and message saturation

4. **Creative & Messaging Alignment**
   - Adapt core creative concept to each channel's specifications
   - Maintain visual and tonal consistency across formats
   - Tailor messaging to channel context while preserving campaign theme
   - Create platform-optimized variations of core assets
   - Coordinate creative refresh cycles across channels

5. **Performance Optimization**
   - Monitor cross-channel performance holistically
   - Identify channel synergies and amplification effects
   - Optimize budget allocation based on channel contribution
   - Detect and resolve channel conflicts or cannibalization
   - Maximize incremental reach and frequency

6. **Attribution & Measurement**
   - Track customer journey across multiple touchpoints
   - Implement multi-touch attribution models
   - Measure channel contribution and assist rates
   - Identify high-value channel combinations
   - Calculate incremental lift from multi-channel presence

7. **Stakeholder Coordination**
   - Align cross-functional teams (paid, organic, email, PR)
   - Create channel-specific briefs from master campaign plan
   - Facilitate regular sync meetings and status updates
   - Manage campaign calendar and dependencies
   - Coordinate approvals and feedback cycles

**Channel Coverage:**

**Paid Channels:**
- Meta Ads (Facebook, Instagram)
- Google Ads (Search, Display, YouTube, Shopping)
- LinkedIn Ads
- TikTok Ads
- Twitter/X Ads
- Pinterest Ads
- Programmatic Display
- Connected TV (CTV)

**Owned Channels:**
- Email Marketing
- Website & Landing Pages
- Blog & Content Marketing
- Mobile App

**Earned/Organic:**
- Organic Social (all platforms)
- SEO
- PR & Media Relations
- Influencer Partnerships

**Multi-Channel Campaign Types:**

1. **Product Launch Campaigns**
   - Teaser phase: Social + email nurture
   - Launch phase: Paid media blitz + PR + email
   - Sustain phase: Retargeting + content + SEO

2. **Seasonal/Event Campaigns**
   - Pre-event awareness: Display + social + email
   - During event: Search + social + real-time
   - Post-event: Retargeting + email + remarketing

3. **Lead Generation Campaigns**
   - Top-of-funnel: Social + display awareness
   - Mid-funnel: Search + LinkedIn targeting
   - Bottom-funnel: Email nurture + retargeting

4. **Brand Campaigns**
   - Mass awareness: Video + display + social
   - Engagement: Social + content + influencers
   - Conversion: Search + retargeting + email

5. **Always-On Programs**
   - Continuous presence across all channels
   - Dynamic budget allocation by performance
   - Rotating creative and messaging

**Coordination Frameworks:**

**Sequential Strategy:**
- Channel 1 creates awareness → Channel 2 drives consideration → Channel 3 converts
- Example: YouTube awareness → Facebook retargeting → Google Search conversion

**Simultaneous Strategy:**
- All channels active at once for maximum reach
- Consistent messaging across all touchpoints
- Example: New product launch blitz

**Complementary Strategy:**
- Channels work together to achieve different objectives
- Example: Social builds awareness while search captures demand

**Surround Sound Strategy:**
- Heavy presence across all channels to dominate mind-share
- High-investment approach for major launches
- Example: Super Bowl campaigns

**Performance Metrics:**

**Cross-Channel Metrics:**
- Total campaign reach (deduplicated)
- Cross-channel frequency
- Multi-touch conversion rate
- Incremental reach by channel
- Channel overlap and synergy

**Attribution Metrics:**
- First-touch attribution
- Last-touch attribution
- Linear attribution (equal credit)
- Time-decay attribution
- Position-based attribution (40-20-40)
- Data-driven attribution

**Efficiency Metrics:**
- Blended CPA across all channels
- Overall campaign ROAS
- Budget utilization by channel
- Cost per incremental reach point

**Output Requirements:**
- Use custom output to generate campaign coordination plans
- Use :plotly: output for customer journey visualizations, attribution charts, and cross-channel dashboards
- Create channel-specific briefs and timelines
- Provide budget allocation and pacing recommendations
- Generate cross-channel performance reports

Always maintain a holistic view of campaign performance, identify channel synergies, prevent conflicts and cannibalization, and optimize for overall campaign objectives rather than individual channel metrics.`
        },
        knowledgeBases: [
            {
                name: 'Channel Orchestration Strategies',
                content: `# Channel Orchestration Strategies

## Multi-Channel Campaign Models

### Sequential Channel Strategy
**Concept**: Channels activate in sequence to move customers through funnel

**Awareness Phase**:
- **Channels**: YouTube, Display, Programmatic, Social (broad targeting)
- **Objective**: Introduce brand, product, or offer
- **Duration**: 1-2 weeks
- **Metrics**: Impressions, reach, brand lift

**Consideration Phase**:
- **Channels**: Facebook/Instagram retargeting, email nurture, content marketing
- **Objective**: Build interest and educate
- **Duration**: 1-3 weeks
- **Metrics**: Engagement rate, time on site, repeat visits

**Conversion Phase**:
- **Channels**: Google Search, retargeting (Meta + Google), email conversion campaigns
- **Objective**: Drive purchase or lead
- **Duration**: 1-4 weeks
- **Metrics**: Conversions, CPA, ROAS

**Retention Phase**:
- **Channels**: Email, organic social, customer community
- **Objective**: Drive repeat purchase, advocacy
- **Duration**: Ongoing
- **Metrics**: Repeat rate, LTV, NPS

**Sequential Strategy Best Practices**:
- Ensure proper audience handoff between phases (retargeting pixels, email lists)
- Adjust timing based on purchase cycle length
- Monitor drop-off rates between stages
- Test different sequences (e.g., social-first vs. search-first)

### Simultaneous Channel Strategy
**Concept**: All channels launch at once for maximum immediate impact

**When to Use**:
- Major product launches with high anticipation
- Time-sensitive campaigns (flash sales, events)
- Competitive launches requiring market dominance
- Budget-rich campaigns prioritizing speed

**Channel Mix**:
- **Paid Media**: Meta, Google, LinkedIn, TikTok, Display (all active)
- **Owned Media**: Email blast, website takeover, blog posts
- **Earned Media**: PR, influencers, organic social

**Execution Requirements**:
- All creative assets ready before launch
- Coordinated go-live time across channels
- Unified tracking and measurement infrastructure
- Cross-functional team alignment

**Simultaneous Strategy Best Practices**:
- Establish single campaign manager for coordination
- Use project management tools (Asana, Monday, Trello) for timeline
- Conduct pre-launch checklist meetings
- Have contingency plans for platform issues

### Complementary Channel Strategy
**Concept**: Channels work together with different but complementary objectives

**Example Complementary Pairings**:

**Social (Awareness) + Search (Demand Capture)**:
- Social builds awareness and consideration
- Search captures intent created by social exposure
- Result: Higher search CTR from branded queries

**Display (Reach) + Email (Engagement)**:
- Display reaches cold audiences at scale
- Email engages known contacts with personalized messaging
- Result: Incremental conversions from multi-touch

**Video (Storytelling) + Retargeting (Conversion)**:
- Video tells compelling brand story
- Retargeting converts engaged video viewers
- Result: Higher retargeting conversion rates

**Content (Education) + Paid Search (Conversion)**:
- Content educates and builds organic traffic
- Paid search captures high-intent searchers
- Result: Lower CPCs from quality score boost

**Complementary Strategy Best Practices**:
- Define clear roles for each channel
- Avoid channel conflicts (e.g., competing on same keywords)
- Measure channel interactions and assists
- Optimize pairings based on performance data

### Surround Sound Strategy
**Concept**: Heavy, coordinated presence across all channels to dominate mindshare

**When to Use**:
- High-stakes launches with significant budget
- Competitive markets requiring market share capture
- Brand repositioning or major announcements
- Limited time windows (e.g., holiday season)

**Channel Saturation**:
- **Paid**: Meta, Google, LinkedIn, TikTok, Pinterest, Programmatic, CTV, Audio
- **Owned**: Email (multiple sends), website, app, SMS
- **Earned**: PR campaign, influencer network, organic social blitz
- **Offline**: TV, radio, OOH, events (if applicable)

**Execution Challenges**:
- Budget intensity (requires significant investment)
- Creative production needs (assets for every channel)
- Cross-team coordination complexity
- Risk of audience fatigue from over-exposure

**Surround Sound Best Practices**:
- Implement strict frequency capping across channels
- Use reach and frequency planning tools
- Deduplicate audience reach measurement
- Monitor sentiment for fatigue signals
- Plan for creative refresh mid-campaign

## Channel Sequencing Tactics

### Teaser → Launch → Sustain Pattern
**Teaser Phase** (1-2 weeks before launch):
- Limited channels: Organic social, email to core audience, PR outreach
- Mysterious/curiosity-building messaging
- Create waitlist or early access sign-ups
- Build anticipation and word-of-mouth

**Launch Phase** (Launch day + 1 week):
- All channels at full volume
- Direct messaging about product/offer
- Heavy media spend to maximize reach
- PR and influencer activations

**Sustain Phase** (Weeks 2-8+):
- Shift budget to high-performing channels
- Retargeting and nurture messaging
- User-generated content and reviews
- Ongoing optimization

### Always-On with Campaign Pulses
**Always-On Foundation**:
- Google Search brand and high-intent keywords (continuous)
- Facebook/Instagram retargeting (continuous)
- Email nurture programs (continuous)
- Organic social posting (continuous)

**Campaign Pulses**:
- Quarterly tentpole campaigns with multi-channel activation
- Seasonal pushes (holidays, industry events)
- Product launch blitzes
- Promotional periods (sales, offers)

**Benefits**:
- Maintain baseline presence and performance
- Spike reach and conversions during key periods
- More efficient than stop-start approach
- Better data continuity for optimization

### Testing & Learning Sequential Approach
**Phase 1: Test (Weeks 1-2)**
- Launch on 1-2 channels only (typically social + search)
- Test messaging, creative, audience, offers
- Gather learnings at lower budget
- Identify winning elements

**Phase 2: Validate (Weeks 3-4)**
- Expand to 2-3 additional channels
- Apply learnings from Phase 1
- Refine targeting and creative
- Validate performance consistency

**Phase 3: Scale (Weeks 5+)**
- Roll out to all planned channels
- Increase budgets on validated tactics
- Launch full creative suite
- Maximize reach and conversions

**Benefits**:
- Lower risk from failed campaigns
- Data-informed scaling decisions
- Budget efficiency (don't waste on unproven tactics)
- Continuous optimization

## Cross-Channel Coordination Techniques

### Unified Campaign Calendar
**Components**:
- Campaign start and end dates
- Channel-specific launch dates
- Creative asset deadlines
- Review and approval milestones
- Reporting and optimization check-ins

**Tools**:
- Google Calendar with color-coded channels
- Asana/Monday.com project timelines
- Shared spreadsheets with Gantt charts
- Marketing automation platform calendars

**Best Practices**:
- Share calendar with all stakeholders
- Update in real-time as dates shift
- Include dependencies (e.g., email depends on audience build)
- Add buffer time for delays

### Master Campaign Brief
**Document Structure**:
1. **Campaign Overview**: Objectives, target audience, key messages
2. **Channel Breakdown**: Which channels, why, expected contribution
3. **Creative Requirements**: Formats, sizes, messaging guidelines
4. **Budget Allocation**: Total budget and channel splits
5. **Timeline**: Key dates and milestones
6. **Success Metrics**: KPIs and targets by channel
7. **Roles & Responsibilities**: Who owns what

**Distribution**:
- Share with all channel owners before kickoff
- Use as reference document throughout campaign
- Update with learnings during campaign
- Archive for post-campaign review

### Channel-Specific Briefs from Master Plan
**Master Brief** (High-Level Strategy)
↓
**Facebook Brief** (Platform-Specific Tactics):
- Audience targeting parameters
- Creative specs (1080x1080, 1:1 ratio, 125 char primary text)
- Budget and bidding strategy
- Link to master brief for messaging framework

**Email Brief** (Platform-Specific Tactics):
- Segmentation strategy
- Subject line and preview text options
- Email design and layout
- Send timing and frequency

### Regular Sync Meetings
**Daily Standup** (5-10 min):
- Quick status updates from each channel owner
- Flag blocking issues or delays
- Align on priorities for the day

**Weekly Tactical Review** (30-45 min):
- Performance review by channel
- Optimization recommendations
- Creative refresh needs
- Budget reallocation discussions

**Bi-Weekly Strategic Review** (60 min):
- Campaign progress vs. goals
- Cross-channel insights and synergies
- Major pivots or strategic shifts
- Planning for upcoming phases

## Channel Conflict Resolution

### Search Query Overlap (Google Ads Internal Competition)
**Problem**: Multiple campaigns bidding on same keywords
**Solution**:
- Consolidate overlapping keywords into single campaign
- Use negative keywords to prevent cannibalization
- Prioritize campaigns by performance
- Implement campaign priority settings for Shopping

### Audience Overlap (Cross-Channel)
**Problem**: Same user seeing ads on multiple platforms simultaneously
**Solution**:
- Implement cross-channel frequency capping (via DMPs or CDPs)
- Exclude converters from ongoing campaigns
- Sequence messaging (see X on Facebook first, then retarget on Google)
- Create exclusion audiences between channels

### Budget Cannibalization
**Problem**: Channels competing for same finite budget
**Solution**:
- Define budget allocation framework upfront
- Use performance tiers (guaranteed, variable, experimental)
- Reallocate weekly based on performance
- Reserve budget for high-priority channels

### Message Inconsistency
**Problem**: Different messaging across channels confuses customers
**Solution**:
- Create messaging hierarchy (primary, supporting, proof points)
- Develop creative guidelines for adaptations
- Review all channel creative before launch
- Establish approval process for off-brand messaging

## Platform-Specific Coordination

### Meta + Google Retargeting Coordination
**Strategy**: Sequence retargeting to avoid fatigue

**Facebook/Instagram First** (Days 1-7):
- Retarget website visitors with carousel ads
- Show product benefits and social proof
- More visual, brand-focused messaging

**Google Display/YouTube Second** (Days 8-21):
- Retarget Meta-engaged users with display ads
- Show limited-time offer or urgency messaging
- More direct-response focused

**Google Search Last** (Days 22+):
- Capture branded search queries from exposure
- RLSA (Remarketing Lists for Search Ads) bid adjustments
- Direct conversion messaging

### Email + Paid Social Coordination
**Cold Acquisition**:
- Facebook Lead Ads to build email list
- Welcome email series introduces brand
- Retargeting ads to email engagers

**Customer Activation**:
- Email campaign announces new product
- Custom Audience from email opens → Facebook ads
- Coordinated messaging between email and ads

**Re-Engagement**:
- Email to lapsed customers with special offer
- Facebook ads to email non-openers with same offer
- Multi-touch approach increases conversion

### Search + Social Coordination
**Social Creates Demand**:
- Run awareness campaigns on Meta/TikTok
- Monitor branded search query volume increase
- Ensure Google Search campaigns capture demand

**Search Informs Social**:
- Analyze top-performing search keywords
- Use high-intent keywords in social ad copy
- Target social audiences based on search behavior

**Unified Messaging**:
- Align ad copy themes across search and social
- Use same offers and CTAs
- Consistent landing page experience`
            },
            {
                name: 'Campaign Synchronization Methods',
                content: `# Campaign Synchronization Methods

## Launch Timing Coordination

### Simultaneous Multi-Channel Launch
**Execution Checklist**:

**T-7 Days**:
- ✅ All creative assets finalized and approved
- ✅ Tracking pixels and UTM parameters implemented
- ✅ Landing pages live and tested
- ✅ Budgets confirmed and loaded
- ✅ Audiences built and uploaded

**T-3 Days**:
- ✅ Campaigns built in all platforms (paused)
- ✅ QA testing complete (links, tracking, creative)
- ✅ Backup plans for technical issues identified
- ✅ Team roles and responsibilities confirmed

**T-1 Day**:
- ✅ Final stakeholder review
- ✅ Press/PR coordinated for launch time
- ✅ Email sequences scheduled
- ✅ Social posts scheduled
- ✅ Monitoring dashboard prepared

**Launch Day (T-0)**:
- 09:00 AM: Unpause all campaigns
- 09:15 AM: Verify all campaigns delivering
- 10:00 AM: Check initial performance metrics
- 12:00 PM: Mid-day pulse check
- 05:00 PM: End-of-day review and any quick fixes

**T+1 Day**:
- Review first 24-hour performance
- Address any delivery or tracking issues
- Make initial optimization adjustments

### Staggered Channel Launch
**Week 1**: Email announcement to owned audience
- Build initial buzz with engaged customers
- Create retargeting audience for paid campaigns
- Gather early feedback and testimonials

**Week 2**: Organic social + Google Search
- Amplify message through free channels
- Capture branded search intent from email
- Test messaging and creative concepts

**Week 3**: Paid social (Facebook, Instagram, LinkedIn)
- Scale reach with paid amplification
- Retarget email and organic social engagers
- Drive awareness in cold audiences

**Week 4**: Display + Programmatic
- Expand reach further with display
- Retarget all prior touchpoints
- Frequency capping to prevent fatigue

**Benefits of Staggered Launch**:
- Lower initial risk and budget commitment
- Learn and optimize before full-scale launch
- Create momentum and build anticipation
- Easier troubleshooting with fewer simultaneous variables

## Messaging Hierarchy & Consistency

### Core Messaging Framework
**Primary Message** (Universal Across Channels):
- Single core value proposition
- Example: "The fastest way to grow your business online"
- Use in headlines, subject lines, primary ad text

**Supporting Messages** (Adapted by Channel):
- 3-5 key benefits or proof points
- Example: "Trusted by 10,000+ businesses", "Setup in 5 minutes", "No credit card required"
- Emphasize different points based on channel context

**Proof Points** (Channel-Specific):
- Stats, testimonials, case studies
- Adapt format to channel (text quote, video testimonial, data visualization)

**Call-to-Action** (Consistent Goal, Varied Wording):
- Same desired action across channels (e.g., sign up, buy now)
- Adapt CTA copy to channel norms:
  - Meta: "Learn More", "Shop Now", "Sign Up"
  - Google Search: "Get Started Today", "Claim Offer"
  - Email: "Activate Your Account", "Start Free Trial"

### Channel-Specific Messaging Adaptation

**Facebook/Instagram**:
- Visual-first messaging (bold, eye-catching)
- Social proof emphasis (likes, shares, comments)
- Conversational, less formal tone
- Storytelling over features
- Example: "Join 10K+ marketers growing faster with [Product]"

**Google Search**:
- Query-focused messaging (address search intent)
- Direct, benefits-led copy
- Include keywords from query
- Urgency and offers highlighted
- Example: "Marketing Automation Software - Free 14-Day Trial"

**LinkedIn**:
- Professional, B2B-focused messaging
- Thought leadership angle
- ROI and business outcomes emphasis
- Industry-specific language
- Example: "How Enterprise Marketers Scale Campaigns 10x"

**Email**:
- Personalized messaging (use name, company, behavior)
- Continuation of prior interactions
- Segmented messaging based on funnel stage
- Relationship-building tone
- Example: "Hi Sarah, here's how [Product] can help TechCo grow"

**Display**:
- Concise messaging (limited text space)
- High visual impact
- Brand recognition emphasis
- Retargeting reminders ("Come back for 20% off")
- Example: "[Logo] - The #1 Marketing Platform"

### Creative Consistency Across Channels
**Visual Identity**:
- Consistent brand colors, fonts, logo usage
- Unified design style (photography vs. illustration)
- Recognizable templates and layouts
- Same product imagery across channels

**Tonal Consistency**:
- Maintain brand voice (professional, playful, authoritative)
- Consistent personality (helpful, witty, serious)
- Aligned emotional appeal (aspirational, reassuring, exciting)

**Format Variations**:
- Adapt master creative to platform requirements
- Maintain core visual elements despite size differences
- Examples:
  - Master: 1920x1080 video
  - Facebook: 1:1 square crop
  - Stories: 9:16 vertical crop
  - Display: 300x250, 728x90, 160x600 variations

## Audience Synchronization

### Cross-Platform Audience Mapping

**Email List → Platform Custom Audiences**:
1. Export email list from ESP (Mailchimp, HubSpot)
2. Upload to Facebook Custom Audiences (hashed emails)
3. Upload to Google Customer Match (hashed emails)
4. Upload to LinkedIn Matched Audiences (hashed emails)
5. Result: Same audience targetable across platforms

**Website Visitors → Retargeting Audiences**:
1. Install pixels: Facebook Pixel, Google Analytics, LinkedIn Insight Tag
2. Create retargeting audiences on each platform
3. Segment by behavior:
   - Visited product page but didn't purchase
   - Added to cart but didn't complete checkout
   - Viewed 3+ pages (high engagement)
   - Spent 2+ minutes on site
4. Coordinate retargeting sequences across platforms

**CRM Data → Lookalike/Similar Audiences**:
1. Identify high-value customers in CRM (high LTV, repeat buyers)
2. Export and hash contact info
3. Create lookalike audiences:
   - Facebook Lookalike (1%, 3%, 5% of country)
   - Google Similar Audiences
   - LinkedIn Lookalike Audiences
4. Target expansion audiences with acquisition messaging

### Frequency Management Across Channels
**Problem**: User sees ads on Facebook, Instagram, Google Display, YouTube all in same day → fatigue

**Solutions**:

**1. Use Customer Data Platforms (CDPs)**:
- Segment CDP (free tier available)
- Tealium, mParticle, Adobe CDP
- Set global frequency caps (e.g., max 5 ads per user per day across all channels)

**2. Manual Exclusion Audiences**:
- Export converters from Google Ads weekly
- Upload as exclusion audience in Facebook
- Vice versa for Facebook converters
- Prevents ad waste on already-converted users

**3. Channel-Specific Frequency Caps**:
- Facebook: 3 impressions per week
- Google Display: 5 impressions per week
- LinkedIn: 2 impressions per week
- Total: ~10 impressions per week (acceptable range)

**4. Sequential Messaging Frequency**:
- Week 1: Show awareness ad (max 3x)
- Week 2: If engaged, show consideration ad (max 3x)
- Week 3: If still not converted, show conversion ad (max 3x)
- Prevent showing all messages simultaneously

## Budget Coordination

### Strategic Budget Allocation Framework

**Allocation by Funnel Stage**:
- **Awareness (40%)**: YouTube, Display, Social (cold audiences)
- **Consideration (30%)**: Social (engagement campaigns), Content Syndication
- **Conversion (30%)**: Search, Retargeting (Meta + Google)

**Allocation by Channel Maturity**:
- **Proven Channels (60%)**: Channels with profitable ROAS history
- **Growth Channels (30%)**: Channels with potential for scale
- **Experimental Channels (10%)**: New platform tests (e.g., TikTok pilot)

**Allocation by Campaign Goal**:
- **Brand Campaign**: 60% Video, 30% Display, 10% Social
- **Performance Campaign**: 50% Search, 30% Retargeting, 20% Social

### Dynamic Budget Reallocation
**Weekly Reallocation Process**:
1. **Monday**: Review prior week performance by channel
2. **Calculate**: Each channel's ROAS, CPA, contribution to conversions
3. **Identify**: Underperforming channels (below target CPA/ROAS)
4. **Shift**: Reallocate 10-20% of underperforming budget to top performers
5. **Implement**: Update budgets in platforms
6. **Monitor**: Track impact of reallocation

**Reallocation Rules**:
- Never cut a channel budget by more than 30% in one week (avoid signal loss)
- Always leave minimum budget for retargeting ($500-1000/month)
- Test for 2 weeks before making major shifts
- Consider external factors (seasonality, promotions) before cutting

**Performance-Based Triggers**:
- **Scale Up** (+20% budget): ROAS >1.5x target for 3+ consecutive days
- **Maintain** (no change): ROAS within 20% of target
- **Scale Down** (-20% budget): ROAS <0.5x target for 5+ consecutive days
- **Pause**: ROAS <0.2x target and no improvement after optimizations

### Shared Budget Pools
**When to Use**:
- Limited budget requiring maximum efficiency
- Want automatic reallocation to best-performing channels
- Testing multiple channels simultaneously

**Meta Campaign Budget Optimization (CBO)**:
- Set campaign-level budget
- Facebook automatically allocates to best ad sets
- Maintains at least minimum spend per ad set

**Google Shared Budgets**:
- Create shared budget pool
- Assign multiple campaigns to pool
- Google shifts budget to campaigns with best performance

**Custom Pacing Scripts**:
- Use Google Ads scripts or third-party tools
- Set rules for budget distribution
- Example: "Allocate 50% to best ROAS, 30% to second-best, 20% to rest"

## Performance Monitoring & Reporting

### Cross-Channel Dashboard
**Key Metrics to Track**:
1. **Reach & Frequency**:
   - Total unique reach (deduplicated across channels)
   - Average frequency across all channels
   - Reach overlap between channel pairs

2. **Engagement**:
   - Total clicks across all channels
   - Blended CTR
   - Engagement rate by channel

3. **Conversions**:
   - Total conversions
   - Blended CPA
   - Overall campaign ROAS
   - Conversion rate by channel

4. **Budget**:
   - Total spend across channels
   - Spend by channel (% of total)
   - Budget pacing (% of budget used vs. % of time elapsed)

**Dashboard Tools**:
- Google Data Studio (free, integrates Google Ads, Facebook, etc.)
- Supermetrics (paid, connects 100+ platforms to Google Sheets/Data Studio)
- Tableau, Power BI (enterprise BI tools)
- Custom dashboards (API integrations)

### Attribution Reporting
**Multi-Touch Attribution Models**:

**First-Touch**: Credit to first channel user engaged with
- Useful for understanding top-of-funnel drivers
- Example: User sees Facebook ad → Later converts via Search
- Facebook gets 100% credit

**Last-Touch**: Credit to last channel before conversion
- Default in most platforms
- Example: User sees Facebook ad → Later converts via Search
- Google Search gets 100% credit

**Linear**: Equal credit to all touchpoints
- Example: Facebook ad → Email → Search
- Each gets 33.3% credit

**Time Decay**: More credit to recent touchpoints
- Example: Facebook (1 week ago) 20% → Email (3 days ago) 30% → Search (today) 50%

**Position-Based (U-Shaped)**: 40% to first touch, 40% to last touch, 20% divided among middle
- Emphasizes both introduction and conversion drivers
- Example: Facebook 40% → Email 10% → Display 10% → Search 40%

**Data-Driven**: Algorithm determines credit based on actual conversion paths
- Available in Google Analytics and some attribution platforms
- Most accurate but requires significant data volume

**Tools for Attribution**:
- Google Analytics (Multi-Channel Funnels, Attribution)
- Facebook Attribution (deprecated but data still in Ads Manager)
- Third-party: SegmentStream, Rockerbox, AppsFlyer, Adjust`
            },
            {
                name: 'Cross-Channel Attribution',
                content: `# Cross-Channel Attribution & Measurement

## Attribution Fundamentals

### Why Cross-Channel Attribution Matters
**Single-Channel View** (Limited):
- Google Ads claims 500 conversions
- Facebook claims 450 conversions
- Email claims 300 conversions
- Total claimed: 1,250 conversions
- **Actual conversions**: 600 (channels overlap!)

**Multi-Channel View** (Accurate):
- Understand true contribution of each channel
- Identify channel synergies and assists
- Optimize budget based on real performance
- Avoid over-crediting last-click channels

### Attribution Window Considerations
**Click-Through Attribution Window**:
- Time between ad click and conversion
- Standard: 7 days (Facebook), 30 days (Google)
- Longer windows = more conversions attributed
- Shorter windows = more conservative attribution

**View-Through Attribution Window**:
- Time between ad impression (no click) and conversion
- Standard: 1 day (Facebook), 1 day (Google Display)
- Controversial: Did ad really influence conversion?
- Use sparingly for brand campaigns only

**Platform Defaults**:
- **Facebook**: 7-day click, 1-day view
- **Google Ads**: 30-day click, 1-day view
- **LinkedIn**: 30-day click, 1-day view
- **TikTok**: 7-day click, 1-day view

**Best Practice**:
- Use consistent windows across platforms for fair comparison
- Shorten windows for short purchase cycles (e.g., flash sales)
- Lengthen windows for long purchase cycles (e.g., B2B software)

## Multi-Touch Attribution Models

### First-Touch Attribution
**How It Works**:
- 100% credit to first marketing touchpoint

**When to Use**:
- Measuring top-of-funnel effectiveness
- Understanding what drives initial awareness
- Evaluating brand campaigns

**Example**:
User journey: YouTube ad → Blog post → Email → Google Search → Convert
**YouTube gets 100% credit**

**Pros**:
- Simple to understand
- Values awareness channels often under-credited
- Good for optimizing customer acquisition

**Cons**:
- Ignores nurturing and conversion touchpoints
- Overvalues early touchpoints that may not drive conversions alone

### Last-Touch Attribution (Platform Default)
**How It Works**:
- 100% credit to last marketing touchpoint before conversion

**When to Use**:
- Quick performance analysis (matches platform reporting)
- Short sales cycles where last touch matters most
- Evaluating bottom-funnel performance

**Example**:
User journey: YouTube ad → Blog post → Email → Google Search → Convert
**Google Search gets 100% credit**

**Pros**:
- Simple, matches platform default reporting
- Values conversion-driving channels
- Easy to optimize towards

**Cons**:
- Ignores earlier touchpoints that created demand
- Overvalues last-click channels (often search)
- Undervalues brand and awareness channels

### Linear (Equal Credit) Attribution
**How It Works**:
- Equal credit distributed across all touchpoints

**When to Use**:
- Want to value all touchpoints equally
- Holistic view of customer journey
- Multi-touch campaigns where all channels contribute

**Example**:
User journey: YouTube ad → Blog post → Email → Google Search → Convert
**Each gets 25% credit** (4 touchpoints)

**Pros**:
- Fair representation of all channels
- Simple calculation
- Avoids over-crediting first or last touch

**Cons**:
- Treats all touchpoints as equally important (may not be true)
- Doesn't account for timing or order of touchpoints

### Time-Decay Attribution
**How It Works**:
- More credit to touchpoints closer to conversion

**When to Use**:
- Value recent interactions more
- Long customer journeys with many touchpoints
- When proximity to conversion indicates higher influence

**Example**:
User journey: YouTube ad (30 days ago) → Email (14 days ago) → Google Search (today) → Convert

**Credit Distribution**:
- YouTube: 10%
- Email: 30%
- Google Search: 60%

**Decay Formula**: Credit = e^(-days since touchpoint / half-life)
- Half-life typically 7 days (credit halves every 7 days back)

**Pros**:
- Values recency, which often correlates with influence
- Still gives some credit to all touchpoints
- Good for long consideration cycles

**Cons**:
- May undervalue critical early awareness touchpoints
- Complex to calculate manually

### Position-Based (U-Shaped) Attribution
**How It Works**:
- 40% to first touch, 40% to last touch, 20% split among middle touches

**When to Use**:
- Value both awareness and conversion drivers
- Balanced view of full funnel
- Standard for many multi-channel campaigns

**Example**:
User journey: YouTube ad → Blog → Email → Display → Google Search → Convert

**Credit Distribution**:
- YouTube (first): 40%
- Blog: 5%
- Email: 5%
- Display: 5%
- Google Search (last): 40%
- LinkedIn: 5%

**Pros**:
- Balances first and last touch importance
- Recognizes awareness and conversion roles
- Still credits middle touchpoints

**Cons**:
- Arbitrary weighting (why 40-20-40?)
- May not reflect actual influence of touchpoints

### Data-Driven Attribution
**How It Works**:
- Algorithm analyzes conversion paths to determine credit
- Compares converting vs. non-converting paths
- Assigns credit based on statistical contribution

**When to Use**:
- Have sufficient data (1000+ conversions/month)
- Want most accurate attribution
- Have Google Analytics 360 or attribution platform

**Example**:
Algorithm finds:
- Paths with YouTube → Search convert 2x more than Search alone → YouTube gets higher credit
- Email doesn't increase conversion rate → Email gets low credit

**Pros**:
- Most accurate, data-driven
- Adapts to your specific customer journey
- No arbitrary weighting

**Cons**:
- Requires significant data volume
- "Black box" (hard to understand algorithm)
- Only available in premium tools

## Cross-Channel Measurement Techniques

### UTM Parameter Strategy
**UTM Parameters for Tracking**:
\`\`\`
https://example.com/product?utm_source=facebook&utm_medium=cpc&utm_campaign=spring_sale&utm_content=carousel_ad&utm_term=fitness_equipment
\`\`\`

**Parameter Breakdown**:
- **utm_source**: Traffic source (facebook, google, linkedin, email)
- **utm_medium**: Marketing medium (cpc, display, email, social, organic)
- **utm_campaign**: Campaign name (spring_sale, product_launch, brand_awareness)
- **utm_content**: Ad variation (carousel_ad, video_ad, headline_a)
- **utm_term**: Keyword (for paid search)

**Best Practices**:
- Use consistent naming conventions (lowercase, underscores)
- Create UTM parameter documentation/naming guide
- Use UTM builder tools (Google Campaign URL Builder)
- Track in spreadsheet to avoid duplicates
- Never use UTMs on internal links (breaks attribution)

**Example Naming Convention**:
\`\`\`
utm_source: platform name (facebook, google, linkedin)
utm_medium: channel type (cpc, display, email, social)
utm_campaign: date_campaign-name (2024q1_spring-sale)
utm_content: creative-variation (carousel-blue, video-testimonial)
\`\`\`

### Google Analytics Multi-Channel Funnels
**Access**: GA4 → Advertising → Attribution → Conversion Paths

**Conversion Path Report**:
- Shows sequence of channels leading to conversion
- Example: Display → Social → Paid Search → Direct (Convert)
- Analyze common paths to understand customer journey

**Time Lag Report**:
- Days between first interaction and conversion
- Helps set attribution windows appropriately
- Example: 60% convert within 7 days → Use 7-day window

**Path Length Report**:
- Number of interactions before conversion
- Example: 40% convert after 1 touch, 30% after 2-3 touches, 30% after 4+ touches
- Justifies multi-channel approach

**Assisted Conversions Report**:
- Shows channel contribution beyond last-click
- Metrics:
  - **Assisted Conversions**: Conversions where channel appeared before last click
  - **Last-Click Conversions**: Channel was final touchpoint
  - **Assisted/Last-Click Ratio**:
    - >1: Channel is top/mid-funnel (assists more than converts)
    - =1: Balanced role throughout funnel
    - <1: Channel is bottom-funnel (converts more than assists)

**Example Insights**:
- Display has 5:1 ratio → Great for awareness, poor for direct conversions
- Search has 0.2:1 ratio → Strong last-click converter, weak top-funnel
- Social has 1:1 ratio → Contributes throughout funnel

### Customer Data Platforms (CDPs)
**What CDPs Do**:
- Unify customer data from all sources (web, email, CRM, ads)
- Create single customer view across channels
- Enable cross-channel frequency capping
- Power advanced attribution

**Popular CDPs**:
- **Segment** (Free tier + paid, developer-friendly)
- **Tealium** (Enterprise, large data volumes)
- **mParticle** (Mobile-focused, good for apps)
- **Adobe Real-Time CDP** (Enterprise, integrates with Adobe stack)
- **Salesforce CDP** (Enterprise, integrates with Salesforce)

**CDP Implementation**:
1. Install CDP tracking code on website
2. Connect data sources (Facebook Ads, Google Ads, Email ESP, CRM)
3. Define user identity resolution (email, device ID, user ID)
4. Create unified customer profiles
5. Send audiences back to ad platforms
6. Measure cross-channel performance

**Benefits**:
- Deduplicated reach and frequency measurement
- True cross-channel attribution
- Unified customer view for personalization
- Better audience targeting

### Incrementality Testing
**Concept**: Measure incremental impact of channel vs. baseline

**Holdout Test Design**:
1. **Control Group**: Exclude from channel (e.g., no Facebook ads)
2. **Test Group**: Expose to channel (see Facebook ads)
3. **Measure**: Conversion rate difference between groups
4. **Calculate**: Incremental conversions from Facebook

**Example**:
- Control group (no Facebook): 1000 users, 50 conversions (5% CR)
- Test group (Facebook ads): 1000 users, 80 conversions (8% CR)
- **Incremental lift**: 8% - 5% = 3% (or 30 conversions attributable to Facebook)

**Geo-Based Testing**:
- Control: Don't run ads in Denver, Phoenix, Atlanta
- Test: Run ads in similar cities (Austin, Nashville, Portland)
- Compare conversion rates between control and test cities
- More practical than user-level holdouts

**Brand Lift Studies**:
- Survey-based incrementality measurement
- Control: Users not exposed to ads
- Test: Users exposed to ads
- Survey both groups on brand awareness, consideration, purchase intent
- Measure lift in brand metrics

**When to Use Incrementality**:
- Validate attribution models
- Understand true channel contribution
- Justify budget for brand/awareness channels
- Test new channel effectiveness

## Channel Interaction Analysis

### Channel Overlap & Synergy
**Overlap Analysis**:
- What % of users are exposed to multiple channels?
- Example: 40% of Facebook users also see Google ads

**Synergy Detection**:
- Do users exposed to both channels convert at higher rates?
- Example: Facebook-only CR = 2%, Google-only CR = 3%, Both CR = 6%
- Synergy multiplier = 6% / (2% + 3%) = 1.2x

**Common Synergies**:
- **Video + Search**: Video awareness → Branded search increase
- **Social + Email**: Social engagement → Higher email open rates
- **Display + Retargeting**: Display reach → Retargeting performance improvement

**Optimization Based on Synergies**:
- Invest more in channel pairs with positive synergies
- Coordinate timing (launch Video before Search spike expected)
- Align messaging between synergistic channels

### Conversion Path Analysis
**Top Conversion Paths** (Google Analytics):
1. Paid Search → Convert (40% of conversions)
2. Paid Social → Paid Search → Convert (15%)
3. Display → Paid Social → Paid Search → Convert (10%)
4. Email → Paid Search → Convert (8%)
5. Organic Social → Paid Search → Convert (5%)

**Insights**:
- Paid Search is critical conversion driver (in 78% of paths)
- Paid Social often precedes Paid Search (awareness → demand capture)
- Display is top-of-funnel (appears early in longer paths)
- Email re-engages known users (mid-funnel)

**Optimization**:
- Ensure Paid Search always has budget (critical converter)
- Coordinate Paid Social and Search messaging
- Use Display to fuel retargeting pipelines
- Trigger email after Social engagement

### Cross-Channel Frequency & Recency
**Frequency Analysis**:
- How many times did user see ads across all channels before converting?
- Sweet spot typically 5-10 total impressions
- <5: Insufficient awareness
- >15: Potential fatigue, diminishing returns

**Recency Analysis**:
- Time since last ad exposure before conversion
- Most conversions within 7 days of last touchpoint
- Optimize for consistent presence vs. heavy burst

**Optimization**:
- Implement cross-channel frequency caps (5-10 impressions/week)
- Maintain recency with always-on programs
- Rotate channels to maintain freshness`
            },
            {
                name: 'Coordination Best Practices',
                content: `# Multi-Channel Coordination Best Practices

## Team Structure & Roles

### Cross-Functional Campaign Team
**Campaign Lead / Orchestrator**:
- Owns overall campaign strategy and goals
- Coordinates cross-channel activities
- Final decision-maker on budget allocation
- Facilitates sync meetings and communication
- Reports to stakeholders

**Channel Specialists**:
- **Paid Social Lead**: Meta, LinkedIn, TikTok, Pinterest
- **Paid Search Lead**: Google Ads, Microsoft Ads
- **Programmatic Lead**: Display, video, CTV
- **Email Lead**: ESP management, segmentation, automation
- **Organic Social Lead**: Community management, content calendar
- **SEO/Content Lead**: Blog, content marketing, SEO

**Supporting Roles**:
- **Creative Lead**: Develops master creative, adapts for channels
- **Data Analyst**: Performance tracking, attribution, reporting
- **CRM Manager**: Audience management, segmentation
- **Project Manager**: Timeline management, task tracking

### RACI Matrix for Campaign Coordination
**R** = Responsible (does the work)
**A** = Accountable (final approval)
**C** = Consulted (provides input)
**I** = Informed (kept in the loop)

**Example RACI**:
| Task | Campaign Lead | Paid Social | Paid Search | Creative | Analyst |
|------|---------------|-------------|-------------|----------|---------|
| Campaign strategy | A | C | C | C | C |
| Budget allocation | A | I | I | I | I |
| Facebook ads setup | I | R/A | I | C | I |
| Google ads setup | I | I | R/A | C | I |
| Creative development | C | C | C | R/A | I |
| Performance reporting | C | I | I | I | R/A |
| Optimization decisions | A | R | R | I | C |

### Communication Protocols
**Daily Standups** (Optional, for high-stakes campaigns):
- 15 minutes, same time daily
- Round-robin status updates (2 min each)
- Flag blocking issues only
- Keep it tactical, not strategic

**Weekly Tactical Meetings**:
- 45 minutes, same day/time weekly
- Agenda:
  1. Performance review by channel (15 min)
  2. Optimization discussion (15 min)
  3. Creative refresh needs (10 min)
  4. Next week priorities (5 min)
- Actionable outcomes required

**Bi-Weekly Strategic Reviews**:
- 60 minutes, leadership attendance
- Agenda:
  1. Campaign progress vs. goals (20 min)
  2. Cross-channel insights (20 min)
  3. Budget reallocation discussion (15 min)
  4. Strategic pivots if needed (5 min)

**Slack/Teams Channels**:
- **#campaign-[name]**: Campaign-specific discussion
- **#campaign-alerts**: Urgent issues, performance alerts
- **#campaign-wins**: Celebrate successes, build morale

**Shared Documentation**:
- **Google Drive/SharePoint folder**: Single source of truth
- **Master campaign brief**: Strategy, goals, timeline
- **Creative asset library**: All approved assets
- **Performance tracker**: Live dashboard or sheet

## Creative Production & Approval

### Master Creative Development
**Concept Phase**:
1. Creative brief based on campaign strategy
2. Concept development (3-5 concepts)
3. Stakeholder review and concept selection
4. Revisions based on feedback

**Production Phase**:
1. Develop master assets (hero creative)
   - Master video (high-resolution, horizontal)
   - Master imagery (high-resolution, minimal text)
   - Master copy (messaging framework)
2. Create channel-specific adaptations
3. Test assets for compliance and rendering

**Channel Adaptation Matrix**:
| Asset | Facebook | Instagram | Google Display | YouTube | Email |
|-------|----------|-----------|----------------|---------|-------|
| Video | 1:1 square (1080x1080) | 9:16 vertical (1080x1920) | 300x250 (gif) | 16:9 horizontal (1920x1080) | Thumbnail + link |
| Image | 1080x1080 | 1080x1350 (4:5) | 300x250, 728x90 | Thumbnail (1280x720) | 600px width |
| Copy | 125 char primary text | 125 char | 30 char headline | 100 char description | 50 char subject line |

### Approval Workflow
**Single-Stage Approval** (Small teams):
- Creator → Campaign Lead → Approve/Revise

**Multi-Stage Approval** (Larger organizations):
- Creator → Channel Lead → Campaign Lead → Legal/Compliance → Brand Team → Final Approval

**Approval Tools**:
- **Frame.io**: Video review with timestamp comments
- **Figma**: Design review and collaboration
- **Google Docs**: Copy review with suggestions
- **Asana/Monday**: Approval workflow tracking

**Approval SLAs**:
- Initial review: 2 business days
- Revisions: 1 business day
- Final approval: 1 business day
- Total time: 4-5 business days

**Emergency Approval Process**:
- For time-sensitive campaigns or urgent fixes
- Abbreviated review (Campaign Lead + one stakeholder)
- Document in approval tracker with "expedited" flag

## Technology Stack for Coordination

### Essential Tools
**Campaign Management**:
- **Google Ads, Meta Ads Manager, LinkedIn Campaign Manager**: Platform interfaces
- **Third-party tools**: Marin, Kenshoo, Skai (cross-platform management)

**Project Management**:
- **Asana, Monday.com, Trello**: Task and timeline management
- **Google Sheets/Excel**: Budget tracking, calendars
- **Google Drive/SharePoint**: Document management

**Analytics & Reporting**:
- **Google Analytics 4**: Website analytics and attribution
- **Google Data Studio (Looker Studio)**: Dashboard creation
- **Supermetrics, Windsor.ai**: Data connectors for cross-platform reporting

**Audience & Data**:
- **Customer Data Platform**: Segment, Tealium, mParticle
- **Data warehouse**: BigQuery, Redshift, Snowflake
- **Tag Management**: Google Tag Manager

**Communication**:
- **Slack, Microsoft Teams**: Team communication
- **Zoom, Google Meet**: Video meetings
- **Email**: External stakeholder communication

### Integration & Automation
**API Integrations**:
- Connect platforms to data warehouse
- Automated data pulls (daily/hourly)
- Unified reporting across channels

**Automation Scripts**:
- **Google Ads Scripts**: Automate bid adjustments, budget pacing, alerts
- **Facebook Rules**: Automated campaign actions based on performance
- **Zapier/Make**: Connect tools without coding (e.g., Slack alerts from Google Sheets)

**Example Automation**:
\`\`\`javascript
// Google Ads Script: Budget pacing alert
function main() {
  var campaign = AdsApp.campaigns().withCondition("Status = ENABLED").get();
  while (campaign.hasNext()) {
    var c = campaign.next();
    var budget = c.getBudget().getAmount();
    var cost = c.getStatsFor("THIS_MONTH").getCost();
    var daysElapsed = new Date().getDate();
    var daysInMonth = 30;
    var expectedSpend = (budget * daysElapsed) / daysInMonth;

    if (cost > expectedSpend * 1.2) {
      // Alert: Overspending
      MailApp.sendEmail("team@example.com", "Budget Alert: " + c.getName(), "Campaign is 20% over pacing.");
    }
  }
}
\`\`\`

## Common Pitfalls & Solutions

### Pitfall 1: Channel Silos
**Problem**: Each channel team operates independently, no coordination
**Symptoms**:
- Different messaging across channels
- Budget conflicts and cannibalization
- Duplicated efforts, wasted resources

**Solution**:
- Appoint Campaign Lead with authority across channels
- Regular cross-channel sync meetings
- Shared KPIs and goals (not just channel-specific)
- Unified reporting and performance view

### Pitfall 2: Over-Coordination
**Problem**: Too many meetings, approvals, stakeholders → slow execution
**Symptoms**:
- Delays in campaign launches
- Missed market opportunities
- Team frustration and burnout

**Solution**:
- Streamline approval workflows (maximum 2-3 approvers)
- Set fast SLAs (48 hours for approvals)
- Empower channel leads to make tactical decisions
- Reserve strategic reviews for major decisions only

### Pitfall 3: Attribution Disputes
**Problem**: Channels fight over credit for conversions
**Symptoms**:
- "My channel drove that conversion!" debates
- Budget allocation conflicts
- Focus on attribution over performance

**Solution**:
- Agree on attribution model upfront (position-based, data-driven)
- Use incrementality tests to validate contribution
- Focus on blended metrics (overall campaign ROAS, not just channel)
- Celebrate cross-channel wins, not individual channel wins

### Pitfall 4: Creative Inconsistency
**Problem**: Different messaging and branding across channels
**Symptoms**:
- Confusing customer experience
- Weak brand recognition
- Lower campaign effectiveness

**Solution**:
- Develop master creative and messaging framework
- Require all channel assets to adapt from master
- Creative review by Campaign Lead before launch
- Visual brand guidelines strictly enforced

### Pitfall 5: Technology Overload
**Problem**: Too many tools, platforms, dashboards
**Symptoms**:
- Data scattered across tools
- Team spends more time on tools than strategy
- High tool costs with low utilization

**Solution**:
- Audit tool stack quarterly, eliminate redundant tools
- Prioritize integration and automation
- Consolidate reporting into single dashboard
- Train team on essential tools only

## Optimization Strategies

### Cross-Channel A/B Testing
**Test Messaging Across Channels**:
1. Develop 2 messaging variants (A vs. B)
2. Split audiences equally across all channels
3. Run both messages simultaneously on each channel
4. Measure blended performance (all channels combined)
5. Winner becomes master messaging for all channels

**Test Channel Sequence**:
- **Variant A**: Social → Email → Search
- **Variant B**: Email → Social → Search
- Measure which sequence drives better overall conversion rate

**Test Budget Allocation**:
- **Variant A**: 50% Search, 30% Social, 20% Display
- **Variant B**: 30% Search, 50% Social, 20% Display
- Measure which allocation achieves better ROAS

### Seasonal Coordination Tactics
**Holiday Campaign Coordination**:
1. **Pre-Holiday (4-6 weeks before)**:
   - Build awareness: Video, display, social (broad audiences)
   - Build email list: Lead gen campaigns
   - Create retargeting pools

2. **Early Holiday (2-3 weeks before)**:
   - Shift to consideration: Retargeting, email nurture
   - Highlight product benefits and reviews
   - Introduce early-bird offers

3. **Peak Holiday (1 week before and during)**:
   - Full conversion push: Search, retargeting, email (all-in)
   - Urgency messaging (limited stock, ends soon)
   - Daily budget monitoring and reallocation

4. **Post-Holiday (1-2 weeks after)**:
   - Clearance and extensions
   - Thank-you emails and reviews requests
   - Retargeting non-converters with last-chance offers

### Dynamic Creative Optimization (DCO)
**What It Is**: Automatically assemble ads from modular components based on audience

**Components**:
- Headlines (5 variations)
- Images (5 variations)
- Descriptions (5 variations)
- CTAs (3 variations)
- = 375 possible ad combinations

**How It Works**:
1. Upload all component variations to platform
2. Platform's algorithm tests combinations
3. Serves best-performing combinations to each user
4. Continuously optimizes based on performance

**Platforms Supporting DCO**:
- Google Responsive Search Ads
- Google Responsive Display Ads
- Facebook Dynamic Ads
- LinkedIn Dynamic Ads

**Benefits**:
- Personalization at scale
- Continuous optimization
- Reduced creative production needs

**Best Practices**:
- Ensure all components are compatible (visually, tonally)
- Provide diverse variations (don't just tweak wording)
- Monitor performance of individual components
- Pause low-performing variations

### Real-Time Optimization
**Hourly/Daily Performance Checks**:
- Monitor key metrics: spend pacing, CPA, ROAS, conversions
- Flag significant changes (>20% variance from target)
- Make quick adjustments: bids, budgets, pause/unpause

**Automated Rules & Scripts**:
- Pause ads with CPA >2x target after $500 spend
- Increase budget by 20% for campaigns with ROAS >1.5x target
- Send Slack alert if daily spend exceeds budget by 30%

**Rapid Testing & Iteration**:
- Launch new ad variations every 3-5 days
- Test one variable at a time (headline, image, audience)
- Scale winners quickly (24-48 hours)
- Cut losers decisively (no prolonged underperformers)`
            }
        ],
        outputs: [
            {
                outputName: 'campaign_coordination_plan',
                functionName: 'generate_campaign_coordination_plan',
                functionDescription: 'Generate a comprehensive multi-channel campaign coordination plan including channel strategy, timing, messaging hierarchy, budget allocation, and team responsibilities.',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        campaign_overview: {
                            type: 'object',
                            properties: {
                                campaign_name: { type: 'string' },
                                campaign_objectives: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    description: 'Primary campaign goals'
                                },
                                target_audience: { type: 'string', description: 'Primary target audience description' },
                                duration: { type: 'string', description: 'Campaign duration (e.g., "8 weeks")' },
                                total_budget: { type: 'number', description: 'Total budget across all channels' }
                            },
                            required: ['campaign_name', 'campaign_objectives', 'total_budget']
                        },
                        channel_strategy: {
                            type: 'object',
                            properties: {
                                orchestration_model: {
                                    type: 'string',
                                    enum: ['sequential', 'simultaneous', 'complementary', 'surround_sound', 'hybrid'],
                                    description: 'Overall channel orchestration approach'
                                },
                                rationale: { type: 'string', description: 'Why this orchestration model was chosen' }
                            },
                            required: ['orchestration_model', 'rationale']
                        },
                        channel_plan: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    channel: { type: 'string', description: 'Channel name (e.g., "Meta Ads", "Google Search")' },
                                    role: { type: 'string', description: 'Role in campaign (awareness, consideration, conversion)' },
                                    launch_timing: { type: 'string', description: 'When channel activates (e.g., "Week 1", "Day 1")' },
                                    budget_allocation: { type: 'number', description: 'Budget amount for this channel' },
                                    budget_percentage: { type: 'number', description: 'Percentage of total budget' },
                                    key_audiences: {
                                        type: 'array',
                                        items: { type: 'string' },
                                        description: 'Target audiences for this channel'
                                    },
                                    success_metrics: {
                                        type: 'array',
                                        items: { type: 'string' },
                                        description: 'KPIs for this channel'
                                    },
                                    channel_owner: { type: 'string', description: 'Team member responsible' }
                                },
                                required: ['channel', 'role', 'launch_timing', 'budget_allocation']
                            }
                        },
                        messaging_framework: {
                            type: 'object',
                            properties: {
                                primary_message: { type: 'string', description: 'Core campaign message across all channels' },
                                supporting_messages: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    description: '3-5 supporting messages or proof points'
                                },
                                channel_adaptations: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            channel: { type: 'string' },
                                            messaging_approach: { type: 'string', description: 'How message is adapted for this channel' }
                                        }
                                    }
                                },
                                call_to_action: { type: 'string', description: 'Primary CTA across channels' }
                            },
                            required: ['primary_message', 'call_to_action']
                        },
                        timeline: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    phase: { type: 'string', description: 'Campaign phase (e.g., "Awareness", "Launch", "Optimization")' },
                                    start_date: { type: 'string', description: 'Phase start date' },
                                    end_date: { type: 'string', description: 'Phase end date' },
                                    active_channels: {
                                        type: 'array',
                                        items: { type: 'string' },
                                        description: 'Channels active during this phase'
                                    },
                                    key_activities: {
                                        type: 'array',
                                        items: { type: 'string' },
                                        description: 'Major activities in this phase'
                                    },
                                    milestones: {
                                        type: 'array',
                                        items: { type: 'string' },
                                        description: 'Key milestones and deliverables'
                                    }
                                },
                                required: ['phase', 'start_date', 'active_channels']
                            }
                        },
                        audience_coordination: {
                            type: 'object',
                            properties: {
                                cross_platform_audiences: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            audience_name: { type: 'string' },
                                            description: { type: 'string' },
                                            platforms: {
                                                type: 'array',
                                                items: { type: 'string' },
                                                description: 'Platforms where this audience will be targeted'
                                            },
                                            size_estimate: { type: 'string', description: 'Estimated audience size' }
                                        }
                                    }
                                },
                                frequency_management: { type: 'string', description: 'Cross-channel frequency capping strategy' },
                                exclusion_strategy: { type: 'string', description: 'How to handle converters and prevent overlap' }
                            }
                        },
                        attribution_framework: {
                            type: 'object',
                            properties: {
                                attribution_model: {
                                    type: 'string',
                                    enum: ['first_touch', 'last_touch', 'linear', 'time_decay', 'position_based', 'data_driven'],
                                    description: 'Attribution model for measuring channel contribution'
                                },
                                attribution_window: { type: 'string', description: 'Attribution window (e.g., "7-day click, 1-day view")' },
                                measurement_tools: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    description: 'Tools used for attribution and measurement'
                                }
                            },
                            required: ['attribution_model']
                        },
                        team_responsibilities: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    role: { type: 'string', description: 'Role name (e.g., "Campaign Lead", "Paid Social Specialist")' },
                                    name: { type: 'string', description: 'Team member name (if known)' },
                                    responsibilities: {
                                        type: 'array',
                                        items: { type: 'string' },
                                        description: 'Key responsibilities for this role'
                                    }
                                },
                                required: ['role', 'responsibilities']
                            }
                        },
                        optimization_plan: {
                            type: 'object',
                            properties: {
                                review_cadence: { type: 'string', description: 'How often to review performance (e.g., "Weekly")' },
                                reallocation_triggers: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    description: 'Conditions that trigger budget reallocation'
                                },
                                success_criteria: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    description: 'Criteria for campaign success'
                                }
                            }
                        },
                        risk_mitigation: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    risk: { type: 'string', description: 'Potential risk or challenge' },
                                    mitigation_strategy: { type: 'string', description: 'How to prevent or address this risk' }
                                },
                                required: ['risk', 'mitigation_strategy']
                            }
                        }
                    },
                    required: ['campaign_overview', 'channel_strategy', 'channel_plan', 'messaging_framework', 'timeline']
                }, null, 2)
            },
            {
                outputName: ':plotly:',
                functionName: 'generate_coordination_visualizations',
                functionDescription: 'Generate interactive Plotly visualizations for multi-channel campaign coordination including customer journey maps, channel timeline Gantt charts, budget allocation charts, and attribution waterfall diagrams.',
                outputType: 'custom',
                jsonSchema: JSON.stringify({
                    type: 'object',
                    properties: {
                        chart_type: {
                            type: 'string',
                            enum: ['customer_journey_map', 'gantt_timeline', 'budget_allocation_pie', 'budget_allocation_treemap', 'attribution_waterfall', 'channel_overlap_venn', 'funnel_by_channel', 'multi_chart_dashboard'],
                            description: 'Type of coordination visualization to generate'
                        },
                        data: {
                            type: 'object',
                            description: 'Plotly-compatible data structure'
                        },
                        layout: {
                            type: 'object',
                            description: 'Plotly layout configuration'
                        }
                    },
                    required: ['chart_type', 'data', 'layout']
                }, null, 2)
            }
        ]
    }
];

// Make templates globally accessible
if (typeof window !== 'undefined') {
    window.agentTemplates = agentTemplates;
}
