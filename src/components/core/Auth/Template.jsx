import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="page-shell grid min-h-[calc(100vh-5rem)] place-items-center px-0 py-8 sm:py-12">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse items-stretch gap-6 md:flex-row md:gap-10">
          <div className="form-shell mx-auto w-full max-w-[520px] md:mx-0">
            <p className="section-kicker mb-3">Welcome</p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[2.25rem] sm:leading-[2.75rem]">
              {title}
            </h1>
            <p className="mt-4 text-base leading-7 sm:text-[1.125rem] sm:leading-[1.75rem]">
              <span className="text-slate-600 font-medium">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-600">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          <div className="section-panel relative mx-auto hidden w-full max-w-[520px] overflow-hidden p-4 md:block md:mx-0">
            <div className="absolute -left-20 top-10 h-48 w-48 rounded-full bg-cyan-100/70 blur-3xl" />
            <div className="absolute -right-16 bottom-4 h-44 w-44 rounded-full bg-indigo-100/70 blur-3xl" />
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
              className="w-full rounded-2xl"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute right-4 top-4 z-10 w-[94%] rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
