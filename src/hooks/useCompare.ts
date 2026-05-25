import { useEffect, useState } from "react";
import type { College } from "@/types/college";

export function useCompare() {
    const [comparison, setComparison] = useState<College[]>([]);

    useEffect(() => {
        setComparison([]);
    }, []);

    return { comparison };
}
