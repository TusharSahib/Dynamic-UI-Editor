import React from "react";

const CartContext = React.createContext(null);
export const useCart = () => React.useContext(CartContext);

function hashOptions(opts) {
  // simple deterministic key based on options
  const json = JSON.stringify(opts);
  let h = 0;
  for (let i = 0; i < json.length; i++) {
    h = (h * 31 + json.charCodeAt(i)) >>> 0;
  }
  return h.toString(16);
}

const initial = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.payload || initial;
    case "ADD": {
      const key = hashOptions(action.item.options);
      const i = state.items.findIndex((it) => it.key === key);
      if (i >= 0) {
        const items = state.items.slice();
        items[i] = { ...items[i], qty: items[i].qty + action.item.qty };
        return { items };
      }
      return { items: [...state.items, { ...action.item, key }] };
    }
    case "QTY": {
      const items = state.items.map((it) =>
        it.key === action.key ? { ...it, qty: Math.max(1, action.qty) } : it
      );
      return { items };
    }
    case "REMOVE":
      return { items: state.items.filter((it) => it.key !== action.key) };
    case "CLEAR":
      return initial;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initial);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("cart-v2");
      if (raw) dispatch({ type: "HYDRATE", payload: JSON.parse(raw) });
    } catch {}
  }, []);
  React.useEffect(() => {
    try { localStorage.setItem("cart-v2", JSON.stringify(state)); } catch {}
  }, [state]);

  const api = {
    items: state.items,
    add(item) { dispatch({ type: "ADD", item }); },
    setQty(key, qty) { dispatch({ type: "QTY", key, qty }); },
    remove(key) { dispatch({ type: "REMOVE", key }); },
    clear() { dispatch({ type: "CLEAR" }); }
  };

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}
