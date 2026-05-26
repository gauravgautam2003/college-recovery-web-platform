import { NextResponse } from "next/server";
import { getBearerToken } from "@/lib/auth";
import { store } from "@/lib/store";
import { findColleges } from "@/backend/repositories/college.repository";
import { requireCollegeOwnerFromToken } from "@/services/collegeOwner.service";

export async function GET() {
    const owner = requireCollegeOwnerFromToken(await getBearerToken());
    if (!owner) {
        return NextResponse.json({ error: "Unauthorized college owner request." }, { status: 401 });
    }

    const ownedColleges = findColleges().filter((college) => college.ownerId === owner.ownerId);
    const ownedCollegeIds = new Set(ownedColleges.map((college) => college.id));
    const collegeNameById = new Map(ownedColleges.map((college) => [college.id, college.name]));

    const applications = store.applications
        .filter((application) => ownedCollegeIds.has(application.collegeId))
        .map((application) => ({
            ...application,
            collegeName: collegeNameById.get(application.collegeId) ?? "Unknown college",
        }))
        .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));

    return NextResponse.json({ applications });
}
