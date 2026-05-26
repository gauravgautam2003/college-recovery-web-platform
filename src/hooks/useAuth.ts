"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import type { UserSession } from "@/types/auth";

type AuthPayload = {
    name?: string;
    email: string;
    password: string;
};

export function useAuth() {
    const [session, setSession] = useState<UserSession | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submit(mode: "login" | "signup", payload: AuthPayload) {
        setLoading(true);
        setError(null);
        const toastId = toast.loading(mode === "login" ? "Signing you in..." : "Creating your account...");

        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode, ...payload }),
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error ?? "Authentication failed.");
            }

            setSession({
                id: result.data.user.id,
                name: result.data.user.name,
                email: result.data.user.email,
                token: result.data.token,
            });

            toast.success(mode === "login" ? "Login successful." : "Account created successfully.", { id: toastId });
            return result.data as { user: { id: string; name: string; email: string }; token: string };
        } catch (requestError) {
            const message = requestError instanceof Error ? requestError.message : "Authentication failed.";
            setError(message);
            toast.error(message, { id: toastId });
            throw requestError;
        } finally {
            setLoading(false);
        }
    }

    return {
        user: session,
        loading,
        error,
        login: (payload: AuthPayload) => submit("login", payload),
        signup: (payload: AuthPayload) => submit("signup", payload),
    };
}
