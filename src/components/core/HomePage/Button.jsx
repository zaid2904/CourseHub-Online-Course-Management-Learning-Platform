import { Link } from "react-router-dom"

const Button = ({ children, active, linkto }) => {
  return (
    <Link
      to={linkto}
      className={`${active ? "btn-primary" : "btn-secondary"} min-w-fit text-center text-sm sm:min-w-[150px] sm:text-base`}
    >
      {children}
    </Link>
  )
}

export default Button