<template>
  <div v-show="show" :id="domId" class="player-container">
    <div v-show="showAudioStream" class="audio-stream-container">
      <slot name="audio-stream" />
    </div>
    <slot name="loading" />
    <div :class="streamInfoContainerClassName">
      <slot name="stream-info" />
    </div>
    <!-- @if process.env.BUILD_TARGET='MINI' -->
    <WXPlayer :dom-id="domId" v-if="TUIGlobal.isWeChat" remoteClass="small-view" />
    <!-- @endif -->
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
import { TUIGlobal } from '../../../../TUICallService';
// @if process.env.BUILD_TARGET='MINI'
import WXPlayer from './weChatPlayer/weChatPlayer.vue';
// @endif
import { classNames } from '../../base/util';
import { PlayerProps } from './Player';

defineProps(PlayerProps);

const streamInfoContainerClassName = classNames([
  'stream-info-container',
  { mobile: !TUIGlobal.isPC },
]);
</script>

<style lang="scss" scoped>
.player-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #4c515a;

  .audio-stream-container {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .stream-info-container {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;

    &.mobile {
      margin-bottom: 8px;
    }
  }
}
</style>
