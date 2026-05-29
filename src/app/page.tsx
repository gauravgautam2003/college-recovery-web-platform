import Link from "next/link";
import { ArrowUpRight, Bot, Building2, Search, Star, UploadCloud, Zap } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { featuredUniversities } from "@/data/eduvision";

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <section className="px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20 lg:py-28">
                    <div className="mx-auto max-w-4xl">
                        <span className="rounded-full bg-[#e2dfff] px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#3525cd] sm:px-4">
                            AI-powered educational discovery
                        </span>
                        <h1 className="mt-4 text-2xl font-bold leading-tight tracking-normal sm:text-3xl md:mt-6 md:text-4xl lg:text-5xl">
                            Find Your Future,
                            <span className="block text-[#3525cd]">Built with AI</span>
                        </h1>
                        <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-slate-600 sm:text-sm sm:leading-7 md:mt-4">
                            Leverage advanced neural networks to match your career aspirations with the perfect university.
                            Data-driven insights for the next generation of leaders.
                        </p>
                        <div className="modern-surface mx-auto mt-6 flex flex-col gap-2 max-w-2xl overflow-hidden rounded-xl p-2 sm:mt-8 sm:flex-row">
                            <div className="flex flex-1 items-center gap-2 px-3 py-2 text-slate-400 sm:px-4 sm:py-3 sm:gap-3">
                                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                                <input className="w-full bg-transparent outline-none text-sm sm:text-base" placeholder="College, course, or city..." />
                            </div>
                            <Link href="/colleges" className="flex items-center justify-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white sm:px-6 sm:py-3">
                                <Zap className="h-4 w-4" />
                                Explore Now
                            </Link>
                        </div>
                        <div className="hidden md:flex gap-2 justify-center mt-4 sm:mt-6">
                            <Link href="/login" className="rounded-lg border border-gray-600 bg-[#e5e4f0] px-8 py-2 text-xs sm:text-sm font-bold text-gray-800 shadow-lg shadow-black-500/20 transition hover:-translate-y-0.5 text-center">
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-lg bg-[#4f46e5] px-8 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 text-center"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid border-y border-blue-100 bg-[#eff4ff] px-4 py-6 text-center sm:px-6 sm:py-8 md:py-10 md:grid-cols-3 gap-4 sm:gap-0">
                    {["50K+ Colleges Globally", "10M+ Verified Reviews", "98% Placement Success"].map((item) => (
                        <div key={item} className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                            <span className="block text-sm sm:text-base text-[#3525cd]">{item.split(" ")[0]}</span>
                            <span className="text-xs">{item.split(" ").slice(1).join(" ")}</span>
                        </div>
                    ))}
                </section>

                <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:py-12">
                    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold sm:text-2xl">Top-Tier Universities</h2>
                            <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">Recommended by our AI for excellence and global ranking.</p>
                        </div>
                        <Link href="/colleges" className="text-xs font-semibold text-[#3525cd] sm:text-sm">
                            View All →
                        </Link>
                    </div>
                    <div className="grid gap-4 sm:gap-5 md:gap-7 sm:grid-cols-2 md:grid-cols-3">
                        {featuredUniversities.map((college) => (
                            <article key={college.name} className="modern-surface overflow-hidden rounded-xl">
                                <div className="campus-image h-32 sm:h-40 md:h-44" style={{ backgroundImage: `url(${college.image})` }}>
                                    <div className="flex justify-end p-2 sm:p-3">
                                        <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold">
                                            <Star className="mr-1 inline h-2.5 w-2.5 sm:h-3 sm:w-3" /> {college.rating}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 sm:p-5">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-semibold text-sm sm:text-base truncate">{college.name}</h3>
                                        <span className="text-xs font-semibold text-[#3525cd] whitespace-nowrap">{college.rank}</span>
                                    </div>
                                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600">{college.location}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="bg-white px-4 py-8 sm:px-6 sm:py-10 md:py-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center">
                            <h2 className="text-xl font-bold sm:text-2xl">Trending This Month</h2>
                            <p className="mt-2 text-xs sm:text-sm text-slate-600">Institutions gaining significant traction in student interest.</p>
                        </div>
                        <div className="mt-8 sm:mt-10 md:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
                            <div className="campus-image min-h-[240px] sm:min-h-[300px] md:min-h-[360px] rounded-xl p-4 sm:p-5 md:p-7 text-white" style={{ backgroundImage: "linear-gradient(rgba(2,6,23,.2), rgba(2,6,23,.8)), url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1100&q=80)" }}>
                                <div className="flex h-full flex-col justify-end gap-2 sm:gap-3">
                                    <span className="w-fit rounded bg-[#3525cd] px-2 py-1 text-xs uppercase">Technology</span>
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold">MIT Media Lab</h3>
                                    <p className="text-xs sm:text-sm max-w-md">Leading the surge in interdisciplinary research applications this quarter.</p>
                                    <button className="mt-2 sm:mt-4 w-fit rounded-lg bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#3525cd]">Explore Program</button>
                                </div>
                            </div>
                            <div className="grid gap-4 sm:gap-6">
                                <div className="rounded-xl bg-[#eff4ff] p-4 sm:p-6 md:p-7">
                                    <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#3525cd]" />
                                    <p className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm text-slate-600">National University of Singapore ranked #1 in Asia for computer science and innovation.</p>
                                </div>
                                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                                    <div className="rounded-xl bg-[#3525cd] p-4 sm:p-6 md:p-7 text-white">
                                        <h3 className="font-bold text-sm sm:text-base">Career Growth</h3>
                                        <p className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm">Institutions with the highest ROI based on 2024 placement data.</p>
                                    </div>
                                    <div className="rounded-xl bg-[#2170e4] p-4 sm:p-6 md:p-7 text-white">
                                        <h3 className="font-bold text-sm sm:text-base">Scholarships</h3>
                                        <p className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm">15 new fully-funded programs announced this week.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 md:py-12">
                    <div className="rounded-xl bg-[#3525cd] px-6 py-8 sm:px-8 sm:py-10 md:py-12 text-center text-white shadow-xl shadow-indigo-500/20">
                        <Bot className="mx-auto h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9" />
                        <h2 className="mt-3 sm:mt-4 text-lg font-bold sm:text-xl md:text-2xl">Start Your Journey Today</h2>
                        <p className="mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm text-indigo-100">
                            Stop guessing your future. Let our AI guide you to the institution where you will leave your mark.
                        </p>
                        <div className="mt-6 sm:mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-4">
                            <Link href="/signup" className="rounded-lg bg-white px-6 py-2 sm:px-8 sm:py-3 text-sm font-semibold text-[#3525cd]">Join Free Now</Link>
                            <Link href="/how-to-apply" className="rounded-lg border border-indigo-300 px-6 py-2 sm:px-8 sm:py-3 text-sm font-semibold">How to Apply</Link>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 md:pb-14">
                    <div className="grid gap-4 sm:gap-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 md:p-7 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
                        <div>
                            <div className="flex items-center gap-2 sm:gap-3 text-[#3525cd]">
                                <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                                <h2 className="text-lg font-bold sm:text-xl md:text-2xl text-slate-950">College Admin Panel</h2>
                            </div>
                            <p className="mt-2 sm:mt-3 max-w-3xl text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600">
                                Colleges can create an owner account, add complete institute details, upload campus images with configured cloud storage, and review student applications from the dashboard.
                            </p>
                        </div>
                        <Link href="/college-owner" className="flex items-center justify-center gap-2 rounded-lg bg-[#3525cd] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                            <UploadCloud className="h-4 w-4" />
                            Open Panel
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
