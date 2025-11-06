#!/bin/bash

echo "🚀 Campaign Strategist Chat Interface - Deployment Script"
echo "=========================================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "🌐 Deploying to Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    echo ""
    echo "Alternative deployment options:"
    echo "1. Manual Vercel: Upload 'dist' folder to vercel.com"
    echo "2. Netlify: Run 'netlify deploy --prod --dir=dist'"
    echo "3. GitHub Pages: Run 'npm run deploy'"
    exit 1
fi

echo ""
echo "✅ Deployment completed successfully!"
echo "🎉 Your Campaign Strategist Chat Interface is now live!"
echo ""
