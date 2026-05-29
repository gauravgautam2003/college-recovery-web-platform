/**
 * College Owner Dashboard
 * View and manage colleges owned by the college owner
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Activity, FileText, Loader2, Plus, Edit2, Trash2, Eye, LogOut } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface College {
    id: string;
    name: string;
    location: string;
    rating?: number;
    fees: string;
    image?: string;
    createdAt: string;
}

export default function CollegeOwnerDashboard() {
    const [colleges, setColleges] = useState<College[]>([]);
    const [loading, setLoading] = useState(true);
    const [ownerName, setOwnerName] = useState("");
    const router = useRouter();

    // Fetch owner's colleges
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const token = localStorage.getItem("college_owner_token");
                if (!token) {
                    router.push("/college-owner");
                    return;
                }

                const response = await fetch("/api/college-owner/colleges", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    router.push("/college-owner");
                    return;
                }

                const data = await response.json();
                setColleges(data.colleges || []);
                setOwnerName(data.ownerName || "College Owner");
            } catch {
                toast.error("Failed to load colleges");
            } finally {
                setLoading(false);
            }
        };

        fetchColleges();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("college_owner_token");
        router.push("/college-owner");
    };

    const handleAddCollege = () => {
        router.push("/college-owner/add-college");
    };

    const handleApplications = () => {
        router.push("/college-owner/applications");
    };

    const handleSystemStatus = () => {
        router.push("/college-owner/system");
    };

    const handleEditCollege = (collegeId: string) => {
        router.push(`/college-owner/edit-college/${collegeId}`);
    };

    const handleViewCollege = (collegeId: string) => {
        router.push(`/colleges/${collegeId}`);
    };

    const handleDeleteCollege = async (collegeId: string) => {
        if (!confirm("Are you sure you want to delete this college?")) return;

        try {
            const token = localStorage.getItem("college_owner_token");
            const response = await fetch(`/api/college-owner/colleges/${collegeId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to delete college");

            setColleges(colleges.filter((c) => c.id !== collegeId));
            toast.success("College deleted successfully");
        } catch {
            toast.error("Failed to delete college");
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-slate-50 py-12">
                    <div className="container mx-auto flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="flex justify-between flex-col gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                            <p className="text-slate-600">Welcome, {ownerName}</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleSystemStatus}
                                className="bg-white text-slate-800 md:w-full lg:max-w-40 border border-slate-300 px-6 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                            >
                                <Activity className="h-5 w-5" />
                                System
                            </button>
                            <button
                                onClick={handleApplications}
                                className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                <FileText className="h-5 w-5" />
                                Applications
                            </button>
                            <button
                                onClick={handleAddCollege}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Plus className="h-5 w-5" />
                                Add College
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                            >
                                <LogOut className="h-5 w-5" />
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-slate-600 text-sm font-semibold mb-2">Total Colleges</p>
                            <p className="text-4xl font-bold text-blue-600">{colleges.length}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-slate-600 text-sm font-semibold mb-2">Active Listings</p>
                            <p className="text-4xl font-bold text-green-600">{colleges.length}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-slate-600 text-sm font-semibold mb-2">Cloud Upload</p>
                            <p className="text-4xl font-bold text-purple-600">On</p>
                        </div>
                    </div>

                    {/* Colleges List */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900">My Colleges</h2>
                        </div>

                        {colleges.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-slate-600 mb-4">No colleges added yet</p>
                                <button
                                    onClick={handleAddCollege}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                                >
                                    Add Your First College
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                                College Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                                Location
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                                Rating
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                                Created
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {colleges.map((college) => (
                                            <tr
                                                key={college.id}
                                                className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <p className="font-semibold text-slate-900">{college.name}</p>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">{college.location}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-yellow-500">★</span>
                                                        <span className="font-semibold">{college.rating || "N/A"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    {new Date(college.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleViewCollege(college.id)}
                                                            className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors"
                                                            title="View"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditCollege(college.id)}
                                                            className="p-2 hover:bg-green-100 rounded-lg text-green-600 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteCollege(college.id)}
                                                            className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
