import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../Common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = async () => {
    if (!imageFile) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      await dispatch(updateDisplayPicture(token, formData))
      setImageFile(null)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-x-4 sm:gap-x-6">
          <img
            src={previewSource || user?.image}
            alt={`${user?.firstName} profile`}
            className="aspect-square w-20 rounded-full object-cover ring-4 ring-slate-50 shadow-sm"
          />
          <div className="space-y-2">
            <p className="text-lg font-bold tracking-tight text-slate-900">Change profile picture</p>
            <p className="text-sm font-medium text-slate-500">
              Upload a square image for the best result. PNG or JPG up to 2MB.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/gif, image/jpeg"
          />
          <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className="btn-secondary px-5"
          >
            Select Image
          </button>
          <IconBtn
            text={loading ? "Uploading..." : "Upload"}
            onclick={handleFileUpload}
            disabled={loading || !imageFile}
          >
            {!loading && <FiUpload className="text-lg" />}
          </IconBtn>
        </div>
      </div>
    </div>
  )
}