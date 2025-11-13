# Agent Foundry - Create Knowledge Base Guide

## Overview

Knowledge Bases provide your agent with domain-specific information to answer questions accurately. This guide explains how to create and manage knowledge bases in Amazon Bedrock Agent Foundry.

## Knowledge Base Types

Agent Foundry supports two types of knowledge bases:

### 1. Text-Based Knowledge Base

**Best for:**
- Documentation
- FAQs
- Policies and procedures
- Product information
- Best practices guides

**Features:**
- Direct text input
- Markdown formatting supported
- Up to 18,000 characters per file
- Easy to update and maintain

### 2. Database Knowledge Base

**Best for:**
- Dynamic data
- Real-time information
- Customer records
- Transaction data
- Analytics data

**Features:**
- Connected to Plazma DB
- SQL query support
- Real-time data access
- Structured data tables

## Configuration Fields

### Text Knowledge Base

| Field | Description | Instructions | Notes |
|-------|-------------|--------------|-------|
| **Knowledge Base Name** | Describe what the knowledge base is about | Enter a descriptive name (e.g., "Campaign Planning Best Practices") | Used for organization and reference |
| **Knowledge Base Type** | Select the type | Choose "Text" | Other option: "Database" |
| **Text Input** | Input the text related to the knowledge base | Enter content in plain text or Markdown | Maximum 18,000 characters |

### Database Knowledge Base

| Field | Description | Instructions | Notes |
|-------|-------------|--------------|-------|
| **Knowledge Base Name** | Describe what the knowledge base is about | Enter a descriptive name | - |
| **Knowledge Base Type** | Select the type | Choose "Database" | - |
| **Database Name** | List of available databases | Select from dropdown | Must exist in Plazma DB |
| **TD Query** | Define query for data needed | Write SQL query | See query guidelines below |
| **Name** | Table name to refer to | Enter understandable name | Used in agent responses |

## Text Knowledge Base Best Practices

### Character Limit Management

**Maximum**: 18,000 characters per knowledge base

**Strategies to stay under limit:**

1. **Split Large Topics**
   ```
   Instead of:
   - KB1_All_Marketing_Information.md (30,000 chars) ❌

   Do this:
   - KB1_Marketing_Fundamentals.md (15,000 chars) ✅
   - KB2_Platform_Best_Practices.md (14,000 chars) ✅
   ```

2. **Use Concise Language**
   - Remove redundant information
   - Use bullet points instead of paragraphs
   - Eliminate filler words
   - Focus on essential information

3. **Link Related Knowledge Bases**
   - Reference other KBs for details
   - Create a logical structure
   - Use consistent naming

### Content Structure

**Recommended Format:**

```markdown
# Knowledge Base Title

## Overview
Brief introduction (2-3 sentences)

## Section 1: Topic Name

### Subsection 1.1
- Key point 1
- Key point 2
- Key point 3

### Subsection 1.2
- Detail A
- Detail B

## Section 2: Another Topic

### Best Practices
1. First practice
2. Second practice
3. Third practice

### Common Mistakes
- Mistake to avoid #1
- Mistake to avoid #2

## Examples

### Example 1: Use Case Name
Description and details...

### Example 2: Another Use Case
Description and details...

## Quick Reference
- Quick tip 1
- Quick tip 2
- Quick tip 3
```

### Formatting Guidelines

**Use Markdown Features:**
- ✅ Headings (`#`, `##`, `###`)
- ✅ Lists (bullets and numbered)
- ✅ **Bold** and *italic* text
- ✅ Code blocks with ```
- ✅ Tables
- ✅ Links (when relevant)

**Avoid:**
- ❌ Images (use descriptions instead)
- ❌ Complex HTML
- ❌ Excessive formatting
- ❌ Very long paragraphs

## Database Knowledge Base Configuration

### SQL Query Guidelines

**Column Selection:**

```sql
-- Include all needed columns explicitly
SELECT
  customer_id,
  customer_name,
  email,
  purchase_date,
  total_amount
FROM customers
WHERE status = 'active'
```

**Exclude Columns:**

If you want to exclude specific columns, list all columns you want:
```sql
-- Instead of SELECT * and excluding columns
-- List only the columns you want
SELECT
  column1,
  column2,
  column3
FROM table_name
```

**Exclude Records:**

Use WHERE clause to filter data:
```sql
SELECT *
FROM orders
WHERE
  order_date >= '2024-01-01'
  AND status != 'cancelled'
  AND customer_type = 'premium'
```

### Database Functions

Available database functions in Agent Foundry:

| Function | Description | Use Case |
|----------|-------------|----------|
| **List Segment Folders** | List folders in parent segment | Organize data hierarchically |
| **List by Folder** | List instances in a folder | Requires folder ID |
| **List Attributes** | Retrieve attribute definitions | Get metadata configuration |
| **List Behaviors** | Retrieve behavior definitions | Get behavior configuration |
| **Get Segment** | Retrieve segment metadata | Requires segment ID |
| **Get Journey** | Retrieve journey metadata | Requires journey ID |
| **Get Audience** | Retrieve parent segment config | Requires journey ID |
| **Get Query** | Retrieve count SQL of segment | Requires segment ID |
| **Query Data Directly** | Issue SQL to parent segment data | Custom queries |
| **Query Segment Analytics** | Issue SQL to analyze segment | Requires segment ID |

## Examples

### Example 1: Marketing Knowledge Base (Text)

```markdown
Knowledge Base Name: Campaign Planning Fundamentals
Type: Text

Content:
# Campaign Planning Fundamentals

## SMART Goals Framework

Campaign goals should be:
- **Specific**: Clearly defined objective
- **Measurable**: Quantifiable metrics
- **Achievable**: Realistic targets
- **Relevant**: Aligned with business goals
- **Time-bound**: Clear timeline

## Budget Allocation

### 40/30/30 Framework
- 40% - Top of funnel (Awareness)
- 30% - Middle of funnel (Consideration)
- 30% - Bottom of funnel (Conversion)

### 60/40 Framework
- 60% - Performance campaigns
- 40% - Brand building

## Platform Selection

### Meta (Facebook & Instagram)
Best for: Visual products, B2C, wide demographics
Strengths: Detailed targeting, visual ads, large audience

### Google Ads
Best for: High-intent searches, B2B, immediate needs
Strengths: Search intent, multiple ad formats, remarketing

[Continue with more sections...]
```

**Character Count**: ~15,500

### Example 2: Customer Database (Database)

```yaml
Knowledge Base Name: Customer Purchase History
Type: Database
Database Name: customer_db
Table Name: customer_purchases

TD Query: |
  SELECT
    c.customer_id,
    c.customer_name,
    c.email,
    c.segment,
    p.product_name,
    p.purchase_date,
    p.amount,
    p.status
  FROM customers c
  JOIN purchases p ON c.customer_id = p.customer_id
  WHERE
    p.purchase_date >= DATE_SUB(CURRENT_DATE, INTERVAL 365 DAY)
    AND p.status = 'completed'
  ORDER BY p.purchase_date DESC
```

### Example 3: HR Policies (Text)

```markdown
Knowledge Base Name: Employee Leave Policies
Type: Text

Content:
# Employee Leave Policies

## Annual Leave

### Eligibility
- Full-time employees: 15 days per year
- Part-time employees: Prorated based on hours
- Accrual starts after 3 months of employment

### Request Process
1. Submit request via HR portal at least 2 weeks in advance
2. Manager reviews within 3 business days
3. HR confirms approval
4. Leave recorded in system

### Carry-Over Rules
- Maximum carry-over: 5 days
- Must be used within first quarter of next year
- No cash compensation for unused leave

## Sick Leave

### Allocation
- Up to 10 days per year
- No doctor's note required for 1-2 days
- Doctor's note required for 3+ consecutive days

### Notification
- Notify manager before 9 AM on sick day
- Update HR system when possible
- Provide doctor's note within 48 hours (if applicable)

[Continue with more policies...]
```

### Example 4: Product Catalog (Database)

```yaml
Knowledge Base Name: Product Inventory
Type: Database
Database Name: inventory_db
Table Name: products

TD Query: |
  SELECT
    product_id,
    product_name,
    category,
    subcategory,
    price,
    stock_quantity,
    last_updated
  FROM products
  WHERE
    status = 'active'
    AND stock_quantity > 0
  ORDER BY category, product_name
```

## Validation and Testing

### Validate Your Knowledge Base

Use the PM Agent Squad Master validation tool:

```bash
npm run validate:kb
```

**Checks:**
- ✅ File size under 18,000 characters
- ✅ Valid Markdown syntax
- ✅ No unclosed code blocks
- ✅ Proper UTF-8 encoding
- ✅ Required sections present

### Test Queries

After creating a knowledge base, test with these queries:

**For Text Knowledge Base:**
- "What information is in this knowledge base?"
- "Explain [specific topic] from the knowledge base"
- "What are the best practices for [topic]?"

**For Database Knowledge Base:**
- "Show me recent customer purchases"
- "What products are available in [category]?"
- "Get statistics for [data point]"

## Multiple Knowledge Bases

### When to Create Multiple KBs

Create separate knowledge bases when:

1. **Different Topics**
   - KB1: Campaign Planning
   - KB2: Platform Best Practices
   - KB3: Creative Guidelines

2. **Different Data Sources**
   - KB1: Company Policies (Text)
   - KB2: Employee Data (Database)
   - KB3: Benefits Information (Text)

3. **Size Management**
   - Split large topics to stay under 18,000 character limit

4. **Update Frequency**
   - Separate frequently updated content from static content

### Naming Convention

Use consistent naming:
```
KB1_[Topic]_[Subtopic].md
KB2_[Topic]_[Subtopic].md
KB3_[Topic]_[Subtopic].md
```

Examples:
- `KB1_Campaign_Planning_Fundamentals.md`
- `KB2_Meta_Advertising_Best_Practices.md`
- `KB3_Google_Ads_Best_Practices.md`

## Common Issues and Solutions

### Issue: Character Limit Exceeded

**Solution:**
- Split into multiple knowledge bases
- Remove redundant information
- Use more concise language
- Move examples to separate KB

### Issue: Database Query Returns Too Much Data

**Solution:**
- Add WHERE clauses to filter data
- Limit date ranges
- Select specific columns only
- Add LIMIT clause if appropriate

### Issue: Agent Can't Find Information

**Solution:**
- Ensure knowledge base is properly attached to agent
- Check content is clear and well-structured
- Use descriptive headings
- Test with different phrasings

### Issue: Database Connection Fails

**Solution:**
- Verify database exists in Plazma DB
- Check query syntax
- Ensure proper permissions
- Test query independently first

## Tips for Success

1. **Keep It Organized**
   - Use clear headings
   - Logical structure
   - Consistent formatting

2. **Be Concise**
   - Remove fluff
   - Focus on essential information
   - Use bullet points

3. **Test Thoroughly**
   - Validate before uploading
   - Test with various queries
   - Update based on results

4. **Maintain Regularly**
   - Update outdated information
   - Add new content as needed
   - Remove obsolete data

5. **Document Sources**
   - Note where information came from
   - Include last updated date
   - Track version changes

## Next Steps

After creating knowledge bases:

1. [Add Tools](04_Add_Tools_Guide.md)
2. [Configure Outputs](05_Add_Output_Guide.md)
3. [Set Up Prompt Variables](06_Add_Prompt_Variables_Guide.md)
4. [Test Your Agent](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)

---

**Last Updated**: November 12, 2025
**Version**: 2.0.0
**Related to**: PM Agent Squad Master Template
