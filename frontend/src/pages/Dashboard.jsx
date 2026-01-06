import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Appbar, Balance, Users, AccountCard, QuickActions, RecentTransactions, SpendingInsights } from "../components";
import { useTranslation } from "react-i18next";

export const Dashboard = () => {
  const { t } = useTranslation();
  const [bal, setBal] = useState(0);
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/signin");
    else axios.get(import.meta.env.VITE_SERVER_URL + "/api/v1/account/balance", { headers: { Authorization: "Bearer " + token } })
      .then(res => setBal(res.data.balance))
      .catch(() => navigate("/signin"));
  }, [navigate]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <Appbar />
      <div className="bg-gray-100 dark:bg-gray-900/60 border-b border-gray-200/60 dark:border-gray-800/60 animate-fade-in">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
          <div className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-1">Overview of your accounts and transfers</div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto p-4 md:p-8 grid gap-6">
        <div className="animate-scale-in"><AccountCard balance={bal} /></div>
        <QuickActions onSend={() => navigate('/send')} onAdd={() => navigate('/send')} onWithdraw={() => navigate('/send')} onStatements={() => setFaqOpen(true)} />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="animate-slide-up"><Users /></div>
            <div className="animate-slide-up bg-white dark:bg-gray-900 rounded-2xl p-4 shadow border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">FAQs</div>
                <button onClick={() => setFaqOpen(v => !v)} className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">{faqOpen ? 'Hide' : 'Show'}</button>
              </div>
              {faqOpen && (
                <div className="mt-3 divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    { q: 'How do I send money?', a: 'Go to Send and enter recipient and amount.' },
                    { q: 'How do I hide my balance?', a: 'Use the eye icon on balance card.' },
                    { q: 'Are my transactions secure?', a: 'We use industry-standard encryption and secure APIs.' },
                  ].map((f, i) => (
                    <details key={i} className="group py-3">
                      <summary className="cursor-pointer list-none text-sm text-gray-900 dark:text-gray-100 flex items-center justify-between">
                        <span>{f.q}</span>
                        <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">{f.a}</div>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className="animate-slide-up"><Balance value={bal} /></div>
            <div className="animate-slide-up"><RecentTransactions /></div>
            <div className="animate-slide-up"><SpendingInsights /></div>
          </div>
        </div>
      </div>
    </div>
  );
};
