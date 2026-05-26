import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(2).max(80),
    email: z.string().email(),
    password: z.string().min(6),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const authSchema = z.discriminatedUnion("mode", [
    signupSchema.extend({ mode: z.literal("signup") }),
    loginSchema.extend({ mode: z.literal("login") }),
]);

export const collegeQuerySchema = z.object({
    search: z.string().optional(),
    location: z.string().optional(),
    course: z.string().optional(),
    maxFee: z.coerce.number().positive().optional(),
    rank: z.coerce.number().int().positive().optional(),
    sort: z.enum(["rank", "rating", "fees", "package"]).optional(),
});

export const collegeCreateSchema = z.object({
    name: z.string().min(2),
    shortName: z.string().optional(),
    location: z.string().min(2),
    type: z.string().min(2),
    description: z.string().min(20),
    rank: z.number().int().positive().optional(),
    rating: z.number().min(0).max(5).optional(),
    fees: z.string().min(2),
    feesValue: z.number().int().nonnegative(),
    averagePackage: z.string().min(2),
    averagePackageValue: z.number().int().nonnegative(),
    courses: z.array(z.string().min(1)).default([]),
    image: z.string().url().optional().or(z.literal("")),
    acceptanceRate: z.string().optional(),
    placementRate: z.string().optional(),
    topRecruiters: z.array(z.string().min(1)).default([]),
    facilities: z.array(z.string().min(1)).default([]),
    admissionDeadline: z.string().optional(),
    contactEmail: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
    website: z.string().url().optional().or(z.literal("")),
    establishedAt: z.number().int().positive().optional(),
});

export const compareSchema = z.object({
    collegeIds: z.array(z.string().min(1)).min(2).max(4),
});

export const savedCollegeSchema = z.object({
    collegeId: z.string().min(1),
});

export const applicationCreateSchema = z.object({
    collegeId: z.string().min(1, "College is required"),
    studentName: z.string().min(2, "Student name is required").max(80),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(8, "Phone number is required").max(20),
    course: z.string().min(2, "Course preference is required").max(120),
    message: z.string().max(500).optional(),
});

export const profileUpdateSchema = z.object({
    name: z.string().min(2).max(80).optional(),
    targetCourse: z.string().max(80).optional(),
    preferredLocation: z.string().max(80).optional(),
});

// College Admin Authentication Schemas
export const collegeAdminLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// College Profile Update Schema - used by college admins to update their college info
export const collegeUpdateSchema = z.object({
    name: z.string().min(2, "College name must be at least 2 characters").optional(),
    shortName: z.string().min(1, "Short name required").optional(),
    location: z.string().min(2, "Location must be specified").optional(),
    type: z.string().min(2, "College type required").optional(),
    description: z.string().min(20, "Description must be at least 20 characters").optional(),
    rank: z.number().int().positive("Rank must be positive").optional(),
    rating: z.number().min(0, "Rating must be between 0-5").max(5, "Rating must be between 0-5").optional(),
    fees: z.string().min(1, "Fee information required").optional(),
    feesValue: z.number().int().nonnegative("Fee value must be non-negative").optional(),
    averagePackage: z.string().min(1, "Package information required").optional(),
    averagePackageValue: z.number().int().nonnegative("Package value must be non-negative").optional(),
    courses: z.array(z.string().min(1)).optional(),
    image: z.string().url("Invalid image URL").optional(),
    acceptanceRate: z.string().optional(),
    placementRate: z.string().optional(),
    topRecruiters: z.array(z.string().min(1)).optional(),
    facilities: z.array(z.string().min(1)).optional(),
    admissionDeadline: z.string().optional(),
    contactEmail: z.string().email("Invalid contact email").optional(),
    phone: z.string().optional(),
    website: z.string().url("Invalid website URL").optional(),
    establishedAt: z.number().int().positive("Established year must be positive").optional(),
});

// College Owner Authentication Schemas
export const collegeOwnerSignupSchema = z.object({
    name: z.string().min(2, "Organization name must be at least 2 characters").max(80, "Name too long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const collegeOwnerLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const collegeOwnerAuthSchema = z.discriminatedUnion("mode", [
    collegeOwnerSignupSchema.extend({ mode: z.literal("signup") }),
    collegeOwnerLoginSchema.extend({ mode: z.literal("login") }),
]);
