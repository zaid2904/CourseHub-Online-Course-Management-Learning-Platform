import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <div className="section-kicker">Instructor</div>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">
            My Courses
          </h1>
          <IconBtn
            text="New Course"
            onclick={() => navigate("/dashboard/add-course")}
          >
            <VscAdd className="text-lg" />
          </IconBtn>
        </div>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}
