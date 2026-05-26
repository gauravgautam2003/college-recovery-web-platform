"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Inbox, Loader2, Mail, Phone } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type OwnerApplication = {
    id: string;
    collegeName: string;
    studentName: string;
    email: string;
    phone: string;
    course: string;
    message?: string;
    status: string;
    createdAt: string;
};

export default function CollegeOwnerApplicationsPage() {
    const router = useRouter();
    const [applications, setApplications] = useState<OwnerApplication[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadApplications() {
            const token = localStorage.getItem("college_owner_token");
            if (!token) {
                router.push("/college-owner");
                return;
            }

            try {
                const response = await fetch("/api/college-owner/applications", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 401) {
                    router.push("/college-owner");
                    return;
                }

                const result = await response.json();
                if (!response.ok) throw new Error(result.error ?? "Failed to load applications");
                setApplications(result.applications ?? []);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to load applications");
            } finally {
                setLoading(false);
            }
        }

        loadApplications();
    }, [router]);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-slate-900">Student Applications</h1>
                            <p className="mt-2 text-slate-600">Applications submitted through college detail pages.</p>
                        </div>
                        <button onClick={() => router.push("/college-owner/dashboard")} className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-white">
                            Back to Dashboard
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex min-h-[320px] items-center justify-center text-blue-600">
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" /> Loading applications
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                            <Inbox className="mx-auto h-10 w-10 text-slate-400" />
                            <h2 className="mt-4 text-xl font-bold text-slate-900">No applications yet</h2>
                            <p className="mt-2 text-slate-600">When students click Apply Now, their submissions will appear here.</p>
                        </div>
                    ) : (
                        <div className="grid gap-5">
                            {applications.map((application) => (
                                <article key={application.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">{application.collegeName}</p>
                                            <h2 className="mt-2 text-xl font-bold text-slate-900">{application.studentName}</h2>
                                            <p className="mt-1 text-sm font-semibold text-slate-600">Interested in {application.course}</p>
                                        </div>
                                        <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase text-blue-700">{application.status}</span>
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-700">
                                        <a className="flex items-center gap-2 font-semibold" href={`mailto:${application.email}`}>
                                            <Mail className="h-4 w-4 text-blue-600" /> {application.email}
                                        </a>
                                        <a className="flex items-center gap-2 font-semibold" href={`tel:${application.phone}`}>
                                            <Phone className="h-4 w-4 text-blue-600" /> {application.phone}
                                        </a>
                                        <span>{new Date(application.createdAt).toLocaleString()}</span>
                                    </div>
                                    {application.message && <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">{application.message}</p>}
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
