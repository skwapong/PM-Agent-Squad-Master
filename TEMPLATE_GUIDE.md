# PM Agent Squad Master - Template Customization Guide

## Overview

This template provides a complete foundation for building custom AI agents for Amazon Bedrock Agent Foundry. It includes a chat interface, knowledge base system, deployment configuration, and Agent Foundry setup files.

## Quick Start

### 1. Run the Setup Script

```bash
./setup.sh
```

The setup script will guide you through:
- Setting your agent name and description
- Configuring welcome messages
- Setting up knowledge bases
- Installing dependencies

### 2. Manual Customization

If you prefer to customize manually, follow these steps:

## Customization Steps

### Step 1: Update Agent Configuration

Edit `agent.config.json` to customize your agent:

```json
{
  "agent": {
    "name": "Your Agent Name",
    "displayName": "Your Agent Display Name",
    "description": "Brief description of your agent",
    "welcomeMessage": "Custom welcome message",
    "icon": "🤖",
    "color": "#6366f1"
  }
}
```

### Step 2: Customize Knowledge Bases

1. **Navigate to Knowledge Bases Folder**
   ```bash
   cd Agent_Knowledge_Bases
   ```

2. **Replace or Modify Knowledge Base Files**
   - All files are in Markdown (.md) format
   - Each file should contain domain-specific knowledge for your agent
   - Keep files under 18,000 characters for Bedrock compatibility

3. **Recommended Structure**
   - KB1: Core domain knowledge and fundamentals
   - KB2-KB10: Specialized topic knowledge
   - Use clear headings and bullet points
   - Include examples and best practices

### Step 3: Configure Quick Actions

Edit `agent.config.json` to add/modify quick action buttons:

```json
"quickActions": [
  {
    "id": "unique-id",
    "label": "Button Label",
    "icon": "lightning",  // Options: lightning, target, dollar, brush, chart
    "prompt": "Prompt sent when clicked",
    "category": "category-name"
  }
]
```

### Step 4: Customize the Chat Interface

Edit `Agent_Chat_Interface.jsx`:

1. **Update Component Name**
   ```javascript
   const YourAgentChatInterface = () => {
   ```

2. **Modify Initial Welcome Message**
   ```javascript
   const [messages, setMessages] = useState([
     {
       role: 'assistant',
       content: "Your custom welcome message here"
     }
   ]);
   ```

3. **Customize Quick Action Buttons**
   Update the `quickActions` array to match your `agent.config.json`

4. **Adjust Styling**
   - Modify Tailwind classes for colors and layout
   - Update gradient backgrounds
   - Change icon colors

### Step 5: Update Agent Foundry Configuration

Navigate to `Agent_Config/` and update:

1. **01_Create_Agent.csv**
   - Agent name
   - Description
   - Instructions
   - Model selection

2. **02_Add_Tools_Knowledge_Bases.csv**
   - List your knowledge base file names
   - Configure any tools or APIs

3. **03_Add_Output.csv**
   - Define output format preferences
   - Set response structure

### Step 6: Update Project Metadata

1. **package.json**
   ```json
   {
     "name": "your-agent-name",
     "description": "Your agent description",
     "version": "1.0.0"
   }
   ```

2. **index.html**
   ```html
   <title>Your Agent Name</title>
   <meta name="description" content="Your agent description">
   ```

## File Structure Reference

```
PM-Agent-Squad-Master/
├── agent.config.json              # Central configuration file
├── setup.sh                       # Automated setup script
├── Agent_Chat_Interface.jsx       # Main chat UI component
├── Agent_Knowledge_Bases/         # Knowledge base files (.md)
│   ├── KB1_Primary_Knowledge.md
│   ├── KB2_Secondary_Knowledge.md
│   └── ...
├── Agent_Config/                  # Bedrock Agent Foundry config
│   ├── 01_Create_Agent.csv
│   ├── 02_Add_Tools_Knowledge_Bases.csv
│   └── 03_Add_Output.csv
├── src/                          # Source files
├── dist/                         # Build output
├── package.json                  # Node dependencies
├── vite.config.js               # Build configuration
└── README.md                    # Main documentation
```

## Common Customization Scenarios

### Scenario 1: HR Assistant Agent

1. **Update agent.config.json**
   ```json
   {
     "agent": {
       "name": "HR Assistant",
       "description": "Employee support and HR policy assistant",
       "icon": "👥"
     }
   }
   ```

2. **Create Knowledge Bases**
   - KB1_Company_Policies.md
   - KB2_Benefits_Information.md
   - KB3_Leave_Procedures.md
   - KB4_Onboarding_Guide.md

3. **Update Quick Actions**
   - "Request Time Off"
   - "Benefits Overview"
   - "Company Policies"
   - "IT Support"

### Scenario 2: Customer Support Agent

1. **Update agent.config.json**
   ```json
   {
     "agent": {
       "name": "Customer Support Bot",
       "description": "24/7 customer support assistant",
       "icon": "💬"
     }
   }
   ```

2. **Create Knowledge Bases**
   - KB1_Product_Documentation.md
   - KB2_Common_Issues_Solutions.md
   - KB3_Return_Policy.md
   - KB4_Shipping_Information.md

3. **Update Quick Actions**
   - "Track Order"
   - "Return Request"
   - "Product Help"
   - "Contact Human Agent"

### Scenario 3: Technical Documentation Agent

1. **Update agent.config.json**
   ```json
   {
     "agent": {
       "name": "Tech Docs Assistant",
       "description": "Developer documentation helper",
       "icon": "📚"
     }
   }
   ```

2. **Create Knowledge Bases**
   - KB1_API_Reference.md
   - KB2_Getting_Started.md
   - KB3_Code_Examples.md
   - KB4_Troubleshooting.md

3. **Update Quick Actions**
   - "API Reference"
   - "Quick Start Guide"
   - "Code Examples"
   - "Troubleshooting"

## Best Practices

### Knowledge Base Design

1. **Structure Content Clearly**
   - Use hierarchical headings (H1, H2, H3)
   - Break content into digestible sections
   - Include examples and use cases

2. **Optimize for Search**
   - Use descriptive headings
   - Include relevant keywords
   - Add cross-references

3. **Keep Files Manageable**
   - Stay under 18,000 characters per file
   - Split large topics across multiple files
   - Use consistent naming conventions

### Agent Instructions

1. **Be Specific**
   - Define clear role and responsibilities
   - Specify tone and style
   - Set boundaries on what agent can/cannot do

2. **Provide Context**
   - Explain the agent's purpose
   - Define target users
   - Clarify use cases

3. **Structure Responses**
   - Define preferred response format
   - Set expectations for detail level
   - Specify when to ask clarifying questions

### UI/UX Customization

1. **Maintain Accessibility**
   - Ensure sufficient color contrast
   - Keep button sizes touch-friendly
   - Use semantic HTML

2. **Brand Consistency**
   - Match company colors and fonts
   - Use appropriate iconography
   - Maintain consistent spacing

3. **Mobile Responsiveness**
   - Test on multiple screen sizes
   - Ensure buttons are easily tappable
   - Optimize for vertical scrolling

## Deployment Options

### Vercel (Recommended)

```bash
npm run deploy
```

### Netlify

1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### AWS S3 + CloudFront

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

### GitHub Pages

```bash
npm run build
# Push dist folder to gh-pages branch
```

## Testing Your Agent

### Local Testing

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Quick Actions**
   - Click each quick action button
   - Verify prompts are correct
   - Check response quality

3. **Test Knowledge Retrieval**
   - Ask questions from your knowledge bases
   - Verify accurate information retrieval
   - Check citation and source handling

### Production Testing

1. **Deploy to Staging**
   - Test in production-like environment
   - Verify all assets load correctly
   - Check mobile responsiveness

2. **User Acceptance Testing**
   - Have team members test key workflows
   - Collect feedback on UX
   - Identify edge cases

## Troubleshooting

### Knowledge Bases Not Loading

- Verify file names in `agent.config.json` match actual files
- Check file sizes (must be < 18,000 characters)
- Ensure files are valid Markdown

### Quick Actions Not Working

- Verify `agent.config.json` is valid JSON
- Check that quick actions array is properly formatted
- Ensure icon names are valid

### Build Errors

- Run `npm install` to ensure dependencies are installed
- Clear build cache: `rm -rf dist node_modules && npm install`
- Check Node.js version (recommend v18+)

### Styling Issues

- Verify Tailwind CSS classes are correct
- Check for CSS conflicts
- Review responsive breakpoints

## Advanced Customization

### Adding Custom Tools/APIs

1. Update `Agent_Config/02_Add_Tools_Knowledge_Bases.csv`
2. Add API endpoint configurations
3. Update agent instructions to reference tools

### Integrating External Data Sources

1. Create API integration in chat interface
2. Add data fetching functions
3. Update knowledge bases with dynamic content

### Multi-Language Support

1. Create separate knowledge bases per language
2. Add language detection
3. Update UI strings for i18n

## Support and Resources

### Documentation
- [Amazon Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Community
- Share your customizations with the team
- Document unique use cases
- Contribute improvements back to template

## Version Control

When sharing with team members:

1. **Remove Sensitive Data**
   - Clear any API keys or credentials
   - Remove company-specific knowledge bases
   - Anonymize examples

2. **Document Customizations**
   - List what you've changed
   - Explain why changes were made
   - Provide setup instructions

3. **Tag Releases**
   - Use semantic versioning
   - Tag stable versions
   - Maintain changelog

---

**Happy Agent Building!** 🚀

If you have questions or suggestions for improving this template, please contribute back to the project.
