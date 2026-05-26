/**
 * College Owner Authentication Page
 * Login/Signup for college owners to manage their colleges
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Mail, Lock, User } from "lucide-react";
import BackButton from "@/components/shared/BackButton";

export default function CollegeOwnerAuthPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/college-owner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, mode }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Authentication failed");
            }

            toast.success(
                mode === "login"
                    ? "Login successful! Redirecting..."
                    : "Account created! Redirecting..."
            );

            // Store token
            localStorage.setItem("college_owner_token", result.data.token);

            // Redirect to dashboard
            setTimeout(() => {
                router.push("/college-owner/dashboard");
            }, 1000);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <BackButton fallbackHref="/" className="mb-4" />
            <div className="bg-white rounded-2xl shadow-2xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">College Owner</h1>
                    <p className="text-slate-600">Manage your college information</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setMode("login")}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${mode === "login"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setMode("signup")}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${mode === "signup"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field (Sign Up Only) */}
                    {mode === "signup" && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Your Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="college@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {mode === "login" ? "Login" : "Create Account"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-slate-600 mt-6">
                    Regular student?{" "}
                    <a href="/login" className="text-blue-600 hover:underline font-semibold">
                        Login here
                    </a>
                </p>
            </div>
            </div>
        </div>
    );
}
