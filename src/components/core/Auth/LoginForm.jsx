import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-7 flex w-full flex-col gap-y-5"
    >
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
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-style w-full !pl-11"
          />
        </div>
      </label>

      <label className="relative">
        <p className="input-label">
          Password <sup className="text-pink-600">*</sup>
        </p>
        <div className="relative">
          <HiOutlineLockClosed className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="form-style w-full !pl-11 !pr-12"
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

        <Link to="/forgot-password">
          <p className="mt-2 ml-auto max-w-max text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Forgot Password
          </p>
        </Link>
      </label>

      <button
        type="submit"
        className="btn-primary mt-4 min-h-[48px] w-full text-base font-bold"
      >
        Sign In
      </button>

      <p className="field-hint text-center">
        Use your registered email and password to continue learning.
      </p>
    </form>
  )
}

export default LoginForm
