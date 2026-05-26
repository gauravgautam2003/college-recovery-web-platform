# 🔧 Backend Documentation

Complete backend API documentation for EduVision AI College Discovery Platform.

---

## 📡 API Overview

### Base URL
```
http://localhost:3000/api
```

### Response Format

All API responses follow a consistent JSON format:

**Success Response (2xx):**
```json
{
  "data": { /* response data */ },
  "message": "Operation successful",
  "meta": { /* optional metadata */ }
}
```

**Error Response (4xx/5xx):**
```json
{
  "error": "Error message",
  "details": [ /* optional validation details */ ]
}
```

### Authentication

Two methods are supported:

1. **HTTP-only Cookie** (Recommended)
   - Token automatically sent with requests
   - Cookie name: `eduvision_token`
   - Secure and httpOnly flags enabled

2. **Authorization Header**
   ```
   Authorization: Bearer <token>
   ```

---

## 🔐 Authentication Endpoints

### POST /auth/signup

Register a new student user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "mode": "signup"
}
```

**Validation:**
- `name`: 2-80 characters
- `email`: Valid email format
- `password`: Minimum 6 characters

**Success Response (201):**
```json
{
  "data": {
    "id": "user-id-123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User registered successfully",
  "token": "eyJhbGc..."
}
```

### POST /auth/login

Authenticate a student user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123",
  "mode": "login"
}
```

**Success Response (200):**
```json
{
  "data": {
    "id": "user-id-123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Logged in successfully",
  "token": "eyJhbGc..."
}
```

---

## 🏫 College Endpoints

### GET /colleges

Get colleges with search, filters, and sorting.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by name, location, course |
| `location` | string | Filter by location |
| `course` | string | Filter by course |
| `maxFee` | number | Maximum fee value |
| `rank` | number | Maximum rank |
| `sort` | string | Sort by: rank, rating, fees, package |

**Example:**
```
GET /colleges?location=Delhi&sort=rank
```

### GET /colleges/{id}

Get college details by ID.

### POST /colleges

Create a new college (admin only).

### PATCH /colleges/admin/profile

Update college profile (college admin).

---

## 👥 User Profile Endpoints

### GET /users/profile

Get current user's profile.

### PUT /users/profile

Update user's profile.

---

## 💾 Saved Colleges Endpoints

### GET /saved

Get user's saved colleges.

### POST /saved

Save a college.

---

## 🔄 Comparison Endpoints

### POST /compare

Compare multiple colleges.

---

## 📁 Repository Structure

This folder contains backend-only modules used by Next.js API routes:

- **repositories/college.repository.ts** - College data access layer
  - `findColleges()` - Get all colleges
  - `findCollegeById(id)` - Get single college
  - `insertCollege(college)` - Create college
  - `replaceCollege(id, data)` - Update college
  - `removeCollege(id)` - Delete college

- **repositories/user.repository.ts** - User data access layer
  - `findUsers()` - Get all users
  - `findUserById(id)` - Get single user
  - `findUserByEmail(email)` - Get user by email
  - `insertUser(user)` - Create user
  - `replaceUser(id, data)` - Update user
  - `removeUser(id)` - Delete user

- **repositories/saved.repository.ts** - Saved colleges data access layer
  - `findSavedByUser(userId)` - Get saved colleges
  - `findSaved(userId, collegeId)` - Get specific saved item
  - `insertSaved(saved)` - Save college
  - `removeSaved(id)` - Remove saved college

---

## 🏗️ Architecture

### Layered Architecture

```
Request
  ↓
API Route (src/app/api/*)
  ↓
Service Layer (src/services/*)
  ↓
Repository Layer (src/backend/repositories/*)
  ↓
Data Store (In-memory or Database)
  ↓
Response
```

### Service Layer

Located in `src/services/`:
- **college.service.ts** - College business logic
- **user.service.ts** - User business logic
- **auth.service.ts** - Authentication logic

### Validators

Located in `src/lib/validators.ts`:
- Zod schemas for all request validation
- Type-safe validation with error messages
- Reusable across API routes

---

## 🔒 Error Handling

All API routes include comprehensive error handling:

1. **Input Validation** - Validates request body and query params
2. **Authentication Check** - Verifies token and user authorization
3. **Business Logic Validation** - Checks data constraints
4. **Database Error Handling** - Graceful error messages
5. **Error Logging** - Logs errors for debugging

---

## 📊 Performance Considerations

- **Query Optimization** - Efficient filtering and sorting
- **Caching** - Use React Query on client for data caching
- **Pagination** - Implement for large college lists (TODO)
- **Database Indexing** - Create indexes on frequently filtered fields

---

## 🚀 Deployment

API entry points remain in `src/app/api/*` because this project uses the Next.js App Router for production-ready serverless deployment.

---

**Last Updated:** May 26, 2026

---

## College Owner Listing API

College owner APIs let institutions submit and maintain the details students need for college selection. Every owner listing route requires:

```txt
Authorization: Bearer <token>
```

### POST /college-owner

Signup or login for a college owner.

Signup:

```json
{
  "mode": "signup",
  "name": "ABC Institute Admissions",
  "email": "admissions@example.edu",
  "password": "secure123"
}
```

Login:

```json
{
  "mode": "login",
  "email": "admissions@example.edu",
  "password": "secure123"
}
```

### GET /college-owner/colleges

Returns only colleges attached to the authenticated owner account.

### POST /college-owner/colleges

Creates an owner-scoped college listing. Accepted fields include:

- `name`, `shortName`, `location`, `type`, `description`
- `rank`, `rating`, `acceptanceRate`, `placementRate`
- `fees`, `feesValue`, `averagePackage`, `averagePackageValue`
- `courses`, `topRecruiters`, `facilities`
- `admissionDeadline`, `contactEmail`, `phone`, `website`, `image`, `establishedAt`

### GET /college-owner/colleges/{id}

Loads one college for editing. Returns `404` when the college does not belong to the authenticated owner.

### PATCH /college-owner/colleges/{id}

Updates an owned college listing. Empty optional fields are removed before validation to avoid failing optional URL/email inputs.

### DELETE /college-owner/colleges/{id}

Deletes an owned college listing.

## Current Storage Notes

The backend currently uses `src/lib/store.ts` for local in-memory development. The PostgreSQL production model is defined in `prisma/schema.prisma`; the next production step is replacing in-memory repository operations with Prisma queries.
