export const MicrophoneVolumeProps = {
  isMuted: {
    type: Boolean,
    default: false,
  },
  volume: {
    type: Number,
    default: 0,
  },
} as const;
