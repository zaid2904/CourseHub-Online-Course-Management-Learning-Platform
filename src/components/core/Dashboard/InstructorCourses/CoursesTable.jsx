import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../Common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  // console.log("All Course ", courses)

  return (
    <>
      <div className="rounded-[32px] border border-slate-200 bg-white overflow-hidden shadow-sm">
        <Table className="w-full">
          <Thead>
            <Tr className="flex gap-x-10 border-b border-slate-100 bg-slate-50/50 px-8 py-4">
              <Th className="flex-1 text-left text-[11px] font-black uppercase tracking-widest text-slate-400">
                Course Details
              </Th>
              <Th className="text-left text-[11px] font-black uppercase tracking-widest text-slate-400">
                Duration
              </Th>
              <Th className="text-left text-[11px] font-black uppercase tracking-widest text-slate-400">
                Price
              </Th>
              <Th className="text-left text-[11px] font-black uppercase tracking-widest text-slate-400">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses?.length === 0 ? (
              <Tr>
                <Td className="py-20 text-center text-xl font-bold text-slate-400">
                  No courses found yet.
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr
                  key={course._id}
                  className="flex gap-x-10 border-b border-slate-50 px-8 py-8 last:border-none hover:bg-slate-50/30 transition-colors"
                >
                  <Td className="flex flex-1 gap-x-6">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-32 w-52 rounded-2xl object-cover shadow-sm"
                    />
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <p className="text-xl font-bold text-slate-900 tracking-tight">
                          {course.courseName}
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed">
                          {course.courseDescription}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Created: {formatDate(course.createdAt)}
                        </p>
                        {course.status === COURSE_STATUS.DRAFT ? (
                          <p className="flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">
                            <HiClock size={14} />
                            Draft
                          </p>
                        ) : (
                          <p className="flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-blue-600 border border-blue-100">
                            <FaCheck size={12} />
                            Published
                          </p>
                        )}
                      </div>
                    </div>
                  </Td>
                  <Td className="text-sm font-bold text-slate-700 flex items-center">
                    2hr 30min
                  </Td>
                  <Td className="text-lg font-extrabold text-slate-900 flex items-center">
                    ₹{course.price}
                  </Td>
                  <Td className="text-sm font-medium text-slate-400 flex items-center gap-x-2">
                    <button
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }}
                      title="Edit"
                      className="p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Delete this course?",
                          text2:
                            "This action cannot be undone. All course data will be lost.",
                          btn1Text: !loading ? "Delete" : "Deleting...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }}
                      title="Delete"
                      className="p-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all duration-200"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
