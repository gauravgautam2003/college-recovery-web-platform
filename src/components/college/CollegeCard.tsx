import type { College } from "@/types/college";

export default function CollegeCard({ college }: { college: College }) {
    return (
        <article className="rounded-xl border border-slate-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold truncate">{college.name}</h3>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600 truncate">{college.location}</p>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2">{college.description}</p>
        </article>
    );
}
