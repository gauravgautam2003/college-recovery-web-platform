/**
 * Setup and Deployment Guide
 * 
 * Complete guide for setting up EduVision AI for development and production
 */

# 🚀 Complete Setup & Deployment Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Database Configuration](#database-configuration)
3. [Environment Setup](#environment-setup)
4. [Running Development Server](#running-development-server)
5. [Production Deployment](#production-deployment)
6. [Database Migrations](#database-migrations)
7. [Troubleshooting](#troubleshooting)
8. [Performance Optimization](#performance-optimization)

---

## 📝 Local Development Setup

### Prerequisites

- **Node.js**: 18.17 or higher
- **npm**: 9.6 or higher (or yarn/pnpm)
- **PostgreSQL**: 12 or higher
- **Git**: For version control
- **Code Editor**: VS Code, WebStorm, or similar

### 1. Clone Repository

```bash
# Clone the project
git clone <repository-url>
cd college-discovery-platform

# Or if you have an existing project
cd college-discovery-platform
```

### 2. Install Dependencies

```bash
# Install all project dependencies
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

This installs:
- Frontend dependencies (React, Next.js, Tailwind)
- Backend dependencies (Prisma, validation libraries)
- Development tools (ESLint, TypeScript)

### 3. Verify Installation

```bash
# Check Node and npm versions
node --version  # Should be v18.17.0 or higher
npm --version   # Should be 9.6.0 or higher

# Check if dependencies installed correctly
npm ls

# Check TypeScript installation
npx tsc --version
```

---

## 🗄️ Database Configuration

### PostgreSQL Installation

#### On Windows

1. Download PostgreSQL installer from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Choose a password for the `postgres` user (remember this!)
4. Default port is 5432
5. Ensure PostgreSQL service is running

#### On macOS

```bash
# Using Homebrew (recommended)
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Or using Docker (easier)
docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres:15-alpine
```

#### On Linux (Ubuntu/Debian)

```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql

# Create postgres user password if needed
sudo -u postgres psql
# In psql: ALTER USER postgres PASSWORD 'your_password';
# \q to exit
```

### Verify PostgreSQL Connection

```bash
# Connect to PostgreSQL (default user: postgres)
psql -U postgres -d postgres

# Or with connection string
psql postgresql://postgres:password@localhost:5432/postgres

# If connection successful, you'll see the psql prompt:
# postgres=#

# To exit psql
# \q
```

### Create Development Database

```bash
# Method 1: Using psql
psql -U postgres -c "CREATE DATABASE college_discovery;"

# Method 2: Using connection string
psql postgresql://postgres:password@localhost:5432 -c "CREATE DATABASE college_discovery;"

# Verify database created
psql -U postgres -c "\\l"  # List all databases
```

---

## 🔑 Environment Setup

### 1. Create .env.local File

```bash
# In project root directory
cp .env.example .env.local
```

### 2. Configure Environment Variables

Edit `.env.local` with your settings:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/college_discovery"

# JWT Configuration
# Generate with: openssl rand -base64 32
# Or use online: https://www.uuidgenerator.net/
JWT_SECRET="generate-a-long-random-string-min-32-chars-herexxxxx"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Feature Flags
NEXT_PUBLIC_ENABLE_COLLEGE_ADMIN="true"

# Development
NODE_ENV="development"
DEBUG="college-discovery:*"
```

### 3. Verify Environment Variables

```bash
# Check if .env.local was created
ls -la .env.local  # On Linux/Mac
dir .env.local     # On Windows

# View content (don't commit this!)
cat .env.local
```

### Important: Generate JWT_SECRET

```bash
# Linux/Mac: Using openssl
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}) -as [byte[]])

# Or use online generator (random 32 character string with mixed case, numbers, symbols)
```

---

## 🏃 Running Development Server

### 1. Setup Prisma

```bash
# Generate Prisma client
npx prisma generate

# Create and run database migrations
npx prisma migrate dev --name init

# Optional: Seed database with mock data
# npx prisma db seed
```

### 2. Start Development Server

```bash
# Start the Next.js development server
npm run dev

# Or using yarn
yarn dev

# Or using pnpm
pnpm dev

# Output should show:
# ▲ Next.js 16.2.6
# ▲ Local: http://localhost:3000
# ✓ Ready in 2.5s
```

### 3. Access Application

Open browser and navigate to: **http://localhost:3000**

### 4. Development Workflow

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2 (Optional): Watch for Prisma schema changes
npx prisma generate --watch

# Terminal 3 (Optional): Lint code as you type
npm run lint

# Testing endpoints
# Use browser DevTools, Postman, or curl to test APIs
```

### Hot Reload

- React components automatically reload on save
- Changes to API routes require manual refresh
- Database schema changes need migration

---

## 🌍 Production Deployment

### Option 1: Vercel (Recommended for Next.js)

#### Prerequisites
- GitHub account
- Vercel account (free signup)

#### Deployment Steps

1. **Push code to GitHub**
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

2. **Connect to Vercel**
- Go to https://vercel.com
- Sign in with GitHub
- Click "Add New Project"
- Select your repository
- Click "Import"

3. **Configure Environment Variables**
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `NEXT_PUBLIC_API_URL` (set to your domain)

4. **Deploy**
- Vercel automatically builds and deploys
- Your app will be available at `https://your-project.vercel.app`

### Option 2: Self-Hosted (VPS/Server)

#### Prerequisites
- VPS/Cloud server (AWS EC2, DigitalOcean, Linode, etc.)
- SSH access
- Node.js 18+
- PostgreSQL installed

#### Deployment Steps

1. **Install Dependencies on Server**
```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL (if not already installed)
sudo apt-get install postgresql postgresql-contrib
```

2. **Deploy Code**
```bash
# Clone repository
git clone <your-repo-url> college-discovery
cd college-discovery

# Install dependencies
npm install

# Setup environment variables
nano .env.production.local
# Add: DATABASE_URL, JWT_SECRET, NEXT_PUBLIC_API_URL
```

3. **Build Application**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build Next.js application
npm run build

# Output: .next folder created (~150-200MB)
```

4. **Start Production Server**
```bash
# Method 1: Using PM2 (recommended)
npm install -g pm2

# Start with PM2
pm2 start npm --name "college-discovery" -- start

# Make it persistent
pm2 startup
pm2 save

# View logs
pm2 logs college-discovery

# Method 2: Using systemd
sudo nano /etc/systemd/system/college-discovery.service
# [Add service configuration]
sudo systemctl start college-discovery
sudo systemctl enable college-discovery
```

5. **Setup Reverse Proxy (Nginx)**
```bash
# Install Nginx
sudo apt-get install nginx

# Configure
sudo nano /etc/nginx/sites-available/college-discovery

# Add proxy configuration:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/college-discovery /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

6. **Setup SSL Certificate (Let's Encrypt)**
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is setup automatically
```

---

## 🔄 Database Migrations

### Create Migration

```bash
# When you modify schema.prisma
npx prisma migrate dev --name describe_changes

# Examples:
npx prisma migrate dev --name add_college_admin
npx prisma migrate dev --name add_ratings
npx prisma migrate dev --name add_facilities
```

### Apply Migrations

```bash
# Development
npx prisma migrate dev

# Production (no creation, just apply existing)
npx prisma migrate deploy
```

### View Database

```bash
# Open Prisma Studio (interactive database viewer)
npx prisma studio

# Opens at http://localhost:5555
# Can browse and edit data visually
```

### Reset Database (⚠️ Deletes all data)

```bash
npx prisma migrate reset

# Confirms before deleting, then:
# - Deletes database
# - Recreates from migrations
# - Runs seed script (if exists)
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. Database Connection Error

**Error:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solutions:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list | grep postgres  # macOS
# Windows: Check Services in Control Panel

# Start PostgreSQL
sudo systemctl start postgresql  # Linux
brew services start postgresql@15  # macOS

# Verify connection
psql -U postgres -d postgres

# Check DATABASE_URL in .env.local
# Format: postgresql://user:password@host:port/database
```

#### 2. JWT_SECRET Not Configured

**Error:** `Error: JWT_SECRET not configured`

**Solution:**
```bash
# Check .env.local exists
cat .env.local

# Verify JWT_SECRET is set
grep JWT_SECRET .env.local

# If missing, add it:
echo 'JWT_SECRET="your-secret-here"' >> .env.local
```

#### 3. Module Not Found

**Error:** `Module not found: Can't resolve '@/...'`

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild Prisma client
npx prisma generate

# Check tsconfig.json has path mapping
cat tsconfig.json | grep '"@/*"'
```

#### 4. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solutions:**
```bash
# Linux/Mac: Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Windows: Find and kill process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm run dev
```

#### 5. Prisma Client Generation Failed

**Error:** `Error: Prisma Client failed to generate`

**Solutions:**
```bash
# Regenerate Prisma client
npx prisma generate --force

# Check schema syntax
npx prisma validate

# View schema issues
cat prisma/schema.prisma | grep -n "@@"
```

---

## ⚡ Performance Optimization

### Frontend Optimization

```bash
# Build analysis
npm run build

# Check bundle size
npx next/analyze

# Generate Lighthouse report
# Use Chrome DevTools → Lighthouse tab
```

### Database Optimization

```sql
-- Add indexes for frequently filtered fields
CREATE INDEX idx_college_location ON college(location);
CREATE INDEX idx_college_rank ON college(rank);
CREATE INDEX idx_saved_user_id ON saved_college(user_id);
```

### Environment Variables for Production

```env
# Disable Next.js debug output
NEXT_TELEMETRY_DISABLED=1

# Enable compression
COMPRESS=true

# Database connection pooling
DATABASE_POOL_SIZE=20
DATABASE_TIMEOUT=10000
```

### Caching Strategy

```typescript
// Add revalidation to static pages
export const revalidatetime = 3600 // 1 hour

// Use React Query for data caching
import { useQuery } from '@tanstack/react-query'
const { data } = useQuery(['colleges'], fetchColleges)
```

---

## 📊 Monitoring & Logging

### Setup Error Tracking (Optional)

```bash
# Install Sentry
npm install @sentry/nextjs

# Configure in next.config.js
# See Sentry documentation
```

### View Production Logs

```bash
# On Vercel
# Dashboard → [Project] → Logs

# On self-hosted with PM2
pm2 logs college-discovery

# On self-hosted with systemd
sudo journalctl -u college-discovery -f
```

---

## ✅ Pre-Deployment Checklist

- [ ] Environment variables configured (.env.production.local)
- [ ] Database migrations applied
- [ ] SSL certificate installed
- [ ] Backups configured
- [ ] Monitoring setup
- [ ] Error tracking enabled
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Logging configured
- [ ] Dependencies updated and secured
- [ ] Tests passing
- [ ] Build successful

---

## 🔒 Security Checklist

- [ ] JWT_SECRET is strong (32+ characters, random)
- [ ] Database password is strong
- [ ] HTTPS/SSL enabled
- [ ] Environment variables not in git
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection enabled (React)
- [ ] CSRF tokens implemented
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] Dependency vulnerabilities checked
- [ ] Admin routes protected
- [ ] Sensitive data not logged

---

**Last Updated:** May 26, 2026
