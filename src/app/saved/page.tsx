"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Bookmark, GitCompareArrows, Loader2, MapPin, Plus, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import DashboardShell from "@/components/dashboard/DashboardShell";
import type { College } from "@/types/college";

export default function SavedPage() {
  const [savedColleges, setSavedColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSaved() {
      const response = await fetch("/api/saved");
      const payload = await response.json();
      if (!response.ok) {
        const message = payload.error ?? "Please login to see saved colleges.";
        setError(message);
        toast.error(message);
      } else {
        setSavedColleges(payload.data);
      }
      setLoading(false);
    }

    loadSaved();
  }, []);

  async function removeSavedCollege(collegeId: string) {
    const toastId = toast.loading("Removing saved college...");
    const response = await fetch(`/api/saved?collegeId=${encodeURIComponent(collegeId)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      const message = payload?.error ?? "Could not remove college right now.";
      setError(message);
      toast.error(message, { id: toastId });
      return;
    }

    setSavedColleges((current) => current.filter((college) => college.id !== collegeId));
    toast.success("College removed from saved list.", { id: toastId });
  }

  return (
    <DashboardShell>
        <section className="px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold leading-tight tracking-normal text-[#0b1c30] xl:text-5xl">
                Your Saved Colleges
              </h1>
              <p className="mt-2 text-sm text-slate-600">Loaded from `/api/saved`.</p>
            </div>
            <div className="flex gap-5">
              <Link href="/compare" className="flex h-12 items-center gap-3 rounded-lg border border-[#0058be] px-5 text-sm font-bold tracking-widest text-[#0058be]">
                <GitCompareArrows className="h-4 w-4" /> Compare
              </Link>
              <Link href="/colleges" className="flex h-12 items-center gap-3 rounded-lg bg-[#3525cd] px-5 text-sm font-bold tracking-widest text-white shadow-lg shadow-indigo-500/20">
                <Plus className="h-4 w-4" /> Find More
              </Link>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex min-h-[360px] items-center justify-center text-[#3525cd]">
              <Loader2 className="mr-3 h-6 w-6 animate-spin" /> Loading saved colleges
            </div>
          ) : error ? (
            <div className="mt-12 rounded-xl border border-slate-300 bg-white p-8">
              <p className="text-lg font-semibold text-slate-700">{error}</p>
              <Link href="/login" className="mt-6 inline-block rounded-lg bg-[#3525cd] px-6 py-3 font-bold text-white">Login</Link>
            </div>
          ) : savedColleges.length === 0 ? (
            <div className="mt-12 rounded-xl border border-slate-300 bg-white p-8">
              <p className="text-lg font-semibold text-slate-700">No saved colleges yet.</p>
              <Link href="/colleges" className="mt-6 inline-block rounded-lg bg-[#3525cd] px-6 py-3 font-bold text-white">Explore Colleges</Link>
            </div>
          ) : (
            <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }} className="mt-12 grid gap-7 xl:grid-cols-2">
              {savedColleges.map((college) => (
                <motion.article key={college.id} variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -4 }} transition={{ duration: 0.35 }} className="modern-surface overflow-hidden rounded-xl">
                  <div className="campus-image relative h-48 bg-center" style={{ backgroundImage: `url(${college.image})` }}>
                    <span className="absolute bottom-6 left-8 rounded bg-cyan-300/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00505f]">
                      Rank #{college.rank}
                    </span>
                    <button
                      onClick={() => removeSavedCollege(college.id)}
                      aria-label={`Remove ${college.name} from saved colleges`}
                      className="absolute right-6 top-6 rounded-full bg-white/80 p-4 text-[#3525cd] backdrop-blur transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Bookmark className="h-7 w-7" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-2xl font-bold leading-tight">{college.shortName ?? college.name}</h2>
                      <span className="shrink-0 text-sm font-bold text-[#001aee]"><Star className="inline h-4 w-4" /> {college.rating}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-700">
                      <MapPin className="mr-1 inline h-5 w-5" /> {college.location} - {college.type}
                    </p>
                    <div className="mt-8 grid grid-cols-3 gap-5 text-center">
                      {[["Acceptance", college.acceptanceRate], ["Fees", college.fees], ["Package", college.averagePackage]].map(([label, value]) => (
                        <div key={label} className="rounded-lg bg-[#eff4ff] p-4">
                          <p className="text-xs font-bold uppercase">{label}</p>
                          <p className="mt-2 text-base font-bold tracking-widest text-[#001aee]">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex gap-4">
                      <Link href={`/colleges/${college.id}`} className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#3525cd] text-sm font-bold tracking-widest text-white">
                        View Details
                      </Link>
                      <button
                        onClick={() => removeSavedCollege(college.id)}
                        className="flex h-12 items-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-bold text-red-600 transition hover:border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </section>
    </DashboardShell>
  );
}
