import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const steps = [
    "Create a student account or browse colleges directly.",
    "Use filters to shortlist colleges by city, fees, ranking, course, and package.",
    "Open the college detail page and review courses, fees, placements, facilities, and contact details.",
    "Click Apply Now and submit your admission inquiry.",
    "Track next steps by staying in touch with the college admissions team.",
];

export default function HowToApplyPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#f8f9ff] px-6 py-12">
                <section className="mx-auto max-w-5xl">
                    <h1 className="text-4xl font-bold text-slate-950">How Students Apply</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                        EduVision connects discovery, comparison, application inquiry, and college-owner follow-up in one flow.
                    </p>
                    <div className="mt-10 grid gap-5">
                        {steps.map((step, index) => (
                            <div key={step} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#3525cd]" />
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#3525cd]">Step {index + 1}</p>
                                    <p className="mt-2 font-semibold text-slate-800">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link href="/colleges" className="flex items-center gap-2 rounded-lg bg-[#3525cd] px-6 py-3 font-bold text-white">
                            Browse Colleges <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/college-owner" className="rounded-lg border border-[#3525cd] px-6 py-3 font-bold text-[#3525cd]">
                            College Admin Panel
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
