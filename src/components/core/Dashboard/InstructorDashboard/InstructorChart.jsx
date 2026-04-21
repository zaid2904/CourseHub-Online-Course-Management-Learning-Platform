import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

const palette = [
  "#22d3ee",
  "#3b82f6",
  "#8b5cf6",
  "#14b8a6",
  "#f59e0b",
  "#ec4899",
]

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  const backgroundColor = courses.map((_, index) => palette[index % palette.length])

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor,
        borderColor: "#020617",
        borderWidth: 4,
      },
    ],
  }

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor,
        borderColor: "#020617",
        borderWidth: 4,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#cbd5e1",
          padding: 18,
          usePointStyle: true,
        },
      },
    },
  }

  return (
    <div className="dashboard-card flex flex-col gap-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">
            Visualize
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            Enrollment and revenue mix
          </p>
        </div>
        <div className="flex gap-3 rounded-full border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setCurrChart("students")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
              currChart === "students"
                ? "bg-white text-slate-900"
                : "text-slate-300"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setCurrChart("income")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
              currChart === "income"
                ? "bg-white text-slate-900"
                : "text-slate-300"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      <div className="relative mx-auto aspect-square h-full min-h-[300px] w-full">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}
