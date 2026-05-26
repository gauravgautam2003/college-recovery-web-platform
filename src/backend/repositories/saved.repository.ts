import { findCollegeById, findColleges } from "@/backend/repositories/college.repository";
import { getSavedSet } from "@/lib/store";

export function findSavedColleges(userId: string) {
    const savedSet = getSavedSet(userId);
    return findColleges().filter((college) => savedSet.has(college.id));
}

export function saveCollegeForUser(userId: string, collegeId: string) {
    const college = findCollegeById(collegeId);
    if (!college) {
        return null;
    }

    getSavedSet(userId).add(college.id);
    return college;
}

export function removeSavedCollege(userId: string, collegeId: string) {
    return getSavedSet(userId).delete(collegeId);
}
