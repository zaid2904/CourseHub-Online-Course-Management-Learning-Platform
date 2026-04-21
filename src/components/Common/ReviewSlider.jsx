import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  // console.log(reviews)

  return (
    <div className="w-full">
      <div className="my-[20px] w-full max-w-maxContentTab lg:max-w-maxContent pb-10">
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full !pb-10"
          pagination={{ clickable: true, dynamicBullets: true }}
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i} className="h-auto">
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:bg-white/90 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative h-12 w-12 shrink-0">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-300 to-purple-300 opacity-50 blur-sm group-hover:opacity-100 transition-opacity"></div>
                        <img
                          src={
                            review?.user?.image
                              ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                          }
                          alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                          className="relative h-full w-full rounded-full border-[1.5px] border-white object-cover object-center shadow-sm bg-slate-100 aspect-square"
                          onError={(e) => {
                            e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-[15px] font-bold text-slate-900 leading-tight">
                          {`${review?.user?.firstName} ${review?.user?.lastName}`}
                        </h1>
                        <h2 className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                          {review?.course?.courseName}
                        </h2>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-yellow-50/50 px-2 py-1 rounded-md border border-yellow-100/50">
                        <h3 className="text-[13px] font-bold text-yellow-600 pt-0.5">
                          {review.rating.toFixed(1)}
                        </h3>
                        <ReactStars
                          count={5}
                          value={review.rating}
                          size={16}
                          edit={false}
                          activeColor="#eab308"
                          emptyIcon={<FaStar className="text-slate-200" />}
                          fullIcon={<FaStar />}
                        />
                      </div>
                    </div>

                    <p className="text-[14px] leading-relaxed text-slate-600 font-medium line-clamp-4">
                      "{review?.review}"
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
