# Agent Foundry - Add Output Guide

## Overview

Outputs define how your agent returns structured information. This guide explains how to configure custom outputs and artifacts in Amazon Bedrock Agent Foundry.

## Output Types

Agent Foundry supports two main output types:

| Output Type | Purpose | Best For |
|-------------|---------|----------|
| **Custom** | Structured JSON data | APIs, data persistence, programmatic access |
| **Artifact** | Rendered content | User-facing content, visualizations, formatted text |

## Configuration Fields

### Common Fields (All Output Types)

| Field | Description | Required | Example |
|-------|-------------|----------|---------|
| **Output Name** | Unique identifier | ✅ Yes | `campaign_plan`, `plotly_chart`, `email_draft` |
| **Function Name** | Name agent uses to call output | ✅ Yes | `generate_campaign_plan`, `create_visualization` |
| **Function Description** | How the output should be used | ⚪ Optional | "Generate comprehensive campaign plan with budget allocation" |

### Custom Output (JSON Schema)

| Field | Description | Instructions |
|-------|-------------|--------------|
| **Output Type** | Type selection | Select "Custom" |
| **JSON Schema** | Data structure definition | Define output structure using JSON Schema |

**Use Custom When:**
- Need structured data for APIs
- Storing results in database
- Passing data to other systems
- Programmatic processing required

### Artifact Output

| Field | Description | Options |
|-------|-------------|---------|
| **Output Type** | Type selection | Select "Artifact" |
| **Artifact Content Type** | Format of artifact | Text, Image, React |

**Artifact Content Types:**

1. **Text** - Formatted text content
   - Use for: Documents, reports, formatted responses
   - Supports: Markdown, plain text, structured text

2. **Image** - Visual content
   - Use for: Generated images, charts, diagrams
   - Supports: PNG, JPEG, SVG

3. **React** - Interactive components
   - Use for: Dashboards, interactive visualizations, dynamic content
   - Supports: Plotly.js, Tailwind CSS
   - Executes as live React component

## Special Output: Plotly Charts

**Special Name**: `:plotly:`

When you name an output `:plotly:`, Agent Foundry automatically renders it as a Plotly chart.

```json
{
  "outputName": ":plotly:",
  "functionName": "create_chart",
  "outputType": "Artifact",
  "artifactContentType": "React"
}
```

## JSON Schema Guide

### Basic Structure

```json
{
  "type": "object",
  "properties": {
    "field_name": {
      "type": "string|number|boolean|array|object",
      "description": "Field description"
    }
  },
  "required": ["required_field_1", "required_field_2"]
}
```

### Complete Example: Campaign Plan Output

```json
{
  "type": "object",
  "description": "Comprehensive marketing campaign plan",
  "properties": {
    "campaign_name": {
      "type": "string",
      "description": "Unique campaign identifier",
      "minLength": 3,
      "maxLength": 100
    },
    "objective": {
      "type": "string",
      "description": "Primary campaign objective",
      "enum": [
        "Brand Awareness",
        "Lead Generation",
        "Sales Conversion",
        "Customer Retention"
      ]
    },
    "platforms": {
      "type": "array",
      "description": "Advertising platforms to use",
      "items": {
        "type": "string",
        "enum": ["Meta", "Google Ads", "Pinterest", "TikTok"]
      },
      "minItems": 1
    },
    "budget": {
      "type": "object",
      "description": "Budget allocation details",
      "properties": {
        "total": {
          "type": "number",
          "description": "Total campaign budget in USD",
          "minimum": 0
        },
        "allocation": {
          "type": "object",
          "description": "Budget split by funnel stage",
          "properties": {
            "awareness": {
              "type": "number",
              "description": "Top of funnel budget percentage",
              "minimum": 0,
              "maximum": 100
            },
            "consideration": {
              "type": "number",
              "description": "Middle of funnel budget percentage",
              "minimum": 0,
              "maximum": 100
            },
            "conversion": {
              "type": "number",
              "description": "Bottom of funnel budget percentage",
              "minimum": 0,
              "maximum": 100
            }
          },
          "required": ["awareness", "consideration", "conversion"]
        }
      },
      "required": ["total", "allocation"]
    },
    "timeline": {
      "type": "object",
      "description": "Campaign timeline",
      "properties": {
        "start_date": {
          "type": "string",
          "description": "Campaign start date",
          "format": "date"
        },
        "end_date": {
          "type": "string",
          "description": "Campaign end date",
          "format": "date"
        },
        "duration_days": {
          "type": "integer",
          "description": "Total campaign duration in days",
          "minimum": 1
        }
      },
      "required": ["start_date", "end_date", "duration_days"]
    },
    "target_audience": {
      "type": "object",
      "description": "Audience targeting parameters",
      "properties": {
        "demographics": {
          "type": "object",
          "properties": {
            "age_range": {
              "type": "object",
              "properties": {
                "min": {"type": "integer", "minimum": 13},
                "max": {"type": "integer", "maximum": 65}
              }
            },
            "gender": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["Male", "Female", "Non-binary", "All"]
              }
            },
            "locations": {
              "type": "array",
              "items": {"type": "string"},
              "description": "Geographic targeting"
            }
          }
        },
        "interests": {
          "type": "array",
          "items": {"type": "string"},
          "description": "Interest-based targeting"
        },
        "behaviors": {
          "type": "array",
          "items": {"type": "string"},
          "description": "Behavioral targeting"
        }
      }
    },
    "kpis": {
      "type": "array",
      "description": "Key performance indicators",
      "items": {
        "type": "object",
        "properties": {
          "metric": {
            "type": "string",
            "description": "KPI name"
          },
          "target": {
            "type": "number",
            "description": "Target value"
          },
          "unit": {
            "type": "string",
            "description": "Unit of measurement"
          }
        },
        "required": ["metric", "target"]
      }
    },
    "creative_requirements": {
      "type": "object",
      "description": "Creative asset requirements",
      "properties": {
        "ad_formats": {
          "type": "array",
          "items": {"type": "string"}
        },
        "messaging": {
          "type": "string",
          "description": "Key messaging points"
        },
        "visual_style": {
          "type": "string",
          "description": "Visual design guidelines"
        }
      }
    }
  },
  "required": [
    "campaign_name",
    "objective",
    "platforms",
    "budget",
    "timeline",
    "target_audience",
    "kpis"
  ]
}
```

## Output Examples

### Example 1: Simple Text Artifact

**Configuration:**
```json
{
  "outputName": "email_draft",
  "functionName": "create_email",
  "functionDescription": "Generate professional email draft",
  "outputType": "Artifact",
  "artifactContentType": "Text"
}
```

**Agent Output:**
```
Subject: Exclusive Summer Sale - 30% Off All Products

Dear Valued Customer,

We're excited to announce our biggest sale of the season! For a limited
time, enjoy 30% off all products in our store.

Sale Details:
• Dates: June 1-15, 2024
• Discount: 30% off everything
• Free shipping on orders over $50

Shop now: [Link to Store]

Best regards,
Marketing Team
```

### Example 2: Plotly Chart

**Configuration:**
```json
{
  "outputName": ":plotly:",
  "functionName": "create_performance_chart",
  "functionDescription": "Create interactive performance visualization",
  "outputType": "Artifact",
  "artifactContentType": "React"
}
```

**Agent Output (React Code):**
```javascript
import React from 'react';
import Plot from 'react-plotly.js';

function PerformanceChart() {
  const data = [{
    x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    y: [1200, 1800, 2400, 3200],
    type: 'bar',
    name: 'Conversions',
    marker: { color: '#6366f1' }
  }];

  const layout = {
    title: 'Campaign Performance',
    xaxis: { title: 'Time Period' },
    yaxis: { title: 'Conversions' }
  };

  return <Plot data={data} layout={layout} />;
}

export default PerformanceChart;
```

### Example 3: Structured JSON Output

**Configuration:**
```json
{
  "outputName": "campaign_plan",
  "functionName": "generate_campaign_plan",
  "functionDescription": "Generate comprehensive campaign plan",
  "outputType": "Custom",
  "jsonSchema": {
    "type": "object",
    "properties": {
      "campaign_name": {"type": "string"},
      "budget": {"type": "number"},
      "platforms": {
        "type": "array",
        "items": {"type": "string"}
      }
    },
    "required": ["campaign_name", "budget", "platforms"]
  }
}
```

**Agent Output:**
```json
{
  "campaign_name": "Summer Product Launch 2024",
  "budget": 50000,
  "platforms": ["Meta", "Google Ads", "TikTok"],
  "timeline": {
    "start_date": "2024-06-01",
    "end_date": "2024-08-31",
    "duration_days": 92
  },
  "budget_allocation": {
    "Meta": 20000,
    "Google Ads": 20000,
    "TikTok": 10000
  },
  "kpis": [
    {
      "metric": "Conversions",
      "target": 500,
      "unit": "sales"
    },
    {
      "metric": "ROAS",
      "target": 4.0,
      "unit": "ratio"
    }
  ]
}
```

### Example 4: Interactive Dashboard (React)

**Configuration:**
```json
{
  "outputName": "campaign_dashboard",
  "functionName": "create_dashboard",
  "outputType": "Artifact",
  "artifactContentType": "React"
}
```

**Agent Output:**
```javascript
import React from 'react';
import Plot from 'react-plotly.js';

function CampaignDashboard() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Campaign Performance Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded">
          <div className="text-sm text-gray-600">Total Spend</div>
          <div className="text-3xl font-bold text-blue-600">$45,230</div>
        </div>
        <div className="p-4 bg-green-50 rounded">
          <div className="text-sm text-gray-600">Conversions</div>
          <div className="text-3xl font-bold text-green-600">1,248</div>
        </div>
        <div className="p-4 bg-purple-50 rounded">
          <div className="text-sm text-gray-600">ROAS</div>
          <div className="text-3xl font-bold text-purple-600">4.2x</div>
        </div>
        <div className="p-4 bg-orange-50 rounded">
          <div className="text-sm text-gray-600">CTR</div>
          <div className="text-3xl font-bold text-orange-600">2.8%</div>
        </div>
      </div>

      <Plot
        data={[{
          x: ['Meta', 'Google', 'Pinterest', 'TikTok'],
          y: [15000, 18000, 7000, 5230],
          type: 'bar',
          marker: { color: ['#1877f2', '#4285f4', '#e60023', '#000000'] }
        }]}
        layout={{
          title: 'Spend by Platform',
          height: 400
        }}
      />
    </div>
  );
}

export default CampaignDashboard;
```

## Best Practices

### 1. JSON Schema Design

**✅ Good Practices:**
- Use descriptive field names
- Include descriptions for all fields
- Set appropriate constraints (min, max, enum)
- Define required fields
- Use appropriate data types
- Validate against real data

**❌ Avoid:**
- Generic field names like "data", "info"
- Missing descriptions
- No validation constraints
- Overly complex nested structures
- Inconsistent naming conventions

### 2. Artifact Content

**For Text Artifacts:**
- Use Markdown for formatting
- Structure with clear headings
- Include examples where helpful
- Make it user-friendly

**For React Artifacts:**
- Keep components simple
- Use Tailwind CSS for styling
- Test Plotly.js visualizations
- Ensure responsive design
- Handle edge cases

### 3. Output Naming

**✅ Good Names:**
- `campaign_plan`
- `performance_report`
- `budget_breakdown`
- `:plotly:` (for charts)

**❌ Avoid:**
- `output1`
- `data`
- `result`

### 4. Function Descriptions

**✅ Clear Description:**
```
"Generate a comprehensive campaign plan including budget allocation,
platform recommendations, target audience definition, and KPI framework.
Output is structured JSON for API integration."
```

**❌ Vague Description:**
```
"Creates plan"
```

## React + Plotly.js Examples

### Line Chart

```javascript
import Plot from 'react-plotly.js';

function LineChart() {
  return (
    <Plot
      data={[{
        x: [1, 2, 3, 4, 5],
        y: [1, 3, 2, 4, 3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: '#6366f1' }
      }]}
      layout={{ title: 'Trend Over Time' }}
    />
  );
}
```

### Pie Chart

```javascript
import Plot from 'react-plotly.js';

function PieChart() {
  return (
    <Plot
      data={[{
        values: [40, 30, 20, 10],
        labels: ['Meta', 'Google', 'Pinterest', 'TikTok'],
        type: 'pie',
        marker: {
          colors: ['#1877f2', '#4285f4', '#e60023', '#000000']
        }
      }]}
      layout={{ title: 'Budget Distribution' }}
    />
  );
}
```

### Multi-Series Chart

```javascript
import Plot from 'react-plotly.js';

function MultiSeriesChart() {
  return (
    <Plot
      data={[
        {
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          y: [1200, 1800, 2400, 3200],
          name: 'Conversions',
          type: 'bar'
        },
        {
          x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          y: [15000, 22000, 28000, 35000],
          name: 'Revenue',
          type: 'scatter',
          yaxis: 'y2'
        }
      ]}
      layout={{
        title: 'Performance Metrics',
        yaxis: { title: 'Conversions' },
        yaxis2: {
          title: 'Revenue ($)',
          overlaying: 'y',
          side: 'right'
        }
      }}
    />
  );
}
```

## Tailwind CSS in React Artifacts

**Available Classes:**
- Layout: `flex`, `grid`, `container`
- Spacing: `p-4`, `m-6`, `gap-4`
- Colors: `bg-blue-50`, `text-gray-600`
- Typography: `text-2xl`, `font-bold`
- Borders: `rounded-lg`, `border`
- Shadows: `shadow-lg`

**Example:**
```javascript
<div className="p-6 bg-white rounded-lg shadow-lg">
  <h2 className="text-xl font-bold text-gray-800 mb-4">
    Campaign Metrics
  </h2>
  <div className="grid grid-cols-3 gap-4">
    <div className="p-4 bg-blue-50 rounded">
      <span className="text-sm text-gray-600">Impressions</span>
      <p className="text-2xl font-bold text-blue-600">1.2M</p>
    </div>
  </div>
</div>
```

## Common Issues and Solutions

### Issue: JSON Schema Validation Fails

**Solution:**
- Validate JSON schema syntax online
- Check all required fields are present
- Ensure data types match
- Test with sample data

### Issue: React Artifact Doesn't Render

**Solution:**
- Check React syntax
- Ensure Plotly.js usage is correct
- Verify Tailwind classes are valid
- Test component independently

### Issue: Output Not Persisting

**Solution:**
- Ensure using Custom type for persistence
- Verify JSON schema is complete
- Check output is properly attached to agent

### Issue: Plotly Chart Not Showing

**Solution:**
- Verify output name is `:plotly:`
- Check data format
- Ensure layout is defined
- Test with simple example first

## Testing Outputs

### Test JSON Outputs

1. Create sample data matching schema
2. Validate against JSON schema
3. Test with edge cases
4. Verify all required fields

### Test Artifacts

1. Generate with test data
2. Check formatting and styling
3. Verify interactivity (for React)
4. Test on different screen sizes

## Next Steps

After configuring outputs:

1. [Add Prompt Variables](06_Add_Prompt_Variables_Guide.md)
2. [Review Model Comparison](07_Model_Comparison_Guide.md)
3. [Test Your Agent](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)
4. [Deploy to Production](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)

---

**Last Updated**: November 12, 2025
**Version**: 2.0.0
**Related to**: PM Agent Squad Master Template
