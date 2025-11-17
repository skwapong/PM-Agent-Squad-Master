# Agent Foundry Limits & Best Practices

This document outlines the technical limits and best practices for creating agents in AWS Bedrock Agent Foundry.

## Character Limits

### System Prompt
- **Maximum:** 9,000 characters
- **Enforcement:** Hard limit in Agent Foundry
- **Wizard Validation:** Character counter with visual warnings
  - 🟢 Normal: 0 - 8,099 characters (0-89%)
  - 🟡 Warning: 8,100 - 8,999 characters (90-99%)
  - 🔴 Error: 9,000+ characters (100%+)

**Best Practices:**
- Keep prompts concise and focused
- Use clear, direct language
- Avoid redundant instructions
- Focus on essential behaviors and constraints
- If approaching limit, review for areas to consolidate

### Knowledge Base Content
- **Maximum:** 18,000 characters per knowledge base
- **Enforcement:** Validation on knowledge base creation
- **Best Practices:**
  - Split large content across multiple knowledge bases
  - Focus each KB on a specific topic or domain
  - Use clear section headers for easier reference

## Validation Features

The Agent Builder Wizard includes automatic validation:

1. **Real-time Character Counting**
   - Live updates as you type
   - Color-coded indicators (gray → amber → red)
   - Visual warnings at 90% capacity

2. **Pre-submission Validation**
   - Blocks progression if limits exceeded
   - Clear error messages with guidance
   - Suggests remediation steps

3. **HTML maxlength Attribute**
   - Browser-level prevention of over-limit input
   - Stops typing at 9,000 characters
   - Works even if JavaScript is disabled

## UI Indicators

### Character Counter
Located below the System Prompt textarea:
```
0 / 9000  (Normal - gray)
8,100 / 9000  (Warning - amber, bold)
9,000 / 9000  (Error - red, bold)
```

### Warning Messages
- **At 90%:** "⚠️ System prompt is approaching the 9000 character limit"
- **At 100%:** "❌ System prompt exceeds 9000 character limit and will be truncated"

### Form Validation
Prevents form submission with alert:
```
⚠️ System prompt exceeds 9000 character limit.
Please shorten it to ensure compatibility with Agent Foundry.
```

## Technical Implementation

### HTML Constraint
```html
<textarea id="systemPrompt" maxlength="9000"></textarea>
```

### JavaScript Validation
```javascript
// wizard-ai.js:6168-6171
if (systemPrompt.length > 9000) {
    alert('⚠️ System prompt exceeds 9000 character limit...');
    return false;
}
```

### Character Counter Updates
Automatically updates on:
- User input (typing)
- AI generation of system prompt
- Regenerate prompt button click
- Page load with existing content

## Related Files

- `index-ai.html` - HTML structure with maxlength and counter UI
- `wizard-ai.js` - Validation logic and character counting
  - `updateSystemPromptCharCount()` - Lines 6077-6111
  - `validateAgentConfig()` - Lines 6154-6176
  - Event listener setup - Lines 2529-2535

## Version History

- **2025-11-17:** Added 9,000 character limit for system prompts
  - Real-time character counter
  - Progressive warning system (90% amber, 100% red)
  - Form validation blocking
  - HTML maxlength enforcement

## Support

If you encounter issues with character limits:
1. Review your system prompt for redundancy
2. Check the character counter for current usage
3. Consider breaking complex instructions into simpler steps
4. Refer to Agent Foundry documentation for prompt engineering best practices
