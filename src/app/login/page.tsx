"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Lock, Mail, Star, TrendingUp } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <motion.section
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="login-campus campus-image hidden min-h-screen flex-col justify-center px-16 text-white lg:flex xl:px-20"
      >
        <div className="max-w-[650px]">
          <h1 className="text-[40px] font-bold leading-none">EduVision AI</h1>
          <div className="mt-5 h-1 w-[120px] rounded-full bg-cyan-300" />
          <h2 className="mt-11 text-[58px] font-bold leading-[1.18] tracking-normal xl:text-[64px]">
            Join 1M+ students making better choices.
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-14 rounded-2xl border border-white/35 bg-white/35 p-8 text-slate-950 backdrop-blur-md"
          >
            <p className="text-[22px] italic leading-9">
              "EduVision AI transformed my university search from a guessing game into a data-driven journey. I found my perfect fit in weeks!"
            </p>
            <div className="mt-8 flex items-center gap-5">
              <div className="h-14 w-14 rounded-full bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80')] bg-cover" />
              <div>
                <p className="text-lg font-bold tracking-widest">Alex Rivera</p>
                <p className="text-base">Stanford Candidate '25</p>
              </div>
            </div>
          </motion.div>
          <div className="mt-16 flex gap-8 text-lg font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Star className="h-7 w-7" /> Top Ranked</span>
            <span className="flex items-center gap-2"><TrendingUp className="h-7 w-7" /> AI Insights</span>
          </div>
        </div>
      </motion.section>

      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="w-full max-w-[560px]"
        >
          <div className="soft-shadow rounded-2xl border border-slate-300 bg-white px-10 py-11">
            <div className="text-center">
              <h1 className="text-[30px] font-bold leading-tight">Welcome Back</h1>
              <p className="mt-3 text-[20px] text-slate-700">Continue your academic journey</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <button className="h-[54px] rounded-xl border border-slate-300 font-bold tracking-widest">Google</button>
              <button className="h-[54px] rounded-xl border border-slate-300 font-bold tracking-widest">LinkedIn</button>
            </div>
            <div className="my-9 flex items-center gap-6 text-sm font-bold uppercase tracking-widest">
              <span className="h-px flex-1 bg-slate-300" />
              OR Email
              <span className="h-px flex-1 bg-slate-300" />
            </div>
            <label className="font-bold tracking-widest">Email Address</label>
            <div className="mt-3 flex h-[72px] items-center gap-3 rounded-xl border border-slate-300 bg-[#eff4ff] px-5">
              <Mail className="h-6 w-6" />
              <input className="w-full bg-transparent text-lg outline-none" placeholder="name@university.edu" />
            </div>
            <div className="mt-7 flex items-center justify-between">
              <label className="font-bold tracking-widest">Password</label>
              <a className="font-bold text-[#0058be]">Forgot?</a>
            </div>
            <div className="mt-3 flex h-[72px] items-center gap-3 rounded-xl border border-slate-300 bg-[#eff4ff] px-5">
              <Lock className="h-6 w-6" />
              <input className="w-full bg-transparent text-lg outline-none" placeholder="••••••••" type="password" />
              <Eye className="h-6 w-6" />
            </div>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 h-[64px] w-full rounded-xl bg-[#3525cd] text-lg font-bold text-white shadow-xl shadow-indigo-500/20"
            >
              Sign In
            </motion.button>
            <p className="mt-8 text-center text-lg">
              Don't have an account?{" "}
              <Link className="font-bold text-[#3525cd]" href="/signup">
                Create Account
              </Link>
            </p>
          </div>
          <div className="mt-10 flex justify-center gap-14 text-slate-700">
            <span>Support</span>
            <span>Privacy</span>
            <span>Legal</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
