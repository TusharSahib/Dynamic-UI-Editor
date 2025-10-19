import React from 'react';

export default function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  suffix = "px"
}) {
  const clamp = (n) => Math.min(max, Math.max(min, Number(n) || 0));
  return (
    <div className="field">
      <span>{label}</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(clamp(e.target.value))}
          style={{ flex: 1 }}
        />
        <input
          aria-label={label}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(clamp(e.target.value))}
          style={{ width: 88 }}
        />
        <span className="hint">{suffix}</span>
      </div>
    </div>
  );
}
