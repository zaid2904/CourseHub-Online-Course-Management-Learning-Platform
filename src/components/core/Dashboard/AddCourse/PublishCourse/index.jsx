import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../Common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    // console.log(data)
    handleCoursePublish()
  }

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <span className="h-2 w-2 rounded-full bg-blue-600"></span>
        <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Publish Settings
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="mb-10">
          <label htmlFor="public" className="inline-flex items-center group cursor-pointer">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="h-5 w-5 rounded-md border-slate-300 bg-slate-50 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
            />
            <span className="ml-3 text-base font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
              Make this course public
            </span>
          </label>
          <p className="mt-2 ml-8 text-sm text-slate-400 font-medium">
            Once public, students will be able to discover and enroll in this course.
          </p>
        </div>

        {/* Next Prev Button */}
        <div className="flex justify-end items-center gap-x-4 pt-6 border-t border-slate-100">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-full bg-slate-100 py-2.5 px-8 font-bold text-slate-600 hover:bg-slate-200 transition-all duration-300"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  )
}
