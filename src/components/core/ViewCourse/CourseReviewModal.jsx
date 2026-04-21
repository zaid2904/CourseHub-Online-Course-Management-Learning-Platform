import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-slate-900/20 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between bg-slate-50 p-6 border-b border-slate-200">
          <p className="text-xl font-bold text-slate-900 tracking-tight">Add Review</p>
          <button onClick={() => setReviewModal(false)} className="text-slate-500 hover:text-slate-900 transition-colors">
            <RxCross2 className="text-2xl" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-8">
          <div className="flex items-center justify-center gap-x-4 mb-8">
            <div className="h-14 w-14 shrink-0 rounded-full border-2 border-slate-100 shadow-sm overflow-hidden bg-slate-50">
              <img
                src={user?.image}
                alt={user?.firstName + "profile"}
                className="h-full w-full object-cover object-center aspect-square"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`
                }}
              />
            </div>
            <div className="">
              <p className="font-bold text-lg text-slate-900 leading-tight">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm font-medium text-slate-500 mt-1">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={32}
                activeColor="#eab308"
                emptyIcon={<div className="text-slate-200">★</div>}
              />
            </div>
            <div className="flex w-full flex-col space-y-2">
              <label
                className="text-sm font-bold text-slate-700 ml-1"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-600">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Share your thoughts about this course..."
                {...register("courseExperience", { required: true })}
                className="form-style min-h-[150px] w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs font-bold text-pink-600">
                  Please share your experience
                </span>
              )}
            </div>
            <div className="mt-8 flex w-full justify-end gap-x-3">
              <button
                onClick={() => setReviewModal(false)}
                className="flex cursor-pointer items-center gap-x-2 rounded-full bg-slate-100 py-2.5 px-6 font-bold text-slate-600 hover:bg-slate-200 transition-all duration-200"
              >
                Cancel
              </button>
              <IconBtn text="Save Review" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
