import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@coursehub.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="section-panel flex flex-col gap-5 p-6 lg:p-8">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="group flex flex-col gap-1 rounded-2xl border border-transparent p-4 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50"
            key={i}
          >
            <div className="flex flex-row items-center gap-4">
              <div className="text-blue-600 transition-transform duration-300 group-hover:scale-105">
                <Icon size={28} />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {ele?.heading}
              </h1>
            </div>
            <p className="font-medium text-slate-500 ml-11">{ele?.description}</p>
            <p className="font-bold text-slate-900 ml-11 mt-1">{ele?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails
