"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { CheckCircle2, Database, KeyRound, Loader2, Mail, UploadCloud, XCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type StatusResponse = {
    database: { configured: boolean; provider: string; persistenceMode: string };
    auth: { configured: boolean; secretKeyName: string | null };
    uploads: { configured: boolean; provider: string; requiredKeys: string[] };
    email: { configured: boolean; provider: string };
    environment: string;
};

export default function SystemStatusPage() {
    const [status, setStatus] = useState<StatusResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStatus() {
            const response = await fetch("/api/system/status");
            const result = await response.json();
            setStatus(result.data);
            setLoading(false);
        }

        loadStatus();
    }, []);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-slate-900">System Status</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        Safe environment status for production setup. Secret values are never displayed.
                    </p>

                    {loading || !status ? (
                        <div className="flex min-h-[320px] items-center justify-center text-blue-600">
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" /> Checking configuration
                        </div>
                    ) : (
                        <div className="mt-10 grid gap-5 md:grid-cols-2">
                            <StatusCard icon={<Database />} title="Database" ok={status.database.configured} detail={`${status.database.provider} - ${status.database.persistenceMode}`} />
                            <StatusCard icon={<KeyRound />} title="Authentication Secret" ok={status.auth.configured} detail={status.auth.secretKeyName ? `Using ${status.auth.secretKeyName}` : "JWT secret missing"} />
                            <StatusCard icon={<UploadCloud />} title="Image Uploads" ok={status.uploads.configured} detail={`${status.uploads.provider} keys: ${status.uploads.requiredKeys.join(", ")}`} />
                            <StatusCard icon={<Mail />} title="Email Notifications" ok={status.email.configured} detail={`${status.email.provider} ${status.email.configured ? "configured" : "not configured yet"}`} />
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

function StatusCard({ icon, title, ok, detail }: { icon: React.ReactNode; title: string; ok: boolean; detail: string }) {
    return (
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">{icon}</div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
                    </div>
                </div>
                {ok ? <CheckCircle2 className="h-6 w-6 text-emerald-600" /> : <XCircle className="h-6 w-6 text-red-500" />}
            </div>
        </article>
    );
}
