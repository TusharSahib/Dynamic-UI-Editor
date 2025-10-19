import { useEffect, useState } from "react";
import React from 'react';

/**
 * Dual color input:
 * - native <input type="color">
 * - free text HEX/RGB field
 */
export default function ColorTextInput({ label, value, onChange }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className="field">
      <span>{label}</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="color"
          value={normalizeToHex(value)}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: 42, height: 32, padding: 0, border: "1px solid #e5e7eb", borderRadius: 8 }}
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => text && onChange(text)}
          placeholder="#RRGGBB or rgb()"
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
}

function normalizeToHex(v) {
  // If it's already a hex, return; otherwise fall back to black to keep <input type="color"> valid.
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v) ? v : "#000000";
}
