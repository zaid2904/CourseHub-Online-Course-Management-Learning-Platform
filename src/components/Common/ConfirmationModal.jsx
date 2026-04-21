import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-slate-900/20 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
        <p className="text-2xl font-bold text-slate-900 tracking-tight">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-8 leading-6 text-slate-600 font-medium">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-full bg-slate-100 py-[10px] px-[24px] font-semibold text-slate-700 hover:bg-slate-200 transition-all duration-200"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
