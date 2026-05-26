/**
 * College owner add page.
 * Colleges submit verified listing details here so students can compare practical facts.
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CollegeEditForm from "@/components/college/CollegeEditForm";
import BackButton from "@/components/shared/BackButton";
import type { College } from "@/types/college";

export default function AddCollegePage() {
    const router = useRouter();
    const [token] = useState<string | null>(() =>
        typeof window === "undefined" ? null : localStorage.getItem("college_owner_token")
    );

    useEffect(() => {
        if (!token) {
            router.push("/college-owner");
        }
    }, [router, token]);

    const handleSuccess = (college: College) => {
        router.push(`/college-owner/edit-college/${college.id}`);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <BackButton fallbackHref="/college-owner/dashboard" className="mb-6" />
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Add College Details</h1>
                        <p className="text-slate-600">
                            Fill accurate academics, fees, placement, and admission details for student decision-making.
                        </p>
                    </motion.div>

                    {token && (
                        <CollegeEditForm
                            submitUrl="/api/college-owner/colleges"
                            requestMethod="POST"
                            authToken={token}
                            submitLabel="Submit College"
                            onCancel={() => router.push("/college-owner/dashboard")}
                            onSuccess={handleSuccess}
                        />
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
