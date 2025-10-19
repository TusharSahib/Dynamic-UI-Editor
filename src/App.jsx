import React, { useEffect, useRef, useState } from "react";
import ProductShowcase from "./components/ProductShowcase.jsx";
import EditorPanel from "./components/EditorPanel.jsx";
import { defaultConfig } from "./config.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { ToastProvider, useToast } from "./components/Toast.jsx";
import Modal from "./components/Modal.jsx";
import { CartProvider, useCart } from "./cart/CartProvider.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

function validateConfig(raw) {
  const clamp = (n, min, max) => Math.min(max, Math.max(min, Number(n) || 0));
  const safe = JSON.parse(JSON.stringify(defaultConfig));
  if (raw?.typography) {
    safe.typography.family = String(raw.typography.family || safe.typography.family);
    safe.typography.weight = clamp(raw.typography.weight ?? safe.typography.weight, 100, 900);
    safe.typography.size = clamp(raw.typography.size ?? safe.typography.size, 10, 60);
    safe.typography.unit = raw.typography.unit === "rem" ? "rem" : "px";
  }
  if (raw?.button) {
    safe.button.radius = clamp(raw.button.radius ?? safe.button.radius, 0, 32);
    safe.button.shadow = ["none", "small", "medium", "large"].includes(raw.button.shadow)
      ? raw.button.shadow
      : safe.button.shadow;
    safe.button.align = ["left", "center", "right"].includes(raw.button.align)
      ? raw.button.align
      : safe.button.align;
    safe.button.bg = raw.button.bg || safe.button.bg;
    safe.button.color = raw.button.color || safe.button.color;
    safe.button.autoContrast = Boolean(raw.button.autoContrast ?? safe.button.autoContrast);
  }
  if (raw?.gallery) {
    safe.gallery.align = ["left", "center", "right"].includes(raw.gallery.align)
      ? raw.gallery.align
      : safe.gallery.align;
    safe.gallery.gap = clamp(raw.gallery.gap ?? safe.gallery.gap, 0, 40);
    safe.gallery.radius = clamp(raw.gallery.radius ?? safe.gallery.radius, 0, 32);
  }
  if (raw?.layout) {
    safe.layout.cardRadius = clamp(raw.layout.cardRadius ?? safe.layout.cardRadius, 0, 32);
    safe.layout.containerPadding = clamp(
      raw.layout.containerPadding ?? safe.layout.containerPadding,
      0,
      64
    );
    safe.layout.sectionBg = raw.layout.sectionBg || safe.layout.sectionBg;
    safe.layout.variant = ["split", "stacked"].includes(raw.layout.variant)
      ? raw.layout.variant
      : safe.layout.variant;
    safe.layout.dark = Boolean(raw.layout.dark ?? safe.layout.dark);
  }
  if (raw?.stroke) {
    safe.stroke.color = raw.stroke.color || safe.stroke.color;
    safe.stroke.weight = clamp(raw.stroke.weight ?? safe.stroke.weight, 0, 6);
  }
  return safe;
}

function Shell() {
  const toast = useToast();
  const [config, setConfig] = useLocalStorage("ui-config", defaultConfig);
  const fileInputRef = useRef(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // History (undo/redo)
  const historyRef = useRef({ past: [], future: [] });
  const canUndo = historyRef.current.past.length > 0;
  const canRedo = historyRef.current.future.length > 0;

  // cart
  const cart = useCart();

  useEffect(() => {
    document.body.classList.toggle("theme-dark", Boolean(config.layout.dark));
  }, [config.layout.dark]);

  useEffect(() => {
    try {
      if (location.hash?.startsWith("#cfg=")) {
        const encoded = location.hash.slice(5);
        const parsed = JSON.parse(decodeURIComponent(atob(encoded)));
        const safe = validateConfig(parsed);
        setConfig(safe);
        toast("Loaded config from URL");
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const encoded = btoa(encodeURIComponent(JSON.stringify(config)));
        if (location.hash !== `#cfg=${encoded}`) {
          history.replaceState(null, "", `#cfg=${encoded}`);
        }
      } catch {}
    }, 300);
    return () => clearTimeout(id);
  }, [config]);

  const changeConfig = (updater) => {
    setConfig((prev) => {
      const prevSnapshot = JSON.parse(JSON.stringify(prev));
      const next =
        typeof updater === "function"
          ? updater(JSON.parse(JSON.stringify(prev)))
          : updater;
      historyRef.current.past.push(prevSnapshot);
      if (historyRef.current.past.length > 50) historyRef.current.past.shift();
      historyRef.current.future = [];
      return next;
    });
  };

  const undo = () => {
    if (!historyRef.current.past.length) return;
    setConfig((current) => {
      const previous = historyRef.current.past.pop();
      historyRef.current.future.push(current);
      toast("Undid change");
      return previous;
    });
  };
  const redo = () => {
    if (!historyRef.current.future.length) return;
    setConfig((current) => {
      const next = historyRef.current.future.pop();
      historyRef.current.past.push(current);
      toast("Redid change");
      return next;
    });
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "ui-config.json"; a.click();
    URL.revokeObjectURL(url);
    toast("Exported ui-config.json");
  };
  const importJson = () => fileInputRef.current?.click();
  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text(); importFromText(text);
    } finally { e.target.value = ""; }
  };
  const importFromText = (text) => {
    try { const parsed = JSON.parse(text); changeConfig(validateConfig(parsed)); toast("Imported configuration"); }
    catch { toast("Invalid JSON", { duration: 2600 }); }
  };

  const resetConfig = () => setConfirmResetOpen(true);
  const confirmReset = () => { setConfirmResetOpen(false); changeConfig(defaultConfig); toast("Reset to defaults"); };

  const copyShareUrl = async () => {
    try { await navigator.clipboard.writeText(location.href); toast("Share URL copied"); }
    catch { toast("Could not copy URL"); }
  };
  const copyCssVars = async () => {
    const c = config;
    const css = `:root{
  --ff:${c.typography.family};
  --fw:${c.typography.weight};
  --fs:${c.typography.size}${c.typography.unit};
  --btn-radius:${c.button.radius}px;
  --btn-shadow:${c.button.shadow};
  --btn-bg:${c.button.bg};
  --btn-color:${c.button.color};
  --gallery-gap:${c.gallery.gap}px;
  --gallery-radius:${c.gallery.radius}px;
  --card-radius:${c.layout.cardRadius}px;
  --container-padding:${c.layout.containerPadding}px;
  --section-bg:${c.layout.sectionBg};
  --stroke-color:${c.stroke.color};
  --stroke-weight:${c.stroke.weight}px;
}`;
    try { await navigator.clipboard.writeText(css); toast("CSS variables copied"); }
    catch { toast("Copy failed"); }
  };

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const isMac = /Mac|iPhone|iPod|iPad/.test(navigator.platform);
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (!mod) return;
      if (e.key.toLowerCase() === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      else if (e.key.toLowerCase() === "y" || (e.key.toLowerCase() === "z" && e.shiftKey)) { e.preventDefault(); redo(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const itemCount = cart.items.reduce((n, it) => n + it.qty, 0);

  return (
    <>
      {/* Cart badge */}
      <div className="cart-badge" aria-label={`Cart items ${itemCount}`}>
        <button className="btn primary" onClick={() => setDrawerOpen(true)}>
          Cart ({itemCount})
        </button>
        <button className="btn ghost" onClick={() => cart.clear()} style={{ marginLeft: 8 }}>
          Clear
        </button>
      </div>

      <EditorPanel
        config={config}
        setConfig={changeConfig}
        onExport={exportJson}
        onImport={importJson}
        onImportText={importFromText}
        onReset={resetConfig}
        onCopyUrl={copyShareUrl}
        onCopyCss={copyCssVars}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <main className="preview">
        <ProductShowcase config={config} />
      </main>

      <input ref={fileInputRef} onChange={onFileChange} type="file" accept="application/json" hidden />

      {/* Reset dialog */}
      <Modal
        open={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        title="Reset configuration?"
        actions={
          <>
            <button className="btn ghost" onClick={() => setConfirmResetOpen(false)}>Cancel</button>
            <button className="btn primary" onClick={confirmReset}>Reset</button>
          </>
        }
      >
        <p>This will restore all controls to their default values.</p>
      </Modal>

      {/* Cart Drawer */}
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <div className="app-shell">
          <Shell />
        </div>
      </CartProvider>
    </ToastProvider>
  );
}
