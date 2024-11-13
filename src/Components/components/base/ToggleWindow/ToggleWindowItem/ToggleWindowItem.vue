<template>
  <div
    :class="classname"
    :style="[windowItemStyle]"
    @click="() => toggleWindow(value)"
  >
    <slot />
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
import { computed, inject } from '../../../../../adapter-vue';
import { ToggleWindowItemProps } from './ToggleWindowItem';
import { ToggleWindowContextKey } from '../constant';
import { classNames, IS_PC } from '../../util';
import { PREFIX } from '../../constants/index';

const props = defineProps(ToggleWindowItemProps);

const {
  bigWindow,
  toggleWindow,
  smallWindowWidth, 
  smallWindowHeight,
  showSmallWindow,
} = inject(ToggleWindowContextKey);
const classname = computed(() => classNames([
  `${PREFIX}-toggle-window-item`,
  `${PREFIX}-toggle-window-item--${bigWindow.value === props.value ? 'big' : 'small'}`,
  {
    pc: IS_PC,
    mobile: !IS_PC,
  },
]));

const windowItemStyle = computed(() => {
  let style: any = {};
  if (bigWindow.value !== props.value) {
    style = { width: smallWindowWidth.value, height: smallWindowHeight.value };
    
    if (!showSmallWindow.value) {
      style.visibility = 'hidden';
    } else {
      style.visibility = '';
    }
  }

  return style;
});
</script>

<style lang="scss">
@import './style/ToggleWindowItem.scss';
</style>
