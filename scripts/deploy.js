#!/usr/bin/env node

/**
 * Deployment Script
 * Handles deployment to different environments
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ERROR: ${message}`, colors.red);
  process.exit(1);
}

function success(message) {
  log(`✅ ${message}`, colors.green);
}

function info(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function warning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

class Deployer {
  constructor() {
    this.environment = process.argv[2] || 'production';
    this.platform = process.argv[3] || 'vercel';
    this.config = null;
  }

  loadConfig() {
    try {
      const configPath = path.join(__dirname, '../deployment.config.json');
      const configData = fs.readFileSync(configPath, 'utf8');
      this.config = JSON.parse(configData);
      success('Loaded deployment configuration');
    } catch (err) {
      error(`Failed to load deployment config: ${err.message}`);
    }
  }

  validateEnvironment() {
    const validEnvs = Object.keys(this.config.environments);
    if (!validEnvs.includes(this.environment)) {
      error(`Invalid environment: ${this.environment}. Valid options: ${validEnvs.join(', ')}`);
    }
    success(`Environment validated: ${this.environment}`);
  }

  checkEnvFile() {
    const envFile = `.env.${this.environment}`;
    const envPath = path.join(__dirname, '..', envFile);

    if (!fs.existsSync(envPath)) {
      warning(`Environment file not found: ${envFile}`);
      info('Using default .env file');
    } else {
      success(`Found environment file: ${envFile}`);
    }
  }

  runBuild() {
    log('\n🏗️  Building project...', colors.cyan);

    try {
      const buildCommand = `npm run build:${this.environment}`;
      info(`Running: ${buildCommand}`);

      execSync(buildCommand, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      });

      success('Build completed successfully');
    } catch (err) {
      error(`Build failed: ${err.message}`);
    }
  }

  validateBuild() {
    log('\n🔍 Validating build...', colors.cyan);

    const distPath = path.join(__dirname, '../dist');
    if (!fs.existsSync(distPath)) {
      error('dist/ directory not found');
    }

    const indexPath = path.join(distPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
      error('index.html not found in dist/');
    }

    success('Build validation passed');
  }

  deployToVercel() {
    log('\n🚀 Deploying to Vercel...', colors.cyan);

    try {
      const vercelConfig = this.config.deployment.platforms.vercel;

      if (!vercelConfig.enabled) {
        error('Vercel deployment is not enabled in deployment.config.json');
      }

      let deployCommand = 'vercel';

      if (this.environment === 'production') {
        deployCommand += ' --prod';
      }

      info(`Running: ${deployCommand}`);

      execSync(deployCommand, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      });

      success('Deployment to Vercel completed');
    } catch (err) {
      error(`Vercel deployment failed: ${err.message}`);
    }
  }

  deployToNetlify() {
    log('\n🚀 Deploying to Netlify...', colors.cyan);

    try {
      const netlifyConfig = this.config.deployment.platforms.netlify;

      if (!netlifyConfig.enabled) {
        error('Netlify deployment is not enabled in deployment.config.json');
      }

      let deployCommand = 'netlify deploy';

      if (this.environment === 'production') {
        deployCommand += ' --prod';
      }

      info(`Running: ${deployCommand}`);

      execSync(deployCommand, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      });

      success('Deployment to Netlify completed');
    } catch (err) {
      error(`Netlify deployment failed: ${err.message}`);
    }
  }

  deployToS3() {
    log('\n🚀 Deploying to AWS S3...', colors.cyan);

    try {
      const s3Config = this.config.deployment.platforms['aws-s3'];

      if (!s3Config.enabled) {
        error('AWS S3 deployment is not enabled in deployment.config.json');
      }

      const bucket = s3Config.bucket;
      const region = s3Config.region;

      const syncCommand = `aws s3 sync dist/ s3://${bucket}/ --region ${region} --delete`;

      info(`Running: ${syncCommand}`);

      execSync(syncCommand, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      });

      // Invalidate CloudFront if enabled
      if (s3Config.cloudfront?.enabled && s3Config.cloudfront?.distributionId) {
        const distributionId = s3Config.cloudfront.distributionId;
        const invalidateCommand = `aws cloudfront create-invalidation --distribution-id ${distributionId} --paths "/*"`;

        info('Invalidating CloudFront cache...');
        execSync(invalidateCommand, { stdio: 'inherit' });
      }

      success('Deployment to AWS S3 completed');
    } catch (err) {
      error(`AWS S3 deployment failed: ${err.message}`);
    }
  }

  deploy() {
    log('\n🚀 PM Agent Squad Master - Deployment Tool', colors.magenta);
    log('='.repeat(60), colors.cyan);

    info(`Environment: ${this.environment}`);
    info(`Platform: ${this.platform}`);
    log('');

    this.loadConfig();
    this.validateEnvironment();
    this.checkEnvFile();
    this.runBuild();
    this.validateBuild();

    // Deploy to platform
    switch (this.platform.toLowerCase()) {
      case 'vercel':
        this.deployToVercel();
        break;
      case 'netlify':
        this.deployToNetlify();
        break;
      case 'aws-s3':
      case 's3':
        this.deployToS3();
        break;
      default:
        error(`Unsupported platform: ${this.platform}`);
    }

    log('\n' + '='.repeat(60), colors.cyan);
    success(`Deployment to ${this.environment} completed! 🎉`);
    log('='.repeat(60), colors.cyan);
  }
}

// Show help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
PM Agent Squad Master - Deployment Tool

Usage: node scripts/deploy.js [environment] [platform]

Environments:
  - development (default local build)
  - staging
  - production (default)

Platforms:
  - vercel (default)
  - netlify
  - aws-s3

Examples:
  node scripts/deploy.js production vercel
  node scripts/deploy.js staging netlify
  node scripts/deploy.js production aws-s3

Options:
  --help, -h    Show this help message
  `);
  process.exit(0);
}

// Run deployment
const deployer = new Deployer();
deployer.deploy();
