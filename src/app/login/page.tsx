"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, Lock, Mail, Star, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await login({ email, password });
      router.push("/saved");
    } catch {
      // Error is rendered from the auth hook state.
    }
  }

  return (
    <main className="grid h-dvh overflow-hidden bg-white lg:grid-cols-[0.95fr_1.05fr]">
      <motion.section
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="login-campus campus-image hidden h-dvh flex-col justify-center px-12 text-white lg:flex xl:px-16"
      >
        <div className="max-w-[560px]">
          <h1 className="text-2xl font-bold leading-none">EduVision AI</h1>
          <div className="mt-4 h-1 w-24 rounded-full bg-cyan-300" />
          <h2 className="mt-7 text-[34px] font-bold leading-[1.13] tracking-normal xl:text-[40px]">
            Join 1M+ students making better choices.
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-7 rounded-xl border border-white/35 bg-white/35 p-5 text-slate-950 backdrop-blur-md"
          >
            <p className="text-sm italic leading-6">
              &quot;EduVision AI transformed my university search from a guessing game into a data-driven journey. I found my perfect fit in weeks!&quot;
            </p>
            <div className="mt-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80')] bg-cover" />
              <div>
                <p className="text-sm font-bold tracking-widest">Alex Rivera</p>
                <p className="text-xs">Stanford Candidate &apos;25</p>
              </div>
            </div>
          </motion.div>
          <div className="mt-7 flex gap-5 text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Star className="h-5 w-5" /> Top Ranked</span>
            <span className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> AI Insights</span>
          </div>
        </div>
      </motion.section>

      <section className="flex h-dvh items-center justify-center overflow-hidden px-5 py-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="w-full max-w-[440px]"
        >
          <div className="modern-surface rounded-xl px-6 py-6">
            <div className="text-center">
              <h1 className="text-xl font-bold leading-tight">Welcome Back</h1>
              <p className="mt-1 text-xs text-slate-600">Continue your academic journey</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button className="h-10 rounded-lg border border-slate-300 text-xs font-bold tracking-widest">Google</button>
              <button className="h-10 rounded-lg border border-slate-300 text-xs font-bold tracking-widest">LinkedIn</button>
            </div>
            <div className="my-5 flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
              <span className="h-px flex-1 bg-slate-300" />
              OR Email
              <span className="h-px flex-1 bg-slate-300" />
            </div>
            <form onSubmit={handleSubmit}>
              <label className="text-xs font-bold tracking-widest">Email Address</label>
              <div className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-slate-300 bg-[#eff4ff] px-4">
                <Mail className="h-4 w-4" />
                <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="name@university.edu" type="email" required />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <label className="text-xs font-bold tracking-widest">Password</label>
                <a className="text-xs font-bold text-[#0058be]">Forgot?</a>
              </div>
              <div className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-slate-300 bg-[#eff4ff] px-4">
                <Lock className="h-4 w-4" />
                <input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Password" type="password" required />
                <Eye className="h-4 w-4" />
              </div>
              {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="mt-5 h-11 w-full rounded-lg bg-[#3525cd] text-sm font-bold text-white shadow-xl shadow-indigo-500/20 disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
              </motion.button>
            </form>
            <p className="mt-4 text-center text-xs">
              Don&apos;t have an account?{" "}
              <Link className="font-bold text-[#3525cd]" href="/signup">
                Create Account
              </Link>
            </p>
          </div>
          <div className="mt-4 flex justify-center gap-8 text-xs text-slate-700">
            <span>Support</span>
            <span>Privacy</span>
            <span>Legal</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
