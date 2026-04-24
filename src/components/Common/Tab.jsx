export default function Tab({ tabData, field, setField }) {
  return (
    <div
      className="my-6 flex max-w-max gap-x-1 rounded-full border border-slate-200 bg-slate-100/90 p-1 shadow-inner"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          aria-pressed={field === tab.type}
          className={`${
            field === tab.type
              ? "bg-white text-slate-900 shadow-md"
              : "bg-transparent text-slate-500 hover:text-slate-900"
          } min-h-[40px] rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 sm:px-6`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
