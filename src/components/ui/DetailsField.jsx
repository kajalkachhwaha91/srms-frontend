function DetailsField({ label, value, type = "text", className = "" }) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={value || ""}
        readOnly
        className={`bg-white border border-gray-300 rounded-[8px] px-4 py-3 outline-none ${className}`}
      />
    </div>
  );
}

export default DetailsField;
