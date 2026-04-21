export default function Tab({ tabData, field, setField }) {
  return (
    <div
      className="flex bg-slate-100 p-1 gap-x-1 my-6 rounded-full max-w-max border border-slate-200 shadow-inner"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "bg-blue-600 text-white shadow-md"
              : "bg-transparent text-slate-500 hover:text-slate-900"
          } py-2 px-6 rounded-full text-sm font-bold transition-all duration-200`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
