import { useEffect } from "react";

export function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 w-[92%] max-w-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-5 animate-scale-in">
        {title ? <div className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">{title}</div> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}


