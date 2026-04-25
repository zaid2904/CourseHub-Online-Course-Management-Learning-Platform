import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"

import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)

  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [course._id, isActive])

  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm last:mb-0">
      <button
        type="button"
        className="flex w-full cursor-pointer items-start justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-slate-50"
        onClick={() => handleActive(course._id)}
        aria-expanded={active}
      >
        <div className="flex items-center gap-2">
          <AiOutlineDown className={`${active ? "rotate-180" : "rotate-0"} transition-transform duration-200`} />
          <p className="font-semibold text-slate-900">{course?.sectionName}</p>
        </div>
        <span className="text-sm font-semibold text-blue-600">{`${course.subSection.length || 0} lecture(s)`}</span>
      </button>

      <div
        ref={contentEl}
        className="relative h-0 overflow-hidden border-t border-slate-100 bg-slate-50 transition-[height] duration-[0.35s] ease-[ease]"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-2 px-6 py-5 font-medium text-slate-700">
          {course?.subSection?.map((subSec) => (
            <CourseSubSectionAccordion subSec={subSec} key={subSec._id} />
          ))}
        </div>
      </div>
    </div>
  )
}