import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-slate-200 bg-white text-slate-600 rounded-3xl p-7 lg:p-14 flex gap-3 flex-col shadow-sm">
      <h1 className="text-4xl leading-tight font-extrabold text-slate-900 tracking-tight">
        Got an idea? We&apos;ve got the skills. Let&apos;s team up.
      </h1>
      <p className="text-lg font-medium text-slate-500">
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
