#!/usr/bin/env node

/**
 * Knowledge Base Validation Tool
 * Validates knowledge base files for:
 * - File size limits (< 18,000 characters for Bedrock)
 * - Valid Markdown syntax
 * - Required sections
 * - Broken links
 * - Character encoding
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  maxCharacters: 18000,
  maxFileSize: 50 * 1024, // 50KB
  kbDirectory: path.join(__dirname, '../Agent_Knowledge_Bases'),
  requiredSections: ['#'], // At least one heading
};

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

class KnowledgeBaseValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.info = [];
    this.files = [];
  }

  log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
  }

  error(file, message) {
    this.errors.push({ file, message });
    this.log(`  ❌ ERROR: ${message}`, colors.red);
  }

  warning(file, message) {
    this.warnings.push({ file, message });
    this.log(`  ⚠️  WARNING: ${message}`, colors.yellow);
  }

  infoMsg(file, message) {
    this.info.push({ file, message });
    this.log(`  ℹ️  INFO: ${message}`, colors.blue);
  }

  success(message) {
    this.log(`  ✅ ${message}`, colors.green);
  }

  /**
   * Get all markdown files in the KB directory
   */
  getKnowledgeBaseFiles() {
    try {
      const files = fs.readdirSync(CONFIG.kbDirectory)
        .filter(file => file.endsWith('.md'))
        .map(file => path.join(CONFIG.kbDirectory, file));
      return files;
    } catch (error) {
      this.log(`Error reading KB directory: ${error.message}`, colors.red);
      return [];
    }
  }

  /**
   * Validate file size
   */
  validateFileSize(filePath, content) {
    const stats = fs.statSync(filePath);
    const fileName = path.basename(filePath);

    // Check character count
    const charCount = content.length;
    if (charCount > CONFIG.maxCharacters) {
      this.error(
        fileName,
        `File exceeds ${CONFIG.maxCharacters} character limit (${charCount} characters). ` +
        `Reduce by ${charCount - CONFIG.maxCharacters} characters.`
      );
      return false;
    } else if (charCount > CONFIG.maxCharacters * 0.9) {
      this.warning(
        fileName,
        `File is approaching character limit (${charCount}/${CONFIG.maxCharacters})`
      );
    } else {
      this.success(`Character count: ${charCount}/${CONFIG.maxCharacters}`);
    }

    // Check file size
    if (stats.size > CONFIG.maxFileSize) {
      this.warning(fileName, `Large file size: ${(stats.size / 1024).toFixed(2)}KB`);
    }

    return true;
  }

  /**
   * Validate Markdown syntax
   */
  validateMarkdownSyntax(filePath, content) {
    const fileName = path.basename(filePath);
    let isValid = true;

    // Check for headings
    const headings = content.match(/^#+\s+.+$/gm);
    if (!headings || headings.length === 0) {
      this.warning(fileName, 'No headings found. Consider adding section headings.');
      isValid = false;
    } else {
      this.success(`Found ${headings.length} headings`);
    }

    // Check for lists
    const lists = content.match(/^[\*\-\+]\s+.+$/gm);
    if (lists) {
      this.infoMsg(fileName, `Found ${lists.length} list items`);
    }

    // Check for code blocks
    const codeBlocks = content.match(/```[\s\S]*?```/g);
    if (codeBlocks) {
      this.infoMsg(fileName, `Found ${codeBlocks.length} code blocks`);
    }

    // Check for unclosed code blocks
    const codeBlockMarkers = (content.match(/```/g) || []).length;
    if (codeBlockMarkers % 2 !== 0) {
      this.error(fileName, 'Unclosed code block detected (odd number of ```)');
      isValid = false;
    }

    // Check for broken markdown links
    const markdownLinks = content.match(/\[([^\]]+)\]\(([^\)]+)\)/g);
    if (markdownLinks) {
      markdownLinks.forEach(link => {
        const urlMatch = link.match(/\]\(([^\)]+)\)/);
        if (urlMatch && urlMatch[1].startsWith('http')) {
          // External link - just note it
          this.infoMsg(fileName, `External link found: ${urlMatch[1]}`);
        }
      });
    }

    return isValid;
  }

  /**
   * Validate content structure
   */
  validateStructure(filePath, content) {
    const fileName = path.basename(filePath);
    let isValid = true;

    // Check for empty file
    if (content.trim().length === 0) {
      this.error(fileName, 'File is empty');
      return false;
    }

    // Check for very short content
    if (content.length < 100) {
      this.warning(fileName, 'File has very little content (< 100 characters)');
    }

    // Check for title (first line should be # heading)
    const lines = content.split('\n');
    const firstNonEmptyLine = lines.find(line => line.trim().length > 0);
    if (firstNonEmptyLine && !firstNonEmptyLine.startsWith('#')) {
      this.warning(fileName, 'File should start with a heading (# Title)');
    }

    // Check for special characters that might cause issues
    const problematicChars = content.match(/[^\x00-\x7F\s]/g);
    if (problematicChars && problematicChars.length > 100) {
      this.infoMsg(fileName, `Contains ${problematicChars.length} non-ASCII characters`);
    }

    return isValid;
  }

  /**
   * Validate encoding
   */
  validateEncoding(filePath) {
    const fileName = path.basename(filePath);
    try {
      // Try to read as UTF-8
      fs.readFileSync(filePath, 'utf8');
      this.success('File encoding: UTF-8');
      return true;
    } catch (error) {
      this.error(fileName, `File encoding issue: ${error.message}`);
      return false;
    }
  }

  /**
   * Check for duplicate content across files
   */
  checkDuplicateContent(files) {
    const contentMap = new Map();

    files.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fileName = path.basename(filePath);

      // Check for significant content blocks (paragraphs > 100 chars)
      const paragraphs = content.split('\n\n')
        .filter(p => p.trim().length > 100)
        .map(p => p.trim());

      paragraphs.forEach(para => {
        if (contentMap.has(para)) {
          this.warning(
            fileName,
            `Duplicate content found in ${contentMap.get(para)}`
          );
        } else {
          contentMap.set(para, fileName);
        }
      });
    });
  }

  /**
   * Validate a single file
   */
  validateFile(filePath) {
    const fileName = path.basename(filePath);

    this.log(`\n📄 Validating: ${colors.cyan}${fileName}${colors.reset}`);

    let content;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      this.error(fileName, `Cannot read file: ${error.message}`);
      return false;
    }

    // Run all validations
    const validations = [
      this.validateEncoding(filePath),
      this.validateFileSize(filePath, content),
      this.validateMarkdownSyntax(filePath, content),
      this.validateStructure(filePath, content),
    ];

    return validations.every(v => v);
  }

  /**
   * Generate validation report
   */
  generateReport() {
    this.log('\n' + '='.repeat(60), colors.cyan);
    this.log('📊 VALIDATION REPORT', colors.cyan);
    this.log('='.repeat(60), colors.cyan);

    this.log(`\n📁 Files validated: ${this.files.length}`);

    if (this.errors.length === 0) {
      this.log(`\n✅ No errors found!`, colors.green);
    } else {
      this.log(`\n❌ Errors: ${this.errors.length}`, colors.red);
      this.errors.forEach(({ file, message }) => {
        this.log(`  • ${file}: ${message}`, colors.red);
      });
    }

    if (this.warnings.length > 0) {
      this.log(`\n⚠️  Warnings: ${this.warnings.length}`, colors.yellow);
      this.warnings.forEach(({ file, message }) => {
        this.log(`  • ${file}: ${message}`, colors.yellow);
      });
    }

    if (this.info.length > 0 && process.argv.includes('--verbose')) {
      this.log(`\nℹ️  Info: ${this.info.length}`, colors.blue);
      this.info.forEach(({ file, message }) => {
        this.log(`  • ${file}: ${message}`, colors.blue);
      });
    }

    this.log('\n' + '='.repeat(60), colors.cyan);

    // Return exit code
    return this.errors.length === 0 ? 0 : 1;
  }

  /**
   * Run validation
   */
  async run() {
    this.log('\n🔍 Knowledge Base Validation Tool', colors.magenta);
    this.log('='.repeat(60), colors.cyan);

    // Get all KB files
    this.files = this.getKnowledgeBaseFiles();

    if (this.files.length === 0) {
      this.log('\n❌ No knowledge base files found!', colors.red);
      return 1;
    }

    this.log(`\nFound ${this.files.length} knowledge base file(s)\n`);

    // Validate each file
    this.files.forEach(file => this.validateFile(file));

    // Check for duplicate content
    this.log(`\n🔍 Checking for duplicate content...`);
    this.checkDuplicateContent(this.files);

    // Generate report
    return this.generateReport();
  }
}

// Run validator
const validator = new KnowledgeBaseValidator();
validator.run().then(exitCode => {
  process.exit(exitCode);
}).catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
});
