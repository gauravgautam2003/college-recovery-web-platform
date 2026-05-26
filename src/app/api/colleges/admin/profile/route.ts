/**
 * College Admin Profile API Route
 * Handles college profile updates by college administrators
 * 
 * Endpoints:
 * - GET /api/colleges/admin/profile - Get current college's profile
 * - PUT /api/colleges/admin/profile - Update college profile
 * - PATCH /api/colleges/admin/profile - Partial update of college profile
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { collegeUpdateSchema } from "@/lib/validators";
import { replaceCollege, findCollegeById } from "@/backend/repositories/college.repository";
import { getBearerToken, verifyToken } from "@/lib/auth";

/**
 * GET /api/colleges/admin/profile
 * Retrieves the current authenticated college's profile
 * 
 * @requires Authentication token from college admin
 * @returns College profile information
 */
export async function GET() {
    try {
        // Get authentication token from request headers
        const token = await getBearerToken();

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized - No authentication token provided" },
                { status: 401 }
            );
        }

        // Verify token and extract college admin info
        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: "Unauthorized - Invalid or expired token" },
                { status: 401 }
            );
        }

        // For now, using userId as collegeId in the token
        // In production, you'd need separate token structure for college admins
        const college = findCollegeById(payload.userId);

        if (!college) {
            return NextResponse.json(
                { error: "College profile not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: college,
            message: "College profile retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching college profile:", error);
        return NextResponse.json(
            { error: "Internal server error while fetching college profile" },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/colleges/admin/profile
 * Updates the entire college profile (requires all fields)
 * 
 * @requires Authentication token from college admin
 * @body Complete college profile data
 * @returns Updated college profile
 */
export async function PUT(request: NextRequest) {
    try {
        // Get authentication token
        const token = await getBearerToken();

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized - Authentication required" },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: "Unauthorized - Invalid token" },
                { status: 401 }
            );
        }

        // Parse request body
        const body = await request.json().catch(() => null);

        if (!body) {
            return NextResponse.json(
                { error: "Invalid request body - JSON required" },
                { status: 400 }
            );
        }

        // Validate against schema
        const parsed = collegeUpdateSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: parsed.error.issues,
                },
                { status: 400 }
            );
        }

        // Update college profile
        const updatedCollege = replaceCollege(payload.userId, parsed.data);

        if (!updatedCollege) {
            return NextResponse.json(
                { error: "College not found or could not be updated" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: updatedCollege,
            message: "College profile updated successfully",
        });
    } catch (error) {
        console.error("Error updating college profile:", error);
        return NextResponse.json(
            { error: "Internal server error while updating profile" },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/colleges/admin/profile
 * Partially updates college profile (only provided fields)
 * 
 * @requires Authentication token from college admin
 * @body Partial college profile data (any combination of fields)
 * @returns Updated college profile
 */
export async function PATCH(request: NextRequest) {
    try {
        // Validate authentication
        const token = await getBearerToken();

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized - Authentication required" },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json(
                { error: "Unauthorized - Invalid or expired token" },
                { status: 401 }
            );
        }

        // Parse and validate request body
        const body = await request.json().catch(() => null);

        if (!body) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        // Validate using schema (all fields optional for PATCH)
        const parsed = collegeUpdateSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: parsed.error.issues,
                },
                { status: 400 }
            );
        }

        // Get existing college
        const existingCollege = findCollegeById(payload.userId);
        if (!existingCollege) {
            return NextResponse.json(
                { error: "College not found" },
                { status: 404 }
            );
        }

        // Merge with existing data and update
        const updatedCollege = replaceCollege(payload.userId, parsed.data);

        if (!updatedCollege) {
            return NextResponse.json(
                { error: "Failed to update college profile" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            data: updatedCollege,
            message: "College profile updated successfully",
        });
    } catch (error) {
        console.error("Error in PATCH /api/colleges/admin/profile:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
