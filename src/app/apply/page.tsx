"use client";

import { Suspense } from "react";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { CheckCircle, Loader2, Send } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BackButton from "@/components/shared/BackButton";
import type { College } from "@/types/college";

export default function ApplyPage() {
    return (
        <Suspense fallback={<ApplyShellLoading />}>
            <ApplyForm />
        </Suspense>
    );
}

function ApplyShellLoading() {
    return (
        <>
            <Navbar />
            <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff] text-[#3525cd]">
                <Loader2 className="mr-3 h-6 w-6 animate-spin" /> Loading application form
            </main>
            <Footer />
        </>
    );
}

function ApplyForm() {
    const searchParams = useSearchParams();
    const collegeId = searchParams.get("collegeId") ?? "";
    const [college, setCollege] = useState<College | null>(null);
    const [loading, setLoading] = useState(Boolean(collegeId));
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        studentName: "",
        email: "",
        phone: "",
        course: "",
        message: "",
    });

    useEffect(() => {
        async function loadCollege() {
            if (!collegeId) {
                setLoading(false);
                return;
            }

            const response = await fetch(`/api/colleges/${collegeId}`);
            const result = await response.json();
            if (response.ok) {
                setCollege(result.data);
                setForm((current) => ({ ...current, course: result.data.courses?.[0] ?? "" }));
            }
            setLoading(false);
        }

        loadCollege();
    }, [collegeId]);

    function updateField(field: keyof typeof form, value: string) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitting(true);
        const toastId = toast.loading("Submitting application...");

        const response = await fetch("/api/applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, collegeId }),
        });
        const result = await response.json();

        if (!response.ok) {
            toast.error(result.error ?? "Application could not be submitted.", { id: toastId });
            setSubmitting(false);
            return;
        }

        toast.success(result.message, { id: toastId });
        setSubmitted(true);
        setSubmitting(false);
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#f8f9ff] px-4 sm:px-6 py-8 sm:py-10 md:py-12">
                <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_380px]">
                    <section>
                        <BackButton fallbackHref={collegeId ? `/colleges/${collegeId}` : "/colleges"} className="mb-4 sm:mb-6" />
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950">Apply to College</h1>
                        <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600">
                            Submit your interest directly to the admissions team. This application record is saved in the backend and visible to the college owner panel.
                        </p>

                        {loading ? (
                            <div className="mt-8 sm:mt-10 flex min-h-[200px] sm:min-h-[280px] items-center justify-center rounded-xl bg-white text-[#3525cd]">
                                <Loader2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-spin" /> <span className="text-xs sm:text-base">Loading college</span>
                            </div>
                        ) : submitted ? (
                            <div className="mt-8 sm:mt-10 rounded-xl border border-emerald-200 bg-white p-4 sm:p-6 md:p-8">
                                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-600" />
                                <h2 className="mt-3 sm:mt-4 text-lg sm:text-2xl font-bold">Application Submitted</h2>
                                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600">Your details are now available in the college owner applications panel.</p>
                                <Link href="/colleges" className="mt-4 sm:mt-6 inline-block rounded-lg bg-[#3525cd] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#2b1fa8] transition">
                                    Browse More Colleges
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 md:p-7 shadow-sm">
                                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                                    <Field label="Student Name" value={form.studentName} onChange={(value) => updateField("studentName", value)} required />
                                    <Field label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} required />
                                    <Field label="Phone" value={form.phone} onChange={(value) => updateField("phone", value)} required />
                                    <Field label="Preferred Course" value={form.course} onChange={(value) => updateField("course", value)} required />
                                </div>
                                <label className="mt-4 sm:mt-5 block text-xs sm:text-sm font-bold text-slate-700">
                                    Message
                                    <textarea
                                        value={form.message}
                                        onChange={(event) => updateField("message", event.target.value)}
                                        rows={4}
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#3525cd] focus:ring-2 focus:ring-[#3525cd]/20"
                                        placeholder="Tell the admissions team about your interests, exam scores, or questions."
                                    />
                                </label>
                                <button disabled={submitting || !collegeId} className="mt-5 sm:mt-7 flex items-center justify-center gap-2 w-full sm:w-auto rounded-lg bg-[#3525cd] px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white disabled:opacity-60 hover:bg-[#2b1fa8] transition">
                                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                    Submit Application
                                </button>
                                {!collegeId && <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-red-600">Please open this form from a college detail page.</p>}
                            </form>
                        )}
                    </section>

                    <aside className="h-fit rounded-xl border border-slate-200 bg-white p-4 sm:p-6 md:p-7 shadow-sm">
                        <h2 className="text-base sm:text-lg md:text-xl font-bold">How To Apply</h2>
                        <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-5 text-xs sm:text-sm text-slate-700">
                            {[
                                "Choose a college and course that matches your goals.",
                                "Fill your contact and preferred course details.",
                                "Submit the application inquiry from this page.",
                                "The college owner/admin reviews it from their applications panel.",
                                "Admissions team contacts you by email or phone.",
                            ].map((step, index) => (
                                <p key={step} className="flex gap-3">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eff4ff] font-bold text-[#3525cd]">{index + 1}</span>
                                    <span>{step}</span>
                                </p>
                            ))}
                        </div>
                        {college && (
                            <div className="mt-7 rounded-lg bg-[#eff4ff] p-4 text-sm">
                                <p className="font-bold text-[#3525cd]">{college.name}</p>
                                <p className="mt-1 text-slate-600">{college.location}</p>
                                <p className="mt-3 font-semibold">Deadline: {college.admissionDeadline ?? "Contact college"}</p>
                            </div>
                        )}
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
}

function Field({
    label,
    value,
    onChange,
    type = "text",
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    required?: boolean;
}) {
    return (
        <label className="block text-sm font-bold text-slate-700">
            {label}
            <input
                type={type}
                value={value}
                required={required}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[#3525cd]"
            />
        </label>
    );
}
