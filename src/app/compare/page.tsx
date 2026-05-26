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
      <main className="bg-[#f8f9ff] px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">University Comparison</h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700">
            Side-by-side evaluation of leading institutions from the backend comparison API.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="h-fit rounded-xl border border-slate-200 bg-[#eff4ff] p-5 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl font-bold text-[#3525cd]"><Filter className="h-5 w-5" /> Filters</h2>
              <p className="mt-2 font-semibold tracking-widest">Default API IDs</p>
              <div className="mt-8 grid gap-5 text-sm font-bold tracking-widest">
                <span className="flex items-center gap-5"><Map /> {defaultIds.join(", ")}</span>
                <span className="flex items-center gap-5 rounded-lg bg-[#4f46e5] p-4 text-white"><Trophy /> Backend Compare</span>
                <span className="flex items-center gap-5"><GraduationCap /> Courses</span>
              </div>
            </aside>
            <section>
              <div className="modern-surface overflow-hidden rounded-xl">
                {loading ? (
                  <div className="flex min-h-[360px] items-center justify-center text-[#3525cd]">
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" /> Loading comparison
                  </div>
                ) : error ? (
                  <p className="p-8 font-semibold text-red-700">{error}</p>
                ) : (
                  <>
                    <div className="grid min-w-[760px] grid-cols-4 border-b border-slate-200">
                      <div className="flex items-end p-6 text-sm font-bold uppercase tracking-widest text-[#3525cd]">Comparison Criteria</div>
                      {comparison.map((college) => (
                        <div key={college.id} className="border-l border-slate-100 p-6 text-center">
                          <div className="mx-auto h-16 w-16 rounded-full bg-cover shadow-lg" style={{ backgroundImage: `url(${college.image})` }} />
                          <h3 className="mt-4 text-xl font-bold">{college.shortName ?? college.name}</h3>
                          <span className="mt-3 inline-block rounded-full bg-[#e2dfff] px-5 py-1 text-xs font-bold text-[#3525cd]">
                            {college.location}
                          </span>
                        </div>
                      ))}
                    </div>
                    {rows.map((row, index) => (
                      <div key={row[0]} className={`grid min-w-[760px] grid-cols-4 border-b border-slate-100 ${index === 2 ? "bg-cyan-50/40" : ""}`}>
                        {row.map((cell, cellIndex) => (
                          <div key={`${row[0]}-${cellIndex}`} className={`p-6 ${cellIndex === 0 ? "bg-[#f8f9ff] font-bold" : "border-l border-slate-100 text-center"}`}>
                            <span className={cellIndex === 1 ? "font-bold text-[#0058be]" : ""}>{cell}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="mt-6 rounded-xl border border-indigo-200 bg-[#e2dfff] p-5 text-sm">
                <h3 className="font-bold text-[#3525cd]">EduVision AI Verdict</h3>
                <p className="mt-2 text-slate-700">The verdict now uses live comparison data from `/api/compare`.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
