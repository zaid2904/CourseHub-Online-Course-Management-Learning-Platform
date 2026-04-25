import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-slate-900/35 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-[380px] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        <p className="text-2xl font-bold tracking-tight text-slate-900">{modalData?.text1}</p>
        <p className="mb-8 mt-3 leading-6 font-medium text-slate-600">{modalData?.text2}</p>

        <div className="flex flex-col items-stretch gap-3 xsm:flex-row xsm:items-center">
          <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text} customClasses="w-full justify-center" />
          <button
            type="button"
            className="btn-secondary w-full justify-center"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}