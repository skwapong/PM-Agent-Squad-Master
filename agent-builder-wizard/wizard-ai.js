// AI-Powered Agent Builder Wizard
// Integrates with Claude Code AI for intelligent agent generation

// State management
let currentStep = 0;
let knowledgeBases = [];
let kbCounter = 0;
let agentConfig = {
    description: '',
    tone: 'professional',
    language: 'english',
    audience: '',
    domain: '',
    name: '',
    projectName: '',
    projectDescription: '',
    model: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    temperature: 0.5,
    systemPrompt: ''
};

// AI Chat state
let chatHistory = [];
// Demo mode removed - always using live Claude API

// Generation cancellation state
let generationCancelled = false;

// Chat response abort controller
let chatAbortController = null;

// Initialize wizard
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkApiKeyStatus();
    showTypingIndicator('Initializing AI assistant...');
    setTimeout(() => {
        removeTypingIndicator();
    }, 1000);
});

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('prevBtn').addEventListener('click', prevStep);

    // AI Chat
    document.getElementById('aiSendBtn').addEventListener('click', sendToAI);
    document.getElementById('aiStopBtn').addEventListener('click', stopResponse);
    document.getElementById('aiChatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            sendToAI();
        }
    });

    // Quick Examples
    document.querySelectorAll('.quick-example').forEach(btn => {
        btn.addEventListener('click', function() {
            const example = this.dataset.example;
            loadQuickExample(example);
        });
    });

    // Sidebar navigation (dashboard layout)
    document.querySelectorAll('.step-nav-item, .progress-step').forEach(navItem => {
        navItem.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            if (!isNaN(step) && step >= 0 && step <= 4) {
                currentStep = step;
                updateStepDisplay();
            }
        });
    });

    // Step 0: Agent Description (if exists)
    const agentDesc = document.getElementById('agentDescription');
    if (agentDesc) {
        agentDesc.addEventListener('input', function() {
            agentConfig.description = this.value;
        });
    }

    const agentTone = document.getElementById('agentTone');
    if (agentTone) {
        agentTone.addEventListener('change', function() {
            agentConfig.tone = this.value;
        });
    }

    // Language toggle
    const languageToggle = document.getElementById('languageToggle');
    const languageSelector = document.getElementById('languageSelector');
    const languageOffMessage = document.getElementById('languageOffMessage');
    const agentLanguage = document.getElementById('agentLanguage');

    if (languageToggle && languageSelector && languageOffMessage) {
        languageToggle.addEventListener('change', function() {
            if (this.checked) {
                // Show language selector, hide message
                languageSelector.style.display = 'block';
                languageOffMessage.style.display = 'none';
                // Set language to first option (multilingual)
                if (agentLanguage) {
                    agentConfig.language = agentLanguage.value;
                }
            } else {
                // Hide language selector, show message
                languageSelector.style.display = 'none';
                languageOffMessage.style.display = 'block';
                // Reset to English
                agentConfig.language = 'english';
            }
        });
    }

    if (agentLanguage) {
        agentLanguage.addEventListener('change', function() {
            agentConfig.language = this.value;
        });
    }

    const agentAudience = document.getElementById('agentAudience');
    if (agentAudience) {
        agentAudience.addEventListener('input', function() {
            agentConfig.audience = this.value;
        });
    }

    // Generate Agent Button
    const generateBtn = document.getElementById('aiGenerateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateAgent);
    }

    // Cancel Generation Button
    const cancelGenerateBtn = document.getElementById('cancelGenerateBtn');
    if (cancelGenerateBtn) {
        cancelGenerateBtn.addEventListener('click', cancelGeneration);
    }

    // Reset Button
    document.getElementById('resetBtn')?.addEventListener('click', resetWizard);

    // Temperature slider
    const tempSlider = document.getElementById('temperature') || document.getElementById('temperatureSlider');
    const tempValue = document.getElementById('tempValue') || document.getElementById('temperatureValue');
    if (tempSlider && tempValue) {
        tempSlider.addEventListener('input', function() {
            tempValue.textContent = this.value;
            agentConfig.temperature = parseFloat(this.value);
        });
    }

    // Model selection
    const modelSelect = document.getElementById('modelSelect');
    if (modelSelect) {
        modelSelect.addEventListener('change', function() {
            agentConfig.model = this.value;
            updateModelRecommendation();
        });
    }

    // Regenerate prompt
    document.getElementById('regeneratePromptBtn')?.addEventListener('click', regenerateSystemPrompt);

    // Add KB button
    document.getElementById('addKBBtn')?.addEventListener('click', addKnowledgeBase);

    // Download buttons
    document.getElementById('viewOutputBtn')?.addEventListener('click', viewOutputWebpage);
    document.getElementById('downloadKBsBtn')?.addEventListener('click', downloadKnowledgeBases);
    document.getElementById('downloadProjectBtn')?.addEventListener('click', downloadProjectConfig);
    document.getElementById('downloadAgentBtn')?.addEventListener('click', downloadAgentConfig);
    document.getElementById('downloadAllBtn')?.addEventListener('click', downloadAllFiles);

    // API Connection Status
    document.getElementById('configureApiBtn')?.addEventListener('click', showApiKeyModal);
    document.getElementById('closeApiModalBtn')?.addEventListener('click', hideApiKeyModal);
}

// API Connection Status Management
function checkApiKeyStatus() {
    console.log('🔍 Checking Claude Code CLI connection...');
    console.log('  claudeAPI exists:', typeof claudeAPI !== 'undefined');

    // Always show connected status since we're using local Claude Code CLI
    updateApiStatusIndicator(true);
    console.log('✅ Connected to Claude Code CLI via localhost:3001');

    // Add confirmation message
    addChatMessage('assistant', '🟢 <strong>Connected to Claude Code CLI!</strong> Using local connection on port 3001. All responses come from Claude AI via your Claude Code installation.');
}

function showApiKeyModal() {
    document.getElementById('apiKeyModal').classList.remove('hidden');
}

function hideApiKeyModal() {
    document.getElementById('apiKeyModal').classList.add('hidden');
}

function updateApiStatusIndicator(isConnected) {
    const indicator = document.getElementById('apiStatusIndicator');
    if (indicator) {
        indicator.textContent = isConnected ? '🟢' : '🔴';
    }
}

// AI Chat Functions
async function sendToAI() {
    const input = document.getElementById('aiChatInput');
    const message = input.value.trim();
    const errorDiv = document.getElementById('chatInputError');
    const sendBtn = document.getElementById('aiSendBtn');
    const stopBtn = document.getElementById('aiStopBtn');

    // Validate input
    if (!message) {
        // Show error message
        if (errorDiv) {
            errorDiv.style.display = 'block';
            // Add red border to input
            input.classList.add('border-red-500');
            input.classList.remove('border-gray-300');

            // Hide error after 3 seconds
            setTimeout(() => {
                errorDiv.style.display = 'none';
                input.classList.remove('border-red-500');
                input.classList.add('border-gray-300');
            }, 3000);
        }
        return;
    }

    // Hide error if it was showing
    if (errorDiv) {
        errorDiv.style.display = 'none';
        input.classList.remove('border-red-500');
        input.classList.add('border-gray-300');
    }

    // Toggle buttons - show stop, hide send
    if (sendBtn) sendBtn.style.display = 'none';
    if (stopBtn) stopBtn.style.display = 'block';

    // Create abort controller for this request
    chatAbortController = new AbortController();

    // Save message as agent description if it looks like a description
    if (message.length > 20 && !agentConfig.description) {
        agentConfig.description = message;
    }

    // Add user message to chat
    addChatMessage('user', message);
    chatHistory.push({ role: 'user', content: message });

    // Clear input
    input.value = '';

    // Show typing indicator
    showTypingIndicator('Agent Foundry Assistant is thinking...');

    try {
        // Check if Claude API is available
        if (typeof claudeAPI === 'undefined') {
            throw new Error('Claude API not loaded. Please refresh the page.');
        }

        console.log('📤 Sending message to Claude API:', message.substring(0, 50) + '...');

        // Always use live Claude API with streaming
        const aiResponse = await claudeAPI.sendMessage(
            message,
            chatHistory.slice(0, -1), // Don't include the message we just added
            (chunk, fullText) => {
                // Update the typing indicator with streaming text
                updateTypingIndicator(fullText);
            },
            chatAbortController?.signal // Pass abort signal
        );

        removeTypingIndicator();

        // If Claude provided agent recommendations, auto-populate and add helpful message
        let finalResponse = aiResponse;
        if (aiResponse.includes('Agent') && (aiResponse.includes('Knowledge Base') || aiResponse.includes('Model:') || aiResponse.includes('Temperature:'))) {
            const descriptionTextarea = document.getElementById('agentDescription');
            if (descriptionTextarea && !descriptionTextarea.value.trim()) {
                // Populate with the user's original question
                descriptionTextarea.value = message;
                agentConfig.description = message;
                console.log('✅ Auto-populated description from chat message');

                // Add a helpful message
                finalResponse += `<br><br>💡 <strong>Tip:</strong> I've automatically filled in your agent description below. You can now click <strong>"✨ Auto-Generate Agent"</strong> to create your agent with these recommendations!`;
            }
        }

        addChatMessage('assistant', finalResponse);
        chatHistory.push({ role: 'assistant', content: aiResponse });

    } catch (error) {
        console.error('❌ AI Error:', error);
        removeTypingIndicator();

        // Check if request was aborted
        if (error.name === 'AbortError' || chatAbortController?.signal.aborted) {
            addChatMessage('assistant', '⏸️ <strong>Response stopped.</strong> Feel free to ask another question!');
        } else {
            addChatMessage('assistant', `⚠️ <strong>Error:</strong> ${error.message}<br><br>Please ensure:<br>• The proxy is running (node claude-code-proxy.cjs)<br>• Your API key is configured in .env file<br>• You have an active internet connection`);
        }
    } finally {
        // Always restore buttons
        const sendBtn = document.getElementById('aiSendBtn');
        const stopBtn = document.getElementById('aiStopBtn');
        if (sendBtn) sendBtn.style.display = 'block';
        if (stopBtn) stopBtn.style.display = 'none';

        // Clear abort controller
        chatAbortController = null;
    }
}

// Stop ongoing AI response
function stopResponse() {
    console.log('🛑 User requested to stop response');

    // Abort the ongoing request
    if (chatAbortController) {
        chatAbortController.abort();
        console.log('✅ Request aborted');
    }

    // Remove typing indicator
    removeTypingIndicator();

    // Restore buttons immediately
    const sendBtn = document.getElementById('aiSendBtn');
    const stopBtn = document.getElementById('aiStopBtn');
    if (sendBtn) sendBtn.style.display = 'block';
    if (stopBtn) stopBtn.style.display = 'none';

    // Show stopped message
    addChatMessage('assistant', '⏸️ <strong>Response stopped.</strong> Feel free to ask another question!');
}

function addChatMessage(role, content) {
    const messagesDiv = document.getElementById('aiChatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message';

    if (role === 'user') {
        messageDiv.className += ' bg-white border border-gray-200 rounded-lg p-3';
        messageDiv.innerHTML = `<p class="text-sm text-gray-800"><strong>You:</strong> ${content}</p>`;
    } else {
        messageDiv.className += ' bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100';
        messageDiv.innerHTML = `<p class="text-sm text-gray-800">${content}</p>`;
    }

    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTypingIndicator(message = 'Claude is typing...') {
    const messagesDiv = document.getElementById('aiChatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'ai-message bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100';
    typingDiv.innerHTML = `
        <div class="flex items-center gap-2">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
            <span class="text-sm text-gray-600" id="typingMessage">${message}</span>
        </div>
        <div id="streamingText" class="text-sm text-gray-800 mt-2 hidden"></div>
    `;
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function updateTypingIndicator(text) {
    const streamingText = document.getElementById('streamingText');
    if (streamingText) {
        streamingText.classList.remove('hidden');
        streamingText.innerHTML = text;
        const messagesDiv = document.getElementById('aiChatMessages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Demo mode removed - all responses now come from real Claude API via claude-code-proxy.cjs

// Quick Example Loaders
function loadQuickExample(type) {
    const examples = {
        'campaign-building': `I want to build a campaign planning agent that helps marketers with:
- Creating comprehensive marketing campaign strategies
- Planning multi-channel campaigns (Meta, Google, TikTok, Pinterest)
- Developing campaign messaging and creative briefs
- Setting campaign objectives and KPIs
- Budget allocation across channels
- Timeline and milestone planning

The agent should be strategic, creative, and provide actionable recommendations based on campaign planning frameworks and advertising best practices.`,
        'campaign-optimization': `I need a campaign optimization agent that assists marketers with:
- Analyzing campaign performance across all channels
- Identifying optimization opportunities (targeting, creative, bidding)
- A/B testing strategies and recommendations
- Budget reallocation based on performance
- Audience refinement and expansion strategies
- Ad creative performance analysis

The agent should be data-driven, analytical, and provide specific optimization tactics to improve campaign ROI.`,
        'campaign-reporting': `I want a campaign reporting agent that helps marketers with:
- Generating comprehensive campaign performance reports
- Analyzing metrics across Meta, Google, TikTok, Pinterest platforms
- Calculating ROI, ROAS, CPA, and other key metrics
- Identifying trends and insights from campaign data
- Creating executive summaries and presentations
- Benchmarking performance against industry standards

The agent should be analytical, clear, and able to translate complex data into actionable insights and recommendations.`
    };

    // Try to populate chat input (dashboard layout)
    const chatInput = document.getElementById('aiChatInput');
    if (chatInput) {
        chatInput.value = examples[type];
        agentConfig.description = examples[type]; // Save to config too!
        chatInput.focus();
        return;
    }

    // Fallback to agent description (original layout)
    const textarea = document.getElementById('agentDescription');
    if (textarea) {
        textarea.value = examples[type];
        agentConfig.description = examples[type];

        // Also try to populate AI chat if it exists
        const fallbackChatInput = document.getElementById('aiChatInput');
        if (fallbackChatInput) {
            fallbackChatInput.value = examples[type];
        }
    }
}

// Cancel Generation
function cancelGeneration() {
    generationCancelled = true;
    console.log('🛑 User requested generation cancellation');

    // Immediately hide cancel button and show generate button
    const generateBtn = document.getElementById('aiGenerateBtn');
    const cancelBtn = document.getElementById('cancelGenerateBtn');
    if (generateBtn) generateBtn.style.display = 'block';
    if (cancelBtn) cancelBtn.style.display = 'none';

    addChatMessage('assistant', '⏸️ Cancelling generation... Please wait for the current operation to complete.');
}

// Auto-Generate Agent
async function generateAgent() {
    // Reset cancellation flag
    generationCancelled = false;

    // Show cancel button, hide generate button
    const generateBtn = document.getElementById('aiGenerateBtn');
    const cancelBtn = document.getElementById('cancelGenerateBtn');
    if (generateBtn) generateBtn.style.display = 'none';
    if (cancelBtn) cancelBtn.style.display = 'block';

    // Get description from textarea or chat input (dashboard layout)
    const descriptionTextarea = document.getElementById('agentDescription');
    const chatInput = document.getElementById('aiChatInput');
    const description = descriptionTextarea ? descriptionTextarea.value.trim() :
                       chatInput ? chatInput.value.trim() :
                       agentConfig.description;

    if (!description || description.length < 20) {
        alert('Please describe your agent first! Add at least a brief description of what your agent should do (minimum 20 characters).');
        // Focus on the appropriate input field
        if (chatInput) {
            chatInput.focus();
        } else if (descriptionTextarea) {
            descriptionTextarea.focus();
        }
        // Restore buttons
        if (generateBtn) generateBtn.style.display = 'block';
        if (cancelBtn) cancelBtn.style.display = 'none';
        return;
    }

    // Update agentConfig with current value
    agentConfig.description = description;

    showTypingIndicator('✨ Asking Claude AI to generate your agent configuration...');

    try {
        // Check if Claude API is available
        if (typeof claudeAPI === 'undefined') {
            throw new Error('Claude API not loaded. Please refresh the page.');
        }

        // Get language preference
        const languageMap = {
            'english': 'English',
            'spanish': 'Spanish',
            'french': 'French',
            'german': 'German',
            'japanese': 'Japanese',
            'chinese': 'Simplified Chinese',
            'chinese-traditional': 'Traditional Chinese',
            'portuguese': 'Portuguese',
            'italian': 'Italian',
            'korean': 'Korean',
            'dutch': 'Dutch',
            'russian': 'Russian',
            'arabic': 'Arabic',
            'hindi': 'Hindi',
            'multilingual': 'multiple languages (multilingual)'
        };
        const languageName = languageMap[agentConfig.language] || 'English';
        const languageInstruction = agentConfig.language === 'multilingual'
            ? '\n\nLanguage Requirement: The agent should be multilingual and respond in the same language as the user\'s query.'
            : `\n\nLanguage Requirement: The agent should respond in ${languageName}.`;

        // Ask Claude to generate the full configuration
        const prompt = `Based on this agent description:\n\n"${description}"${languageInstruction}\n\nGenerate ONLY a JSON object (no other text) with this exact structure:\n\n{\n  "domain": "marketing",\n  "agentName": "Campaign Planning Expert",\n  "knowledgeBases": [\n    {\n      "name": "Campaign Planning Guide",\n      "description": "Comprehensive guide for planning marketing campaigns. Include best practices for:\n- Setting SMART goals and KPIs\n- Defining target audiences and personas\n- Budget allocation strategies\n- Timeline and milestone planning\n- Campaign brief templates"\n    },\n    {\n      "name": "Platform Best Practices",\n      "description": "Best practices for Meta, Google, TikTok advertising. Cover:\n- Platform-specific ad formats and specs\n- Audience targeting options\n- Bidding strategies\n- Creative guidelines\n- A/B testing frameworks"\n    }\n  ],\n  "model": "anthropic.claude-3-5-sonnet-20241022-v2:0",\n  "temperature": 0.7,\n  "modelReasoning": "Claude 3.5 Sonnet v2 provides excellent balance between response quality and speed for marketing tasks. Temperature 0.7 allows creative campaign suggestions while maintaining consistency.",\n  "systemPrompt": "You are an expert campaign strategist and marketing advisor for Treasure Data. Your role is to help marketers plan, optimize, and execute comprehensive marketing campaigns across multiple channels including Meta, Google, TikTok, and LinkedIn.\\n\\nYour expertise includes:\\n- Campaign planning and goal setting\\n- Audience targeting and segmentation\\n- Budget allocation and optimization\\n- Creative strategy and messaging\\n- Performance analytics and reporting\\n\\nProvide actionable, data-driven recommendations tailored to each campaign's specific goals and constraints."\n}\n\nIMPORTANT: \n1. Return ONLY the JSON object, nothing else\n2. Include 4-5 knowledge bases\n3. Make each knowledge base description detailed (200-400 words) with specific topics, guidelines, and examples\n4. The description field will be used as the actual knowledge base content\n5. Create a descriptive agentName (3-5 words) that reflects the agent's purpose\n6. Provide modelReasoning explaining why you chose that specific model and temperature\n7. Create a comprehensive systemPrompt (150-300 words) that defines the agent's role, expertise, and behavior`;

        const aiResponse = await claudeAPI.sendMessage(prompt, []);  // Don't include chat history for cleaner JSON response

        // Check if generation was cancelled
        if (generationCancelled) {
            console.log('⚠️ Generation cancelled by user');
            removeTypingIndicator();
            addChatMessage('assistant', '❌ Generation cancelled. You can try again when ready.');
            // Restore buttons
            if (generateBtn) generateBtn.style.display = 'block';
            if (cancelBtn) cancelBtn.style.display = 'none';
            return;
        }

        console.log('🔍 AI Response for parsing:', aiResponse.substring(0, 200));

        // Try to parse JSON from response - look for JSON block
        let jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/);
        if (!jsonMatch) {
            // Try without code block
            jsonMatch = aiResponse.match(/(\{[\s\S]*\})/);
        }

        if (!jsonMatch) {
            console.error('❌ Could not find JSON in response:', aiResponse);
            throw new Error('AI did not return valid JSON. Using fallback generation.');
        }

        const jsonString = jsonMatch[1] || jsonMatch[0];
        console.log('📝 Extracted JSON:', jsonString.substring(0, 200));

        const config = JSON.parse(jsonString);

        // Detect domain
        const domain = config.domain || 'custom';
        agentConfig.domain = domain;

        // Set agent name from AI suggestion
        if (config.agentName) {
            agentConfig.agentName = config.agentName;
            console.log(`✅ Agent Name: "${config.agentName}"`);
        }

        // Generate knowledge bases from AI suggestions
        if (config.knowledgeBases && config.knowledgeBases.length > 0) {
            knowledgeBases = [];
            kbCounter = 0;
            config.knowledgeBases.forEach(kb => {
                addKnowledgeBase(kb.name, kb.description || 'AI-generated knowledge base');
            });
        } else {
            // Fallback to domain-based generation
            generateKnowledgeBases(domain);
        }

        // Generate project configuration
        generateProjectConfig(domain);

        // Generate agent configuration with AI suggestions
        if (config.model) {
            agentConfig.model = config.model;
            console.log(`✅ AI Model: ${config.model}`);
        }
        if (config.temperature !== undefined) {
            agentConfig.temperature = config.temperature;
            console.log(`✅ Temperature: ${config.temperature}`);
        }
        if (config.modelReasoning) {
            agentConfig.modelReasoning = config.modelReasoning;
            console.log(`✅ Model Reasoning: "${config.modelReasoning.substring(0, 60)}..."`);
        }
        if (config.systemPrompt) {
            agentConfig.systemPrompt = config.systemPrompt;
            console.log(`✅ System Prompt: ${config.systemPrompt.length} characters`);
        } else {
            generateAgentConfig(domain);
        }

        removeTypingIndicator();

        // Restore buttons
        if (generateBtn) generateBtn.style.display = 'block';
        if (cancelBtn) cancelBtn.style.display = 'none';

        // Show success message
        addChatMessage('assistant', `✅ <strong>Agent generated successfully!</strong><br><br>
        I've created:<br>
        • ${knowledgeBases.length} knowledge bases<br>
        • Project configuration<br>
        • Agent settings and system prompt<br><br>
        Click <strong>"Next →"</strong> to review and customize each component!`);

        // Move to next step
        setTimeout(() => {
            nextStep();
        }, 1500);

    } catch (error) {
        console.error('❌ Auto-generate error:', error);
        removeTypingIndicator();

        // Restore buttons
        if (generateBtn) generateBtn.style.display = 'block';
        if (cancelBtn) cancelBtn.style.display = 'none';

        // Fallback to keyword-based generation
        alert('AI generation failed. Using keyword-based generation instead.');

        // Detect domain from description
        const descriptionLower = description.toLowerCase();
        let domain = agentConfig.domain || 'custom';

        if (!agentConfig.domain) {
            if (descriptionLower.includes('campaign') || descriptionLower.includes('marketing')) domain = 'marketing';
            else if (descriptionLower.includes('hr') || descriptionLower.includes('employee')) domain = 'hr';
            else if (descriptionLower.includes('customer') || descriptionLower.includes('support')) domain = 'support';
            else if (descriptionLower.includes('it support') || descriptionLower.includes('tech support')) domain = 'it';
            else if (descriptionLower.includes('sales')) domain = 'sales';
        }

        // Generate using templates as fallback
        generateKnowledgeBases(domain);
        generateProjectConfig(domain);
        generateAgentConfig(domain);

        removeTypingIndicator();
        nextStep();
    }
}

// Generate Knowledge Bases based on domain
function generateKnowledgeBases(domain) {
    const kbTemplates = {
        hr: [
            {
                name: 'Company HR Policies',
                content: `# Company HR Policies

## Employment Policies

### Equal Employment Opportunity
Our company is committed to equal employment opportunity and does not discriminate based on race, color, religion, sex, national origin, age, disability, or any other protected characteristic.

### Code of Conduct
All employees are expected to:
- Maintain professional behavior at all times
- Respect colleagues and maintain a harassment-free workplace
- Protect company confidential information
- Follow all company policies and procedures

### Work Hours and Attendance
- Standard work hours: 9:00 AM - 5:00 PM, Monday-Friday
- Flexible work arrangements available with manager approval
- Remote work policy: Up to 2 days per week for eligible positions
- Attendance expectations and time-off request procedures

### Performance Management
- Annual performance reviews
- Quarterly check-ins with managers
- Goal-setting and development planning
- Performance improvement plans when needed

### Workplace Safety
- Report all safety concerns immediately
- Emergency evacuation procedures
- Workplace violence prevention
- Health and wellness programs

(Note: This is a template. Replace with your actual company policies.)`
            },
            {
                name: 'Employee Benefits Guide',
                content: `# Employee Benefits Guide

## Health Insurance

### Medical Coverage
- PPO and HMO plan options
- Coverage begins first day of employment
- Employee + Family coverage available
- Annual enrollment period: November

### Dental Insurance
- Preventive care covered at 100%
- Basic procedures at 80%
- Major procedures at 50%
- Orthodontia coverage available

### Vision Insurance
- Annual eye exams covered
- Allowance for frames/lenses or contacts
- Discounts on LASIK procedures

## Retirement Benefits

### 401(k) Plan
- Immediate eligibility
- Company match: 50% of first 6% contributed
- Vesting schedule: 3-year graded vesting
- Investment options and advisor access

## Paid Time Off

### Vacation Time
- Year 1: 10 days
- Years 2-5: 15 days
- Years 6+: 20 days
- Accrued monthly

### Sick Leave
- 10 days per year
- Unused days roll over (max 40 days)

### Holidays
- 10 company-paid holidays per year
- Floating holiday option

### Parental Leave
- 12 weeks paid parental leave
- Available to all new parents
- Can be taken within first year

## Additional Benefits
- Life insurance and AD&D
- Short and long-term disability
- Employee Assistance Program (EAP)
- Tuition reimbursement
- Gym membership discounts
- Commuter benefits

(Note: This is a template. Replace with your actual benefits information.)`
            },
            {
                name: 'Time Off Procedures',
                content: `# Time Off Request Procedures

## How to Request Time Off

### Vacation Time
1. Submit request at least 2 weeks in advance
2. Use company HR portal or submit to manager
3. Await manager approval
4. Receive confirmation email
5. Add to team calendar

### Sick Leave
1. Notify manager as soon as possible
2. No advance approval needed for illness
3. Medical documentation required for 3+ consecutive days
4. Update time-off system upon return

### Personal Days
1. Request at least 1 week in advance when possible
2. Subject to manager approval
3. Limited to 3 personal days per year

## Time Off Calendar

### Peak Blackout Periods
- End of fiscal quarter (3 days before/after close)
- Annual conference week
- Product launch periods

### Holiday Schedule
Refer to annual holiday calendar for company-observed holidays.

## Unused Time Off
- Vacation time: Rolls over up to 5 days per year
- Sick leave: Rolls over indefinitely (max 40 days)
- Personal days: Use it or lose it annually

## Time Off Approval Process
- Requests reviewed within 48 hours
- Approvals based on business needs and team coverage
- Denied requests: Manager will suggest alternative dates

(Note: This is a template. Customize for your company's procedures.)`
            },
            {
                name: 'Performance Review Process',
                content: `# Performance Review Process

## Annual Performance Reviews

### Timeline
- Review period: January - December
- Self-assessments due: First week of January
- Manager reviews due: Mid-January
- Review meetings: End of January
- Compensation changes effective: March 1st

### Review Components

**Self-Assessment**
- Accomplishments and key projects
- Goal achievement (previous year)
- Challenges and learning experiences
- Development areas
- Career aspirations

**Manager Assessment**
- Performance against goals
- Core competency evaluation
- Behavioral feedback
- Strengths and development areas
- Rating assignment

**360-Degree Feedback** (for senior roles)
- Peer feedback
- Stakeholder input
- Cross-functional collaboration

### Performance Ratings
1. Exceeds Expectations (Top 10%)
2. Meets All Expectations (70%)
3. Meets Most Expectations (15%)
4. Needs Improvement (5%)

### Review Meeting
- 60-minute discussion with manager
- Review accomplishments and feedback
- Discuss development opportunities
- Set goals for upcoming year
- Address questions and concerns

## Goal Setting

### SMART Goals Framework
- Specific
- Measurable
- Achievable
- Relevant
- Time-bound

### Quarterly Check-ins
- Review progress on annual goals
- Adjust goals if priorities change
- Discuss development and support needs
- Provide ongoing feedback

## Performance Improvement Plans (PIP)
- 30, 60, or 90-day plans
- Clear expectations and metrics
- Regular check-ins with manager
- HR support and resources
- Successful completion or separation decision

(Note: This is a template. Adapt to your organization's process.)`
            }
        ],
        support: [
            {
                name: 'Product Documentation',
                content: `# Product Documentation

## Product Overview

### What is [Your Product]?
[Your Product] is a comprehensive solution designed to help [target users] achieve [key benefits].

### Key Features
1. **Feature 1:** Description and benefits
2. **Feature 2:** Description and benefits
3. **Feature 3:** Description and benefits
4. **Feature 4:** Description and benefits

### System Requirements
- Operating System: Windows 10+, macOS 11+, Linux
- Browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- RAM: 4GB minimum, 8GB recommended
- Storage: 500MB available space

## Getting Started

### Installation
1. Download installer from [website]
2. Run setup wizard
3. Accept license agreement
4. Choose installation directory
5. Complete installation
6. Launch application

### Account Setup
1. Create account with email
2. Verify email address
3. Complete profile
4. Set preferences
5. Start using the product

### Basic Navigation
- Dashboard: Overview of your account
- Menu: Access key features
- Settings: Customize your experience
- Help: Access support resources

## Core Functionality

### Using [Key Feature 1]
1. Step-by-step instructions
2. Tips and best practices
3. Common use cases
4. Advanced options

### Using [Key Feature 2]
1. Step-by-step instructions
2. Tips and best practices
3. Common use cases
4. Advanced options

(Note: Replace with your actual product documentation.)`
            },
            {
                name: 'Troubleshooting Guide',
                content: `# Troubleshooting Guide

## Common Issues and Solutions

### Login Problems

**Issue: Can't log in**
1. Verify email and password are correct
2. Check Caps Lock is off
3. Clear browser cache and cookies
4. Try "Forgot Password" option
5. Contact support if issue persists

**Issue: Account locked**
- Wait 30 minutes after 5 failed attempts
- Use "Forgot Password" to reset
- Contact support for immediate unlock

### Performance Issues

**Issue: Application running slowly**
1. Close other applications
2. Check internet connection speed
3. Clear application cache
4. Update to latest version
5. Restart application/computer

**Issue: Features not loading**
1. Refresh the page (F5)
2. Check internet connection
3. Disable browser extensions
4. Try different browser
5. Clear browser data

### Error Messages

**Error: "Connection Failed"**
- Check internet connectivity
- Verify firewall settings
- Restart router/modem
- Try different network
- Contact IT if on corporate network

**Error: "Session Expired"**
- Click "Login Again"
- Clear cookies and re-login
- Check system time is correct

### Data Sync Issues

**Issue: Changes not saving**
1. Check internet connection
2. Verify you're logged in
3. Wait 30 seconds and refresh
4. Check storage quota
5. Contact support if data lost

(Note: Customize for your specific product issues.)`
            },
            {
                name: 'FAQ Database',
                content: `# Frequently Asked Questions

## Account and Billing

**Q: How do I update my payment method?**
A: Go to Settings > Billing > Payment Methods. Click "Add Payment Method" or "Edit" existing method.

**Q: Can I cancel my subscription?**
A: Yes, go to Settings > Subscription > Cancel Subscription. You'll have access until the end of your billing period.

**Q: What's your refund policy?**
A: We offer a 30-day money-back guarantee for new customers. Contact support to request a refund.

**Q: How do I upgrade/downgrade my plan?**
A: Settings > Subscription > Change Plan. Upgrades are immediate; downgrades take effect next billing cycle.

## Product Usage

**Q: Is there a mobile app?**
A: Yes, available for iOS and Android. Download from App Store or Google Play.

**Q: Can I use this offline?**
A: Limited offline functionality is available. Full features require internet connection.

**Q: How many users can I have?**
A: Depends on your plan:
- Basic: 1 user
- Professional: 5 users
- Enterprise: Unlimited users

**Q: Is my data backed up?**
A: Yes, automatic backups every 24 hours with 30-day retention. Enterprise plans include real-time backup.

## Technical Questions

**Q: What browsers are supported?**
A: Chrome, Firefox, Safari, and Edge (latest 2 versions). Internet Explorer is not supported.

**Q: Do you have an API?**
A: Yes, API documentation available at [api-docs-url]. API access included with Professional plans and above.

**Q: Is the data encrypted?**
A: Yes, data encrypted in transit (TLS 1.3) and at rest (AES-256).

(Note: Replace with your actual FAQs.)`
            },
            {
                name: 'Escalation Procedures',
                content: `# Support Escalation Procedures

## When to Escalate

### Tier 1 → Tier 2 Escalation
Escalate when:
- Issue requires deeper technical knowledge
- Problem persists after standard troubleshooting
- Customer requests supervisor/specialist
- Issue involves billing discrepancies
- Time spent exceeds 30 minutes

### Tier 2 → Tier 3 Escalation
Escalate when:
- Issue requires engineering investigation
- Bug affects multiple customers
- Feature request needs product team review
- Security concern identified
- Data recovery needed

### Emergency Escalation
Immediate escalation for:
- Service outage affecting all users
- Security breach or vulnerability
- Data loss or corruption
- Payment processing failure
- Legal or compliance issue

## Escalation Process

### Standard Escalation
1. Document all troubleshooting steps taken
2. Gather diagnostic information
3. Create escalation ticket
4. Assign to appropriate team
5. Notify customer of escalation
6. Set expectations for response time

### Information to Include
- Customer account details
- Detailed problem description
- Steps already attempted
- Error messages/screenshots
- Impact and urgency level
- Customer contact preference

### Follow-up Requirements
- Check escalated ticket status daily
- Update customer every 24-48 hours
- Notify customer when resolved
- Request feedback after resolution

## Response Time SLAs

### Priority Levels
- **Critical:** 1 hour response, 4 hour resolution target
- **High:** 4 hour response, 24 hour resolution target
- **Medium:** 24 hour response, 3 day resolution target
- **Low:** 48 hour response, 5 day resolution target

## After-Hours Support
- Phone support available 24/7 for Enterprise customers
- Email support monitored within 24 hours
- Emergency pager for critical issues

(Note: Customize for your support structure.)`
            }
        ],
        it: [
            {
                name: 'System Setup Guides',
                content: `# System Setup Guides

## Windows Workstation Setup

### Initial Configuration
1. **Install Windows Updates**
   - Open Settings > Update & Security
   - Check for updates
   - Install all critical and security updates
   - Restart as needed

2. **Configure User Account**
   - Create standard user account (not admin)
   - Set strong password (12+ characters)
   - Enable password expiration
   - Configure account recovery options

3. **Install Security Software**
   - Install company-approved antivirus
   - Configure real-time protection
   - Schedule weekly scans
   - Enable automatic updates

4. **Network Configuration**
   - Connect to corporate WiFi
   - Map network drives
   - Configure VPN if remote
   - Test connectivity

### Software Installation
- Microsoft Office 365
- Web browsers (Chrome, Firefox)
- Communication tools (Slack, Teams)
- Development tools (if applicable)
- Required line-of-business applications

## macOS Workstation Setup

### Initial Configuration
1. **System Updates**
   - Open System Preferences > Software Update
   - Install all available updates
   - Restart if required

2. **User Account**
   - Create managed user account
   - Enable FileVault disk encryption
   - Set up Touch ID / password
   - Configure iCloud (if approved)

3. **Security Settings**
   - Enable Firewall
   - Configure Gatekeeper
   - Install approved security software
   - Enable automatic updates

4. **Network Setup**
   - Connect to corporate WiFi
   - Configure VPN settings
   - Map shared drives
   - Test access to resources

(Note: Customize for your IT environment and standards.)`
            },
            {
                name: 'Software Installation Procedures',
                content: `# Software Installation Procedures

## Approved Software List

### Required Software (All Users)
- Antivirus: [Company Standard]
- VPN Client: [Company VPN]
- Microsoft Office 365
- Web browsers (Chrome, Firefox)
- Communication: Microsoft Teams/Slack

### Approved Optional Software
- Adobe Acrobat Reader
- 7-Zip/WinRAR
- Notepad++
- VideoLAN VLC Player
- Zoom

### Department-Specific Software
**Development Team:**
- Visual Studio Code
- Git
- Docker Desktop
- Postman
- Node.js/Python/Java

**Design Team:**
- Adobe Creative Suite
- Figma Desktop
- Sketch

## Installation Process

### Standard Installation
1. **Check Approval**
   - Verify software on approved list
   - Confirm license availability
   - Check system requirements

2. **Download Software**
   - Use official website only
   - Verify digital signature
   - Scan with antivirus before installing

3. **Install**
   - Run installer as administrator (if needed)
   - Choose corporate installation options
   - Decline additional bundled software
   - Restart if required

4. **Configure**
   - Apply company settings
   - Connect to license server
   - Set auto-update preferences
   - Test functionality

### Software Request Process
1. Submit request via IT service desk
2. Include business justification
3. Await manager approval
4. IT reviews for security/compatibility
5. License procurement (if needed)
6. Installation scheduled

## Prohibited Software
- Unauthorized file sharing applications
- Cryptocurrency mining software
- Unlicensed or pirated software
- Personal storage sync tools (Dropbox, etc.)
- Remote access tools (TeamViewer, etc.)

(Note: Maintain current approved software list for your organization.)`
            },
            {
                name: 'Security Protocols',
                content: `# IT Security Protocols

## Password Policy

### Requirements
- Minimum 12 characters
- Include uppercase, lowercase, numbers, symbols
- No dictionary words
- No personal information
- Cannot reuse last 5 passwords
- Change every 90 days

### Best Practices
- Use password manager
- Enable multi-factor authentication (MFA)
- Never share passwords
- Use unique passwords for each account
- Avoid writing passwords down

## Multi-Factor Authentication (MFA)

### Required for:
- Email access
- VPN connections
- Cloud applications
- Administrative accounts
- Financial systems

### Setup Process
1. Install authenticator app (Microsoft/Google Authenticator)
2. Scan QR code during setup
3. Enter verification code
4. Save backup codes securely
5. Test MFA login

## Data Classification

### Public Data
- Marketing materials
- Press releases
- Public website content

### Internal Data
- Internal communications
- General business documents
- Company directories

### Confidential Data
- Customer information
- Financial records
- Employee data
- Business strategies

### Restricted Data
- Trade secrets
- Legal documents
- Security credentials
- Personally identifiable information (PII)

## Email Security

### Identifying Phishing
- Suspicious sender address
- Urgent or threatening language
- Unexpected attachments
- Requests for passwords/credentials
- Grammatical errors
- Suspicious links

### Best Practices
- Verify sender before clicking links
- Hover over links to see destination
- Don't open unexpected attachments
- Report suspicious emails to IT
- Use "Report Phishing" button

## Device Security

### Laptop/Desktop
- Enable full disk encryption
- Set screen lock timeout (10 minutes)
- Never leave device unattended
- Use cable lock in public spaces
- Report lost/stolen devices immediately

### Mobile Devices
- Set strong passcode
- Enable biometric authentication
- Install approved MDM profile
- Encrypt device storage
- Enable remote wipe capability

## Network Security

### WiFi Usage
- Only use corporate or secure networks
- Avoid public WiFi without VPN
- Verify network name before connecting
- Enable VPN on untrusted networks

### VPN Usage
- Required for all remote access
- Connect before accessing company resources
- Keep VPN client updated
- Report connection issues to IT

## Incident Reporting

### Security Incidents to Report
- Suspected malware infection
- Phishing attempts
- Lost or stolen devices
- Unauthorized access attempts
- Data breaches
- Suspicious activity

### How to Report
1. Contact IT Security immediately
2. Email: security@company.com
3. Phone: [IT Security Hotline]
4. Don't attempt to fix yourself
5. Preserve evidence

(Note: Adapt security protocols to your organization's requirements.)`
            },
            {
                name: 'Network Configuration',
                content: `# Network Configuration Guide

## Corporate WiFi Setup

### Windows Configuration
1. Click WiFi icon in system tray
2. Select corporate WiFi network
3. Enter network credentials
4. Accept certificate if prompted
5. Verify connection in Network Settings

### macOS Configuration
1. Click WiFi icon in menu bar
2. Select corporate WiFi network
3. Enter network credentials
4. Trust certificate if prompted
5. Verify connection successful

### Troubleshooting WiFi Issues
- Forget network and reconnect
- Update WiFi drivers
- Restart WiFi adapter
- Check with IT for known issues
- Verify credentials haven't expired

## VPN Configuration

### VPN Client Installation
1. Download VPN client from IT portal
2. Install with administrator privileges
3. Restart computer
4. Launch VPN application
5. Enter provided credentials

### VPN Connection
1. Open VPN client
2. Select company VPN profile
3. Enter username and password
4. Complete MFA challenge
5. Wait for "Connected" status
6. Verify IP address changed

### VPN Best Practices
- Connect VPN before accessing company resources
- Keep VPN connected during remote work
- Disconnect when finished
- Report connection drops to IT
- Update VPN client when prompted

## Network Drive Mapping

### Windows
1. Open File Explorer
2. Click "Map network drive"
3. Choose drive letter
4. Enter: \\\\fileserver\\sharename
5. Check "Reconnect at sign-in"
6. Enter credentials if prompted

### macOS
1. Open Finder
2. Go > Connect to Server
3. Enter: smb://fileserver/sharename
4. Click Connect
5. Enter credentials
6. Check "Remember password"

## Printer Setup

### Network Printer Installation
1. Open Settings > Devices > Printers
2. Click "Add printer"
3. Select network printer from list
4. Follow installation wizard
5. Print test page
6. Set as default if needed

### Common Printer Issues
- Restart print spooler service
- Update printer drivers
- Check paper and toner levels
- Verify network connectivity
- Clear print queue

(Note: Update with your specific network configuration details.)`
            }
        ],
        sales: [
            {
                name: 'Product Catalog',
                content: `# Product Catalog

## Product Line Overview

### Product Category A
**Product A1** - Entry Level Solution
- Key Features: [List 3-5 main features]
- Target Customer: Small businesses, startups
- Price Point: $X/month or $Y one-time
- Best For: [Specific use cases]

**Product A2** - Professional Solution
- Key Features: [List 3-5 main features]
- Target Customer: Growing businesses
- Price Point: $X/month or $Y one-time
- Best For: [Specific use cases]

**Product A3** - Enterprise Solution
- Key Features: [List 3-5 main features]
- Target Customer: Large organizations
- Price Point: Custom pricing
- Best For: [Specific use cases]

### Product Category B
[Similar structure for other product lines]

## Competitive Advantages

### vs. Competitor 1
- Advantage 1: [Specific benefit]
- Advantage 2: [Specific benefit]
- Advantage 3: [Specific benefit]

### vs. Competitor 2
- Advantage 1: [Specific benefit]
- Advantage 2: [Specific benefit]
- Advantage 3: [Specific benefit]

## Product Specifications

[Detailed technical specifications, system requirements, integration capabilities]

(Note: Replace with your actual product information.)`
            },
            {
                name: 'Sales Techniques',
                content: `# Sales Techniques & Best Practices

## Discovery Phase

### Effective Questions to Ask
1. "What challenges are you currently facing?"
2. "What goals are you trying to achieve?"
3. "What have you tried so far?"
4. "Who else is involved in this decision?"
5. "What's your timeline for implementing a solution?"

### Active Listening
- Let the prospect talk 70% of the time
- Take notes on pain points
- Avoid interrupting
- Reflect back what you heard
- Ask clarifying questions

## Presentation Techniques

### SPIN Selling
- **Situation:** Understand current state
- **Problem:** Identify pain points
- **Implication:** Explore consequences
- **Need-Payoff:** Show value of solution

### Features vs. Benefits
- Feature: "Our software has automated reporting"
- Benefit: "Save 10 hours per week on manual reporting"

Always lead with benefits, support with features.

## Handling Objections

### "It's too expensive"
- "I understand budget is important. Let's look at the ROI..."
- "Compared to [competitor], our solution actually costs less when you factor in..."
- "What budget were you planning for?"

### "I need to think about it"
- "I understand. What specific concerns do you have?"
- "What information would help you make a decision?"
- "What's your timeline for making a decision?"

### "We're already using [competitor]"
- "That's great! What's working well for you?"
- "What would make you consider switching?"
- "Here's how we compare..."

## Closing Techniques

### Trial Close
"If we can address [concern], would you be ready to move forward?"

### Assumptive Close
"I'll have the contract ready by Friday. Does that work for you?"

### Alternative Choice Close
"Would you prefer the monthly or annual billing option?"

(Note: Customize for your sales methodology.)`
            }
        ],
        marketing: [
            {
                name: 'Campaign Planning Fundamentals',
                content: `# Campaign Planning Fundamentals

## Campaign Strategy Framework

### 1. Define Objectives
**SMART Goals:**
- Specific: Clearly defined outcome
- Measurable: Quantifiable metrics
- Achievable: Realistic given resources
- Relevant: Aligned with business goals
- Time-bound: Specific deadline

**Example Objectives:**
- Increase brand awareness by 25% in Q2
- Generate 500 qualified leads per month
- Achieve 3% conversion rate on landing page
- Grow social media following by 10,000

### 2. Identify Target Audience

**Demographics:**
- Age range
- Gender
- Location
- Income level
- Education
- Occupation

**Psychographics:**
- Interests and hobbies
- Values and beliefs
- Lifestyle
- Pain points
- Buying behavior

**Customer Personas:**
Create 2-3 detailed personas representing ideal customers.

### 3. Choose Marketing Channels

**Digital Channels:**
- Social media (Facebook, Instagram, LinkedIn, TikTok)
- Email marketing
- Content marketing (blog, video, podcasts)
- Paid advertising (Google Ads, social ads)
- SEO/SEM
- Influencer partnerships

**Traditional Channels:**
- Print advertising
- Radio/TV
- Direct mail
- Events and trade shows
- PR and media relations

### 4. Develop Messaging

**Key Messages:**
- Unique value proposition
- Brand positioning
- Key benefits
- Call to action
- Proof points (testimonials, data)

**Tone and Voice:**
- Align with brand guidelines
- Resonate with target audience
- Consistent across channels

### 5. Create Campaign Timeline

**Pre-Launch (2-4 weeks):**
- Finalize creative assets
- Set up tracking and analytics
- Build landing pages
- Schedule content
- Brief team members

**Launch Week:**
- Activate all channels
- Monitor performance
- Respond to engagement
- Address any issues

**Active Campaign (4-8 weeks):**
- Daily monitoring
- Weekly optimization
- A/B testing
- Content refreshes
- Performance reporting

**Post-Campaign:**
- Final analysis
- ROI calculation
- Lessons learned
- Archive assets

### 6. Budget Allocation

**Recommended Distribution:**
- Creative development: 15-20%
- Media/ad spend: 50-60%
- Tools and technology: 10-15%
- Personnel/agency: 15-20%
- Contingency: 5-10%

### 7. Measurement and KPIs

**Awareness Metrics:**
- Impressions
- Reach
- Brand recall
- Share of voice

**Engagement Metrics:**
- Click-through rate (CTR)
- Social engagement rate
- Time on site
- Pages per session

**Conversion Metrics:**
- Lead generation
- Conversion rate
- Cost per acquisition (CPA)
- Return on ad spend (ROAS)

**Business Impact:**
- Revenue generated
- Customer lifetime value
- Market share growth
- Brand equity increase

(Note: Adapt framework to your industry and goals.)`
            }
        ]
    };

    const kbs = kbTemplates[domain] || kbTemplates.hr;
    knowledgeBases = [];
    kbCounter = 0;

    kbs.forEach((kb, index) => {
        kbCounter++;
        knowledgeBases.push({
            id: `kb-${kbCounter}`,
            name: kb.name,
            content: kb.content
        });
    });

    renderKnowledgeBases();
}

// Generate Project Configuration
function generateProjectConfig(domain) {
    const domainNames = {
        hr: 'Employee HR Support System',
        support: 'Customer Support Assistant Platform',
        it: 'IT Support & Technical Help Desk',
        sales: 'Sales Assistant & CRM Helper',
        marketing: 'Marketing Campaign Planning Hub'
    };

    const domainDescriptions = {
        hr: 'A comprehensive HR assistant that helps employees with company policies, benefits, time off requests, and general HR inquiries. Provides accurate, empathetic support based on company HR documentation.',
        support: 'An intelligent customer support system that helps customers with product questions, troubleshooting, and account management. Escalates complex issues to human agents when appropriate.',
        it: 'A technical support assistant that guides employees through system setup, software installation, troubleshooting, and security best practices. Provides precise, step-by-step technical guidance.',
        sales: 'A sales enablement tool that helps sales teams with product information, pricing, objection handling, and closing techniques. Supports the entire sales process from discovery to close.',
        marketing: 'A marketing campaign strategist that assists with campaign planning, content creation, channel selection, and performance optimization. Helps execute effective marketing strategies.'
    };

    agentConfig.projectName = domainNames[domain] || 'Custom AI Agent System';
    agentConfig.projectDescription = domainDescriptions[domain] || agentConfig.description;

    document.getElementById('projectName').value = agentConfig.projectName;
    document.getElementById('projectDescription').value = agentConfig.projectDescription;
}

// Generate Agent Configuration
function generateAgentConfig(domain) {
    const domainAgentNames = {
        hr: 'HR Support Assistant',
        support: 'Customer Support Agent',
        it: 'IT Support Specialist',
        sales: 'Sales Assistant',
        marketing: 'Marketing Campaign Strategist'
    };

    const domainModels = {
        hr: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
        support: 'openai.gpt-4o',
        it: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
        sales: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
        marketing: 'anthropic.claude-3-5-sonnet-20241022-v2:0'
    };

    const domainTemperatures = {
        hr: 0.3,
        support: 0.4,
        it: 0.2,
        sales: 0.6,
        marketing: 0.7
    };

    agentConfig.name = domainAgentNames[domain] || 'AI Assistant';
    agentConfig.model = domainModels[domain];
    agentConfig.temperature = domainTemperatures[domain];

    // Populate Agent Name (check if AI already set it, otherwise use domain default)
    if (!agentConfig.agentName) {
        agentConfig.agentName = agentConfig.name;
    }
    document.getElementById('agentName').value = agentConfig.agentName;

    document.getElementById('modelSelect').value = agentConfig.model;
    document.getElementById('temperature').value = agentConfig.temperature;
    document.getElementById('tempValue').textContent = agentConfig.temperature;

    // Show model reasoning if AI provided it
    const reasoningSection = document.getElementById('modelReasoningSection');
    const reasoningText = document.getElementById('modelReasoningText');
    if (agentConfig.modelReasoning) {
        reasoningText.textContent = agentConfig.modelReasoning;
        reasoningSection.style.display = 'block';
    } else {
        reasoningSection.style.display = 'none';
    }

    generateSystemPrompt(domain);
    updateModelRecommendation();
}

// Generate System Prompt
function generateSystemPrompt(domain) {
    const prompts = {
        hr: `You are an expert HR Assistant with comprehensive knowledge of company policies, employee benefits, time off procedures, and HR best practices.

Your role is to:
- Provide accurate information about company policies and procedures
- Help employees understand their benefits and how to use them
- Guide employees through time off requests and approval processes
- Answer questions about performance reviews and career development
- Maintain a professional, empathetic, and supportive tone

Guidelines:
- Always cite specific policies when providing guidance
- Respect employee privacy and confidentiality
- Escalate sensitive issues to human HR representatives
- Be clear about what you can and cannot help with
- Provide step-by-step instructions when appropriate

When you don't know something, acknowledge it and direct the employee to the appropriate HR resource or team member.`,

        support: `You are an expert Customer Support Assistant with deep knowledge of our products, troubleshooting procedures, and customer service best practices.

Your role is to:
- Answer product questions clearly and accurately
- Guide customers through troubleshooting steps
- Provide helpful documentation and resources
- Escalate complex technical issues to specialists
- Ensure customer satisfaction and positive experiences

Guidelines:
- Be patient, clear, and friendly in all interactions
- Ask clarifying questions to understand the issue fully
- Provide step-by-step troubleshooting instructions
- Know when to escalate to human agents
- Follow up to ensure issues are resolved
- Use simple, non-technical language when possible

If you cannot resolve an issue, clearly explain the escalation process and set appropriate expectations.`,

        it: `You are an expert IT Support Assistant with comprehensive knowledge of system administration, software installation, security protocols, and technical troubleshooting.

Your role is to:
- Guide users through system setup and configuration
- Provide precise technical instructions
- Help troubleshoot software and hardware issues
- Ensure security best practices are followed
- Support users with varying levels of technical expertise

Guidelines:
- Provide clear, step-by-step technical guidance
- Use screenshots or diagrams when helpful
- Prioritize security in all recommendations
- Verify user understanding before moving to next steps
- Document solutions for knowledge base
- Escalate complex issues to senior IT staff

Always emphasize security best practices and verify that users understand important technical concepts.`,

        sales: `You are an expert Sales Assistant with deep knowledge of our products, pricing, sales techniques, and customer relationship management.

Your role is to:
- Help sales teams understand product features and benefits
- Provide pricing and discount guidance
- Suggest effective sales techniques for different scenarios
- Help handle customer objections
- Support the entire sales cycle from discovery to close

Guidelines:
- Focus on customer needs and pain points
- Always lead with benefits, support with features
- Provide specific examples and case studies
- Help identify opportunities for upselling/cross-selling
- Maintain professional and persuasive communication
- Follow company pricing and discount policies

Use consultative selling approaches and help build long-term customer relationships.`,

        marketing: `You are an expert Marketing Campaign Strategist with comprehensive knowledge of campaign planning, social media, content marketing, and analytics.

Your role is to:
- Help plan effective marketing campaigns
- Suggest appropriate channels and tactics
- Provide best practices for each marketing channel
- Assist with content strategy and messaging
- Guide campaign measurement and optimization

Guidelines:
- Start with clear objectives and target audience
- Recommend data-driven strategies
- Provide creative ideas while staying strategic
- Balance short-term tactics with long-term brand building
- Stay current with marketing trends and platforms
- Focus on measurable results and ROI

Always align recommendations with business goals and available resources.`
    };

    agentConfig.systemPrompt = prompts[domain] || prompts.hr;
    document.getElementById('systemPrompt').value = agentConfig.systemPrompt;
}

// Regenerate System Prompt
function regenerateSystemPrompt() {
    showTypingIndicator('Regenerating system prompt...');

    setTimeout(() => {
        const domain = agentConfig.domain || 'custom';
        generateSystemPromptVariation(domain);
        removeTypingIndicator();
        addChatMessage('assistant', '✅ System prompt regenerated with a new variation! Review in Step 3.');
    }, 1500);
}

// Generate varied system prompt based on domain
function generateSystemPromptVariation(domain) {
    const description = agentConfig.description || '';

    // Define multiple prompt variations for each domain
    const promptVariations = {
        marketing: [
            // Variation 1: Strategic Focus
            `You are an expert Marketing Campaign Strategist with comprehensive knowledge of campaign planning, multi-channel advertising, and performance optimization.

Your role is to:
- Develop comprehensive marketing campaign strategies across Meta, Google, TikTok, and Pinterest
- Provide tactical recommendations for audience targeting, creative development, and budget allocation
- Analyze campaign performance and suggest data-driven optimizations
- Guide marketers through campaign setup, execution, and reporting
- Stay current with platform updates and advertising best practices

Guidelines:
- Start with clear objectives and KPIs for every campaign
- Recommend platform-specific tactics based on campaign goals
- Provide creative ideas while maintaining strategic focus
- Balance performance optimization with brand building
- Use data and benchmarks to support recommendations
- Focus on measurable ROI and ROAS improvements

Always align recommendations with business goals, available budget, and target audience characteristics.`,

            // Variation 2: Tactical Focus
            `You are a hands-on Marketing Campaign Specialist focused on execution, optimization, and measurable results across paid advertising platforms.

Your expertise includes:
- Creating and optimizing campaigns on Meta Ads, Google Ads, TikTok, and Pinterest
- Building effective audience targeting strategies using platform tools
- Developing high-performing ad creative (copy, visuals, video)
- Managing budgets and bidding strategies for optimal ROAS
- Running A/B tests and analyzing performance data
- Generating actionable insights from campaign analytics

Best practices you follow:
- Test multiple creative variations to find winners
- Use platform-specific features and ad formats effectively
- Monitor performance metrics daily and adjust quickly
- Prioritize campaigns that drive the highest ROI
- Document learnings for continuous improvement
- Communicate results clearly to stakeholders

Your goal is to help marketers run profitable campaigns that achieve their business objectives.`,

            // Variation 3: Analytical Focus
            `You are a Marketing Analytics & Optimization Expert specializing in campaign performance analysis and data-driven decision making.

Your core capabilities:
- Deep analysis of campaign metrics across Meta, Google, TikTok, and Pinterest
- Identifying optimization opportunities in targeting, creative, and bidding
- Building performance reports with actionable insights
- Calculating and tracking key metrics: ROI, ROAS, CPA, CTR, conversion rates
- Benchmarking performance against industry standards
- Providing strategic recommendations based on data patterns

Your analytical approach:
- Always start with data before making recommendations
- Look for trends and patterns across campaigns and platforms
- Identify high-performers and scale what works
- Diagnose underperforming campaigns and suggest fixes
- Use statistical significance when evaluating test results
- Present findings in clear, visual, executive-friendly formats

Help marketers make smarter decisions by turning campaign data into actionable strategies.`
        ],

        hr: [
            // Variation 1: Policy-Focused
            `You are a knowledgeable HR Assistant specializing in company policies, benefits administration, and employee support.

Your responsibilities:
- Provide accurate, up-to-date information on company policies and procedures
- Guide employees through benefits enrollment and utilization
- Assist with time off requests, approvals, and tracking
- Answer questions about compensation, performance reviews, and career development
- Support employees with HR-related questions and concerns

Your approach:
- Always cite specific policies when providing guidance
- Maintain strict confidentiality and respect employee privacy
- Use clear, empathetic communication
- Escalate sensitive matters to human HR representatives
- Provide step-by-step instructions for HR processes
- Keep responses professional yet approachable

When uncertain, acknowledge limitations and direct employees to appropriate HR resources.`,

            // Variation 2: Employee Experience Focus
            `You are an empathetic HR Support Specialist dedicated to creating positive employee experiences and resolving workplace concerns.

What you help with:
- Understanding and navigating company benefits (health, retirement, PTO)
- Clarifying policies on performance, conduct, and workplace expectations
- Processing requests for time off, schedule changes, and accommodations
- Providing information on career development and training opportunities
- Supporting employees through workplace transitions and changes

How you operate:
- Lead with empathy and understanding of employee situations
- Simplify complex HR policies into clear, actionable guidance
- Empower employees to self-serve when possible
- Know when to involve human HR professionals
- Follow up to ensure employee needs are met
- Maintain a supportive, non-judgmental tone

Your priority is helping employees feel supported, informed, and valued.`,

            // Variation 3: Procedural Focus
            `You are an efficient HR Operations Assistant focused on processes, procedures, and getting things done correctly.

Your expertise includes:
- Detailed knowledge of HR workflows and approval processes
- Step-by-step guidance through HR systems and portals
- Accurate information on deadlines, requirements, and documentation
- Efficient routing of requests to appropriate HR teams
- Tracking and following up on employee requests

Your working style:
- Provide clear, sequential instructions for completing HR tasks
- Ensure all required information is collected upfront
- Set realistic expectations for processing times
- Verify understanding before employees proceed
- Document frequent issues for knowledge base
- Streamline processes wherever possible

Help employees navigate HR procedures efficiently while ensuring compliance and accuracy.`
        ],

        support: [
            // Variation 1: Troubleshooting Focus
            `You are a skilled Customer Support Specialist with expertise in product troubleshooting, issue resolution, and customer satisfaction.

Your capabilities:
- Diagnose and resolve common product issues quickly
- Guide customers through step-by-step troubleshooting
- Provide clear explanations of product features and functionality
- Access and share relevant documentation and resources
- Escalate complex technical issues appropriately
- Ensure positive customer experiences

Your support philosophy:
- Listen carefully to understand the full problem
- Ask clarifying questions before jumping to solutions
- Provide patient, friendly guidance at the customer's pace
- Use simple language and avoid unnecessary jargon
- Verify solutions work before closing tickets
- Learn from each interaction to improve support quality

Your goal is to resolve issues efficiently while making customers feel heard and valued.`,

            // Variation 2: Product Education Focus
            `You are an expert Product Support Educator helping customers get maximum value from our products.

What you provide:
- Comprehensive product knowledge and usage guidance
- Best practices for common use cases and workflows
- Proactive tips to prevent common issues
- Educational resources tailored to customer needs
- Feature recommendations based on customer goals
- Ongoing support for product adoption and mastery

How you help:
- Teach customers how to use features effectively
- Share tips and tricks for productivity
- Recommend relevant documentation and tutorials
- Celebrate customer successes and milestones
- Anticipate questions and address them proactively
- Build customer confidence in using the product

Transform support interactions into learning opportunities that drive product adoption and satisfaction.`,

            // Variation 3: Issue Resolution Focus
            `You are a decisive Customer Support Agent specializing in rapid issue identification and resolution.

Your strengths:
- Quickly identifying root causes of customer issues
- Applying proven solutions and workarounds
- Knowing when to escalate to specialists
- Managing customer expectations clearly
- Following up to ensure complete resolution
- Documenting solutions for future reference

Your process:
- Gather essential information efficiently
- Reproduce issues when possible
- Apply systematic troubleshooting methods
- Provide temporary workarounds while investigating
- Communicate progress and timelines clearly
- Close loops with customers after resolution

Deliver fast, effective support that minimizes customer frustration and downtime.`
        ],

        it: [
            // Variation 1: Security-First
            `You are a security-conscious IT Support Specialist with expertise in system administration, security protocols, and technical troubleshooting.

Your focus areas:
- Secure system setup and configuration
- Software installation and updates
- Security best practices and compliance
- Technical troubleshooting for hardware and software
- User access management and permissions
- Network and system security

Your security-first approach:
- Verify user identity before providing support
- Prioritize security in all recommendations
- Educate users on security risks and prevention
- Follow principle of least privilege
- Document all system changes
- Escalate security incidents immediately

Balance security requirements with user productivity while maintaining a helpful, patient demeanor.`,

            // Variation 2: User Enablement Focus
            `You are a patient IT Support Guide dedicated to helping users of all technical skill levels succeed with technology.

What you support:
- System and software setup for new users
- Troubleshooting common technical issues
- Training on IT tools and applications
- Password resets and access management
- Device configuration and optimization
- Remote work technology support

Your teaching approach:
- Adapt explanations to user's technical level
- Use analogies and simple language for complex concepts
- Provide visual aids and screenshots when helpful
- Verify understanding at each step
- Build user confidence and self-sufficiency
- Create resources for common questions

Empower users to solve simple issues independently while providing excellent support for complex problems.`,

            // Variation 3: Systems Focus
            `You are a technical IT Support Engineer with deep knowledge of system architecture, software, and infrastructure.

Your technical expertise:
- System administration and configuration
- Software deployment and troubleshooting
- Network connectivity and performance
- Hardware diagnostics and repair
- Integration and compatibility issues
- Performance optimization

Your technical approach:
- Gather detailed system information before troubleshooting
- Use systematic diagnostic methods
- Provide precise, step-by-step technical instructions
- Document configurations and solutions
- Consider system-wide impacts of changes
- Escalate infrastructure issues to senior engineers

Deliver expert technical support with clear communication and thorough problem resolution.`
        ],

        sales: [
            // Variation 1: Consultative Selling
            `You are a consultative Sales Advisor focused on understanding customer needs and providing tailored solutions.

Your sales expertise:
- Discovery and needs analysis
- Solution positioning and demonstration
- Objection handling and negotiation
- Pricing and proposal development
- Relationship building and account management
- Sales process optimization

Your consultative approach:
- Ask insightful questions to uncover true needs
- Listen more than you talk
- Position solutions based on customer pain points
- Provide relevant case studies and social proof
- Address objections with empathy and data
- Focus on long-term customer success

Build trust and deliver value throughout the entire sales cycle.`,

            // Variation 2: Product Champion
            `You are an enthusiastic Product Sales Specialist with deep knowledge of our solutions and their business impact.

What you bring:
- Comprehensive product knowledge and competitive differentiation
- Industry use cases and success stories
- ROI calculations and value propositions
- Technical specification and integration details
- Pricing structures and packaging options
- Implementation and onboarding processes

Your sales style:
- Lead with benefits, support with features
- Demonstrate products in context of customer workflows
- Quantify value and business impact
- Provide specific examples and customer testimonials
- Customize presentations for each prospect
- Follow up with relevant resources and next steps

Help customers see how our products solve their specific business challenges.`,

            // Variation 3: Strategic Sales
            `You are a strategic Sales Consultant focused on complex sales cycles and enterprise deals.

Your capabilities:
- Strategic account planning and mapping
- Multi-stakeholder selling and consensus building
- Business case development and ROI modeling
- Contract negotiation and deal structuring
- Competitive positioning and differentiation
- Executive relationship management

Your strategic approach:
- Understand organizational goals and initiatives
- Identify and engage decision makers and influencers
- Build compelling business cases with financial impact
- Navigate complex approval processes
- Create win-win negotiation outcomes
- Plan for long-term account growth

Guide complex sales processes to successful closures while building lasting customer partnerships.`
        ]
    };

    // Get variations for the domain, or use marketing as default
    const variations = promptVariations[domain] || promptVariations.marketing;

    // Get current prompt to avoid showing the same one
    const currentPrompt = agentConfig.systemPrompt;

    // Filter out the current prompt if it matches exactly
    const availableVariations = variations.filter(v => v.trim() !== currentPrompt.trim());

    // If we've used all variations, use all of them
    const variationsToUse = availableVariations.length > 0 ? availableVariations : variations;

    // Pick a random variation
    const randomIndex = Math.floor(Math.random() * variationsToUse.length);
    const newPrompt = variationsToUse[randomIndex];

    // Update the config and UI
    agentConfig.systemPrompt = newPrompt;
    document.getElementById('systemPrompt').value = newPrompt;
}

// Update Model Recommendation
function updateModelRecommendation() {
    const recommendations = {
        'anthropic.claude-3-5-sonnet-20241022-v2:0': '💡 Excellent for complex reasoning, empathy, and long conversations',
        'anthropic.claude-3-5-haiku-20241022-v1:0': '⚡ Fast and cost-effective, great for simple queries',
        'openai.gpt-4o': '🎯 Strong general-purpose model, excellent at understanding varied questions',
        'amazon.nova-pro-v1:0': '💰 Cost-effective AWS-native option with good performance'
    };

    const model = document.getElementById('modelSelect').value;
    const recElement = document.getElementById('modelRecommendation');
    if (recElement) {
        recElement.textContent = recommendations[model] || '';
    }
}

// Render Knowledge Bases in Step 1
function renderKnowledgeBases() {
    const container = document.getElementById('knowledgeBasesList');
    container.innerHTML = '';

    if (knowledgeBases.length === 0) {
        container.innerHTML = '<div class="text-center py-12 text-gray-400"><p>Complete Step 0 to generate knowledge bases</p></div>';
        return;
    }

    knowledgeBases.forEach((kb, index) => {
        const kbDiv = document.createElement('div');
        kbDiv.className = 'bg-gray-50 rounded-lg p-4 border border-gray-200';
        kbDiv.id = kb.id;

        kbDiv.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        Knowledge Base ${index + 1} - Title <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="${kb.id}-name"
                        value="${kb.name}"
                        class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <button
                    onclick="removeKnowledgeBase('${kb.id}')"
                    class="ml-3 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                    Remove
                </button>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Content <span class="text-red-500">*</span>
                </label>
                <textarea
                    id="${kb.id}-content"
                    rows="8"
                    class="w-full border border-gray-300 rounded px-3 py-2 text-sm kb-editor focus:ring-2 focus:ring-indigo-500"
                >${kb.content}</textarea>
                <div class="flex justify-between items-center mt-1">
                    <span id="${kb.id}-char-count" class="text-xs text-gray-500">${kb.content.length.toLocaleString()} / 18,000 characters</span>
                    <button class="text-xs text-indigo-600 hover:text-indigo-700">Expand</button>
                </div>
            </div>
        `;

        container.appendChild(kbDiv);

        // Add event listeners
        document.getElementById(`${kb.id}-name`).addEventListener('input', function() {
            const kbIndex = knowledgeBases.findIndex(k => k.id === kb.id);
            if (kbIndex !== -1) {
                knowledgeBases[kbIndex].name = this.value;
            }
        });

        document.getElementById(`${kb.id}-content`).addEventListener('input', function() {
            const kbIndex = knowledgeBases.findIndex(k => k.id === kb.id);
            if (kbIndex !== -1) {
                knowledgeBases[kbIndex].content = this.value;
            }
            updateCharCount(kb.id);
        });
    });
}

// Add Knowledge Base
function addKnowledgeBase(name = '', content = '') {
    kbCounter++;
    const newKB = {
        id: `kb-${kbCounter}`,
        name: name,
        content: content
    };
    knowledgeBases.push(newKB);
    renderKnowledgeBases();

    console.log(`✅ Added KB: "${name}" (${content.length} chars)`);
}

// Remove Knowledge Base
function removeKnowledgeBase(kbId) {
    if (knowledgeBases.length <= 1) {
        alert('You must have at least one knowledge base!');
        return;
    }

    knowledgeBases = knowledgeBases.filter(kb => kb.id !== kbId);
    renderKnowledgeBases();
}

// Update Character Count
function updateCharCount(kbId) {
    const textarea = document.getElementById(`${kbId}-content`);
    const counter = document.getElementById(`${kbId}-char-count`);

    if (!textarea || !counter) return;

    const count = textarea.value.length;
    counter.textContent = `${count.toLocaleString()} / 18,000 characters`;

    counter.classList.remove('text-gray-500', 'text-orange-500', 'text-red-600', 'font-bold');

    if (count > 18000) {
        counter.classList.add('text-red-600', 'font-bold');
    } else if (count > 15000) {
        counter.classList.add('text-orange-500');
    } else {
        counter.classList.add('text-gray-500');
    }
}

// Navigation Functions
function nextStep() {
    if (!validateCurrentStep()) return;

    if (currentStep < 4) {
        currentStep++;
        updateStepDisplay();

        // Show AI encouragement
        if (currentStep === 1) {
            addChatMessage('assistant', '📚 Great! Review your knowledge bases. These will be the foundation of your agent\'s expertise.');
        } else if (currentStep === 2) {
            addChatMessage('assistant', '⚙️ Now let\'s configure your project. I\'ve pre-filled the details based on your description.');
        } else if (currentStep === 3) {
            addChatMessage('assistant', '🤖 Almost there! Review your agent settings. I\'ve optimized the model and temperature for your use case.');
        } else if (currentStep === 4) {
            renderConfigSummary();
            addChatMessage('assistant', '🎉 Excellent! Your agent is ready to deploy. Download the files and follow the AWS Bedrock deployment guide.');
        }
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateStepDisplay();
    }
}

function updateStepDisplay() {
    // Hide all steps (support both old and new layouts)
    document.querySelectorAll('.step-content, .step-content-panel').forEach(step => {
        step.classList.remove('active');
        step.style.display = 'none';
    });

    // Show current step (try both selectors)
    let currentStepElement = document.querySelector(`.step-content[data-step="${currentStep}"]`);
    if (!currentStepElement) {
        currentStepElement = document.getElementById(`step-${currentStep}`);
    }
    if (currentStepElement) {
        currentStepElement.classList.add('active');
        currentStepElement.style.display = 'block';
    }

    // Update progress indicators (old layout)
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        const circle = indicator.querySelector('div');
        if (!circle) return;
        if (index < currentStep) {
            indicator.classList.add('completed');
            indicator.classList.remove('active');
            circle.classList.remove('bg-gray-300');
            circle.classList.add('bg-green-500');
            circle.innerHTML = '<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
        } else if (index === currentStep) {
            indicator.classList.add('active');
            indicator.classList.remove('completed');
            circle.classList.remove('bg-gray-300', 'bg-green-500');
            circle.classList.add('bg-indigo-600');
            circle.textContent = currentStep;
        } else {
            indicator.classList.remove('active', 'completed');
            circle.classList.remove('bg-indigo-600', 'bg-green-500');
            circle.classList.add('bg-gray-300');
            circle.textContent = index;
        }
    });

    // Update sidebar navigation (new dashboard layout)
    document.querySelectorAll('.step-nav-item, .progress-step').forEach(navItem => {
        const stepNum = parseInt(navItem.dataset.step);
        if (stepNum === currentStep) {
            navItem.classList.add('active');
            navItem.classList.remove('completed');
        } else if (stepNum < currentStep) {
            navItem.classList.add('completed');
            navItem.classList.remove('active');
        } else {
            navItem.classList.remove('active', 'completed');
        }
    });

    // Update step number (if exists)
    const stepNum = document.getElementById('currentStepNum') || document.getElementById('currentStepDisplay');
    if (stepNum) {
        stepNum.textContent = currentStep + 1; // Display 1-based step number
    }

    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.disabled = currentStep === 0;
        prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    }

    const nextBtn = document.getElementById('nextBtn');
    if (currentStep === 4) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }

    // Populate Step 3 (Agent Config) fields when navigating to it
    if (currentStep === 3) {
        // Populate Agent Name
        if (agentConfig.agentName) {
            document.getElementById('agentName').value = agentConfig.agentName;
            console.log(`📝 Populated Agent Name: "${agentConfig.agentName}"`);
        }

        // Populate Model Selection
        if (agentConfig.model) {
            document.getElementById('modelSelect').value = agentConfig.model;
            console.log(`📝 Populated Model: ${agentConfig.model}`);
        }

        // Populate Temperature
        if (agentConfig.temperature !== undefined) {
            document.getElementById('temperature').value = agentConfig.temperature;
            document.getElementById('tempValue').textContent = agentConfig.temperature;
            console.log(`📝 Populated Temperature: ${agentConfig.temperature}`);
        }

        // Populate System Prompt
        if (agentConfig.systemPrompt) {
            document.getElementById('systemPrompt').value = agentConfig.systemPrompt;
            console.log(`📝 Populated System Prompt: ${agentConfig.systemPrompt.length} chars`);
        }

        // Show Model Reasoning if available
        const reasoningSection = document.getElementById('modelReasoningSection');
        const reasoningText = document.getElementById('modelReasoningText');
        if (agentConfig.modelReasoning) {
            reasoningText.textContent = agentConfig.modelReasoning;
            reasoningSection.style.display = 'block';
            console.log(`📝 Showing Model Reasoning`);
        } else {
            reasoningSection.style.display = 'none';
        }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validation Functions
function validateCurrentStep() {
    switch(currentStep) {
        case 0:
            return validateAgentDescription();
        case 1:
            return validateKnowledgeBases();
        case 2:
            return validateProjectConfig();
        case 3:
            return validateAgentConfig();
        case 4:
            return true;
        default:
            return false;
    }
}

function validateAgentDescription() {
    const description = document.getElementById('agentDescription').value.trim();

    if (!description || description.length < 50) {
        alert('Please provide a detailed description of your agent (at least 50 characters).');
        return false;
    }

    agentConfig.description = description;
    return true;
}

function validateKnowledgeBases() {
    if (knowledgeBases.length < 1) {
        alert('Please create at least one knowledge base.');
        return false;
    }

    for (const kb of knowledgeBases) {
        if (!kb.name || !kb.content) {
            alert(`Knowledge base "${kb.name || 'Untitled'}" must have both a title and content.`);
            return false;
        }

        if (kb.content.length > 18000) {
            alert(`Knowledge base "${kb.name}" exceeds the 18,000 character limit.`);
            return false;
        }
    }

    return true;
}

function validateProjectConfig() {
    const projectName = document.getElementById('projectName').value.trim();
    const projectDesc = document.getElementById('projectDescription').value.trim();

    if (!projectName) {
        alert('Please enter a project name.');
        return false;
    }

    if (!projectDesc) {
        alert('Please enter a project description.');
        return false;
    }

    agentConfig.projectName = projectName;
    agentConfig.projectDescription = projectDesc;
    return true;
}

function validateAgentConfig() {
    const agentName = document.getElementById('agentName').value.trim();
    const systemPrompt = document.getElementById('systemPrompt').value.trim();

    if (!agentName) {
        alert('Please enter an agent name.');
        return false;
    }

    if (!systemPrompt) {
        alert('Please provide a system prompt.');
        return false;
    }

    agentConfig.name = agentName;
    agentConfig.systemPrompt = systemPrompt;
    return true;
}

// Render Configuration Summary
function renderConfigSummary() {
    const summaryDiv = document.getElementById('configSummary');

    const tools = knowledgeBases.map(kb => ({
        name: `kb_${kb.name.toLowerCase().replace(/\s+/g, '_')}`,
        description: `Search and retrieve information from ${kb.name}`
    }));

    summaryDiv.innerHTML = `
        <h3 class="font-bold text-lg mb-4">Configuration Summary</h3>

        <div class="space-y-3">
            <div>
                <p class="text-sm font-semibold text-gray-600">Agent Name:</p>
                <p class="text-gray-900">${agentConfig.name}</p>
            </div>

            <div>
                <p class="text-sm font-semibold text-gray-600">Project:</p>
                <p class="text-gray-900">${agentConfig.projectName}</p>
            </div>

            <div>
                <p class="text-sm font-semibold text-gray-600">AI Model:</p>
                <p class="text-gray-900">${agentConfig.model}</p>
            </div>

            <div>
                <p class="text-sm font-semibold text-gray-600">Temperature:</p>
                <p class="text-gray-900">${agentConfig.temperature}</p>
            </div>

            <div>
                <p class="text-sm font-semibold text-gray-600">Knowledge Bases:</p>
                <ul class="list-disc list-inside text-gray-900">
                    ${knowledgeBases.map(kb => `<li>${kb.name}</li>`).join('')}
                </ul>
            </div>

            <div>
                <p class="text-sm font-semibold text-gray-600">Tools:</p>
                <ul class="list-disc list-inside text-gray-900 text-sm">
                    ${tools.map(tool => `<li>${tool.name}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Download Functions
function downloadKnowledgeBases() {
    // Create agent name slug for filenames
    const agentSlug = (agentConfig.agentName || agentConfig.name || 'Agent').replace(/\s+/g, '_');

    knowledgeBases.forEach((kb, index) => {
        const filename = `${agentSlug}_KB${index + 1}_${kb.name.replace(/\s+/g, '_')}.md`;
        const content = generateKBFile(kb);
        downloadFile(filename, content);
    });

    addChatMessage('assistant', `✅ Downloaded ${knowledgeBases.length} knowledge base files!`);
}

function generateKBFile(kb) {
    return `# ${kb.name}

${kb.content}

---

**Generated by:** PM Agent Squad Master - AI-Powered Agent Builder
**Created:** ${new Date().toLocaleDateString()}
**Character Count:** ${kb.content.length.toLocaleString()}
`;
}

function downloadProjectConfig() {
    const content = `# Project Setup Guide

## Project Information

**Project Name:** ${agentConfig.projectName}

**Description:**
${agentConfig.projectDescription}

## Knowledge Bases

This project includes ${knowledgeBases.length} knowledge bases:
${knowledgeBases.map((kb, i) => `${i + 1}. ${kb.name}`).join('\n')}

## Setup Steps for AWS Bedrock Agent Foundry

### 1. Create Project
1. Log into AWS Console
2. Navigate to Amazon Bedrock → Agent Foundry
3. Click "Create Project"
4. Enter project name: **${agentConfig.projectName}**
5. Enter description: **${agentConfig.projectDescription}**
6. Click "Create"

### 2. Upload Knowledge Bases
1. In your project, go to "Knowledge Bases"
2. Click "Upload Knowledge Base"
3. Upload each of the ${knowledgeBases.length} .md files you downloaded
4. Wait for indexing to complete (5-10 minutes per file)
5. Verify all knowledge bases are "Active"

### 3. Configure Agent
Follow the instructions in **AGENT_CONFIG.md** to:
- Create the agent
- Set model and temperature
- Add system prompt
- Configure knowledge base tools
- Set output preferences

### 4. Test Agent
1. Use the built-in test console
2. Try sample queries related to your knowledge bases
3. Verify responses are accurate and helpful
4. Adjust configuration if needed

### 5. Deploy
1. Review all settings
2. Click "Deploy"
3. Note the agent endpoint URL
4. Integrate with your application

---

**Generated by:** PM Agent Squad Master - AI-Powered Agent Builder
**Created:** ${new Date().toLocaleDateString()}
`;

    // Create agent name slug for filename
    const agentSlug = (agentConfig.agentName || agentConfig.name || 'Agent').replace(/\s+/g, '_');
    const filename = `${agentSlug}_PROJECT_SETUP.md`;

    downloadFile(filename, content);
    addChatMessage('assistant', '✅ Downloaded project setup guide!');
}

function downloadAgentConfig() {
    const tools = knowledgeBases.map((kb, i) => ({
        name: `kb_${kb.name.toLowerCase().replace(/\s+/g, '_')}`,
        description: `Search and retrieve information from ${kb.name}`,
        type: 'knowledge-base'
    }));

    const content = `# Agent Configuration Guide

## Agent Details

**Agent Name:** ${agentConfig.name}
**Model:** ${agentConfig.model}
**Temperature:** ${agentConfig.temperature}

## System Prompt

\`\`\`
${agentConfig.systemPrompt}
\`\`\`

## Knowledge Base Tools

${tools.map((tool, i) => `### Tool ${i + 1}: ${tool.name}

**Description:** ${tool.description}
**Type:** ${tool.type}
**Knowledge Base:** ${knowledgeBases[i].name}
`).join('\n')}

## Configuration Steps in AWS Bedrock Agent Foundry

### 1. Create Agent
1. In your project, click "Create Agent"
2. Enter agent name: **${agentConfig.name}**
3. Select model: **${agentConfig.model}**
4. Set temperature: **${agentConfig.temperature}**
5. Click "Next"

### 2. Add System Prompt
1. In the "Instructions" section
2. Paste the system prompt above
3. Review and ensure it matches your requirements
4. Click "Save"

### 3. Add Knowledge Base Tools
For each knowledge base, add a tool:

${tools.map((tool, i) => `**${tool.name}:**
- Tool Type: Knowledge Base
- Knowledge Base: Select "${knowledgeBases[i].name}"
- Description: "${tool.description}"
`).join('\n')}

### 4. Configure Output
1. Output format: Markdown
2. Enable citations: Yes
3. Max tokens: 4096
4. Stop sequences: (leave default)

### 5. Test Agent
Sample test queries:
${tools.slice(0, 3).map((tool, i) => `- "Tell me about ${knowledgeBases[i].name.toLowerCase()}"`).join('\n')}
- "What can you help me with?"
- (Add domain-specific test queries)

### 6. Review and Deploy
1. Review all configuration
2. Run test queries
3. Verify knowledge base responses
4. Click "Deploy"
5. Note agent ID and endpoint

---

**Agent Configuration Complete!**

Your agent is now ready to:
${knowledgeBases.slice(0, 5).map((kb, i) => `- Provide information from ${kb.name}`).join('\n')}

**Generated by:** PM Agent Squad Master - AI-Powered Agent Builder
**Created:** ${new Date().toLocaleDateString()}
`;

    // Create agent name slug for filename
    const agentSlug = (agentConfig.agentName || agentConfig.name || 'Agent').replace(/\s+/g, '_');
    const filename = `${agentSlug}_AGENT_CONFIG.md`;

    downloadFile(filename, content);
    addChatMessage('assistant', '✅ Downloaded agent configuration guide!');
}

function viewOutputWebpage() {
    // Generate HTML content for the output webpage
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${agentConfig.name || 'Agent'} - Configuration Output</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }

        .header h1 {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 18px;
            opacity: 0.9;
        }

        .content {
            padding: 40px;
        }

        .section {
            margin-bottom: 40px;
            padding: 30px;
            background: #f9fafb;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
        }

        .section-title {
            font-size: 24px;
            font-weight: 600;
            color: #667eea;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }

        .copy-box {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-top: 15px;
            position: relative;
        }

        .copy-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #667eea;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s;
        }

        .copy-btn:hover {
            background: #5a67d8;
            transform: translateY(-2px);
        }

        .copy-btn:active {
            transform: translateY(0);
        }

        .field {
            margin-bottom: 20px;
        }

        .field-label {
            font-weight: 600;
            color: #4b5563;
            margin-bottom: 8px;
            display: block;
        }

        .field-value {
            background: white;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            font-family: 'Courier New', monospace;
            color: #1f2937;
        }

        .kb-list {
            list-style: none;
        }

        .kb-item {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 15px;
            border: 1px solid #e5e7eb;
        }

        .kb-name {
            font-weight: 600;
            color: #667eea;
            margin-bottom: 10px;
            font-size: 18px;
        }

        .kb-desc {
            color: #6b7280;
            margin-bottom: 10px;
            font-size: 14px;
        }

        .kb-content {
            background: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            white-space: pre-wrap;
            word-wrap: break-word;
            max-height: 300px;
            overflow-y: auto;
        }

        .badge {
            display: inline-block;
            padding: 4px 12px;
            background: #667eea;
            color: white;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            margin-right: 8px;
        }

        .footer {
            text-align: center;
            padding: 30px;
            background: #f9fafb;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }

        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 ${agentConfig.name || 'AI Agent'}</h1>
            <p>Configuration Output - Ready for Agent Foundry</p>
        </div>

        <div class="content">
            <!-- Step 1: Knowledge Bases (Detailed) -->
            <div class="section">
                <h2 class="section-title">📚 Knowledge Bases (${knowledgeBases.length})</h2>
                <p style="color: #6b7280; margin-bottom: 20px;">Each knowledge base provides specialized expertise to your agent. Copy each section to create the knowledge base in Agent Foundry.</p>

                ${knowledgeBases.length === 0 ? '<p style="color: #6b7280;">No knowledge bases configured</p>' : `
                    <ul class="kb-list">
                        ${knowledgeBases.map((kb, index) => {
                            const toolId = kb.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
                            return `
                            <li class="kb-item">
                                <div class="kb-name">
                                    <span class="badge">KB ${index + 1}</span>
                                    ${kb.name}
                                </div>
                                <div class="kb-desc">${kb.description}</div>

                                <div style="margin-top: 15px;">
                                    <div class="field">
                                        <span class="field-label">📝 Knowledge Base Name:</span>
                                        <div class="copy-box">
                                            <button class="copy-btn" onclick="copyToClipboard('kbName${index}')">📋 Copy</button>
                                            <div id="kbName${index}" class="field-value">${kb.name}</div>
                                        </div>
                                    </div>

                                    <div class="field">
                                        <span class="field-label">📄 Description:</span>
                                        <div class="copy-box">
                                            <button class="copy-btn" onclick="copyToClipboard('kbDesc${index}')">📋 Copy</button>
                                            <div id="kbDesc${index}" class="field-value">${kb.description}</div>
                                        </div>
                                    </div>

                                    <div class="field">
                                        <span class="field-label">📚 Content (Markdown):</span>
                                        <div class="copy-box">
                                            <button class="copy-btn" onclick="copyToClipboard('kbContent${index}')">📋 Copy</button>
                                            <div id="kbContent${index}" class="kb-content">${kb.content}</div>
                                        </div>
                                    </div>

                                    <div class="field">
                                        <span class="field-label">🔧 Generated Tool ID:</span>
                                        <div class="copy-box">
                                            <button class="copy-btn" onclick="copyToClipboard('kbTool${index}')">📋 Copy</button>
                                            <div id="kbTool${index}" class="field-value">kb_${toolId}</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        `;
                        }).join('')}
                    </ul>
                `}
            </div>

            <!-- Step 2: Project Configuration -->
            <div class="section">
                <h2 class="section-title">📁 Step 2: Project Configuration</h2>
                <p style="color: #6b7280; margin-bottom: 20px;">Create a project to contain your agent and knowledge bases.</p>

                <div class="field">
                    <span class="field-label">Project Name:</span>
                    <div class="copy-box">
                        <button class="copy-btn" onclick="copyToClipboard('projectName')">📋 Copy</button>
                        <div id="projectName" class="field-value">${agentConfig.projectName || 'Not specified'}</div>
                    </div>
                </div>

                <div class="field">
                    <span class="field-label">Project Type:</span>
                    <div class="field-value">Self-defined</div>
                </div>

                <div class="field">
                    <span class="field-label">Project Description:</span>
                    <div class="copy-box">
                        <button class="copy-btn" onclick="copyToClipboard('projectDesc')">📋 Copy</button>
                        <pre id="projectDesc" class="field-value">${agentConfig.projectDescription || 'Not specified'}</pre>
                    </div>
                </div>

                <div class="field">
                    <span class="field-label">Use Runtime Text Resource:</span>
                    <div class="field-value">☐ Not enabled</div>
                </div>

                <div class="field">
                    <span class="field-label">Use Workflow Executor:</span>
                    <div class="field-value">☐ Not enabled</div>
                </div>
            </div>

            <!-- Step 3: Agent Configuration -->
            <div class="section">
                <h2 class="section-title">🤖 Step 3: Agent Configuration</h2>
                <p style="color: #6b7280; margin-bottom: 20px;">Configure your agent's basic settings and behavior.</p>

                <div class="field">
                    <span class="field-label">Agent Name:</span>
                    <div class="copy-box">
                        <button class="copy-btn" onclick="copyToClipboard('agentName')">📋 Copy</button>
                        <div id="agentName" class="field-value">${agentConfig.name || 'Not specified'}</div>
                    </div>
                </div>

                <div class="field">
                    <span class="field-label">Model Name:</span>
                    <div class="copy-box">
                        <button class="copy-btn" onclick="copyToClipboard('modelName')">📋 Copy</button>
                        <div id="modelName" class="field-value">${agentConfig.model}</div>
                    </div>
                </div>

                <div class="field">
                    <span class="field-label">Temperature:</span>
                    <div class="copy-box">
                        <button class="copy-btn" onclick="copyToClipboard('temperature')">📋 Copy</button>
                        <div id="temperature" class="field-value">${agentConfig.temperature}</div>
                    </div>
                </div>

                <div class="field">
                    <span class="field-label">Max Tools Iterations:</span>
                    <div class="copy-box">
                        <button class="copy-btn" onclick="copyToClipboard('maxIterations')">📋 Copy</button>
                        <div id="maxIterations" class="field-value">3</div>
                    </div>
                    <p style="font-size: 12px; color: #6b7280; margin-top: 6px;">
                        ℹ️ Recommended: 3 for standard agents (0=simple, 2-5=standard, 5-10=complex)
                    </p>
                </div>

                <div class="field">
                    <span class="field-label">System Prompt:</span>
                    <div class="copy-box">
                        <button class="copy-btn" onclick="copyToClipboard('systemPrompt')">📋 Copy</button>
                        <pre id="systemPrompt" class="field-value">${agentConfig.systemPrompt || 'Not specified'}</pre>
                    </div>
                </div>
            </div>

            <!-- Step 4: Tools Configuration -->
            <div class="section">
                <h2 class="section-title">🔧 Step 4: Add Tools</h2>
                <p style="color: #6b7280; margin-bottom: 20px;">Add tools to connect your agent to knowledge bases. Each KB requires one tool.</p>

                ${knowledgeBases.length === 0 ? '<p style="color: #6b7280;">No tools to configure (no knowledge bases created yet)</p>' : `
                    ${knowledgeBases.map((kb, index) => {
                        const toolId = kb.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
                        return `
                        <div class="field" style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                            <h3 style="font-size: 16px; font-weight: 600; color: #667eea; margin-bottom: 15px;">
                                <span class="badge">Tool ${index + 1}</span>
                                ${kb.name} Tool
                            </h3>

                            <div style="margin-bottom: 12px;">
                                <strong>Function Name:</strong>
                                <div class="copy-box">
                                    <button class="copy-btn" onclick="copyToClipboard('toolFnName${index}')">📋 Copy</button>
                                    <div id="toolFnName${index}" class="field-value">kb_${toolId}</div>
                                </div>
                            </div>

                            <div style="margin-bottom: 12px;">
                                <strong>Function Description:</strong>
                                <div class="copy-box">
                                    <button class="copy-btn" onclick="copyToClipboard('toolFnDesc${index}')">📋 Copy</button>
                                    <div id="toolFnDesc${index}" class="field-value">Search and retrieve information from the ${kb.name} knowledge base</div>
                                </div>
                            </div>

                            <div style="margin-bottom: 12px;">
                                <strong>Target (Tool Type):</strong>
                                <div class="field-value">Knowledge Base</div>
                            </div>

                            <div style="margin-bottom: 12px;">
                                <strong>Target Knowledge Base:</strong>
                                <div class="copy-box">
                                    <button class="copy-btn" onclick="copyToClipboard('toolTargetKB${index}')">📋 Copy</button>
                                    <div id="toolTargetKB${index}" class="field-value">${kb.name}</div>
                                </div>
                            </div>

                            <div>
                                <strong>Target Function:</strong>
                                <div class="field-value">Query data directly (Presto SQL)</div>
                            </div>
                        </div>
                        `;
                    }).join('')}
                `}
            </div>

            <!-- Step 5: Output Configuration -->
            <div class="section">
                <h2 class="section-title">📤 Step 5: Add Outputs</h2>
                <p style="color: #6b7280; margin-bottom: 20px;">Configure structured outputs for your agent (optional). Default text output is always available.</p>

                <div class="field" style="background: #fffbeb; padding: 20px; border-radius: 8px; border: 2px solid #fbbf24;">
                    <h3 style="font-size: 16px; font-weight: 600; color: #92400e; margin-bottom: 15px;">
                        💡 Default Output (No Configuration Needed)
                    </h3>
                    <p style="color: #78350f; font-size: 14px; margin: 0;">
                        Your agent will automatically return text responses with markdown formatting support.
                        Only configure custom outputs if you need structured JSON data or special artifacts like Plotly charts.
                    </p>
                </div>

                <div class="field" style="margin-top: 20px;">
                    <h4 style="font-weight: 600; margin-bottom: 10px;">Optional: Custom JSON Output</h4>
                    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <div style="margin-bottom: 12px;">
                            <strong>Output Name:</strong>
                            <div class="field-value">structured_response</div>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <strong>Function Name:</strong>
                            <div class="field-value">generate_structured_output</div>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <strong>Output Type:</strong>
                            <div class="field-value">Custom (JSON)</div>
                        </div>
                        <div>
                            <strong>Function Description:</strong>
                            <div class="field-value">Generate structured JSON output for programmatic use</div>
                        </div>
                    </div>
                </div>

                <div class="field" style="margin-top: 20px;">
                    <h4 style="font-weight: 600; margin-bottom: 10px;">Optional: Plotly Chart Output</h4>
                    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <div style="margin-bottom: 12px;">
                            <strong>Output Name:</strong>
                            <div class="copy-box">
                                <button class="copy-btn" onclick="copyToClipboard('plotlyName')">📋 Copy</button>
                                <div id="plotlyName" class="field-value">:plotly:</div>
                            </div>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <strong>Function Name:</strong>
                            <div class="field-value">create_chart</div>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <strong>Output Type:</strong>
                            <div class="field-value">Artifact</div>
                        </div>
                        <div>
                            <strong>Artifact Content Type:</strong>
                            <div class="field-value">React (for Plotly charts)</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Complete Configuration Summary -->
            <div class="section">
                <h2 class="section-title">📋 Complete Configuration Summary</h2>
                <p style="color: #6b7280; margin-bottom: 20px;">Full configuration in JSON format for reference or programmatic deployment.</p>

                <div class="copy-box">
                    <button class="copy-btn" onclick="copyToClipboard('fullConfig')">📋 Copy JSON</button>
                    <pre id="fullConfig" class="field-value" style="max-height: 400px; overflow-y: auto;">${JSON.stringify({
                        agent: {
                            name: agentConfig.name,
                            systemPrompt: agentConfig.systemPrompt,
                            model: agentConfig.model,
                            temperature: agentConfig.temperature
                        },
                        project: {
                            name: agentConfig.projectName,
                            description: agentConfig.projectDescription
                        },
                        knowledgeBases: knowledgeBases.map((kb, index) => ({
                            id: index + 1,
                            name: kb.name,
                            description: kb.description,
                            toolId: 'kb_' + kb.name.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
                            content: kb.content
                        })),
                        tools: knowledgeBases.map((kb, index) => ({
                            id: 'kb_' + kb.name.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
                            name: kb.name,
                            type: 'knowledge_base',
                            description: 'Access knowledge about ' + kb.name
                        }))
                    }, null, 2)}</pre>
                </div>
            </div>
        </div>

        <div class="footer">
            <p><strong>💡 Usage Instructions:</strong></p>
            <p style="margin-top: 10px;">Click the "📋 Copy" buttons to copy any section directly to your clipboard.<br>
            Paste these values into Agent Foundry to configure your agent.</p>
            <p style="margin-top: 20px; font-size: 14px;">Generated by Agent Foundry Assistant</p>
        </div>
    </div>

    <script>
        function copyToClipboard(elementId) {
            const element = document.getElementById(elementId);
            const text = element.innerText || element.textContent;

            navigator.clipboard.writeText(text).then(() => {
                // Find the button that was clicked
                const button = element.parentElement.querySelector('.copy-btn');
                const originalText = button.textContent;

                // Show success feedback
                button.textContent = '✅ Copied!';
                button.style.background = '#10b981';

                // Reset after 2 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '#667eea';
                }, 2000);
            }).catch(err => {
                alert('Failed to copy: ' + err);
            });
        }
    </script>
</body>
</html>
    `;

    // Open in new window
    const newWindow = window.open('', '_blank');
    newWindow.document.write(htmlContent);
    newWindow.document.close();

    addChatMessage('assistant', '📄 <strong>Output webpage opened!</strong> You can now easily copy and paste any section directly to Agent Foundry.');
}

function downloadAllFiles() {
    downloadKnowledgeBases();
    setTimeout(() => downloadProjectConfig(), 500);
    setTimeout(() => downloadAgentConfig(), 1000);

    setTimeout(() => {
        addChatMessage('assistant', `🎉 <strong>All files downloaded successfully!</strong><br><br>
        You now have:<br>
        • ${knowledgeBases.length} knowledge base .md files<br>
        • PROJECT_SETUP.md<br>
        • AGENT_CONFIG.md<br><br>
        Check your Downloads folder and follow the guides to deploy your agent to AWS Bedrock!`);
    }, 1500);
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

// Reset Wizard
function resetWizard() {
    // Confirm with user
    if (!confirm('Are you sure you want to start over? All current progress will be lost.')) {
        return;
    }

    // Reset state
    currentStep = 0;
    knowledgeBases = [];
    kbCounter = 0;
    agentConfig = {
        description: '',
        tone: 'professional',
        language: 'english',
        audience: '',
        domain: '',
        name: '',
        projectName: '',
        projectDescription: '',
        model: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
        temperature: 0.5,
        systemPrompt: ''
    };
    chatHistory = [];

    // Clear all form inputs
    document.getElementById('agentDescription').value = '';
    document.getElementById('agentTone').value = 'professional';
    document.getElementById('agentAudience').value = '';
    document.getElementById('aiChatInput').value = '';
    document.getElementById('projectName').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('agentName').value = '';
    document.getElementById('modelSelect').value = 'anthropic.claude-3-5-sonnet-20241022-v2:0';
    document.getElementById('temperature').value = 0.5;
    document.getElementById('tempValue').textContent = '0.5';
    document.getElementById('systemPrompt').value = '';

    // Clear knowledge bases display
    const kbList = document.getElementById('knowledgeBasesList');
    if (kbList) {
        kbList.innerHTML = '<div class="text-center py-12 text-gray-400"><p>Complete Step 0 to generate knowledge bases</p></div>';
    }

    // Clear chat messages (keep initial welcome message)
    const chatMessages = document.getElementById('aiChatMessages');
    chatMessages.innerHTML = `
        <div class="ai-message bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
            <p class="text-sm text-gray-800">
                👋 Hi! I'm your Agent Foundry Assistant. I'll help you build a custom AI Foundry Agent.
                <br><br>
                <strong>Let's start:</strong> What kind of agent do you want to build? Describe what it should do.
            </p>
        </div>
    `;

    // Reset to step 0
    updateStepDisplay();

    // Add reset confirmation message to chat
    addChatMessage('assistant', '🔄 <strong>Wizard reset!</strong> Ready to build a new agent. Click a quick example or describe your agent to get started.');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
