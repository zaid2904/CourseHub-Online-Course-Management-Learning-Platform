import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div className="my-10 rounded-[32px] border border-pink-100 bg-pink-50/60 p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-x-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 shadow-sm">
          <FiTrash2 className="text-3xl" />
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-pink-900">Delete Account</h2>
          <div className="max-w-xl space-y-1">
            <p className="text-sm font-bold text-pink-800">Would you like to delete your account?</p>
            <p className="text-sm font-medium leading-relaxed text-pink-700">
              This action is permanent and will remove your profile, enrolled courses, and related data.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex min-h-[44px] items-center rounded-full border border-pink-300 bg-white px-5 text-sm font-bold text-pink-600 transition-colors hover:bg-pink-100 hover:text-pink-700"
            onClick={handleDeleteAccount}
          >
            I want to delete my account
          </button>
        </div>
      </div>
    </div>
  )
}