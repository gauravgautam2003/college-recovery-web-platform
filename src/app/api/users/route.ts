import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { findUserById, toPublicUser, updateUser } from "@/backend/repositories/user.repository";
import { profileUpdateSchema } from "@/lib/validators";

export async function GET() {
    const session = await requireAuth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = findUserById(session.userId);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: toPublicUser(user) });
}

export async function PATCH(request: Request) {
    const session = await requireAuth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const parsed = profileUpdateSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid profile payload" }, { status: 400 });
    }

    const user = updateUser(session.userId, parsed.data);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ data: toPublicUser(user), message: "Profile updated successfully." });
}
