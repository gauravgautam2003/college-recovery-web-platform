export default function CollegeSearch() {
    return (
        <div className="rounded-xl border border-slate-200 p-4 shadow-sm">
            <input
                aria-label="Search colleges"
                className="w-full rounded-md border border-slate-300 px-3 py-2"
                placeholder="Search colleges"
                type="search"
            />
        </div>
    );
}
