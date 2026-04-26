import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import {
  HiChevronDown,
  HiOutlineCheckCircle,
  HiOutlineChatAlt2,
  HiOutlineExclamationCircle,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi"

import CountryCode from "../../../data/countrycode.json"
import { apiConnector } from "../../../services/apiConnector"
import { contactusEndpoint } from "../../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const [submitState, setSubmitState] = useState({ type: "", message: "" })
  const defaultCountryCode = useMemo(
    () => CountryCode.find((item) => item.country === "India")?.code || CountryCode[0]?.code || "+91",
    []
  )

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful, touchedFields },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      countrycode: defaultCountryCode,
      phoneNo: "",
      message: "",
    },
    mode: "onBlur",
  })

  const [firstNameValue, lastNameValue, emailValue, countryCodeValue, phoneValue, messageValue] = watch([
    "firstname",
    "lastname",
    "email",
    "countrycode",
    "phoneNo",
    "message",
  ])

  const hasValue = (value) => String(value ?? "").trim().length > 0

  const getFieldStateClass = (fieldName, value) => {
    if (errors[fieldName]) {
      return "is-invalid"
    }

    if (touchedFields[fieldName] && hasValue(value)) {
      return "is-valid"
    }

    return ""
  }

  const getFieldMessageId = (fieldName, baseId, value) => {
    if (errors[fieldName]) {
      return `${baseId}-error`
    }

    if (touchedFields[fieldName] && hasValue(value)) {
      return `${baseId}-success`
    }

    return undefined
  }

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
        countrycode: defaultCountryCode,
        phoneNo: "",
      })
    }
  }, [defaultCountryCode, reset, isSubmitSuccessful])

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)} noValidate>
      {submitState.message && (
        <div
          className={`status-banner ${
            submitState.type === "success" ? "status-banner-success" : "status-banner-error"
          }`}
          role={submitState.type === "error" ? "alert" : "status"}
          aria-live={submitState.type === "error" ? "assertive" : "polite"}
        >
          {submitState.type === "success" ? (
            <HiOutlineCheckCircle className="mt-0.5 text-lg" />
          ) : (
            <HiOutlineExclamationCircle className="mt-0.5 text-lg" />
          )}
          <p>{submitState.message}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="w-full" htmlFor="contact-first-name">
          <p className="input-label">
            First Name <sup className="text-pink-600">*</sup>
          </p>
          <div className="relative">
            <HiOutlineUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
            <input
              id="contact-first-name"
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              className={`form-style w-full !pl-11 ${getFieldStateClass("firstname", firstNameValue)}`}
              aria-invalid={Boolean(errors.firstname)}
              aria-describedby={getFieldMessageId("firstname", "contact-first-name", firstNameValue)}
              {...register("firstname", { required: true })}
            />
          </div>
          {errors.firstname ? (
            <span id="contact-first-name-error" className="field-error">
              Please enter your first name.
            </span>
          ) : (
            touchedFields.firstname &&
            hasValue(firstNameValue) && (
              <span id="contact-first-name-success" className="field-success">
                Looks good.
              </span>
            )
          )}
        </label>

        <label className="w-full" htmlFor="contact-last-name">
          <p className="input-label">Last Name</p>
          <div className="relative">
            <HiOutlineUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
            <input
              id="contact-last-name"
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              className={`form-style w-full !pl-11 ${getFieldStateClass("lastname", lastNameValue)}`}
              aria-describedby={getFieldMessageId("lastname", "contact-last-name", lastNameValue) || "contact-last-name-hint"}
              {...register("lastname")}
            />
          </div>
          {touchedFields.lastname && hasValue(lastNameValue) ? (
            <span id="contact-last-name-success" className="field-success">
              Looks good.
            </span>
          ) : (
            <span id="contact-last-name-hint" className="field-hint">
              Optional
            </span>
          )}
        </label>
      </div>

      <label className="w-full" htmlFor="contact-email">
        <p className="input-label">
          Email Address <sup className="text-pink-600">*</sup>
        </p>
        <div className="relative">
          <HiOutlineMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
          <input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`form-style w-full !pl-11 ${getFieldStateClass("email", emailValue)}`}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={getFieldMessageId("email", "contact-email", emailValue)}
            {...register("email", { required: true })}
          />
        </div>
        {errors.email ? (
          <span id="contact-email-error" className="field-error">
            Please enter your email address.
          </span>
        ) : (
          touchedFields.email &&
          hasValue(emailValue) && (
            <span id="contact-email-success" className="field-success">
              Email looks good.
            </span>
          )
        )}
      </label>

      <div className="flex flex-col gap-2">
        <div className="grid gap-3 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-4">
          <label className="w-full" htmlFor="contact-country-code">
            <p className="input-label">
              Code <sup className="text-pink-600">*</sup>
            </p>
            <div className="relative">
              <HiOutlinePhone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <select
                id="contact-country-code"
                className={`form-style w-full appearance-none !pl-11 !pr-9 ${getFieldStateClass("countrycode", countryCodeValue)}`}
                aria-invalid={Boolean(errors.countrycode)}
                aria-describedby={getFieldMessageId("countrycode", "contact-country-code", countryCodeValue)}
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((ele, index) => (
                  <option key={`${ele.code}-${ele.country}-${index}`} value={ele.code}>
                    {ele.code}
                  </option>
                ))}
              </select>
              <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
            </div>
            {errors.countrycode && (
              <span id="contact-country-code-error" className="field-error">
                Select a valid country code.
              </span>
            )}
          </label>

          <label className="w-full" htmlFor="contact-phone">
            <p className="input-label">
              Phone Number <sup className="text-pink-600">*</sup>
            </p>
            <div className="relative">
              <HiOutlinePhone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input
                id="contact-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                className={`form-style w-full !pl-11 ${getFieldStateClass("phoneNo", phoneValue)}`}
                aria-invalid={Boolean(errors.phoneNo)}
                aria-describedby={getFieldMessageId("phoneNo", "contact-phone", phoneValue)}
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
            {errors.phoneNo ? (
              <span id="contact-phone-error" className="field-error">
                {errors.phoneNo.message}
              </span>
            ) : (
              touchedFields.phoneNo &&
              hasValue(phoneValue) && (
                <span id="contact-phone-success" className="field-success">
                  Phone number looks good.
                </span>
              )
            )}
          </label>
        </div>
      </div>

      <label className="w-full" htmlFor="contact-message">
        <p className="input-label">
          Message <sup className="text-pink-600">*</sup>
        </p>
        <div className="relative">
          <HiOutlineChatAlt2 className="pointer-events-none absolute left-3 top-4 text-lg text-slate-400" />
          <textarea
            id="contact-message"
            rows="6"
            placeholder="Tell us briefly what you need help with."
            className={`form-style min-h-[160px] w-full resize-y !pl-11 ${getFieldStateClass("message", messageValue)}`}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={getFieldMessageId("message", "contact-message", messageValue)}
            {...register("message", { required: true })}
          />
        </div>
        {errors.message ? (
          <span id="contact-message-error" className="field-error">
            Please enter your message.
          </span>
        ) : (
          touchedFields.message &&
          hasValue(messageValue) && (
            <span id="contact-message-success" className="field-success">
              Thanks, this gives us helpful context.
            </span>
          )
        )}
      </label>

      <button
        disabled={loading}
        type="submit"
        className="btn-primary min-h-[50px] w-full px-8 py-4 text-center text-base font-bold"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm
