import { useEffect, useState } from "react";
import type { College } from "@/types/college";

export function useColleges() {
    const [colleges, setColleges] = useState<College[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return { colleges, loading };
}
