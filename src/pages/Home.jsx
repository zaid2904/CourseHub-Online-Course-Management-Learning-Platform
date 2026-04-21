import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

import Banner from "../assets/Images/banner.mp4"
import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import HighlightText from "../components/core/HomePage/HighlightText"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/Timeline"

const heroMetrics = [
  { label: "Active learners", value: "12k+" },
  { label: "Expert-led courses", value: "250+" },
  { label: "Completion uplift", value: "38%" },
]

function Home() {
  return (
    <div className="text-slate-900 bg-slate-50">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_35%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_55%,#e2e8f0_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-20 pb-24 pt-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <Link to={"/signup"}>
                <div className="group mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600 transition duration-300 hover:bg-blue-100">
                  <span>Become an Instructor</span>
                  <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
                </div>
              </Link>

              <h1 className="hero-title">
                Build real-world skills with a <HighlightText text="modern learning experience" />
              </h1>

              <p className="hero-copy mt-6 max-w-xl">
                EduNest combines guided lessons, hands-on coding practice, and
                clean learner dashboards to help students move from curiosity to
                confidence faster.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <CTAButton active={true} linkto={"/signup"}>
                  Learn more
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                  Book a demo
                </CTAButton>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[24px] border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur-xl"
                  >
                    <p className="font-display text-3xl font-semibold text-slate-900">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-shell relative overflow-hidden p-4 lg:p-6 border border-slate-200 shadow-xl bg-white/50">
              <div className="absolute inset-x-12 top-6 h-24 rounded-full bg-blue-200/50 blur-3xl" />
              <div className="dashboard-surface relative overflow-hidden p-3 border border-slate-200 bg-white shadow-sm">
                <video
                  className="h-full min-h-[260px] w-full rounded-[24px] object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                >
                  <source src={Banner} type="video/mp4" />
                </video>
                <div className="absolute left-6 right-6 top-6 flex items-center justify-between rounded-full border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md shadow-sm">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Learning command center
                    </p>
                    <p className="text-xs font-medium text-slate-600">
                      Track lessons, practice, and progress in one place
                    </p>
                  </div>
                  <div className="dashboard-pill border-slate-200 bg-white shadow-sm font-semibold text-slate-800">Live demo</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div className="font-display text-4xl font-semibold text-slate-900">
                  Unlock your <HighlightText text={"coding potential"} /> with a
                  cleaner, faster learning flow.
                </div>
              }
              subheading={
                "Our courses are built around clarity and feedback, so learners spend less time navigating and more time building practical skills."
              }
              ctabtn1={{
                btnText: "Try it yourself",
                link: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn more",
                link: "/signup",
                active: false,
              }}
              codeColor={"text-blue-700"}
              codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>EduNest</title>\n</head>\n<body>\n  <section>\n    <h1>Build. Practice. Grow.</h1>\n    <p>Modern lessons with guided projects.</p>\n  </section>\n</body>`}
              backgroundGradient={<div className="codeblock1 absolute"></div>}
            />

            <CodeBlocks
              position={"lg:flex-row-reverse"}
              heading={
                <div className="font-display text-4xl font-semibold text-slate-900">
                  Start <HighlightText text={"coding in seconds"} />
                </div>
              }
              subheading={
                "Hands-on exercises and crisp interfaces make it easy to stay focused from your first lesson to your next milestone."
              }
              ctabtn1={{
                btnText: "Continue lesson",
                link: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "See curriculum",
                link: "/signup",
                active: false,
              }}
              codeColor={"text-slate-800"}
              codeblock={`import React from "react"\n\nconst Lesson = () => {\n  return (\n    <main>\n      <h1>Ship your next project</h1>\n      <p>Practice with guided coding labs.</p>\n    </main>\n  )\n}\n\nexport default Lesson`}
              backgroundGradient={<div className="codeblock2 absolute"></div>}
            />
          </div>

          <ExploreMore />
        </div>
      </section>

      <section className="bg-slate-50 text-slate-900">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-20 py-24">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div className="section-kicker">Outcomes First</div>
              <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
                Get the skills you need for a <HighlightText text="job that is in demand." />
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-8 text-slate-600">
                The most effective learning products reduce noise, surface the
                right next action, and make progress visible. That is the design
                direction used across this experience.
              </p>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Explore full catalog</div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-16 py-24 border-t border-slate-100">
          <InstructorSection />

          <div className="text-center">
            <div className="section-kicker">Social Proof</div>
            <h2 className="font-display text-4xl font-semibold text-slate-900 md:text-5xl">
              Reviews from other learners
            </h2>
          </div>
          <ReviewSlider />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
