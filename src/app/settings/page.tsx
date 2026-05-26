"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Bell, Loader2, LogOut, Mail, Moon, Save } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import BackButton from "@/components/shared/BackButton";

export default function SettingsPage() {
  const router = useRouter();
  const [emailAlerts, setEmailAlerts] = useState(() => getStoredSettings().emailAlerts);
  const [admissionAlerts, setAdmissionAlerts] = useState(() => getStoredSettings().admissionAlerts);
  const [compactMode, setCompactMode] = useState(() => getStoredSettings().compactMode);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function saveSettings() {
    setSaving(true);
    setMessage(null);
    localStorage.setItem("eduvision_settings", JSON.stringify({ emailAlerts, admissionAlerts, compactMode }));
    window.setTimeout(() => {
      setSaving(false);
      setMessage("Settings saved successfully.");
      toast.success("Settings saved successfully.");
    }, 350);
  }

  async function logout() {
    setLoggingOut(true);
    const toastId = toast.loading("Logging out...");
    const response = await fetch("/api/auth", { method: "DELETE" });
    if (!response.ok) {
      toast.error("Could not logout right now.", { id: toastId });
      setLoggingOut(false);
      return;
    }
    toast.success("Logged out successfully.", { id: toastId });
    router.push("/login");
    router.refresh();
  }

  return (
    <DashboardShell>
      <section className="px-8 py-10">
        <BackButton fallbackHref="/saved" className="mb-6" />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <h1 className="text-4xl font-bold leading-tight tracking-normal text-[#0b1c30] xl:text-5xl">Settings</h1>
          <p className="mt-2 text-sm text-slate-600">Manage dashboard preferences and account access.</p>
        </motion.div>

        <div className="mt-10 grid max-w-4xl gap-5">
          <SettingToggle icon={<Mail className="h-5 w-5" />} title="Email recommendations" description="Receive college suggestions and shortlist updates." checked={emailAlerts} onChange={setEmailAlerts} />
          <SettingToggle icon={<Bell className="h-5 w-5" />} title="Admission alerts" description="Get reminders for application windows and deadlines." checked={admissionAlerts} onChange={setAdmissionAlerts} />
          <SettingToggle icon={<Moon className="h-5 w-5" />} title="Compact dashboard" description="Use denser dashboard rows on this browser." checked={compactMode} onChange={setCompactMode} />

          {message && <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p>}

          <div className="flex flex-wrap gap-4">
            <button onClick={saveSettings} disabled={saving} className="flex h-12 items-center gap-3 rounded-lg bg-[#3525cd] px-6 text-sm font-bold tracking-widest text-white shadow-lg shadow-indigo-500/20 disabled:opacity-60">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : "Save Settings"}
            </button>
            <button onClick={logout} disabled={loggingOut} className="flex h-12 items-center gap-3 rounded-lg border border-red-200 px-6 text-sm font-bold tracking-widest text-red-600 transition hover:bg-red-50 disabled:opacity-60">
              {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
              {loggingOut ? "Logging Out..." : "Logout"}
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}

function SettingToggle({ icon, title, description, checked, onChange }: { icon: React.ReactNode; title: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eff4ff] text-[#3525cd]">{icon}</div>
        <div>
          <p className="font-bold text-[#0b1c30]">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 shrink-0 accent-[#3525cd]" />
    </label>
  );
}

function getStoredSettings() {
  if (typeof window === "undefined") {
    return { emailAlerts: true, admissionAlerts: true, compactMode: false };
  }

  const stored = window.localStorage.getItem("eduvision_settings");
  if (!stored) {
    return { emailAlerts: true, admissionAlerts: true, compactMode: false };
  }

  try {
    return { emailAlerts: true, admissionAlerts: true, compactMode: false, ...JSON.parse(stored) };
  } catch {
    return { emailAlerts: true, admissionAlerts: true, compactMode: false };
  }
}
