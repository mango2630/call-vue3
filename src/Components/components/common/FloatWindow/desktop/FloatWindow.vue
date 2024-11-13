<template>
  <div class="float-window-container">
    <div v-show="isFloatWindow" class="float-control-panel">
      <div  class="float-control-item-icon">
      <div class="float-control-item-icon-container" @click="hangup">
        <img :src="FloatCallEnd" />
      </div>
    </div>
    <div v-show="isFloatWindow"  class="float-control-item-icon">
      <div class="float-control-item-icon-container" @click="toggleMicrophone">
        <img v-if="localUserInfo.isAudioAvailable" :src="FloatMicrophoneSVG" />
        <img v-else :src="FloatMicrophoneClosedSVG" />
      </div>
    </div>
    <div v-show="isFloatWindow"  class="float-control-item-icon">
      <div class="float-control-item-icon-container" @click="toggleMinimize">
        <img :src="FloatFullScreenSVG" />
      </div>
    </div>
    </div>
    <div v-show="!isFloatWindow">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script lang="ts" setup>
import { toRefs } from '../../../../../adapter-vue';
import { TUICallKitServer, CallRole, CallStatus } from '../../../../../TUICallService/index';
import FloatCallEnd from '../../../../assets/desktop/floatCallEnd.svg';
import FloatMicrophoneSVG from '../../../../assets/desktop/floatMicrophone.svg';
import FloatMicrophoneClosedSVG from '../../../../assets/desktop/floatMicrophoneClosed.svg';
import FloatFullScreenSVG from '../../../../assets/desktop/floatFullScreen.svg';
import { useUserInfoExcludeVolumeContext, useCallInfoContext, useFloatWindowContext } from '../../../../hooks';
const { localUserInfoExcludeVolume: localUserInfo } = toRefs(useUserInfoExcludeVolumeContext());
const { callRole, callStatus } = toRefs(useCallInfoContext());
const { isFloatWindow } = toRefs(useFloatWindowContext());

function toggleMinimize() {
  TUICallKitServer.toggleMinimize();
};

async function hangup() {
  if (callRole.value === CallRole.CALLEE && callStatus.value === CallStatus.CALLING) {
    await TUICallKitServer.reject();
  } else {
    await TUICallKitServer.hangup();
  }
};

async function toggleMicrophone() {
  if (localUserInfo.value.isAudioAvailable) {
    await TUICallKitServer.closeMicrophone();
  } else {
    await TUICallKitServer.openMicrophone();
  }
};
</script>

<style scoped>
.float-control-panel {
  width: 168px;
  height: 56px;
  background: white;
  z-index: 13;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.float-control-item-icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  position: relative;
}

.float-control-item-icon-container {
  border-radius: 40px;
  width: 40px;
  height: 40px;
  margin: 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.float-control-item-icon-container:hover {
  background: rgba(218, 218, 218, 0.3);
}
</style>
