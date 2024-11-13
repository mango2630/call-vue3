export const ToggleWindowProps = {
  bigWindow: {
    type: String,
  },
  showSmallWindow: {
    type: Boolean,
    default: true,
  },
  smallWindowWidth: {
    type: String,
    default: '30%',
  },
  smallWindowHeight: {
    type: String,
    default: '30%',
  },
} as const;

export const ToggleWindowEmits = ['toggle'];
