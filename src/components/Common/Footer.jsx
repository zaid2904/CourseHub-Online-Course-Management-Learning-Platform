import { Link } from "react-router-dom"
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa"

import { FooterLink2 } from "../../data/footer-links"

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
]
const Plans = ["Paid memberships", "For students", "Business solutions"]
const Community = ["Forums", "Chapters", "Events"]

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="content-shell py-14">
        <div className="grid gap-10 border-b border-slate-200 pb-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Link to="/" className="group mb-4 flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Course Hub"
                  className="h-10 object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="font-display text-lg font-black tracking-tighter text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                  Course Hub
                </span>
              </Link>

              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Company</h2>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {["About", "Careers", "Affiliates"].map((label) => (
                  <Link
                    key={label}
                    to={`/${label.toLowerCase()}`}
                    className="block transition-colors duration-200 hover:text-blue-600"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex gap-3 text-lg text-slate-400">
                <FaFacebook className="cursor-pointer transition-colors hover:text-blue-600" />
                <FaGoogle className="cursor-pointer transition-colors hover:text-red-500" />
                <FaTwitter className="cursor-pointer transition-colors hover:text-sky-500" />
                <FaYoutube className="cursor-pointer transition-colors hover:text-red-600" />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Resources</h2>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {Resources.map((label) => (
                  <Link
                    key={label}
                    to={`/${label.split(" ").join("-").toLowerCase()}`}
                    className="block transition-colors duration-200 hover:text-blue-600"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <h2 className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-slate-900">Support</h2>
              <Link
                to="/help-center"
                className="mt-3 block text-sm text-slate-600 transition-colors duration-200 hover:text-blue-600"
              >
                Help Center
              </Link>
            </div>

            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Plans</h2>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {Plans.map((label) => (
                  <Link
                    key={label}
                    to={`/${label.split(" ").join("-").toLowerCase()}`}
                    className="block transition-colors duration-200 hover:text-blue-600"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <h2 className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-slate-900">Community</h2>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {Community.map((label) => (
                  <Link
                    key={label}
                    to={`/${label.split(" ").join("-").toLowerCase()}`}
                    className="block transition-colors duration-200 hover:text-blue-600"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FooterLink2.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">
                  {group.title}
                </h2>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  {group.links.map((link) => (
                    <Link
                      key={`${group.title}-${link.title}`}
                      to={link.link}
                      className="block transition-colors duration-200 hover:text-blue-600"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-4 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {BottomFooter.map((label, index) => (
              <div key={label} className="flex items-center">
                <Link
                  to={`/${label.split(" ").join("-").toLowerCase()}`}
                  className="transition-colors duration-200 hover:text-blue-600"
                >
                  {label}
                </Link>
                {index < BottomFooter.length - 1 && <span className="mx-2 text-slate-300">|</span>}
              </div>
            ))}
          </div>

          <p className="font-medium text-slate-500">Developed by Zaid Siddiqui</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer