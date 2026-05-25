import { BookOpen, Calendar, Download, FlaskConical, Globe2, Mail, MapPin, Phone, Star, Trophy, Wifi } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function CollegeDetailsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f8f9ff]">
        <section className="hero-campus campus-image flex min-h-[360px] items-end px-8 pb-8 text-white">
          <div className="mx-auto flex w-full max-w-7xl items-end gap-6">
            <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-white text-[#3525cd] shadow-xl">
              <Trophy className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-5xl font-bold drop-shadow">St. Andrews Institute of Technology</h1>
              <p className="mt-3 flex flex-wrap items-center gap-4 text-sm font-semibold">
                <span><MapPin className="inline h-4 w-4" /> Cambridge, MA</span>
                <span><Star className="inline h-4 w-4" /> 4.8 (2.4k Reviews)</span>
                <span className="rounded bg-[#3525cd] px-2 py-1">Rank #1 Global</span>
              </p>
            </div>
          </div>
        </section>
        <div className="border-b border-slate-200 bg-white px-8">
          <div className="mx-auto flex max-w-7xl gap-12 overflow-x-auto text-sm font-semibold">
            {["Overview", "Courses & Fees", "Placements", "Reviews", "Admission"].map((item, index) => (
              <span key={item} className={`py-5 ${index === 2 ? "border-b-2 border-[#3525cd] text-[#3525cd]" : ""}`}>{item}</span>
            ))}
          </div>
        </div>
        <section className="mx-auto grid max-w-7xl gap-8 px-8 py-8 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="text-3xl font-bold">About University</h2>
            <p className="mt-5 max-w-3xl leading-8 text-slate-700">
              Established in 1923, St. Andrews Institute of Technology has been at the forefront of academic excellence
              and research innovation for over a century. Our AI-driven curriculum integrates modern technological advancements
              with foundational theoretical knowledge.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {[[Wifi, "Gigabit Campus"], [BookOpen, "24/7 Library"], [Globe2, "Sports Arena"], [FlaskConical, "Research Labs"]].map(([Icon, label]) => {
                const Component = Icon as typeof Wifi;
                return (
                  <div key={label as string} className="rounded-xl bg-[#eff4ff] p-6 text-center font-semibold text-[#3525cd]">
                    <Component className="mx-auto mb-3 h-6 w-6" />
                    <span className="text-sm text-slate-950">{label as string}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-12">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Courses & Programs</h2>
                <button className="text-sm font-bold text-[#3525cd]">View All Programs</button>
              </div>
              <div className="mt-5 overflow-hidden rounded-xl border border-slate-300 bg-white">
                {["B.Tech Computer Science|4 Years|$45,000", "MBA Data Analytics|2 Years|$58,000", "M.Sc Quantum Physics|2 Years|$38,500"].map((row) => {
                  const [degree, duration, fee] = row.split("|");
                  return (
                    <div key={degree} className="grid grid-cols-[1fr_120px_120px] border-b border-slate-100 p-6">
                      <div><h3 className="text-xl font-bold">{degree}</h3><p className="text-sm text-slate-500">Specialization and research intensive</p></div>
                      <span>{duration}</span>
                      <span className="font-bold text-[#001aee]">{fee}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-12">
              <h2 className="text-3xl font-bold">Placement Insights</h2>
              <div className="mt-5 rounded-xl border border-slate-300 bg-white p-8">
                <p className="text-xs font-bold uppercase tracking-widest">Average Package</p>
                <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
                  <p className="text-4xl font-bold text-[#001aee]">$124,000 /yr</p>
                  <div className="flex gap-3">
                    <span className="rounded bg-[#d8e8ff] px-5 py-3 font-bold">Top Package<br />$420k</span>
                    <span className="rounded bg-[#d8e8ff] px-5 py-3 font-bold">Placement %<br />98%</span>
                  </div>
                </div>
                <div className="mt-20 grid grid-cols-4 gap-2">
                  {["2020", "2021", "2022", "2023"].map((year) => <div key={year} className="border-t-8 border-[#3525cd] text-center">{year}</div>)}
                </div>
              </div>
            </div>
          </div>
          <aside className="h-fit rounded-xl border border-slate-300 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Quick Facts</h2>
            <div className="mt-8 grid gap-6 text-sm">
              <p><Calendar className="mr-3 inline text-[#3525cd]" /> Application Deadline<br /><b>March 15, 2024</b></p>
              <p><Mail className="mr-3 inline text-[#3525cd]" /> Admissions Email<br />admissions@sait.edu</p>
              <p><Phone className="mr-3 inline text-[#3525cd]" /> Phone Support<br />+1 (888) 123-4567</p>
              <p><Download className="mr-3 inline text-[#3525cd]" /> Avg. Fee Range<br />$35k - $60k / Year</p>
            </div>
            <button className="mt-8 w-full rounded-xl bg-[#3525cd] py-4 text-xl font-bold text-white">Apply Now</button>
            <button className="mt-4 w-full rounded-xl border border-[#0058be] py-4 text-xl font-bold text-[#0058be]">Download Brochure</button>
            <p className="mt-6 rounded-lg bg-[#eff4ff] p-4 text-sm"><b className="text-[#3525cd]">AI Match Analysis:</b> Your profile matches 92% of their criteria.</p>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
