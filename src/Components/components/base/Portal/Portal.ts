export const PortalProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: 'body',
  },
  source: {
    type: String,
    default: 'body',
  },
} as const;
