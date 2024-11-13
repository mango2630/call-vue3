export const OverlayProps = {
  show: {
    type: Boolean,
    default: true,
  },
  showMask: {
    type: Boolean,
    default: true,
  },
  showBackgroundImage: {
    type: Boolean,
    default: true,
  },
  blur: {
    type: Boolean,
    default: true,
  },
  bgColor: {
    type: String,
  },
  bgImage: {
    type: String,
  },
  zIndex: {
    type: Number,
    default: 11000,
  },
  customClass: {
    type: String,
  },
  customStyle: {
    type: Object,
  },
  customMaskStyle: {
    type: Object,
  },
  fit: {
    type: String,
    default: 'cover',
  },
  defaultSrc: {
    type: String,
  },
} as const;

export const OverlayEmits = ['click', 'error'];
