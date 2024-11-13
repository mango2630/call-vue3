<template>
  <div
    v-if="show"
    :class="overlayContainerClassName"
    :style="[overlayStyle]"
    @click="handleClick"
  >
    <div :class="maskContainerClassName">
      <div
        v-if="showMask"
        :class="maskClassName"
        :style="[maskStyle]"
      />
      <TKImage 
        v-if="showBackgroundImage" 
        :fit="fit" 
        :src="bgImage" 
        width="100%" 
        height="100%" 
        :defaultSrc="defaultSrc" 
        @error="handleError" 
      />
    </div>
    <div :class="slotClassName">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
}
</script>

<script setup lang="ts">
import { computed } from '../../../../adapter-vue';
import TKImage from '../TKImage/TKImage.vue';
import { OverlayProps, OverlayEmits } from './Overlay';
import { classNames } from '../util';
import { PREFIX } from '../constants/index';

const props = defineProps(OverlayProps);
const emit = defineEmits(OverlayEmits);

const overlayContainerClassName = classNames([
  `${PREFIX}-overlay`,
  props.customClass,
]);
const maskContainerClassName = `${PREFIX}-overlay_mask-container`;
const maskClassName = computed(() => classNames([
  `${PREFIX}-overlay_mask`,
  { [`${PREFIX}-blur`]: props.blur },
]));
const slotClassName = `${PREFIX}-overlay_slot`;
const overlayStyle = computed(() => ({ zIndex: props.zIndex, ...props.customStyle }));
const maskStyle = computed(() => (
  {
    backgroundColor: props.bgColor,
    ...props.customMaskStyle,
  }
));
function handleClick() {
  emit('click');
}
const handleError = (event) => {
  emit('error', event);
}
</script>

<style lang="scss">
@import './style/Overlay.scss';
</style>
