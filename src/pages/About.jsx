import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"

const About = () => {
  return (
    <div className="page-shell">
      <section className="border-b border-slate-200 bg-white/70 pb-20">
        <div className="content-shell relative flex flex-col justify-between gap-10 text-center text-slate-900">
          <header className="mx-auto py-14 sm:py-20 lg:w-[70%]">
            <p className="section-kicker mx-auto w-fit">About Us</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Driving Innovation in Online Education for a <HighlightText text="Brighter Future" />
            </h1>
            <p className="mx-auto mt-4 text-base font-medium text-slate-600 lg:w-[95%]">
              StudyNotion is at the forefront of innovation in online education. We are passionate
              about creating better learning outcomes through modern courses, emerging technologies,
              and a vibrant learning community.
            </p>
          </header>

          <div className="absolute bottom-0 left-1/2 grid w-full -translate-x-1/2 translate-y-1/3 grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="About banner 1" className="h-full w-full rounded-xl object-cover" />
            <img src={BannerImage2} alt="About banner 2" className="h-full w-full rounded-xl object-cover" />
            <img src={BannerImage3} alt="About banner 3" className="h-full w-full rounded-xl object-cover" />
          </div>
          <div className="h-[70px] sm:h-[90px] lg:h-[130px]" />
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="content-shell flex flex-col gap-10 text-slate-600">
          <div className="h-[100px]" />
          <Quote />
        </div>
      </section>

      <section className="bg-white">
        <div className="content-shell flex flex-col gap-10 text-slate-600">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
            <div className="my-20 flex flex-col gap-6 lg:w-[52%]">
              <h2 className="font-display text-4xl font-bold text-slate-900">Our Founding Story</h2>
              <p className="text-base font-medium text-slate-600">
                Our e-learning platform was born out of a shared vision and passion for transforming
                education. A group of educators, technologists, and lifelong learners recognized the
                need for accessible, flexible, and high-quality learning opportunities.
              </p>
              <p className="text-base font-medium text-slate-600">
                We believed that education should not be confined by geography or classroom walls.
                That vision shaped a platform that empowers people everywhere to unlock their
                potential.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <img
                src={FoundingStory}
                alt="Founding story"
                className="w-full max-w-[560px] rounded-3xl border border-slate-200 shadow-soft"
              />
            </div>
          </div>

          <div className="mb-20 grid gap-6 lg:grid-cols-2">
            <article className="section-panel p-8">
              <h3 className="font-display text-3xl font-bold text-slate-900">Our Vision</h3>
              <p className="mt-4 text-base font-medium text-slate-600">
                We are building a learning platform that makes quality education intuitive and
                outcome-driven. Our goal is to blend modern technology with engaging pedagogy so
                every learner can move forward with confidence.
              </p>
            </article>

            <article className="section-panel p-8">
              <h3 className="font-display text-3xl font-bold text-slate-900">Our Mission</h3>
              <p className="mt-4 text-base font-medium text-slate-600">
                Beyond online courses, we are creating a vibrant learner community where people
                connect, collaborate, and grow together through shared projects, live sessions, and
                meaningful discussion.
              </p>
            </article>
          </div>
        </div>
      </section>

      <StatsComponenet />

      <section className="content-shell mt-20 flex flex-col gap-10 text-slate-900">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <section className="relative mx-auto my-20 flex w-full flex-col items-center justify-between gap-8 overflow-hidden bg-slate-50 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-blue-200/40 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-200/40 blur-[120px]" />
          <div className="absolute left-1/2 top-[20%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-100/40 blur-[100px]" />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
        </div>

        <div className="content-shell relative z-10 flex flex-col items-center">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-slate-900">
            Reviews from other learners
          </h2>
          <div className="w-full">
            <ReviewSlider />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About