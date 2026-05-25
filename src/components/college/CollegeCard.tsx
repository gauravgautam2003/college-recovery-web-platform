import type { College } from "@/types/college";

export default function CollegeCard({ college }: { college: College }) {
    return (
        <article className="rounded-xl border border-slate-200 p-4 shadow-sm">
            <h3 className="text-xl font-semibold">{college.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{college.location}</p>
            <p className="mt-2 text-sm text-slate-500">{college.description}</p>
        </article>
    );
}
