# Agent Knowledge Bases - Your Content Goes Here

## 📝 What This Folder Contains

This folder is where you create **your agent's knowledge bases** in Markdown format.

**Current Contents:**
- ✅ **3 Sample Templates** - Empty templates showing KB structure
- ✅ **`examples/` folder** - Full campaign marketing examples (for reference)

---

## 🎯 Quick Start

### Step 1: Review the Sample Templates

Three sample template files are provided:
- `KB1_SAMPLE_Knowledge_Base_Template.md` - Full template with detailed structure
- `KB2_SAMPLE_Knowledge_Base_Template.md` - Secondary template
- `KB3_SAMPLE_Knowledge_Base_Template.md` - Additional template

**Use these as starting points for YOUR knowledge bases.**

### Step 2: Create Your Knowledge Bases

Replace the sample templates with your domain-specific knowledge:

```bash
# Delete sample templates
rm KB*_SAMPLE_*.md

# Create your knowledge bases
touch KB1_[YourTopic].md
touch KB2_[YourTopic].md
touch KB3_[YourTopic].md
# ... add more as needed
```

### Step 3: Follow the Structure

Use the template structure from `KB1_SAMPLE_Knowledge_Base_Template.md`:

```markdown
# KB1: [Your Topic Name]

## Overview
[What this KB covers]

## Main Sections
[Your content organized in clear sections]

## Examples & Best Practices
[Practical examples]

## FAQs
[Common questions]
```

### Step 4: Validate Your Files

```bash
npm run validate:kb
```

This checks:
- ✅ File size (must be under 18,000 characters)
- ✅ Markdown syntax
- ✅ UTF-8 encoding
- ✅ Proper structure

---

## 📋 Knowledge Base Guidelines

### File Naming Convention
```
KB[number]_[Topic_Name].md
```

**Examples:**
- `KB1_Company_HR_Policies.md`
- `KB2_Product_Documentation.md`
- `KB3_Troubleshooting_Guide.md`

### Size Limits
- **Maximum:** 18,000 characters per file
- **Recommended:** 10,000-15,000 characters
- **If over limit:** Split into Part 1 and Part 2

**Example splitting:**
```
KB7A_Creative_Best_Practices_Part1.md
KB7B_Creative_Best_Practices_Part2.md
```

### Content Structure

**Required Elements:**
1. **Clear title** with KB number
2. **Overview section** explaining the KB purpose
3. **Logical sections** with headers
4. **Examples** demonstrating concepts
5. **Best practices** for implementation

**Optional but Recommended:**
- Tables for structured data
- Checklists for processes
- FAQs for common questions
- Cross-references to other KBs

---

## 🎨 Examples by Domain

### HR Assistant
```
KB1_Company_HR_Policies.md
KB2_Employee_Benefits_Guide.md
KB3_Time_Off_Leave_Procedures.md
KB4_Performance_Review_Process.md
KB5_Onboarding_Procedures.md
KB6_Compensation_Guidelines.md
```

### Customer Support
```
KB1_Product_Documentation.md
KB2_Troubleshooting_Guide.md
KB3_FAQs_Common_Questions.md
KB4_Return_Refund_Policy.md
KB5_Warranty_Information.md
KB6_Technical_Specifications.md
```

### IT Support
```
KB1_System_Setup_Guides.md
KB2_Software_Installation.md
KB3_Common_IT_Issues.md
KB4_Network_Configuration.md
KB5_Security_Procedures.md
KB6_Access_Management.md
```

### Sales Assistant
```
KB1_Product_Catalog.md
KB2_Pricing_Packages.md
KB3_Sales_Objection_Handling.md
KB4_Competitor_Comparison.md
KB5_Demo_Scripts.md
```

---

## 📂 examples/ Folder

The `examples/` folder contains **12 complete campaign marketing knowledge bases** from the original template:

**What's in examples/:**
- KB1 through KB11: Complete marketing campaign knowledge
- Campaign planning, Meta ads, Pinterest, Google Ads, TikTok
- Metrics, targeting, creative best practices
- Budget allocation, templates, reporting

**Why Keep Examples?**
- ✅ See real-world KB structure
- ✅ Learn content organization
- ✅ Understand level of detail needed
- ✅ Reference formatting patterns
- ✅ Use if building a marketing agent

**Using the Examples:**
```bash
# Copy an example to use as starting point
cp examples/KB1_Campaign_Planning_Fundamentals.md KB1_[YourTopic].md

# Then edit and replace content with your domain
```

---

## 🔧 Knowledge Base Best Practices

### 1. Content Organization

**Good Structure:**
```markdown
# KB1: Employee Benefits Guide

## Overview
Brief description of benefits program

## Health Insurance
### Medical Plans
### Dental Coverage
### Vision Coverage

## Retirement Plans
### 401(k) Details
### Matching Program

## Time Off
### Vacation Policy
### Sick Leave
### Holidays

## FAQs
Common questions and answers
```

**Poor Structure:**
```markdown
# Benefits
Everything about benefits in one long paragraph with no organization...
```

### 2. Use Examples

**Good:**
```markdown
## Requesting Time Off

**Process:**
1. Log into HR portal
2. Navigate to Time Off section
3. Select date range
4. Submit request

**Example:**
To request vacation for Dec 20-27:
- Select "Vacation" type
- Enter dates: 12/20/2024 - 12/27/2024
- Add note: "Holiday travel"
- Submit for manager approval
```

**Poor:**
```markdown
## Time Off
Submit time off requests through the portal.
```

### 3. Include Metrics & Benchmarks (If Applicable)

**Good:**
```markdown
## Response Time Targets

| Priority | Target Response | Target Resolution |
|----------|----------------|-------------------|
| Critical | 15 minutes | 4 hours |
| High | 1 hour | 24 hours |
| Medium | 4 hours | 3 days |
| Low | 24 hours | 1 week |
```

### 4. Cross-Reference Other KBs

```markdown
## Related Information

**See Also:**
- KB2: Troubleshooting Guide - For technical issues
- KB4: Warranty Information - For coverage details
- KB6: Return Policy - For product returns
```

---

## ✅ Quality Checklist

Before finalizing your knowledge bases:

- [ ] Each KB under 18,000 characters
- [ ] Clear, descriptive title with KB number
- [ ] Overview section explaining purpose
- [ ] Logical section hierarchy
- [ ] Examples demonstrating concepts
- [ ] Proper Markdown formatting
- [ ] UTF-8 encoding
- [ ] No sensitive/confidential data
- [ ] Validated with `npm run validate:kb`
- [ ] Spell-checked and proofread
- [ ] Cross-references to related KBs
- [ ] Tested in agent responses

---

## 🚀 Deployment

Once your KBs are ready:

**1. Upload to Agent Foundry**
- Follow `Agent_Config/02_Add_Tools_Knowledge_Bases.md`
- Create one tool per KB file
- Use descriptive function names

**2. Configure Agent**
- Update system prompt to reference KBs
- Test agent responses
- Iterate based on results

**3. Monitor & Improve**
- Track which KBs are most used
- Identify gaps in knowledge
- Update regularly

---

## 📚 Related Documentation

**Creating Knowledge Bases:**
- [Reference Files/03_Create_Knowledge_Base_Guide.md](../Reference%20Files/03_Create_Knowledge_Base_Guide.md)

**Configuring in Agent Foundry:**
- [Agent_Config/02_Add_Tools_Knowledge_Bases.md](../Agent_Config/02_Add_Tools_Knowledge_Bases.md)

**Validation:**
```bash
npm run validate:kb          # Validate all KBs
npm run validate:kb:verbose  # Detailed output
```

---

## 🎓 Tips for Success

1. **Start Small**
   - Begin with 3-5 core knowledge bases
   - Add more as needs grow
   - Quality > Quantity

2. **Keep Content Fresh**
   - Review quarterly
   - Update with new information
   - Remove outdated content

3. **Test Thoroughly**
   - Ask agent questions that should use each KB
   - Verify correct information is returned
   - Refine content based on results

4. **Use Clear Language**
   - Write for your target audience
   - Avoid jargon unless necessary
   - Define technical terms

5. **Include Context**
   - Explain the "why" not just the "what"
   - Provide background information
   - Show real-world applications

---

## ❓ FAQs

**Q: How many knowledge bases should I create?**
A: Start with 5-10 covering core topics. Add more as needed. Most agents work well with 8-15 KBs.

**Q: Can I have more than 18,000 characters?**
A: No, AWS Bedrock has a limit. Split large topics into Part 1 and Part 2.

**Q: Should I include company-specific information?**
A: Yes! That's the point. Include policies, procedures, product details specific to your organization.

**Q: How often should I update KBs?**
A: Review quarterly or when major changes occur (new products, policy updates, etc.)

**Q: Can I use the campaign marketing examples?**
A: Yes! If building a marketing agent, the examples folder has complete, ready-to-use KBs.

---

**Template Version:** 2.0.0
**Last Updated:** November 12, 2025
**Status:** Ready for your content
