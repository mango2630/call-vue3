<template>
  <Button 
    :iconSrc="config.iconSrc"
    :iconSize="config.iconSize"
    @click="handleClick"
  >
  </Button>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script lang="ts" setup>
import { ref } from '../../../../adapter-vue';
import { TUICallKitServer } from '../../../../TUICallService/index';
import Button from '../../base/Button/Button.vue';
import { useBtnConfig } from './hooks/useConfig';

const config = useBtnConfig('minimize', ref('basicConfig'));
const handleClick = async () => {
  // @if process.env.BUILD_TARGET!='MINI'
  if (document?.fullscreenElement) {
    try {
      document?.exitFullscreen();
    } catch (error) {
      console.debug(error);
    }
  }
  // @endif
  await TUICallKitServer.toggleMinimize();
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>
