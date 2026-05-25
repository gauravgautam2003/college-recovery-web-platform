"use client";

import Link from "next/link";
import type React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Lock, Mail, User } from "lucide-react";

export default function SignupPage() {
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
            Build your shortlist with smarter data.
          </h2>
          <div className="mt-14 grid gap-4">
            {["AI-matched universities", "Verified placement insights", "Scholarship and deadline tracking"].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 rounded-2xl border border-white/30 bg-white/25 p-5 text-xl font-semibold backdrop-blur-md"
              >
                <CheckCircle2 className="h-7 w-7 text-cyan-200" />
                {item}
              </motion.div>
            ))}
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
          <div className="soft-shadow rounded-2xl border border-slate-300 bg-white px-10 py-10">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e2dfff] text-[#3525cd]">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h1 className="mt-5 text-[30px] font-bold leading-tight">Create Account</h1>
              <p className="mt-3 text-[20px] text-slate-700">Start your academic journey</p>
            </div>

            <div className="mt-9 grid gap-5">
              <Field icon={<User className="h-6 w-6" />} label="Full Name" placeholder="Alex Johnson" />
              <Field icon={<Mail className="h-6 w-6" />} label="Email Address" placeholder="name@university.edu" />
              <Field icon={<Lock className="h-6 w-6" />} label="Password" placeholder="Create a password" type="password" />
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-[#3525cd]" defaultChecked />
                I agree to receive AI-powered college recommendations, admissions alerts, and account updates.
              </label>
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 h-[64px] w-full rounded-xl bg-[#3525cd] text-lg font-bold text-white shadow-xl shadow-indigo-500/20"
            >
              Sign Up
            </motion.button>
            <p className="mt-8 text-center text-lg">
              Already have an account?{" "}
              <Link className="font-bold text-[#3525cd]" href="/login">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function Field({
  icon,
  label,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="font-bold tracking-widest">{label}</label>
      <div className="mt-3 flex h-[68px] items-center gap-3 rounded-xl border border-slate-300 bg-[#eff4ff] px-5">
        {icon}
        <input className="w-full bg-transparent text-lg outline-none" placeholder={placeholder} type={type} />
      </div>
    </div>
  );
}
