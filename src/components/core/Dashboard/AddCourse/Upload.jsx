import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  const previewFile = (file) => {
    // console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-3">
      <label className="text-sm font-bold text-slate-700 ml-1" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-600">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-blue-50 border-blue-400" : "bg-slate-50 border-slate-300"
        } relative flex min-h-[280px] cursor-pointer items-center justify-center rounded-[24px] border-2 border-dashed transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/30 group overflow-hidden`}
        {...getRootProps({
          onDragOver: (e) => e.preventDefault(),
          onDrop: (e) => {
            e.preventDefault();
            console.log("File dropped");
          },
        })}
      >
        <input
          {...getInputProps({
            onChange: (e) => {
              const file = e.target.files[0];
              if (file) {
                console.log("File selected via input:", file.name);
                previewFile(file);
                setSelectedFile(file);
              }
            }
          })}
          id={name}
          ref={inputRef}
        />
        {previewSource ? (
          <div className="flex w-full flex-col p-6" onClick={(e) => e.stopPropagation()}>
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-2xl object-cover shadow-sm"
              />
            ) : (
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-video bg-black flex items-center justify-center">
                <Player aspectRatio="16:9" playsInline src={previewSource} />
              </div>
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-4 text-sm font-bold text-slate-500 hover:text-red-500 transition-colors underline underline-offset-4"
              >
                Remove and try again
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-10 select-none">
            <div className="grid aspect-square w-20 place-items-center rounded-3xl bg-blue-50 text-blue-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blue-100">
              <FiUploadCloud className="text-4xl" />
            </div>
            <p className="mt-6 max-w-[250px] text-center text-base font-bold text-slate-700 leading-snug">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <label 
                htmlFor={name} 
                className="font-black text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                Browse
              </label>
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <ul className="flex list-disc justify-center space-x-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
                <li>16:9 Aspect</li>
                <li>Max 10MB</li>
              </ul>
              <p className="text-[10px] font-bold text-slate-300">Supported: {video ? "MP4" : "JPG, PNG"}</p>
            </div>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs font-bold text-pink-600">
          {label} is required
        </span>
      )}
    </div>
  )
}
