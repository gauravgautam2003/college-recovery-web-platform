"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FileText, Loader2 } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";

type StudentApplication = {
    id: string;
    collegeId: string;
    collegeName: string;
    course: string;
    status: string;
    createdAt: string;
    message?: string;
};

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<StudentApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadApplications() {
            const response = await fetch("/api/applications");
            const result = await response.json();

            if (!response.ok) {
                const message = result.error ?? "Please login to see applications.";
                setError(message);
                toast.error(message);
            } else {
                setApplications(result.data ?? []);
            }

            setLoading(false);
        }

        loadApplications();
    }, []);

    return (
        <DashboardShell>
            <section className="px-8 py-10">
                <h1 className="text-2xl font-bold leading-tight tracking-normal text-[#0b1c30] xl:text-5xl">Applications</h1>
                <p className="mt-2 text-sm text-slate-600">Track admission inquiries submitted from college pages.</p>

                {loading ? (
                    <div className="flex min-h-[360px] items-center justify-center text-[#3525cd]">
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" /> Loading applications
                    </div>
                ) : error ? (
                    <div className="mt-12 rounded-xl border border-slate-300 bg-white p-8">
                        <p className="text-lg font-semibold text-slate-700">{error}</p>
                        <Link href="/login" className="mt-6 inline-block rounded-lg bg-[#3525cd] px-6 py-3 font-bold text-white">Login</Link>
                    </div>
                ) : applications.length === 0 ? (
                    <div className="mt-12 rounded-xl border border-slate-300 bg-white p-8">
                        <FileText className="h-10 w-10 text-slate-400" />
                        <p className="mt-4 text-lg font-semibold text-slate-700">No applications submitted yet.</p>
                        <Link href="/colleges" className="mt-6 inline-block rounded-lg bg-[#3525cd] px-6 py-3 font-bold text-white">Apply to Colleges</Link>
                    </div>
                ) : (
                    <div className="mt-10 grid gap-5">
                        {applications.map((application) => (
                            <article key={application.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#3525cd]">{application.status}</p>
                                        <h2 className="mt-2 text-xl font-bold text-[#0b1c30]">{application.collegeName}</h2>
                                        <p className="mt-1 text-sm text-slate-600">Course: {application.course}</p>
                                    </div>
                                    <Link href={`/colleges/${application.collegeId}`} className="rounded-lg bg-[#eff4ff] px-4 py-2 text-sm font-bold text-[#3525cd]">
                                        View College
                                    </Link>
                                </div>
                                {application.message && <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">{application.message}</p>}
                                <p className="mt-4 text-xs font-semibold text-slate-500">Submitted {new Date(application.createdAt).toLocaleString()}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </DashboardShell>
    );
}
