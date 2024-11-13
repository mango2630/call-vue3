<template>
  <div :class="loadingContainerClassName" :style="[loadingContainerStyle]">
    <LoadingDot v-if="mode === 'dot'" :width="loadingWidth" :height="loadingHeight" :color="color" />
    <LoadingCircle v-else :width="loadingWidth" :height="loadingHeight" :color="color" />
    <div v-if="text" :class="loadingTextClassName">{{ text }}</div>
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
import { computed } from '../../../../adapter-vue';
import LoadingDot from './Dot/Dot.vue';
import LoadingCircle from './Circle/Circle.vue';
import { LoadingProps } from './Loading';
import { PREFIX } from '../constants/index';

const props = defineProps(LoadingProps);

const loadingContainerClassName = `${PREFIX}-loading ${PREFIX}-loading--${props.mode}`;
const loadingTextClassName = `${PREFIX}-loading_text`;

const loadingContainerStyle = computed(() => ({
  flexDirection: props.layout,
}));
</script>

<style lang="scss">
@import './style/Loading.scss';
</style>
