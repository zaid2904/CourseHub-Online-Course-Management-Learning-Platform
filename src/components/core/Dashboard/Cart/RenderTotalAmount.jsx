import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import IconBtn from "../../../Common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, navigate, dispatch)
  }

  return (
    <aside className="w-full min-w-[280px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:max-w-[320px]">
      <p className="mb-1 text-sm font-semibold text-slate-500">Total</p>
      <p className="mb-6 text-3xl font-extrabold text-slate-900">Rs. {total}</p>

      <IconBtn text="Enroll Now" onclick={handleBuyCourse} customClasses="w-full justify-center" />
    </aside>
  )
}