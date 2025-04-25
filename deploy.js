/**
 * Manual deployment script for GitHub Pages
 * Run with: node deploy.js
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

console.log(`${colors.bright}${colors.cyan}=== GitHub Pages Deployment Script ===${colors.reset}\n`);

try {
  // Check if git is installed
  try {
    execSync('git --version', { stdio: 'ignore' });
  } catch (error) {
    throw new Error('Git is not installed. Please install Git to continue.');
  }

  // Check if we're in a git repository
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
  } catch (error) {
    throw new Error('Not a git repository. Please run this script from a git repository.');
  }

  console.log(`${colors.yellow}Step 1: Building the application...${colors.reset}`);
  execSync('npm run build:prod', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Build complete${colors.reset}\n`);

  console.log(`${colors.yellow}Step 2: Deploying to GitHub Pages...${colors.reset}`);
  execSync('npm run deploy', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Deployment complete${colors.reset}\n`);

  // Get the homepage URL from package.json
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const homepage = packageJson.homepage || 'GitHub Pages';

  console.log(`${colors.bright}${colors.green}✅ Successfully deployed to ${colors.cyan}${homepage}${colors.reset}`);
  console.log(`${colors.yellow}Note: It might take a few minutes for the changes to be visible.${colors.reset}`);

} catch (error) {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
}