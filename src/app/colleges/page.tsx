"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ChevronDown, Heart, Loader2, MapPin, Search, SlidersHorizontal, Star } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useColleges } from "@/hooks/useColleges";

export default function CollegesPage() {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("Delhi");
    const [sort, setSort] = useState<"rank" | "rating" | "fees" | "package">("rank");
    const filters = useMemo(() => ({ search, location, sort }), [search, location, sort]);
    const { colleges, loading, error } = useColleges(filters);
    const [savedMessage, setSavedMessage] = useState<string | null>(null);

    async function saveCollege(collegeId: string) {
        const toastId = toast.loading("Saving college...");
        try {
            const response = await fetch("/api/saved", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ collegeId }),
            });
            const payload = await response.json();
            const message = response.ok ? "College saved to your dashboard." : payload.error ?? "Please login to save colleges.";
            setSavedMessage(message);
            if (!response.ok) {
                toast.error(message, { id: toastId });
                return;
            }
            toast.success(message, { id: toastId });
        } catch {
            const message = "Could not save college right now.";
            setSavedMessage(message);
            toast.error(message, { id: toastId });
        }
    }

    return (
        <>
            <Navbar />
            <main className="grid min-h-screen bg-[#f8f9ff] lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
                <motion.aside initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }} className="lg:block border-r border-slate-200 bg-[#eff4ff] p-4 sm:p-6 overflow-y-auto">
                    <h1 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold text-[#3525cd]">
                        <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" /> Filters
                    </h1>
                    <p className="mt-1 text-xs sm:text-sm font-semibold tracking-widest text-slate-500">Connected to backend API</p>
                    <div className="mt-6 sm:mt-7 grid gap-5 sm:gap-7 text-xs sm:text-sm">
                        <div>
                            <h2 className="mb-3 sm:mb-4 font-bold uppercase tracking-widest text-[#3525cd]">Search</h2>
                            <div className="flex items-center gap-2 sm:gap-3 rounded-lg border border-slate-300 bg-white px-3 sm:px-4 py-2 sm:py-3">
                                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                                <input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    className="w-full bg-transparent outline-none text-xs sm:text-base"
                                    placeholder="College, course, or city"
                                />
                            </div>
                        </div>
                        <Filter title="Location" active={location} items={["Delhi", "Noida", "Bengaluru", "Manipal", "Pilani"]} onChange={setLocation} />
                        <div>
                            <h2 className="mb-3 sm:mb-4 font-bold uppercase tracking-widest text-[#3525cd]">Sort By</h2>
                            <select
                                value={sort}
                                onChange={(event) => setSort(event.target.value as typeof sort)}
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 sm:px-4 py-2 sm:py-3 font-semibold text-xs sm:text-base"
                            >
                                <option value="rank">Rank</option>
                                <option value="rating">Rating</option>
                                <option value="fees">Lowest Fees</option>
                                <option value="package">Best Package</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={() => setLocation("")} className="mt-8 sm:mt-16 w-full rounded-xl bg-[#3525cd] py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition">
                        Clear Location
                    </button>
                </motion.aside>

                <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-4 sm:p-6 md:p-7">
                    <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Discover Top Colleges</h1>
                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600 truncate">
                                {loading ? "Loading verified college records..." : `Showing ${colleges.length} backend results`}
                            </p>
                        </div>

                        <button className="hidden lg:flex items-center gap-2 rounded-xl bg-[#eff4ff] px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold">
                            Sort by: {sort} <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>

                    {savedMessage && <p className="mt-4 sm:mt-5 rounded-lg bg-[#e2dfff] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-[#3525cd]">{savedMessage}</p>}
                    {error && <p className="mt-4 sm:mt-5 rounded-lg bg-red-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-red-700">{error}</p>}

                    <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {loading ? (
                            <div className="col-span-full flex min-h-[200px] sm:min-h-[320px] items-center justify-center text-[#3525cd]">
                                <Loader2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-spin" /> <span className="text-xs sm:text-base">Loading colleges</span>
                            </div>
                        ) : (
                            colleges.map((college) => (
                                <motion.article key={college.id} whileHover={{ y: -4 }} transition={{ duration: 0.25 }} className="modern-surface overflow-hidden rounded-xl">
                                    <div className="campus-image relative h-28 sm:h-36 md:h-40 lg:h-44" style={{ backgroundImage: `url(${college.image})` }}>
                                        <button onClick={() => saveCollege(college.id)} className="absolute right-2 sm:right-3 top-2 sm:top-3 md:top-4 rounded-full bg-white p-1.5 sm:p-2 md:p-2.5 shadow hover:shadow-md transition" aria-label="Save college">
                                            <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                                        </button>
                                        <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 md:left-4 md:bottom-4 rounded-lg bg-[#3525cd] px-2 sm:px-3 py-1 sm:py-1.5 text-xs md:text-sm font-bold text-white">Rank #{college.rank}</span>
                                    </div>
                                    <div className="p-3 sm:p-4 md:p-5">
                                        <div className="flex items-start justify-between gap-2">
                                            <h2 className="truncate text-sm sm:text-base md:text-lg lg:text-xl font-bold">{college.shortName ?? college.name}</h2>
                                            <span className="rounded-lg bg-[#93e8ff] px-2 sm:px-3 py-1 text-xs md:text-sm font-semibold whitespace-nowrap flex-shrink-0"><Star className="mr-0.5 sm:mr-1 inline h-3 w-3 sm:h-3.5 sm:w-3.5" />{college.rating}</span>
                                        </div>
                                        <p className="mt-1 sm:mt-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-700"><MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" /> <span className="truncate">{college.location}</span></p>
                                        <div className="mt-3 sm:mt-4 md:mt-5 grid grid-cols-2 border-y border-slate-100 py-3 sm:py-4 gap-3 sm:gap-4">
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 mb-0.5 sm:mb-1">Avg. Package</p>
                                                <p className="text-xs sm:text-sm md:text-base font-bold truncate">{college.averagePackage}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 mb-0.5 sm:mb-1">Total Fees</p>
                                                <p className="text-xs sm:text-sm md:text-base font-bold truncate">{college.fees}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 sm:mt-4 md:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 text-xs sm:text-sm">
                                            <label className="flex items-center gap-2 font-semibold cursor-pointer"><input type="checkbox" className="h-4 w-4" /> Compare</label>
                                            <Link href={`/colleges/${college.id}`} className="rounded-xl bg-[#d8e8ff] px-3 sm:px-4 py-2 sm:py-2.5 font-semibold text-[#001aee] text-center hover:bg-[#c2dcff] transition">View Details</Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))
                        )}
                    </div>
                </motion.section>
            </main>
            <Footer />
        </>
    );
}

function Filter({
    title,
    items,
    active,
    onChange,
}: {
    title: string;
    items: string[];
    active: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <h2 className="mb-4 font-bold uppercase tracking-widest text-[#3525cd]">{title}</h2>
            <div className="grid gap-4">
                {items.map((item) => (
                    <label key={item} className="flex items-center gap-3">
                        <input checked={active === item} onChange={() => onChange(item)} type="radio" className="h-4 w-4 accent-[#3525cd]" />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
}
