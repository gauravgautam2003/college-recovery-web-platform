"use client";

import { motion } from "framer-motion";
import { Bookmark, Clock, GitCompareArrows, MapPin, MoreVertical, Plus, Settings, Star, User } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { savedColleges } from "@/data/eduvision";

const recent = [
  {
    name: "Stanford University",
    location: "California, USA",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=220&q=80",
  },
  {
    name: "MIT",
    location: "Massachusetts, USA",
    image: "https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=220&q=80",
  },
  {
    name: "Oxford University",
    location: "Oxford, UK",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=220&q=80",
  },
];

export default function SavedPage() {
  return (
    <>
      <Navbar dashboard />
      <main className="grid bg-[#f8f9ff] lg:grid-cols-[390px_1fr]">
        <aside className="flex min-h-[calc(100vh-72px)] flex-col border-r border-slate-200 bg-[#eff4ff] p-8">
          <div>
            <h1 className="text-[30px] font-bold leading-tight text-[#3525cd]">Dashboard</h1>
            <p className="mt-1 text-[18px] text-slate-700">Your educational journey</p>
            <nav className="mt-10 grid gap-4 text-[17px] font-bold tracking-widest">
              <span className="flex h-[68px] items-center gap-5 rounded-lg bg-[#4f46e5] px-6 text-white"><Bookmark /> Saved</span>
              <span className="flex h-[68px] items-center gap-5 rounded-lg px-6 text-slate-800"><Clock /> History</span>
              <span className="flex h-[68px] items-center gap-5 rounded-lg px-6 text-slate-800"><User /> Profile</span>
              <span className="flex h-[68px] items-center gap-5 rounded-lg px-6 text-slate-800"><Settings /> Settings</span>
            </nav>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="mt-auto rounded-xl border border-slate-300 bg-white p-7 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80')] bg-cover" />
              <div>
                <p className="text-lg font-bold tracking-widest">Alex Johnson</p>
                <p className="text-xs font-bold uppercase tracking-widest text-[#00505f]">Verified Student</p>
              </div>
            </div>
            <p className="mt-6 rounded-lg bg-[#d8e8ff] p-4 text-lg text-slate-700">Targeting MBA 2025</p>
            <button className="mt-5 h-[48px] w-full rounded-lg bg-[#3525cd] text-lg font-bold tracking-widest text-white">
              Edit Preferences
            </button>
          </motion.div>
        </aside>

        <section className="px-10 py-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex flex-wrap items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-[56px] font-bold leading-[1.08] tracking-normal text-[#0b1c30] xl:text-[64px]">
                Your Saved Colleges
              </h1>
              <p className="mt-3 text-[24px] text-slate-600">Review and compare your top academic choices.</p>
            </div>
            <div className="flex gap-5">
              <motion.button whileHover={{ y: -2 }} className="flex h-[66px] items-center gap-3 rounded-xl border border-[#0058be] px-8 text-lg font-bold tracking-widest text-[#0058be]">
                <GitCompareArrows className="h-6 w-6" /> Compare All
              </motion.button>
              <motion.button whileHover={{ y: -2 }} className="flex h-[66px] items-center gap-3 rounded-xl bg-[#3525cd] px-8 text-lg font-bold tracking-widest text-white shadow-lg shadow-indigo-500/20">
                <Plus className="h-6 w-6" /> Find More
              </motion.button>
            </div>
          </motion.div>

          <div className="mt-20 flex items-center justify-between">
            <h2 className="text-[30px] font-bold">Recently Viewed</h2>
            <button className="text-lg font-bold tracking-widest text-[#3525cd]">View History</button>
          </div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-8 grid gap-7 xl:grid-cols-3"
          >
            {recent.map((item) => (
              <motion.div
                key={item.name}
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
                className="flex h-[120px] items-center gap-5 rounded-xl border border-slate-300 bg-white p-5"
              >
                <div className="h-20 w-20 shrink-0 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                <div>
                  <h3 className="text-[19px] font-bold tracking-widest">{item.name}</h3>
                  <p className="mt-1 text-lg text-slate-700">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="mt-24 grid gap-10 xl:grid-cols-2"
          >
            {savedColleges.map((college) => (
              <motion.article
                key={college.name}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm"
              >
                <div className="campus-image relative h-[232px] bg-center" style={{ backgroundImage: `url(${college.image})` }}>
                  <span className="absolute bottom-6 left-8 rounded bg-cyan-300/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00505f]">
                    {college.badge}
                  </span>
                  <button className="absolute right-6 top-6 rounded-full bg-white/80 p-4 text-[#3525cd] backdrop-blur">
                    <Bookmark className="h-7 w-7" />
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-[30px] font-bold leading-tight">{college.name}</h2>
                    <span className="shrink-0 text-lg font-bold text-[#001aee]"><Star className="inline h-5 w-5" /> {college.rating}</span>
                  </div>
                  <p className="mt-4 text-lg text-slate-700">
                    <MapPin className="mr-1 inline h-5 w-5" /> {college.location} • {college.type}
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-5 text-center">
                    {[["Acceptance", college.acceptance], ["Tuition", college.tuition], ["Rank", college.alumni]].map(([label, value]) => (
                      <div key={label} className="rounded-lg bg-[#eff4ff] p-4">
                        <p className="text-xs font-bold uppercase">{label}</p>
                        <p className="mt-2 text-xl font-bold tracking-widest text-[#001aee]">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex gap-4">
                    <button className="h-[78px] flex-1 rounded-lg bg-[#3525cd] text-lg font-bold tracking-widest text-white">
                      Apply Now
                    </button>
                    <button className="h-[78px] rounded-lg border border-slate-300 px-7">
                      <MoreVertical />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
