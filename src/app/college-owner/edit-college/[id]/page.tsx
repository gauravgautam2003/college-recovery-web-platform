/**
 * College owner edit page.
 * Loads only owner-scoped colleges before allowing updates.
 */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CollegeEditForm from "@/components/college/CollegeEditForm";
import type { College } from "@/types/college";

export default function EditCollegePage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [college, setCollege] = useState<College | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCollege = async () => {
            const storedToken = localStorage.getItem("college_owner_token");
            if (!storedToken) {
                router.push("/college-owner");
                return;
            }

            setToken(storedToken);

            try {
                const response = await fetch(`/api/college-owner/colleges/${params.id}`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });

                if (response.status === 401) {
                    router.push("/college-owner");
                    return;
                }

                if (!response.ok) {
                    throw new Error("College could not be loaded");
                }

                const result = await response.json();
                setCollege(result.college);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to load college");
                router.push("/college-owner/dashboard");
            } finally {
                setLoading(false);
            }
        };

        loadCollege();
    }, [params.id, router]);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit College Details</h1>
                        <p className="text-slate-600">
                            Keep this listing current so students can choose with confidence.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        college &&
                        token && (
                            <CollegeEditForm
                                initialData={college}
                                submitUrl={`/api/college-owner/colleges/${college.id}`}
                                requestMethod="PATCH"
                                authToken={token}
                                submitLabel="Update College"
                                onCancel={() => router.push("/college-owner/dashboard")}
                                onSuccess={setCollege}
                            />
                        )
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
