/**
 * College Profile Page
 * This page allows college administrators to view and edit their college's profile
 * 
 * Features:
 * - Display current college information
 * - Edit college details with comprehensive form
 * - Update college rankings, facilities, courses, and contact information
 * - Real-time validation and error handling
 * 
 * Path: /colleges/profile or /colleges/[id]/edit
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CollegeEditForm from "@/components/college/CollegeEditForm";
import type { College } from "@/types/college";

export default function CollegeProfilePage() {
    // State management
    const [college, setCollege] = useState<College | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const router = useRouter();
    // Load college profile on component mount
    useEffect(() => {
        const loadCollegeProfile = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch college profile from API
                const response = await fetch("/api/colleges/admin/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 401) {
                    setIsAuthenticated(false);
                    toast.error("Please log in as a college admin");
                    router.push("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to load college profile");
                }

                const data = await response.json();
                setCollege(data.data);
                setIsAuthenticated(true);
            } catch (err) {
                const message = err instanceof Error ? err.message : "An error occurred";
                setError(message);
                toast.error(message);
            } finally {
                setLoading(false);
            }
        };

        loadCollegeProfile();
    }, [router]);

    /**
     * Handle successful profile update
     */
    const handleSuccess = (updatedCollege: College) => {
        setCollege(updatedCollege);
        setSuccessMessage("College profile updated successfully!");

        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(null), 5000);
    };

    // Loading state
    if (loading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
                    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                                <p className="text-slate-600">Loading college profile...</p>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Error state
    if (error || !isAuthenticated) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
                    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-lg bg-red-50 border border-red-200 p-6 text-red-700"
                        >
                            <div className="flex gap-3">
                                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold mb-2">Authentication Required</h3>
                                    <p className="text-sm mb-4">
                                        {error || "You must be logged in as a college administrator to edit your college profile."}
                                    </p>
                                    <button
                                        onClick={() => router.push("/login")}
                                        className="text-sm font-semibold text-red-600 hover:text-red-700 underline"
                                    >
                                        Go to Login
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // Main page
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            Edit College Profile
                        </h1>
                        <p className="text-slate-600">
                            Update your college information to help students make the right choice
                        </p>
                    </motion.div>

                    {/* Success Message */}
                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 flex gap-3 rounded-lg bg-green-50 border border-green-200 p-4 text-green-700"
                        >
                            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <p className="text-sm">{successMessage}</p>
                        </motion.div>
                    )}

                    {/* College Info Summary */}
                    {college && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 rounded-lg bg-blue-50 border border-blue-200 p-4"
                        >
                            <p className="text-sm text-blue-900">
                                <span className="font-semibold">Current College:</span> {college.name}
                            </p>
                            {college.location && (
                                <p className="text-sm text-blue-900 mt-1">
                                    <span className="font-semibold">Location:</span> {college.location}
                                </p>
                            )}
                        </motion.div>
                    )}

                    {/* Edit Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <CollegeEditForm
                            initialData={college || undefined}
                            onSuccess={handleSuccess}
                        />
                    </motion.div>

                    {/* Info Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 rounded-lg bg-slate-50 border border-slate-200 p-6"
                    >
                        <h3 className="font-semibold text-slate-900 mb-3">Tips for Better Profile</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex gap-2">
                                <span className="text-blue-600 font-semibold">•</span>
                                <span>Keep your college description accurate and comprehensive</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-600 font-semibold">•</span>
                                <span>Update fees and package information regularly</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-600 font-semibold">•</span>
                                <span>List all major courses and facilities available</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-600 font-semibold">•</span>
                                <span>Add accurate contact information for student inquiries</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-600 font-semibold">•</span>
                                <span>Use a high-quality college logo or building image</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
