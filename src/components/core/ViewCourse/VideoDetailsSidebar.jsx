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
    <div className="flex h-[calc(100vh-5rem)] w-[340px] max-w-[360px] flex-col border-r border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-4 flex flex-col gap-4 border-b border-white/10 py-5">
        <div className="flex w-full items-center gap-3">
          <button
            onClick={() => {
              navigate(`/dashboard/enrolled-courses`)
            }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition duration-300 hover:bg-white/10"
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

        <div className="dashboard-surface p-4">
          <p className="text-lg font-semibold text-white">
            {courseEntireData?.courseName}
          </p>
          <p className="mt-2 text-sm text-slate-300">
            {completedLectures?.length} of {totalNoOfLectures} lessons
            completed
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {courseSectionData.map((course, index) => (
            <div
              className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]"
              key={index}
            >
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                onClick={() => setActiveStatus(course?._id)}
              >
                <div className="w-[78%] text-sm font-semibold text-white">
                  {course?.sectionName}
                </div>
                <span
                  className={`transition-all duration-300 ${
                    activeStatus === course?._id ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <BsChevronDown className="text-slate-300" />
                </span>
              </button>

              {activeStatus === course?._id && (
                <div className="border-t border-white/10 p-2">
                  {course.subSection.map((topic, i) => (
                    <button
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition duration-300 ${
                        videoBarActive === topic._id
                          ? "bg-cyan-300 text-slate-950"
                          : "text-slate-200 hover:bg-white/5"
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
                        className="h-4 w-4 accent-slate-950"
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
