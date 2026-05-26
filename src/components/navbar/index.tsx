"use client";

import Link from "next/link";
import { Building2, GraduationCap, LayoutDashboard, Search } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Discover" },
  { href: "/colleges", label: "Universities" },
  { href: "/compare", label: "Compare" },
  { href: "/how-to-apply", label: "How to Apply", icon: GraduationCap },
  { href: "/saved", label: "Dashboard", icon: LayoutDashboard },
  { href: "/college-owner", label: "For Colleges", icon: Building2 },
];

export default function Navbar({ dashboard = false }: { dashboard?: boolean }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 px-5 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="text-lg font-bold text-[#3525cd]">
          EduVision AI
        </Link>
        <div className="hidden items-center gap-2 text-sm font-semibold text-slate-700 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-2 rounded-full px-3.5 py-2 transition hover:bg-[#eff4ff] hover:text-[#3525cd] ${
                link.label === "Dashboard" || link.label === "For Colleges" ? "border border-indigo-100 bg-[#f5f3ff] text-[#3525cd]" : ""
              }`}
            >
              {link.icon ? <link.icon className="h-4 w-4" /> : null}
              {link.label}
            </Link>
          ))}
        </div>
        {dashboard ? (
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5" />
            <div className="h-9 w-9 rounded-full bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80')] bg-cover ring-2 ring-indigo-100" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-slate-700">
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-[#4f46e5] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
