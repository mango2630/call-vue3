<template>
  <div :class="floatWindowClassName">
    <div
      v-show="!(isFloatWindow && callType === CallMediaType.AUDIO)"
      class="singlecall-video-float-content"
      @click="closeFloatWindow"
    >
      <slot></slot>
      <div class="float-window-tip-container">
        <TKText v-if="callStatus === CallStatus.CALLING && isFloatWindow" color="#FFF" size="12px">{{ t('wait to be called') }}</TKText>
      </div>
    </div>
    <div
      v-show="isFloatWindow && callType === CallMediaType.AUDIO"
      class="singlecall-audio-float-content"
      @click="closeFloatWindow"
    >
      <TKImage width="36px" height="36px" :src="earphoneSrc" />
      <Timer v-if="callStatus === CallStatus.CONNECTED" fontSize="12px" :callDuration="callDuration" color="#12b969" />
      <TKText v-if="callStatus === CallStatus.CALLING && isFloatWindow" color="#12b969" size="12px">{{ t('wait to be called') }}</TKText>
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
import { TUICallKitServer, CallMediaType, CallStatus } from '../../../../../TUICallService';
import TKImage from '../../../base/TKImage/TKImage.vue';
import Timer from '../../Timer/Timer.vue';
import TKText from '../../../base/TKText/TKText.vue';
import { useCallDuration, useCallInfoContext, useFloatWindowContext, useTranslate } from '../../../../hooks';
import { classNames } from '../../../base/util/classNames';
import earphoneSrc from '../../../../assets/floatingWindow/mobile/earphone.svg';

const { callType, callStatus } = toRefs(useCallInfoContext());
const { isFloatWindow } = toRefs(useFloatWindowContext());
const { callDuration } = useCallDuration();
const t = useTranslate();

const floatWindowClassName = computed(() => classNames([
  'float-window-container',
  {
    'singlecall-video-float': callType.value === CallMediaType.VIDEO && isFloatWindow.value,
    'singlecall-audio-float': callType.value === CallMediaType.AUDIO && isFloatWindow.value,
  }
]));

function closeFloatWindow() {
  isFloatWindow.value && TUICallKitServer.toggleMinimize();
}
</script>

<style lang="scss" scoped>
.singlecall-video-float {
  width: 110px;
  height: 196px;
  display: flex;
  z-index: 99;
  flex-direction: column;
  align-items: center;
  background: #000;
  border-radius: 12px;
  box-shadow: 0 0 10px #35394166;
  overflow: hidden;

  .singlecall-video-float-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .float-window-tip-container {
    position: absolute;
    bottom: 8px;
  }
}

.singlecall-audio-float {
  width: 72px;
  height: 72px;
  display: flex;
  z-index: 99;
  flex-direction: column;
  align-items: center;
  background: #FFF;
  border-radius: 12px;
  box-shadow: 0 0 10px #35394166;

  .singlecall-audio-float-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}
</style>