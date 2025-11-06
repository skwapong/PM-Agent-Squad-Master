KNOWLEDGE BASE 11: CAMPAIGN PLAN REPORT TEMPLATE - SYSTEM INSTRUCTIONS

This knowledge base provides detailed instructions for generating campaign plan reports as complete React components with print-to-PDF functionality.

═══════════════════════════════════════════════════════════════════════════════════
CRITICAL: COMPLETE COMPONENT OUTPUT REQUIRED
═══════════════════════════════════════════════════════════════════════════════════

**YOU MUST OUTPUT A COMPLETE, READY-TO-USE REACT COMPONENT FILE.** Do NOT output just data.

### Quick Workflow

1. Start with the template structure
2. Find the data section: Locate the `campaignData` object
3. Replace ONLY the data: Fill in actual campaign plan details
4. Keep everything else: Do NOT modify imports, icons, functions, or JSX
5. Output the complete file: From `import` to `export default`

### Technical Requirements
- Available Libraries: React (standard)
- Icons: Inline SVG components (no external dependencies)
- Styling: Inline styles and <style> tag
- No External Dependencies: Component must be self-contained

═══════════════════════════════════════════════════════════════════════════════════
1. CAMPAIGN DATA STRUCTURE
═══════════════════════════════════════════════════════════════════════════════════

Your campaign plan output MUST follow this exact structure:

```javascript
const campaignData = {
  // Campaign metadata
  metadata: {
    campaignName: "Campaign title",
    client: "Client or brand name",
    datePrepared: "YYYY-MM-DD",
    duration: "Campaign timeline (e.g., Q1 2025, 3 months)",
    preparedBy: "Agency or team name"
  },

  // Executive summary section
  executiveSummary: {
    overview: "3-5 sentence high-level campaign overview",
    objectives: [
      "Primary objective 1",
      "Primary objective 2",
      "Primary objective 3"
    ],
    totalBudget: "$XX,XXX/month or total budget",
    targetAudience: "Target audience description",
    expectedOutcomes: [
      "Expected outcome 1",
      "Expected outcome 2",
      "Expected outcome 3"
    ],
    keyMetrics: [
      { label: "Metric name", value: "Value", context: "Brief explanation" },
      { label: "Metric name", value: "Value", context: "Brief explanation" },
      { label: "Metric name", value: "Value", context: "Brief explanation" },
      { label: "Metric name", value: "Value", context: "Brief explanation" }
    ]
  },

  // Strategic overview
  strategicOverview: {
    businessObjectives: [
      "Business objective 1",
      "Business objective 2",
      "Business objective 3"
    ],
    targetPersonas: [
      {
        personaName: "Persona 1 name",
        demographics: "Age, location, income, occupation",
        painPoints: ["Pain point 1", "Pain point 2", "Pain point 3"],
        motivations: ["Motivation 1", "Motivation 2", "Motivation 3"]
      }
    ],
    uniqueValueProposition: "Clear UVP statement",
    competitivePositioning: "Positioning statement and differentiation"
  },

  // Platform strategy array
  platformStrategy: [
    {
      platform: "Platform name (Meta, Google Ads, Pinterest, TikTok)",
      rationale: "Why this platform is recommended",
      objectives: [
        "Platform-specific objective 1",
        "Platform-specific objective 2"
      ],
      targetingApproach: "Audience targeting strategy for this platform",
      keyTactics: [
        "Tactic 1",
        "Tactic 2",
        "Tactic 3"
      ]
    }
  ],

  // Budget allocation
  budgetAllocation: {
    totalBudget: {
      monthly: "$XX,XXX",
      totalCampaign: "$XXX,XXX",
      durationMonths: 3
    },
    funnelBreakdown: {
      awareness: "40% ($X,XXX)",
      consideration: "30% ($X,XXX)",
      conversion: "30% ($X,XXX)"
    },
    platformDistribution: [
      {
        platform: "Platform name",
        amount: "$X,XXX",
        percentage: "XX%",
        rationale: "Reason for this budget allocation"
      }
    ]
  },

  // Creative direction
  creativeDirection: {
    keyMessages: [
      "Message 1",
      "Message 2",
      "Message 3"
    ],
    visualThemes: [
      "Visual theme 1",
      "Visual theme 2"
    ],
    toneAndVoice: "Brand tone and voice description",
    adFormats: [
      {
        platform: "Platform name",
        formats: ["Format 1", "Format 2", "Format 3"],
        specifications: "Technical specs (sizes, durations, etc.)"
      }
    ],
    ctaStrategy: [
      "CTA approach 1",
      "CTA approach 2"
    ]
  },

  // Implementation timeline
  implementationTimeline: [
    {
      phase: "Phase name",
      weekRange: "Weeks 1-4",
      milestones: [
        "Milestone 1",
        "Milestone 2",
        "Milestone 3"
      ],
      deliverables: [
        "Deliverable 1",
        "Deliverable 2"
      ]
    }
  ],

  // Performance framework
  performanceFramework: {
    primaryKPI: "Main success metric",
    secondaryKPIs: [
      "Secondary KPI 1",
      "Secondary KPI 2",
      "Secondary KPI 3"
    ],
    platformMetrics: [
      {
        platform: "Platform name",
        metrics: ["Metric 1", "Metric 2", "Metric 3"],
        targets: {
          "Metric 1": "Target value",
          "Metric 2": "Target value"
        }
      }
    ],
    reportingCadence: "Reporting frequency and schedule"
  },

  // Next steps and actions
  nextSteps: {
    immediateActions: [
      "Immediate action 1",
      "Immediate action 2",
      "Immediate action 3"
    ],
    week1Priorities: [
      "Week 1 priority 1",
      "Week 1 priority 2"
    ],
    resourceRequirements: [
      "Required resource 1",
      "Required resource 2"
    ],
    risks: [
      "Risk 1 and mitigation strategy",
      "Risk 2 and mitigation strategy"
    ]
  }
};
```

═══════════════════════════════════════════════════════════════════════════════════
2. COMPONENT STRUCTURE REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════════════

### Required Imports
```javascript
import React from 'react';
```

### Icon Components (Include All)
Create simple inline SVG components for:
- TrendingUpIcon (for metrics/growth)
- TargetIcon (for objectives/goals)
- UsersIcon (for audience/personas)
- DollarSignIcon (for budget)
- CalendarIcon (for dates/timeline)
- CheckCircleIcon (for completed items)
- AlertCircleIcon (for warnings/risks)

Example:
```javascript
const TrendingUpIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
```

### Print Handler Function
```javascript
const handlePrint = () => {
  window.print();
};
```

═══════════════════════════════════════════════════════════════════════════════════
3. STYLING REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════════════

### Include Style Tag
```javascript
<style>{`
  @media print {
    .no-print { display: none !important; }
    .print\\:break-inside-avoid { break-inside: avoid; }
    .print\\:break-before-page { break-before: page; }
    body { margin: 1in; }
    @page { margin: 1in; }
  }
  table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
  th { background-color: #1e40af; color: white; font-weight: bold; }
  tr:nth-child(even) { background-color: #f9fafb; }
  h1 { color: #1e40af; font-size: 28px; margin: 0; }
  h2 { color: #1e40af; font-size: 22px; margin-top: 30px; border-bottom: 2px solid #1e40af; padding-bottom: 8px; }
  h3 { color: #374151; font-size: 18px; margin-top: 20px; }
`}</style>
```

### Color Scheme
- Primary Blue: #1e40af
- Dark Gray: #374151, #1f2937
- Light Gray: #f9fafb, #e5e7eb
- Green (success): #10b981, #f0fdf4
- Amber (warning): #f59e0b, #fffbeb
- White: #ffffff

═══════════════════════════════════════════════════════════════════════════════════
4. DOCUMENT SECTIONS (IN ORDER)
═══════════════════════════════════════════════════════════════════════════════════

### 1. Header Section
```jsx
<div style={{ borderBottom: '4px solid #1e40af', background: 'linear-gradient(to right, #eff6ff, #ffffff)', padding: '32px' }}>
  <h1>{campaignData.metadata.campaignName}</h1>
  <p style={{ color: '#6b7280', fontSize: '16px' }}>{campaignData.metadata.client}</p>
  <p style={{ color: '#9ca3af', fontSize: '14px' }}>
    Prepared: {campaignData.metadata.datePrepared} | Duration: {campaignData.metadata.duration}
  </p>
</div>
```

### 2. Executive Summary Section
- Blue highlight box for overview
- Key metrics in 2x2 grid
- Objectives as bulleted list
- Expected outcomes
- Green box for primary recommendation

### 3. Strategic Overview Section
- Business objectives list
- Persona cards (with demographics, pain points, motivations)
- UVP statement
- Competitive positioning

### 4. Platform Strategy Section
- Platform cards in grid
- Each card: platform name, rationale, objectives, tactics
- Targeting approach per platform

### 5. Budget Allocation Section
- Total budget summary
- Funnel breakdown (awareness/consideration/conversion)
- Platform distribution table with zebra striping

### 6. Creative Direction Section
- Key messages
- Visual themes
- Tone and voice
- Ad formats by platform
- CTA strategy

### 7. Implementation Timeline Section
- Phase breakdown with week ranges
- Milestones checklist
- Deliverables list

### 8. Performance Framework Section
- Primary KPI highlighted
- Secondary KPIs list
- Platform metrics table
- Reporting cadence

### 9. Next Steps Section
- Immediate actions (highlighted box)
- Week 1 priorities
- Resource requirements
- Risks and mitigation

### 10. Footer Section
```jsx
<div style={{ backgroundColor: '#f9fafb', padding: '24px', textAlign: 'center', color: '#6b7280' }}>
  <p>Campaign Plan Generated by {campaignData.metadata.preparedBy} | {new Date().toLocaleDateString()}</p>
</div>
```

═══════════════════════════════════════════════════════════════════════════════════
5. VALIDATION CHECKLIST
═══════════════════════════════════════════════════════════════════════════════════

Before finalizing output, verify:

### Metadata:
- [ ] All 5 fields present (campaignName, client, datePrepared, duration, preparedBy)
- [ ] Date in YYYY-MM-DD format

### Executive Summary:
- [ ] Overview is 3-5 sentences
- [ ] 3-5 objectives listed
- [ ] Budget clearly stated
- [ ] Target audience described
- [ ] 3-5 expected outcomes
- [ ] 4 key metrics with label, value, context

### Strategic Overview:
- [ ] 3+ business objectives
- [ ] At least 1 persona with all fields
- [ ] UVP statement present
- [ ] Competitive positioning clear

### Platform Strategy:
- [ ] At least 2 platforms included
- [ ] Each platform has rationale, objectives, targeting, tactics

### Budget Allocation:
- [ ] Total budget breakdown complete
- [ ] Funnel percentages add to 100%
- [ ] Platform distribution percentages add to 100%

### Creative Direction:
- [ ] 3+ key messages
- [ ] Visual themes specified
- [ ] Tone and voice defined
- [ ] Ad formats for each platform

### Timeline:
- [ ] Phases have week ranges
- [ ] Milestones specified
- [ ] Deliverables listed

### Performance Framework:
- [ ] Primary KPI defined
- [ ] 3+ secondary KPIs
- [ ] Platform metrics specified
- [ ] Reporting cadence stated

### Next Steps:
- [ ] 3+ immediate actions
- [ ] Week 1 priorities
- [ ] Resources identified
- [ ] Risks with mitigation

═══════════════════════════════════════════════════════════════════════════════════
6. OUTPUT FORMAT
═══════════════════════════════════════════════════════════════════════════════════

### ✅ CORRECT Format (Output complete component):

```javascript
import React from 'react';

// Icon components
const TrendingUpIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

// ... other icon components ...

const CampaignPlanDocument = () => {
  const handlePrint = () => {
    window.print();
  };

  const campaignData = {
    // YOUR CAMPAIGN DATA HERE
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '32px 24px' }}>
      <style>{`
        /* Print styles here */
      `}</style>

      {/* Print Button */}
      <button onClick={handlePrint} className="no-print" style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        backgroundColor: '#1e40af',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}>
        📄 Export to PDF
      </button>

      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        {/* Executive Summary */}
        {/* All other sections */}
        {/* Footer */}
      </div>
    </div>
  );
};

export default CampaignPlanDocument;
```

### ❌ INCORRECT Formats (Do NOT do):
- Data object only
- JSON wrapper
- renderReact() function
- Missing imports or exports
- Incomplete component structure

═══════════════════════════════════════════════════════════════════════════════════
7. COMMON MISTAKES TO AVOID
═══════════════════════════════════════════════════════════════════════════════════

1. Outputting only data instead of complete component
2. Missing icon component definitions
3. Missing print handler function
4. Incomplete campaignData object
5. Missing style tag with print rules
6. Budget percentages not adding to 100%
7. Missing required fields in personas
8. Hardcoded values instead of using campaignData
9. No print button
10. Missing export statement
11. External dependencies (lucide-react, etc.)
12. TypeScript annotations instead of plain JavaScript

═══════════════════════════════════════════════════════════════════════════════════
END OF KNOWLEDGE BASE 11
═══════════════════════════════════════════════════════════════════════════════════
