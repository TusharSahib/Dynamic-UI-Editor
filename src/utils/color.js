// Basic color helpers (hex/rgb) and WCAG-ish contrast

export function parseColorToRGB(input) {
  if (!input) return [0, 0, 0];
  // #RGB or #RRGGBB
  const hex = input.trim();
  const hexMatch = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex);
  if (hexMatch) {
    const h = hexMatch[1];
    if (h.length === 3) {
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      return [r, g, b];
    } else {
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return [r, g, b];
    }
  }
  // rgb() or rgba()
  const rgbMatch =
    /^rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})/i.exec(input);
  if (rgbMatch) {
    return [
      clamp255(Number(rgbMatch[1])),
      clamp255(Number(rgbMatch[2])),
      clamp255(Number(rgbMatch[3]))
    ];
  }
  return [0, 0, 0];
}

export function relativeLuminance([r, g, b]) {
  const srgb = [r, g, b].map((v) => v / 255);
  const linear = srgb.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function contrastRatio(rgb1, rgb2) {
  const L1 = relativeLuminance(rgb1);
  const L2 = relativeLuminance(rgb2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Returns '#ffffff' or '#111827' (near-black) based on which has higher contrast with background.
 */
export function autoTextColor(bg) {
  const bgRgb = parseColorToRGB(bg);
  const white = [255, 255, 255];
  const nearBlack = [17, 24, 39]; // slate-900-ish
  return contrastRatio(bgRgb, white) >= contrastRatio(bgRgb, nearBlack)
    ? '#ffffff'
    : '#111827';
}

function clamp255(n) {
  return Math.max(0, Math.min(255, n || 0));
}
