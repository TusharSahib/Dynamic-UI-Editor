import React from 'react';

export default function Select({ label, value, onChange, options, disabled }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
    </label>
  );
}
