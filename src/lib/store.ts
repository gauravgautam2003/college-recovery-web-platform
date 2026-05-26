import { mockColleges } from "@/data/mock-colleges";
import type { College } from "@/types/college";
import type { PublicUser } from "@/types/user";

export interface StoredUser extends PublicUser {
    passwordHash: string;
}

export interface StoredCollegeOwner {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: string;
}

export interface StoredApplication {
    id: string;
    collegeId: string;
    studentName: string;
    email: string;
    phone: string;
    course: string;
    message?: string;
    status: "submitted" | "reviewing" | "contacted";
    createdAt: string;
    userId?: string;
}

type AppStore = {
    colleges: College[];
    users: StoredUser[];
    collegeOwners: StoredCollegeOwner[];
    applications: StoredApplication[];
    savedCollegeIds: Map<string, Set<string>>;
};

const globalForStore = globalThis as typeof globalThis & {
    eduVisionStore?: AppStore;
};

export const store =
    globalForStore.eduVisionStore ??
    (globalForStore.eduVisionStore = {
        colleges: [...mockColleges],
        users: [],
        collegeOwners: [],
        applications: [],
        savedCollegeIds: new Map<string, Set<string>>(),
    });

export function toPublicUser(user: StoredUser): PublicUser {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        targetCourse: user.targetCourse,
        preferredLocation: user.preferredLocation,
        createdAt: user.createdAt,
    };
}

export function getSavedSet(userId: string) {
    const existing = store.savedCollegeIds.get(userId);
    if (existing) {
        return existing;
    }

    const next = new Set<string>();
    store.savedCollegeIds.set(userId, next);
    return next;
}
