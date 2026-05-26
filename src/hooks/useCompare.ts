"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { College } from "@/types/college";

export function useCompare(collegeIds: string[]) {
    const [comparison, setComparison] = useState<College[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const ids = useMemo(() => collegeIds.filter(Boolean).join(","), [collegeIds]);

    useEffect(() => {
        if (!ids) {
            return;
        }

        const controller = new AbortController();

        async function loadComparison() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/compare?ids=${encodeURIComponent(ids)}`, {
                    signal: controller.signal,
                });
                const payload = await response.json();

                if (!response.ok) {
                    throw new Error(payload.error ?? "Unable to compare colleges.");
                }

                setComparison(payload.data);
            } catch (requestError) {
                if (!controller.signal.aborted) {
                    const message = requestError instanceof Error ? requestError.message : "Unable to compare colleges.";
                    setError(message);
                    toast.error(message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadComparison();
        return () => controller.abort();
    }, [ids]);

    return { comparison, loading, error };
}
