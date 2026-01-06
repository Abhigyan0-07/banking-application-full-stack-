export function Button({ label, onClick, disabled, loading, variant = "primary" }) {
  const base = "w-full font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none transition-colors";
  const variants = {
    primary: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300",
    secondary: "text-gray-800 bg-white border border-gray-300 hover:bg-gray-50",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300",
  };
  const state = disabled || loading ? "opacity-60 cursor-not-allowed hover:none" : "";

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled || loading}
      className={`${base} ${variants[variant] || variants.primary} ${state}`}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
