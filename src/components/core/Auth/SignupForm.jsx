import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineUser } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../Common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [passAlert, setPassAlert] = useState("")
  const [confirmAlert, setConfirmAlert] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))

    if (e.target.name === "password") {
      setPassAlert("")
    }

    if (e.target.name === "confirmPassword") {
      setConfirmAlert("")
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password.length < 8) {
      setPassAlert("Password must be at least 8 characters")
      return
    }

    if (password !== confirmPassword) {
      setConfirmAlert("Password and confirm password must match")
      toast.error("Passwords do not match")
      return
    }

    const signupData = {
      ...formData,
      accountType,
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
    setPassAlert("")
    setConfirmAlert("")
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleOnSubmit} className="mt-1 flex w-full flex-col gap-y-5" noValidate>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-x-4">
          <label className="w-full" htmlFor="signup-first-name">
            <p className="input-label">
              First Name <sup className="text-pink-600">*</sup>
            </p>
            <div className="relative">
              <HiOutlineUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input
                id="signup-first-name"
                required
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={handleOnChange}
                placeholder="First name"
                className="form-style w-full !pl-11"
              />
            </div>
          </label>

          <label className="w-full" htmlFor="signup-last-name">
            <p className="input-label">
              Last Name <sup className="text-pink-600">*</sup>
            </p>
            <div className="relative">
              <HiOutlineUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input
                id="signup-last-name"
                required
                type="text"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Last name"
                className="form-style w-full !pl-11"
              />
            </div>
          </label>
        </div>

        <label className="w-full" htmlFor="signup-email">
          <p className="input-label">
            Email Address <sup className="text-pink-600">*</sup>
          </p>
          <div className="relative">
            <HiOutlineMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
            <input
              id="signup-email"
              required
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={handleOnChange}
              placeholder="you@example.com"
              className="form-style w-full !pl-11"
            />
          </div>
        </label>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-x-4">
          <label className="relative w-full" htmlFor="signup-password">
            <p className="input-label">
              Create Password <sup className="text-pink-600">*</sup>
            </p>
            <div className="relative">
              <HiOutlineLockClosed className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input
                id="signup-password"
                required
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={handleOnChange}
                placeholder="Create password"
                className={`form-style w-full !pl-11 !pr-12 ${passAlert ? "is-invalid" : ""}`}
                aria-invalid={Boolean(passAlert)}
                aria-describedby="signup-password-help"
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
            {passAlert ? (
              <p id="signup-password-help" className="field-error">
                {passAlert}
              </p>
            ) : (
              <p id="signup-password-help" className="field-hint">
                Use at least 8 characters.
              </p>
            )}
          </label>

          <label className="relative w-full" htmlFor="signup-confirm-password">
            <p className="input-label">
              Confirm Password <sup className="text-pink-600">*</sup>
            </p>
            <div className="relative">
              <HiOutlineLockClosed className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input
                id="signup-confirm-password"
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
                className={`form-style w-full !pl-11 !pr-12 ${confirmAlert ? "is-invalid" : ""}`}
                aria-invalid={Boolean(confirmAlert)}
                aria-describedby="signup-confirm-password-help"
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
            {confirmAlert ? (
              <p id="signup-confirm-password-help" className="field-error">
                {confirmAlert}
              </p>
            ) : (
              <p id="signup-confirm-password-help" className="field-hint">
                Re-enter the same password for confirmation.
              </p>
            )}
          </label>
        </div>

        <button type="submit" className="btn-primary mt-4 min-h-[48px] w-full text-base font-bold">
          Create Account
        </button>

        <p className="field-hint text-center">
          By continuing, you agree to our terms and privacy policy.
        </p>
      </form>
    </div>
  )
}

export default SignupForm