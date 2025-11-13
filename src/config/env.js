/**
 * Environment Configuration
 * Manages environment variables and provides type-safe access
 */

const env = {
  // Amazon Bedrock Configuration
  bedrock: {
    agentId: import.meta.env.VITE_BEDROCK_AGENT_ID || '',
    agentAliasId: import.meta.env.VITE_BEDROCK_AGENT_ALIAS_ID || '',
    region: import.meta.env.VITE_BEDROCK_REGION || 'us-east-1',
    endpoint: import.meta.env.VITE_BEDROCK_ENDPOINT || '',
  },

  // Application Configuration
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'PM Agent Squad Master',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'AI-powered agent assistant',
    version: import.meta.env.VITE_APP_VERSION || '2.0.0',
    environment: import.meta.env.VITE_ENVIRONMENT || 'development',
  },

  // Deployment Configuration
  deployment: {
    url: import.meta.env.VITE_DEPLOYMENT_URL || 'http://localhost:5173',
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  },

  // Analytics & Monitoring
  analytics: {
    gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || '',
    sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
    endpoint: import.meta.env.VITE_ANALYTICS_ENDPOINT || '',
  },

  // Feature Flags
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
    multiAgent: import.meta.env.VITE_ENABLE_MULTI_AGENT === 'true',
    plugins: import.meta.env.VITE_ENABLE_PLUGINS === 'true',
  },

  // UI Customization
  ui: {
    primaryColor: import.meta.env.VITE_PRIMARY_COLOR || '#6366f1',
    secondaryColor: import.meta.env.VITE_SECONDARY_COLOR || '#8b5cf6',
    accentColor: import.meta.env.VITE_ACCENT_COLOR || '#ec4899',
  },

  // Performance & Limits
  limits: {
    maxMessageLength: parseInt(import.meta.env.VITE_MAX_MESSAGE_LENGTH || '5000', 10),
    maxConversationHistory: parseInt(import.meta.env.VITE_MAX_CONVERSATION_HISTORY || '50', 10),
    requestTimeout: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT || '30000', 10),
  },

  // Security
  security: {
    allowedOrigins: (import.meta.env.VITE_ALLOWED_ORIGINS || '').split(',').filter(Boolean),
    enableAuth: import.meta.env.VITE_ENABLE_AUTH === 'true',
    authProvider: import.meta.env.VITE_AUTH_PROVIDER || '',
  },

  // Plugins
  plugins: {
    enabled: (import.meta.env.VITE_ENABLED_PLUGINS || '').split(',').filter(Boolean),
    slackWebhook: import.meta.env.VITE_SLACK_WEBHOOK_URL || '',
    teamsWebhook: import.meta.env.VITE_TEAMS_WEBHOOK_URL || '',
  },

  // Development & Testing
  dev: {
    mockBedrock: import.meta.env.VITE_MOCK_BEDROCK === 'true',
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
    testMode: import.meta.env.VITE_TEST_MODE === 'true',
  },

  // Multi-Agent Configuration
  multiAgent: {
    defaultAgentId: import.meta.env.VITE_DEFAULT_AGENT_ID || '',
    configPath: import.meta.env.VITE_AGENTS_CONFIG_PATH || './agents.config.json',
  },
};

/**
 * Validates required environment variables
 * @returns {Object} Validation result
 */
export function validateEnv() {
  const errors = [];
  const warnings = [];

  // Check required variables in production
  if (env.app.environment === 'production') {
    if (!env.bedrock.agentId) {
      errors.push('VITE_BEDROCK_AGENT_ID is required in production');
    }
    if (!env.bedrock.agentAliasId) {
      errors.push('VITE_BEDROCK_AGENT_ALIAS_ID is required in production');
    }
    if (!env.deployment.url || env.deployment.url.includes('localhost')) {
      warnings.push('VITE_DEPLOYMENT_URL should be set to production URL');
    }
  }

  // Check for mock mode in production
  if (env.app.environment === 'production' && env.dev.mockBedrock) {
    errors.push('Mock Bedrock mode should not be enabled in production');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Logs environment configuration (redacting sensitive data)
 */
export function logEnvConfig() {
  if (!env.features.debugMode) return;

  console.log('🔧 Environment Configuration:', {
    environment: env.app.environment,
    version: env.app.version,
    features: env.features,
    deploymentUrl: env.deployment.url,
    bedrockRegion: env.bedrock.region,
    // Don't log sensitive data like API keys
  });
}

/**
 * Gets environment variable with fallback
 * @param {string} key - Environment variable key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Environment variable value or default
 */
export function getEnv(key, defaultValue = '') {
  return import.meta.env[key] || defaultValue;
}

/**
 * Checks if running in development mode
 * @returns {boolean}
 */
export function isDevelopment() {
  return env.app.environment === 'development';
}

/**
 * Checks if running in production mode
 * @returns {boolean}
 */
export function isProduction() {
  return env.app.environment === 'production';
}

/**
 * Checks if running in staging mode
 * @returns {boolean}
 */
export function isStaging() {
  return env.app.environment === 'staging';
}

export default env;
