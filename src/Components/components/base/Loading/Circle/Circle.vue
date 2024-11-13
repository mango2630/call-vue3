<template>
  <div :class="circleContainerClassName" :style="[circleContainerStyle]"></div>
</template>

<script setup lang="ts">
import { computed } from '../../../../../adapter-vue';
import { LoadingCircleProps } from './Circle';
import { PREFIX } from '../../constants';

const props = defineProps(LoadingCircleProps);
const circleContainerStyle = computed(() => {
  const style = {
    width: props.width,
    height: props.height,
  };

  if (props.color) {
    style['--tk-loading-primary-color'] = props.color;
  }

  return style;
});
const circleContainerClassName = `${PREFIX}-loading_circle-container`;
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  }
}
</script>

<style lang="scss">
@import './style/Circle.scss';
</style>
