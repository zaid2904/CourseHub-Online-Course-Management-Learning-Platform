import React from "react"

import TimeLineImage from "../../../assets/Images/TimelineImage.png"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

const timelineItems = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Clear learning paths designed to move students from basics to mastery.",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Built with students first, so each screen reduces friction and keeps focus.",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "Learn from any device and keep momentum with modular bite-sized lessons.",
  },
  {
    Logo: Logo4,
    Heading: "Problem Solving",
    Description: "Practice with real coding challenges and guided feedback loops.",
  },
]

const TimelineSection = () => {
  return (
    <section className="grid items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <div className="section-kicker">Why EduNest</div>
        <h2 className="font-display text-4xl font-semibold text-slate-900 md:text-5xl">
          Built to make learning feel structured, motivating, and calm.
        </h2>
        <div className="space-y-5">
          {timelineItems.map((item, i) => (
            <div
              className="flex gap-4 rounded-[24px] border border-slate-200 bg-white/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-md"
              key={i}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
                <img src={item.Logo} alt="" className="h-6 w-6 invert brightness-0" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {item.Heading}
                </h3>
                <p className="mt-1 leading-relaxed text-slate-600">
                  {item.Description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft group">
        <div className="absolute inset-x-8 top-8 h-28 rounded-full bg-cyan-300/30 blur-3xl" />
        <img
          src={TimeLineImage}
          alt="Students learning with EduNest"
          className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-6 bottom-6 z-20 grid gap-4 rounded-[28px] border border-slate-200 bg-white/90 p-6 text-slate-900 backdrop-blur-xl shadow-xl sm:grid-cols-2">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
            <p className="text-3xl font-extrabold text-blue-600">10+</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Years of learning design
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
            <p className="text-3xl font-extrabold text-indigo-600">250+</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Curated course tracks
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
