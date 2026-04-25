import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { thumbnail: thumbnailImage, price: currentPrice } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an instructor. You cannot enroll in a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please log in to add this course to cart.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const isAlreadyEnrolled = user && course?.studentsEnroled.includes(user?._id)

  return (
    <div className="section-panel flex flex-col gap-4 p-6 text-slate-900">
      <img
        src={thumbnailImage}
        alt={course?.courseName}
        className="max-h-[300px] min-h-[180px] w-full rounded-2xl object-cover"
      />

      <div className="px-1">
        <p className="pb-2 text-3xl font-extrabold text-slate-900">Rs. {currentPrice}</p>

        <div className="flex flex-col gap-3">
          <button
            className="yellowButton"
            onClick={isAlreadyEnrolled ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}
          >
            {isAlreadyEnrolled ? "Go To Course" : "Enroll Now"}
          </button>

          {!isAlreadyEnrolled && (
            <button onClick={handleAddToCart} className="blackButton">
              Add to Cart
            </button>
          )}
        </div>

        <p className="pb-3 pt-5 text-center text-sm font-medium text-slate-500">
          Enroll instantly and start learning right away.
        </p>

        <div>
          <p className="my-3 text-lg font-bold text-slate-800">This course includes:</p>
          <div className="space-y-2 text-sm text-slate-600">
            {course?.instructions?.map((item, index) => (
              <p className="flex gap-2" key={index}>
                <BsFillCaretRightFill className="mt-1 text-blue-600" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
            onClick={handleShare}
          >
            <FaShareSquare size={15} /> Share course
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard