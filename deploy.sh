#!/bin/bash

# Deploy script for internal server
# Usage: ./deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
SERVER_HOST=${SERVER_HOST:-"your-internal-server.com"}
SERVER_USER=${SERVER_USER:-"deploy"}
DEPLOY_PATH=${DEPLOY_PATH:-"/var/www/tanstack-base-ui-gallery"}

echo "🚀 Deploying to ${ENVIRONMENT} environment..."

# Build the application
echo "📦 Building application..."
pnpm install
pnpm build

# Create deployment archive
echo "📦 Creating deployment archive..."
tar -czf deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='.next' \
  --exclude='.output' \
  --exclude='*.log' \
  --exclude='.env.local' \
  .output \
  package.json \
  pnpm-lock.yaml

# Deploy to server (uncomment and configure as needed)
# echo "🚀 Uploading to server..."
# scp deploy.tar.gz ${SERVER_USER}@${SERVER_HOST}:${DEPLOY_PATH}/
# 
# echo "🔧 Extracting on server..."
# ssh ${SERVER_USER}@${SERVER_HOST} "cd ${DEPLOY_PATH} && tar -xzf deploy.tar.gz && pm2 restart tanstack-base-ui-gallery || pm2 start .output/server/index.js --name tanstack-base-ui-gallery"

echo "✅ Deployment archive created: deploy.tar.gz"
echo "📝 Next steps:"
echo "   1. Upload deploy.tar.gz to your server"
echo "   2. Extract: tar -xzf deploy.tar.gz"
echo "   3. Install dependencies: pnpm install --prod"
echo "   4. Start: pm2 start .output/server/index.js --name tanstack-base-ui-gallery"

