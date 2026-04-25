import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5">
      <div className="flex items-center gap-2 text-sm">
        <HiOutlineVideoCamera className="text-blue-600" />
        <p className="font-semibold text-slate-700">{subSec?.title}</p>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion