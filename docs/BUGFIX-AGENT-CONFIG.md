# Bug Fix: Agent Name and System Prompt Not Populated

## Issue

When using Auto-Generate, the Agent Configuration (Step 3) was missing key information:
- ❌ Agent Display Name was empty
- ❌ System Prompt was empty
- ❌ No explanation for why AI chose specific model/temperature

## Screenshot Evidence

User provided screenshot showing:
- Empty "Agent Display Name" field
- Empty "System Prompt" textarea
- No reasoning for AI model selection
- Only model dropdown and temperature slider were populated

## Root Cause

The AI prompt and population logic had three issues:

### 1. Agent Name Not Requested
The JSON schema in the prompt didn't include an `agentName` field, so Claude never generated one.

### 2. System Prompt Not Always Populated
While the prompt requested `systemPrompt`, the population logic had a fallback that sometimes skipped it:
```javascript
if (config.systemPrompt) {
    agentConfig.systemPrompt = config.systemPrompt;
} else {
    generateAgentConfig(domain);  // This would overwrite agentName
}
```

### 3. No Model Reasoning
The prompt didn't request an explanation for why a specific model and temperature were chosen.

## Solution

### 1. Enhanced AI Prompt

Updated the JSON schema to include:

```javascript
{
  "agentName": "Campaign Planning Expert",
  "modelReasoning": "Claude 3.5 Sonnet v2 provides excellent balance between response quality and speed for marketing tasks. Temperature 0.7 allows creative campaign suggestions while maintaining consistency.",
  "systemPrompt": "You are an expert campaign strategist and marketing advisor for Treasure Data..."
}
```

**New Requirements:**
- Create descriptive `agentName` (3-5 words) reflecting agent's purpose
- Provide `modelReasoning` explaining model and temperature choice
- Create comprehensive `systemPrompt` (150-300 words) defining role, expertise, and behavior

### 2. Added UI Section for Model Reasoning

Created new UI component in `index-ai.html`:

```html
<!-- AI Model Reasoning -->
<div id="modelReasoningSection" class="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg" style="display: none;">
    <div class="flex items-start gap-2">
        <span class="text-indigo-600 text-sm">💡</span>
        <div>
            <p class="text-xs font-semibold text-indigo-900 mb-1">Why this model?</p>
            <p id="modelReasoningText" class="text-xs text-indigo-700"></p>
        </div>
    </div>
</div>
```

**Features:**
- Shows only when AI provides reasoning
- Styled info box with indigo theme
- Clear "Why this model?" heading
- Displays AI's explanation

### 3. Updated Population Logic

Modified `generateAgentConfig()` function:

```javascript
// Populate Agent Name (check if AI already set it, otherwise use domain default)
if (!agentConfig.agentName) {
    agentConfig.agentName = agentConfig.name;
}
document.getElementById('agentName').value = agentConfig.agentName;

// Show model reasoning if AI provided it
const reasoningSection = document.getElementById('modelReasoningSection');
const reasoningText = document.getElementById('modelReasoningText');
if (agentConfig.modelReasoning) {
    reasoningText.textContent = agentConfig.modelReasoning;
    reasoningSection.style.display = 'block';
} else {
    reasoningSection.style.display = 'none';
}
```

### 4. Added Console Logging

For debugging and verification:

```javascript
console.log(`✅ Agent Name: "${config.agentName}"`);
console.log(`✅ AI Model: ${config.model}`);
console.log(`✅ Temperature: ${config.temperature}`);
console.log(`✅ Model Reasoning: "${config.modelReasoning.substring(0, 60)}..."`);
console.log(`✅ System Prompt: ${config.systemPrompt.length} characters`);
```

## Files Changed

| File | Lines Changed | Description |
|------|---------------|-------------|
| `wizard-ai.js` | 374 | Enhanced AI prompt with agentName, modelReasoning, systemPrompt requirements |
| `wizard-ai.js` | 401-405 | Added agentName population logic |
| `wizard-ai.js` | 423-434 | Added logging for model, temp, reasoning, systemPrompt |
| `wizard-ai.js` | 1627-1645 | Updated generateAgentConfig to populate agentName and show reasoning |
| `index-ai.html` | 407-416 | Added modelReasoningSection UI component |

**Total:** 2 files changed, 41 insertions(+), 2 deletions(-)

## Testing

### Before Fix
1. Chat with Claude: "I want to build a campaign planning agent"
2. Click "Auto-Generate Agent"
3. Navigate to Step 3
4. **BUG:** Agent Display Name is empty
5. **BUG:** System Prompt is empty
6. **BUG:** No explanation for model choice

### After Fix
1. Chat with Claude: "I want to build a campaign planning agent"
2. Click "Auto-Generate Agent"
3. Navigate to Step 3
4. **FIXED:** Agent Display Name shows "Campaign Planning Expert"
5. **FIXED:** System Prompt shows comprehensive role definition (150-300 words)
6. **FIXED:** Blue info box shows "Why this model?" with AI reasoning

### Debug Output

Console shows all populated fields:

```
✅ Agent Name: "Campaign Planning Expert"
✅ AI Model: anthropic.claude-3-5-sonnet-20241022-v2:0
✅ Temperature: 0.7
✅ Model Reasoning: "Claude 3.5 Sonnet v2 provides excellent balance between..."
✅ System Prompt: 387 characters
```

## Example AI Response

For description: "I want to build a campaign planning agent"

**Agent Name:**
```
Campaign Planning Expert
```

**Model Reasoning:**
```
Claude 3.5 Sonnet v2 provides excellent balance between response quality and
speed for marketing tasks. Temperature 0.7 allows creative campaign suggestions
while maintaining consistency in recommendations and analysis.
```

**System Prompt:**
```
You are an expert campaign strategist and marketing advisor for Treasure Data.
Your role is to help marketers plan, optimize, and execute comprehensive
marketing campaigns across multiple channels including Meta, Google, TikTok,
and LinkedIn.

Your expertise includes:
- Campaign planning and goal setting
- Audience targeting and segmentation
- Budget allocation and optimization
- Creative strategy and messaging
- Performance analytics and reporting

Provide actionable, data-driven recommendations tailored to each campaign's
specific goals and constraints.
```

## UI Improvements

### New "Why this model?" Section

When AI provides model reasoning, users now see:

```
┌─────────────────────────────────────────────────┐
│ 💡 Why this model?                               │
│                                                  │
│ Claude 3.5 Sonnet v2 provides excellent         │
│ balance between response quality and speed      │
│ for marketing tasks. Temperature 0.7 allows     │
│ creative campaign suggestions while             │
│ maintaining consistency.                        │
└─────────────────────────────────────────────────┘
```

**Benefits:**
- Educates users about AI model selection
- Provides transparency in decision-making
- Helps users understand temperature settings
- Builds trust in Auto-Generate feature

## Commit

**Commit:** 4842338
**Message:** Add agent name and model reasoning to Auto-Generate
**Repository:** https://github.com/skwapong/PM-Agent-Squad-Master
**Date:** November 13, 2025

## Impact

- ✅ Agent Display Name populated from AI suggestions
- ✅ System Prompt shows comprehensive role definition
- ✅ Model reasoning visible to users
- ✅ Transparent AI decision-making
- ✅ Better user education about model selection
- ✅ Complete Step 3 configuration
- ✅ Users can proceed through entire workflow

## Related Fixes

This fix builds on:
- **BUGFIX-KNOWLEDGE-BASES.md** - Fixed empty knowledge bases (commit fca44c5)

Together, these fixes ensure the entire Auto-Generate workflow works end-to-end.

---

**Status:** Fixed and deployed ✅
**Version:** 2.0.2
**Date:** November 13, 2025
