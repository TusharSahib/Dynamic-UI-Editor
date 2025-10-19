import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(() => {});

export function useToast() {
  return useContext(ToastContext) || ((msg) => alert(msg));
}

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const toast = useCallback((message, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    setItems((list) => [...list, { id, message, ...opts }]);
    const dur = opts.duration ?? 2200;
    setTimeout(
      () => setItems((list) => list.filter((i) => i.id !== id)),
      dur
    );
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-viewport" aria-live="polite" aria-atomic="true">
        {items.map((item) => (
          <div key={item.id} className="toast">
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
