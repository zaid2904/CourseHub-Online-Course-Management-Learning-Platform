import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../Common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId])

  return (
    <div className="viewcourse-sidebar flex h-[calc(100vh-5rem)] w-full max-w-full flex-col border-r border-slate-200/90 backdrop-blur-xl sm:max-w-[360px]">
      <div className="mx-4 flex flex-col gap-4 border-b border-slate-200/90 py-5">
        <div className="flex w-full items-center gap-3">
          <button
            onClick={() => {
              navigate(`/dashboard/enrolled-courses`)
            }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition duration-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            title="back"
          >
            <IoIosArrowBack size={24} />
          </button>
          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onclick={() => setReviewModal(true)}
          />
        </div>

        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-slate-50 to-blue-50/70 p-4 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
          <p className="text-lg font-semibold text-slate-900">
            {courseEntireData?.courseName}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {completedLectures?.length} of {totalNoOfLectures} lessons
            completed
          </p>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 transition-all duration-500"
              style={{
                width: `${
                  totalNoOfLectures
                    ? Math.min(
                        100,
                        Math.round((completedLectures?.length / totalNoOfLectures) * 100)
                      )
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {courseSectionData.map((course, index) => (
            <div
              className="viewcourse-fade-up overflow-hidden rounded-[24px] border border-slate-200 bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
              style={{ animationDelay: `${index * 80}ms` }}
              key={index}
            >
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-300 hover:bg-slate-50"
                onClick={() => setActiveStatus(course?._id)}
              >
                <div className="w-[78%] text-sm font-semibold text-slate-800">
                  {course?.sectionName}
                </div>
                <span
                  className={`transition-all duration-300 ${
                    activeStatus === course?._id ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <BsChevronDown className="text-slate-500" />
                </span>
              </button>

              {activeStatus === course?._id && (
                <div className="border-t border-slate-200 p-2">
                  {course.subSection.map((topic, i) => (
                    <button
                      className={`viewcourse-item-glow flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition duration-300 ${
                        videoBarActive === topic._id
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.28)]"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                        className="h-4 w-4 accent-blue-600"
                      />
                      <span>{topic.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
