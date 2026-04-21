import React from "react"
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from "react-type-animation"

import CTAButton from "./Button"

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex ${position} items-center justify-between gap-10 rounded-[32px] border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-xl lg:p-10`}
    >
      <div className="flex w-full flex-col gap-8 lg:w-[48%]">
        {heading}

        <div className="max-w-xl text-base leading-7 text-slate-600">
          {subheading}
        </div>

        <div className="flex flex-wrap gap-4">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      <div className="relative flex h-fit w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 px-4 py-5 text-[10px] leading-[18px] shadow-sm sm:text-sm sm:leading-6 lg:w-[500px]">
        {backgroundGradient}
        <div className="flex w-[12%] select-none flex-col text-center font-mono font-bold text-slate-500">
          <p>01</p>
          <p>02</p>
          <p>03</p>
          <p>04</p>
          <p>05</p>
          <p>06</p>
          <p>07</p>
          <p>08</p>
          <p>09</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[88%] pr-2 font-mono font-medium ${codeColor} relative z-10`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
