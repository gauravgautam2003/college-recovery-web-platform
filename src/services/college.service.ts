/**
 * College Service
 * 
 * Core business logic for college-related operations
 * Handles filtering, searching, sorting, and CRUD operations for colleges
 * 
 * Features:
 * - Search colleges by name, location, course, or description
 * - Filter by location, course, fees, and ranking
 * - Sort by rank, rating, fees, or average package
 * - Get individual college details
 * - Create, update, and delete colleges
 */

import {
    findCollegeById,
    findColleges,
    insertCollege,
    removeCollege,
    replaceCollege,
} from "@/backend/repositories/college.repository";
import type { College } from "@/types/college";

/**
 * Filter options for college search
 */
type CollegeFilters = {
    search?: string;              // Search by name, short name, location, description, type
    location?: string;            // Filter by location
    course?: string;              // Filter by course offered
    maxFee?: number;              // Maximum fee value
    rank?: number;                // Maximum rank (lower is better)
    sort?: "rank" | "rating" | "fees" | "package"; // Sorting preference
};

/**
 * Get colleges with filters and sorting
 * 
 * @param filters - Filter and sorting options
 * @returns Array of colleges matching the criteria
 * 
 * @example
 * ```typescript
 * const colleges = await getColleges({
 *   search: "engineering",
 *   location: "Delhi",
 *   sort: "rank"
 * });
 * ```
 */
export async function getColleges(filters: CollegeFilters = {}): Promise<College[]> {
    // Normalize search input: trim and convert to lowercase for case-insensitive search
    const search = filters.search?.trim().toLowerCase();
    const location = filters.location?.trim().toLowerCase();
    const course = filters.course?.trim().toLowerCase();

    // Filter colleges based on provided criteria
    const results = findColleges().filter((college) => {
        // Search filter: match against name, short name, location, description, type
        const matchesSearch =
            !search ||
            [college.name, college.shortName, college.location, college.description, college.type]
                .filter(Boolean)
                .some((value) => value?.toLowerCase().includes(search));

        // Location filter: case-insensitive partial match
        const matchesLocation = !location || college.location.toLowerCase().includes(location);

        // Course filter: check if the course is in the college's courses array
        const matchesCourse = !course || college.courses?.some((item) => item.toLowerCase().includes(course));

        // Fee filter: check if college fee is within the maximum limit
        const matchesFee = !filters.maxFee || (college.feesValue ?? 0) <= filters.maxFee;

        // Rank filter: check if college rank is within the limit (or has no rank)
        const matchesRank = !filters.rank || (college.rank ?? Number.MAX_SAFE_INTEGER) <= filters.rank;

        // All filters must match for the college to be included
        return matchesSearch && matchesLocation && matchesCourse && matchesFee && matchesRank;
    });

    // Sort the filtered results based on the sorting preference
    return [...results].sort((left, right) => {
        if (filters.sort === "rating") return (right.rating ?? 0) - (left.rating ?? 0);
        if (filters.sort === "fees") return (left.feesValue ?? 0) - (right.feesValue ?? 0);
        if (filters.sort === "package") return (right.averagePackageValue ?? 0) - (left.averagePackageValue ?? 0);
        return (left.rank ?? Number.MAX_SAFE_INTEGER) - (right.rank ?? Number.MAX_SAFE_INTEGER); // Default: sort by rank
    });
}

/**
 * Get a single college by ID
 * 
 * @param id - College ID
 * @returns College object or null if not found
 * 
 * @example
 * ```typescript
 * const college = await getCollegeById("iit-delhi");
 * ```
 */
export async function getCollegeById(id: string): Promise<College | null> {
    return findCollegeById(id);
}

/**
 * Create a new college
 * 
 * Generates a unique ID from the college name (slugified)
 * Falls back to random UUID if name cannot be converted to ID
 * 
 * @param input - College data (without ID)
 * @returns Created college object with generated ID
 * 
 * @example
 * ```typescript
 * const newCollege = await createCollege({
 *   name: "New Institute",
 *   location: "Mumbai",
 *   type: "Private University",
 *   description: "A premier institute...",
 *   feesValue: 1000000,
 *   averagePackageValue: 800000
 * });
 * ```
 */
export async function createCollege(input: Omit<College, "id">): Promise<College> {
    // Generate ID from college name: convert to lowercase, replace non-alphanumeric with hyphens, remove leading/trailing hyphens
    const college = {
        ...input,
        id: input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID(),
    };
    return insertCollege(college);
}

/**
 * Update a college
 * 
 * Replaces the college with the new data (merge operation)
 * 
 * @param id - College ID
 * @param input - Partial college data to update
 * @returns Updated college object or null if not found
 * 
 * @example
 * ```typescript
 * const updated = await updateCollege("iit-delhi", {
 *   rating: 4.9,
 *   averagePackageValue: 2500000
 * });
 * ```
 */
export async function updateCollege(id: string, input: Partial<College>) {
    return replaceCollege(id, input);
}

/**
 * Delete a college
 * 
 * @param id - College ID
 * @returns true if deleted, false if not found
 * 
 * @example
 * ```typescript
 * const deleted = await deleteCollege("iit-delhi");
 * ```
 */
export async function deleteCollege(id: string) {
    return removeCollege(id);
}
