import { NextResponse } from "next/server";
import { getCloudinaryConfig } from "@/lib/env";

function configured(value?: string) {
    return Boolean(value && value.trim().length > 0);
}

export async function GET() {
    const cloudinary = getCloudinaryConfig();

    return NextResponse.json({
        data: {
            database: {
                configured: configured(process.env.DATABASE_URL),
                provider: "PostgreSQL",
                persistenceMode: "In-memory runtime store until Prisma repositories are connected",
            },
            auth: {
                configured: configured(process.env.JWT_SECRET || process.env.JWT_SECRETE),
                secretKeyName: process.env.JWT_SECRET ? "JWT_SECRET" : process.env.JWT_SECRETE ? "JWT_SECRETE" : null,
            },
            uploads: {
                configured: Boolean(cloudinary),
                provider: "Cloudinary",
                requiredKeys: ["CLOUD_NAME", "CLOUD_API_KEY", "CLOUD_API_SECRET"],
            },
            email: {
                configured: configured(process.env.SMTP_HOST) && configured(process.env.SMTP_USER),
                provider: "SMTP",
            },
            environment: process.env.NODE_ENV ?? "development",
        },
    });
}
