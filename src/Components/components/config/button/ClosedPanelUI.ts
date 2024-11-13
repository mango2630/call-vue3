import HangupSrc from '../../../assets/button/hangup.svg';
import CameraOpenSrc from '../../../assets/button/camera-open.svg';
import CameraCloseSrc from '../../../assets/button/camera-close.svg';
import MicrophoneOpenSrc from '../../../assets/button/microphone-open.svg';
import MicrophoneCloseSrc from '../../../assets/button/microphone-close.svg';
import SpeakerOpenSrc from '../../../assets/button/speaker-open.svg';
import SpeakerCloseSrc from '../../../assets/button/speaker-close.svg';
import UpSrc from '../../../assets/button/mobile/up.svg';
import { MobileUI } from './DefaultUI';

const initialStyle = {
  width: '40px',
  height: '40px',
  shape: 'circle',
  iconSize: 20,
  textColor: '#D5E0F2',
};

const closedButtonUI = {
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
  camera: {
    basicConfig: {
      ...initialStyle,
      color: '#FFFFFF',
      iconSrc: CameraOpenSrc,
    },
    closedConfig: {
      ...initialStyle,
      color: '#6b758a4d',
      iconSrc: CameraCloseSrc,
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
      loadingWidth: '20px',
      loadingHeight: '20px',
    },
  },
  toggleButtonPanel: {
    basicConfig: {
      color: 'transparent',
      width: '40px',
      height: '40px',
      shape: 'circle',
      iconSize: 40,
      iconSrc: UpSrc,
    },
  },
};

export const closedPanelUI = {
  mobile: {
    ...MobileUI,
    groupCall: {
      video: {
        ...MobileUI.groupCall.video,
        calling: {
          ...MobileUI.groupCall.video.calling,
          ...closedButtonUI,
        },
        connected: {
          ...MobileUI.groupCall.video.connected,
          ...closedButtonUI,
        },
      },
      audio: {
        ...MobileUI.groupCall.audio,
        calling: {
          ...MobileUI.groupCall.audio.calling,
          ...closedButtonUI,
        },
        connected: {
          ...MobileUI.groupCall.audio.connected,
          ...closedButtonUI,
        },
      },
    },
  },
};
