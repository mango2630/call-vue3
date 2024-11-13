<template>
  <div v-if="callInfoContextValue.callStatus !== CallStatus.IDLE" :style="[{ visibility: floatWindowContextValue.isFloatWindow ? 'hidden' : '' }]" id="tuicallkit-id" :class="[bodyStyle, miniMizedDeskStyle, mobileVideoStyle, mobileAudioStyle]">
    <SingleCall v-if="!callInfoContextValue.isGroupCall" class="singCall"></SingleCall>
    <GroupCall v-else class="singCall"></GroupCall>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, onUnmounted, toRefs, watchEffect, provide } from '../adapter-vue';
import SingleCall from './components/SingleCall/SingleCall.vue';
import GroupCall from './components/GroupCall/GroupCall.vue';
// @if process.env.BUILD_TARGET!='MINI'
import { PermitTip } from './components/common/PermitTip/PermitTip';
import { Toast } from './components/common/Toast';
// @endif
import { TUIGlobal, TUIStore, StoreName, TUICallKitServer, NAME, CallStatus, CallMediaType } from '../TUICallService/index';
import {
  CallInfoContextKey,
  CallerUserInfoContextKey,
  UserInfoExcludeVolumeContextKey,
  FloatWindowContextKey,
  TCallerUserInfoValue,
  TFloatWindowContextValue,
  CustomUIConfigContextKey,
  translateContextKey,
} from './context';
import { isEmpty } from './util/isEmpty';
const isMobile = !TUIGlobal.isPC;
const bodyStyle = isMobile ? 'TUICallKit-mobile transition-animation' : 'TUICallKit-desktop';
const miniMizedDeskStyle = ref('');
const mobileAudioStyle = ref('');
const mobileVideoStyle = ref('');
const isShowFloatWindow = ref(false);
const props = withDefaults(
  defineProps<{
    beforeCalling?: (...args: any[]) => void;
    afterCalling?: (...args: any[]) => void;
    onMinimized?: (...args: any[]) => void;
    onMessageSentByMe?: (...args: any[]) => void;
    kickedOut?: (...args: any[]) => void;
    statusChanged?: (...args: any[]) => void;
    allowedMinimized?: boolean;
    allowedFullScreen?: boolean;
    videoDisplayMode?: string;
    videoResolution?: string;
  }>(),
  {
    allowedMinimized: false,
    allowedFullScreen: true,
    videoDisplayMode: 'cover',
    videoResolution: '480p',
  },
);

const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const callRole = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_ROLE));
const callType = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
const isGroupCall = ref(TUIStore.getData(StoreName.CALL, NAME.IS_GROUP));
const isEarPhone = ref(TUIStore.getData(StoreName.CALL, NAME.IS_EAR_PHONE));
const focusElement = ref(null);
const localUserInfoExcludeVolume = ref(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN));
const remoteUserListExcludeVolume = ref(TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST));
const callerUserInfo = ref(TUIStore.getData(StoreName.CALL, NAME.CALLER_USER_INFO));
const isFloatWindow = ref(TUIStore.getData(StoreName.CALL, NAME.IS_MINIMIZED));
const enableVirtualBackground = ref(TUIStore.getData(StoreName.CALL, NAME.ENABLE_VIRTUAL_BACKGROUND));
const isShowEnableVirtualBackground = ref(TUIStore.getData(StoreName.CALL, NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND));
const customUIConfigContextValue = ref(TUIStore.getData(StoreName.CALL, NAME.CUSTOM_UI_CONFIG));
const isMuteSpeaker = ref(TUIStore.getData(StoreName.CALL, NAME.IS_MUTE_SPEAKER));
const translate = ref(TUIStore.getData(StoreName.CALL, NAME.TRANSLATE));
const callInfoContextValue = reactive({
  callStatus,
  callRole,
  callType,
  isGroupCall,
  isEarPhone,
  focusElement,
  allowedFullScreen: props.allowedFullScreen,
  enableVirtualBackground,
  isShowEnableVirtualBackground,
  isMuteSpeaker,
});
const callerUserInfoValue: TCallerUserInfoValue = reactive({ callerUserInfo });
const userInfoExcludeVolumeContextValue = reactive({
  localUserInfoExcludeVolume,
  remoteUserListExcludeVolume,
});
const floatWindowContextValue: TFloatWindowContextValue = reactive({ isFloatWindow });
const translateContextValue = ref(translate);

const {
  beforeCalling,
  afterCalling,
  onMinimized,
  onMessageSentByMe,
  videoDisplayMode,
  videoResolution,
  kickedOut,
  statusChanged,
  allowedMinimized,
} = toRefs(props);

const handleCallStatusChange = (value) => {
  callInfoContextValue.callStatus = value;
};
const handleIsGroupChange = (value) => {
  callInfoContextValue.isGroupCall = value;
};
const handleToastInfoChange = (value) => {
  if (typeof value === 'object') {
    const { content, type = 'info' } = value;
    !isEmpty(content) && showToast(translate.value(content), type);
  }
};

const handleCallMediaTypeChange = (value) => {
  callInfoContextValue.callType = value;
  if (isMobile && isShowFloatWindow.value) {
    mobileVideoStyle.value = 'miniMized-mobile-audio';
    mobileAudioStyle.value = '';
  } 
  
  if (isMobile && !isShowFloatWindow.value) {
    mobileAudioStyle.value = 'mobile-audio';
  }
};

const handleIsMinimizedChange = (value) => {
  floatWindowContextValue.isFloatWindow = value;
  // 开启悬浮窗
  if (value) {
    if (!isMobile) {
      miniMizedDeskStyle.value = 'miniMized';
    } else {
      if (callInfoContextValue.callType === CallMediaType.AUDIO) {
        mobileAudioStyle.value = 'miniMized-mobile-audio';
      } else {
        mobileVideoStyle.value = 'miniMized-mobile-video';
      }
    }
  } else {
    // 关闭悬浮窗
    mobileAudioStyle.value = 'mobile-audio';
    miniMizedDeskStyle.value = '';
    mobileVideoStyle.value = '';
  }
};

const handlePermissionErrorTipChange = (data) => {
  // @if process.env.BUILD_TARGET!='MINI'
  if (data && TUIGlobal.isPC) {
    try {
      PermitTip.show();
    } catch (error) {
      console.debug(error);
    }
  }
  // @endif
};
const handleCallRoleChange = (value) => {
  callInfoContextValue.callRole = value;
};
const handleLocalUserInfoChange = (value) => {
  userInfoExcludeVolumeContextValue.localUserInfoExcludeVolume = value;
};
const handleRemoteUserInfoListChange = (value) => {
  userInfoExcludeVolumeContextValue.remoteUserListExcludeVolume = value;
};
const handleCallerUserInfoChange = (value) => {
  callerUserInfoValue.callerUserInfo = value;
};
const handEarPhoneChange = (value) => {
  callInfoContextValue.isEarPhone = value;
};
const handleEnableVirtualBackgroundChange = (value) => {
  callInfoContextValue.enableVirtualBackground = value;
};
const handleIsShowEnableVirtualBackgroundChange = (value) => {
  callInfoContextValue.isShowEnableVirtualBackground = value;
};
const handleCustomUIConfigChange = (value) => {
  customUIConfigContextValue.value = value;
};
const handleMuteSpeakerChange = (value) => {
  callInfoContextValue.isMuteSpeaker = value;
};
const handleTranslateChange = (value) => {
  translate.value = value;
};

watchEffect(() => {
  TUICallKitServer.setCallback({
    beforeCalling: beforeCalling && beforeCalling.value,
    afterCalling: afterCalling && afterCalling.value,
    onMinimized: onMinimized && onMinimized.value,
    onMessageSentByMe: onMessageSentByMe && onMessageSentByMe.value,
    kickedOut: kickedOut && kickedOut.value,
    statusChanged: statusChanged && statusChanged.value,
  });
});

const watchOptions = {
  [NAME.CALL_STATUS]: handleCallStatusChange,
  [NAME.IS_GROUP]: handleIsGroupChange,
  [NAME.TOAST_INFO]: handleToastInfoChange,
  [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
  [NAME.SHOW_PERMISSION_TIP]: handlePermissionErrorTipChange,
  [NAME.CALL_ROLE]: handleCallRoleChange,
  [NAME.LOCAL_USER_INFO_EXCLUDE_VOLUMN]: handleLocalUserInfoChange,
  [NAME.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST]: handleRemoteUserInfoListChange,
  [NAME.CALLER_USER_INFO]: handleCallerUserInfoChange,
  [NAME.IS_EAR_PHONE]: handEarPhoneChange,
  [NAME.ENABLE_VIRTUAL_BACKGROUND]: handleEnableVirtualBackgroundChange,
  [NAME.IS_SHOW_ENABLE_VIRTUAL_BACKGROUND]: handleIsShowEnableVirtualBackgroundChange,
  [NAME.CUSTOM_UI_CONFIG]: handleCustomUIConfigChange,
  [NAME.IS_MUTE_SPEAKER]: handleMuteSpeakerChange,
  [NAME.TRANSLATE]: handleTranslateChange,
};

onMounted(() => {
  if(allowedMinimized.value){
    TUICallKitServer.enableFloatWindow(allowedMinimized.value)
  }
  TUICallKitServer.setVideoDisplayMode(videoDisplayMode.value as any);
  TUICallKitServer.setVideoResolution(videoResolution.value as any);
  TUIStore.watch(
    StoreName.CALL,
    watchOptions,
    {
      notifyRangeWhenWatch: NAME.MYSELF,
    },
  );
  TUIStore.watch(StoreName.CALL, {
    [NAME.IS_MINIMIZED]: handleIsMinimizedChange,
  });
});

function showToast(value: string, type: string) {
  switch (type) {
    case 'info':
      // @if process.env.BUILD_TARGET='MINI'
      uni.showToast({
        title: value,
        icon: 'none',
      });
      // @endif
      // @if process.env.BUILD_TARGET!='MINI'
      Toast?.info(value as any);
      // @endif
      break;
    case 'error':
      // @if process.env.BUILD_TARGET!='MINI'
      Toast?.error(value as any);
      // @endif
      break;
    default:
      break;
  }
}

onUnmounted(async () => {
  TUIStore.unwatch(StoreName.CALL, {
    ...watchOptions,
    [NAME.IS_MINIMIZED]: handleIsMinimizedChange,
  });
  // @if process.env.BUILD_TARGET='MINI'
  await TUICallKitServer.handleExceptionExit();
  // @endif
});

provide(CallInfoContextKey, callInfoContextValue);
provide(CallerUserInfoContextKey, callerUserInfoValue);
provide(UserInfoExcludeVolumeContextKey, userInfoExcludeVolumeContextValue);
provide(FloatWindowContextKey, floatWindowContextValue);
provide(CustomUIConfigContextKey, customUIConfigContextValue);
provide(translateContextKey, translateContextValue);
</script>

<style lang="scss">
.TUICallKit-mobile {
  // @if process.env.BUILD_TARGET!='MINI'
  width: 100%;
  height: 100%;
  // @endif

  // @if process.env.BUILD_TARGET='MINI'
  width: 100vw;
  height: 100vh;
  // @endif

  .singCall {
    // @if process.env.BUILD_TARGET!='MINI'
    width: 100%;
    height: 100%;
    // @endif

    // @if process.env.BUILD_TARGET='MINI'
    width: 100vw;
    height: 100vh;
    // @endif
  }
}

.transition-animation {
  transform: translateY(-100%);
  animation: slideInDown 0.5s ease forwards;
}

@keyframes slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.TUICallKit-desktop {
  margin: 0 auto;
  position: relative;
  position: relative;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  z-index: 12;
  border-radius: 16px;

  .singCall {
    width: 100%;
    height: 100%;
  }
}

.mobile-audio {
  background-color: white;
}

.miniMized {
  width: 168px !important;
  height: 56px !important;
  overflow: visible !important;
}

.miniMized-mobile-audio {
  width: 72px;
  height: 72px;
  position: fixed;
  top: 40px;
  right: 40px;
}

.miniMized-mobile-video {
  width: 40%;
  height: 30%;
  position: fixed;
  top: 40px;
  right: 40px;
}
</style>
