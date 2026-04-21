import React, { useState } from "react"

import { HomePageExplore } from "../../../data/homepage-explore"
import CourseCard from "./CourseCard"
import HighlightText from "./HighlightText"

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
]

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0])
  const [courses, setCourses] = useState(HomePageExplore[0].courses)
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  )

  const setMyCards = (value) => {
    setCurrentTab(value)
    const result = HomePageExplore.filter((course) => course.tag === value)
    setCourses(result[0].courses)
    setCurrentCard(result[0].courses[0].heading)
  }

  return (
    <section className="relative w-full py-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="section-kicker">Learning Paths</div>
        <h2 className="font-display text-4xl font-bold text-slate-900 md:text-5xl tracking-tight">
          Unlock the <HighlightText text="Power of Code" />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 font-medium">
          Explore structured journeys that help beginners start quickly and help
          growing developers level up with confidence.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {tabsName.map((ele, index) => (
          <button
            className={`rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ${
              currentTab === ele
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
            }`}
            key={index}
            onClick={() => setMyCards(ele)}
          >
            {ele}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {courses.map((ele, index) => (
          <CourseCard
            key={index}
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </section>
  )
}

export default ExploreMore
