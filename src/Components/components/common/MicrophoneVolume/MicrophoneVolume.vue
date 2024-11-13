<template>
  <div class="mic-container">
    <div class="mic-level-container">
      <div class="mic-level" :style="volumeLevelStyle"></div>
    </div>
    <Icon :src="iconSrc" />
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  }
}
</script>

<script setup lang="ts">
import Icon from '../../base/Icon/Icon.vue';
import MicOnIcon from '../../../assets/MicrophoneVolume/desktop/mic-on.svg';
import MicOffIcon from '../../../assets/MicrophoneVolume/desktop/mic-off.svg';
import { MicrophoneVolumeProps } from './MicrophoneVolume';
import { computed } from '../../../../adapter-vue';

const props = defineProps(MicrophoneVolumeProps);
const iconSrc = computed(() => props.isMuted ? MicOffIcon : MicOnIcon);

const volumeLevelStyle = computed(() => {
  if(props.isMuted || !props.volume) {
    return '';
  }
  return `height: ${props.volume * 4}%`;
});

</script>

<style lang="scss" scoped>
$volume-level-color: #27C39F;
.mic-container {
  position: relative;
  width: 24px;
  height: 24px;
  .mic-level-container {
    position: absolute;
    left: 6px;
    width: 8px;
    height: 14px;
    display: flex;
    flex-wrap: wrap;
    border-radius: 4px;
    overflow: hidden;
    flex-direction: column-reverse;
    justify-content: space-between;
    .mic-level {
      width: 100%;
      background-color: $volume-level-color;
      transition: height 0.2s;
    }
  }
}
</style>
