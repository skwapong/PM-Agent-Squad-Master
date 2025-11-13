# Agent Foundry - Add Output Configuration

## Campaign Strategist & Planner Agent - Output Formats

This guide provides configuration for all 6 output formats that structure how your agent delivers information.

---

## 📋 Overview

Outputs define how your agent structures and formats responses. Agent Foundry supports two main output types:

- **Custom (JSON Schema)** - Structured data outputs
- **Artifact** - Rendered content (Text, Image, React)

**Total Outputs:** 6
- 4 Custom JSON outputs
- 2 Artifact Text outputs

---

## 🎯 Output Types Explained

### Custom Outputs
- Use JSON schema to define structure
- Great for structured data
- Can be consumed by other systems
- Enables data validation

### Artifact Outputs
- Rendered directly to user
- Supports Text, Image, and React
- Great for presentations
- User-friendly display

---

## 📊 Output Configurations

### OUTPUT 1: Campaign Plan (Structured JSON)

**Purpose:** Generate comprehensive campaign plans with all key elements

| Field | Value |
|-------|-------|
| **Output name** | `campaign_plan` |
| **Function name** | `generate_campaign_plan` |
| **Function description** | Generate a comprehensive digital marketing campaign plan including strategy overview, platform recommendations, budget allocation, audience targeting, creative direction, KPIs, and implementation timeline. |
| **Output Type** | Custom |

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "campaign_overview": {
      "type": "object",
      "properties": {
        "campaign_name": { "type": "string" },
        "primary_objective": { "type": "string" },
        "target_audience": { "type": "string" },
        "budget": { "type": "string" },
        "duration": { "type": "string" }
      }
    },
    "platform_strategy": {
      "type": "object",
      "properties": {
        "recommended_platforms": {
          "type": "array",
          "items": { "type": "string" }
        },
        "platform_rationale": { "type": "string" },
        "budget_allocation": {
          "type": "object",
          "additionalProperties": { "type": "string" }
        }
      }
    },
    "audience_targeting": {
      "type": "object",
      "properties": {
        "primary_persona": { "type": "string" },
        "demographics": { "type": "string" },
        "interests": {
          "type": "array",
          "items": { "type": "string" }
        },
        "behaviors": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "creative_direction": {
      "type": "object",
      "properties": {
        "key_messages": {
          "type": "array",
          "items": { "type": "string" }
        },
        "visual_style": { "type": "string" },
        "ad_formats": {
          "type": "array",
          "items": { "type": "string" }
        },
        "cta_recommendations": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "kpis": {
      "type": "object",
      "properties": {
        "primary_kpi": { "type": "string" },
        "secondary_kpis": {
          "type": "array",
          "items": { "type": "string" }
        },
        "benchmarks": { "type": "string" }
      }
    },
    "implementation_timeline": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "phase": { "type": "string" },
          "duration": { "type": "string" },
          "activities": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      }
    },
    "next_steps": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": [
    "campaign_overview",
    "platform_strategy",
    "kpis",
    "next_steps"
  ]
}
```

**When to use:**
- User requests "Create a campaign plan for..."
- Comprehensive campaign strategy needed
- Multi-platform campaign planning
- Full funnel approach required

---

### OUTPUT 2: Budget Allocation (Structured JSON)

**Purpose:** Generate detailed budget breakdowns

| Field | Value |
|-------|-------|
| **Output name** | `budget_allocation` |
| **Function name** | `generate_budget_allocation` |
| **Function description** | Generate detailed budget allocation breakdown across platforms and funnel stages with rationale and expected outcomes. |
| **Output Type** | Custom |

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "total_budget": {
      "type": "object",
      "properties": {
        "monthly_amount": { "type": "string" },
        "duration_months": { "type": "number" },
        "total_campaign_budget": { "type": "string" }
      }
    },
    "funnel_allocation": {
      "type": "object",
      "properties": {
        "awareness": { "type": "string" },
        "consideration": { "type": "string" },
        "conversion": { "type": "string" }
      }
    },
    "platform_breakdown": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "platform": { "type": "string" },
          "monthly_budget": { "type": "string" },
          "percentage": { "type": "string" },
          "rationale": { "type": "string" },
          "expected_metrics": {
            "type": "object",
            "additionalProperties": { "type": "string" }
          }
        }
      }
    },
    "testing_budget": { "type": "string" },
    "optimization_reserve": { "type": "string" },
    "expected_outcomes": {
      "type": "object",
      "properties": {
        "estimated_reach": { "type": "string" },
        "estimated_conversions": { "type": "string" },
        "target_roas": { "type": "string" },
        "target_cpa": { "type": "string" }
      }
    }
  },
  "required": [
    "total_budget",
    "platform_breakdown",
    "expected_outcomes"
  ]
}
```

**When to use:**
- User asks "How should I allocate my budget?"
- Budget optimization needed
- Platform distribution questions
- ROI projections required

---

### OUTPUT 3: Creative Brief (Structured JSON)

**Purpose:** Generate comprehensive creative briefs

| Field | Value |
|-------|-------|
| **Output name** | `creative_brief` |
| **Function name** | `generate_creative_brief` |
| **Function description** | Generate a comprehensive creative brief for a specific platform including campaign objective, target audience, key messages, visual direction, ad specifications, and success metrics. |
| **Output Type** | Custom |

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "brief_overview": {
      "type": "object",
      "properties": {
        "platform": { "type": "string" },
        "campaign_objective": { "type": "string" },
        "target_audience": { "type": "string" }
      }
    },
    "key_messages": {
      "type": "object",
      "properties": {
        "primary_message": { "type": "string" },
        "supporting_messages": {
          "type": "array",
          "items": { "type": "string" }
        },
        "unique_value_proposition": { "type": "string" },
        "proof_points": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "call_to_action": {
      "type": "object",
      "properties": {
        "primary_cta": { "type": "string" },
        "alternative_ctas": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "tone_and_voice": {
      "type": "object",
      "properties": {
        "personality": { "type": "string" },
        "emotional_tone": { "type": "string" }
      }
    },
    "visual_direction": {
      "type": "object",
      "properties": {
        "visual_style": { "type": "string" },
        "color_palette": {
          "type": "array",
          "items": { "type": "string" }
        },
        "imagery_guidelines": { "type": "string" },
        "typography_guidelines": { "type": "string" }
      }
    },
    "deliverables": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "format": { "type": "string" },
          "specifications": { "type": "string" },
          "quantity": { "type": "string" }
        }
      }
    },
    "success_metrics": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": [
    "brief_overview",
    "key_messages",
    "visual_direction",
    "deliverables"
  ]
}
```

**When to use:**
- User requests "Create a creative brief for..."
- Specific creative direction needed
- Working with design teams
- Platform-specific creative requirements

---

### OUTPUT 4: Campaign Text (Artifact - Formatted Text)

**Purpose:** Generate readable campaign strategies and recommendations

| Field | Value |
|-------|-------|
| **Output name** | `campaign_text` |
| **Function name** | `generate_campaign_text` |
| **Function description** | Generate campaign strategy and recommendations in formatted text for easy reading and sharing. |
| **Output Type** | Artifact |
| **Artifact content type** | Text |

**When to use:**
- User wants easy-to-read format
- Sharing recommendations via email
- Quick overview needed
- Non-technical stakeholders

**Example Output:**
```
CAMPAIGN STRATEGY RECOMMENDATION
==================================

Campaign Overview
-----------------
Campaign Name: Summer Product Launch
Objective: Drive awareness and sales
Budget: $50,000 over 3 months

Platform Recommendations
------------------------
1. Meta (Facebook & Instagram) - 50% ($25,000)
   - Strong visual product showcase
   - Retargeting capabilities

2. Google Ads - 30% ($15,000)
   - Capture search intent
   - Shopping campaigns

3. Pinterest - 20% ($10,000)
   - Discovery platform
   - Visual inspiration

[Continue with more sections...]
```

---

### OUTPUT 5: Campaign Summary (Artifact - Formatted Text)

**Purpose:** Generate concise executive summaries

| Field | Value |
|-------|-------|
| **Output name** | `campaign_summary` |
| **Function name** | `generate_campaign_summary` |
| **Function description** | Generate a concise executive summary of campaign recommendations. |
| **Output Type** | Artifact |
| **Artifact content type** | Text |

**When to use:**
- Executive-level overview
- Quick decision-making
- High-level stakeholder communication
- Email summaries

**Example Output:**
```
EXECUTIVE SUMMARY
=================

Recommended Strategy: Multi-platform awareness campaign
Primary Platform: Meta (50% of budget)
Target Audience: Women 25-45, lifestyle interests
Budget: $50,000 over 3 months
Expected ROAS: 4-6x

Key Recommendations:
1. Lead with Meta for awareness
2. Support with Google for conversions
3. Test Pinterest for discovery
4. Allocate 15% for testing

Next Steps:
- Approve budget allocation
- Finalize creative direction
- Set up tracking infrastructure
```

---

### OUTPUT 6: Campaign Plan Visual (Plotly Chart)

**Purpose:** Generate visual representations of campaign data

| Field | Value |
|-------|-------|
| **Output name** | `:plotly:` |
| **Function name** | `generate_campaign_visual` |
| **Function description** | Generate visual representation of campaign plan including budget allocation charts, funnel stage breakdown, platform distribution, and timeline visualization using Plotly charts. |
| **Output Type** | Custom |

**JSON Schema:**
```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "array",
      "description": "Array of Plotly trace objects for visualization",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "description": "Chart type: bar, pie, scatter, line, funnel, timeline, etc."
          },
          "x": {
            "type": "array",
            "description": "X-axis data values"
          },
          "y": {
            "type": "array",
            "description": "Y-axis data values"
          },
          "name": {
            "type": "string",
            "description": "Trace name for legend"
          },
          "labels": {
            "type": "array",
            "description": "Labels for pie charts"
          },
          "values": {
            "type": "array",
            "description": "Values for pie charts"
          },
          "marker": {
            "type": "object",
            "description": "Marker styling properties"
          }
        }
      }
    },
    "layout": {
      "type": "object",
      "description": "Plotly layout configuration",
      "properties": {
        "title": {
          "type": "string",
          "description": "Chart title"
        },
        "xaxis": {
          "type": "object",
          "properties": {
            "title": { "type": "string" }
          }
        },
        "yaxis": {
          "type": "object",
          "properties": {
            "title": { "type": "string" }
          }
        },
        "showlegend": {
          "type": "boolean"
        },
        "height": {
          "type": "number"
        },
        "width": {
          "type": "number"
        }
      }
    }
  },
  "required": ["data", "layout"]
}
```

**Special Note:**
The output name **`:plotly:`** is a special reserved name that tells Agent Foundry to render the JSON as a Plotly chart automatically.

**When to use:**
- User requests "Show me a visual breakdown..."
- Budget allocation visualization
- Platform comparison charts
- Funnel stage breakdown
- Timeline visualization

**Common Chart Types:**

1. **Pie Chart** - Budget allocation
```json
{
  "data": [{
    "type": "pie",
    "labels": ["Meta", "Google", "Pinterest"],
    "values": [25000, 15000, 10000]
  }],
  "layout": {
    "title": "Budget Allocation by Platform"
  }
}
```

2. **Bar Chart** - Platform comparison
```json
{
  "data": [{
    "type": "bar",
    "x": ["Meta", "Google", "Pinterest"],
    "y": [50, 30, 20],
    "name": "Budget %"
  }],
  "layout": {
    "title": "Platform Budget Distribution",
    "yaxis": { "title": "Percentage (%)" }
  }
}
```

3. **Funnel Chart** - Campaign funnel
```json
{
  "data": [{
    "type": "funnel",
    "y": ["Awareness", "Consideration", "Conversion"],
    "x": [40, 30, 30]
  }],
  "layout": {
    "title": "Funnel Budget Allocation"
  }
}
```

---

## ✅ Configuration Verification Checklist

After adding all outputs, verify:

### Output Configuration
- [ ] All 6 outputs created
- [ ] Output names match exactly
- [ ] Function names are unique and descriptive
- [ ] Function descriptions are clear
- [ ] Output types correct (4 Custom, 2 Artifact)
- [ ] JSON schemas valid (test with JSON validator)
- [ ] Required fields specified in schemas

### Artifact Outputs
- [ ] `campaign_text` set to Text artifact
- [ ] `campaign_summary` set to Text artifact
- [ ] Both artifact outputs working

### Plotly Output
- [ ] Output name is exactly `:plotly:`
- [ ] JSON schema includes `data` and `layout`
- [ ] Test with sample Plotly data

### Testing
- [ ] Test structured JSON outputs
- [ ] Test text artifact outputs
- [ ] Test Plotly visualization
- [ ] Verify all required fields present
- [ ] Check optional fields work

---

## 🎨 Customization for Other Domains

### HR Assistant Example

Replace campaign outputs with:

| Output | Type | Purpose |
|--------|------|---------|
| `employee_info` | Custom JSON | Employee data structure |
| `policy_summary` | Artifact Text | HR policy summaries |
| `org_chart` | :plotly: | Organization visualization |

### Customer Support Example

Replace with:

| Output | Type | Purpose |
|--------|------|---------|
| `ticket_data` | Custom JSON | Support ticket structure |
| `resolution_steps` | Artifact Text | Problem resolution guide |
| `ticket_stats` | :plotly: | Ticket metrics visualization |

---

## 💡 Pro Tips

### JSON Schema Best Practices

1. **Use descriptive property names**
```json
✅ Good: "monthly_budget", "target_audience"
❌ Avoid: "mb", "ta", "data1"
```

2. **Include type validation**
```json
{
  "budget": {
    "type": "string",
    "pattern": "^\\$[0-9,]+$"
  }
}
```

3. **Mark required fields**
```json
{
  "required": ["campaign_name", "budget", "duration"]
}
```

4. **Use arrays for lists**
```json
{
  "platforms": {
    "type": "array",
    "items": { "type": "string" }
  }
}
```

### Plotly Visualization Tips

**Color schemes:**
```json
{
  "marker": {
    "color": ["#6366f1", "#8b5cf6", "#ec4899"]
  }
}
```

**Responsive sizing:**
```json
{
  "layout": {
    "autosize": true,
    "height": 400
  }
}
```

**Professional styling:**
```json
{
  "layout": {
    "font": { "family": "Arial, sans-serif" },
    "showlegend": true,
    "legend": { "orientation": "h" }
  }
}
```

---

## ⚠️ Common Issues

### Issue: JSON schema validation fails

**Solutions:**
- Validate JSON schema at jsonschemavalidator.net
- Check for trailing commas
- Ensure all brackets closed
- Verify property types

### Issue: Plotly chart doesn't render

**Solutions:**
- Ensure output name is exactly `:plotly:`
- Verify `data` and `layout` objects present
- Check chart type is valid Plotly type
- Test data arrays are not empty

### Issue: Artifact not displaying

**Solutions:**
- Verify artifact type selected (Text/Image/React)
- Check output type set to "Artifact"
- Ensure content is properly formatted
- Test with simple text first

---

## 🚀 Next Steps

After configuring all outputs:

1. **Test each output** with appropriate prompts
2. **Verify JSON structure** matches schema
3. **Check Plotly charts** render correctly
4. **Review artifact formatting** for readability
5. **Deploy your agent** and monitor performance

---

## 📚 Related Guides

- **[Reference Files/05_Add_Output_Guide.md](../Reference%20Files/05_Add_Output_Guide.md)** - Comprehensive output configuration guide
- **[01_Create_Agent.md](01_Create_Agent.md)** - Agent creation configuration
- **[02_Add_Tools_Knowledge_Bases.md](02_Add_Tools_Knowledge_Bases.md)** - Knowledge base tools
- **[AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md](AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)** - Complete deployment guide

---

**Last Updated:** November 12, 2025
**Version:** 2.0.0
**Related to:** PM Agent Squad Master Template
