import { Filter, GraduationCap, Map, Trophy } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { compareRows } from "@/data/eduvision";

const schools = ["Stanford University", "MIT Tech", "Oxford Univ."];

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f8f9ff] px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold">University Comparison</h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
            Side-by-side evaluation of leading institutions. Powered by EduVision AI's comprehensive data analytics and verified student insights.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="h-fit rounded-2xl border border-slate-200 bg-[#eff4ff] p-6 shadow-sm">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-[#3525cd]"><Filter /> Filters</h2>
              <p className="mt-2 font-semibold tracking-widest">Refine your comparison</p>
              <div className="mt-10 grid gap-8 font-bold tracking-widest">
                <span className="flex items-center gap-5"><Map /> Location</span>
                <span className="flex items-center gap-5">▣ Fees</span>
                <span className="flex items-center gap-5 rounded-lg bg-[#4f46e5] p-4 text-white"><Trophy /> Rankings</span>
                <span className="flex items-center gap-5"><GraduationCap /> Courses</span>
              </div>
              <button className="mt-12 w-full rounded-xl bg-[#3525cd] py-4 font-bold text-white">Apply Filters</button>
            </aside>
            <section>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="grid min-w-[760px] grid-cols-4 border-b border-slate-200">
                  <div className="flex items-end p-8 font-bold uppercase tracking-widest text-[#3525cd]">Comparison Criteria</div>
                  {schools.map((school, index) => (
                    <div key={school} className="border-l border-slate-100 p-8 text-center">
                      <div className="mx-auto h-20 w-20 rounded-full bg-cover shadow-lg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-${index === 0 ? "1564981797816-1043664bf78d" : index === 1 ? "1565034946487-077786996e27" : "1541339907198-e08756dedf3f"}?auto=format&fit=crop&w=200&q=80)` }} />
                      <h3 className="mt-5 text-2xl font-bold">{school}</h3>
                      <span className="mt-3 inline-block rounded-full bg-[#e2dfff] px-5 py-1 text-xs font-bold text-[#3525cd]">
                        {index === 2 ? "Oxford, UK" : "California, USA"}
                      </span>
                    </div>
                  ))}
                </div>
                {compareRows.map((row, index) => (
                  <div key={row[0]} className={`grid min-w-[760px] grid-cols-4 border-b border-slate-100 ${index === 2 ? "bg-cyan-50/40" : ""}`}>
                    {row.map((cell, cellIndex) => (
                      <div key={cell} className={`p-8 ${cellIndex === 0 ? "bg-[#f8f9ff] font-bold" : "border-l border-slate-100 text-center"}`}>
                        <span className={cellIndex === 1 ? "font-bold text-[#0058be]" : ""}>{cell}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="grid min-w-[760px] grid-cols-4 p-8">
                  <div />
                  {schools.map((school) => (
                    <div key={school} className="px-6">
                      <button className="w-full rounded-xl bg-[#4f46e5] py-4 font-bold text-white">Apply Now</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-indigo-200 bg-[#e2dfff] p-6">
                <h3 className="font-bold text-[#3525cd]">EduVision AI Verdict</h3>
                <p className="mt-2 text-slate-700">Based on your preference for high placement records and science courses, MIT Tech emerges as the strongest match.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
