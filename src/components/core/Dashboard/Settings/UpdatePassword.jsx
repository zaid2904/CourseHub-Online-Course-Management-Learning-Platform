import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../Common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)} noValidate>
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Password Settings</h2>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="oldPassword" className="lable-style">
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              placeholder="Enter current password"
              className={`form-style ${errors.oldPassword ? "is-invalid" : ""}`}
              aria-invalid={Boolean(errors.oldPassword)}
              {...register("oldPassword", { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label={showOldPassword ? "Hide current password" : "Show current password"}
            >
              {showOldPassword ? <AiOutlineEyeInvisible fontSize={22} /> : <AiOutlineEye fontSize={22} />}
            </button>
            {errors.oldPassword && <span className="field-error">Please enter your current password.</span>}
          </div>

          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="newPassword" className="lable-style">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter new password"
              className={`form-style ${errors.newPassword ? "is-invalid" : ""}`}
              aria-invalid={Boolean(errors.newPassword)}
              {...register("newPassword", { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label={showNewPassword ? "Hide new password" : "Show new password"}
            >
              {showNewPassword ? <AiOutlineEyeInvisible fontSize={22} /> : <AiOutlineEye fontSize={22} />}
            </button>
            {errors.newPassword && <span className="field-error">Please enter your new password.</span>}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="btn-secondary px-8"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update Password" />
      </div>
    </form>
  )
}