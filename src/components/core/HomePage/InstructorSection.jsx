import React from "react"
import { FaArrowRight } from "react-icons/fa"

import Instructor from "../../../assets/Images/Instructor.png"
import CTAButton from "../../../components/core/HomePage/Button"
import HighlightText from "./HighlightText"

const InstructorSection = () => {
  return (
    <section className="grid items-center gap-12 rounded-[32px] border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-xl lg:grid-cols-2 lg:p-10">
      <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm p-4">
        <div className="absolute inset-x-12 top-6 h-24 rounded-full bg-blue-200/50 blur-3xl" />
        <img
          src={Instructor}
          alt="Instructor teaching online"
          className="relative z-10 w-full rounded-[24px] object-cover"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="section-kicker">Teach With Us</div>
        <h2 className="font-display text-4xl font-semibold text-slate-900 md:text-5xl">
          Become an <HighlightText text="instructor" />
        </h2>

        <p className="max-w-xl text-base leading-8 text-slate-600">
          Share your expertise with learners around the world using a platform
          designed to help you publish courses, track outcomes, and build a
          credible teaching brand.
        </p>

        <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex items-center gap-3">
              Start teaching today
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

export default InstructorSection
