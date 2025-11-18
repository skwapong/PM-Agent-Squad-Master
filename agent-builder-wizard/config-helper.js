/**
 * Configuration Helper for Enterprise Deployments
 * Auto-detects environment and configures API endpoints accordingly
 */

class ConfigHelper {
    constructor() {
        this.environment = this.detectEnvironment();
        this.config = this.getConfig();
    }

    /**
     * Detect the current environment
     */
    detectEnvironment() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;

        // Local development
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'local';
        }

        // Treasure Data internal
        if (hostname.includes('.treasuredata.com') ||
            hostname.includes('.td.internal') ||
            hostname.includes('.treasure-data.com')) {
            return 'td-internal';
        }

        // Vercel deployment
        if (hostname.includes('.vercel.app')) {
            return 'vercel';
        }

        // CloudFlare
        if (hostname.includes('.pages.dev') || hostname.includes('.workers.dev')) {
            return 'cloudflare';
        }

        // AWS
        if (hostname.includes('.amazonaws.com') || hostname.includes('.cloudfront.net')) {
            return 'aws';
        }

        // Generic cloud
        return 'cloud';
    }

    /**
     * Get configuration based on environment
     */
    getConfig() {
        const configs = {
            local: {
                apiUrl: 'http://localhost:3333/chat',
                authType: 'none',
                corsMode: 'no-cors',
                features: {
                    aiAssistant: true,
                    autoGenerate: true,
                    templates: true
                }
            },

            'td-internal': {
                // TD employees using internal infrastructure
                apiUrl: 'https://ai-api.treasuredata.com/agent-builder/chat',
                // Or: 'https://agent-foundry-api.td.internal/chat'
                authType: 'sso',
                corsMode: 'cors',
                ssoRedirect: '/sso/login',
                features: {
                    aiAssistant: true,
                    autoGenerate: true,
                    templates: true,
                    enterpriseIntegration: true
                }
            },

            vercel: {
                // Vercel deployment with serverless function
                apiUrl: `${window.location.origin}/api/chat`,
                authType: 'api-key',
                corsMode: 'cors',
                features: {
                    aiAssistant: true,
                    autoGenerate: true,
                    templates: true
                }
            },

            cloudflare: {
                // Cloudflare Workers
                apiUrl: 'https://agent-proxy.your-subdomain.workers.dev',
                authType: 'api-key',
                corsMode: 'cors',
                features: {
                    aiAssistant: true,
                    autoGenerate: true,
                    templates: true
                }
            },

            aws: {
                // AWS Lambda + API Gateway
                apiUrl: 'https://[api-id].execute-api.us-east-1.amazonaws.com/chat',
                authType: 'api-key',
                corsMode: 'cors',
                features: {
                    aiAssistant: true,
                    autoGenerate: true,
                    templates: true
                }
            },

            cloud: {
                // Generic cloud hosting (demo mode)
                apiUrl: null,
                authType: 'none',
                corsMode: 'cors',
                features: {
                    aiAssistant: false, // Disabled in demo mode
                    autoGenerate: false,
                    templates: true // Templates work offline
                }
            }
        };

        return configs[this.environment] || configs.cloud;
    }

    /**
     * Get API URL for current environment
     */
    getApiUrl() {
        return this.config.apiUrl;
    }

    /**
     * Check if AI features are enabled
     */
    isAIEnabled() {
        return this.config.features.aiAssistant;
    }

    /**
     * Get authentication type
     */
    getAuthType() {
        return this.config.authType;
    }

    /**
     * Check if SSO login is required
     */
    requiresSSO() {
        return this.config.authType === 'sso';
    }

    /**
     * Get SSO login URL
     */
    getSSOLoginUrl() {
        if (!this.config.ssoRedirect) return null;

        const redirectUrl = encodeURIComponent(window.location.href);
        return `${this.config.ssoRedirect}?redirect=${redirectUrl}`;
    }

    /**
     * Check if user has valid auth
     */
    async checkAuth() {
        if (this.config.authType === 'none') {
            return true; // No auth required
        }

        if (this.config.authType === 'sso') {
            // Check SSO session
            try {
                const response = await fetch('/api/auth/check', {
                    credentials: 'include'
                });
                return response.ok;
            } catch (error) {
                return false;
            }
        }

        if (this.config.authType === 'api-key') {
            // Check if API key is configured (for external deployment)
            const apiKey = sessionStorage.getItem('anthropic_api_key');
            return !!apiKey;
        }

        return false;
    }

    /**
     * Redirect to SSO login if needed
     */
    redirectToSSOIfNeeded() {
        if (this.requiresSSO()) {
            const loginUrl = this.getSSOLoginUrl();
            if (loginUrl) {
                console.log('🔐 Redirecting to SSO login...');
                window.location.href = loginUrl;
            }
        }
    }

    /**
     * Get user info (for enterprise)
     */
    getUserInfo() {
        // Try to get from session/cookie
        const userInfo = {
            email: this.getCookie('user_email'),
            name: this.getCookie('user_name'),
            department: this.getCookie('user_department')
        };

        // Try sessionStorage
        if (!userInfo.email) {
            const stored = sessionStorage.getItem('user_info');
            if (stored) {
                return JSON.parse(stored);
            }
        }

        return userInfo;
    }

    /**
     * Helper to get cookie value
     */
    getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }

    /**
     * Log configuration info
     */
    logConfig() {
        console.log('🔧 Configuration Helper Initialized');
        console.log('📍 Environment:', this.environment);
        console.log('🌐 API URL:', this.config.apiUrl || 'Not configured');
        console.log('🔐 Auth Type:', this.config.authType);
        console.log('✨ AI Features:', this.config.features.aiAssistant ? 'Enabled' : 'Disabled');

        if (this.environment === 'td-internal') {
            const user = this.getUserInfo();
            if (user.email) {
                console.log('👤 User:', user.email);
            }
        }
    }

    /**
     * Show environment banner to user
     */
    showEnvironmentBanner() {
        const banners = {
            local: {
                text: '🛠️ Local Development Mode',
                color: 'blue',
                details: 'Using localhost:3333 proxy'
            },
            'td-internal': {
                text: '🏢 Treasure Data Internal',
                color: 'green',
                details: 'Connected to TD infrastructure'
            },
            vercel: {
                text: '☁️ Cloud Deployment',
                color: 'purple',
                details: 'Using Vercel serverless functions'
            },
            cloud: {
                text: '📋 Demo Mode',
                color: 'amber',
                details: 'AI features disabled - templates only'
            }
        };

        const banner = banners[this.environment] || banners.cloud;

        const bannerHTML = `
            <div class="fixed top-0 left-0 right-0 bg-${banner.color}-100 border-b border-${banner.color}-300 px-4 py-2 z-50">
                <div class="max-w-7xl mx-auto flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="text-sm font-semibold text-${banner.color}-900">${banner.text}</span>
                        <span class="text-xs text-${banner.color}-700">${banner.details}</span>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="text-${banner.color}-600 hover:text-${banner.color}-900">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Only show in development/demo environments
        if (this.environment === 'local' || this.environment === 'cloud') {
            document.body.insertAdjacentHTML('afterbegin', bannerHTML);
        }
    }
}

// Export singleton instance
const configHelper = new ConfigHelper();

// Log on load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        configHelper.logConfig();
        // Uncomment to show banner:
        // configHelper.showEnvironmentBanner();
    });
}
