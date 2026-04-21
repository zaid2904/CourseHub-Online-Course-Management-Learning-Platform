import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token)
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
  }, [token])

  return (
    <div className="space-y-8">
      <div>
        <p className="section-kicker mb-3">Learning Dashboard</p>
        <h1 className="font-display text-3xl font-semibold text-white">
          Enrolled Courses
        </h1>
      </div>

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-12rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="dashboard-card py-20 text-center">
          <p className="font-display text-3xl font-semibold text-white">
            You have not enrolled in any course yet.
          </p>
          <p className="mt-3 text-slate-300">
            Browse the catalog to start your learning journey.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {enrolledCourses.map((course, i) => (
            <div
              className="dashboard-surface flex flex-col gap-5 p-5 transition duration-300 hover:-translate-y-1 lg:flex-row lg:items-center lg:justify-between"
              key={i}
            >
              <div
                className="flex cursor-pointer items-center gap-4 lg:w-[48%]"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-24 w-24 rounded-[22px] object-cover"
                />
                <div className="flex max-w-xl flex-col gap-2">
                  <p className="text-lg font-semibold text-white">
                    {course.courseName}
                  </p>
                  <p className="text-sm leading-6 text-slate-300">
                    {course.courseDescription.length > 120
                      ? `${course.courseDescription.slice(0, 120)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:w-[48%] lg:grid-cols-[160px_1fr]">
                <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Duration
                  </p>
                  <p className="mt-3 text-base font-semibold text-white">
                    {course?.totalDuration}
                  </p>
                </div>

                <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Progress
                    </p>
                    <p className="text-sm font-semibold text-cyan-200">
                      {course.progressPercentage || 0}%
                    </p>
                  </div>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="10px"
                    isLabelVisible={false}
                    bgColor="#22d3ee"
                    baseBgColor="#1e293b"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
