import { toast } from "react-hot-toast"

import { resetCart } from "../../slices/cartSlice"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"

const { ENROLL_COURSE_API } = studentEndpoints

export async function BuyCourse(token, courses, navigate, dispatch) {
  const toastId = toast.loading("Enrolling...")

  try {
    const response = await apiConnector(
      "POST",
      ENROLL_COURSE_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Enrollment successful")
    dispatch(resetCart())
    navigate("/dashboard/enrolled-courses")
  } catch (error) {
    console.log("ENROLL COURSE API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not enroll in course.")
  } finally {
    toast.dismiss(toastId)
  }
}
