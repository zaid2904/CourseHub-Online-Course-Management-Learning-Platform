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
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
      setSubmitState({
        type: "success",
        message: "Message sent successfully. We will get back to you soon.",
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setSubmitState({
        type: "error",
        message: "Unable to send message right now. Please try again in a moment.",
      })
    } finally {
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
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)} noValidate>
      {submitState.message && (
        <div
          className={`status-banner ${
            submitState.type === "success" ? "status-banner-success" : "status-banner-error"
          }`}
          role="status"
          aria-live="polite"
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
          <label htmlFor="contact-first-name" className="input-label">
            First Name <sup className="text-pink-600">*</sup>
          </label>
          <input
            id="contact-first-name"
            type="text"
            placeholder="First name"
            className={`form-style ${errors.firstname ? "is-invalid" : ""}`}
            aria-invalid={Boolean(errors.firstname)}
            {...register("firstname", { required: true })}
          />
          {errors.firstname && <span className="field-error">Please enter your first name.</span>}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="contact-last-name" className="input-label">
            Last Name
          </label>
          <input
            id="contact-last-name"
            type="text"
            placeholder="Last name"
            className="form-style"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="input-label">
          Email Address <sup className="text-pink-600">*</sup>
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          className={`form-style ${errors.email ? "is-invalid" : ""}`}
          aria-invalid={Boolean(errors.email)}
          {...register("email", { required: true })}
        />
        {errors.email && <span className="field-error">Please enter your email address.</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-phone" className="input-label">
          Phone Number <sup className="text-pink-600">*</sup>
        </label>

        <div className="flex flex-col gap-3 xsm:flex-row xsm:gap-5">
          <div className="flex w-full xsm:w-[130px] flex-col gap-2">
            <select
              id="contact-country-code"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele) => (
                <option key={`${ele.code}-${ele.country}`} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-full flex-col gap-2">
            <input
              id="contact-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="12345 67890"
              className={`form-style ${errors.phoneNo ? "is-invalid" : ""}`}
              aria-invalid={Boolean(errors.phoneNo)}
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your phone number.",
                },
                maxLength: { value: 12, message: "Invalid phone number" },
                minLength: { value: 10, message: "Invalid phone number" },
              })}
            />
          </div>
        </div>

        {errors.phoneNo && <span className="field-error">{errors.phoneNo.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="input-label">
          Message <sup className="text-pink-600">*</sup>
        </label>
        <textarea
          id="contact-message"
          cols="30"
          rows="7"
          placeholder="Tell us about your project or question"
          className={`form-style ${errors.message ? "is-invalid" : ""}`}
          aria-invalid={Boolean(errors.message)}
          {...register("message", { required: true })}
        />
        {errors.message && <span className="field-error">Please enter your message.</span>}
      </div>

      <button
        disabled={loading}
        type="submit"
        className="btn-primary min-h-[48px] w-full px-8 py-4 text-center text-base font-bold"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm