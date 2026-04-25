import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="section-kicker">Student</div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900">Cart</h1>
      </div>

      <p className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500 shadow-sm">
        {totalItems} {totalItems === 1 ? "course" : "courses"} in cart
      </p>

      {total > 0 ? (
        <div className="mt-2 flex flex-col-reverse items-start gap-x-8 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-2xl font-bold text-slate-800">Your cart is empty</p>
          <p className="mt-2 text-sm font-medium text-slate-500">Add a course to start learning today.</p>
        </div>
      )}
    </div>
  )
}