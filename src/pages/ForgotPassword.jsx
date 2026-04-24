import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="page-shell grid min-h-[calc(100vh-5rem)] place-items-center px-0 py-8 sm:py-12">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="form-shell w-11/12 max-w-[520px]">
          <p className="section-kicker mb-3">Security</p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[2.25rem] sm:leading-[2.75rem]">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-base font-medium leading-7 text-slate-600 sm:text-[1.125rem] sm:leading-[1.75rem]">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="input-label">
                  Email Address <sup className="text-pink-600">*</sup>
                </p>
                <div className="relative">
                  <HiOutlineMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="form-style w-full !pl-11"
                  />
                </div>
              </label>
            )}

            <button
              type="submit"
              className="btn-primary mt-6 min-h-[48px] w-full text-base font-bold"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
