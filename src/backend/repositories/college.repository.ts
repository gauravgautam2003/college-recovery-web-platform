/**
 * College Repository
 * 
 * Data access layer for college operations
 * Handles all CRUD operations on college data
 * 
 * In production, this would interact with a database via Prisma
 * Currently uses in-memory store for demonstration
 */

import { store } from "@/lib/store";
import type { College } from "@/types/college";

/**
 * Find all colleges in the store
 * 
 * @returns Array of all colleges
 * @example
 * ```typescript
 * const colleges = findColleges();
 * ```
 */
export function findColleges() {
    return store.colleges;
}

/**
 * Find a college by its ID
 * 
 * @param id - College ID to search for
 * @returns College object if found, null otherwise
 * @example
 * ```typescript
 * const college = findCollegeById("iit-delhi");
 * ```
 */
export function findCollegeById(id: string) {
    return store.colleges.find((college) => college.id === id) ?? null;
}

/**
 * Insert a new college into the store
 * 
 * @param college - College object to insert
 * @returns The inserted college
 * @example
 * ```typescript
 * const newCollege = insertCollege({
 *   id: "new-college",
 *   name: "New College",
 *   location: "Mumbai",
 *   ...
 * });
 * ```
 */
export function insertCollege(college: College) {
    store.colleges.push(college);
    return college;
}

/**
 * Update an existing college
 * Replaces the college at the given ID with merged data
 * 
 * @param id - College ID to update
 * @param input - Partial college data to merge
 * @returns Updated college or null if not found
 * @example
 * ```typescript
 * const updated = replaceCollege("iit-delhi", {
 *   rating: 4.9,
 *   averagePackageValue: 2500000
 * });
 * ```
 */
export function replaceCollege(id: string, input: Partial<College>) {
    // Find the college index in the array
    const index = store.colleges.findIndex((college) => college.id === id);

    // Return null if college not found
    if (index === -1) {
        return null;
    }

    // Merge existing college data with new input
    store.colleges[index] = { ...store.colleges[index], ...input, id };
    return store.colleges[index];
}

/**
 * Remove a college from the store
 * 
 * @param id - College ID to remove
 * @returns true if removed, false if not found
 * @example
 * ```typescript
 * const removed = removeCollege("iit-delhi");
 * ```
 */
export function removeCollege(id: string) {
    // Find the college index
    const index = store.colleges.findIndex((college) => college.id === id);

    // Return false if not found
    if (index === -1) {
        return false;
    }

    // Remove college from array
    store.colleges.splice(index, 1);
    return true;
}
