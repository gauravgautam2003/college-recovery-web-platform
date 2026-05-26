import { NextResponse } from "next/server";
import { getAuthCookie } from "@/lib/auth";
import { collegeOwnerAuthSchema } from "@/lib/validators";
import { loginCollegeOwner, signupCollegeOwner } from "@/services/collegeOwner.service";

// POST /api/college-owner (login/signup)
export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const parsed = collegeOwnerAuthSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
    }

    const result =
        parsed.data.mode === "signup"
            ? await signupCollegeOwner(parsed.data.name, parsed.data.email, parsed.data.password)
            : await loginCollegeOwner(parsed.data.email, parsed.data.password);

    if (!result.success || !result.data) {
        return NextResponse.json({ error: result.message }, { status: parsed.data.mode === "signup" ? 409 : 401 });
    }

    const response = NextResponse.json({ data: result.data, message: result.message });
    response.cookies.set(getAuthCookie(result.data.token));
    return response;
}
