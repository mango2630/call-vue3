<template>
  <!-- @if process.env.BUILD_TARGET!='MINI' -->
  <PopoverWeb @hover='handleHover' v-bind="$props" v-if="!IN_WX_MINI_APP">
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #content>
      <slot name="content"></slot>
    </template>
  </PopoverWeb>
  <!-- @endif -->
  <PopoverWx v-bind="$props" v-if="IN_WX_MINI_APP">
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #content>
      <slot name="content"></slot>
    </template>
  </PopoverWx>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script setup lang="ts">
// @if process.env.BUILD_TARGET!='MINI'
import PopoverWeb from './PopoverWeb/PopoverWeb.vue';
// @endif
import PopoverWx from './PopoverWx/PopoverWx.vue';
import { IN_WX_MINI_APP } from '../util';
import { PopoverProps } from './Popover';

defineProps(PopoverProps);
const emit = defineEmits(['hover']);
const handleHover = () => {
  emit('hover');
};
</script>

