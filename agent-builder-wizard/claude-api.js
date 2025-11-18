/**
 * Claude API Integration for Agent Builder Wizard
 * This module handles live API calls to Anthropic's Claude API
 */

class ClaudeAPI {
    constructor() {
        this.apiKey = null;

        // Auto-detect environment and set API URL
        // Use config-helper.js if available, otherwise default to localhost
        if (typeof configHelper !== 'undefined') {
            this.apiUrl = configHelper.getApiUrl() || 'http://localhost:3333/chat';
            this.environment = configHelper.environment;
        } else {
            this.apiUrl = 'http://localhost:3333/chat';
            this.environment = 'local';
        }

        this.model = 'claude-3-5-sonnet-20241022';
        this.maxTokens = 2048;

        console.log(`🌐 Claude API initialized for ${this.environment} environment`);
        console.log(`📡 API URL: ${this.apiUrl}`);
    }

    /**
     * Set the API key for authentication
     * @param {string} key - Anthropic API key
     */
    setApiKey(key) {
        this.apiKey = key;
        // Store in sessionStorage (cleared when browser closes)
        if (key) {
            sessionStorage.setItem('anthropic_api_key', key);
        } else {
            sessionStorage.removeItem('anthropic_api_key');
        }
    }

    /**
     * Get stored API key from sessionStorage
     * @returns {string|null}
     */
    getApiKey() {
        if (!this.apiKey) {
            this.apiKey = sessionStorage.getItem('anthropic_api_key');
        }
        return this.apiKey;
    }

    /**
     * Check if API key is configured
     * @returns {boolean}
     */
    hasApiKey() {
        // If using localhost, no API key needed
        if (this.apiUrl.includes('localhost') || this.apiUrl.includes('127.0.0.1')) {
            return true;
        }
        return !!this.getApiKey();
    }

    /**
     * Send a message to Claude and get a streaming response
     * @param {string} userMessage - The user's message
     * @param {Array} conversationHistory - Previous messages for context
     * @param {Function} onChunk - Callback for streaming chunks
     * @param {AbortSignal} signal - Optional abort signal
     * @returns {Promise<string>} - Full response text
     */
    async sendMessage(userMessage, conversationHistory = [], onChunk = null, signal = null) {
        // Check if using localhost (no API key needed)
        const isLocalhost = this.apiUrl.includes('localhost') || this.apiUrl.includes('127.0.0.1');

        if (!isLocalhost) {
            const apiKey = this.getApiKey();
            if (!apiKey) {
                throw new Error('API key not configured. Please set your Anthropic API key first.');
            }
        }

        // If using localhost, use simple fetch
        if (isLocalhost) {
            console.log('🌐 Calling localhost proxy:', this.apiUrl);
            console.log('📨 Message:', userMessage);

            try {
                const fetchOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: userMessage,
                        history: conversationHistory
                    })
                };

                // Add abort signal if provided
                if (signal) {
                    fetchOptions.signal = signal;
                }

                const response = await fetch(this.apiUrl, fetchOptions);

                console.log('📡 Response status:', response.status);

                if (!response.ok) {
                    throw new Error(`Localhost proxy error: ${response.status}`);
                }

                const data = await response.json();
                console.log('✅ Received from localhost:', data.response.substring(0, 100) + '...');
                return data.response;
            } catch (error) {
                console.error('❌ Localhost API Error:', error);
                throw error;
            }
        }

        // Original Anthropic API code for non-localhost
        const apiKey = this.getApiKey();

        // Build system prompt for agent building context
        const systemPrompt = `You are an expert AI assistant helping users build custom AI agents for Treasure Data's AI Agent Foundry.

Your role is to:
- Analyze the user's requirements for their agent
- Suggest appropriate knowledge bases (topics and content areas)
- Recommend optimal AI model settings (model choice, temperature)
- Provide strategic guidance on agent configuration
- Keep responses concise, helpful, and actionable

When the user describes what they want their agent to do:
1. Identify the domain/industry (marketing, HR, support, IT, sales, etc.)
2. Suggest 4-5 specific knowledge base topics
3. Recommend the best AI model and temperature setting
4. Encourage them to use the "Auto-Generate" button

Be encouraging, professional, and focus on practical agent-building advice.`;

        // Build messages array with conversation history
        const messages = [];

        // Add conversation history
        conversationHistory.forEach(msg => {
            messages.push({
                role: msg.role,
                content: msg.content
            });
        });

        // Add current user message
        messages.push({
            role: 'user',
            content: userMessage
        });

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: this.model,
                    max_tokens: this.maxTokens,
                    system: systemPrompt,
                    messages: messages,
                    stream: !!onChunk // Enable streaming if callback provided
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
            }

            // Handle streaming response
            if (onChunk) {
                return await this.handleStreamingResponse(response, onChunk);
            }

            // Handle non-streaming response
            const data = await response.json();
            return data.content[0].text;

        } catch (error) {
            console.error('Claude API Error:', error);
            throw error;
        }
    }

    /**
     * Handle streaming response from Claude API
     * @param {Response} response - Fetch response object
     * @param {Function} onChunk - Callback for each chunk
     * @returns {Promise<string>} - Full response text
     */
    async handleStreamingResponse(response, onChunk) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);

                            // Handle different event types
                            if (parsed.type === 'content_block_delta') {
                                const text = parsed.delta?.text || '';
                                fullText += text;
                                onChunk(text, fullText);
                            }
                        } catch (e) {
                            // Skip invalid JSON
                        }
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }

        return fullText;
    }

    /**
     * Generate knowledge base suggestions based on agent description
     * @param {string} agentDescription - Description of the agent
     * @param {string} domain - Domain/industry (marketing, hr, support, etc.)
     * @returns {Promise<Array>} - Array of knowledge base objects
     */
    async generateKnowledgeBases(agentDescription, domain) {
        const prompt = `Based on this agent description:
"${agentDescription}"

Domain: ${domain}

Generate 4-5 specific knowledge base topics that would be essential for this agent. For each knowledge base, provide:
1. A clear, concise name (3-5 words)
2. A brief description (1-2 sentences)
3. Sample content outline (3-5 bullet points of what this KB should contain)

Format your response as a JSON array of objects with keys: name, description, contentOutline (array of strings).

Example format:
[
  {
    "name": "Campaign Planning Fundamentals",
    "description": "Core concepts and frameworks for planning marketing campaigns",
    "contentOutline": ["Campaign objectives and KPIs", "Target audience definition", "Channel selection criteria", "Budget allocation frameworks", "Timeline planning"]
  }
]`;

        try {
            const response = await this.sendMessage(prompt);

            // Extract JSON from response (Claude might wrap it in markdown code blocks)
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            throw new Error('Could not parse knowledge base suggestions from response');
        } catch (error) {
            console.error('Error generating knowledge bases:', error);
            // Return fallback suggestions
            return this.getFallbackKnowledgeBases(domain);
        }
    }

    /**
     * Get fallback knowledge bases if API call fails
     * @param {string} domain
     * @returns {Array}
     */
    getFallbackKnowledgeBases(domain) {
        const fallbacks = {
            marketing: [
                {
                    name: "Campaign Strategy Guide",
                    description: "Frameworks and best practices for planning marketing campaigns",
                    contentOutline: ["Campaign objectives", "Audience targeting", "Channel selection", "Budget allocation", "KPI definition"]
                },
                {
                    name: "Platform Best Practices",
                    description: "Specific guidance for Meta, Google, TikTok, and Pinterest advertising",
                    contentOutline: ["Platform features", "Ad formats", "Targeting options", "Bidding strategies", "Creative specs"]
                },
                {
                    name: "Performance Analytics",
                    description: "Metrics, measurement, and optimization techniques",
                    contentOutline: ["Key metrics", "Attribution models", "A/B testing", "Optimization tactics", "Reporting frameworks"]
                }
            ],
            hr: [
                {
                    name: "HR Policies & Procedures",
                    description: "Company policies, guidelines, and standard procedures",
                    contentOutline: ["Employee handbook", "Code of conduct", "Leave policies", "Performance reviews", "Compliance requirements"]
                },
                {
                    name: "Benefits Information",
                    description: "Employee benefits, enrollment, and usage guides",
                    contentOutline: ["Health insurance", "Retirement plans", "Paid time off", "Additional benefits", "Enrollment process"]
                }
            ],
            support: [
                {
                    name: "Product Documentation",
                    description: "Comprehensive product guides and feature documentation",
                    contentOutline: ["Feature guides", "Getting started", "Advanced usage", "Integration guides", "API documentation"]
                },
                {
                    name: "Troubleshooting Guide",
                    description: "Common issues and step-by-step resolution procedures",
                    contentOutline: ["Common errors", "Diagnostic steps", "Solution procedures", "Workarounds", "Escalation criteria"]
                }
            ]
        };

        return fallbacks[domain] || fallbacks.marketing;
    }

    /**
     * Generate system prompt based on agent configuration
     * @param {Object} config - Agent configuration
     * @returns {Promise<string>}
     */
    async generateSystemPrompt(config) {
        const prompt = `Create a detailed system prompt for an AI agent with these specifications:

Domain: ${config.domain}
Description: ${config.description}
Tone: ${config.tone || 'professional'}
Target Audience: ${config.audience || 'general users'}

The system prompt should:
- Clearly define the agent's role and expertise
- List key responsibilities and capabilities
- Provide operational guidelines
- Set the appropriate tone and communication style
- Include any domain-specific best practices

Write a comprehensive system prompt (200-300 words) that would be used to configure this agent.`;

        try {
            return await this.sendMessage(prompt);
        } catch (error) {
            console.error('Error generating system prompt:', error);
            // Return a basic fallback
            return `You are an expert ${config.domain} assistant. Help users with ${config.description}.`;
        }
    }
}

// Export singleton instance
const claudeAPI = new ClaudeAPI();
