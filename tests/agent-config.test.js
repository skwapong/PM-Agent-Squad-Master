/**
 * Agent Configuration Tests
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Agent Configuration', () => {
  let config;

  it('should load agent.config.json', () => {
    const configPath = path.join(__dirname, '../agent.config.json');
    expect(fs.existsSync(configPath)).toBe(true);

    const configData = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configData);
    expect(config).toBeDefined();
  });

  it('should have agent section', () => {
    expect(config.agent).toBeDefined();
    expect(config.agent.name).toBeDefined();
    expect(config.agent.description).toBeDefined();
    expect(config.agent.welcomeMessage).toBeDefined();
  });

  it('should have valid quick actions', () => {
    expect(Array.isArray(config.quickActions)).toBe(true);

    config.quickActions.forEach(action => {
      expect(action).toHaveProperty('id');
      expect(action).toHaveProperty('label');
      expect(action).toHaveProperty('icon');
      expect(action).toHaveProperty('prompt');
      expect(action).toHaveProperty('category');

      // Validate ID is unique
      const duplicates = config.quickActions.filter(a => a.id === action.id);
      expect(duplicates.length).toBe(1);
    });
  });

  it('should have knowledge base configuration', () => {
    expect(config.knowledgeBases).toBeDefined();
    expect(config.knowledgeBases.folder).toBeDefined();
    expect(Array.isArray(config.knowledgeBases.files)).toBe(true);
  });

  it('should reference existing knowledge base files', () => {
    const kbFolder = path.join(__dirname, '..', config.knowledgeBases.folder);

    config.knowledgeBases.files.forEach(file => {
      const filePath = path.join(kbFolder, file);
      expect(fs.existsSync(filePath), `KB file should exist: ${file}`).toBe(true);
    });
  });

  it('should have valid color values', () => {
    const colorRegex = /^#[0-9a-f]{6}$/i;

    if (config.customization?.theme) {
      const { primaryColor, secondaryColor, accentColor } = config.customization.theme;

      if (primaryColor) expect(primaryColor).toMatch(colorRegex);
      if (secondaryColor) expect(secondaryColor).toMatch(colorRegex);
      if (accentColor) expect(accentColor).toMatch(colorRegex);
    }
  });
});
