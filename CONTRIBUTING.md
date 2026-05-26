# 👨‍💻 Contributing Guide

Guidelines for contributing to EduVision AI College Discovery Platform.

---

## 📋 Table of Contents

1. [Code Style](#-code-style)
2. [Architecture](#-architecture)
3. [Component Development](#-component-development)
4. [API Development](#-api-development)
5. [Database Changes](#-database-changes)
6. [Testing](#-testing)
7. [Git Workflow](#-git-workflow)
8. [Commit Messages](#-commit-messages)
9. [Pull Requests](#-pull-requests)
10. [Code Review](#-code-review)

---

## 🎨 Code Style

### TypeScript Rules

**Use strict mode:**
```typescript
// ✅ Good
const college: College = { id: "iit-delhi", ... };

// ❌ Bad
const college = { id: "iit-delhi", ... };
```

**Use type safety:**
```typescript
// ✅ Good
function getCollege(id: string): College | null {
  return findCollegeById(id);
}

// ❌ Bad
function getCollege(id: any): any {
  return findCollegeById(id);
}
```

**Use interfaces for props:**
```typescript
// ✅ Good
interface CollegeCardProps {
  college: College;
  onSave?: (id: string) => void;
}

export function CollegeCard({ college, onSave }: CollegeCardProps) {
  ...
}

// ❌ Bad
export function CollegeCard(props: any) {
  ...
}
```

### File Naming

```
Components:      PascalCase.tsx      (CollegeCard.tsx)
Hooks:          camelCase.ts        (useColleges.ts)
Services:       camelCase.ts        (college.service.ts)
Types:          camelCase.ts        (college.ts)
API Routes:     route.ts            ([id]/route.ts)
Utilities:      camelCase.ts        (utils.ts)
```

### Comments

**Use JSDoc for functions:**
```typescript
/**
 * Get all colleges with optional filters
 * 
 * @param filters - Filter options for college search
 * @returns Array of colleges matching criteria
 * @throws Error if database query fails
 * 
 * @example
 * ```typescript
 * const colleges = await getColleges({ location: "Delhi" });
 * ```
 */
export async function getColleges(filters?: CollegeFilters): Promise<College[]> {
  // Implementation
}
```

**Use inline comments for complex logic:**
```typescript
// Only include facilities from the main campus
const facilities = college.facilities.filter(
  (facility) => facility.campus === "main"
);
```

---

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│     API Routes                      │ (src/app/api)
│     (Request handling)              │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│     Services                        │ (src/services)
│     (Business logic)                │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│     Repositories                    │ (src/backend/repositories)
│     (Data access)                   │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│     Data Store (Prisma)             │
│     (Database)                      │
└─────────────────────────────────────┘
```

### Folder Structure Conventions

**Create new features like this:**
```
features/
├── colleges/
│   ├── api/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   ├── components/
│   │   ├── CollegeCard.tsx
│   │   └── CollegeFilters.tsx
│   ├── services/
│   │   └── college.service.ts
│   ├── types/
│   │   └── college.ts
│   └── hooks/
│       └── useColleges.ts
```

---

## 🧩 Component Development

### Functional Components

```typescript
/**
 * College Card Component
 * Displays a single college in card format
 */
interface CollegeCardProps {
  college: College;
  onSave?: () => void;
}

export default function CollegeCard({ college, onSave }: CollegeCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{college.name}</h3>
      <p className="text-sm text-slate-600">{college.location}</p>
      <button onClick={onSave} className="mt-4">
        Save College
      </button>
    </article>
  );
}
```

### Hooks Pattern

```typescript
/**
 * Custom hook for fetching colleges
 */
export function useColleges(filters: CollegeFilters = {}) {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch logic
  }, [filters]);

  return { colleges, loading, error };
}
```

### Styling with Tailwind

```typescript
// ✅ Good: Use className with clsx for conditionals
import clsx from "clsx";

export function Button({ variant }: { variant: "primary" | "secondary" }) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-lg font-semibold",
        variant === "primary"
          ? "bg-blue-600 text-white"
          : "bg-slate-200 text-slate-900"
      )}
    >
      Click me
    </button>
  );
}

// ❌ Bad: Avoid inline styles
<button style={{ backgroundColor: "blue", color: "white" }}>
  Click me
</button>
```

---

## 📡 API Development

### Creating New API Route

1. **Create the route file:**
```typescript
// src/app/api/colleges/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Implementation
    return NextResponse.json({ data: [] });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

2. **Add validation:**
```typescript
import { collegeQuerySchema } from "@/lib/validators";

export async function GET(request: Request) {
  const parsed = collegeQuerySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams)
  );

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 }
    );
  }

  // Use parsed.data
}
```

3. **Handle authentication (if needed):**
```typescript
import { requireAuth } from "@/lib/auth";

export async function POST(request: Request) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Protected endpoint logic
}
```

### Error Handling

```typescript
export async function GET(request: Request) {
  try {
    // Success case
    const data = await fetchData();
    return NextResponse.json({ data });
  } catch (error) {
    // Log for debugging
    console.error("Error in GET /api/colleges:", error);

    // Return appropriate error
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## 🗄️ Database Changes

### Modifying Prisma Schema

1. **Edit schema.prisma:**
```prisma
// Add new field to College model
model College {
  id        String @id @default(cuid())
  name      String
  // Add this field:
  description String @db.Text
  // ...
}
```

2. **Create migration:**
```bash
npx prisma migrate dev --name add_college_description
```

3. **Update types:**
```typescript
// src/types/college.ts
export interface College {
  id: string;
  name: string;
  description: string; // Add here
  // ...
}
```

4. **Update services:**
```typescript
// src/services/college.service.ts
export async function updateCollege(id: string, data: Partial<College>) {
  // Update service to handle new field
}
```

### Best Practices

- ✅ Always create migrations for schema changes
- ✅ Add descriptive migration names
- ✅ Update types after schema changes
- ✅ Update validation schemas
- ✅ Test migrations locally first
- ❌ Never manually edit generated Prisma files
- ❌ Don't create database tables manually

---

## 🧪 Testing

### Component Testing

```typescript
import { render, screen } from "@testing-library/react";
import CollegeCard from "@/components/college/CollegeCard";

describe("CollegeCard", () => {
  it("renders college information", () => {
    const college = {
      id: "1",
      name: "Test College",
      location: "Test City",
    };

    render(<CollegeCard college={college} />);
    expect(screen.getByText("Test College")).toBeInTheDocument();
  });
});
```

### API Testing

```bash
# Using cURL
curl -X GET http://localhost:3000/api/colleges?location=Delhi

# Using Postman
# Import collection and test endpoints

# Using Insomnia
# Create requests in workspace
```

---

## 🔄 Git Workflow

### Branch Naming

```
feature/add-college-comparison
fix/search-filter-bug
docs/update-readme
refactor/reorganize-components
chore/update-dependencies
```

### Create Feature Branch

```bash
git checkout -b feature/add-college-comparison

# Make changes
git add .
git commit -m "feat: add college comparison feature"

# Push branch
git push origin feature/add-college-comparison
```

---

## 📝 Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions
- `chore`: Dependency updates

### Examples

```
feat(colleges): add college comparison feature

Add functionality to compare up to 4 colleges side-by-side
with detailed metrics comparison and export options.

Closes #123
```

```
fix(search): fix location filter not working

The location filter was not being applied correctly due to
case-sensitivity issues. Now converts all inputs to lowercase.

Fixes #456
```

---

## 🔀 Pull Requests

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation

## Testing
How to test the changes

## Checklist
- [ ] Code follows style guidelines
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

### PR Guidelines

1. **Keep PRs focused** - One feature per PR
2. **Add descriptive title** - Clear about what changes
3. **Link related issues** - Reference issue numbers
4. **Add tests** - Include test coverage
5. **Update docs** - Update README if needed
6. **Request review** - Get 2+ approvals before merge

---

## 👀 Code Review

### Reviewer Checklist

- [ ] Code quality and style
- [ ] Type safety (TypeScript)
- [ ] Error handling
- [ ] Performance implications
- [ ] Security vulnerabilities
- [ ] Documentation
- [ ] Test coverage
- [ ] Breaking changes

### Review Comments

```typescript
// ❌ Avoid this (unhelpful)
"This is wrong"

// ✅ Do this (helpful)
"This function modifies the input array. Consider creating
a new array instead to avoid side effects. For example:
const filtered = items.filter(i => i.active);"
```

---

## 🚀 Release Checklist

Before releasing a new version:

- [ ] All tests passing
- [ ] No console.log statements
- [ ] No development code
- [ ] Version bump in package.json
- [ ] CHANGELOG updated
- [ ] Documentation updated
- [ ] Security review completed
- [ ] Performance checked
- [ ] All migrations tested

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Last Updated:** May 26, 2026
