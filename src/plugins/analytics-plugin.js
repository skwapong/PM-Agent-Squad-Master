/**
 * Analytics Plugin
 * Tracks user interactions and sends to analytics service
 */

import env from '../config/env.js';

export default {
  name: 'analytics',
  version: '1.0.0',
  description: 'Analytics tracking plugin',

  // Plugin state
  sessionId: null,
  eventQueue: [],

  /**
   * Initialize plugin
   */
  async initialize() {
    if (!env.features.analytics) {
      console.log('Analytics disabled, skipping initialization');
      return;
    }

    this.sessionId = this.generateSessionId();

    // Initialize Google Analytics if tracking ID is provided
    if (env.analytics.gaTrackingId) {
      this.initializeGA();
    }

    console.log('Analytics plugin initialized');
  },

  /**
   * Plugin hooks
   */
  hooks: {
    onMessageSent: async function (message) {
      this.trackEvent('message_sent', {
        messageLength: message.length,
        timestamp: new Date().toISOString(),
      });
      return message;
    },

    onResponseReceived: async function (response) {
      this.trackEvent('response_received', {
        responseLength: response.length,
        timestamp: new Date().toISOString(),
      });
      return response;
    },

    onQuickActionClicked: async function (action) {
      this.trackEvent('quick_action_clicked', {
        actionId: action.id,
        actionLabel: action.label,
        timestamp: new Date().toISOString(),
      });
      return action;
    },
  },

  /**
   * Track an event
   * @param {string} eventName - Event name
   * @param {Object} properties - Event properties
   */
  trackEvent(eventName, properties = {}) {
    const event = {
      name: eventName,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
      },
    };

    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }

    // Send to custom analytics endpoint
    if (env.analytics.endpoint) {
      this.sendToEndpoint(event);
    }

    // Debug logging
    if (env.features.debugMode) {
      console.log('📊 Analytics Event:', event);
    }
  },

  /**
   * Send event to custom endpoint
   * @param {Object} event - Event data
   */
  async sendToEndpoint(event) {
    try {
      await fetch(env.analytics.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  },

  /**
   * Initialize Google Analytics
   */
  initializeGA() {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${env.analytics.gaTrackingId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', env.analytics.gaTrackingId);
  },

  /**
   * Generate unique session ID
   * @returns {string}
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Cleanup
   */
  cleanup() {
    console.log('Analytics plugin cleaned up');
  },
};
