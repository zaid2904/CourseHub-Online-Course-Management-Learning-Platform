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
    <main className="page-shell grid min-h-[calc(100vh-5rem)] place-items-center px-0 py-8 sm:py-12">
      {loading ? (
        <div className="spinner" aria-label="Loading" />
      ) : (
        <section className="form-shell w-11/12 max-w-[520px]">
          <p className="section-kicker mb-3">Security</p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[2.25rem] sm:leading-[2.75rem]">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>
          <p className="my-4 text-base font-medium leading-7 text-slate-600 sm:text-[1.125rem] sm:leading-[1.75rem]">
            {!emailSent
              ? "Enter your account email and we will send secure reset instructions."
              : `A password reset email has been sent to ${email}.`}
          </p>

          {emailSent && (
            <div className="status-banner status-banner-success mb-5">
              <p>Open your inbox and follow the reset link to continue.</p>
            </div>
          )}

          <form onSubmit={handleOnSubmit} noValidate>
            {!emailSent && (
              <label className="w-full" htmlFor="forgot-password-email">
                <p className="input-label">
                  Email Address <sup className="text-pink-600">*</sup>
                </p>
                <div className="relative">
                  <HiOutlineMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
                  <input
                    id="forgot-password-email"
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="form-style w-full !pl-11"
                  />
                </div>
              </label>
            )}

            <button type="submit" className="btn-primary mt-6 min-h-[48px] w-full text-base font-bold">
              {!emailSent ? "Send reset link" : "Resend email"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login" className="inline-flex items-center gap-x-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
              <BiArrowBack /> Back to Login
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}

export default ForgotPassword