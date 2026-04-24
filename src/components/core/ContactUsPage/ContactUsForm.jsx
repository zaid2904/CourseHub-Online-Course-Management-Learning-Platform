import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi"

import CountryCode from "../../../data/countrycode.json"
import { apiConnector } from "../../../services/apiConnector"
import { contactusEndpoint } from "../../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const [submitState, setSubmitState] = useState({ type: "", message: "" })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      setSubmitState({ type: "", message: "" })
      await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      setSubmitState({
        type: "success",
        message: "Message sent successfully. We will get back to you soon.",
      })
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setSubmitState({
        type: "error",
        message: "Unable to send message right now. Please try again in a moment.",
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {submitState.message && (
        <div
          className={`flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold ${
            submitState.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-pink-200 bg-pink-50 text-pink-700"
          }`}
        >
          {submitState.type === "success" ? (
            <HiOutlineCheckCircle className="mt-0.5 text-lg" />
          ) : (
            <HiOutlineExclamationCircle className="mt-0.5 text-lg" />
          )}
          <p>{submitState.message}</p>
        </div>
      )}

      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="input-label">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className={`form-style ${errors.firstname ? "is-invalid" : ""}`}
            aria-invalid={Boolean(errors.firstname)}
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="field-error">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="input-label">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="input-label">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className={`form-style ${errors.email ? "is-invalid" : ""}`}
          aria-invalid={Boolean(errors.email)}
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="field-error">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="input-label">
          Phone Number
        </label>

        <div className="flex flex-col gap-3 xsm:flex-row xsm:gap-5">
          <div className="flex w-full xsm:w-[120px] flex-col gap-2">
            <select
              name="countrycode"
              id="countrycode"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-full flex-col gap-2">
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className={`form-style ${errors.phoneNo ? "is-invalid" : ""}`}
              aria-invalid={Boolean(errors.phoneNo)}
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="field-error">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="input-label">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className={`form-style ${errors.message ? "is-invalid" : ""}`}
          aria-invalid={Boolean(errors.message)}
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="field-error">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`btn-primary min-h-[48px] w-full px-8 py-4 text-center text-base font-bold 
         ${
           !loading &&
           "transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95"
         }  disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm
