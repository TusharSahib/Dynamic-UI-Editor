# Dynamic UI Editor (React)

A UI editor and live preview that lets designers/clients dynamically customize a product UI without changing code.

> Built with Vite + React 18. No backend required.

## ✨ Features

- **Live editing** of:
  - Typography: family (Inter/Roboto/Poppins/System), weight (400/500/600/700), size 10–60 (px/rem)
  - Button: radius, shadow (none/s/m/l), alignment (left/center/right), bg color, text color
  - Gallery: alignment (left/center/right), spacing, image radius
  - Layout: container padding, menu card radius, section background color
  - Stroke: color + weight
- **Layout switching**: Split (image left, panel right) or Stacked (image above panel)
- **Export / Import** configuration JSON
- **Shareable URL** (config encoded in the hash)
- **localStorage** persistence
- **Responsive**: Stacked layout works great on mobile

## 🧱 Architecture

- `ProductShowcase`: the UI component that renders the design (inspired by the provided Figma). Uses CSS variables driven by `config` to update instantly.
- `EditorPanel`: the editor inspector that writes to `config`.
- `useLocalStorage`: tiny state persistence hook.
- `config.js`: default config + mapping for shadows and alignment.

The preview uses CSS variables:

```css
--ff --fw --fs
--btn-radius --btn-shadow --btn-bg --btn-color
--gallery-gap --gallery-radius
--card-radius --container-padding --section-bg
--stroke-color --stroke-weight
