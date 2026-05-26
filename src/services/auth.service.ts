import { createToken, hashPassword, verifyPassword } from "@/lib/auth";
import { findUserByEmail, insertUser, toPublicUser } from "@/backend/repositories/user.repository";

export async function signupUser(name: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = findUserByEmail(normalizedEmail);

    if (existingUser) {
        return { success: false, message: "Email is already registered." };
    }

    const user = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        passwordHash: await hashPassword(password),
        targetCourse: "B.Tech",
        preferredLocation: "Delhi NCR",
        createdAt: new Date().toISOString(),
    };

    insertUser(user);
    const token = createToken(user);

    return {
        success: true,
        message: "Account created successfully.",
        data: { user: toPublicUser(user), token },
    };
}

export async function loginUser(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = findUserByEmail(normalizedEmail);

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
        return { success: false, message: "Invalid email or password." };
    }

    const token = createToken(user);
    return {
        success: true,
        message: "Logged in successfully.",
        data: { user: toPublicUser(user), token },
    };
}
