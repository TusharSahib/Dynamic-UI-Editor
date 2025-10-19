Dynamic UI Editor for Customizable Components

A React + Tailwind CSS application that lets users dynamically customize product/UI tokens — corner radius, borders, layout padding, colors, and more — with a live preview and persistent settings. It’s built to mirror a real client workflow where non-developers can tweak the look/feel without touching code.

Built with Vite and Tailwind CSS v4 (first-party Vite plugin). 
vitejs
+2
Tailwind CSS
+2

🔗 Links

Live Demo: https://dynamic-ui-editor-bice.vercel.app/

Repository: https://github.com/TusharSahib/Dynamic-UI-Editor
 (repo includes a project README and the live link) 
GitHub

Project Overview

This project demonstrates a Dynamic UI Editor where users can modify a visual interface in real time. The editor writes to design tokens (CSS variables) that the preview consumes instantly, making it easy to experiment with layouts, borders, and colors. The state persists locally so users can refresh or return later and keep their configuration.

What’s included

Fully functional React UI that updates styles live

Editor panel for tokens (radius, borders, padding, colors, etc.)

Product/gallery preview with thumbnails, color variants, zoom & fullscreen

Mobile and desktop layouts

Deployment-ready configuration

🚀 Features

Live Editor Panel: Adjust card radius, border weight, container padding, section/text colors, and layout mode; changes apply immediately.

Image Configurator: Click thumbnails to switch angles; choosing a color can swap to a per-color image variant (with a subtle tint fallback).

Viewer Tools: Zoom in/out, reset, and fullscreen.

Responsive Layouts: Desktop split view and compact mobile layout.

Persisted Settings: Tokens and selections saved to localStorage.

Copy/Export Tokens: Copy the current theme as JSON for reuse.

Clean Build & Deploy: Standard Vite build to dist/ suitable for static hosts. 
vitejs

📁 Project Structure
src/
 ┣ app/
 ┃ ┗ App.jsx                   # App shell + routes/tabs
 ┣ pages/
 ┃ ┣ Configurator/             # Desktop configurator page
 ┃ ┣ MobileCompact/            # Mobile-first version of the configurator
 ┃ ┗ ThemeEditor/              # Token editor (sliders, color pickers)
 ┣ components/
 ┃ ┣ configurator/             # ProductCard, OptionGroup, etc.
 ┃ ┣ media/                    # Viewer (zoom/fullscreen), MediaRail (thumbs)
 ┃ ┗ ui/                       # Button and small UI primitives
 ┣ styles/
 ┃ ┣ globals.css               # Tailwind import + base resets
 ┃ ┗ tokens.css                # Design tokens (CSS variables)
 ┣ data/
 ┃ ┣ product.json              # Product meta (name, options)
 ┃ ┣ swatches.json             # Colors/materials (+optional price deltas)
 ┃ ┣ gallery.json              # Thumbnails + per-color variant image URLs
 ┃ ┗ tokens.default.json       # Default theme tokens
 ┣ store/
 ┃ ┗ uiStore.jsx               # React Context store + localStorage persistence
 ┣ utils/                      # a11y helpers, image helpers, formatters
 ┣ main.jsx                    # React entry (mounts App)
 ┗ ...

🛠 Tech Stack

React 18 — component-based UI

Vite — dev server & production build (npm run build → dist/) 
vitejs

Tailwind CSS v4 with @tailwindcss/vite — first-party plugin & @import "tailwindcss"; in your CSS 
Tailwind CSS
+1

React Context + useReducer — global, persistent store

Vanilla A11y helpers — focus-trap, keyboard nav

🎨 Customization Options (examples)

Layout & Surfaces: card radius, border weight, container padding, section background, text color

Viewer: zoom level, reset, fullscreen (UI controls)

Gallery: click thumbnails to swap angle; color choice can swap hero image (or live tint if variant missing)

Theme: copy JSON (export) for tokens

🚦 Getting Started
Prerequisites

Node.js 18+

npm

Install & Run
# install deps
npm install

# start dev server
npm run dev

# build for production (outputs to dist/)
npm run build

# preview the production build locally
npm run preview


Vite’s production build outputs a static bundle in dist/, ready to host on any static provider. vite preview serves that build locally for testing. 
vitejs
+1

🌐 Deployment

You can deploy to Netlify, Vercel, or GitHub Pages. All serve static files from the dist/ folder after npm run build. 
vitejs

Netlify (recommended for SPAs)

Add a SPA fallback so deep links (e.g. /configurator) resolve to index.html:

Create public/_redirects with:

/* /index.html 200


or add to netlify.toml:

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200


(Netlify’s official redirects docs). 
Netlify Docs
+2
Netlify Docs
+2

In Netlify, connect your GitHub repo.
Build command: npm run build • Publish directory: dist (Vite default). 
vitejs

Vercel

Import the GitHub repo into Vercel; it will detect Vite automatically.
Build: npm run build • Output: dist. (Vercel supports Vite static apps out of the box.)

GitHub Pages (alternative)

Use the official upload-pages-artifact + deploy-pages GitHub Actions to publish the dist/ output. (Enable Pages → Source: GitHub Actions.) 
GitHub
+1

💾 Exporting / Sharing Config

Use the Theme Editor → Copy JSON action to copy the current token set (radius, padding, colors, etc.).

You can persist it in your own backend or re-hydrate on load via localStorage/session as needed.

🧩 Component API (high level)

<ThemeEditor />
No props; writes token values to the global store; offers Copy JSON and Reset.

<ConfiguratorPage /> / <MobileCompactPage />
Reads tokens + current selection; shows the Viewer and MediaRail; clicking swatches updates selection & (if available) swaps to per-color image.

<Viewer />
Props: activeSrc, zoom, onZoomIn, onZoomOut, onReset, tintHex? (for fallback tint), etc. Handles fullscreen.

<MediaRail />
Props: items, selectedId, onSelect, orientation.

🔧 Development Notes

Tailwind v4 with Vite uses the first-party plugin:

// vite.config.js
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [tailwindcss()] })


And import Tailwind once in your CSS:

@import "tailwindcss";


(Tailwind’s official guide.) 
Tailwind CSS

Vite production builds:
npm run build → generates dist/ (static files). Host those files on Netlify, Vercel, or any static hosting. 
vitejs

Netlify SPA routing:
Add _redirects or netlify.toml rule /* /index.html 200. 
Netlify Docs

📜 License & Credits

Images: demo links use CDN URLs (Pexels/Unsplash). Verify license for your chosen media before production.

Docs referenced: Vite build & deploy, Tailwind v4 + Vite plugin, Netlify redirects, GitHub Pages Actions. 
GitHub
+3
vitejs
+3
Tailwind CSS
+3

✅ Deliverables Checklist

 Live demo deployed (Vercel)

 Functional editor with real-time preview

 Configurator: thumbnails + color variants

 Responsive layouts (desktop/mobile)

 Persisted settings (localStorage)

 README with tech stack, structure, and deploy steps