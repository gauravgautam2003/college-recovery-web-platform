"use client";

import type React from "react";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Loader2, Mail, MapPin, Save, Target, User } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import BackButton from "@/components/shared/BackButton";
import type { PublicUser } from "@/types/user";

export default function ProfilePage() {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [name, setName] = useState("");
  const [targetCourse, setTargetCourse] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const response = await fetch("/api/users");
      const payload = await response.json();

      if (!response.ok) {
        const message = payload.error ?? "Please login to edit your profile.";
        setError(message);
        toast.error(message);
      } else {
        setUser(payload.data);
        setName(payload.data.name ?? "");
        setTargetCourse(payload.data.targetCourse ?? "");
        setPreferredLocation(payload.data.preferredLocation ?? "");
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    const toastId = toast.loading("Saving profile...");

    const response = await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, targetCourse, preferredLocation }),
    });
    const payload = await response.json();

    if (!response.ok) {
      const message = payload.error ?? "Could not update profile.";
      setError(message);
      toast.error(message, { id: toastId });
    } else {
      setUser(payload.data);
      const message = payload.message ?? "Profile updated successfully.";
      setMessage(message);
      toast.success(message, { id: toastId });
    }

    setSaving(false);
  }

  return (
    <DashboardShell>
      <section className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-normal text-[#0b1c30]">Profile</h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600">Update your student details and preferences.</p>
        </motion.div>

        {loading ? (
          <div className="flex min-h-[240px] sm:min-h-[360px] items-center justify-center text-[#3525cd]">
            <Loader2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-spin" /> <span className="text-xs sm:text-base">Loading profile</span>
          </div>
        ) : error && !user ? (
          <div className="mt-8 sm:mt-12 rounded-xl border border-slate-300 bg-white p-4 sm:p-6 md:p-8">
            <p className="text-base sm:text-lg font-semibold text-slate-700">{error}</p>
            <Link href="/login" className="mt-4 sm:mt-6 inline-block rounded-lg bg-[#3525cd] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#2b1fa8] transition">Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 max-w-3xl rounded-xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 shadow-sm">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              <Field icon={<User className="h-4 w-4 sm:h-5 sm:w-5" />} label="Full Name" value={name} onChange={setName} required />
              <Field icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />} label="Email" value={user?.email ?? ""} disabled />
              <Field icon={<Target className="h-4 w-4 sm:h-5 sm:w-5" />} label="Target Course" value={targetCourse} onChange={setTargetCourse} placeholder="B.Tech CSE" />
              <Field icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5" />} label="Preferred Location" value={preferredLocation} onChange={setPreferredLocation} placeholder="Bengaluru" />
            </div>
            {message && <p className="mt-4 sm:mt-6 rounded-lg bg-emerald-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-700">{message}</p>}
            {error && <p className="mt-4 sm:mt-6 rounded-lg bg-red-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-red-700">{error}</p>}
            <button disabled={saving} className="mt-6 sm:mt-8 flex h-10 sm:h-12 items-center justify-center gap-2 sm:gap-3 rounded-lg bg-[#3525cd] px-4 sm:px-6 text-xs sm:text-sm font-bold tracking-widest text-white shadow-lg shadow-indigo-500/20 disabled:opacity-60 hover:bg-[#2b1fa8] transition w-full sm:w-auto">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>
        )}
      </section>
    </DashboardShell>
  );
}

function Field({ icon, label, value, onChange, placeholder, disabled = false, required = false }: { icon: React.ReactNode; label: string; value: string; onChange?: (value: string) => void; placeholder?: string; disabled?: boolean; required?: boolean }) {
  return (
    <div>
      <label className="text-xs sm:text-sm font-bold tracking-widest text-slate-700">{label}</label>
      <div className="mt-1.5 sm:mt-2 flex h-10 sm:h-12 items-center gap-2 sm:gap-3 rounded-lg border border-slate-300 bg-[#eff4ff] px-3 sm:px-4">
        <span className="text-slate-600 flex-shrink-0">{icon}</span>
        <input
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className="w-full bg-transparent text-xs sm:text-base outline-none disabled:text-slate-500"
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
      </div>
    </div>
  );
}
