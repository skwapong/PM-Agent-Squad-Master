# Agent Foundry - Add Prompt Variables Guide

## Overview

Prompt Variables dynamically inject data from knowledge bases into agent prompts. This guide explains how to configure and use prompt variables in Amazon Bedrock Agent Foundry.

## What Are Prompt Variables?

Prompt Variables allow agents to:
- Access real-time data from databases
- Include dynamic information in prompts
- Filter and select specific columns
- Exclude unwanted data
- Provide context from knowledge bases

## Configuration Fields

| Field | Description | Instructions |
|-------|-------------|--------------|
| **Variable Name** | Unique identifier | Used for reference in prompts |
| **Target Knowledge Base** | Which KB to query | Select from dropdown |
| **Target Function** | Query type | Currently: "List columns" |
| **List of Variables** | Expression to specify columns | Comma-separated expressions |

## Variable Expression Syntax

### Basic Syntax

Variables are defined using expressions that specify tables and columns:

```
expression-1, expression-2, expression-3, ...
```

### Expression Types

#### 1. Table Name (All Columns)

**Syntax**: `table_name`

**Meaning**: All columns from the specified table

**Examples:**
```
customers
orders
products
```

**Equivalent to:**
```
customers.*
orders.*
products.*
```

#### 2. Explicit All Columns

**Syntax**: `table_name.*`

**Meaning**: Explicitly select all columns

**Examples:**
```
customers.*
behavior_pageviews.*
transactions.*
```

#### 3. Specific Columns

**Syntax**: `table_name.{column1,column2,column3}`

**Meaning**: Only specified columns from table

**Examples:**
```
customers.{id,name,email}
products.{sku,name,price,category}
orders.{order_id,customer_id,total_amount}
```

#### 4. Pattern Matching with Wildcards

**Syntax**: `pattern*` or `*pattern` or `*pattern*`

**Meaning**: Match tables/columns using wildcard

**Examples:**
```
behavior_*.*           # All columns from tables starting with "behavior_"
*.customer_id          # customer_id column from all tables
*_date                 # All columns ending with "_date"
```

#### 5. Negation (Exclusion)

**Syntax**: `!expression`

**Meaning**: Exclude the following expression

**Examples:**
```
!customers.time        # Exclude "time" column from customers
!*.email               # Exclude "email" column from all tables
!behavior_clicks       # Exclude entire behavior_clicks table
```

## Complete Examples

### Example 1: Simple Selection

**Use Case**: Get all customer data

```
Variable Name: customer_data
Target Knowledge Base: Customer_Database
Target Function: List columns
List of Variables: customers
```

**Result**: All columns from customers table

---

### Example 2: Multiple Tables

**Use Case**: Get customer and order data

```
Variable Name: customer_orders
Target Knowledge Base: Sales_Database
Target Function: List columns
List of Variables: customers, orders, products
```

**Result**: All columns from customers, orders, and products tables

---

### Example 3: Specific Columns Only

**Use Case**: Get customer PII for support agent

```
Variable Name: customer_info
Target Knowledge Base: Customer_Database
Target Function: List columns
List of Variables: customers.{id,name,email,phone,address}
```

**Result**: Only specified columns from customers table

---

### Example 4: Pattern Matching

**Use Case**: Get all behavioral data

```
Variable Name: behavior_data
Target Knowledge Base: Analytics_Database
Target Function: List columns
List of Variables: behavior_*.*
```

**Result**: All columns from all tables starting with "behavior_"

---

### Example 5: Excluding Columns

**Use Case**: Get customer data without PII

```
Variable Name: customer_data_safe
Target Knowledge Base: Customer_Database
Target Function: List columns
List of Variables: customers.*, !customers.email, !customers.phone, !customers.ssn
```

**Result**: All customer columns except email, phone, and ssn

---

### Example 6: Complex Multi-Table

**Use Case**: Get e-commerce data for analysis

```
Variable Name: ecommerce_data
Target Knowledge Base: Ecommerce_Database
Target Function: List columns
List of Variables: customers.*, behavior_*.*, products.{id,name,price}, !*.email
```

**Result**:
- All columns from customers table
- All columns from all behavior_* tables
- Only id, name, price from products table
- Exclude email column from all tables

---

### Example 7: Selective Behavioral Data

**Use Case**: Get specific events only

```
Variable Name: conversion_events
Target Knowledge Base: Analytics_Database
Target Function: List columns
List of Variables: behavior_pageviews.{user_id,page_url,timestamp}, behavior_clicks.{user_id,element_id,timestamp}, !behavior_impressions
```

**Result**:
- Selected columns from pageviews
- Selected columns from clicks
- Exclude entire impressions table

## Real-World Use Cases

### Use Case 1: Customer Support Agent

**Scenario**: Support agent needs customer info without sensitive data

**Configuration:**
```yaml
Variable Name: customer_support_data
Target KB: Customer_DB
List of Variables: |
  customers.{id,name,tier,join_date},
  orders.{order_id,status,created_date,total},
  !*.credit_card,
  !*.ssn,
  !*.password
```

**Available to Agent:**
- Customer ID, name, tier, join date
- Order details (ID, status, date, total)
- No sensitive payment or personal data

---

### Use Case 2: Marketing Analytics

**Scenario**: Marketer analyzing campaign performance

**Configuration:**
```yaml
Variable Name: campaign_metrics
Target KB: Marketing_DB
List of Variables: |
  campaigns.*,
  campaign_performance.*,
  audience_segments.{segment_id,segment_name,size},
  !*.internal_notes,
  !*.cost_markup
```

**Available to Agent:**
- All campaign data
- All performance metrics
- Selected audience segment info
- No internal notes or markup data

---

### Use Case 3: Sales Dashboard

**Scenario**: Sales team dashboard with revenue data

**Configuration:**
```yaml
Variable Name: sales_dashboard_data
Target KB: Sales_DB
List of Variables: |
  sales.{date,product_id,quantity,revenue},
  products.{id,name,category},
  customers.{id,company_name,industry},
  sales_reps.{id,name,region},
  !*.commission_rate,
  !*.cost
```

**Available to Agent:**
- Sale transactions (date, product, quantity, revenue)
- Product info (name, category)
- Customer company info
- Sales rep assignments
- No commission or cost data

---

### Use Case 4: HR Assistant

**Scenario**: HR assistant for employee queries

**Configuration:**
```yaml
Variable Name: employee_data
Target KB: HR_DB
List of Variables: |
  employees.{id,name,department,title,hire_date,manager_id},
  departments.{id,name,head_of_dept},
  benefits.*,
  !*.salary,
  !*.bonus,
  !*.performance_rating
```

**Available to Agent:**
- Employee basic info
- Department structure
- All benefits information
- No compensation or review data

## Combining with Agent Prompts

### In System Prompt

Reference available data:

```
You are an HR Assistant with access to employee information including:
- Employee directory ({{employee_data}})
- Department structure
- Benefits information

You can help employees with:
- Finding colleague contact information
- Understanding benefits
- Navigating department structure
- Company policies

Do NOT discuss compensation, performance reviews, or sensitive HR matters.
```

### In Tool Prompts

Use variables in tool calls:

```
Search for employee information from {{employee_data}} where:
- Department: {{department_name}}
- Location: {{office_location}}

Return matching employee names and contact details.
```

## Best Practices

### 1. Security and Privacy

**✅ Do:**
- Exclude PII when not needed
- Remove sensitive financial data
- Filter out internal-only fields
- Apply principle of least privilege

**❌ Don't:**
- Include all data by default
- Expose passwords or API keys
- Show competitor-sensitive info
- Include personal health information

### 2. Performance Optimization

**✅ Do:**
- Select only needed columns
- Exclude large text fields if not needed
- Use specific table names
- Limit to relevant tables

**❌ Don't:**
- Select all columns from all tables
- Include unused historical data
- Add redundant tables
- Over-complicate expressions

### 3. Naming Conventions

**✅ Good Variable Names:**
- `customer_support_data`
- `sales_analytics`
- `employee_directory`
- `product_catalog`

**❌ Avoid:**
- `data1`
- `vars`
- `info`
- `temp`

### 4. Documentation

Document each variable:

```yaml
# Customer Support Data
# Purpose: Provide support agents with customer info
# Excludes: PII, payment data, internal notes
# Tables: customers, orders, support_tickets
Variable Name: customer_support_data
List of Variables: customers.{id,name,tier}, orders.{id,status}, !*.email
```

## Expression Pattern Examples

### Pattern 1: All Tables, Specific Columns

```
*.{id,name,created_date}
```
**Result**: id, name, and created_date from ALL tables

---

### Pattern 2: Table Group, Exclude Specific

```
behavior_*.*, !behavior_bot_traffic
```
**Result**: All columns from all behavior_* tables except behavior_bot_traffic

---

### Pattern 3: Multiple Excludes

```
customers.*, !customers.email, !customers.phone, !customers.address
```
**Result**: All customer columns except email, phone, and address

---

### Pattern 4: Specific Columns, Multiple Tables

```
{customers,orders,products}.{id,created_date}
```
**Note**: This syntax varies by platform. Alternative:
```
customers.{id,created_date}, orders.{id,created_date}, products.{id,created_date}
```

---

### Pattern 5: Date Columns Only

```
*.*_date, *.*_timestamp
```
**Result**: All columns ending with _date or _timestamp

## Testing Prompt Variables

### 1. Validate Expressions

Test expressions return expected columns:

```bash
# In Agent Foundry UI or via API
Test Variable: customer_data
Expression: customers.*, !customers.ssn

Expected: All customer columns except ssn
Actual: [Review output]
```

### 2. Check Data Access

Verify agent can access variable data:

```
Agent Prompt: "What customer data is available?"

Expected Response: Agent lists available fields
```

### 3. Test Exclusions

Confirm excluded data is not accessible:

```
Agent Prompt: "Show me customer email addresses"

Expected: Agent indicates email is not available
```

## Common Issues and Solutions

### Issue: Variable Not Found

**Symptoms:**
- Agent can't access variable
- Error: "Variable not defined"

**Solution:**
- Check variable name spelling
- Verify KB is attached to agent
- Ensure target function is selected
- Validate expression syntax

---

### Issue: Too Much Data Returned

**Symptoms:**
- Slow agent response
- Large data payloads

**Solution:**
- Use specific column selection
- Exclude large text fields
- Filter to relevant tables only
- Add more exclusions

---

### Issue: Missing Expected Columns

**Symptoms:**
- Agent says data not available
- Columns don't appear in results

**Solution:**
- Check column names (case-sensitive)
- Verify table exists in KB
- Review exclusion patterns
- Test expression in isolation

---

### Issue: Exclusion Not Working

**Symptoms:**
- Excluded data still appears

**Solution:**
- Check negation syntax (!expression)
- Verify pattern matching
- Test exclusion independently
- Review expression order

## Advanced Patterns

### Dynamic Time-Based Data

```
transactions.*,
!transactions.*_before_2024,
transactions.{date,amount,status}
```

### Regional Filtering

```
customers_{us,ca,mx}.*,
!customers_eu.*,
!customers_apac.*
```

### Role-Based Access

```
# For managers
employees.*,
performance_reviews.*

# For regular employees
employees.{id,name,department,title},
!employees.salary,
!performance_reviews
```

## Next Steps

After configuring prompt variables:

1. [Review Model Comparison](07_Model_Comparison_Guide.md)
2. [Test Your Agent](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)
3. [Validate Data Access](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)
4. [Deploy to Production](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)

---

**Last Updated**: November 12, 2025
**Version**: 2.0.0
**Related to**: PM Agent Squad Master Template
