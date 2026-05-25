import Link from "next/link";
import { ChevronDown, Heart, MapPin, SlidersHorizontal, Star } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { collegeCards } from "@/data/eduvision";

export default function CollegesPage() {
  return (
    <>
      <Navbar />
      <main className="grid min-h-screen bg-[#f8f9ff] lg:grid-cols-[320px_1fr]">
        <aside className="border-r border-slate-200 bg-[#eff4ff] p-8">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-[#3525cd]">
            <SlidersHorizontal className="h-6 w-6" /> Filters
          </h1>
          <p className="mt-1 font-semibold tracking-widest text-slate-500">Refine your search</p>
          <div className="mt-8 grid gap-8">
            <Filter title="Location" items={["Delhi NCR", "Mumbai", "Bangalore"]} />
            <div>
              <h2 className="mb-4 font-bold uppercase tracking-widest text-[#3525cd]">Fees Range</h2>
              <input className="w-full accent-[#3525cd]" type="range" defaultValue="40" />
              <div className="mt-4 flex justify-between font-semibold"><span>₹1L</span><span>₹25L+</span></div>
            </div>
            <div>
              <h2 className="mb-4 font-bold uppercase tracking-widest text-[#3525cd]">Rankings (NIRF)</h2>
              <div className="grid grid-cols-2 gap-2">
                {["Top 10", "Top 50", "Top 100", "State Ranked"].map((rank, index) => (
                  <button key={rank} className={`rounded-lg py-3 font-semibold ${index === 0 ? "bg-[#4f46e5] text-white" : "bg-[#d8e8ff]"}`}>
                    {rank}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 font-bold uppercase tracking-widest text-[#3525cd]">Course Type</h2>
              <div className="flex flex-wrap gap-2">
                {["B.Tech", "MBA", "M.Sc", "Medical"].map((item) => (
                  <span key={item} className="rounded-full bg-[#d8e8ff] px-3 py-1 font-semibold">{item}</span>
                ))}
              </div>
            </div>
          </div>
          <button className="mt-20 w-full rounded-xl bg-[#3525cd] py-4 font-bold text-white shadow-lg shadow-indigo-500/20">Apply Filters</button>
        </aside>

        <section className="p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold">Discover Top Colleges</h1>
              <p className="mt-2 text-lg text-slate-600">Showing 1,240 results tailored to your profile</p>
            </div>
            <button className="flex items-center gap-10 rounded-xl bg-[#eff4ff] px-6 py-4 font-semibold">
              Sort by: Relevance <ChevronDown className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-6 flex gap-3">
            {["Delhi NCR", "Under 5 Lakhs"].map((chip) => (
              <span key={chip} className="rounded-full border border-indigo-200 bg-[#e2dfff] px-5 py-2 font-semibold text-[#3525cd]">{chip} ×</span>
            ))}
            <button className="font-semibold text-[#0058be]">Clear All</button>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-3">
            {collegeCards.map((college) => (
              <article key={college.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="campus-image relative h-48" style={{ backgroundImage: `url(${college.image})` }}>
                  <button className="absolute right-4 top-4 rounded-full bg-white p-3 shadow"><Heart /></button>
                  <span className="absolute bottom-4 left-4 rounded-lg bg-[#3525cd] px-3 py-2 font-bold text-white">Rank #{college.rank}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="truncate text-2xl font-bold">{college.shortName}</h2>
                    <span className="rounded-lg bg-[#93e8ff] px-3 py-2 font-semibold"><Star className="mr-1 inline h-4 w-4" />{college.rating}</span>
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-slate-700"><MapPin className="h-4 w-4" /> {college.location}</p>
                  <div className="mt-6 grid grid-cols-2 border-y border-slate-100 py-5">
                    <div><p className="font-bold text-slate-400">Avg. Package</p><p className="text-xl font-bold">{college.package}</p></div>
                    <div><p className="font-bold text-slate-400">Total Fees</p><p className="text-xl font-bold">{college.fees}</p></div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <label className="flex items-center gap-2 font-semibold"><input type="checkbox" className="h-5 w-5" /> Compare</label>
                    <Link href="/colleges/1" className="rounded-xl bg-[#d8e8ff] px-5 py-3 font-semibold text-[#001aee]">View Details</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Filter({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="mb-4 font-bold uppercase tracking-widest text-[#3525cd]">{title}</h2>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <label key={item} className="flex items-center gap-3">
            <input defaultChecked={index === 0} type="checkbox" className="h-4 w-4 accent-[#3525cd]" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
