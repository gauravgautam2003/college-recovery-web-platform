import { NextResponse } from "next/server";
import { getAuthCookie, requireAuth } from "@/lib/auth";
import { findUserById, toPublicUser } from "@/backend/repositories/user.repository";
import { authSchema } from "@/lib/validators";
import { loginUser, signupUser } from "@/services/auth.service";

export async function GET() {
    const session = await requireAuth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = findUserById(session.userId);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: { user: toPublicUser(user) } });
}

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const parsed = authSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
    }

    const result =
        parsed.data.mode === "signup"
            ? await signupUser(parsed.data.name, parsed.data.email, parsed.data.password)
            : await loginUser(parsed.data.email, parsed.data.password);

    if (!result.success || !result.data) {
        return NextResponse.json({ error: result.message }, { status: parsed.data.mode === "signup" ? 409 : 401 });
    }

    const response = NextResponse.json({ data: result.data, message: result.message });
    response.cookies.set(getAuthCookie(result.data.token));
    return response;
}

export async function DELETE() {
    const response = NextResponse.json({ message: "Logged out successfully." });
    response.cookies.set({
        name: "eduvision_token",
        value: "",
        path: "/",
        maxAge: 0,
    });
    return response;
}
