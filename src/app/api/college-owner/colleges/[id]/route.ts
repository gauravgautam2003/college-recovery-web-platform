import { NextResponse } from "next/server";
import { getBearerToken } from "@/lib/auth";
import { collegeCreateSchema } from "@/lib/validators";
import { findCollegeById, removeCollege, replaceCollege } from "@/backend/repositories/college.repository";
import { requireCollegeOwnerFromToken } from "@/services/collegeOwner.service";

type RouteContext = {
    params: Promise<{ id: string }>;
};

function cleanCollegePayload(input: Record<string, unknown>) {
    return Object.fromEntries(
        Object.entries(input).filter(([, value]) => value !== "" && value !== null && value !== undefined)
    );
}

async function getOwnedCollege(context: RouteContext) {
    const owner = requireCollegeOwnerFromToken(await getBearerToken());
    if (!owner) return { owner: null, college: null, id: "" };

    const { id } = await context.params;
    const college = findCollegeById(id);

    return {
        owner,
        college: college?.ownerId === owner.ownerId ? college : null,
        id,
    };
}

export async function GET(_request: Request, context: RouteContext) {
    const { owner, college } = await getOwnedCollege(context);
    if (!owner) return NextResponse.json({ error: "Unauthorized college owner request." }, { status: 401 });
    if (!college) return NextResponse.json({ error: "College not found for this owner." }, { status: 404 });

    return NextResponse.json({ college });
}

export async function PATCH(request: Request, context: RouteContext) {
    const { owner, college, id } = await getOwnedCollege(context);
    if (!owner) return NextResponse.json({ error: "Unauthorized college owner request." }, { status: 401 });
    if (!college) return NextResponse.json({ error: "College not found for this owner." }, { status: 404 });

    const body = await request.json().catch(() => null);
    const parsed = collegeCreateSchema.partial().safeParse(cleanCollegePayload(body ?? {}));

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid college details", details: parsed.error.issues },
            { status: 400 }
        );
    }

    const updated = replaceCollege(id, {
        ...parsed.data,
        ownerId: owner.ownerId,
        updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ college: updated, message: "College details updated successfully." });
}

export async function DELETE(_request: Request, context: RouteContext) {
    const { owner, college, id } = await getOwnedCollege(context);
    if (!owner) return NextResponse.json({ error: "Unauthorized college owner request." }, { status: 401 });
    if (!college) return NextResponse.json({ error: "College not found for this owner." }, { status: 404 });

    removeCollege(id);

    return NextResponse.json({ message: "College deleted successfully." });
}
