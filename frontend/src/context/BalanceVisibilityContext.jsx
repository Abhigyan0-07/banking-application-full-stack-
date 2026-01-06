import { createContext, useCallback, useContext, useEffect, useState } from "react";

const BalanceVisibilityContext = createContext({ visible: true, toggle: () => {} });

export function BalanceVisibilityProvider({ children }) {
  const [visible, setVisible] = useState(() => {
    const saved = localStorage.getItem("show_balance");
    return saved ? saved === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("show_balance", String(visible));
  }, [visible]);

  const toggle = useCallback(() => setVisible(v => !v), []);

  return (
    <BalanceVisibilityContext.Provider value={{ visible, toggle }}>
      {children}
    </BalanceVisibilityContext.Provider>
  );
}

export function useBalanceVisibility() {
  return useContext(BalanceVisibilityContext);
}


