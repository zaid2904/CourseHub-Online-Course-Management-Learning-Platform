import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../Common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="hidden h-[calc(100vh-6.5rem)] min-w-[280px] items-center border-r border-slate-200 bg-slate-50/50 lg:grid">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <aside className="w-full flex flex-col gap-4 lg:w-72 lg:shrink-0">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="h-14 w-14 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Welcome back</p>
              <p className="text-lg font-bold text-slate-900 truncate">
                {user?.firstName}
              </p>
              <div className="inline-flex mt-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
                  {user?.accountType}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              )
            })}
          </div>

          <div className="mt-8 space-y-2 pt-6 border-t border-slate-100">
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 transition-all duration-300 hover:bg-red-50 hover:text-red-600"
            >
              <VscSignOut className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
