import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { HiOutlineLockClosed } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { resetPassword } from "../services/operations/authAPI"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmAlert, setConfirmAlert] = useState("")

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    if (e.target.name === "confirmPassword") setConfirmAlert("")
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setConfirmAlert("Password and confirm password must match")
      return
    }
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <main className="page-shell grid min-h-[calc(100vh-5rem)] place-items-center px-0 py-8 sm:py-12">
      {loading ? (
        <div className="spinner" aria-label="Loading" />
      ) : (
        <section className="form-shell w-11/12 max-w-[520px]">
          <p className="section-kicker mb-3">Security</p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[2.1rem]">
            Choose a new password
          </h1>
          <p className="my-4 text-base font-medium leading-7 text-slate-600 sm:text-[1.125rem] sm:leading-[1.75rem]">
            Almost done. Create your new password and you are all set.
          </p>

          <form onSubmit={handleOnSubmit} noValidate>
            <label className="relative" htmlFor="reset-password-new">
              <p className="input-label">
                New Password <sup className="text-pink-600">*</sup>
              </p>
              <div className="relative">
                <HiOutlineLockClosed className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
                <input
                  id="reset-password-new"
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter new password"
                  className="form-style w-full !pl-11 !pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 z-[10] -translate-y-1/2 rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <AiOutlineEyeInvisible fontSize={20} /> : <AiOutlineEye fontSize={20} />}
                </button>
              </div>
            </label>

            <label className="relative mt-3 block" htmlFor="reset-password-confirm">
              <p className="input-label">
                Confirm New Password <sup className="text-pink-600">*</sup>
              </p>
              <div className="relative">
                <HiOutlineLockClosed className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
                <input
                  id="reset-password-confirm"
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm new password"
                  className={`form-style w-full !pl-11 !pr-12 ${confirmAlert ? "is-invalid" : ""}`}
                  aria-invalid={Boolean(confirmAlert)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 z-[10] -translate-y-1/2 rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={20} /> : <AiOutlineEye fontSize={20} />}
                </button>
              </div>
              {confirmAlert && <p className="field-error">{confirmAlert}</p>}
            </label>

            <button type="submit" className="btn-primary mt-6 min-h-[48px] w-full text-base font-bold">
              Reset Password
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

export default UpdatePassword