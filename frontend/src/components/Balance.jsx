import { useTranslation } from "react-i18next";
import { useBalanceVisibility } from "../context/BalanceVisibilityContext.jsx";

export const Balance = ({ value }) => {
  const { t } = useTranslation();
  const { visible, toggle } = useBalanceVisibility();
  const formatted = new Intl.NumberFormat(undefined, { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value || 0));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-gray-800 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">{t("yourBalance")}</div>
        <button onClick={toggle} aria-label="Toggle balance visibility" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          {visible ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 5c-5 0-9 4.5-9 7s4 7 9 7 9-4.5 9-7-4-7-9-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.28 2.22 2.22 3.28l3.18 3.19C3.9 8.1 2.37 9.82 1.5 12c1.2 3.02 5 7 10.5 7 2.1 0 3.94-.57 5.5-1.47l3.22 3.25 1.06-1.06-18.5-17.5ZM12 17c-3.86 0-7-3.14-7-5 0-1 .8-2.3 2.12-3.46l1.7 1.7A5 5 0 0 0 12 17Zm0-10c3.86 0 7 3.14 7 5 0 .62-.37 1.5-1.03 2.36l-2.22-2.2A5 5 0 0 0 9.85 6.26C10.5 6.1 11.23 6 12 6Z"/></svg>
          )}
        </button>
      </div>
      <div className="text-3xl font-bold mt-1 text-gray-900 dark:text-gray-100">{visible ? formatted : "••••••"}</div>
    </div>
  );
};
