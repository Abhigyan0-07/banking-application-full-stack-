export function InputBox({ label, placeholder, onChange, value, type = "text", error, helperText }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg outline-none transition-colors ${error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-gray-400"}`}
      />
      {helperText ? (
        <div className="text-xs text-gray-500 mt-1 text-left">{helperText}</div>
      ) : null}
      {error ? (
        <div className="text-xs text-red-500 mt-1 text-left">{error}</div>
      ) : null}
    </div>
  );
}
