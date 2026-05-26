import { getCollegeById } from "@/services/college.service";
import type { College } from "@/types/college";

export async function compareColleges(collegeIds: string[]): Promise<College[]> {
    const colleges = await Promise.all(collegeIds.map((id) => getCollegeById(id)));
    return colleges.filter((college): college is College => Boolean(college));
}
