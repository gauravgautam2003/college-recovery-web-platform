# 📑 Quick Reference Guide

Fast lookup for common tasks and features.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your database and JWT secret

# 3. Setup database
npx prisma migrate dev

# 4. Start development server
npm run dev

# Open http://localhost:3000
```

---

## 🔗 Important URLs

| Resource | URL |
|----------|-----|
| Local App | http://localhost:3000 |
| Prisma Studio | http://localhost:5555 |
| API Docs | See `/src/backend/README.md` |
| Main Docs | See `README.md` |

---

## 📂 Key File Locations

| Purpose | Location |
|---------|----------|
| College Edit Form | `src/components/college/CollegeEditForm.tsx` |
| College Profile Page | `src/app/colleges/profile/page.tsx` |
| College Admin API | `src/app/api/colleges/admin/profile/route.ts` |
| Validators | `src/lib/validators.ts` |
| Services | `src/services/` |
| Components | `src/components/` |
| Hooks | `src/hooks/` |

---

## 🔑 Environment Variables

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/college_discovery
JWT_SECRET=your-secret-key-min-32-chars
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 📋 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run lint            # Run linter

# Database
npx prisma migrate dev  # Create migration
npx prisma studio      # Open database UI
npx prisma db push     # Sync schema

# Build
npm run build           # Build for production
npm run start           # Start production server

# Utilities
npx tsc --noEmit       # Type check
npm ls                 # Check dependencies
```

---

## 🧪 Testing API Endpoints

```bash
# Get all colleges
curl http://localhost:3000/api/colleges?location=Delhi

# Login
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass","mode":"login"}'

# Save college
curl -X POST http://localhost:3000/api/saved \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"collegeId":"iit-delhi"}'
```

---

## 🎯 Common Tasks

### Add a New College
```typescript
// POST /api/colleges
{
  "name": "New College",
  "location": "City",
  "type": "Private University",
  "description": "Description here...",
  "fees": "Rs. 10 Lakhs",
  "feesValue": 1000000,
  "averagePackage": "Rs. 15 LPA",
  "averagePackageValue": 1500000
}
```

### Update College Profile (Admin)
```typescript
// PATCH /api/colleges/admin/profile
{
  "rating": 4.9,
  "averagePackageValue": 2500000,
  "topRecruiters": ["Google", "Microsoft"]
}
```

### Search Colleges
```
GET /api/colleges?search=engineering&location=Delhi&sort=rating
```

---

## 🐛 Debugging Tips

### Check Database Connection
```bash
psql -U postgres -d college_discovery
```

### View Database with UI
```bash
npx prisma studio
```

### Check Logs
```bash
# See API errors
# Terminal: npm run dev output

# View request details
# Browser DevTools → Network tab
```

### Verify Environment
```bash
# Check if .env.local exists and has values
cat .env.local

# Test database connection
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"
```

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `src/backend/README.md` | API reference |
| `SETUP_AND_DEPLOYMENT.md` | Setup guide |
| `FEATURES.md` | Feature list |
| `CONTRIBUTING.md` | Developer guide |
| `PROJECT_ENHANCEMENTS_SUMMARY.md` | What was added |

---

## ✅ Pre-Launch Checklist

- [ ] Environment variables set in `.env.local`
- [ ] Database connection verified
- [ ] `npm install` completed successfully
- [ ] Database migrations run: `npx prisma migrate dev`
- [ ] Development server starts: `npm run dev`
- [ ] Can access http://localhost:3000
- [ ] API endpoints responding
- [ ] Forms working correctly
- [ ] No console errors

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `PORT=3001 npm run dev` |
| Database not found | Run `npx prisma migrate dev` |
| Module not found | Delete `node_modules`, run `npm install` |
| Types not found | Run `npx prisma generate` |
| .env not loaded | Restart dev server after updating .env.local |

---

## 🎓 Learning Resources

### For Next.js
- https://nextjs.org/docs
- https://nextjs.org/learn

### For React
- https://react.dev
- https://react.dev/learn

### For TypeScript
- https://www.typescriptlang.org/docs

### For Prisma
- https://www.prisma.io/docs
- https://www.prisma.io/tutorials

### For Tailwind
- https://tailwindcss.com/docs

---

**Last Updated:** May 26, 2026
