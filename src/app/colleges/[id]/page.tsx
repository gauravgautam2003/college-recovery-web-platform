import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, Calendar, Download, FlaskConical, Globe2, Mail, MapPin, Phone, Star, Trophy, Wifi } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getCollegeById } from "@/services/college.service";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CollegeDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const college = await getCollegeById(id);

  if (!college) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#f8f9ff]">
        <section className="campus-image flex min-h-[300px] items-end px-8 pb-8 text-white" style={{ backgroundImage: `linear-gradient(rgba(2,6,23,.1), rgba(2,6,23,.72)), url(${college.image})` }}>
          <div className="mx-auto flex w-full max-w-7xl items-end gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white text-[#3525cd] shadow-xl">
              <Trophy className="h-9 w-9" />
            </div>
            <div>
              <h1 className="text-4xl font-bold drop-shadow">{college.name}</h1>
              <p className="mt-3 flex flex-wrap items-center gap-4 text-sm font-semibold">
                <span><MapPin className="inline h-4 w-4" /> {college.location}</span>
                <span><Star className="inline h-4 w-4" /> {college.rating} rating</span>
                <span className="rounded bg-[#3525cd] px-2 py-1">Rank #{college.rank}</span>
              </p>
            </div>
          </div>
        </section>
        <div className="border-b border-slate-200 bg-white px-8">
          <div className="mx-auto flex max-w-7xl gap-12 overflow-x-auto text-sm font-semibold">
            {["Overview", "Courses & Fees", "Placements", "Reviews", "Admission"].map((item, index) => (
              <span key={item} className={`py-5 ${index === 0 ? "border-b-2 border-[#3525cd] text-[#3525cd]" : ""}`}>{item}</span>
            ))}
          </div>
        </div>
        <section className="mx-auto grid max-w-7xl gap-7 px-8 py-7 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="text-2xl font-bold">About University</h2>
            <p className="mt-5 max-w-3xl leading-8 text-slate-700">{college.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {(college.facilities ?? ["Research Labs", "Library", "Sports Arena", "Campus Wi-Fi"]).slice(0, 4).map((label, index) => {
                const icons = [Wifi, BookOpen, Globe2, FlaskConical];
                const Component = icons[index] ?? Wifi;
                return (
                  <div key={label} className="rounded-xl bg-[#eff4ff] p-5 text-center text-sm font-semibold text-[#3525cd]">
                    <Component className="mx-auto mb-3 h-6 w-6" />
                    <span className="text-sm text-slate-950">{label}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Courses & Programs</h2>
                <span className="text-sm font-bold text-[#3525cd]">From backend record</span>
              </div>
              <div className="mt-5 overflow-hidden rounded-xl border border-slate-300 bg-white">
                {(college.courses ?? []).map((course) => (
                  <div key={course} className="grid grid-cols-[1fr_120px_120px] border-b border-slate-100 p-6">
                    <div><h3 className="text-lg font-bold">{course}</h3><p className="text-sm text-slate-500">Specialization and placement focused</p></div>
                    <span>2-4 Years</span>
                    <span className="font-bold text-[#001aee]">{college.fees}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12">
              <h2 className="text-2xl font-bold">Placement Insights</h2>
              <div className="modern-surface mt-5 rounded-xl p-7">
                <p className="text-xs font-bold uppercase tracking-widest">Average Package</p>
                <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
                  <p className="text-3xl font-bold text-[#001aee]">{college.averagePackage}</p>
                  <div className="flex gap-3">
                    <span className="rounded bg-[#d8e8ff] px-5 py-3 font-bold">Placement<br />{college.placementRate}</span>
                    <span className="rounded bg-[#d8e8ff] px-5 py-3 font-bold">Acceptance<br />{college.acceptanceRate}</span>
                  </div>
                </div>
                <p className="mt-10 text-slate-700">Top recruiters: {college.topRecruiters?.join(", ")}</p>
              </div>
            </div>
          </div>
          <aside className="modern-surface h-fit rounded-xl p-7">
            <h2 className="text-xl font-bold">Quick Facts</h2>
            <div className="mt-8 grid gap-6 text-sm">
              <p><Calendar className="mr-3 inline text-[#3525cd]" /> Application Deadline<br /><b>{college.admissionDeadline}</b></p>
              <p><Mail className="mr-3 inline text-[#3525cd]" /> Admissions Email<br />{college.contactEmail}</p>
              <p><Phone className="mr-3 inline text-[#3525cd]" /> Phone Support<br />{college.phone}</p>
              <p><Download className="mr-3 inline text-[#3525cd]" /> Avg. Fee Range<br />{college.fees}</p>
            </div>
            <Link href={`/apply?collegeId=${college.id}`} className="mt-8 block w-full rounded-lg bg-[#3525cd] py-3 text-center text-sm font-bold text-white">Apply Now</Link>
            <Link href="/how-to-apply" className="mt-4 block w-full rounded-lg border border-[#0058be] py-3 text-center text-sm font-bold text-[#0058be]">How Admission Works</Link>
            <p className="mt-6 rounded-lg bg-[#eff4ff] p-4 text-sm"><b className="text-[#3525cd]">API Source:</b> This page reads college data from the backend service.</p>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
