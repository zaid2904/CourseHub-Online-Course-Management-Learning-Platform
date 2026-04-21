import React from "react"

import CompareWithOthers from "../../../assets/Images/Compare_with_others.svg"
import KnowYourProgress from "../../../assets/Images/Know_your_progress.png"
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.svg"
import CTAButton from "../../../components/core/HomePage/Button"
import HighlightText from "./HighlightText"

const learningFeatures = [
  "Progress snapshots to keep motivation high",
  "Practice plans that adapt to your schedule",
  "Natural voice-over support across 20+ languages",
]

const LearningLanguageSection = () => {
  return (
    <section className="w-full rounded-[32px] bg-gradient-to-br from-slate-50 to-cyan-50 px-6 py-16 text-slate-900 shadow-soft lg:px-14">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-600 border border-blue-100">
            Learning Experience
          </div>
          <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            Your Swiss knife for <HighlightText text="learning any language" />
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Study smarter with guided practice, realistic voice support,
            progress analytics, and a calm interface designed to keep learners
            moving forward every day.
          </p>

          <div className="mt-8 space-y-4">
            {learningFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-4"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                <p className="font-medium text-slate-700">{feature}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div>Start learning today</div>
            </CTAButton>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-xl items-center justify-center">
          <div className="absolute inset-x-8 top-8 h-32 rounded-full bg-cyan-300/40 blur-3xl" />
          <img
            src={KnowYourProgress}
            alt="Track progress"
            className="relative z-10 w-[38%] rounded-[24px] border border-white/60 shadow-soft"
          />
          <img
            src={CompareWithOthers}
            alt="Compare with others"
            className="relative z-20 -mx-8 mt-16 w-[44%] rounded-[24px] border border-white/60 shadow-soft"
          />
          <img
            src={PlanYourLessons}
            alt="Plan lessons"
            className="relative z-10 w-[38%] rounded-[24px] border border-white/60 shadow-soft"
          />
        </div>
      </div>
    </section>
  )
}

export default LearningLanguageSection
