<template>
  <div :class="classname" :style="[avatarStyle]">
    <TKImage v-if="avatarSrc" :fit="fit" :width="width" :height="height" :src="avatarSrc" @error="handleError" />
    <slot v-else />
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
import { computed, ref, watch } from '../../../../adapter-vue';
import TKImage from '../TKImage/TKImage.vue';
import { classNames } from '../util';
import { AvatarProps } from './Avatar';
import { PREFIX } from '../constants/index';

const props = defineProps(AvatarProps);

const avatarSrc = ref('');

watch(() => props.src, () => {
  avatarSrc.value = props.src;
}, {
  immediate: true,
});

const classname = computed(() => classNames([
  `${PREFIX}-avatar`,
  `${PREFIX}-avatar--${props.shape}`,
  `${PREFIX}-avatar--${props.size}`,
  props.customClass,
]));
const width = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size);
const height = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size);
const avatarStyle = computed(() => ({ width: width.value, height: height.value }));

function handleError(e) {
  console.error(e);
  if (props.defaultSrc) {
    avatarSrc.value = props.defaultSrc;
  }
}
</script>

<style lang="scss">
@import './style/Avatar.scss';
</style>