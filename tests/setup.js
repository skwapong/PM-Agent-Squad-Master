/**
 * Test Setup
 * Runs before all tests
 */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables for testing
process.env.VITE_ENVIRONMENT = 'test';
process.env.VITE_MOCK_BEDROCK = 'true';
process.env.VITE_ENABLE_DEBUG_MODE = 'true';
