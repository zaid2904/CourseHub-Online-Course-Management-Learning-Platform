import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat with us",
    description: "Our friendly team is here to help.",
    details: "info@coursehub.com",
    href: "mailto:info@coursehub.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Akshya Nagar 1st Block 1st Cross, Rammurthy Nagar, Bangalore-560016",
    href: null,
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri from 8am to 5pm",
    details: "+123 456 7869",
    href: "tel:+1234567869",
  },
]

const ContactDetails = () => {
  return (
    <div className="section-panel flex flex-col gap-5 p-6 lg:p-8">
      {contactDetails.map((item) => {
        const Icon = Icon1[item.icon] || Icon2[item.icon] || Icon3[item.icon]

        return (
          <article
            className="group rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white"
            key={item.heading}
          >
            <div className="flex flex-row items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-105">
                <Icon size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900">{item.heading}</h2>
                <p className="text-sm font-medium text-slate-500">{item.description}</p>
              </div>
            </div>

            {item.href ? (
              <a
                href={item.href}
                className="mt-3 block break-words pl-16 text-sm font-semibold text-slate-700 transition-colors hover:text-blue-600"
              >
                {item.details}
              </a>
            ) : (
              <p className="mt-3 break-words pl-16 text-sm font-semibold text-slate-700">{item.details}</p>
            )}
          </article>
        )
      })}
    </div>
  )
}

export default ContactDetails