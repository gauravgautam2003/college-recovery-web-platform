import { NextResponse } from "next/server";
import { collegeCreateSchema } from "@/lib/validators";
import { deleteCollege, getCollegeById, updateCollege } from "@/services/college.service";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const college = await getCollegeById(id);

    if (!college) {
        return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json({ data: college });
}

export async function PATCH(request: Request, context: RouteContext) {
    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    const parsed = collegeCreateSchema.partial().safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid college payload" }, { status: 400 });
    }

    const college = await updateCollege(id, parsed.data);
    if (!college) {
        return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json({ data: college, message: "College updated successfully." });
}

export async function DELETE(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const removed = await deleteCollege(id);

    if (!removed) {
        return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "College deleted successfully." });
}
