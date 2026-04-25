import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-1 flex-col gap-4">
      {cart.map((course, index) => (
        <article
          key={course._id}
          className={`rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${
            index !== cart.length - 1 ? "" : ""
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex flex-1 flex-col gap-4 xl:flex-row">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[148px] w-full max-w-[220px] rounded-xl object-cover"
              />

              <div className="flex flex-col space-y-1">
                <p className="text-lg font-bold text-slate-900">{course?.courseName}</p>
                <p className="text-sm font-medium text-slate-500">{course?.category?.name}</p>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-amber-600">4.5</span>
                  <ReactStars
                    count={5}
                    value={course?.ratingAndReviews?.length}
                    size={18}
                    edit={false}
                    activeColor="#f59e0b"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                  <span className="text-sm font-medium text-slate-500">
                    {course?.ratingAndReviews?.length} ratings
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <button
                type="button"
                onClick={() => dispatch(removeFromCart(course._id))}
                className="inline-flex min-h-[40px] items-center gap-x-1 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600 transition-colors hover:bg-pink-100"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>
              <p className="text-2xl font-extrabold text-slate-900">Rs. {course?.price}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}