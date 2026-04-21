import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"

function Error() {

  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center items-center flex-1 text-slate-900 text-3xl font-medium bg-slate-50">
      <div className="flex flex-col justify-center items-center gap-8 bg-white border border-slate-200 shadow-xl w-11/12 max-w-[500px] p-12 rounded-3xl">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
          <p className="text-xl font-bold text-slate-900">Page Not Found</p>
        </div>
        <p className="text-base text-slate-500 text-center font-medium">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          className="bg-blue-600 text-white py-3 px-8 rounded-full flex items-center gap-3 shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 font-bold text-base"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Error;