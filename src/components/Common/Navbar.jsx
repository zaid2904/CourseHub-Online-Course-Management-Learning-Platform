import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <header
      className={`sticky top-0 z-50 flex h-20 items-center justify-center border-b border-slate-200/80 backdrop-blur-xl transition-all duration-300 ${location.pathname === "/" ? "bg-white/70" : "bg-white/90"
        }`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between rounded-full border border-slate-200 bg-white/50 px-6 py-2 shadow-sm backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 md:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-xl font-black text-slate-900 tracking-tighter transition-colors duration-300 group-hover:text-blue-600">
            Course Hub
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-2 text-sm font-medium text-slate-600">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition duration-300 ${matchRoute("/catalog/:catalogName")
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[220px] translate-x-[-50%] translate-y-[3em] flex-col rounded-3xl border border-slate-200/80 bg-white p-4 text-slate-900 opacity-0 shadow-soft transition-all duration-200 group-hover:visible group-hover:translate-y-[1.9em] group-hover:opacity-100 lg:w-[320px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-5 w-5 translate-x-[80%] translate-y-[-45%] rotate-45 select-none rounded-sm border-l border-t border-slate-200/80 bg-white"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks?.length ? (
                        subLinks
                          ?.filter((subLink) => subLink?.courses?.length > 0)
                          ?.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-2xl bg-transparent px-4 py-3 transition duration-200 hover:bg-slate-100"
                              key={i}
                            >
                              <p className="font-medium">{subLink.name}</p>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${matchRoute(link?.path)
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <div className="rounded-full border border-slate-200 bg-white p-3 transition duration-300 hover:bg-slate-50 shadow-sm">
                <AiOutlineShoppingCart className="text-2xl text-slate-600" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-blue-600 text-center text-xs font-bold text-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="btn-secondary px-5 py-2.5 text-sm">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="btn-primary px-5 py-2.5 text-sm">
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        <button className="mr-2 rounded-full border border-slate-200 bg-white p-3 md:hidden shadow-sm">
          <AiOutlineMenu fontSize={24} className="fill-slate-600" />
        </button>
      </div>
    </header>
  )
}

export default Navbar
