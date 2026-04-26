import ContactUsForm from "./ContactUsForm"

const ContactForm = ({
  kicker = "Get in touch",
  title = "Got an idea? Let us build it together.",
  description = "Share your details and goals. We will respond with a clear next step.",
  className = "",
  align = "left",
}) => {
  const alignment = align === "center" ? "text-center" : "text-left"
  const formSpacing = align === "center" ? "mx-auto max-w-3xl" : ""

  return (
    <section className={`form-shell flex flex-col gap-3 text-slate-600 lg:p-12 ${className}`} aria-label="Contact form">
      <p className={`section-kicker mb-2 ${align === "center" ? "mx-auto" : ""}`}>{kicker}</p>
      <h2 className={`text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl ${alignment}`}>{title}</h2>
      <p className={`text-base font-medium leading-7 text-slate-500 sm:text-lg ${alignment}`}>{description}</p>

      <div className={`mt-6 ${formSpacing}`}>
        <ContactUsForm />
      </div>
    </section>
  )
}

export default ContactForm
