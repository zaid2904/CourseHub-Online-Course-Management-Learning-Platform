import React from "react"
import { HiUsers } from "react-icons/hi"
import { ImTree } from "react-icons/im"

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading

  return (
    <div
      className={`group flex h-full min-h-[280px] w-full cursor-pointer flex-col justify-between rounded-[28px] border p-6 transition duration-300 hover:-translate-y-1 ${
        isActive
          ? "border-cyan-300/40 bg-white text-slate-900 shadow-soft"
          : "border-slate-200 bg-slate-50 text-slate-600 shadow-sm hover:bg-white hover:shadow-soft"
      }`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="space-y-4">
        <div
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
            isActive
              ? "bg-cyan-100 text-cyan-700"
              : "bg-slate-200 text-slate-700 group-hover:bg-slate-100"
          }`}
        >
          {cardData?.level}
        </div>

        <div
          className={`font-display text-2xl font-semibold ${
            isActive ? "text-slate-900" : "text-slate-800"
          }`}
        >
          {cardData?.heading}
        </div>

        <div className={isActive ? "text-slate-600" : "text-slate-500"}>
          {cardData?.description}
        </div>
      </div>

      <div
        className={`mt-8 flex items-center justify-between border-t pt-5 text-sm font-medium ${
          isActive
            ? "border-slate-200 text-slate-600"
            : "border-slate-200 text-slate-500"
        }`}
      >
        <div className="flex items-center gap-2">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        <div className="flex items-center gap-2">
          <ImTree />
          <p>{cardData?.lessionNumber} lessons</p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
