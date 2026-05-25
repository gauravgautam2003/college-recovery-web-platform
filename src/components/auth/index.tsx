export default function AuthForm() {
    return (
        <form className="space-y-4 p-6 rounded-lg border border-slate-200 bg-white shadow-sm">
            <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" type="email" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" type="password" />
            </div>
            <button className="w-full rounded-md bg-slate-900 px-4 py-2 text-white">Submit</button>
        </form>
    );
}
