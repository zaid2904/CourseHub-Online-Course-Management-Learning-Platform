import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import ContactDetails from "../components/core/ContactUsPage/ContactDetails"
import ContactForm from "../components/core/ContactUsPage/ContactForm"

const Contact = () => {
  return (
    <div className="page-shell">
      <section className="content-shell pt-14 text-slate-900 sm:pt-20">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="section-kicker mb-3">Contact Us</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Let us build something meaningful together
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
            Share your questions, ideas, or collaboration goals. Our team will
            respond with the right next steps.
          </p>
        </div>
      </section>

      <section className="content-shell flex flex-col justify-between gap-8 pb-8 text-slate-900 lg:flex-row lg:gap-10">
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </section>

      <section className="content-shell relative my-20 flex flex-col items-center justify-between gap-8 text-slate-900">
        <h2 className="mt-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Reviews from other learners
        </h2>
        <ReviewSlider />
      </section>

      <Footer />
    </div>
  )
}

export default Contact