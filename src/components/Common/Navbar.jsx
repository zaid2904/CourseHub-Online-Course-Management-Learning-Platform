import { useEffect, useState } from "react"
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)

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

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileCatalogOpen(false)
  }, [location.pathname])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <header
      className={`sticky top-0 z-50 flex h-20 items-center justify-center border-b border-slate-200/80 backdrop-blur-xl transition-all duration-300 ${location.pathname === "/" ? "bg-white/70" : "bg-white/90"
        }`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between rounded-full border border-slate-200 bg-white/70 px-4 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md md:px-6">
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
                        ? "bg-blue-50 text-blue-700"
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
                        ? "bg-blue-50 text-blue-700"
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

        <button
          className="mr-2 rounded-full border border-slate-200 bg-white p-3 md:hidden shadow-sm"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <AiOutlineClose fontSize={24} className="fill-slate-600" />
          ) : (
            <AiOutlineMenu fontSize={24} className="fill-slate-600" />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-[85%] max-w-[360px] border-l border-slate-200 bg-white p-5 shadow-2xl transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Logo" className="h-9 object-contain" />
            <span className="font-display text-lg font-black tracking-tight text-slate-900">Course Hub</span>
          </Link>
          <button
            className="rounded-full border border-slate-200 bg-white p-2.5"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <AiOutlineClose fontSize={20} className="fill-slate-600" />
          </button>
        </div>

        <nav>
          <ul className="space-y-1 text-base font-semibold text-slate-700">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-2">
                    <button
                      className="flex min-h-[44px] w-full items-center justify-between rounded-xl px-3 py-2 text-left"
                      onClick={() => setMobileCatalogOpen((prev) => !prev)}
                    >
                      <span>{link.title}</span>
                      <BsChevronDown
                        className={`transition-transform duration-300 ${mobileCatalogOpen ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${mobileCatalogOpen ? "max-h-[320px]" : "max-h-0"}`}>
                      <div className="mt-2 space-y-1 px-2 pb-2">
                        {loading ? (
                          <p className="px-2 py-1 text-sm text-slate-500">Loading...</p>
                        ) : subLinks?.length ? (
                          subLinks
                            ?.filter((subLink) => subLink?.courses?.length > 0)
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                className="block min-h-[44px] rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                                key={i}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subLink.name}
                              </Link>
                            ))
                        ) : (
                          <p className="px-2 py-1 text-sm text-slate-500">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className={`flex min-h-[44px] items-center rounded-xl px-3 py-2 transition-colors ${
                      matchRoute(link?.path)
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 border-t border-slate-200 pt-5">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/cart"
              className="mb-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <AiOutlineShoppingCart className="text-xl" />
              Cart {totalItems > 0 ? `(${totalItems})` : ""}
            </Link>
          )}

          {token === null && (
            <div className="grid grid-cols-2 gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-secondary min-h-[44px] w-full px-4 py-2.5 text-sm">Log in</button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-primary min-h-[44px] w-full px-4 py-2.5 text-sm">Sign up</button>
              </Link>
            </div>
          )}

          {token !== null && (
            <Link
              to="/dashboard/my-profile"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
