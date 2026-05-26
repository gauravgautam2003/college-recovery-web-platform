import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { findSavedColleges, removeSavedCollege, saveCollegeForUser } from "@/backend/repositories/saved.repository";
import { savedCollegeSchema } from "@/lib/validators";

export async function GET() {
    const session = await requireAuth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const colleges = findSavedColleges(session.userId);
    return NextResponse.json({ data: colleges, meta: { count: colleges.length } });
}

export async function POST(request: Request) {
    const session = await requireAuth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const parsed = savedCollegeSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid college id" }, { status: 400 });
    }

    const college = saveCollegeForUser(session.userId, parsed.data.collegeId);
    if (!college) {
        return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json({ data: college, message: "College saved successfully." }, { status: 201 });
}

export async function DELETE(request: Request) {
    const session = await requireAuth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const parsed = savedCollegeSchema.safeParse({ collegeId: searchParams.get("collegeId") });
    if (!parsed.success) {
        return NextResponse.json({ error: "Pass collegeId in query string." }, { status: 400 });
    }

    removeSavedCollege(session.userId, parsed.data.collegeId);
    return NextResponse.json({ message: "College removed from saved list." });
}
