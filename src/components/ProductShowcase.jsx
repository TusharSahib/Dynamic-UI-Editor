import React from "react";
import { ALIGN_JUSTIFY, GALLERY_JUSTIFY, SHADOWS } from "../config.js";
import { autoTextColor } from "../utils/color.js";
import Modal from "./Modal.jsx";
import { useToast } from "./Toast.jsx";
import ChairSVG from "./ChairSVG.jsx";
import { useCart } from "../cart/CartProvider.jsx";
import { priceOfOptions } from "../utils/money.js";

const leatherPalette = [
  "#6b5a55", "#6b7258", "#547063", "#645a77", "#7d5d76",
  "#3f5e7a", "#a14f44", "#5e1f1a", "#307a60", "#5c4a3b"
];
const fabricPalette = ["#e7d6d2", "#c3d2c2", "#d8d7e9", "#c9d7e9", "#ddd0bf"];
const armPalette = ["#5c4a3b", "#3d3d3d", "#8b5e34", "#6f7b83"];
const pipingPalette = ["#ffffff", "#111827", "#f1c40f", "#22c55e"];

const ENV_GRADIENTS = [
  "linear-gradient(180deg,#cfd6df,#aeb8c3)",
  "linear-gradient(180deg,#d6cfc4,#b39e8b)",
  "linear-gradient(180deg,#cfdccd,#a8c2a6)",
  "linear-gradient(180deg,#dfd4cc,#b9a999)",
  "linear-gradient(180deg,#d2d7e6,#b0b8d1)"
];

export default function ProductShowcase({ config }) {
  const toast = useToast();
  const cart = useCart();

  const computedBtnColor =
    config.button.autoContrast ? autoTextColor(config.button.bg) : config.button.color;

  const styleVars = {
    "--ff": config.typography.family,
    "--fw": config.typography.weight,
    "--fs": `${config.typography.size}${config.typography.unit}`,
    "--btn-radius": `${config.button.radius}px`,
    "--btn-shadow": SHADOWS[config.button.shadow],
    "--btn-bg": config.button.bg,
    "--btn-color": computedBtnColor,
    "--gallery-gap": `${config.gallery.gap}px`,
    "--gallery-radius": `${config.gallery.radius}px`,
    "--card-radius": `${config.layout.cardRadius}px`,
    "--container-padding": `${config.layout.containerPadding}px`,
    "--section-bg": config.layout.sectionBg,
    "--stroke-color": config.stroke.color,
    "--stroke-weight": `${config.stroke.weight}px`
  };

  const ctaAlign = { justifyContent: ALIGN_JUSTIFY[config.button.align] };
  const galleryJustify = { justifyContent: GALLERY_JUSTIFY[config.gallery.align] };

  // viewer + configuration local state
  const viewerRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [selectedThumb, setSelectedThumb] = React.useState(0);
  const [arOpen, setArOpen] = React.useState(false);

  // chair options
  const [material, setMaterial] = React.useState("leather"); // leather | fabric
  const [cushionColor, setCushionColor] = React.useState(leatherPalette[4]);
  const [armStyle, setArmStyle] = React.useState("fixed"); // fixed | 4D
  const [armColor, setArmColor] = React.useState(armPalette[0]);
  const [pipingColor, setPipingColor] = React.useState(pipingPalette[0]);
  const [legsFinish, setLegsFinish] = React.useState("steel"); // steel | black | gold

  // base/body color takes nuance from cushion
  const bodyColor = "#a99988";

  const addToCart = async () => {
    const options = { material, cushionColor, armStyle: armStyle === "fixed" ? "Fixed" : "4D", legsFinish, pipingColor };
    // preview — capture <svg> as data URL
    let preview = null;
    try {
      const svgEl = viewerRef.current?.querySelector("svg");
      if (svgEl) {
        const xml = new XMLSerializer().serializeToString(svgEl);
        preview = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
      }
    } catch {}
    const item = {
      name: "Cozy Lounge Chair",
      options,
      price: priceOfOptions({ material, legsFinish, armStyle: armStyle === "fixed" ? "fixed" : "4D" }),
      qty: 1,
      preview
    };
    cart.add(item);
    toast("Added to cart");
  };

  const zoomIn = () => setScale((s) => Math.min(1.2, s + 0.05));
  const zoomOut = () => setScale((s) => Math.max(0.8, s - 0.05));
  const toggleSpin = () => setIsSpinning((v) => !v);
  const arClick = () => setArOpen(true);

  const mainStyle = {
    background: ENV_GRADIENTS[selectedThumb],
    transition: "transform .2s ease",
  };
  const chairStyle = {
    transform: `scale(${scale})`,
    transition: "transform .15s ease",
    animation: isSpinning ? "spinZ 18s linear infinite" : "none"
  };

  return (
    <>
      <div
        className={`product-shell variant-${config.layout.variant}`}
        style={styleVars}
        aria-label="Live UI Preview"
      >
        {/* Viewer */}
        <div>
          <div
            className="viewer"
            role="figure"
            aria-label="Chair viewer"
          >
            <div className="thumbs" aria-label="Scene presets">
              {ENV_GRADIENTS.map((bg, i) => (
                <button
                  key={i}
                  className="thumb"
                  style={{ background: bg }}
                  onClick={() => {
                    setSelectedThumb(i);
                    toast("Changed environment");
                  }}
                  aria-pressed={i === selectedThumb}
                  title={`Environment ${i + 1}`}
                />
              ))}
            </div>

            <div className="actions" aria-label="Viewer actions">
              <button className="action" onClick={toggleSpin} aria-pressed={isSpinning} title="Toggle orbit">◎</button>
              <button className="action" onClick={arClick} title="View in AR">▦</button>
              <button className="action" onClick={zoomIn} title="Zoom in">＋</button>
              <button className="action" onClick={zoomOut} title="Zoom out">－</button>
            </div>

            <div className="main" style={mainStyle} ref={viewerRef}>
              <ChairSVG
                height={300}
                style={chairStyle}
                bodyColor={bodyColor}
                cushionColor={cushionColor}
                armColor={armColor}
                pipingColor={pipingColor}
                legsFinish={legsFinish}
                material={material}
              />
            </div>
          </div>

          <div className="gallery" aria-label="Environment gallery">
            <div className="gallery-grid" style={galleryJustify}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div className="gallery-item" key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Menu / configuration */}
        <aside className="menu-card" aria-label="Product configuration panel">
          <header className="title" aria-live="polite">
            <div>
              <h2 style={{ margin: "0 0 4px" }}>Cozy Lounge chair</h2>
              <div className="subtle">Ships in 5–7 days</div>
            </div>
            <button className="action" title="View in AR" onClick={arClick}>AR</button>
          </header>

          <div className="progress" aria-hidden="true"><span /></div>

          <p className="subtle" style={{ margin: "10px 0 0" }}>Customize your Chair</p>

          <details className="details" open>
            <summary>
              <strong>1. Material</strong>
              <span className="subtle" aria-live="polite">{material}</span>
            </summary>
            <div className="cta-row">
              <button className={`btn ${material === "leather" ? "primary" : "ghost"}`} onClick={() => { setMaterial("leather"); setCushionColor(leatherPalette[4]); }}>
                Leather
              </button>
              <button className={`btn ${material === "fabric" ? "primary" : "ghost"}`} onClick={() => { setMaterial("fabric"); setCushionColor(fabricPalette[2]); }}>
                Fabric
              </button>
            </div>
          </details>

          <details className="details" open>
            <summary>
              <strong>2. Cushion color</strong>
              <span className="subtle">Swatches</span>
            </summary>
            <div className="swatches" role="listbox" aria-label="Cushion colors">
              {(material === "leather" ? leatherPalette : fabricPalette).map((c, i) => (
                <button
                  key={c}
                  role="option"
                  aria-selected={cushionColor === c}
                  className="swatch"
                  style={{ background: c }}
                  onClick={() => setCushionColor(c)}
                  title={c}
                />
              ))}
            </div>
          </details>

          <details className="details" open>
            <summary>
              <strong>3. Arms</strong>
              <span className="subtle">{armStyle === "fixed" ? "Fixed" : "4D"}</span>
            </summary>
            <div className="cta-row">
              <button className={`btn ${armStyle === "fixed" ? "primary" : "ghost"}`} onClick={() => setArmStyle("fixed")}>
                Fixed
              </button>
              <button className={`btn ${armStyle === "4D" ? "primary" : "ghost"}`} onClick={() => setArmStyle("4D")}>
                4D Adjustable
              </button>
            </div>
            <div className="swatches" role="listbox" aria-label="Arm colors">
              {armPalette.map((c) => (
                <button
                  key={c}
                  role="option"
                  aria-selected={armColor === c}
                  className="swatch"
                  style={{ background: c }}
                  onClick={() => setArmColor(c)}
                  title={c}
                />
              ))}
            </div>
          </details>

          <details className="details">
            <summary>
              <strong>4. Piping</strong>
              <span className="subtle">Edge detail</span>
            </summary>
            <div className="swatches" role="listbox" aria-label="Piping">
              {pipingPalette.map((c) => (
                <button
                  key={c}
                  role="option"
                  aria-selected={pipingColor === c}
                  className="swatch"
                  style={{ background: c }}
                  onClick={() => setPipingColor(c)}
                  title={c}
                />
              ))}
            </div>
          </details>

          <details className="details">
            <summary>
              <strong>5. Legs finish</strong>
              <span className="subtle">{legsFinish}</span>
            </summary>
            <div className="cta-row">
              {["steel", "black", "gold"].map((f) => (
                <button
                  key={f}
                  className={`btn ${legsFinish === f ? "primary" : "ghost"}`}
                  onClick={() => setLegsFinish(f)}
                >
                  {f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </details>

          <div className="cta-row" style={ctaAlign}>
            <button className="btn primary" onClick={addToCart}>Add to cart</button>
            <button className="btn ghost" onClick={addToCart}>Add to cart</button>
          </div>
        </aside>
      </div>

      {/* AR modal (placeholder) */}
      <Modal
        open={arOpen}
        onClose={() => setArOpen(false)}
        title="View in AR (demo)"
        actions={<button className="btn primary" onClick={() => setArOpen(false)}>Close</button>}
      >
        <p>
          This demo uses an SVG render. To enable real AR, drop a <code>.usdz</code> (iOS) and <code>.glb</code> (Android)
          asset and we’ll wire the AR buttons to Quick Look / Scene Viewer.
        </p>
      </Modal>
    </>
  );
}
