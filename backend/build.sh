#!/bin/bash
set -e

echo "🔨 Starting build process..."
echo "📦 Installing dependencies..."
npm install

echo "🔧 Generating Prisma Client..."
npx prisma generate

echo "📝 Compiling TypeScript..."
npx tsc

echo "✅ Build completed successfully!"

