import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../Common/IconBtn"

const profileRows = (user) => [
  { label: "First Name", value: user?.firstName },
  { label: "Last Name", value: user?.lastName },
  { label: "Email", value: user?.email },
  {
    label: "Phone Number",
    value: user?.additionalDetails?.contactNumber ?? "Add Contact Number",
  },
  {
    label: "Gender",
    value: user?.additionalDetails?.gender ?? "Add Gender",
  },
  {
    label: "Date Of Birth",
    value:
      formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth",
  },
]

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="section-kicker">Dashboard</div>
        <h1 className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">
          My Profile
        </h1>
      </div>

      <div className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-tr from-blue-100 to-indigo-100 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="relative aspect-square w-28 rounded-[28px] object-cover ring-4 ring-slate-50 shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-base font-medium text-slate-500">{user?.email}</p>
              <div className="inline-flex px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                <p className="text-[11px] font-black uppercase tracking-widest text-blue-600">
                  {user?.accountType}
                </p>
              </div>
            </div>
          </div>
          <IconBtn
            text="Edit profile"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              About
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Personal introduction
            </p>
          </div>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-6 border border-slate-100">
          <p className={`text-base leading-relaxed ${
              user?.additionalDetails?.about ? "text-slate-700" : "text-slate-400 italic"
            }`}>
            {user?.additionalDetails?.about ?? "Tell the world about yourself..."}
          </p>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
              Details
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Personal information
            </p>
          </div>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profileRows(user).map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition-all duration-300 hover:bg-white hover:shadow-sm hover:border-slate-200"
            >
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                {item.label}
              </p>
              <p className="mt-2 text-base font-bold text-slate-700">
                {item.value || "---"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
