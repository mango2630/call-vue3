import defaultAvatarSrc from '../../../assets/common/defaultAvatar.svg';

export const OverlayStreamProps = {
  // ==============  OverlayStream 业务组件 =================
  showOverlayStream: {
    type: Boolean,
    default: true,
  },
  customClass: {
    type: String,
  },
  customStyle: {
    type: Object,
  },
  isSmallWindow: {
    type: Boolean,
    default: false,
  },
  tip: {
    type: String,
    default: null,
  },
  // ============== Overlay 基础组件 =================
  showOverlay: {
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
    default: true
  },
  bgColor: {
    type: String,
  },
  bgImage: {
    type: String,
    default: defaultAvatarSrc,
  },
  overlayZIndex: {
    type: Number,
  },
  customOverlayClass: { 
    type: String,
  },
  fit: {
    type: String,
  },
  // ============== Loading 基础组件 =================
  showLoading: {
    type: Boolean,
    default: false,
  },
  // ============== Avatar 基础组件 =================
  showAvatar: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    default: defaultAvatarSrc,
  },
  // ============== Text(username) 基础组件 =================
  showUserName: {
    type: Boolean,
    default: true,
  },
  username: {
    type: String,
  },
  color: {
    type: String,
    default: '#FFF',
  },
  // ==============  MicrophoneVolume 业务组件 =================
  showMicVolume: {
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
  // ==============  Tip 业务组件 =================
  showTip: {
    type: Boolean,
    default: true,
  },
} as const;

export const OverlayStreamEmits = ['error'];