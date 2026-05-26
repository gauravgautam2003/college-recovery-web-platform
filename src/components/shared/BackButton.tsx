"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
    fallbackHref = "/",
    label = "Back",
    className = "",
}: {
    fallbackHref?: string;
    label?: string;
    className?: string;
}) {
    const router = useRouter();

    function goBack() {
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
            return;
        }

        router.push(fallbackHref);
    }

    return (
        <button
            type="button"
            onClick={goBack}
            className={`inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-[#eff4ff] hover:text-[#3525cd] ${className}`}
        >
            <ArrowLeft className="h-4 w-4" />
            {label}
        </button>
    );
}
