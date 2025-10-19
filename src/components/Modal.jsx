import React, { useEffect } from "react";

export default function Modal({ open, onClose, title, children, actions }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Dialog"}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="modal-card">
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        <div className="modal-body">{children}</div>
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  );
}
