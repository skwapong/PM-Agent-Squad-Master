/**
 * Multi-Agent Configuration Manager
 * Handles loading and managing multiple agent configurations
 */

import env from './env.js';

/**
 * Load agents configuration
 * @returns {Promise<Object>} Agents configuration
 */
export async function loadAgentsConfig() {
  try {
    const configPath = env.multiAgent.configPath || './agents.config.json';
    const response = await fetch(configPath);

    if (!response.ok) {
      throw new Error(`Failed to load agents config: ${response.statusText}`);
    }

    const config = await response.json();
    return config;
  } catch (error) {
    console.error('Error loading agents config:', error);
    // Return default single-agent config
    return {
      multiAgentEnabled: false,
      defaultAgentId: 'default',
      agents: [],
    };
  }
}

/**
 * Get agent by ID
 * @param {string} agentId - Agent ID
 * @returns {Promise<Object|null>} Agent configuration
 */
export async function getAgentById(agentId) {
  const config = await loadAgentsConfig();
  return config.agents.find(agent => agent.id === agentId) || null;
}

/**
 * Get default agent
 * @returns {Promise<Object|null>} Default agent configuration
 */
export async function getDefaultAgent() {
  const config = await loadAgentsConfig();
  const defaultId = config.defaultAgentId;
  return getAgentById(defaultId);
}

/**
 * Get all enabled agents
 * @returns {Promise<Array>} List of enabled agents
 */
export async function getEnabledAgents() {
  const config = await loadAgentsConfig();
  return config.agents.filter(agent => agent.enabled !== false);
}

/**
 * Check if multi-agent mode is enabled
 * @returns {Promise<boolean>}
 */
export async function isMultiAgentEnabled() {
  const config = await loadAgentsConfig();
  return config.multiAgentEnabled === true && config.agents.length > 1;
}

/**
 * Get agent by route path
 * @param {string} path - Route path
 * @returns {Promise<Object|null>} Agent configuration
 */
export async function getAgentByRoute(path) {
  const config = await loadAgentsConfig();

  for (const agent of config.agents) {
    if (agent.route && path.startsWith(agent.route)) {
      return agent;
    }
  }

  // Return default agent if no match
  return getDefaultAgent();
}

/**
 * Load agent-specific configuration
 * @param {string} agentId - Agent ID
 * @returns {Promise<Object>} Agent configuration
 */
export async function loadAgentConfig(agentId) {
  const agent = await getAgentById(agentId);

  if (!agent) {
    throw new Error(`Agent not found: ${agentId}`);
  }

  // If agent has a specific config file, load it
  if (agent.configFile) {
    try {
      const response = await fetch(agent.configFile);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn(`Failed to load config for agent ${agentId}:`, error);
    }
  }

  // Return agent config from agents.config.json
  return agent;
}

/**
 * Switch to a different agent
 * @param {string} agentId - Target agent ID
 * @returns {Promise<void>}
 */
export async function switchAgent(agentId) {
  const agent = await getAgentById(agentId);

  if (!agent) {
    throw new Error(`Agent not found: ${agentId}`);
  }

  // Update URL if routing is enabled
  const config = await loadAgentsConfig();
  if (config.routing?.mode === 'path' && agent.route) {
    window.location.href = agent.route;
  }

  // Dispatch event for agent switch
  window.dispatchEvent(new CustomEvent('agentSwitch', {
    detail: { agentId, agent },
  }));
}

/**
 * Get current agent from URL
 * @returns {Promise<Object>} Current agent
 */
export async function getCurrentAgent() {
  const path = window.location.pathname;
  return await getAgentByRoute(path);
}

export default {
  loadAgentsConfig,
  getAgentById,
  getDefaultAgent,
  getEnabledAgents,
  isMultiAgentEnabled,
  getAgentByRoute,
  loadAgentConfig,
  switchAgent,
  getCurrentAgent,
};
