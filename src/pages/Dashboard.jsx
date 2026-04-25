import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="page-shell relative min-h-[calc(100vh-5rem)] p-4 lg:p-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="dashboard-shell flex flex-col gap-6 p-4 lg:flex-row lg:p-6">
          <Sidebar />
          <main className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-[1000px] py-2 lg:py-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard