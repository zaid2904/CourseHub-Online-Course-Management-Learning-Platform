import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { HiMiniArrowTrendingUp } from "react-icons/hi2"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import IconBtn from "../../Common/IconBtn"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [token])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  const stats = [
    { label: "Total courses", value: courses.length, accent: "cyan" },
    { label: "Total students", value: totalStudents || 0, accent: "emerald" },
    { label: "Total income", value: `Rs. ${totalAmount || 0}`, accent: "violet" },
  ]

  return (
    <div className="space-y-10">
      <div className="dashboard-surface flex flex-col gap-8 p-10 lg:flex-row lg:items-center lg:justify-between rounded-[40px]">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <p className="section-kicker">Instructor Analytics</p>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-slate-900 tracking-tight lg:text-5xl">
            Hi {user?.firstName}, <span className="text-slate-400">here's your teaching snapshot.</span>
          </h1>
          <p className="max-w-2xl text-lg font-medium text-slate-500 leading-relaxed">
            Monitor revenue, learner engagement, and course performance from a
            cleaner, more focused dashboard.
          </p>
        </div>
        <div className="dashboard-pill bg-blue-50 text-blue-600 border-blue-100 font-bold px-6 py-3">
          <HiMiniArrowTrendingUp className="text-xl" />
          Live performance
        </div>
      </div>

      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
          <div className="spinner"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-10">
          <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
            {totalAmount > 0 || totalStudents > 0 ? (
              <div className="dashboard-card overflow-hidden">
                <InstructorChart courses={instructorData} />
              </div>
            ) : (
              <div className="dashboard-card flex min-h-[420px] flex-col justify-between p-10">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600">
                    Visualize
                  </p>
                  <p className="mt-6 text-4xl font-extrabold text-slate-900 tracking-tight">
                    Not enough data <br/>to visualize yet
                  </p>
                  <p className="mt-4 max-w-lg text-lg font-medium text-slate-500 leading-relaxed">
                    Publish a few courses or enroll more students to unlock the
                    full analytics suite.
                  </p>
                </div>
                <Link to="/dashboard/add-course">
                  <IconBtn text="Create your first course" />
                </Link>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-3 xl:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label} className="dashboard-card p-8 group hover:border-blue-200 transition-all">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-500 transition-colors">
                    {stat.label}
                  </p>
                  <p className="mt-6 font-display text-4xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-600">
                  Your Content
                </p>
                <p className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
                  Recently published
                </p>
              </div>
              <Link to="/dashboard/my-courses" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-all underline underline-offset-8 decoration-2">
                View all courses
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course._id}
                  className="group rounded-[32px] border border-slate-100 bg-slate-50/50 p-5 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden rounded-[24px]">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                      {course.status}
                    </div>
                  </div>
                  <div className="mt-6 px-2">
                    <p className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {course.courseName}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-sm font-bold text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-300">●</span>
                        <p>{course.studentsEnroled.length} students</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-300">●</span>
                        <p className="text-blue-600">Rs. {course.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-card flex flex-col items-center justify-center py-24 text-center p-10">
          <div className="grid aspect-square w-20 place-items-center rounded-[28px] bg-blue-50 text-blue-600 shadow-sm mb-8">
            <FaPlus className="text-3xl" />
          </div>
          <p className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">
            You haven't created <br/>any courses yet
          </p>
          <p className="mt-6 max-w-xl text-lg font-medium text-slate-500 leading-relaxed">
            Start your journey by creating your first course. This dashboard will automatically track 
            your performance, revenue, and student growth.
          </p>
          <Link to="/dashboard/add-course" className="mt-10">
            <IconBtn text="Create your first course" />
          </Link>
        </div>
      )}
    </div>
  )
}
