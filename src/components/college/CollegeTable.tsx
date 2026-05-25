export default function CollegeTable() {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-4 py-3">College</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Rank</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">Sample College</td>
                        <td className="px-4 py-3">City, State</td>
                        <td className="px-4 py-3">#1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
