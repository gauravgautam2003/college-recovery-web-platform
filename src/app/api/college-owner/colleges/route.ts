import { NextResponse } from "next/server";
import { getBearerToken } from "@/lib/auth";
import { collegeCreateSchema } from "@/lib/validators";
import { findColleges, insertCollege } from "@/backend/repositories/college.repository";
import { requireCollegeOwnerFromToken } from "@/services/collegeOwner.service";
import type { College } from "@/types/college";

function cleanCollegePayload(input: Record<string, unknown>) {
    return Object.fromEntries(
        Object.entries(input).filter(([, value]) => value !== "" && value !== null && value !== undefined)
    );
}

export async function GET() {
    const owner = requireCollegeOwnerFromToken(await getBearerToken());
    if (!owner) {
        return NextResponse.json({ error: "Unauthorized college owner request." }, { status: 401 });
    }

    // Owner scoping keeps one institution from editing another institution's listing.
    const colleges = findColleges().filter((college) => college.ownerId === owner.ownerId);

    return NextResponse.json({
        colleges,
        ownerName: owner.name,
    });
}

export async function POST(request: Request) {
    const owner = requireCollegeOwnerFromToken(await getBearerToken());
    if (!owner) {
        return NextResponse.json({ error: "Unauthorized college owner request." }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const parsed = collegeCreateSchema.safeParse(cleanCollegePayload(body ?? {}));

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid college details", details: parsed.error.issues },
            { status: 400 }
        );
    }

    const now = new Date().toISOString();
    const college: College = {
        ...parsed.data,
        id: crypto.randomUUID(),
        ownerId: owner.ownerId,
        createdAt: now,
        updatedAt: now,
    };

    insertCollege(college);

    return NextResponse.json(
        { college, message: "College details submitted successfully." },
        { status: 201 }
    );
}
