import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { getBearerToken } from "@/lib/auth";
import { getCloudinaryConfig } from "@/lib/env";
import { requireCollegeOwnerFromToken } from "@/services/collegeOwner.service";

export async function POST() {
    const owner = requireCollegeOwnerFromToken(await getBearerToken());
    if (!owner) {
        return NextResponse.json({ error: "Unauthorized college owner request." }, { status: 401 });
    }

    const cloudinary = getCloudinaryConfig();
    if (!cloudinary) {
        return NextResponse.json(
            { error: "Cloudinary environment variables are not configured." },
            { status: 500 }
        );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "eduvision/colleges";

    // Cloudinary signatures are SHA-1 hashes of sorted params plus the API secret.
    const signature = createHash("sha1")
        .update(`folder=${folder}&timestamp=${timestamp}${cloudinary.apiSecret}`)
        .digest("hex");

    return NextResponse.json({
        data: {
            cloudName: cloudinary.cloudName,
            apiKey: cloudinary.apiKey,
            folder,
            timestamp,
            signature,
        },
    });
}
