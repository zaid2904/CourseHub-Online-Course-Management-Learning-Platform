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
    <>
      <div className="my-10 flex flex-row gap-x-6 rounded-[32px] border border-pink-100 bg-pink-50/50 p-8 shadow-sm">
        <div className="flex aspect-square h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 shadow-sm">
          <FiTrash2 className="text-3xl" />
        </div>
        <div className="flex flex-col space-y-3">
          <h2 className="text-xl font-bold text-pink-900 tracking-tight">
            Delete Account
          </h2>
          <div className="max-w-xl space-y-1">
            <p className="text-sm font-bold text-pink-800">Would you like to delete your account?</p>
            <p className="text-sm font-medium text-pink-600/80 leading-relaxed">
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer font-bold text-pink-600 hover:text-pink-700 transition-all underline underline-offset-4 decoration-2"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  )
}
