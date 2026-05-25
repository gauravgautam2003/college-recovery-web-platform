import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#adc6ff]/60 bg-[#d8e8ff] px-6 text-slate-800">
      <div className="mx-auto grid max-w-7xl gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
        <div>
          <h3 className="text-2xl font-bold text-[#3525cd]">EduVision AI</h3>
          <p className="mt-5 max-w-xs leading-7">
            Empowering students worldwide with AI-driven academic insights and personalized university recommendations.
          </p>
        </div>
        <div>
          <h4 className="font-bold tracking-widest">Platform</h4>
          <div className="mt-5 grid gap-3 text-slate-700">
            <span>AI Methodology</span>
            <span>Universities</span>
            <span>Admissions</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold tracking-widest">Support</h4>
          <div className="mt-5 grid gap-3 text-slate-700">
            <span>Contact</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold tracking-widest">Newsletter</h4>
          <div className="mt-5 flex overflow-hidden rounded-xl border border-slate-300 bg-white">
            <input className="min-w-0 flex-1 bg-transparent px-5 py-4 outline-none" placeholder="Email address" />
            <button className="bg-[#3525cd] px-5 text-white" aria-label="Subscribe">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-blue-200 py-6 text-center text-sm">
        © 2024 EduVision AI Platform. All rights reserved.
      </div>
    </footer>
  );
}
