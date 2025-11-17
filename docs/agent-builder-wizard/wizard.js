// Agent Builder Wizard - JavaScript
// PM Agent Squad Master Template

let currentStep = 1;
let knowledgeBases = [];
let kbCounter = 0;

// Domain suggestions
const domainSuggestions = {
    hr: [
        'Company HR Policies',
        'Employee Benefits Guide',
        'Time Off & Leave Procedures',
        'Performance Review Process',
        'Onboarding Procedures',
        'Compensation Guidelines'
    ],
    support: [
        'Product Documentation',
        'Troubleshooting Guide',
        'FAQs & Common Questions',
        'Return & Refund Policy',
        'Warranty Information',
        'Technical Specifications'
    ],
    it: [
        'System Setup Guides',
        'Software Installation',
        'Common IT Issues',
        'Network Configuration',
        'Security Procedures',
        'Access Management'
    ],
    sales: [
        'Product Catalog',
        'Pricing & Packages',
        'Sales Objection Handling',
        'Competitor Comparison',
        'Demo Scripts',
        'Customer Testimonials'
    ],
    marketing: [
        'Campaign Planning Fundamentals',
        'Meta Advertising Best Practices',
        'Google Ads Best Practices',
        'Content Strategy',
        'Analytics & Metrics',
        'Creative Guidelines'
    ],
    custom: [
        'Domain Knowledge 1',
        'Domain Knowledge 2',
        'Domain Knowledge 3'
    ]
};

// System prompt templates
const systemPromptTemplates = {
    hr: `You are an expert HR Assistant with comprehensive knowledge of company policies, benefits, and procedures.

Your role is to:
- Answer employee questions about HR policies, benefits, and procedures
- Guide employees through common HR processes (time off, performance reviews, etc.)
- Provide accurate, helpful information in a friendly, professional manner
- Escalate complex issues to human HR staff when appropriate

Always:
- Be empathetic and supportive
- Maintain confidentiality
- Provide clear, actionable guidance
- Reference specific policies when applicable

Use your knowledge bases to provide accurate, up-to-date information.`,

    support: `You are an expert Customer Support Assistant with deep knowledge of products, services, and troubleshooting.

Your role is to:
- Help customers resolve issues quickly and effectively
- Answer questions about products, features, and policies
- Guide customers through troubleshooting steps
- Escalate to human support when needed

Always:
- Be patient and empathetic
- Provide clear, step-by-step instructions
- Confirm the issue is resolved
- Ask follow-up questions to understand the problem

Use your knowledge bases to provide accurate solutions and information.`,

    it: `You are an expert IT Support Agent with comprehensive knowledge of systems, software, and technical procedures.

Your role is to:
- Help users resolve technical issues
- Guide users through system setup and configuration
- Provide troubleshooting assistance
- Document solutions and escalate complex issues

Always:
- Ask clarifying questions to understand the issue
- Provide step-by-step technical guidance
- Use clear, non-technical language when possible
- Verify the solution works before closing

Use your knowledge bases to provide accurate technical support.`,

    sales: `You are an expert Sales Assistant with deep knowledge of products, pricing, and customer needs.

Your role is to:
- Help prospects understand product features and benefits
- Answer questions about pricing and packages
- Handle objections professionally
- Guide prospects toward the right solution

Always:
- Listen to customer needs first
- Ask qualifying questions
- Provide value-focused recommendations
- Be honest about capabilities and limitations

Use your knowledge bases to provide accurate product information.`,

    marketing: `You are an expert Marketing Strategist with comprehensive knowledge of campaign planning and digital marketing.

Your role is to:
- Help plan and optimize marketing campaigns
- Provide strategic recommendations
- Analyze campaign performance
- Guide creative development

Always:
- Ask about business objectives and target audience
- Provide data-driven recommendations
- Consider budget and resources
- Think strategically about campaign integration

Use your knowledge bases to provide expert marketing guidance.`,

    custom: `You are an expert AI assistant with comprehensive knowledge of your domain.

Your role is to:
- Answer questions accurately and helpfully
- Provide clear, actionable guidance
- Use your knowledge bases effectively
- Be professional and supportive

Always:
- Understand the user's question fully
- Provide accurate information
- Be clear and concise
- Reference sources when appropriate

Use your knowledge bases to provide expert assistance.`
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Domain selection handler
    document.getElementById('agentDomain').addEventListener('change', function() {
        const domain = this.value;
        if (domain) {
            showDomainGuidance(domain);
        } else {
            document.getElementById('domainGuidance').classList.add('hidden');
        }
    });

    // Add initial knowledge base
    addKnowledgeBase();
});

function showDomainGuidance(domain) {
    const guidanceDiv = document.getElementById('domainGuidance');
    const domainSpan = document.getElementById('selectedDomain');
    const kbList = document.getElementById('suggestedKBs');

    const domainNames = {
        hr: 'HR Assistant',
        support: 'Customer Support',
        it: 'IT Support',
        sales: 'Sales Assistant',
        marketing: 'Marketing Campaign',
        custom: 'Custom Domain'
    };

    domainSpan.textContent = domainNames[domain];
    kbList.innerHTML = '';

    domainSuggestions[domain].forEach(kb => {
        const li = document.createElement('li');
        li.textContent = kb;
        kbList.appendChild(li);
    });

    guidanceDiv.classList.remove('hidden');

    // Auto-fill project/agent names
    if (domain !== 'custom') {
        document.getElementById('projectName').value = `${domainNames[domain]} Platform`;
        document.getElementById('agentName').value = domainNames[domain];
        document.getElementById('agentDisplayName').value = domainNames[domain];
    }
}

function addKnowledgeBase() {
    kbCounter++;
    const kbId = `kb-${kbCounter}`;

    const kbDiv = document.createElement('div');
    kbDiv.className = 'border border-gray-200 rounded-lg p-4 bg-gray-50';
    kbDiv.id = kbId;
    kbDiv.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <h4 class="font-semibold text-gray-900">Knowledge Base #${kbCounter}</h4>
            <button onclick="removeKnowledgeBase('${kbId}')" class="text-red-600 hover:text-red-800 text-sm">Remove</button>
        </div>
        <div class="space-y-3">
            <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">KB Name *</label>
                <input type="text" id="${kbId}-name" placeholder="e.g., Company HR Policies"
                    class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            </div>
            <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">KB Content (Markdown) *</label>
                <textarea id="${kbId}-content" rows="4" placeholder="# KB Content\\n\\nYour knowledge base content in Markdown..."
                    class="w-full border border-gray-300 rounded px-3 py-2 text-sm kb-editor focus:ring-2 focus:ring-indigo-500 focus:border-transparent"></textarea>
                <div class="flex justify-between items-center mt-1">
                    <span id="${kbId}-charcount" class="text-xs text-gray-500">0 / 18,000 characters</span>
                    <button onclick="loadExampleKB('${kbId}')" class="text-xs text-indigo-600 hover:text-indigo-800">Load Example</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('knowledgeBaseList').appendChild(kbDiv);

    // Add character counter
    document.getElementById(`${kbId}-content`).addEventListener('input', function() {
        updateCharCount(kbId);
    });

    // Store KB reference
    knowledgeBases.push({id: kbId, number: kbCounter});
}

function removeKnowledgeBase(kbId) {
    if (knowledgeBases.length <= 1) {
        alert('You must have at least one knowledge base!');
        return;
    }

    document.getElementById(kbId).remove();
    knowledgeBases = knowledgeBases.filter(kb => kb.id !== kbId);
}

function updateCharCount(kbId) {
    const content = document.getElementById(`${kbId}-content`).value;
    const charCount = content.length;
    const countSpan = document.getElementById(`${kbId}-charcount`);

    countSpan.textContent = `${charCount.toLocaleString()} / 18,000 characters`;

    if (charCount > 18000) {
        countSpan.classList.add('text-red-600', 'font-semibold');
        countSpan.classList.remove('text-gray-500');
    } else {
        countSpan.classList.remove('text-red-600', 'font-semibold');
        countSpan.classList.add('text-gray-500');
    }
}

function loadExampleKB(kbId) {
    const exampleContent = `# Example Knowledge Base

## Overview

This is an example knowledge base showing the proper structure and formatting.

**What This KB Covers:**
- Key topic area 1
- Key topic area 2
- Key topic area 3

## Section 1: Main Topic

### Subsection 1.1

Detailed information about this topic...

**Key Points:**
- Important point 1
- Important point 2
- Important point 3

### Subsection 1.2

More detailed content...

## Section 2: Best Practices

**Best Practice 1:**
Description and guidance...

**Best Practice 2:**
Description and guidance...

## FAQs

**Q: Common question?**
A: Detailed answer...

**Q: Another question?**
A: Detailed answer...

## Related Information

See also:
- Related KB topic 1
- Related KB topic 2
`;

    document.getElementById(`${kbId}-content`).value = exampleContent;
    updateCharCount(kbId);
}

function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }

    if (currentStep < 5) {
        currentStep++;
        updateStepDisplay();

        // Update tools list in step 4
        if (currentStep === 4) {
            updateToolsList();
        }

        // Update summary in step 5
        if (currentStep === 5) {
            updateSummary();
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

function updateStepDisplay() {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.add('active');

    // Update progress indicators
    document.querySelectorAll('.step-indicator').forEach(indicator => {
        const stepNum = parseInt(indicator.dataset.step);
        const circle = indicator.querySelector('div');

        if (stepNum < currentStep) {
            indicator.classList.add('completed');
            indicator.classList.remove('active');
            circle.classList.remove('bg-gray-300');
            circle.classList.add('bg-green-600');
        } else if (stepNum === currentStep) {
            indicator.classList.add('active');
            indicator.classList.remove('completed');
            circle.classList.remove('bg-gray-300', 'bg-green-600');
            circle.classList.add('bg-indigo-600');
        } else {
            indicator.classList.remove('active', 'completed');
            circle.classList.remove('bg-indigo-600', 'bg-green-600');
            circle.classList.add('bg-gray-300');
        }
    });

    // Scroll to top
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function validateCurrentStep() {
    if (currentStep === 1) {
        // Validate knowledge bases
        let hasError = false;
        for (const kb of knowledgeBases) {
            const name = document.getElementById(`${kb.id}-name`).value.trim();
            const content = document.getElementById(`${kb.id}-content`).value.trim();

            if (!name || !content) {
                alert('Please fill in all knowledge base fields!');
                return false;
            }

            if (content.length > 18000) {
                alert(`Knowledge Base "${name}" exceeds 18,000 character limit!`);
                return false;
            }
        }
        return true;
    }

    if (currentStep === 2) {
        // Validate project
        const name = document.getElementById('projectName').value.trim();
        const desc = document.getElementById('projectDescription').value.trim();

        if (!name || !desc) {
            alert('Please fill in all required project fields!');
            return false;
        }
        return true;
    }

    if (currentStep === 3) {
        // Validate agent
        const name = document.getElementById('agentName').value.trim();
        const prompt = document.getElementById('systemPrompt').value.trim();

        if (!name || !prompt) {
            alert('Please fill in all required agent fields!');
            return false;
        }
        return true;
    }

    return true;
}

function updateToolsList() {
    const toolsList = document.getElementById('toolsList');
    toolsList.innerHTML = '';

    knowledgeBases.forEach(kb => {
        const name = document.getElementById(`${kb.id}-name`).value;
        const toolName = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');

        const toolDiv = document.createElement('div');
        toolDiv.className = 'flex items-center justify-between text-sm';
        toolDiv.innerHTML = `
            <span class="font-mono text-indigo-600">kb_${toolName}</span>
            <span class="text-gray-600">${name}</span>
        `;
        toolsList.appendChild(toolDiv);
    });
}

function generateSystemPrompt() {
    const domain = document.getElementById('agentDomain').value;
    if (!domain) {
        alert('Please select an agent domain first!');
        return;
    }

    const template = systemPromptTemplates[domain];
    document.getElementById('systemPrompt').value = template;
}

function updateSummary() {
    const summary = document.getElementById('summaryContent');
    summary.innerHTML = '';

    // Project info
    addSummaryItem(summary, 'Project Name', document.getElementById('projectName').value);
    addSummaryItem(summary, 'Agent Name', document.getElementById('agentName').value);
    addSummaryItem(summary, 'Model', document.getElementById('agentModel').options[document.getElementById('agentModel').selectedIndex].text);
    addSummaryItem(summary, 'Knowledge Bases', `${knowledgeBases.length} KBs`);
}

function addSummaryItem(container, label, value) {
    const div = document.createElement('div');
    div.className = 'flex justify-between';
    div.innerHTML = `
        <span class="text-gray-600">${label}:</span>
        <span class="font-semibold text-gray-900">${value}</span>
    `;
    container.appendChild(div);
}

function downloadKnowledgeBases() {
    knowledgeBases.forEach(kb => {
        const name = document.getElementById(`${kb.id}-name`).value;
        const content = document.getElementById(`${kb.id}-content`).value;
        const filename = `KB${kb.number}_${name.replace(/[^a-zA-Z0-9]+/g, '_')}.md`;

        downloadFile(filename, content);
    });

    alert(`Downloaded ${knowledgeBases.length} knowledge base files!`);
}

function downloadProjectConfig() {
    const projectName = document.getElementById('projectName').value;
    const projectDesc = document.getElementById('projectDescription').value;
    const projectType = document.getElementById('projectType').value;

    const content = `# Project Configuration Guide

## Project Details

**Project Name:** ${projectName}

**Description:** ${projectDesc}

**Type:** ${projectType}

## Configuration Steps

### In Agent Foundry:

1. Navigate to "Create Project"
2. Fill in the following:
   - **Project name:** ${projectName}
   - **Description:** ${projectDesc}
   - **Project type:** ${projectType}
   - **Runtime text resources:** ${document.getElementById('enableRuntimeText').checked ? 'Enabled' : 'Disabled'}
   - **Workflow executor:** ${document.getElementById('enableWorkflowExecutor').checked ? 'Enabled' : 'Disabled'}
3. Click "Create Project"

## Next Steps

After creating your project:
1. Upload your knowledge bases
2. Create your agent
3. Configure tools and outputs
4. Test thoroughly
5. Deploy!

---
Generated by PM Agent Squad Master - Agent Builder Wizard
`;

    downloadFile('PROJECT_CONFIGURATION_GUIDE.md', content);
}

function downloadAgentConfig() {
    const agentName = document.getElementById('agentName').value;
    const agentDisplayName = document.getElementById('agentDisplayName').value;
    const agentDesc = document.getElementById('agentDescription').value;
    const model = document.getElementById('agentModel').options[document.getElementById('agentModel').selectedIndex].text;
    const temperature = document.getElementById('agentTemperature').value;
    const systemPrompt = document.getElementById('systemPrompt').value;
    const maxIterations = document.getElementById('maxToolIterations').value;

    const content = `# Agent Configuration Guide

## Agent Details

**Agent Name:** ${agentName}

**Display Name:** ${agentDisplayName}

**Description:** ${agentDesc}

## Model Configuration

**Model:** ${model}

**Temperature:** ${temperature}

**Max Tool Iterations:** ${maxIterations}

## System Prompt

\`\`\`
${systemPrompt}
\`\`\`

## Knowledge Base Tools

${knowledgeBases.map(kb => {
    const name = document.getElementById(`${kb.id}-name`).value;
    const toolName = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    return `### Tool ${kb.number}: ${name}

- **Function name:** \`kb_${toolName}\`
- **Function description:** Access ${name} knowledge base
- **Target:** Knowledge base
- **Target knowledge base:** KB${kb.number}_${name.replace(/[^a-zA-Z0-9]+/g, '_')}`;
}).join('\n\n')}

## Configuration Steps

### In Agent Foundry:

1. Navigate to "Create Agent"
2. Fill in:
   - **Agent name:** ${agentName}
   - **Model:** ${model}
   - **Temperature:** ${temperature}
   - **Max tool iterations:** ${maxIterations}
3. Paste system prompt
4. Save agent

### Add Tools:

${knowledgeBases.map(kb => {
    const name = document.getElementById(`${kb.id}-name`).value;
    const toolName = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    return `1. Add tool \`kb_${toolName}\` linked to knowledge base`;
}).join('\n')}

---
Generated by PM Agent Squad Master - Agent Builder Wizard
`;

    downloadFile('AGENT_CONFIGURATION_GUIDE.md', content);
}

function downloadAllFiles() {
    downloadKnowledgeBases();
    downloadProjectConfig();
    downloadAgentConfig();

    setTimeout(() => {
        alert('All files downloaded! Check your downloads folder.');
    }, 500);
}

function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function startOver() {
    if (confirm('Are you sure you want to start over? All progress will be lost.')) {
        location.reload();
    }
}
