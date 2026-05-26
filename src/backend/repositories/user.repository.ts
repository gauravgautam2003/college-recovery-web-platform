import { store, toPublicUser, type StoredUser } from "@/lib/store";

export function findUserById(id: string) {
    return store.users.find((user) => user.id === id) ?? null;
}

export function findUserByEmail(email: string) {
    return store.users.find((user) => user.email === email) ?? null;
}

export function insertUser(user: StoredUser) {
    store.users.push(user);
    return user;
}

export function updateUser(id: string, input: Partial<Pick<StoredUser, "name" | "targetCourse" | "preferredLocation">>) {
    const user = findUserById(id);
    if (!user) {
        return null;
    }

    Object.assign(user, input);
    return user;
}

export { toPublicUser };
