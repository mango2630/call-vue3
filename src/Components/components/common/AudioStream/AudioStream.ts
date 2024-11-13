export const AudioStreamProps = {
  avatar: {
    type: String,
  },
  username: {
    type: String,
  },
  isVideoAvailable: {
    type: Boolean,
  },
  showStreamInfo: {
    type: Boolean,
  },
  isSmallWindow: {
    type: Boolean,
    default: false,
  },
  isMuted: {
    type: Boolean,
    default: true,
  },
  volume: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
  },
};
