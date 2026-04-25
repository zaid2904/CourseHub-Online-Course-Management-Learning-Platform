import { useEffect, useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex min-h-[44px] items-center gap-x-2 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open profile menu"
      >
        <img
          src={user?.image}
          alt={`${user?.firstName} profile`}
          className="aspect-square w-[32px] rounded-full object-cover ring-2 ring-slate-100"
        />
        <AiOutlineCaretDown
          className={`text-sm text-slate-500 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`absolute right-0 top-[118%] z-[1000] min-w-[180px] max-w-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
        role="menu"
      >
        <Link
          to="/dashboard/my-profile"
          onClick={() => setOpen(false)}
          className="flex min-h-[44px] w-full items-center gap-x-2 border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
          role="menuitem"
        >
          <VscDashboard className="text-lg" />
          Dashboard
        </Link>

        <button
          type="button"
          onClick={() => {
            dispatch(logout(navigate))
            setOpen(false)
          }}
          className="flex min-h-[44px] w-full items-center gap-x-2 px-4 py-3 text-left text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-red-600"
          role="menuitem"
        >
          <VscSignOut className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  )
}