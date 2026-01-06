import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Modal } from "../components";

export const SendMoney = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [transactionPin, setTransactionPin] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();
  const isValid = useMemo(() => Number(amount) > 0 && transactionPin.length === 6, [amount, transactionPin]);
  const isTimeout = timeLeft === 0;

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/signin");
  }, [navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-950 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 w-96 animate-scale-in">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-center">{t("sendMoney")}</h2>
            <div className={`text-sm font-mono ${timeLeft < 5 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                {timeLeft}s
            </div>
        </div>
        
        <div className="flex items-center space-x-4 my-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl">
            {name?.[0]?.toUpperCase()}
          </div>
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        
        {isTimeout && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">Transaction timed out. Please retry.</span>
            </div>
        )}

        <label className="text-sm text-gray-700">{t("amountLabel")}</label>
        <input 
            type="number" 
            disabled={isTimeout}
            className="border rounded-lg p-2 w-full mb-4 focus:outline-none focus:border-gray-400 disabled:opacity-50" 
            placeholder={t("enterAmount")} 
            onChange={e => setAmount(e.target.value)} 
        />
        
        <label className="text-sm text-gray-700">Transaction PIN</label>
        <input 
            type="password" 
            disabled={isTimeout}
            className="border rounded-lg p-2 w-full mb-4 focus:outline-none focus:border-gray-400 disabled:opacity-50" 
            placeholder="123456" 
            onChange={e => setTransactionPin(e.target.value)} 
            maxLength={6} 
        />
        
        <div className="flex gap-2">
            {!isTimeout ? (
                <button className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white w-full py-2 rounded-lg" disabled={!isValid} onClick={async () => {
                    try {
                    const res = await axios.post(import.meta.env.VITE_SERVER_URL + "/api/v1/account/transfer", 
                        { to: id, amount, transactionPin }, 
                        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
                    );
                    navigate("/paymentstatus?message=" + res?.data.message);
                    } catch (e) {
                    setError(e?.response?.data?.message || "Transaction failed");
                    setOpen(true);
                    }
                }}>{t("initiateTransfer")}</button>
            ) : (
                <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg" onClick={() => setTimeLeft(10)}>
                    Retry Transaction
                </button>
            )}
            
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-full py-2 rounded-lg" onClick={() => navigate("/dashboard")}>{t("cancel")}</button>
        </div>

      </div>
      <Modal open={open} title={"Transaction Failed"} onClose={() => setOpen(false)}>
        <div className="text-sm text-gray-700 dark:text-gray-300">{error}</div>
      </Modal>
    </div>
  );
};
