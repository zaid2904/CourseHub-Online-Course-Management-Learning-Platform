import ContactUsForm from "./ContactUsForm"

const ContactForm = () => {
  return (
    <section className="form-shell flex flex-col gap-3 text-slate-600 lg:p-12" aria-label="Contact form">
      <p className="section-kicker mb-2">Get in touch</p>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
        Got an idea? Let us build it together.
      </h1>
      <p className="text-base font-medium text-slate-500 sm:text-lg">
        Share your details and goals. We will respond with a clear next step.
      </p>

      <div className="mt-6">
        <ContactUsForm />
      </div>
    </section>
  )
}

export default ContactForm