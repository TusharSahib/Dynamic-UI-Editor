import React from "react";
import Select from "./inputs/Select.jsx";
import NumberInput from "./inputs/NumberInput.jsx";
import ColorTextInput from "./inputs/ColorTextInput.jsx";
import { defaultConfig } from "../config.js";

export default function EditorPanel({
  config,
  setConfig,
  onExport,
  onImport,
  onImportText,
  onReset,
  onCopyUrl,
  onCopyCss,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) {
  const set = (path, val) => {
    setConfig((prev) => {
      // deep clone without structuredClone
      const next = JSON.parse(JSON.stringify(prev));
      let ref = next;
      for (let i = 0; i < path.length - 1; i++) {
        const k = path[i];
        ref[k] = { ...ref[k] };
        ref = ref[k];
      }
      ref[path[path.length - 1]] = val;
      return next;
    });
  };

  // Drag & drop JSON import
  const onDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.includes("json")) {
      const text = await file.text();
      onImportText?.(text);
    }
  };

  return (
    <aside
      className="editor"
      aria-label="UI Editor"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <header className="titlebar">
        <h2>UI Editor</h2>
        <div className="toolbar">
          <button onClick={onExport}>Export JSON</button>
          <button onClick={onImport}>Import JSON</button>
          <button onClick={onCopyCss}>Copy CSS vars</button>
          <button onClick={onCopyUrl}>Copy Share URL</button>
          <button onClick={() => onReset(defaultConfig)}>Reset</button>
          <button onClick={onUndo} disabled={!canUndo} title="Ctrl+Z">Undo</button>
          <button onClick={onRedo} disabled={!canRedo} title="Ctrl+Y / Shift+Ctrl+Z">Redo</button>
        </div>
      </header>

      {/* Layout Switching */}
      <section className="section">
        <h3>Layout</h3>
        <Select
          label="Variant"
          value={config.layout.variant}
          onChange={(v) => set(["layout", "variant"], v)}
          options={[
            { value: "split", label: "Split (side-by-side)" },
            { value: "stacked", label: "Stacked (image above)" }
          ]}
        />
        <NumberInput
          label="Container Padding"
          value={config.layout.containerPadding}
          onChange={(v) => set(["layout", "containerPadding"], v)}
          min={0}
          max={64}
          suffix="px"
        />
        <NumberInput
          label="Menu Card Radius"
          value={config.layout.cardRadius}
          onChange={(v) => set(["layout", "cardRadius"], v)}
          min={0}
          max={32}
          suffix="px"
        />
        <ColorTextInput
          label="Section Background"
          value={config.layout.sectionBg}
          onChange={(v) => set(["layout", "sectionBg"], v)}
        />
        <label className="field">
          <span>Dark mode</span>
          <input
            type="checkbox"
            checked={config.layout.dark}
            onChange={(e) => set(["layout", "dark"], e.target.checked)}
          />
        </label>
      </section>

      {/* Typography */}
      <section className="section">
        <h3>Typography</h3>
        <Select
          label="Font Family"
          value={config.typography.family}
          onChange={(v) => set(["typography", "family"], v)}
          options={[
            {
              value:
                'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial',
              label: "Inter"
            },
            {
              value:
                'Roboto, system-ui, -apple-system, Segoe UI, Inter, Ubuntu, Cantarell, "Helvetica Neue", Arial',
              label: "Roboto"
            },
            {
              value:
                'Poppins, system-ui, -apple-system, Segoe UI, Inter, Ubuntu, Cantarell, "Helvetica Neue", Arial',
              label: "Poppins"
            },
            {
              value:
                'system-ui, -apple-system, Segoe UI, Roboto, Inter, Ubuntu, Cantarell, "Helvetica Neue", Arial',
              label: "System UI"
            }
          ]}
        />
        <Select
          label="Font Weight"
          value={String(config.typography.weight)}
          onChange={(v) => set(["typography", "weight"], Number(v))}
          options={["400", "500", "600", "700"]}
        />
        <div className="field">
          <span>Font Size</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="range"
              min={10}
              max={60}
              value={config.typography.size}
              onChange={(e) => set(["typography", "size"], Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              min={10}
              max={60}
              value={config.typography.size}
              onChange={(e) => set(["typography", "size"], Number(e.target.value))}
              style={{ width: 88 }}
            />
            <Select
              label=""
              value={config.typography.unit}
              onChange={(v) => set(["typography", "unit"], v)}
              options={["px", "rem"]}
            />
          </div>
        </div>
      </section>

      {/* Button */}
      <section className="section">
        <h3>Button</h3>
        <NumberInput
          label="Border Radius"
          value={config.button.radius}
          onChange={(v) => set(["button", "radius"], v)}
          min={0}
          max={32}
          suffix="px"
        />
        <Select
          label="Shadow"
          value={config.button.shadow}
          onChange={(v) => set(["button", "shadow"], v)}
          options={["none", "small", "medium", "large"]}
        />
        <Select
          label="Alignment"
          value={config.button.align}
          onChange={(v) => set(["button", "align"], v)}
          options={[
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" }
          ]}
        />
        <ColorTextInput
          label="Background Color"
          value={config.button.bg}
          onChange={(v) => set(["button", "bg"], v)}
        />
        <label className="field">
          <span>Auto text contrast</span>
          <input
            type="checkbox"
            checked={config.button.autoContrast}
            onChange={(e) => set(["button", "autoContrast"], e.target.checked)}
          />
        </label>
        {!config.button.autoContrast && (
          <ColorTextInput
            label="Text Color"
            value={config.button.color}
            onChange={(v) => set(["button", "color"], v)}
          />
        )}
      </section>

      {/* Gallery / Images */}
      <section className="section">
        <h3>Galleries / Images</h3>
        <Select
          label="Gallery Alignment"
          value={config.gallery.align}
          onChange={(v) => set(["gallery", "align"], v)}
          options={[
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" }
          ]}
        />
        <NumberInput
          label="Spacing"
          value={config.gallery.gap}
          onChange={(v) => set(["gallery", "gap"], v)}
          min={0}
          max={40}
          suffix="px"
        />
        <NumberInput
          label="Image Radius"
          value={config.gallery.radius}
          onChange={(v) => set(["gallery", "radius"], v)}
          min={0}
          max={32}
          suffix="px"
        />
      </section>

      {/* Stroke / Border */}
      <section className="section">
        <h3>Stroke / Border</h3>
        <ColorTextInput
          label="Stroke Color"
          value={config.stroke.color}
          onChange={(v) => set(["stroke", "color"], v)}
        />
        <NumberInput
          label="Stroke Weight"
          value={config.stroke.weight}
          onChange={(v) => set(["stroke", "weight"], v)}
          min={0}
          max={6}
          suffix="px"
        />
      </section>

      <div className="section">
        <p className="hint">
          Tip: Drop a JSON file anywhere on this panel to import. Export/Copy CSS to reuse
          styles elsewhere. Undo/Redo supported.
        </p>
      </div>
    </aside>
  );
}
