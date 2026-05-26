/**
 * Colleges API Route Handler
 * 
 * Base endpoint: /api/colleges
 * 
 * Provides RESTful API endpoints for:
 * - GET: Search and filter colleges
 * - POST: Create new college (admin only)
 */

import { NextResponse } from "next/server";
import { collegeCreateSchema, collegeQuerySchema } from "@/lib/validators";
import { createCollege, getColleges } from "@/services/college.service";

/**
 * GET /api/colleges
 * 
 * Retrieves colleges with optional filters and sorting
 * 
 * Query Parameters:
 * - search (string): Search by name, location, course, or description
 * - location (string): Filter by location
 * - course (string): Filter by course offered
 * - maxFee (number): Maximum fee value
 * - rank (number): Maximum rank (lower is better)
 * - sort (string): Sort by "rank", "rating", "fees", or "package"
 * 
 * @example
 * ```
 * GET /api/colleges?location=Delhi&sort=rank
 * GET /api/colleges?search=engineering&maxFee=2000000
 * ```
 * 
 * @returns JSON with colleges array and count metadata
 */
export async function GET(request: Request) {
    try {
        // Parse and validate query parameters
        const { searchParams } = new URL(request.url);
        const parsed = collegeQuerySchema.safeParse(Object.fromEntries(searchParams));

        // Return error if validation fails
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: parsed.error.issues[0]?.message ?? "Invalid query parameters",
                    details: parsed.error.issues,
                },
                { status: 400 }
            );
        }

        // Fetch colleges with filters
        const colleges = await getColleges(parsed.data);

        // Return success response with colleges and metadata
        return NextResponse.json({
            data: colleges,
            meta: {
                count: colleges.length,
                filters: parsed.data,
            },
        });
    } catch (error) {
        console.error("Error in GET /api/colleges:", error);
        return NextResponse.json(
            { error: "Internal server error while fetching colleges" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/colleges
 * 
 * Creates a new college in the system
 * Note: In production, this should require college admin authentication
 * 
 * Request Body:
 * {
 *   "name": "string (required)",
 *   "location": "string (required)",
 *   "type": "string (required)",
 *   "description": "string (required, min 20 chars)",
 *   "rank": "number (optional)",
 *   "rating": "number 0-5 (optional)",
 *   "fees": "string (required)",
 *   "feesValue": "number (required)",
 *   "averagePackage": "string (required)",
 *   "averagePackageValue": "number (required)",
 *   "courses": "array<string> (optional)",
 *   "image": "url (optional)"
 * }
 * 
 * @example
 * ```json
 * {
 *   "name": "New Institute of Technology",
 *   "location": "Delhi",
 *   "type": "Private University",
 *   "description": "A premier institute for engineering education...",
 *   "fees": "Rs. 10 Lakhs",
 *   "feesValue": 1000000,
 *   "averagePackage": "Rs. 15 LPA",
 *   "averagePackageValue": 1500000,
 *   "courses": ["B.Tech", "M.Tech", "MBA"]
 * }
 * ```
 * 
 * @returns JSON with created college object (status 201)
 */
export async function POST(request: Request) {
    try {
        // Parse request body
        const body = await request.json().catch(() => null);

        // Validate body
        if (!body) {
            return NextResponse.json(
                { error: "Invalid request body - JSON required" },
                { status: 400 }
            );
        }

        // Validate against schema
        const parsed = collegeCreateSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: parsed.error.issues[0]?.message ?? "Validation failed",
                    details: parsed.error.issues,
                },
                { status: 400 }
            );
        }

        // Create college
        const college = await createCollege(parsed.data);

        // Return created college with 201 status
        return NextResponse.json(
            {
                data: college,
                message: "College created successfully.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in POST /api/colleges:", error);
        return NextResponse.json(
            { error: "Internal server error while creating college" },
            { status: 500 }
        );
    }
}
