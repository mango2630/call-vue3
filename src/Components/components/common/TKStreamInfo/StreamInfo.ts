export const StreamInfoProps = {
  nickName: {
    type: String,
    default: '',
  },
  isSelf: {
    type: Boolean,
    default: false,
  },
  isMuted: {
    type: Boolean,
    default: false,
  },
  volume: {
    type: Number,
    default: 0,
  },
  showNickName: {
    type: Boolean,
    default: false,
  },
  showSwitchCameraButton: {
    type: Boolean,
    default: false,
  },
  showVirtualBackgroundButton: {
    type: Boolean,
    default: false,
  },
  showNetWorkStatus: { 
    type: Boolean,
    default: false,
  }
};
