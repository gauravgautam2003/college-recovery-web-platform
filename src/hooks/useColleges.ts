/**
 * useColleges Hook
 * 
 * Custom React hook for fetching and filtering colleges
 * Handles loading states, error management, and data fetching
 * 
 * Usage:
 * ```typescript
 * const { colleges, loading, error } = useColleges({ location: "Delhi", sort: "rank" });
 * ```
 */

"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { College } from "@/types/college";

/**
 * College filter parameters
 */
type CollegeFilters = {
    search?: string;              // Search query
    location?: string;            // Filter by location
    course?: string;              // Filter by course
    maxFee?: number;              // Maximum fee filter
    rank?: number;                // Maximum rank filter
    sort?: "rank" | "rating" | "fees" | "package"; // Sorting preference
};

/**
 * Fetch colleges from API with filters
 * 
 * Features:
 * - Builds query parameters from filter object
 * - Handles loading and error states
 * - Cancels previous requests if filters change
 * - Shows error toast notifications
 * - Memoizes query string to avoid unnecessary re-fetches
 * 
 * @param filters - Filter options for college search
 * @returns Object with colleges array, loading state, and error message
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const { colleges, loading } = useColleges();
 * 
 * // With filters
 * const { colleges, loading, error } = useColleges({
 *   location: "Delhi",
 *   maxFee: 2000000,
 *   sort: "rating"
 * });
 * ```
 */
export function useColleges(filters: CollegeFilters = {}) {
    // State for colleges data, loading status, and errors
    const [colleges, setColleges] = useState<College[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Build query string from filter object
    // Memoized to prevent unnecessary re-renders
    const query = useMemo(() => {
        const params = new URLSearchParams();

        // Convert filter object to URL parameters
        Object.entries(filters).forEach(([key, value]) => {
            // Skip undefined or empty values
            if (value !== undefined && value !== "") {
                params.set(key, String(value));
            }
        });

        return params.toString();
    }, [filters]);

    // Fetch colleges when filters change
    useEffect(() => {
        // Create AbortController for canceling requests
        const controller = new AbortController();

        /**
         * Fetch colleges from API
         */
        async function loadColleges() {
            setLoading(true);
            setError(null);

            try {
                // Build API URL with query parameters
                const url = `/api/colleges${query ? `?${query}` : ""}`;

                // Fetch from API
                const response = await fetch(url, {
                    signal: controller.signal, // Allow request cancellation
                });

                // Parse response
                const payload = await response.json();

                // Check for errors
                if (!response.ok) {
                    throw new Error(payload.error ?? "Unable to load colleges.");
                }

                // Update state with colleges data
                setColleges(payload.data);
            } catch (requestError) {
                // Ignore errors from aborted requests
                if (!controller.signal.aborted) {
                    const message = requestError instanceof Error ? requestError.message : "Unable to load colleges.";
                    setError(message);
                    toast.error(message);
                }
            } finally {
                // Update loading state only if request wasn't aborted
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadColleges();

        // Cleanup: cancel request if component unmounts or filters change
        return () => controller.abort();
    }, [query]); // Re-fetch when query changes

    return { colleges, loading, error };
}
