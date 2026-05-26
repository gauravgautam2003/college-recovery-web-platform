"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Clock, Settings, User } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { cn } from "@/components/ui";

const dashboardLinks = [
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/history", label: "History", icon: Clock },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Navbar dashboard />
      <main className="grid bg-[#f8f9ff] lg:grid-cols-[390px_1fr]">
        <aside className="flex min-h-[calc(100vh-64px)] flex-col border-r border-slate-200 bg-[#eff4ff] p-6">
          <div>
            <h1 className="text-2xl font-bold leading-tight text-[#3525cd]">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">Your educational journey</p>
            <nav className="mt-8 grid gap-3 text-sm font-bold tracking-widest">
              {dashboardLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex h-12 items-center gap-4 rounded-lg px-5 transition hover:bg-white hover:text-[#3525cd]",
                      active ? "bg-[#4f46e5] text-white shadow-lg shadow-indigo-500/20 hover:bg-[#4f46e5] hover:text-white" : "text-slate-800",
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
