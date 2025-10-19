# Dynamic UI Editor for Customizable Components

A **React + Tailwind CSS** application that lets users dynamically customize product/UI tokens — corner radius, borders, layout padding, colors, and more — with a **live preview** and **persistent settings**. It's built to mirror a real client workflow where non-developers can tweak the look/feel without touching code.

Built with **Vite** and **Tailwind CSS v4** (using the official first-party Vite plugin).

---

## 🔗 Links

| Resource | URL |
| :--- | :--- |
| **Live Demo** | [https://dynamic-ui-editor-bice.vercel.app/](https://dynamic-ui-editor-bice.vercel.app/) |
| **Repository** | [https://github.com/TusharSahib/Dynamic-UI-Editor](https://github.com/TusharSahib/Dynamic-UI-Editor) |

---

## 💡 Project Overview

This project demonstrates a **Dynamic UI Editor** where users can modify a visual interface in real time. The editor writes directly to **design tokens (CSS variables)** that the preview consumes instantly, making it easy to experiment with layouts, borders, and colors. The state persists locally, ensuring users can refresh or return later and keep their configuration.

### What’s Included

* Fully functional **React UI** that updates styles live.
* Editor panel for tokens (radius, borders, padding, colors, etc.).
* Product/gallery preview with thumbnails, color variants, zoom & fullscreen.
* Mobile and desktop layouts.
* Deployment-ready configuration.

---

## 🚀 Features

* **Live Editor Panel**: Adjust card radius, border weight, container padding, section/text colors, and layout mode; changes apply immediately.
* **Image Configurator**: Click thumbnails to switch angles; choosing a color can swap to a per-color image variant (with a subtle tint fallback).
* **Viewer Tools**: Zoom in/out, reset, and fullscreen for detailed viewing.
* **Responsive Layouts**: Desktop split view and compact mobile layout.
* **Persisted Settings**: Tokens and selections saved to `localStorage`.
* **Copy/Export Tokens**: Copy the current theme as **JSON** for reuse or external persistence.
* **Customization Examples**: Card radius, border weight, container padding, section background, text color, and viewer/gallery controls.

---

## 🛠 Tech Stack

| Technology | Description |
| :--- | :--- |
| **React 18** | Component-based UI. |
| **Vite** | Fast dev server & production build (`npm run build` → `dist/`). |
| **Tailwind CSS v4** | With `@tailwindcss/vite` (official first-party plugin). |
| **React Context + useReducer** | Global, persistent state management. |
| **A11y helpers** | Vanilla JS utilities for focus-trap and keyboard navigation. |

---

## 📁 Project Structure

src/ ┣ app/ ┃ ┗ App.jsx # App shell + routes/tabs ┣ pages/ ┃ ┣ Configurator/ # Desktop configurator page ┃ ┣ MobileCompact/ # Mobile-first version of the configurator ┃ ┗ ThemeEditor/ # Token editor (sliders, color pickers) ┣ components/ ┃ ┣ configurator/ # ProductCard, OptionGroup, etc. ┃ ┣ media/ # Viewer (zoom/fullscreen), MediaRail (thumbs) ┃ ┗ ui/ # Button and small UI primitives ┣ styles/ ┃ ┣ globals.css # Tailwind import + base resets ┃ ┗ tokens.css # Design tokens (CSS variables) ┣ data/ ┃ ┣ product.json # Product meta (name, options) ┃ ┣ swatches.json # Colors/materials (+optional price deltas) ┃ ┣ gallery.json # Thumbnails + per-color variant image URLs ┃ ┗ tokens.default.json # Default theme tokens ┣ store/ ┃ ┗ uiStore.jsx # React Context store + localStorage persistence ┣ utils/ # a11y helpers, image helpers, formatters ┣ main.jsx # React entry (mounts App) ┗ ...


---

## 🚦 Getting Started

### Prerequisites

* Node.js **18+**
* npm

### Install & Run

``bash

# 1. Install dependencies
npm install

# 2. Start the development server (localhost:5173 or similar)
npm run dev

# 3. Build for production (outputs to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
🌐 Deployment
The npm run build command generates a static bundle in the dist/ folder. This folder can be hosted on any static hosting provider.

Netlify SPA Routing
If deploying to Netlify, you may need a fallback rule for SPA routes (e.g., /configurator) to resolve to index.html.

Add a _redirects file to your public/ folder:

/* /index.html 200
Netlify Build Settings: Build command: npm run build • Publish directory: dist

Vercel
Vercel will automatically detect the Vite configuration. Vercel Build Settings: Build command: npm run build • Output directory: dist

💾 Exporting / Sharing Config
In the Theme Editor, use the Copy JSON action to grab the current set of tokens (radius, padding, colors, etc.). This JSON can be used to persist the theme externally or re-hydrate the application state on future loads.

🔧 Development Notes
Tailwind v4 Setup
The project uses the official Vite plugin for Tailwind v4.

vite.config.js includes:

JavaScript

import tailwindcss from '@tailwindcss/vite'
// ... plugins: [tailwindcss()]
The main CSS file (src/styles/globals.css) includes the single import:

CSS

@import "tailwindcss";
📜 License & Credits
Tushar Goyal
