import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#adc6ff]/60 bg-[#d8e8ff] px-4 sm:px-6 text-slate-800">
      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 py-8 sm:py-10 md:py-12 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#3525cd]">EduVision AI</h3>
          <p className="mt-3 sm:mt-4 md:mt-5 max-w-xs text-xs sm:text-sm leading-6 sm:leading-7">
            Empowering students worldwide with AI-driven academic insights and personalized university recommendations.
          </p>
        </div>
        <div>
          <h4 className="text-sm md:text-base font-bold tracking-widest">Platform</h4>
          <div className="mt-3 sm:mt-4 md:mt-5 grid gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700">
            <span className="hover:text-[#3525cd] transition cursor-pointer">AI Methodology</span>
            <span className="hover:text-[#3525cd] transition cursor-pointer">Universities</span>
            <span className="hover:text-[#3525cd] transition cursor-pointer">Admissions</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm md:text-base font-bold tracking-widest">Support</h4>
          <div className="mt-3 sm:mt-4 md:mt-5 grid gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700">
            <span className="hover:text-[#3525cd] transition cursor-pointer">Contact</span>
            <span className="hover:text-[#3525cd] transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#3525cd] transition cursor-pointer">Terms of Service</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm md:text-base font-bold tracking-widest">Newsletter</h4>
          <div className="mt-3 sm:mt-4 md:mt-5 flex overflow-hidden rounded-xl border border-slate-300 bg-white">
            <input className="min-w-0 flex-1 bg-transparent px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 outline-none text-xs sm:text-base" placeholder="Email address" />
            <button className="bg-[#3525cd] px-3 sm:px-4 md:px-5 text-white hover:bg-[#2b1fa8] transition" aria-label="Subscribe">
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-blue-200 py-4 sm:py-5 md:py-6 text-center text-xs sm:text-sm text-slate-600">
        © 2024 EduVision AI Platform. All rights reserved.
      </div>
    </footer>
  );
}
