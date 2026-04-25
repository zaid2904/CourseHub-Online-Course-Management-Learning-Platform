export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type = "button",
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`${outline ? "btn-secondary" : "btn-primary"} ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}