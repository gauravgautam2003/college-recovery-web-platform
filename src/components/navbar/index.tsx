"use client";

import Link from "next/link";
import { Building2, GraduationCap, LayoutDashboard, Search, Menu } from "lucide-react";
import { useState } from "react";
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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            {/* Sidebar Drawer for Mobile */}
            <div
                className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setSidebarOpen(false)}
            />
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 sm:w-72 bg-white shadow-lg transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                style={{ willChange: "transform" }}
            >
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b">
                    <Link href="/" className="text-base sm:text-lg font-bold text-[#3525cd]" onClick={() => setSidebarOpen(false)}>
                        EduVision AI
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar" className="p-2">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </div>
                <nav className="flex flex-col text-sm gap-1 sm:gap-2 p-4 sm:p-6">
                    {links.map((link) => (
                        <div key={link.label}>
                            <Link
                                href={link.href}
                                className="flex items-center gap-3 rounded px-3 py-2 text-sm sm:text-base font-medium text-slate-700 hover:bg-[#eff4ff] hover:text-[#3525cd] transition"
                                onClick={() => setSidebarOpen(false)}
                            >
                                {link.icon ? <link.icon className="h-4 w-4 sm:h-5 sm:w-5" /> : null}
                                {link.label}
                            </Link>
                        </div>
                    ))}
                    <div className="flex flex-col gap-2 mt-4 sm:mt-6">
                        <Link href="/login" className="rounded-lg border border-gray-600 bg-[#e5e4f0] px-4 py-2 text-xs sm:text-sm font-bold text-gray-800 shadow-lg shadow-black-500/20 transition hover:-translate-y-0.5 text-center">
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="rounded-lg bg-[#4f46e5] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 text-center"
                        >
                            Sign Up
                        </Link>
                    </div>
                </nav>
            </aside>

            <motion.nav
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 px-3 sm:px-4 md:px-6 backdrop-blur-xl"
            >
                <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between gap-3 sm:gap-4">
                    <Link href="/" className="text-base sm:text-lg font-bold text-[#3525cd] shrink-0">
                        EduVision AI
                    </Link>
                    {/* Desktop Nav */}
                    <div className="hidden items-center text-[10px] sm:text-[12px] font-semibold text-slate-700 md:flex gap-1 lg:gap-2">
                        {links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={`flex items-center gap-1 lg:gap-2 rounded-full px-2 sm:px-3 lg:px-3.5 py-2 transition hover:bg-[#eff4ff] hover:text-[#3525cd] whitespace-nowrap ${link.label === "Dashboard" || link.label === "For Colleges" ? "border border-indigo-100 bg-[#f5f3ff] text-[#3525cd]" : ""
                                    }`}
                            >
                                {link.icon ? <link.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : null}
                                <span className="hidden lg:inline">{link.label}</span>
                                <span className="inline lg:hidden">{link.label.split(" ")[0]}</span>
                            </Link>
                        ))}
                    </div>
                    {/* Mobile Hamburger Icon */}
                    <button
                        className="flex md:hidden items-center justify-center p-2 rounded hover:bg-[#eff4ff]"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-[#3525cd]" />
                    </button>
                </div>
            </motion.nav>
        </>
    );
}
