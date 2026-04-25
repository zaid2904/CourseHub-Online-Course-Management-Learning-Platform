import { useEffect, useRef, useState } from "react"
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, NavLink, useLocation } from "react-router-dom"

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
  const [catalogOpen, setCatalogOpen] = useState(false)

  const catalogRef = useRef(null)

  useEffect(() => {
    ;(async () => {
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
    const handleClickOutside = (event) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target)) {
        setCatalogOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileCatalogOpen(false)
    setCatalogOpen(false)
  }, [location.pathname])

  const catalogItems = subLinks?.filter((subLink) => subLink?.courses?.length > 0) || []
  const isCatalogRoute = location.pathname.startsWith("/catalog/")

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-center border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-all duration-300">
      <div className="nav-surface flex w-11/12 max-w-maxContent items-center justify-between px-4 py-2 md:px-6">
        <Link to="/" className="group flex items-center gap-3" aria-label="Go to homepage">
          <img
            src="/logo.png"
            alt="Course Hub"
            className="h-10 object-contain transition-transform duration-300 group-hover:scale-105 md:h-12"
          />
          <span className="font-display text-xl font-black tracking-tighter text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
            Course Hub
          </span>
        </Link>

        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-x-2 text-sm font-medium text-slate-600">
            {NavbarLinks.map((link) => (
              <li key={link.title}>
                {link.title === "Catalog" ? (
                  <div
                    ref={catalogRef}
                    className="relative"
                    onMouseEnter={() => setCatalogOpen(true)}
                    onMouseLeave={() => setCatalogOpen(false)}
                  >
                    <button
                      type="button"
                      className={`nav-link ${isCatalogRoute ? "nav-link-active" : ""}`}
                      aria-haspopup="menu"
                      aria-expanded={catalogOpen}
                      aria-controls="catalog-menu"
                      onClick={() => setCatalogOpen((prev) => !prev)}
                    >
                      <span>{link.title}</span>
                      <BsChevronDown
                        className={`transition-transform duration-200 ${catalogOpen ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>

                    <div
                      id="catalog-menu"
                      role="menu"
                      className={`absolute left-1/2 top-full z-[1000] mt-3 flex w-[240px] -translate-x-1/2 flex-col rounded-3xl border border-slate-200/80 bg-white p-3 text-slate-900 shadow-soft transition-all duration-200 lg:w-[320px] ${
                        catalogOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="absolute left-1/2 top-0 -z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-slate-200/80 bg-white" />
                      {loading ? (
                        <p className="rounded-2xl px-4 py-3 text-center text-sm text-slate-500">
                          Loading categories...
                        </p>
                      ) : catalogItems.length ? (
                        catalogItems.map((subLink) => (
                          <Link
                            key={subLink._id}
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                            className="rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 hover:bg-slate-100"
                            role="menuitem"
                            onClick={() => setCatalogOpen(false)}
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="rounded-2xl px-4 py-3 text-center text-sm text-slate-500">
                          No courses found
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "nav-link-active" : ""}`
                    }
                  >
                    {link.title}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-x-3 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative" aria-label="Open cart">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition duration-300 hover:bg-slate-50">
                <AiOutlineShoppingCart className="text-2xl" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-blue-600 text-center text-xs font-bold text-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <>
              <Link to="/login">
                <button className="btn-secondary px-5 py-2.5 text-sm">Log in</button>
              </Link>
              <Link to="/signup">
                <button className="btn-primary px-5 py-2.5 text-sm">Sign up</button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <AiOutlineClose fontSize={22} /> : <AiOutlineMenu fontSize={22} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        id="mobile-menu"
        className={`mobile-drawer transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img src="/logo.png" alt="Course Hub" className="h-9 object-contain" />
            <span className="font-display text-lg font-black tracking-tight text-slate-900">
              Course Hub
            </span>
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <AiOutlineClose fontSize={20} />
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          <ul className="space-y-1 text-base font-semibold text-slate-700">
            {NavbarLinks.map((link) => (
              <li key={link.title}>
                {link.title === "Catalog" ? (
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-2">
                    <button
                      className="flex min-h-[44px] w-full items-center justify-between rounded-xl px-3 py-2 text-left"
                      onClick={() => setMobileCatalogOpen((prev) => !prev)}
                      aria-expanded={mobileCatalogOpen}
                    >
                      <span>{link.title}</span>
                      <BsChevronDown
                        className={`transition-transform duration-300 ${
                          mobileCatalogOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileCatalogOpen ? "max-h-[340px]" : "max-h-0"
                      }`}
                    >
                      <div className="mt-2 space-y-1 px-2 pb-2">
                        {loading ? (
                          <p className="px-2 py-1 text-sm text-slate-500">Loading categories...</p>
                        ) : catalogItems.length ? (
                          catalogItems.map((subLink) => (
                            <Link
                              key={subLink._id}
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="block min-h-[44px] rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subLink.name}
                            </Link>
                          ))
                        ) : (
                          <p className="px-2 py-1 text-sm text-slate-500">No courses found</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex min-h-[44px] items-center rounded-xl px-3 py-2 transition-colors ${
                        isActive ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.title}
                  </NavLink>
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
              className="btn-primary mt-1 inline-flex w-full"
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
