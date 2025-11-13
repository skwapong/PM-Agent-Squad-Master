/**
 * Slack Integration Plugin
 * Sends notifications to Slack webhook
 */

import env from '../config/env.js';

export default {
  name: 'slack',
  version: '1.0.0',
  description: 'Slack webhook integration',

  webhookUrl: null,

  /**
   * Initialize plugin
   */
  async initialize() {
    this.webhookUrl = env.plugins.slackWebhook;

    if (!this.webhookUrl) {
      console.warn('Slack webhook URL not configured');
      return;
    }

    console.log('Slack plugin initialized');
  },

  /**
   * Plugin hooks
   */
  hooks: {
    onMessageSent: async function (message) {
      // Only notify for certain messages (optional)
      return message;
    },

    onError: async function (error) {
      await this.sendNotification({
        text: `🚨 Error occurred in agent`,
        attachments: [
          {
            color: 'danger',
            fields: [
              {
                title: 'Error Message',
                value: error.message,
                short: false,
              },
              {
                title: 'Timestamp',
                value: new Date().toISOString(),
                short: true,
              },
            ],
          },
        ],
      });
      return error;
    },
  },

  /**
   * Send notification to Slack
   * @param {Object} payload - Slack message payload
   */
  async sendNotification(payload) {
    if (!this.webhookUrl) {
      console.warn('Slack webhook not configured');
      return;
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Slack API error: ${response.statusText}`);
      }

      if (env.features.debugMode) {
        console.log('✅ Slack notification sent');
      }
    } catch (error) {
      console.error('Failed to send Slack notification:', error);
    }
  },

  /**
   * Cleanup
   */
  cleanup() {
    console.log('Slack plugin cleaned up');
  },
};
