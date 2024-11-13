<template>
  <div :class="dotContainerClassName" :style="[dotContainerStyle]">
    <div :class="dotClassName" :style="[dotStyle]" />
    <div :class="dotClassName" :style="[dotStyle]" />
    <div :class="dotClassName" :style="[dotStyle]" />
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
import { computed } from '../../../../../adapter-vue';
import { LoadingDotProps } from './Dot';
import { PREFIX } from '../../constants';

const props = defineProps(LoadingDotProps);

const dotContainerClassName = `${PREFIX}-loading_dot-container`;
const dotClassName = `${PREFIX}-loading_dot`

const dotContainerStyle = computed(() => ({
  width: props.width,
  height: props.height,
}));

const dotStyle = computed(() => {
  const style = {};
  if (props.color) {
    style.backgroundColor = props.color;
  }

  return style;
});
</script>

<style lang="scss">
@import './style/Dot.scss';
</style>
