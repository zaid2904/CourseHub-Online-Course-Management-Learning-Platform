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

  // student or instructor
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

  // Handle input fields, when some value changes
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

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (password.length < 8) {
      setPassAlert('Password must be of at least eight characters')
      return
    }

    if (password !== confirmPassword) {
      setConfirmAlert("Password and confirm password must match")
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
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

  // data to pass to Tab component
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
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="mt-1 flex w-full flex-col gap-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-x-4">
          <label className="w-full">
            <p className="input-label">
              First Name <sup className="text-pink-600">*</sup>
            </p>
            <div className="relative">
              <HiOutlineUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input
                required
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="form-style w-full !pl-11"
              />
            </div>
          </label>

          <label className="w-full">
            <p className="input-label">
              Last Name <sup className="text-pink-600">*</sup>
            </p>
            <div className="relative">
              <HiOutlineUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input
                required
                type="text"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="form-style w-full !pl-11"
              />
            </div>
          </label>
        </div>

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
              inputMode="email"
              autoComplete="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="form-style w-full !pl-11"
            />
          </div>
        </label>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-x-4">
          <label className="relative w-full">
            <p className="input-label">
              Create Password <sup className="text-pink-600">*</sup>
            </p>
            <div className="relative">
              <HiOutlineLockClosed className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className={`form-style w-full !pl-11 !pr-12 ${passAlert ? "is-invalid" : ""}`}
                aria-invalid={Boolean(passAlert)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 z-[10] -translate-y-1/2 rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} />
                ) : (
                  <AiOutlineEye fontSize={20} />
                )}
              </button>
            </div>
            {passAlert ? (
              <p className="field-error">{passAlert}</p>
            ) : (
              <p className="field-hint">Use at least 8 characters.</p>
            )}
          </label>

          <label className="relative w-full">
            <p className="input-label">
              Confirm Password <sup className="text-pink-600">*</sup>
            </p>
            <div className="relative">
              <HiOutlineLockClosed className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className={`form-style w-full !pl-11 !pr-12 ${confirmAlert ? "is-invalid" : ""}`}
                aria-invalid={Boolean(confirmAlert)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 z-[10] -translate-y-1/2 rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={20} />
                ) : (
                  <AiOutlineEye fontSize={20} />
                )}
              </button>
            </div>
            {confirmAlert && <p className="field-error">{confirmAlert}</p>}
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary mt-4 min-h-[48px] w-full text-base font-bold"
        >
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
