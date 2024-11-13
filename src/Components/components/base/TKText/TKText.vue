<template>
  <span :class="textClassName" :style="[style]" @click="handleClick">
    <slot></slot>
  </span>
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
import { TextProps } from './TKText';
import { PREFIX } from '../constants/index';
import { classNames, filterObject } from '../util';

const props = defineProps(TextProps);
const emit = defineEmits(['click']);
const textClassName = classNames([
  `${PREFIX}-text`,
  {[`${PREFIX}-text--line-clamp`]: props.lineClamp},
]);
const style = computed(() => (filterObject({
  maxWidth: props.width,
  fontSize: props.size,
  fontWeight: props.weight,
  color: props.color,
  textOverflow: props.truncated ? 'ellipsis' : 'auto',
  '-webkit-line-clamp': props.lineClamp,
  ...props.textStyle,
})));
const handleClick = () => {
  emit('click');
};
</script>

<style lang="scss">
@import './style/TKText.scss';
</style>
