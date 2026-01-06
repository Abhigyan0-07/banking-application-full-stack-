import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const PaymentStatus = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  const navigate = useNavigate();
  const isSuccess = useMemo(() => /success|completed|done/i.test(message || ''), [message]);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/signin");
    const t = setTimeout(() => navigate("/dashboard"), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative flex justify-center items-center w-screen h-screen bg-gray-50 dark:bg-gray-950 animate-fade-in">
      {/* Confetti/Tick for success */}
      {isSuccess && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-10 -translate-x-1/2 bg-green-500/20 rounded-full blur-2xl w-72 h-72" />
        </div>
      )}
      <div className={`bg-white dark:bg-gray-900 md:w-1/3 text-center py-10 px-6 m-4 rounded-2xl shadow-xl border animate-scale-in ${isSuccess ? 'border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400' : 'border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400'}`}>
        <div className="mx-auto mb-3 w-14 h-14 rounded-full flex items-center justify-center" style={{ background: isSuccess ? 'linear-gradient(135deg,#22c55e33,#16a34a33)' : 'linear-gradient(135deg,#ef444433,#dc262633)' }}>
          {isSuccess ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd" d="M10.28 15.22a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l2.47 2.47 5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6Z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm-1.5 6.75a1.5 1.5 0 1 1 3 0v3a1.5 1.5 0 1 1-3 0v-3Zm1.5 8.25a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="text-3xl font-bold">{message}</div>
        <div className="text-gray-700 dark:text-gray-300 text-sm font-medium py-4">{t("secureTransfer")}</div>
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">Redirecting to Dashboard in 3 seconds.</div>
      </div>
    </div>
  );
};
