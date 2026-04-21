import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-bold text-slate-700 ml-1" htmlFor={name}>
        {label} <sup className="text-pink-600">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-3">
        <input
          type="text"
          id={name}
          value={requirement}
          placeholder="e.g. Basic knowledge of JavaScript"
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-extrabold text-blue-600 hover:text-blue-700 transition-colors ml-1"
        >
          + Add Requirement
        </button>
      </div>
      {requirementsList.length > 0 && (
        <ul className="mt-4 space-y-2">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2 border border-slate-100 group">
              <span className="text-sm font-medium text-slate-700">{requirement}</span>
              <button
                type="button"
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => handleRemoveRequirement(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs font-bold text-pink-600">
          {label} is required
        </span>
      )}
    </div>
  )
}
