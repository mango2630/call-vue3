import { CallStatus, CallRole, CallMediaType } from '../../TUICallService';

export type TCallInfoContextValue = {
  callStatus?: CallStatus,
  callRole?: CallRole,
  callType?: CallMediaType,
  isGroupCall?: boolean,
  isEarPhone?: boolean,
  focusElement?: string | null,
  enableVirtualBackground?: boolean,
  isShowEnableVirtualBackground?: boolean,
  isMuteSpeaker?: boolean,
};

export const CallInfoContextKey = 'CallInfoContextKey';
