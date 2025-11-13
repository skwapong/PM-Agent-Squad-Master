/**
 * Environment Configuration Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import env, { validateEnv, isDevelopment, isProduction, isStaging } from '../../src/config/env.js';

describe('Environment Configuration', () => {
  describe('env object', () => {
    it('should have bedrock configuration', () => {
      expect(env.bedrock).toBeDefined();
      expect(env.bedrock).toHaveProperty('agentId');
      expect(env.bedrock).toHaveProperty('region');
    });

    it('should have app configuration', () => {
      expect(env.app).toBeDefined();
      expect(env.app).toHaveProperty('title');
      expect(env.app).toHaveProperty('version');
      expect(env.app).toHaveProperty('environment');
    });

    it('should have feature flags', () => {
      expect(env.features).toBeDefined();
      expect(typeof env.features.analytics).toBe('boolean');
      expect(typeof env.features.debugMode).toBe('boolean');
    });

    it('should have UI configuration', () => {
      expect(env.ui).toBeDefined();
      expect(env.ui.primaryColor).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('should have limits configuration', () => {
      expect(env.limits).toBeDefined();
      expect(typeof env.limits.maxMessageLength).toBe('number');
      expect(env.limits.maxMessageLength).toBeGreaterThan(0);
    });
  });

  describe('validateEnv', () => {
    it('should return validation result object', () => {
      const result = validateEnv();
      expect(result).toHaveProperty('valid');
      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('warnings');
      expect(Array.isArray(result.errors)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
    });
  });

  describe('environment helpers', () => {
    it('isDevelopment should return boolean', () => {
      expect(typeof isDevelopment()).toBe('boolean');
    });

    it('isProduction should return boolean', () => {
      expect(typeof isProduction()).toBe('boolean');
    });

    it('isStaging should return boolean', () => {
      expect(typeof isStaging()).toBe('boolean');
    });
  });
});
