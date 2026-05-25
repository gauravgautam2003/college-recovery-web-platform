import Link from "next/link";
import { ArrowUpRight, Bot, Search, Send, Star, Zap } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { featuredUniversities } from "@/data/eduvision";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="px-6 py-24 text-center md:py-36">
          <div className="mx-auto max-w-4xl">
            <span className="rounded-full bg-[#e2dfff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#3525cd]">
              AI-powered educational discovery
            </span>
            <h1 className="mt-7 text-5xl font-bold leading-tight tracking-normal md:text-6xl">
              Find Your Future,
              <span className="block text-[#3525cd]">Built with AI</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
              Leverage advanced neural networks to match your career aspirations with the perfect university.
              Data-driven insights for the next generation of leaders.
            </p>
            <div className="soft-shadow mx-auto mt-10 flex max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
              <div className="flex flex-1 items-center gap-3 px-4 text-slate-400">
                <Search className="h-5 w-5" />
                <input className="w-full outline-none" placeholder="College, course, or city..." />
              </div>
              <Link href="/colleges" className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-6 py-3 font-semibold text-white">
                <Zap className="h-4 w-4" />
                Explore Now
              </Link>
            </div>
          </div>
        </section>

        <section className="grid border-y border-blue-100 bg-[#eff4ff] px-6 py-10 text-center md:grid-cols-3">
          {["50K+ Colleges Globally", "10M+ Verified Reviews", "98% Placement Success"].map((item) => (
            <div key={item} className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              <span className="block text-[#3525cd]">{item.split(" ")[0]}</span>
              {item.split(" ").slice(1).join(" ")}
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Top-Tier Universities</h2>
              <p className="mt-2 text-sm text-slate-600">Recommended by our AI for excellence and global ranking.</p>
            </div>
            <Link href="/colleges" className="text-sm font-semibold text-[#3525cd]">
              View All
            </Link>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {featuredUniversities.map((college) => (
              <article key={college.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="campus-image h-44" style={{ backgroundImage: `url(${college.image})` }}>
                  <div className="flex justify-end p-3">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">
                      <Star className="mr-1 inline h-3 w-3" /> {college.rating}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{college.name}</h3>
                    <span className="text-xs font-semibold text-[#3525cd]">{college.rank}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{college.location}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Trending This Month</h2>
              <p className="mt-2 text-slate-600">Institutions gaining significant traction in student interest.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="campus-image min-h-[420px] rounded-2xl p-8 text-white" style={{ backgroundImage: "linear-gradient(rgba(2,6,23,.2), rgba(2,6,23,.8)), url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1100&q=80)" }}>
                <div className="flex h-full flex-col justify-end">
                  <span className="w-fit rounded bg-[#3525cd] px-3 py-1 text-xs uppercase">Technology</span>
                  <h3 className="mt-3 text-2xl font-bold">MIT Media Lab</h3>
                  <p className="mt-2 max-w-md">Leading the surge in interdisciplinary research applications this quarter.</p>
                  <button className="mt-6 w-fit rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#3525cd]">Explore Program</button>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="rounded-2xl bg-[#eff4ff] p-8">
                  <ArrowUpRight className="h-7 w-7 text-[#3525cd]" />
                  <p className="mt-8 text-sm text-slate-600">National University of Singapore ranked #1 in Asia for computer science and innovation.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl bg-[#3525cd] p-8 text-white">
                    <h3 className="font-bold">Career Growth</h3>
                    <p className="mt-8 text-sm">Institutions with the highest ROI based on 2024 placement data.</p>
                  </div>
                  <div className="rounded-2xl bg-[#2170e4] p-8 text-white">
                    <h3 className="font-bold">Scholarships</h3>
                    <p className="mt-8 text-sm">15 new fully-funded programs announced this week.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-2xl bg-[#3525cd] px-8 py-14 text-center text-white shadow-xl shadow-indigo-500/20">
            <Bot className="mx-auto h-9 w-9" />
            <h2 className="mt-4 text-2xl font-bold">Start Your Journey Today</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-indigo-100">
              Stop guessing your future. Let our AI guide you to the institution where you will leave your mark.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/signup" className="rounded-lg bg-white px-8 py-3 font-semibold text-[#3525cd]">Join Free Now</Link>
              <Link href="/login" className="rounded-lg border border-indigo-300 px-8 py-3 font-semibold">Talk to Advisor</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
