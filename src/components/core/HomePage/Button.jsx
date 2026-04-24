import { Link } from "react-router-dom"

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`${
          active ? "btn-primary" : "btn-secondary"
        } min-w-fit sm:min-w-[150px] text-center text-sm sm:text-base`}
      >
        {children}
      </div>
    </Link>
  )
}

export default Button
