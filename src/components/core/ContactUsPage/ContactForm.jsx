import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="form-shell flex flex-col gap-3 text-slate-600 lg:p-12">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
        Got an idea? We&apos;ve got the skills. Let&apos;s team up.
      </h1>
      <p className="text-base font-medium text-slate-500 sm:text-lg">
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>

      <div className="mt-6">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
