import { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/Common/ConfirmationModal"
import Footer from "../components/Common/Footer"
import RatingStars from "../components/Common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { BuyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"

function CourseDetails() {
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { courseId } = useParams()

  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    setIsActive(!isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e !== id))
  }

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner" />
      </div>
    )
  }

  if (!response.success) {
    return <Error />
  }

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnroled,
    createdAt,
  } = response.data?.courseDetails

  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to enroll in this course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <>
      <section className="page-shell w-full border-b border-slate-200">
        <div className="content-shell px-0">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] overflow-hidden rounded-2xl border border-slate-200 lg:hidden">
              <img src={thumbnail} alt="Course thumbnail" className="aspect-auto w-full" />
            </div>

            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-slate-900">
              <p className="section-kicker mb-0 w-fit">Course Details</p>
              <p className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[42px]">{courseName}</p>
              <p className="max-w-[700px] leading-relaxed text-slate-600">{courseDescription}</p>

              <div className="text-md flex flex-wrap items-center gap-2 font-medium">
                <span className="font-bold text-amber-600">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span className="text-slate-500">({ratingAndReviews.length} reviews)</span>
                <span className="text-slate-500">{studentsEnroled.length} students enrolled</span>
              </div>

              <p className="text-base font-semibold text-slate-700">
                Created by {`${instructor.firstName} ${instructor.lastName}`}
              </p>

              <div className="flex flex-wrap gap-5 text-sm font-semibold text-slate-500 sm:text-base">
                <p className="flex items-center gap-2">
                  <BiInfoCircle className="text-blue-600" /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt className="text-blue-600" /> English
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
              <p className="text-3xl font-extrabold text-slate-900">Rs. {price}</p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Enroll Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>

          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-full max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:w-1/3 lg:block">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </section>

      <section className="content-shell text-start text-slate-900">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <p className="text-3xl font-bold tracking-tight text-slate-900">What you will learn</p>
            <div className="prose prose-slate mt-5 max-w-none">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold text-slate-900">Course Content</p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2 text-sm font-semibold text-slate-500">
                  <span>{courseContent.length} section(s)</span>
                  <span>{totalNoOfLectures} lecture(s)</span>
                  <span>{response.data?.totalDuration} total length</span>
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                  onClick={() => setIsActive([])}
                >
                  Collapse all sections
                </button>
              </div>
            </div>

            <div className="space-y-3 py-4">
              {courseContent?.map((courseSection) => (
                <CourseAccordionBar
                  course={courseSection}
                  key={courseSection._id}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            <div className="mb-12 mt-8 border-t border-slate-200 py-4">
              <p className="text-[28px] font-bold text-slate-900">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-slate-100"
                />
                <p className="text-lg font-semibold text-slate-900">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="leading-relaxed text-slate-600">{instructor?.additionalDetails?.about}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails