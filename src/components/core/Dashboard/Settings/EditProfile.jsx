import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../Common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)} noValidate>
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Profile Information</h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className={`form-style ${errors.firstName ? "is-invalid" : ""}`}
                aria-invalid={Boolean(errors.firstName)}
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && <span className="field-error">Please enter your first name.</span>}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                className={`form-style ${errors.lastName ? "is-invalid" : ""}`}
                aria-invalid={Boolean(errors.lastName)}
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && <span className="field-error">Please enter your last name.</span>}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className={`form-style ${errors.dateOfBirth ? "is-invalid" : ""}`}
                aria-invalid={Boolean(errors.dateOfBirth)}
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your date of birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && <span className="field-error">{errors.dateOfBirth.message}</span>}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                id="gender"
                className={`form-style ${errors.gender ? "is-invalid" : ""}`}
                aria-invalid={Boolean(errors.gender)}
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.gender && <span className="field-error">Please select your gender.</span>}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter contact number"
                className={`form-style ${errors.contactNumber ? "is-invalid" : ""}`}
                aria-invalid={Boolean(errors.contactNumber)}
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your contact number.",
                  },
                  maxLength: { value: 12, message: "Invalid contact number" },
                  minLength: { value: 10, message: "Invalid contact number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && <span className="field-error">{errors.contactNumber.message}</span>}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <textarea
                id="about"
                rows="3"
                placeholder="Tell us about yourself"
                className={`form-style ${errors.about ? "is-invalid" : ""}`}
                aria-invalid={Boolean(errors.about)}
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about || ""}
              />
              {errors.about && <span className="field-error">Please add a short bio.</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="btn-secondary px-8"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save Changes" />
      </div>
    </form>
  )
}