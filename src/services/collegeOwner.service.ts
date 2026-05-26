import { createToken, hashPassword, verifyPassword, verifyToken } from "@/lib/auth";
import { store, type StoredCollegeOwner } from "@/lib/store";

type OwnerSession = {
    id: string;
    name: string;
    email: string;
    token: string;
};

function toOwnerSession(owner: StoredCollegeOwner): OwnerSession {
    return {
        id: owner.id,
        name: owner.name,
        email: owner.email,
        token: createToken({ id: owner.id, email: owner.email }),
    };
}

export async function signupCollegeOwner(name: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const existingOwner = store.collegeOwners.find((owner) => owner.email === normalizedEmail);

    if (existingOwner) {
        return { success: false, message: "A college owner account already exists with this email." };
    }

    const owner: StoredCollegeOwner = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        passwordHash: await hashPassword(password),
        createdAt: new Date().toISOString(),
    };

    store.collegeOwners.push(owner);

    return {
        success: true,
        message: "College owner account created successfully.",
        data: toOwnerSession(owner),
    };
}

export async function loginCollegeOwner(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const owner = store.collegeOwners.find((item) => item.email === normalizedEmail);

    if (!owner || !(await verifyPassword(password, owner.passwordHash))) {
        return { success: false, message: "Invalid email or password." };
    }

    return {
        success: true,
        message: "College owner login successful.",
        data: toOwnerSession(owner),
    };
}

export function getCollegeOwnerById(ownerId: string) {
    return store.collegeOwners.find((owner) => owner.id === ownerId) ?? null;
}

export function requireCollegeOwnerFromToken(token?: string | null) {
    const payload = verifyToken(token);
    if (!payload) return null;

    const owner = getCollegeOwnerById(payload.userId);
    return owner ? { ownerId: owner.id, email: owner.email, name: owner.name } : null;
}
