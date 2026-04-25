import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Footer from "../components/Common/Footer"
import CourseCard from "../components/core/Catalog/Course_Card"
import CourseSlider from "../components/core/Catalog/Course_Slider"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
import Error from "./Error"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()

  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const categoryId = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id
        setCategoryId(categoryId)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])

  useEffect(() => {
    if (!categoryId) return

    ;(async () => {
      try {
        const res = await getCatalogPageData(categoryId)
        setCatalogPageData(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner" />
      </div>
    )
  }

  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <div className="page-shell">
      <section className="border-b border-slate-200 bg-white/60 px-4 backdrop-blur-sm">
        <div className="mx-auto flex min-h-[260px] max-w-maxContent flex-col justify-center gap-4">
          <p className="text-sm font-medium text-slate-500">
            Home / Catalog / {" "}
            <span className="font-semibold text-blue-600">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="font-display text-4xl font-bold tracking-tight text-slate-900">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] leading-relaxed text-slate-600">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </section>

      <section className="content-shell py-12">
        <div className="section_heading">Courses to get you started</div>

        <div className="my-5 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            className={`min-h-[40px] rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === 1 ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </button>
          <button
            type="button"
            className={`min-h-[40px] rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === 2 ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </button>
        </div>

        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
      </section>

      <section className="content-shell py-12">
        <div className="section_heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
        </div>
      </section>

      <section className="content-shell py-12">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course) => (
              <CourseCard course={course} key={course._id} Height="h-[400px]" />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Catalog
