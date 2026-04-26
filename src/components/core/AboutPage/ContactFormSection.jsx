import ContactForm from "../ContactUsPage/ContactForm"

const ContactFormSection = () => {
  return (
    <section className="relative py-6 sm:py-10" aria-label="About contact section">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-10 h-44 w-44 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute bottom-2 right-[10%] h-44 w-44 rounded-full bg-cyan-100/70 blur-3xl" />
      </div>

      <ContactForm
        align="center"
        className="mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-12"
        kicker="Get in touch"
        title="We\u2019d love to hear from you"
        description="Have a question, feedback, or partnership idea? Fill out the form below and our team will get back to you soon."
      />
    </section>
  )
}

export default ContactFormSection
