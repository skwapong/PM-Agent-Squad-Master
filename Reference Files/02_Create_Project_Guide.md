# Agent Foundry - Create Project Guide

## Overview

This guide explains how to create a project in Amazon Bedrock Agent Foundry. A project is the container for your agents, knowledge bases, and tools.

## Project Configuration Fields

### Required Fields

| Field | Description | Instructions |
|-------|-------------|--------------|
| **Project Name** | Describe what the project is about | Enter a clear, descriptive name for your project (e.g., "PM Agent Squad Master", "Customer Support Hub") |
| **Type** | Select whether the project is self-defined or Managed | **Default**: Self-defined<br>**Options**: Self-defined, Managed |
| **Description** | Describe the project in a few words | Provide a brief summary of the project's purpose and scope |

### Optional Features

| Feature | Description | When to Enable |
|---------|-------------|----------------|
| **Use Runtime Text Resource** | Runtime Text Knowledge Base can be used in the project if checked | Enable if you plan to use dynamic knowledge bases that can be updated at runtime |
| **Use Workflow Executor** | Workflow Executor tool can be used in the project if checked | Enable if you need to execute complex workflows or multi-step processes |

## Best Practices

### Project Naming

✅ **Good Examples:**
- "Marketing Campaign Strategist"
- "Customer Support Agent Hub"
- "HR Assistant Platform"
- "Technical Documentation Helper"

❌ **Avoid:**
- Generic names like "Project1", "Test"
- Names without clear purpose
- Overly long descriptions

### Project Type Selection

**Self-Defined Project:**
- Full control over configuration
- Custom agent setup
- Flexible architecture
- **Recommended for**: Custom use cases, unique requirements

**Managed Project:**
- Pre-configured templates
- Guided setup
- Best practices built-in
- **Recommended for**: Standard use cases, quick start

### Description Writing

A good project description should:
1. **Be concise** (1-2 sentences)
2. **State the purpose** clearly
3. **Mention target users** if relevant
4. **Highlight key capabilities**

**Example:**
```
"A comprehensive AI agent for brand managers and marketers to develop
strategic digital marketing campaigns across Meta, Pinterest, Google Ads,
and TikTok platforms."
```

## Step-by-Step Instructions

### Step 1: Access Agent Foundry

1. Log into AWS Console
2. Navigate to Amazon Bedrock
3. Select "Agent Foundry" from the left menu
4. Click "Create Project"

### Step 2: Enter Project Details

1. **Project Name**: Enter your project name
   - Example: "PM Agent Squad Master"

2. **Type**: Select "Self-defined" (recommended)

3. **Description**: Enter a clear description
   - Example: "Universal AI agent template for building custom agents with knowledge bases, plugins, and multi-agent support"

### Step 3: Configure Optional Features

1. **Runtime Text Resource**:
   - ☑ Check if you need dynamic knowledge bases
   - ☐ Leave unchecked for static knowledge bases only

2. **Workflow Executor**:
   - ☑ Check if you need complex workflows
   - ☐ Leave unchecked for simple Q&A agents

### Step 4: Review and Create

1. Review all settings
2. Click "Create Project"
3. Wait for project creation to complete

## Example Configurations

### Example 1: Marketing Agent

```
Project Name: Marketing Campaign Strategist
Type: Self-defined
Description: Expert digital marketing campaign strategist for Meta,
Pinterest, Google Ads, and TikTok platforms.

Runtime Text Resource: ☐ Unchecked
Workflow Executor: ☐ Unchecked
```

### Example 2: Customer Support Agent

```
Project Name: Customer Support Hub
Type: Self-defined
Description: 24/7 customer support assistant with access to product
documentation, FAQs, and order tracking capabilities.

Runtime Text Resource: ☑ Checked (for dynamic FAQ updates)
Workflow Executor: ☑ Checked (for order processing workflows)
```

### Example 3: HR Assistant

```
Project Name: HR Assistant Platform
Type: Self-defined
Description: Employee support system for HR policies, benefits
information, and leave management.

Runtime Text Resource: ☑ Checked (for policy updates)
Workflow Executor: ☑ Checked (for leave approval workflows)
```

## After Project Creation

Once your project is created:

1. ✅ **Create Agents** - Add one or more agents to your project
2. ✅ **Add Knowledge Bases** - Upload your knowledge base files
3. ✅ **Configure Tools** - Set up any required tools or integrations
4. ✅ **Test Agents** - Run test queries to validate functionality
5. ✅ **Deploy** - Deploy your agents to production

## Common Issues and Solutions

### Issue: Project Creation Fails

**Solution:**
- Check AWS permissions
- Verify region supports Agent Foundry
- Ensure project name is unique
- Check AWS service quotas

### Issue: Cannot Enable Runtime Text Resource

**Solution:**
- Verify your AWS account has necessary permissions
- Check if feature is available in your region
- Contact AWS support if issue persists

### Issue: Project Not Appearing

**Solution:**
- Refresh the page
- Check correct region is selected
- Verify project creation completed successfully

## Related Documentation

- [Create Agents Guide](02_Create_Agents_Guide.md)
- [Create Knowledge Base Guide](03_Create_Knowledge_Base_Guide.md)
- [Add Tools Guide](04_Add_Tools_Guide.md)
- [Agent Foundry Deployment Guide](../Agent_Config/AGENT_FOUNDRY_DEPLOYMENT_GUIDE.md)

## Tips for Success

1. **Plan First**: Design your agent architecture before creating the project
2. **Clear Naming**: Use descriptive names for easy identification
3. **Document**: Keep track of your project configuration
4. **Test Incrementally**: Create project → Add agent → Test → Add features
5. **Version Control**: Document changes to your project configuration

---

**Last Updated**: November 12, 2025
**Version**: 2.0.0
**Related to**: PM Agent Squad Master Template
