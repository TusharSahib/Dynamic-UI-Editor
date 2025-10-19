export const defaultConfig = {
  typography: {
    family:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial',
    weight: 500,
    size: 16,
    unit: 'px' // 'px' | 'rem'
  },
  button: {
    radius: 10,
    shadow: 'medium', // none | small | medium | large
    align: 'right', // left | center | right
    bg: '#b66756',
    color: '#ffffff',
    autoContrast: true // NEW: choose white/near-black automatically from bg for legibility
  },
  gallery: {
    align: 'left', // left | center | right
    gap: 12,
    radius: 12
  },
  layout: {
    cardRadius: 14,
    containerPadding: 24,
    sectionBg: '#ffffff',
    variant: 'split', // split | stacked
    dark: false // NEW: dark mode toggle
  },
  stroke: {
    color: '#e5e7eb',
    weight: 1
  }
};

export const SHADOWS = {
  none: 'none',
  small: '0 1px 3px rgba(0,0,0,.12)',
  medium: '0 6px 16px rgba(0,0,0,.15)',
  large: '0 12px 32px rgba(0,0,0,.2)'
};

export const ALIGN_JUSTIFY = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
};

export const GALLERY_JUSTIFY = {
  left: 'start',
  center: 'center',
  right: 'end'
};
