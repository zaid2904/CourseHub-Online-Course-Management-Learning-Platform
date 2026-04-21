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
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Profile Information
            </h2>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="firstName" className="lable-style font-bold text-slate-700 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  className="form-style"
                  {...register("firstName", { required: true })}
                  defaultValue={user?.firstName}
                />
                {errors.firstName && (
                  <span className="ml-2 text-xs font-bold text-pink-600">
                    Please enter your first name.
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastName" className="lable-style font-bold text-slate-700 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name"
                  className="form-style"
                  {...register("lastName", { required: true })}
                  defaultValue={user?.lastName}
                />
                {errors.lastName && (
                  <span className="ml-2 text-xs font-bold text-pink-600">
                    Please enter your last name.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="dateOfBirth" className="lable-style font-bold text-slate-700 ml-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  className="form-style"
                  {...register("dateOfBirth", {
                    required: {
                      value: true,
                      message: "Please enter your Date of Birth.",
                    },
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date of Birth cannot be in the future.",
                    },
                  })}
                  defaultValue={user?.additionalDetails?.dateOfBirth}
                />
                {errors.dateOfBirth && (
                  <span className="ml-2 text-xs font-bold text-pink-600">
                    {errors.dateOfBirth.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="gender" className="lable-style font-bold text-slate-700 ml-1">
                  Gender
                </label>
                <select
                  type="text"
                  name="gender"
                  id="gender"
                  className="form-style"
                  {...register("gender", { required: true })}
                  defaultValue={user?.additionalDetails?.gender}
                >
                  {genders.map((ele, i) => {
                    return (
                      <option key={i} value={ele}>
                        {ele}
                      </option>
                    )
                  })}
                </select>
                {errors.gender && (
                  <span className="ml-2 text-xs font-bold text-pink-600">
                    Please select your gender.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="contactNumber" className="lable-style font-bold text-slate-700 ml-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  placeholder="Enter Contact Number"
                  className="form-style"
                  {...register("contactNumber", {
                    required: {
                      value: true,
                      message: "Please enter your Contact Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Contact Number" },
                    minLength: { value: 10, message: "Invalid Contact Number" },
                  })}
                  defaultValue={user?.additionalDetails?.contactNumber}
                />
                {errors.contactNumber && (
                  <span className="ml-2 text-xs font-bold text-pink-600">
                    {errors.contactNumber.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="about" className="lable-style font-bold text-slate-700 ml-1">
                  About
                </label>
                <input
                  type="text"
                  name="about"
                  id="about"
                  placeholder="Enter Bio Details"
                  className="form-style"
                  {...register("about", { required: true })}
                  defaultValue={user?.additionalDetails?.about}
                />
                {errors.about && (
                  <span className="ml-2 text-xs font-bold text-pink-600">
                    Please enter your About info.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-full bg-slate-100 py-3 px-8 font-bold text-slate-600 hover:bg-slate-200 transition-all duration-300"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save Changes" />
        </div>
      </form>
    </>
  )
}
