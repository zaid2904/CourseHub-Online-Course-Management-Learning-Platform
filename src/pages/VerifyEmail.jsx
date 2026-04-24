import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

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
    );
  };

  return (
    <div className="page-shell grid min-h-[calc(100vh-5rem)] place-items-center px-0 py-8 sm:py-12">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="form-shell w-11/12 max-w-[520px]">
          <p className="section-kicker mb-3">Verification</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[2.25rem] sm:leading-[2.75rem]">
            Verify Email
          </h1>
          <p className="my-4 text-base font-medium leading-7 text-slate-600 sm:text-[1.125rem] sm:leading-[1.75rem]">
            A verification code has been sent to you. Enter the code below
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

            <button
              type="submit"
              className="btn-primary mt-8 min-h-[48px] w-full text-base font-bold"
            >
              Verify Email
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="flex items-center gap-x-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="inline-flex min-h-[40px] items-center gap-x-2 rounded-full px-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
