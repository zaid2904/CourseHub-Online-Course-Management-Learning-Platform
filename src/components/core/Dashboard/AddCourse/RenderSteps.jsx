import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className="relative mb-4 flex w-full justify-between items-center px-4">
        {steps.map((item) => (
          <div key={item.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`grid aspect-square w-10 place-items-center rounded-full border-2 transition-all duration-300 ${
                  step === item.id
                    ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200"
                    : step > item.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-400"
                }`}
              >
                {step > item.id ? (
                  <FaCheck className="text-sm font-bold" />
                ) : (
                  <span className="text-sm font-bold">{item.id}</span>
                )}
              </div>
              <p
                className={`absolute -bottom-8 whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                  step >= item.id ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {item.title}
              </p>
            </div>
            {item.id !== steps.length && (
              <div
                className={`flex-1 border-b-2 border-dashed transition-colors duration-300 mx-2 ${
                  step > item.id ? "border-blue-600" : "border-slate-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-20"></div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
