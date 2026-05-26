import { createHmac, timingSafeEqual } from "crypto";
import { headers } from "next/headers";
import { compare, hash } from "bcryptjs";
import { getJwtSecret } from "@/lib/env";

const TOKEN_COOKIE = "eduvision_token";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

type TokenPayload = {
    userId: string;
    email: string;
    exp: number;
};

function getSecret() {
    return getJwtSecret();
}

function base64UrlEncode(value: string) {
    return Buffer.from(value).toString("base64url");
}

function base64UrlJson(value: unknown) {
    return base64UrlEncode(JSON.stringify(value));
}

function signInput(input: string) {
    return createHmac("sha256", getSecret()).update(input).digest("base64url");
}

export async function hashPassword(password: string) {
    return hash(password, 10);
}

export async function verifyPassword(password: string, passwordHash: string) {
    return compare(password, passwordHash);
}

export function createToken(user: { id: string; email: string }) {
    const header = base64UrlJson({ alg: "HS256", typ: "JWT" });
    const payload = base64UrlJson({
        userId: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
    });
    const unsignedToken = `${header}.${payload}`;
    return `${unsignedToken}.${signInput(unsignedToken)}`;
}

export function verifyToken(token?: string | null): TokenPayload | null {
    if (!token) {
        return null;
    }

    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
        return null;
    }

    const expected = signInput(`${header}.${payload}`);
    const expectedBuffer = Buffer.from(expected);
    const signatureBuffer = Buffer.from(signature);

    if (expectedBuffer.length !== signatureBuffer.length || !timingSafeEqual(expectedBuffer, signatureBuffer)) {
        return null;
    }

    try {
        const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as TokenPayload;
        if (!parsed.userId || parsed.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }
        return parsed;
    } catch {
        return null;
    }
}

export async function getBearerToken() {
    const headerStore = await headers();
    const authorization = headerStore.get("authorization");
    if (authorization?.startsWith("Bearer ")) {
        return authorization.slice("Bearer ".length);
    }

    const cookieHeader = headerStore.get("cookie");
    const cookie = cookieHeader
        ?.split(";")
        .map((entry) => entry.trim())
        .find((entry) => entry.startsWith(`${TOKEN_COOKIE}=`));

    return cookie?.slice(TOKEN_COOKIE.length + 1) ?? null;
}

export async function requireAuth() {
    const payload = verifyToken(await getBearerToken());
    return payload ? { userId: payload.userId, email: payload.email } : null;
}

export function getAuthCookie(token: string) {
    return {
        name: TOKEN_COOKIE,
        value: token,
        httpOnly: true,
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: TOKEN_TTL_SECONDS,
    };
}

export function getAuthHeader(token: string) {
    return { Authorization: `Bearer ${token}` };
}
