"use client";

import Link from "next/link";
import type React from "react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Lock, Mail, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import BackButton from "@/components/shared/BackButton";

export default function SignupPage() {
  const router = useRouter();
  const { signup, loading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await signup({ name, email, password });
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
            Build your shortlist with smarter data.
          </h2>
          <div className="mt-8 grid gap-3">
            {["AI-matched universities", "Verified placement insights", "Scholarship and deadline tracking"].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/25 p-3.5 text-xs font-semibold backdrop-blur-md"
              >
                <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                {item}
              </motion.div>
            ))}
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
          <BackButton fallbackHref="/" className="mb-4" />
          <div className="modern-surface rounded-xl px-6 py-6">
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#e2dfff] text-[#3525cd]">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h1 className="mt-3 text-xl font-bold leading-tight">Create Account</h1>
              <p className="mt-1 text-xs text-slate-600">Start your academic journey</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-3.5">
              <Field icon={<User className="h-6 w-6" />} label="Full Name" placeholder="Alex Johnson" value={name} onChange={setName} />
              <Field icon={<Mail className="h-6 w-6" />} label="Email Address" placeholder="name@university.edu" type="email" value={email} onChange={setEmail} />
              <Field icon={<Lock className="h-6 w-6" />} label="Password" placeholder="Create a password" type="password" value={password} onChange={setPassword} />
              <label className="flex items-start gap-3 text-xs leading-5 text-slate-600">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-[#3525cd]" defaultChecked />
                I agree to receive AI-powered college recommendations, admissions alerts, and account updates.
              </label>
              {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="h-11 w-full rounded-lg bg-[#3525cd] text-sm font-bold text-white shadow-xl shadow-indigo-500/20 disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </motion.button>
            </form>
            <p className="mt-4 text-center text-xs">
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
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-bold tracking-widest">{label}</label>
      <div className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-slate-300 bg-[#eff4ff] px-4">
        {icon}
        <input value={value} onChange={(event) => onChange(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder={placeholder} type={type} required />
      </div>
    </div>
  );
}
