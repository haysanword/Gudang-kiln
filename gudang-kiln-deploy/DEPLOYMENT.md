# Gudang Kiln - Deployment Guide

## 🚀 Deploying to Vercel

### Prerequisites
- Vercel account (free tier available)
- Turso account (free tier available)
- GitHub repository (optional but recommended)

---

## Step 1: Prepare Production Database

### Create Production Turso Database

```bash
# Login to Turso
turso auth login

# Create production database
turso db create gudang-kiln-production --location sin

# Get database URL
turso db show gudang-kiln-production --url

# Create authentication token
turso db tokens create gudang-kiln-production
```

**Save these credentials** - you'll need them for Vercel:
- `TURSO_DATABASE_URL`: The database URL (starts with `libsql://`)
- `TURSO_AUTH_TOKEN`: The authentication token

### Run Migrations on Production Database

```bash
# Set production credentials temporarily
export TURSO_DATABASE_URL="your-production-url"
export TURSO_AUTH_TOKEN="your-production-token"

# Run migrations
bun run db:push

# Seed production data (optional)
bun run db:seed
```

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

### Option B: Deploy via GitHub Integration

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure build settings (auto-detected for Next.js)
6. Add environment variables (see below)
7. Click "Deploy"

---

## Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```env
# Production Database
TURSO_DATABASE_URL=libsql://gudang-kiln-production-[your-org].aws-ap-northeast-1.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...

# Application Config
NEXT_PUBLIC_APP_NAME=Gudang Kiln

# Super Admin PIN (hashed - generate using lib/auth.ts)
SUPER_ADMIN_PIN_HASH=$2a$10$...

# Optional: Error Monitoring
# SENTRY_DSN=https://...
```

### Generating PIN Hash

Run locally to get hashed PIN:

```bash
bun tsx -e "import { hashPin } from './lib/auth'; hashPin('YOUR_PIN').then(console.log)"
```

---

## Step 4: Verify Production Build

Test build locally before deploying:

```bash
# Clean install
rm -rf node_modules .next
bun install

# Production build
bun run build

# Test production server
bun run start
```

Check for:
- ✅ Build completes without errors
- ✅ No TypeScript errors
- ✅ All pages render correctly
- ✅ Database connection works

---

## Step 5: Post-Deployment Verification

After deployment, verify:

### 1. Application Access
Visit your Vercel URL: `https://your-app.vercel.app`

### 2. Database Connection
- Navigate to Dashboard
- Verify statistics display correctly
- Check if seeded data appears

### 3. Authentication
- Test PIN login for Super Admin
- Verify role-based access restrictions

### 4. Core Features
- [ ] Create transaction (IN/OUT)
- [ ] View materials list
- [ ] Run stock audit
- [ ] Generate reports
- [ ] Update app settings

---

## Production Considerations

### Security Checklist
- ✅ Environment variables set correctly
- ✅ PIN hash used (not plain text)
- ✅ HTTPS enabled (automatic on Vercel)
- ✅ API routes protected by middleware
- ✅ Input validation active (Zod schemas)

### Performance Optimization
- ✅ Static assets cached
- ✅ Images optimized
- ✅ Bundle size < 500KB (first load)
- ✅ Edge runtime for API routes (optional)

### Monitoring Setup
```bash
# Optional: Add Vercel Analytics
bun add @vercel/analytics

# Add to app/layout.tsx:
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Rollback Strategy

If deployment fails:

```bash
# Revert to previous deployment
vercel rollback

# Or redeploy specific commit
vercel --prod [commit-hash]
```

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., `gudang.yourcompany.com`)
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning (~5 minutes)

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Ensure TypeScript compiles locally

### Database Connection Error
- Verify `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are correct
- Check Turso database is in correct region
- Ensure migrations ran successfully

### 500 Internal Server Error
- Check Vercel function logs
- Verify environment variables loaded
- Test API routes individually

---

## Cost Estimate

**Free Tier Usage**:
- Vercel: Free (Hobby plan)
- Turso: Free (500 databases, 10GB storage)
- **Total: $0/month**

**Upgrade Recommendations**:
- Vercel Pro ($20/month) - for team collaboration
- Turso Scaler ($29/month) - for higher traffic

---

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Turso Documentation](https://docs.turso.tech)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Deployment Status**: ⏳ Ready to Deploy
