<template>
  <div :class="floatWindowClassName">
    <div v-if="isFloatWindow" class="click-container" @click.capture.stop="closeFloatWindow" />
    <div class="stream-container">
      <div class="video">
        <slot />
      </div>
      <div v-show="isFloatWindow" class="audio">
        <TKImage width="36px" height="36px" :src="earphoneSrc" />
        <Timer v-if="callStatus === CallStatus.CONNECTED" fontSize="12px" :callDuration="callDuration" color="#12b969" />
        <TKText v-if="callStatus === CallStatus.CALLING" size="12px" color="#12b969">{{ t('wait to be called') }}</TKText>
      </div>
    </div>
    <div v-show="isFloatWindow" class="device-status">
      <TKImage width="16px" height="16px" :src="microphoneSrc" />
      <TKImage width="16px" height="16px" :src="cameraSrc" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
}
</script>

<script lang="ts" setup>
import { toRefs, computed } from '../../../../../adapter-vue';
import { TUICallKitServer } from '../../../../../TUICallService';
import TKImage from '../../../base/TKImage/TKImage.vue';
import Timer from '../../Timer/Timer.vue';
import TKText from '../../../base/TKText/TKText.vue';
import {
  useCallDuration,
  useCallInfoContext,
  useFloatWindowContext,
  useUserInfoExcludeVolumeContext,
  useTranslate,
} from '../../../../hooks';
import { classNames } from '../../../base/util/classNames';
import { CallStatus } from '../../../../../TUICallService';
import earphoneSrc from '../../../../assets/floatingWindow/mobile/earphone.svg';
import microphoneOpenSrc from '../../../../assets/floatingWindow/mobile/microphone-open.svg';
import cameraOpenSrc from '../../../../assets/floatingWindow/mobile/camera-open.svg';
import microphoneCloseSrc from '../../../../assets/floatingWindow/mobile/microphone-close.svg';
import cameraCloseSrc from '../../../../assets/floatingWindow/mobile/camera-close.svg';

const { isFloatWindow } = toRefs(useFloatWindowContext());
const { callDuration } = useCallDuration();
const { localUserInfoExcludeVolume } = toRefs(useUserInfoExcludeVolumeContext());
const { callStatus } = toRefs(useCallInfoContext());
const t = useTranslate();

const microphoneSrc = computed(() => localUserInfoExcludeVolume.value.isAudioAvailable ? microphoneOpenSrc : microphoneCloseSrc);
const cameraSrc = computed(() => localUserInfoExcludeVolume.value.isVideoAvailable ? cameraOpenSrc : cameraCloseSrc);

const floatWindowClassName = computed(() => classNames([
  'groupcall-video-float',
  {
    'not-float': !isFloatWindow.value,
    float: isFloatWindow.value,
   },
]));

function closeFloatWindow() {
  isFloatWindow.value && TUICallKitServer.toggleMinimize();
}
</script>

<style lang="scss" scoped>
.click-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.groupcall-video-float {
  &.float {
    width: 72px;
    height: 90px;
    display: flex;
    flex-direction: column;
    display: flex;
    z-index: 99;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0 0 10px #35394166;
    box-sizing: border-box;
    overflow: hidden;

    .stream-container {
      position: relative;
      width: 72px;
      height: 70px;
    }

    .video {
      width: 72px;
      height: 70px;
      position: absolute;
    }
    .audio {
      position: absolute;
      width: 100%;
      height: 70px;
      padding-top: 10px;
      background-color: #FFF;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .device-status {
      width: 100%;
      height: 20px;
      background-color: #f9f6f4;
      display: flex;
      position: relative;
      justify-content: space-around;
    }
  }

  &.not-float {
    width: 100%;
    height: 100%;

    .stream-container {
      height: 100%;

      .video {
        height: 100%;
      }
    }
  }
  
}
</style>