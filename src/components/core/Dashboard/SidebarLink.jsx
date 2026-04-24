import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`group relative flex items-center rounded-2xl px-4 py-3 text-sm transition-all duration-300 ${
        matchRoute(link.path)
          ? "bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/20"
          : "font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      } focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200`}
    >
      {matchRoute(link.path) && (
        <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-white/90" />
      )}
      <div className="flex items-center gap-x-3">
        {/* Icon Goes Here */}
        <Icon
          className={`text-xl ${
            matchRoute(link.path)
              ? "text-white"
              : "text-slate-400 transition-colors group-hover:text-slate-900"
          }`}
        />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}
