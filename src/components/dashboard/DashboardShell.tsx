"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Clock, FileText, Menu, Settings, User, X } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { cn } from "@/components/ui";

const dashboardLinks = [
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/applications", label: "Applications", icon: FileText },
  { href: "/history", label: "History", icon: Clock },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar dashboard />
      <main className="relative grid bg-[#f8f9ff] lg:grid-cols-[390px_1fr]">
        <button
          type="button"
          aria-label="Open dashboard menu"
          title="Open dashboard menu"
          onClick={() => setSidebarOpen(true)}
          className="fixed right-4 top-20 z-40 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#3525cd] shadow-lg shadow-slate-900/10 transition hover:bg-[#eff4ff] lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close dashboard menu"
            className="fixed inset-0 z-40 bg-slate-950/35 lg:hidden"
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-[min(82vw,320px)] flex-col border-r border-slate-200 bg-[#eff4ff] p-6 shadow-2xl shadow-slate-900/20 transition-transform duration-200 lg:static lg:z-auto lg:min-h-[calc(100vh-64px)] lg:w-auto lg:translate-x-0 lg:shadow-none",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold leading-tight text-[#3525cd]">Dashboard</h1>
                <p className="mt-1 text-sm text-slate-600">Your educational journey</p>
              </div>
              <button
                type="button"
                aria-label="Close dashboard menu"
                title="Close dashboard menu"
                onClick={() => setSidebarOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:text-[#3525cd] lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 grid gap-3 text-sm font-bold tracking-widest">
              {dashboardLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex h-12 items-center gap-4 rounded-lg px-5 transition hover:bg-white hover:text-[#3525cd]",
                      active ? "bg-[#4f46e5] text-white shadow-lg shadow-indigo-500/20 hover:bg-[#4f46e5] hover:text-[#3525cd]" : "text-slate-800",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {children}
      </main>
      <Footer />
    </>
  );
}
