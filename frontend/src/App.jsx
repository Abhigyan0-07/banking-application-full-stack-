import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { PaymentStatus } from "./pages/PaymentStatus.jsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Appbar } from "./components";

function App() {
  const { i18n } = useTranslation();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <BrowserRouter>
        {/* Floating premium theme + language switcher */}
        <div className="fixed right-4 bottom-4 z-30 flex flex-col items-end gap-2">
          <div className="glass rounded-full px-3 py-2 flex items-center gap-2 text-xs">
            <button className="text-gray-800 dark:text-gray-100" onClick={() => i18n.changeLanguage("en")}>EN</button>
            <span className="text-gray-400">·</span>
            <button className="text-gray-800 dark:text-gray-100" onClick={() => i18n.changeLanguage("hi")}>हिं</button>
            <span className="text-gray-400">·</span>
            <button className="text-gray-800 dark:text-gray-100" onClick={() => i18n.changeLanguage("kn")}>ಕನ್</button>
          </div>
          <button
            onClick={() => setIsDark(d => !d)}
            className="glass rounded-full h-11 w-11 flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-300"><path d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm7.07 3.93a1 1 0 0 1 0 1.41l-1.41 1.42a1 1 0 1 1-1.42-1.42l1.42-1.41a1 1 0 0 1 1.41 0ZM21 11a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h2ZM6.34 6.34a1 1 0 0 1 1.41 0l1.42 1.41A1 1 0 1 1 7.75 9.17L6.34 7.76a1 1 0 0 1 0-1.42ZM4 11a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h2Zm2.34 8.66a1 1 0 0 1 0-1.41l1.41-1.42a1 1 0 0 1 1.42 1.42L7.76 19.66a1 1 0 0 1-1.42 0ZM11 21a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2Zm8.66-2.34a1 1 0 0 1-1.41 0l-1.42-1.41a1 1 0 1 1 1.42-1.42l1.41 1.42a1 1 0 0 1 0 1.41Z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-200"><path d="M21.64 13a9 9 0 0 1-11.31-11.31A9 9 0 1 0 21.64 13Z"/></svg>
            )}
          </button>
        </div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/paymentstatus" element={<PaymentStatus />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
