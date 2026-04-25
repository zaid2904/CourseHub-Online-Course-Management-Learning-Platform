import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const dispatch = useDispatch()

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={({ isActive }) =>
        `group relative flex min-h-[44px] items-center rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-white/90" />
          )}
          <div className="flex items-center gap-x-3">
            <Icon
              className={`text-xl ${
                isActive
                  ? "text-white"
                  : "text-slate-400 transition-colors group-hover:text-slate-900"
              }`}
            />
            <span>{link.name}</span>
          </div>
        </>
      )}
    </NavLink>
  )
}