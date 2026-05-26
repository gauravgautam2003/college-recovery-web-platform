# EduVision AI - College Discovery Platform

EduVision AI is a full-stack college discovery website built with Next.js, TypeScript, Tailwind CSS, API routes, JWT authentication, Prisma schema support, and cloud image upload support. The platform serves two main users:

- Students who search, compare, save, and apply to colleges.
- College owners/admins who add college profiles, upload images, maintain listings, and review student applications.

The current implementation is production-structured and fully usable in local development. It uses an in-memory store for fast demo behavior and includes a Prisma PostgreSQL schema for the production persistence layer.

## Current Status

Working and visible in the UI:

- Student college discovery
- College detail pages
- Student profile update
- Saved colleges
- Compare page
- Student "How to Apply" page
- Application inquiry form
- Student application tracking dashboard
- College owner login/signup
- College owner dashboard
- Add college page
- Edit college page
- Cloudinary image upload signing endpoint
- College owner applications panel
- Safe system status page for `.env` configuration checks
- API routes for all major flows

Important production note:

The app currently stores runtime data in `src/lib/store.ts`. That means users, owner accounts, owner-created colleges, saved colleges, and applications reset when the dev server restarts. The database schema is ready in `prisma/schema.prisma`; the next production step is replacing the in-memory repositories with Prisma queries.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- React Hook Form
- React Hot Toast
- Zod validation
- JWT-style token helper
- bcryptjs password hashing
- Prisma schema for PostgreSQL
- Cloudinary signed uploads for college images

## Environment Variables

Create `.env` in the project root.

Required:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="a-long-random-secret-minimum-32-characters"
```

The app also supports the current local typo-compatible key:

```env
JWT_SECRETE="a-long-random-secret-minimum-32-characters"
```

Cloudinary image uploads:

```env
CLOUD_NAME="your-cloud-name"
CLOUD_API_KEY="your-api-key"
CLOUD_API_SECRET="your-api-secret"
```

Optional:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_ENABLE_COLLEGE_ADMIN="true"
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM=""
SENTRY_DSN=""
NEXT_PUBLIC_ANALYTICS_ID=""
```

Do not expose secret values in client UI. The app uses Cloudinary secrets only on the server in `/api/uploads/cloudinary-signature`.

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Verify production build:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Main Website Routes

### Public Student Routes

| Route | Purpose |
|---|---|
| `/` | Home page with discovery CTA and college admin CTA |
| `/colleges` | Browse/search/filter college listings |
| `/colleges/[id]` | College detail page with Apply Now |
| `/how-to-apply` | Student application guide |
| `/apply?collegeId=<id>` | Student application form |
| `/compare` | Compare colleges |
| `/login` | Student login |
| `/signup` | Student registration |

### Student Dashboard Routes

| Route | Purpose |
|---|---|
| `/saved` | Saved colleges |
| `/applications` | Track submitted admission applications |
| `/profile` | Update student name, target course, and preferred location |
| `/history` | Student history page |
| `/settings` | Student settings page |

### College Owner/Admin Routes

| Route | Purpose |
|---|---|
| `/college-owner` | College owner signup/login |
| `/college-owner/dashboard` | Owner dashboard |
| `/college-owner/add-college` | Add a full college profile |
| `/college-owner/edit-college/[id]` | Edit owned college listing |
| `/college-owner/applications` | Review student applications for owned colleges |
| `/college-owner/system` | Safe `.env` and service configuration status |

## Student Flow

1. Student opens `/colleges`.
2. Student filters by location, course, ranking, fee, or package.
3. Student opens a college detail page.
4. Student reviews courses, fees, placements, facilities, contact details, deadline, recruiters, and package.
5. Student clicks `Apply Now`.
6. Student submits the application form.
7. Application is stored through `/api/applications`.
8. College owner sees it in `/college-owner/applications`.

## College Owner Flow

1. Owner opens `/college-owner`.
2. Owner creates an account or logs in.
3. Owner lands on `/college-owner/dashboard`.
4. Owner clicks `Add College`.
5. Owner fills college details:
   - Name
   - Short name
   - Location
   - Type
   - Established year
   - Website
   - Description
   - Rank
   - Rating
   - Fees
   - Average package
   - Courses
   - Top recruiters
   - Facilities
   - Admission deadline
   - Contact email
   - Phone
   - Image URL or image upload
6. Owner submits listing.
7. Owner can edit, view, delete, or review applications.

## API Routes

### Auth

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth` | Student signup/login |
| `GET` | `/api/auth` | Get current student |
| `DELETE` | `/api/auth` | Logout |

Student auth payload:

```json
{
  "mode": "signup",
  "name": "Student Name",
  "email": "student@example.com",
  "password": "secret123"
}
```

```json
{
  "mode": "login",
  "email": "student@example.com",
  "password": "secret123"
}
```

### Colleges

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/colleges` | List colleges with filters |
| `POST` | `/api/colleges` | Create college through generic API |
| `GET` | `/api/colleges/[id]` | Get college detail |
| `PATCH` | `/api/colleges/[id]` | Update college |
| `DELETE` | `/api/colleges/[id]` | Delete college |

Supported query:

```txt
/api/colleges?search=iit&location=Delhi&course=B.Tech&maxFee=1000000&rank=10&sort=rating
```

### Applications

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/applications` | Submit student application inquiry |

Payload:

```json
{
  "collegeId": "college-id",
  "studentName": "Student Name",
  "email": "student@example.com",
  "phone": "9876543210",
  "course": "B.Tech CSE",
  "message": "I want admission details."
}
```

### College Owner

All owner college routes use:

```txt
Authorization: Bearer <college_owner_token>
```

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/college-owner` | Owner signup/login |
| `GET` | `/api/college-owner/colleges` | List owned colleges |
| `POST` | `/api/college-owner/colleges` | Add owned college |
| `GET` | `/api/college-owner/colleges/[id]` | Load owned college |
| `PATCH` | `/api/college-owner/colleges/[id]` | Update owned college |
| `DELETE` | `/api/college-owner/colleges/[id]` | Delete owned college |
| `GET` | `/api/college-owner/applications` | List applications for owned colleges |
| `GET` | `/api/system/status` | Safe environment/service status without exposing secrets |

Owner auth payload:

```json
{
  "mode": "signup",
  "name": "College Admissions Team",
  "email": "admin@college.edu",
  "password": "secret123"
}
```

```json
{
  "mode": "login",
  "email": "admin@college.edu",
  "password": "secret123"
}
```

### Uploads

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/uploads/cloudinary-signature` | Returns signed Cloudinary upload data |

This route requires a college owner token. It does not expose `CLOUD_API_SECRET` to the browser.

### Student Profile

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/users` | Get current student profile |
| `PATCH` | `/api/users` | Update student profile |

Payload:

```json
{
  "name": "Student Name",
  "targetCourse": "B.Tech CSE",
  "preferredLocation": "Bengaluru"
}
```

### Saved Colleges

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/saved` | Get saved colleges |
| `POST` | `/api/saved` | Save college |
| `DELETE` | `/api/saved?collegeId=<id>` | Remove saved college |

### Compare

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/compare?ids=id1,id2` | Compare colleges |
| `POST` | `/api/compare` | Compare colleges from JSON payload |

Payload:

```json
{
  "collegeIds": ["college-1", "college-2"]
}
```

## Project Structure

```txt
src/app                 Next.js pages and API routes
src/app/api             Backend route handlers
src/components          Reusable UI components
src/components/college  College cards, forms, filters, compare UI
src/components/navbar   Main navigation
src/components/dashboard Student dashboard shell
src/backend/repositories Data-access functions
src/services            Business logic
src/lib                 Auth, env, Prisma, store, validators
src/types               Shared TypeScript types
src/data                Mock college seed data
prisma/schema.prisma    PostgreSQL production schema
```

## Production Database Plan

The schema already includes:

- `User`
- `CollegeOwner`
- `CollegeAdmin`
- `College`
- `SavedCollege`

Recommended next database additions:

- `Application`
- `CollegeReview`
- `CollegeViewEvent`
- `UploadAsset`

To make the project fully persistent:

1. Run PostgreSQL.
2. Set `DATABASE_URL`.
3. Generate Prisma client:

```bash
npx prisma generate
```

4. Create migration:

```bash
npx prisma migrate dev --name init
```

5. Replace `src/lib/store.ts` usage inside repositories/services with Prisma queries.

## Security Notes

- Passwords are hashed with bcryptjs.
- JWT tokens are signed with `JWT_SECRET` or `JWT_SECRETE`.
- Student auth uses HTTP-only cookies.
- College owner APIs use bearer tokens stored client-side for this local implementation.
- Cloudinary secret is used only on the server.
- Zod validates API input.

Recommended production hardening:

- Move owner token storage to HTTP-only cookies.
- Add rate limiting on auth and write endpoints.
- Add CSRF protection for cookie-auth writes.
- Add moderation before owner-created colleges go public.
- Add audit logs for owner edits.
- Add database-backed sessions or refresh tokens.

## Known Limitations

- Runtime data is in-memory until repositories are connected to Prisma.
- Applications are visible only during the current server session.
- Image upload requires valid Cloudinary env keys.
- No payment gateway is implemented.
- No email notifications are sent yet, though SMTP env placeholders exist.
- No end-to-end tests are included yet.

## Recommended Next Features

- Prisma-backed persistent repositories
- Email notification to college owner after student application
- Student application tracking dashboard
- Admin verification workflow for colleges
- Reviews and ratings by verified students
- Brochure PDF upload
- Analytics for college views and applications
- Role-based admin dashboard
- Pagination for colleges and applications

## Useful Commands

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm run start
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

## Demo Checklist

Student:

1. Open `/colleges`.
2. Select a college.
3. Click `Apply Now`.
4. Submit the form.

College owner:

1. Open `/college-owner`.
2. Sign up or login.
3. Add a college.
4. Open `/college-owner/applications`.
5. Review submitted student applications.

Last updated: May 26, 2026
