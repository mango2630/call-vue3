import { TUIGlobal } from '../../../../TUICallService/index';
import HangupSrc from '../../../assets/button/hangup.svg';
import AcceptSrc from '../../../assets/button/accept.svg';
import VirtualBackgroundOpenSrc from '../../../assets/button/background-blur-open.svg';
import VirtualBackgroundCloseSrc from '../../../assets/button/background-blur-close.svg';
// @if process.env.BUILD_TARGET!='MINI'
import FullScreenSrc from '../../../assets/button/desktop/fullScreen.svg';
import MinimizeDeskSrc from '../../../assets/button/desktop/minimize.svg';
import InviteUserDeskSrc from '../../../assets/button/desktop/inviteUser.svg';
// @endif
import MinimizeMobileSrc from '../../../assets/button/mobile/minimize.svg';
import SwitchCameraSrc from '../../../assets/button/mobile/switch-camera.svg';
import CameraOpenSrc from '../../../assets/button/camera-open.svg';
import CameraCloseSrc from '../../../assets/button/camera-close.svg';
import MicrophoneOpenSrc from '../../../assets/button/microphone-open.svg';
import MicrophoneCloseSrc from '../../../assets/button/microphone-close.svg';
import SpeakerOpenSrc from '../../../assets/button/speaker-open.svg';
import SpeakerCloseSrc from '../../../assets/button/speaker-close.svg';
import InviteUserMobileSrc from '../../../assets/button/mobile/inviteUser.svg';
import DownSrc from '../../../assets/button/mobile/down.svg';

const isMobile = !TUIGlobal.isPC;

let minimizeSrc = MinimizeMobileSrc;
let inviteUser = InviteUserMobileSrc;
// @if process.env.BUILD_TARGET!='MINI'
if (!isMobile) {
  minimizeSrc = MinimizeDeskSrc;
  inviteUser = InviteUserDeskSrc;
}
// @endif

const initialStyle = {
  width: isMobile ? '60px' : '40px',
  height: isMobile ? '60px' : '40px',
  shape: 'circle',
  iconSize: isMobile ? 30 : 20,
  showText: true,
  textColor: '#D5E0F2',
  textSize: '12px',
  textStyle: {
    marginTop: '5px',
  }
};
export const defaultButtonUI = {
  accept: {
    basicConfig: {
      ...initialStyle,
      color: '#51C271',
      iconSrc: AcceptSrc,
    },
    loadingConfig: {
      ...initialStyle,
      color: '#51C271',
      loadingWidth: isMobile ? '30px' : '20px',
      loadingHeight: isMobile ? '30px' : '20px',
    },
  },
  hangup: {
    basicConfig: {
      ...initialStyle,
      color: '#ED4651',
      iconSrc: HangupSrc,
    },
    loadingConfig: {
      ...initialStyle,
      color: '#ED4651',
      loadingWidth: isMobile ? '30px' : '20px',
      loadingHeight: isMobile ? '30px' : '20px',
    },
  },
  reject: {
    basicConfig: {
      ...initialStyle,
      color: '#ED4651',
      iconSrc: HangupSrc,
    },
  },
  camera: {
    basicConfig: {
      ...initialStyle,
      color: '#FFFFFF',
      iconSrc: CameraOpenSrc,
      shape: 'circle',
    },
    closedConfig: {
      ...initialStyle,
      color: '#6b758a4d',
      iconSrc: CameraCloseSrc,
    },
    loadingConfig: {
      ...initialStyle,
      color: '#6b758a4d',
      loadingWidth: isMobile ? '30px' : '20px',
      loadingHeight: isMobile ? '30px' : '20px',
    },
  },
  microphone: {
    basicConfig: {
      ...initialStyle,
      color: '#FFFFFF',
      iconSrc: MicrophoneOpenSrc,
    },
    closedConfig: {
      ...initialStyle,
      color: '#6b758a4d',
      iconSrc: MicrophoneCloseSrc,
    },
  },
  speaker: {
    basicConfig: {
      ...initialStyle,
      color: '#FFFFFF',
      iconSrc: SpeakerOpenSrc,
    },
    closedConfig: {
      ...initialStyle,
      color: '#6b758a4d',
      iconSrc: SpeakerCloseSrc,
    },
  },
  // @if process.env.BUILD_TARGET!='MINI'
  fullScreen: {
    basicConfig: {
      iconSize: 20,
      iconSrc: FullScreenSrc,
    },
  },
  // @endif
  minimize: {
    basicConfig: {
      iconSize: isMobile ? 24 : 20,
      iconSrc: minimizeSrc,
    },
  },
  switchCamera: {
    basicConfig: {
      ...initialStyle,
      color: 'transparent',
      iconSrc: SwitchCameraSrc,
      shape: 'circle',
    },
  },
  inviteUser: {
    basicConfig: {
      ...initialStyle,
      color: isMobile ? '' : '#6b758a4d',
      width: isMobile ? '24px' : '40px',
      height: isMobile ? '24px' : '40px',
      shape: isMobile ? '' : 'circle',
      iconSize: isMobile ? 24 : 20,
      iconSrc: inviteUser,
    },
  },
  toggleButtonPanel: {
    basicConfig: {
      color: 'transparent',
      width: '40px',
      height: '40px',
      shape: 'circle',
      iconSize: 40,
      iconSrc: DownSrc,
    },
  },
  virtualBackground: {
    basicConfig: {
      ...initialStyle,
      color: '#6b758a4d',
      iconSrc: VirtualBackgroundOpenSrc,
      shape: 'circle',
    },
    closedConfig: {
      ...initialStyle,
      color: '#FFFFFF',
      iconSrc: VirtualBackgroundCloseSrc,
    },
    loadingConfig: {
      ...initialStyle,
      color: '#6b758a4d',
      loadingWidth: isMobile ? '30px' : '20px',
      loadingHeight: isMobile ? '30px' : '20px',
    },
    disableConfig: {
      ...initialStyle,
      color: '#6b758a4d',
      iconSrc: VirtualBackgroundOpenSrc,
      buttonStyle: {
        opacity: 0.6
      }
    }
  },
};

export const MobileUI = {
  singleCall: {
    video: {
      calling: {
        ...defaultButtonUI,
        switchCamera: {
          basicConfig: {
            ...initialStyle,
            color: '#6b758a4d',
            iconSrc: SwitchCameraSrc,
            shape: 'circle',
            showText: true,
          },
          disableConfig: {
            ...initialStyle,
            color: '#6b758a4d',
            iconSrc: SwitchCameraSrc,
            shape: 'circle',
            showText: true,
            buttonStyle: {
              opacity: 0.6
            }
          }
        },
        hangup: {
          basicConfig: {
            ...defaultButtonUI.hangup.basicConfig,
          },
          loadingConfig: {
            ...defaultButtonUI.hangup.loadingConfig,
          },
        },
        reject: {
          basicConfig: {
            ...defaultButtonUI.reject.basicConfig,
            showText: false,
          },
        },
      },
      accept: {
        ...defaultButtonUI,
        switchCamera: {
          basicConfig: {
            ...initialStyle,
            color: '#6b758a4d',
            iconSrc: SwitchCameraSrc,
            shape: 'circle',
          },
          disableConfig: {
            ...initialStyle,
            color: '#6b758a4d',
            iconSrc: SwitchCameraSrc,
            shape: 'circle',
            showText: true,
            buttonStyle: {
              opacity: 0.6
            }
          }
        },
        accept: {
          basicConfig: { 
            ...defaultButtonUI.accept.basicConfig,
            showText: false,
          },
          loadingConfig: { 
            ...defaultButtonUI.accept.loadingConfig,
            showText: false,
          },
        },
        reject: {
          basicConfig: { 
            ...defaultButtonUI.reject.basicConfig,
            showText: false,
          }
        },
      },
      connected: {
        ...defaultButtonUI,
        virtualBackground: {
          basicConfig: {
            ...initialStyle,
            color: 'transparent',
            iconSrc: VirtualBackgroundOpenSrc,
            shape: 'circle',
            showText: false,
          },
          closedConfig: {
            ...initialStyle,
            color: 'transparent',
            iconSrc: VirtualBackgroundOpenSrc,
            showText: false,
          },
          disableConfig: {
            ...initialStyle,
            color: 'transparent',
            iconSrc: VirtualBackgroundOpenSrc,
            showText: false,
            buttonStyle: {
              opacity: 0.6
            }
          }
        },
        hangup: {
          basicConfig: {
            ...defaultButtonUI.hangup.basicConfig,
            showText: false,
          },
          loadingConfig: {
            ...defaultButtonUI.hangup.loadingConfig,
            showText: false,
          },
        },
        switchCamera: {
          basicConfig: {
            ...defaultButtonUI.switchCamera.basicConfig,
            showText: false,
          },
          disableConfig: {
            ...defaultButtonUI.switchCamera.basicConfig,
            showText: false,
            buttonStyle: {
              opacity: 0.6
            }
          }
        },
      }
    },
    audio: {
      calling: defaultButtonUI,
      accept: defaultButtonUI,
      connected: defaultButtonUI,
    }
  },
  groupCall: {
    video: {
      calling: {
        ...defaultButtonUI,
        switchCamera: {
          basicConfig: {
            ...initialStyle,
            color: '#6b758a4d',
            iconSrc: SwitchCameraSrc,
            shape: 'circle',
          },
        },
        hangup: {
          basicConfig: {
            ...defaultButtonUI.hangup.basicConfig,
            showText: false,
          },
          loadingConfig: {
            ...defaultButtonUI.hangup.loadingConfig,
            showText: false,
          },
        },
        accept: {
          basicConfig: {
            ...defaultButtonUI.accept.basicConfig,
            showText: false,
          },
          loadingConfig: { 
            ...defaultButtonUI.accept.loadingConfig,
            showText: false,
          },
        },
        reject: {
          basicConfig: {
            ...defaultButtonUI.reject.basicConfig,
            showText: false,
          },
        },
      },
      accept: {
        ...defaultButtonUI,
        hangup: {
          basicConfig: {
            ...defaultButtonUI.hangup.basicConfig,
            showText: false,
          },
          loadingConfig: {
            ...defaultButtonUI.hangup.loadingConfig,
            showText: false,
          },
        },
        accept: {
          basicConfig: {
            ...defaultButtonUI.accept.basicConfig,
            showText: false,
          },
          loadingConfig: { 
            ...defaultButtonUI.accept.loadingConfig,
            showText: false,
          },
        },
        reject: {
          basicConfig: {
            ...defaultButtonUI.reject.basicConfig,
            showText: false,
          },
        },
      },
      connected: {
        ...defaultButtonUI,
        virtualBackground: {
          basicConfig: {
            ...initialStyle,
            color: 'transparent',
            iconSrc: VirtualBackgroundOpenSrc,
            shape: 'circle',
            showText: false,
          },
          closedConfig: {
            ...initialStyle,
            color: 'transparent',
            iconSrc: VirtualBackgroundCloseSrc,
            showText: false,
          },
        },
        hangup: {
          basicConfig: {
            ...defaultButtonUI.hangup.basicConfig,
            showText: false,
          },
          loadingConfig: {
            ...defaultButtonUI.hangup.loadingConfig,
            showText: false,
          },
        },
      }
    },
    audio: {
      calling: {
        ...defaultButtonUI,
        switchCamera: {
          basicConfig: {
            ...initialStyle,
            color: '#6b758a4d',
            iconSrc: SwitchCameraSrc,
            shape: 'circle',
          },
        },
        hangup: {
          basicConfig: {
            ...defaultButtonUI.hangup.basicConfig,
            showText: false,
          },
          loadingConfig: {
            ...defaultButtonUI.hangup.loadingConfig,
            showText: false,
          },
        },
        accept: {
          basicConfig: {
            ...defaultButtonUI.accept.basicConfig,
            showText: false,
          },
          loadingConfig: { 
            ...defaultButtonUI.accept.loadingConfig,
            showText: false,
          },
        },
        reject: {
          basicConfig: {
            ...defaultButtonUI.reject.basicConfig,
            showText: false,
          },
        },
      },
      accept: {
        ...defaultButtonUI,
        hangup: {
          basicConfig: {
            ...defaultButtonUI.hangup.basicConfig,
            showText: false,
          },
          loadingConfig: {
            ...defaultButtonUI.hangup.loadingConfig,
            showText: false,
          },
        },
        accept: {
          basicConfig: {
            ...defaultButtonUI.accept.basicConfig,
            showText: false,
          },
          loadingConfig: { 
            ...defaultButtonUI.accept.loadingConfig,
            showText: false,
          },
        },
        reject: {
          basicConfig: {
            ...defaultButtonUI.reject.basicConfig,
            showText: false,
          },
        },
      },
      connected: {
        ...defaultButtonUI,
        hangup: {
          basicConfig: {
            ...defaultButtonUI.hangup.basicConfig,
            showText: false,
          },
          loadingConfig: {
            ...defaultButtonUI.hangup.loadingConfig,
            showText: false,
          },
        },
        virtualBackground: {
          basicConfig: {
            ...initialStyle,
            color: 'transparent',
            iconSrc: VirtualBackgroundOpenSrc,
            shape: 'circle',
          },
          closedConfig: {
            ...initialStyle,
            color: 'transparent',
            iconSrc: VirtualBackgroundCloseSrc,
          },
        },
      }
    }
  },
};
export const PCUI = {
  singleCall: {
    video: {
      calling: defaultButtonUI,
      accept: defaultButtonUI,
      connected: defaultButtonUI,
    },
    audio: {
      calling: defaultButtonUI,
      accept: defaultButtonUI,
      connected: defaultButtonUI,
    },
  },
  groupCall: {
    video: {
      calling: defaultButtonUI,
      accept: defaultButtonUI,
      connected: defaultButtonUI,
    },
    audio: {
      calling: defaultButtonUI,
      accept: defaultButtonUI,
      connected: defaultButtonUI,
    },
  },
};

export const InitialUI = {
  pc: PCUI,
  mobile: MobileUI,
};
