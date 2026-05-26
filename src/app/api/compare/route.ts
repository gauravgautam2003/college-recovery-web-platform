import { NextResponse } from "next/server";
import { compareSchema } from "@/lib/validators";
import { compareColleges } from "@/services/compare.service";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const collegeIds = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];
    return buildComparison(collegeIds);
}

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const parsed = compareSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Choose 2 to 4 colleges." }, { status: 400 });
    }

    return buildComparison(parsed.data.collegeIds);
}

async function buildComparison(collegeIds: string[]) {
    const parsed = compareSchema.safeParse({ collegeIds });
    if (!parsed.success) {
        return NextResponse.json({ error: "Pass 2 to 4 college ids." }, { status: 400 });
    }

    const colleges = await compareColleges(parsed.data.collegeIds);
    return NextResponse.json({
        data: colleges,
        meta: {
            requested: parsed.data.collegeIds.length,
            found: colleges.length,
            bestValue: colleges.toSorted((left, right) => (left.feesValue ?? 0) - (right.feesValue ?? 0))[0]?.id,
            bestPlacement: colleges.toSorted(
                (left, right) => (right.averagePackageValue ?? 0) - (left.averagePackageValue ?? 0),
            )[0]?.id,
        },
    });
}
