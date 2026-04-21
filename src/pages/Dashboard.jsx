import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-slate-50/50 p-4 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="dashboard-shell flex flex-col gap-6 lg:flex-row">
          <Sidebar />
          <main className="flex-1 min-w-0">
            <div className="mx-auto w-full max-w-[1000px] py-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
