# Plugin System

The PM Agent Squad Master includes a powerful plugin system that allows you to extend functionality without modifying core code.

## Available Plugins

### Built-in Plugins

1. **Analytics Plugin** (`analytics`)
   - Tracks user interactions
   - Sends events to Google Analytics
   - Supports custom analytics endpoints
   - Events: message_sent, response_received, quick_action_clicked

2. **Slack Plugin** (`slack`)
   - Sends notifications to Slack
   - Error reporting
   - Custom notifications

## Plugin Structure

A plugin is a JavaScript object with the following structure:

```javascript
export default {
  // Required fields
  name: 'my-plugin',
  version: '1.0.0',

  // Optional fields
  description: 'Plugin description',

  // Initialization (optional)
  async initialize() {
    // Setup code
  },

  // Hooks (optional)
  hooks: {
    onMessageSent: async function(message) {
      // Process message
      return message;
    },

    onResponseReceived: async function(response) {
      // Process response
      return response;
    },

    onQuickActionClicked: async function(action) {
      // Handle quick action
      return action;
    },

    onError: async function(error) {
      // Handle error
      return error;
    },
  },

  // Cleanup (optional)
  cleanup() {
    // Cleanup code
  },
};
```

## Available Hooks

- `onMessageSent` - Fired when user sends a message
- `onResponseReceived` - Fired when agent responds
- `onQuickActionClicked` - Fired when quick action is clicked
- `onError` - Fired when an error occurs
- `onAgentSwitch` - Fired when switching agents (multi-agent mode)
- `onConfigLoaded` - Fired when configuration is loaded

## Creating a Custom Plugin

### Step 1: Create Plugin File

Create a new file in `src/plugins/`:

```javascript
// src/plugins/my-custom-plugin.js
export default {
  name: 'my-custom-plugin',
  version: '1.0.0',
  description: 'My custom plugin',

  async initialize() {
    console.log('My plugin initialized!');
  },

  hooks: {
    onMessageSent: async function(message) {
      console.log('Message sent:', message);
      return message;
    },
  },
};
```

### Step 2: Register Plugin

In your main application file:

```javascript
import pluginManager from './src/plugins/plugin-manager.js';
import myCustomPlugin from './src/plugins/my-custom-plugin.js';

// Register plugin
pluginManager.register(myCustomPlugin);

// Initialize plugins
await pluginManager.initialize();
```

### Step 3: Enable Plugin

Add to `.env` file:

```env
VITE_ENABLED_PLUGINS=my-custom-plugin,analytics
```

## Plugin Examples

### Example 1: Custom Analytics

```javascript
export default {
  name: 'custom-analytics',
  version: '1.0.0',

  hooks: {
    onMessageSent: async function(message) {
      // Send to your analytics service
      await fetch('https://your-analytics.com/event', {
        method: 'POST',
        body: JSON.stringify({
          event: 'message_sent',
          message_length: message.length,
        }),
      });

      return message;
    },
  },
};
```

### Example 2: Profanity Filter

```javascript
export default {
  name: 'profanity-filter',
  version: '1.0.0',

  badWords: ['bad', 'word', 'list'],

  hooks: {
    onMessageSent: async function(message) {
      let filtered = message;

      this.badWords.forEach(word => {
        const regex = new RegExp(word, 'gi');
        filtered = filtered.replace(regex, '***');
      });

      return filtered;
    },
  },
};
```

### Example 3: Message Logger

```javascript
export default {
  name: 'message-logger',
  version: '1.0.0',

  logs: [],

  hooks: {
    onMessageSent: async function(message) {
      this.logs.push({
        type: 'sent',
        message,
        timestamp: new Date(),
      });
      return message;
    },

    onResponseReceived: async function(response) {
      this.logs.push({
        type: 'received',
        response,
        timestamp: new Date(),
      });
      return response;
    },
  },

  // Export logs
  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  },
};
```

## Plugin Best Practices

1. **Always return data from hooks** - Hooks should return the data they receive (potentially modified)
2. **Handle errors gracefully** - Don't let plugin errors crash the app
3. **Use semantic versioning** - Follow semver for plugin versions
4. **Document your plugin** - Include clear documentation
5. **Test thoroughly** - Test with and without your plugin enabled
6. **Respect privacy** - Don't collect sensitive data without consent
7. **Performance** - Keep hooks fast, avoid blocking operations

## Debugging Plugins

Enable debug mode in `.env`:

```env
VITE_ENABLE_DEBUG_MODE=true
```

This will log plugin activity to the console.

## Plugin API Reference

### PluginManager Methods

- `register(plugin)` - Register a plugin
- `unregister(name)` - Unregister a plugin
- `initialize()` - Initialize all enabled plugins
- `executeHook(hookName, data)` - Execute a hook
- `getPlugin(name)` - Get plugin by name
- `isEnabled(name)` - Check if plugin is enabled
- `getAllPlugins()` - Get all registered plugins
- `getEnabledPlugins()` - Get enabled plugins only

## Security Considerations

- Only install plugins from trusted sources
- Review plugin code before enabling
- Plugins have full access to the application
- Be careful with external API calls
- Don't store sensitive data in plugins

## Contributing Plugins

To contribute a plugin to the official repository:

1. Follow the plugin structure guidelines
2. Include comprehensive documentation
3. Add tests for your plugin
4. Submit a pull request with examples

## Support

For plugin development help:
- Check existing plugins for examples
- Review the plugin-manager.js source code
- Ask in community discussions
