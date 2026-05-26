import { NextResponse } from "next/server";
import { findCollegeById } from "@/backend/repositories/college.repository";
import { requireAuth } from "@/lib/auth";
import { store, type StoredApplication } from "@/lib/store";
import { applicationCreateSchema } from "@/lib/validators";

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const parsed = applicationCreateSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid application details", details: parsed.error.issues },
            { status: 400 }
        );
    }

    const college = findCollegeById(parsed.data.collegeId);
    if (!college) {
        return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    const session = await requireAuth();
    const application: StoredApplication = {
        id: crypto.randomUUID(),
        ...parsed.data,
        status: "submitted",
        createdAt: new Date().toISOString(),
        userId: session?.userId,
    };

    // In production this repository should be backed by Prisma for persistence.
    store.applications.push(application);

    return NextResponse.json(
        {
            data: application,
            message: "Application submitted successfully. The college admissions team can now review it.",
        },
        { status: 201 }
    );
}
