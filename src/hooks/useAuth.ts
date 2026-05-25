import { useState } from "react";

export function useAuth() {
    const [user, setUser] = useState<{ id: string; email: string } | null>(null);

    function signIn() {
        setUser({ id: "1", email: "user@example.com" });
    }

    return { user, signIn };
}
