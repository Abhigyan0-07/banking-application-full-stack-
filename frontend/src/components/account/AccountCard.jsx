import { useEffect, useMemo, useState } from "react";
import { Button } from "../Button";
import { Modal } from "../common/Modal";
import { useTranslation } from "react-i18next";
import { useBalanceVisibility } from "../../context/BalanceVisibilityContext.jsx";
import { useNavigate } from "react-router-dom";

function generateAccountNumber() {
  const existing = localStorage.getItem("account_number");
  if (existing) return existing;
  const rand = Math.floor(1_0000_0000 + Math.random() * 9_0000_0000).toString();
  const formatted = `**** ${rand.slice(0, 4)} ${rand.slice(4, 8)} ${rand.slice(8)}`;
  localStorage.setItem("account_number", formatted);
  return formatted;
}

export function AccountCard({ balance }) {
  const { t } = useTranslation();
  const { visible, toggle } = useBalanceVisibility();
  const [open, setOpen] = useState(false);
  const accountNumber = useMemo(() => generateAccountNumber(), []);
  const navigate = useNavigate();

  // Visibility now managed globally via context

  return (
    <>
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-gray-800 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Savings Account</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{accountNumber}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm">
            {visible ? 'Hide' : 'View'}
          </button>
          <Button
            variant="secondary"
            label="Details"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">{t("yourBalance")}</div>
        <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {visible ? new Intl.NumberFormat(undefined, { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(balance || 0)) : "••••••"}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-2" onClick={() => navigate('/send')}>Add Money</button>
        <button className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-2" onClick={() => navigate('/send')}>Send</button>
        <button className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-2" onClick={() => navigate('/send')}>Withdraw</button>
        <button className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg py-2" onClick={() => alert('Statements coming soon')}>Statements</button>
      </div>
    </div>
    <Modal open={open} title="Account Details" onClose={() => setOpen(false)}>
      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
        <div className="flex justify-between"><span>Account</span><span>{accountNumber}</span></div>
        <div className="flex justify-between"><span>Type</span><span>Savings</span></div>
        <div className="flex justify-between"><span>IFSC</span><span>HORIZ0001234</span></div>
        <div className="flex justify-between"><span>Status</span><span>Active</span></div>
      </div>
    </Modal>
    </>
  );
}


