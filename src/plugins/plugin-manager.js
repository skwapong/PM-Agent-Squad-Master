/**
 * Plugin Manager
 * Manages loading and execution of plugins
 */

import env from '../config/env.js';

class PluginManager {
  constructor() {
    this.plugins = new Map();
    this.hooks = new Map();
    this.initialized = false;
  }

  /**
   * Register a plugin
   * @param {Object} plugin - Plugin object
   */
  register(plugin) {
    if (!plugin.name) {
      throw new Error('Plugin must have a name');
    }

    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin ${plugin.name} is already registered`);
      return;
    }

    // Validate plugin structure
    this.validatePlugin(plugin);

    this.plugins.set(plugin.name, plugin);

    // Register plugin hooks
    if (plugin.hooks) {
      Object.keys(plugin.hooks).forEach(hookName => {
        this.registerHook(hookName, plugin.name, plugin.hooks[hookName]);
      });
    }

    console.log(`✅ Plugin registered: ${plugin.name}`);
  }

  /**
   * Validate plugin structure
   * @param {Object} plugin - Plugin to validate
   */
  validatePlugin(plugin) {
    const required = ['name', 'version'];
    const missing = required.filter(field => !plugin[field]);

    if (missing.length > 0) {
      throw new Error(`Plugin missing required fields: ${missing.join(', ')}`);
    }

    // Validate version format
    if (!/^\d+\.\d+\.\d+$/.test(plugin.version)) {
      throw new Error(`Invalid plugin version format: ${plugin.version}`);
    }
  }

  /**
   * Register a hook
   * @param {string} hookName - Hook name
   * @param {string} pluginName - Plugin name
   * @param {Function} callback - Hook callback
   */
  registerHook(hookName, pluginName, callback) {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, []);
    }

    this.hooks.get(hookName).push({
      pluginName,
      callback,
    });
  }

  /**
   * Execute a hook
   * @param {string} hookName - Hook name
   * @param {*} data - Data to pass to hook
   * @returns {Promise<*>} Modified data
   */
  async executeHook(hookName, data) {
    if (!this.hooks.has(hookName)) {
      return data;
    }

    let result = data;
    const callbacks = this.hooks.get(hookName);

    for (const { pluginName, callback } of callbacks) {
      try {
        result = await callback(result);
      } catch (error) {
        console.error(`Error in plugin ${pluginName} hook ${hookName}:`, error);
      }
    }

    return result;
  }

  /**
   * Initialize all plugins
   */
  async initialize() {
    if (this.initialized) {
      console.warn('Plugins already initialized');
      return;
    }

    // Load enabled plugins from env
    const enabledPlugins = env.plugins.enabled;

    if (enabledPlugins.length === 0) {
      console.log('No plugins enabled');
      this.initialized = true;
      return;
    }

    // Initialize each plugin
    for (const plugin of this.plugins.values()) {
      if (!enabledPlugins.includes(plugin.name)) {
        continue;
      }

      if (plugin.initialize) {
        try {
          await plugin.initialize();
          console.log(`✅ Plugin initialized: ${plugin.name}`);
        } catch (error) {
          console.error(`Failed to initialize plugin ${plugin.name}:`, error);
        }
      }
    }

    this.initialized = true;
    console.log('✅ All plugins initialized');
  }

  /**
   * Get plugin by name
   * @param {string} name - Plugin name
   * @returns {Object|null} Plugin or null
   */
  getPlugin(name) {
    return this.plugins.get(name) || null;
  }

  /**
   * Check if plugin is enabled
   * @param {string} name - Plugin name
   * @returns {boolean}
   */
  isEnabled(name) {
    return env.plugins.enabled.includes(name);
  }

  /**
   * Get all registered plugins
   * @returns {Array<Object>}
   */
  getAllPlugins() {
    return Array.from(this.plugins.values());
  }

  /**
   * Get enabled plugins
   * @returns {Array<Object>}
   */
  getEnabledPlugins() {
    return this.getAllPlugins().filter(plugin =>
      this.isEnabled(plugin.name)
    );
  }

  /**
   * Unregister a plugin
   * @param {string} name - Plugin name
   */
  unregister(name) {
    const plugin = this.plugins.get(name);

    if (!plugin) {
      console.warn(`Plugin not found: ${name}`);
      return;
    }

    // Remove hooks
    this.hooks.forEach((callbacks, hookName) => {
      this.hooks.set(
        hookName,
        callbacks.filter(cb => cb.pluginName !== name)
      );
    });

    // Call cleanup if available
    if (plugin.cleanup) {
      plugin.cleanup();
    }

    this.plugins.delete(name);
    console.log(`✅ Plugin unregistered: ${name}`);
  }
}

// Create singleton instance
const pluginManager = new PluginManager();

export default pluginManager;
