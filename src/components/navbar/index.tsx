import Link from "next/link";
import { Search } from "lucide-react";

const links = [
  { href: "/", label: "Discover" },
  { href: "/colleges", label: "Universities" },
  { href: "/colleges", label: "Rankings" },
  { href: "/compare", label: "Compare" },
];

export default function Navbar({ dashboard = false }: { dashboard?: boolean }) {
  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#3525cd]">
          EduVision AI
        </Link>
        <div className="hidden items-center gap-9 text-[15px] text-slate-900 md:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-[#3525cd]">
              {link.label}
            </Link>
          ))}
        </div>
        {dashboard ? (
          <div className="flex items-center gap-5">
            <Search className="h-6 w-6" />
            <div className="h-10 w-10 rounded-full bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80')] bg-cover" />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-950">
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-[#4f46e5] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
