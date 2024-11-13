<template>
  <TKImage :src="src" :width="width" :height="height"></TKImage>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script setup lang="ts">
import { computed } from '../../../../adapter-vue';
import { IconProps } from './Icon';
import TKImage from '../TKImage/TKImage.vue';

const props = defineProps(IconProps);
const width = computed(() => `${props.size}px`);
const height = computed(() => `${props.size}px`);
</script>
