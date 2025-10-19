import React from "react";
import { useCart } from "../cart/CartProvider.jsx";
import { formatCurrency, priceOfOptions } from "../utils/money.js";

export default function CartDrawer({ open, onClose }) {
  const cart = useCart();
  const subtotal = cart.items.reduce(
    (sum, it) => sum + it.price * it.qty,
    0
  );
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  return (
    <>
      {open && <div className="drawer-backdrop" onClick={onClose} />}
      <aside className={`drawer-panel ${open ? "open" : ""}`} aria-label="Cart">
        <header className="drawer-header">
          <h3 style={{ margin: 0 }}>Your Cart</h3>
          <button className="action" onClick={onClose} aria-label="Close">✕</button>
        </header>

        <div className="drawer-body">
          {cart.items.length === 0 ? (
            <p className="subtle">Your cart is empty.</p>
          ) : (
            cart.items.map((it) => (
              <div key={it.key} className="cart-item">
                <img
                  src={it.preview || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E"}
                  alt=""
                  width={72}
                  height={72}
                />
                <div className="cart-item-main">
                  <div className="cart-item-line">
                    <strong>{it.name}</strong>
                    <div>{formatCurrency(it.price)}</div>
                  </div>
                  <div className="subtle">
                    {it.options.material}, legs: {it.options.legsFinish}, arms: {it.options.armStyle}
                  </div>
                  <div className="qty-row">
                    <button onClick={() => cart.setQty(it.key, Math.max(1, it.qty - 1))}>−</button>
                    <input
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={(e) => cart.setQty(it.key, Math.max(1, +e.target.value || 1))}
                    />
                    <button onClick={() => cart.setQty(it.key, it.qty + 1)}>＋</button>
                    <button className="ghost" onClick={() => cart.remove(it.key)} style={{ marginLeft: "auto" }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="drawer-footer">
          <div className="cart-sum">
            <div><span className="subtle">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div><span className="subtle">Tax (8%)</span><span>{formatCurrency(tax)}</span></div>
            <div className="total"><strong>Total</strong><strong>{formatCurrency(total)}</strong></div>
          </div>
          <div className="cta-row" style={{ justifyContent: "space-between" }}>
            <button className="btn ghost" onClick={() => cart.clear()}>Clear</button>
            <button className="btn primary" onClick={() => alert("Checkout not implemented in demo")}>Checkout</button>
          </div>
        </footer>
      </aside>
    </>
  );
}
