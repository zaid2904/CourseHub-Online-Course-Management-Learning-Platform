import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { RxCountdownTimer } from "react-icons/rx"
import OtpInput from "react-otp-input"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { sendOtp, signUp } from "../services/operations/authAPI"

function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const { signupData, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!signupData) {
      navigate("/signup")
    }
  }, [navigate, signupData])

  const handleVerifyAndSignup = (e) => {
    e.preventDefault()

    if (!signupData) return

    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    )
  }

  return (
    <main className="page-shell grid min-h-[calc(100vh-5rem)] place-items-center px-0 py-8 sm:py-12">
      {loading ? (
        <div className="spinner" aria-label="Loading" />
      ) : (
        <section className="form-shell w-11/12 max-w-[540px]">
          <p className="section-kicker mb-3">Verification</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[2.25rem] sm:leading-[2.75rem]">
            Verify your email
          </h1>
          <p className="my-4 text-base font-medium leading-7 text-slate-600 sm:text-[1.125rem] sm:leading-[1.75rem]">
            A 6-digit verification code has been sent to your inbox. Enter it below to activate your account.
          </p>

          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="aspect-square w-[44px] rounded-xl border border-slate-200 bg-white text-center text-lg font-bold text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:w-[52px] lg:w-[60px]"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 8px",
              }}
            />

            <button type="submit" className="btn-primary mt-8 min-h-[48px] w-full text-base font-bold">
              Verify Email
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup" className="inline-flex items-center gap-x-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
              <BiArrowBack /> Back to Signup
            </Link>
            <button
              type="button"
              className="btn-ghost min-h-[40px] gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
            >
              <RxCountdownTimer />
              Resend code
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

export default VerifyEmail