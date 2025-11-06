KNOWLEDGE BASE 10: CAMPAIGN DOCUMENT TEMPLATES & FORMATTING

This knowledge base provides templates and best practices for creating professional campaign planning documents, presentations, and reports in various formats including PDF-ready React components.

═══════════════════════════════════════════════════════════════════════════════════
1. CAMPAIGN PLAN DOCUMENT STRUCTURE
═══════════════════════════════════════════════════════════════════════════════════

### Standard Document Sections (in order):

1. **Cover Page**
   - Campaign name (large, prominent)
   - Client/brand name
   - Date prepared
   - Campaign duration/timeline
   - Prepared by (agency/team name)
   - Optional: Brand logo placeholder

2. **Executive Summary** (1-2 pages)
   - High-level overview (3-5 sentences)
   - Key objectives (3-5 bullet points)
   - Total budget summary
   - Target audience overview
   - Expected outcomes/ROI projections
   - Key metrics grid (4 metrics max)
   - Primary recommendation (highlighted)

3. **Strategic Overview** (2-3 pages)
   - Business objectives
   - Target audience personas (with demographics, pain points, motivations)
   - Unique value proposition
   - Competitive positioning
   - Market context

4. **Platform Strategy** (3-4 pages)
   - Recommended platforms with rationale
   - Platform-specific objectives
   - Audience targeting approach per platform
   - Key tactics and campaign types
   - Budget allocation by platform

5. **Budget Allocation** (1-2 pages)
   - Total budget breakdown
   - Funnel stage allocation (awareness/consideration/conversion)
   - Platform distribution table
   - Testing and optimization budget
   - Timeline-based spending plan

6. **Creative Direction** (2-3 pages)
   - Key messages and themes
   - Visual direction guidelines
   - Tone and voice
   - Ad format recommendations by platform
   - Creative specifications
   - Call-to-action strategy

7. **Implementation Timeline** (1-2 pages)
   - Phase breakdown with dates
   - Week-by-week milestones
   - Key deliverables schedule
   - Resource allocation timeline
   - Dependencies and critical path

8. **Performance Framework** (1-2 pages)
   - Primary and secondary KPIs
   - Success metrics by platform
   - Benchmarks and targets
   - Reporting cadence and format
   - Optimization triggers

9. **Next Steps** (1 page)
   - Immediate action items
   - Week 1 priorities
   - Resource requirements
   - Risk mitigation strategies
   - Success factors

10. **Appendices** (as needed)
    - Detailed audience research
    - Competitive analysis
    - Platform specifications
    - Glossary of terms

═══════════════════════════════════════════════════════════════════════════════════
2. REACT COMPONENT PDF TEMPLATE STRUCTURE
═══════════════════════════════════════════════════════════════════════════════════

### Data Object Structure

When creating React components for PDF export, use this data structure:

```javascript
const campaignData = {
  metadata: {
    campaignName: "Campaign title",
    client: "Client/brand name",
    datePrepared: "YYYY-MM-DD",
    duration: "Campaign timeline",
    preparedBy: "Agency/team name"
  },

  executiveSummary: {
    overview: "3-5 sentence executive summary",
    objectives: ["Objective 1", "Objective 2", "Objective 3"],
    totalBudget: "$XX,XXX/month",
    targetAudience: "Audience description",
    expectedOutcomes: ["Outcome 1", "Outcome 2"],
    keyMetrics: [
      { label: "Metric name", value: "Value", context: "Brief context" }
    ]
  },

  strategicOverview: {
    businessObjectives: ["Objective 1", "Objective 2"],
    targetPersonas: [
      {
        personaName: "Persona name",
        demographics: "Age, location, income, etc.",
        painPoints: ["Pain point 1", "Pain point 2"],
        motivations: ["Motivation 1", "Motivation 2"]
      }
    ],
    uniqueValueProposition: "UVP statement",
    competitivePositioning: "Positioning statement"
  },

  platformStrategy: [
    {
      platform: "Platform name (Meta, Google, etc.)",
      rationale: "Why this platform",
      objectives: ["Platform objective 1", "Platform objective 2"],
      targetingApproach: "Targeting strategy",
      keyTactics: ["Tactic 1", "Tactic 2"]
    }
  ],

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
        rationale: "Why this allocation"
      }
    ]
  },

  creativeDirection: {
    keyMessages: ["Message 1", "Message 2"],
    visualThemes: ["Theme 1", "Theme 2"],
    toneAndVoice: "Tone description",
    adFormats: [
      {
        platform: "Platform name",
        formats: ["Format 1", "Format 2"],
        specifications: "Size and format specs"
      }
    ],
    ctaStrategy: ["CTA approach 1", "CTA approach 2"]
  },

  implementationTimeline: [
    {
      phase: "Phase name",
      weekRange: "Weeks 1-4",
      milestones: ["Milestone 1", "Milestone 2"],
      deliverables: ["Deliverable 1", "Deliverable 2"]
    }
  ],

  performanceFramework: {
    primaryKPI: "Main success metric",
    secondaryKPIs: ["KPI 1", "KPI 2"],
    platformMetrics: [
      {
        platform: "Platform name",
        metrics: ["Metric 1", "Metric 2"],
        targets: { "Metric 1": "Target value" }
      }
    ],
    reportingCadence: "Weekly/monthly reporting schedule"
  },

  nextSteps: {
    immediateActions: ["Action 1", "Action 2"],
    week1Priorities: ["Priority 1", "Priority 2"],
    resourceRequirements: ["Resource 1", "Resource 2"],
    risks: ["Risk 1 and mitigation", "Risk 2 and mitigation"]
  }
};
```

### Component Structure Guidelines

**1. Component Setup**
   - Import React (and useState if needed)
   - Create inline SVG icon components (no external dependencies)
   - Define main component function
   - Define campaignData object with all content
   - Include print handler function

**2. Styling Approach**
   - Use Tailwind-style className syntax
   - Include <style> tag with CSS for print optimization
   - Color scheme: Blue primary (#1e40af), green for positive, amber for caution
   - Professional typography with clear hierarchy
   - Consistent spacing and padding

**3. Print Optimization CSS**
```css
@media print {
  .no-print { display: none !important; }
  .print\\:break-inside-avoid { break-inside: avoid; }
  .print\\:break-before-page { break-before: page; }
  body { margin: 1in; }
  @page { margin: 1in; }
}
```

**4. Key Visual Elements**
   - Fixed-position print button (top-right, blue, with PDF icon)
   - Gradient backgrounds for section headers
   - Colored left-border accent bars for highlight boxes
   - Numbered circular badges for section indicators
   - Grid layouts for metrics and cards
   - Professional table styling with zebra striping
   - Custom bullet markers for lists

═══════════════════════════════════════════════════════════════════════════════════
3. PROFESSIONAL FORMATTING BEST PRACTICES
═══════════════════════════════════════════════════════════════════════════════════

### Typography Guidelines

**Headings:**
- H1 (Campaign Title): 28-48px, bold, brand color
- H2 (Section Titles): 22-28px, bold, underline or border-bottom
- H3 (Subsections): 18-22px, semi-bold
- Body Text: 14-16px, regular weight, line-height 1.5-1.7

**Font Choices:**
- Headings: Sans-serif (Arial, Helvetica, Inter)
- Body: Sans-serif for digital, serif optional for print
- Monospace: For data, metrics, code

### Color Scheme

**Primary Colors:**
- Blue (#1e40af): Primary brand color, headings, CTAs
- Dark Gray (#374151): Body text, secondary elements
- Light Gray (#f9fafb): Backgrounds, alternating rows

**Accent Colors:**
- Green (#10b981): Success, recommendations, positive metrics
- Amber (#f59e0b): Warnings, considerations, cautions
- Red (#ef4444): Risks, critical items (use sparingly)

**Backgrounds:**
- White: Main document background
- Light Blue (#eff6ff): Executive summary boxes
- Light Green (#f0fdf4): Recommendation boxes
- Light Amber (#fffbeb): Consideration boxes

### Spacing and Layout

**Margins:**
- Document: 1 inch all sides (print)
- Digital: 20-40px padding
- Sections: 30-50px between major sections
- Paragraphs: 16-24px bottom margin

**Content Width:**
- Optimal: 8.5 inches or 800-1000px
- Max-width for readability
- Center-aligned container

**Grid Layouts:**
- Metrics: 2x2 or 4-column grid
- Personas: 2-3 column grid
- Platform cards: 2-3 column grid

### Table Formatting

**Structure:**
- Full width within container
- Collapsed borders (border-collapse: collapse)
- Header row with background color
- Zebra striping for alternating rows
- 12-16px padding in cells
- Left-aligned text, right-aligned numbers

**Example:**
- Header: Blue background (#1e40af), white text, bold
- Odd rows: White background
- Even rows: Light gray background (#f9fafb)
- Borders: 1px solid #ddd
- Hover: Subtle highlight (digital only)

### Highlight Boxes

**Executive Summary Box:**
- Background: Light blue (#eff6ff)
- Border-left: 4px solid blue (#1e40af)
- Padding: 20px
- Rounded corners: 4-6px

**Recommendation Box:**
- Background: Light green (#f0fdf4)
- Border-left: 4px solid green (#10b981)
- Padding: 20px
- Bold heading

**Warning/Consideration Box:**
- Background: Light amber (#fffbeb)
- Border-left: 4px solid amber (#f59e0b)
- Padding: 20px

### Lists and Bullets

**Custom Bullets:**
- Key findings: Blue bullet (•)
- Recommendations: Green checkmark (✓)
- Warnings: Amber arrow (›)
- Standard: Default bullets or numbered

**List Spacing:**
- 8-12px between items
- Indent: 20-30px from left
- Nested lists: Additional 20px indent

═══════════════════════════════════════════════════════════════════════════════════
4. SECTION-SPECIFIC FORMATTING GUIDELINES
═══════════════════════════════════════════════════════════════════════════════════

### Header Section
- Gradient background (blue to white)
- Large campaign name (36-48px)
- Metadata in smaller text (14px)
- Icons for date, client info
- Print button (fixed, top-right, hidden in print)

### Executive Summary
- Blue highlight box for overview
- Metrics in 2x2 or 4-column grid
- Large metric values (24-32px)
- Metric labels (12-14px)
- Objectives as bulleted list
- Green box for primary recommendation

### Strategic Overview
- Persona cards with:
  - Card layout with shadow
  - Persona name as heading
  - Demographics line
  - Pain points and motivations as lists
  - Rounded corners, subtle border

### Platform Strategy
- Platform cards in grid (2-3 columns)
- Platform name with icon/badge
- Rationale paragraph
- Objectives and tactics as lists
- Consistent card heights

### Budget Allocation
- Summary cards for total budget
- Table for platform distribution
- Visual indicators for percentages
- Funnel breakdown (awareness/consideration/conversion)
- Clear column headers

### Timeline
- Phase breakdown with date ranges
- Milestones as checkboxes or bullets
- Deliverables clearly marked
- Visual timeline or Gantt chart optional
- Week numbers or date ranges

### Performance Framework
- Primary KPI prominently displayed
- Platform metrics in table format
- Targets and benchmarks highlighted
- Reporting schedule clearly stated

### Next Steps
- Immediate actions in highlighted box
- Prioritized list (numbered)
- Resource requirements as table
- Risks with mitigation strategies

═══════════════════════════════════════════════════════════════════════════════════
5. PRINT OPTIMIZATION TECHNIQUES
═══════════════════════════════════════════════════════════════════════════════════

### Page Break Controls

**Where to Add Page Breaks:**
- Before major sections (Executive Summary, Strategic Overview, etc.)
- Between distinct content blocks
- Before tables that might split awkwardly

**CSS Classes:**
```css
.print\\:break-before-page { page-break-before: always; }
.print\\:break-inside-avoid { page-break-inside: avoid; }
.print\\:break-after-page { page-break-after: always; }
```

### Elements to Hide in Print

- Print/export buttons
- Navigation elements
- Interactive controls
- Video players
- Animations

**CSS:**
```css
@media print {
  .no-print { display: none !important; }
}
```

### Print-Specific Styling

**Backgrounds:**
- Ensure backgrounds print (some browsers disable by default)
- Use `print-color-adjust: exact;` or `-webkit-print-color-adjust: exact;`

**Margins:**
- Set @page margins: `@page { margin: 1in; }`
- Account for printer margins

**Fonts:**
- Use web-safe fonts for consistency
- Ensure sufficient contrast for black & white printing

### Multi-Page Documents

**Headers/Footers:**
- Use CSS for page numbers (counters)
- Repeat company name or campaign name
- Date and page number in footer

**Table Headers:**
- Repeat on each page: `thead { display: table-header-group; }`

**Orphans and Widows:**
- Control text flow: `orphans: 3; widows: 3;`

═══════════════════════════════════════════════════════════════════════════════════
6. BEST PRACTICES SUMMARY
═══════════════════════════════════════════════════════════════════════════════════

### Responsive Design
- Mobile: Single column, larger fonts, simplified tables
- Tablet: 2-column layouts
- Desktop: Multi-column grids
- Print: Fixed layout, 8.5x11" optimized

### Accessibility
- Color contrast: 4.5:1 minimum for text
- Semantic HTML: Proper heading hierarchy
- Alt text for icons and images
- Keyboard navigation support

### Common Pitfalls to Avoid
- Dense text walls (break into sections)
- Poor color contrast
- Hardcoded values instead of dynamic data
- Missing fallbacks for optional data
- External dependencies that may break
- Broken page breaks or content cut-off

═══════════════════════════════════════════════════════════════════════════════════
END OF KNOWLEDGE BASE 10
═══════════════════════════════════════════════════════════════════════════════════
