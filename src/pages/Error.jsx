import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function Error() {
  const navigate = useNavigate()

  return (
    <main className="page-shell flex flex-1 items-center justify-center px-4 py-10 text-slate-900">
      <section className="section-panel w-full max-w-[520px] p-8 text-center sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-black text-blue-600">
          404
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Page Not Found</h1>
        <p className="mt-3 text-base font-medium text-slate-500">
          The page you are looking for does not exist or has been moved.
        </p>

        <button className="btn-primary mt-8" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Go Back
        </button>
      </section>
    </main>
  )
}

export default Error