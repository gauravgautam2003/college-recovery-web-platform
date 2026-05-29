"use client";

import { Filter, GraduationCap, Loader2, Map, Trophy } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useCompare } from "@/hooks/useCompare";

const defaultIds = ["iit-delhi", "bits-pilani", "amity-noida"];

export default function ComparePage() {
    const { comparison, loading, error } = useCompare(defaultIds);
    const rows = [
        ["Avg. Placement", ...comparison.map((college) => college.averagePackage ?? "-")],
        ["Rank", ...comparison.map((college) => `#${college.rank ?? "-"}`)],
        ["Fees", ...comparison.map((college) => college.fees ?? "-")],
        ["Placement Rate", ...comparison.map((college) => college.placementRate ?? "-")],
        ["Top Recruiters", ...comparison.map((college) => college.topRecruiters?.slice(0, 3).join(", ") ?? "-")],
    ];

    return (
        <>
            <Navbar />
            <main className="bg-[#f8f9ff] px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">University Comparison</h1>
                    <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-6 sm:leading-7 text-slate-700">
                        Side-by-side evaluation of leading institutions from the backend comparison API.
                    </p>
                    <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
                        <aside className="h-fit rounded-xl border border-slate-200 bg-[#eff4ff] p-4 sm:p-5 shadow-sm">
                            <h2 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl font-bold text-[#3525cd]"><Filter className="h-4 w-4 sm:h-5 sm:w-5" /> Filters</h2>
                            <p className="mt-2 font-semibold tracking-widest text-xs sm:text-sm">Default API IDs</p>
                            <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-5 text-xs sm:text-sm font-bold tracking-widest">
                                <span className="flex items-center gap-3 sm:gap-5 break-all"><Map className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> {defaultIds.join(", ")}</span>
                                <span className="flex items-center gap-3 sm:gap-5 rounded-lg bg-[#4f46e5] p-3 sm:p-4 text-white"><Trophy className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> Backend Compare</span>
                                <span className="flex items-center gap-3 sm:gap-5"><GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> Courses</span>
                            </div>
                        </aside>
                        <section className="h-fit rounded-xl border border-slate-200 bg-white p-2 sm:p-3 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white sm:w-full shadow-sm md:w-auto lg:w-full xl:w-auto">
                                {loading ? (
                                    <div className="flex min-h-[240px] sm:min-h-[360px] items-center justify-center text-[#3525cd]">
                                        <Loader2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-spin" /> <span className="text-xs sm:text-base">Loading comparison</span>
                                    </div>
                                ) : error ? (
                                    <p className="p-4 sm:p-8 text-xs sm:text-base font-semibold text-red-700">{error}</p>
                                ) : (
                                    <>
                                        <div className="grid min-w-[640px] sm:min-w-[720px] lg:min-w-fit grid-cols-4 border-b border-slate-200 bg-white">
                                            <div className="flex items-end p-3 sm:p-4 text-xs font-bold uppercase tracking-widest text-[#3525cd]">Comparison</div>
                                            {comparison.map((college) => (
                                                <div key={college.id} className="border-r border-slate-100 p-3 sm:p-4 text-center">
                                                    <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-cover shadow-lg" style={{ backgroundImage: `url(${college.image})` }} />
                                                    <h3 className="mt-2 sm:mt-4 text-xs sm:text-lg md:text-xl font-bold truncate">{college.shortName ?? college.name}</h3>
                                                    <span className="mt-2 sm:mt-3 inline-block rounded-full bg-[#e2dfff] px-2 sm:px-5 py-0.5 sm:py-1 text-xs font-bold text-[#3525cd]">
                                                        {college.location}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        {rows.map((row, index) => (
                                            <div key={row[0]} className={`grid min-w-[640px] sm:min-w-[720px] lg:min-w-fit grid-cols-4 border-b border-slate-100 bg-white ${index === 2 ? "bg-cyan-50/40" : ""}`}>
                                                {row.map((cell, cellIndex) => (
                                                    <div key={`${row[0]}-${cellIndex}`} className={`p-3 sm:p-4 md:p-6 text-xs sm:text-sm ${cellIndex === 0 ? "bg-[#f8f9ff] font-bold" : "border-l border-slate-100 text-center"}`}>
                                                        <span className={cellIndex === 1 ? "font-bold text-[#0058be]" : ""}>{cell}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className="mt-4 sm:mt-6 rounded-xl border border-indigo-200 bg-[#e2dfff] p-4 sm:p-5 text-xs sm:text-sm">
                                <h3 className="font-bold text-[#3525cd]">EduVision AI Verdict</h3>
                                <p className="mt-2 text-slate-700 text-xs sm:text-sm">The verdict now uses live comparison data from `/api/compare`.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
