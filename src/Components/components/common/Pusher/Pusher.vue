<template>
  <div v-show="show" :id="domId" class="pusher-container">
    <div v-show="showAudioStream" class="audio-stream-container">
      <slot name="audio-stream" />
    </div>
    <slot name="loading" />
    <div :class="streamInfoContainerClassName">
      <slot name="stream-info" />
    </div>
    <!-- @if process.env.BUILD_TARGET='MINI' -->
    <WXPusher v-if="pusherId === NAME.INITIAL_PUSHER" localClass="large-view" />
    <WXPusher v-if="pusherId === NAME.NEW_PUSHER" localClass="large-view" />
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
import { onMounted, ref, onUnmounted } from '../../../../adapter-vue';
import { StoreName, NAME, TUIStore } from '../../../../TUICallService/index';
import { TUIGlobal } from '../../../../TUICallService';
// @if process.env.BUILD_TARGET='MINI'
import WXPusher from './weChatPusher/weChatPusher.vue';
// @endif
import { classNames } from '../../base/util';
import { PusherProps } from './Pusher';

const pusherId = ref(TUIStore.getData(StoreName.CALL, NAME.PUSHER_ID));

const props = defineProps(PusherProps);

const streamInfoContainerClassName = classNames([
  'stream-info-container',
  { mobile: !TUIGlobal.isPC },
]);

const handleReloadPusher =(value) =>{
  pusherId.value = value;
};

const watchOptions = {
  [NAME.PUSHER_ID]: handleReloadPusher,
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, watchOptions, { notifyRangeWhenWatch: NAME.MYSELF });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});
</script>

<style lang="scss" scoped>
.pusher-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #4c515a;

  .audio-stream-container {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
  }

  .stream-info-container {
    position: absolute;
    bottom: 0;
    z-index: 3;
    width: 100%;

    &.mobile {
      margin-bottom: 8px;
    }
  }
}
</style>
