"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Bookmark, Clock3, ExternalLink, Loader2, Search } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import type { College } from "@/types/college";

export default function HistoryPage() {
  const [savedColleges, setSavedColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHistory() {
      const response = await fetch("/api/saved");
      const payload = await response.json();

      if (!response.ok) {
        const message = payload.error ?? "Please login to see your history.";
        setError(message);
        toast.error(message);
      } else {
        setSavedColleges(payload.data);
      }

      setLoading(false);
    }

    loadHistory();
  }, []);

  return (
    <DashboardShell>
      <section className="px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <h1 className="text-2xl font-bold leading-tight tracking-normal text-[#0b1c30] xl:text-5xl">History</h1>
          <p className="mt-2 text-sm text-slate-600">Recent dashboard activity from your account.</p>
        </motion.div>

        {loading ? (
          <div className="flex min-h-[360px] items-center justify-center text-[#3525cd]">
            <Loader2 className="mr-3 h-6 w-6 animate-spin" /> Loading history
          </div>
        ) : error ? (
          <div className="mt-12 rounded-xl border border-slate-300 bg-white p-8">
            <p className="text-lg font-semibold text-slate-700">{error}</p>
            <Link href="/login" className="mt-6 inline-block rounded-lg bg-[#3525cd] px-6 py-3 font-bold text-white">Login</Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-5">
            <ActivityItem icon={<Search className="h-5 w-5" />} title="Opened college discovery" description="Browsed the university search experience." href="/colleges" />
            {savedColleges.map((college) => (
              <ActivityItem
                key={college.id}
                icon={<Bookmark className="h-5 w-5" />}
                title={`Saved ${college.shortName ?? college.name}`}
                description={`${college.location} - Rank #${college.rank}`}
                href={`/colleges/${college.id}`}
              />
            ))}
            {savedColleges.length === 0 ? (
              <div className="rounded-xl border border-slate-300 bg-white p-8">
                <p className="text-lg font-semibold text-slate-700">No saved activity yet.</p>
                <Link href="/colleges" className="mt-6 inline-block rounded-lg bg-[#3525cd] px-6 py-3 font-bold text-white">Explore Colleges</Link>
              </div>
            ) : null}
          </div>
        )}
      </section>
    </DashboardShell>
  );
}

function ActivityItem({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eff4ff] text-[#3525cd]">{icon}</div>
        <div>
          <p className="font-bold text-[#0b1c30]">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm font-bold text-[#0058be]">
        <Clock3 className="h-4 w-4" /> Recent <ExternalLink className="h-4 w-4" />
      </div>
    </Link>
  );
}
