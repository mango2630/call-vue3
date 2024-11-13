<template>
  <div :class="popoverClassName" ref="popoverRef">
    <div
      ref="contentRef" 
      v-if="visible && show" 
      @mouseenter="clearTimer" 
      @mouseleave="handleMouseLeave" 
      :class="popoverContentClassName" 
      :style="[contentStyle]"
    >
      <slot name="content"></slot>
    </div>
    <div
      v-if="showArrow"
      :style="[arrowStyle]"
      :class="popoverArrowClassName"
    >
    </div>
    <div
      ref="triggerRef"
      :class="popoverTriggerClassName"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot name="trigger"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script setup lang="ts">
import { ref, nextTick, computed } from '../../../../../adapter-vue';
import { useOnClickOutSide } from '../../hooks/useOnClickOutSide';
import { calculatePosition } from '../utils/calculatePosition';
import { PopoverProps } from '../Popover';
import { PREFIX } from '../../constants/index';
import { filterObject } from '../../util';

const props = defineProps(PopoverProps);
const popoverClassName = `${PREFIX}-popover`;
const popoverContentClassName = `${PREFIX}-popover_content`;
const popoverArrowClassName = `${PREFIX}-popover_arrow`;
const popoverTriggerClassName = `${PREFIX}-popover_trigger`;
const popoverRef = ref();
const triggerRef = ref();
const contentRef = ref();
const visible = ref(false);
const hidePopoverTimeout = ref(null);
const showArrow = computed(() => visible.value && props.isShowArrow && props.show);
const initContentStyle = filterObject({ left: '0px', top: '0px', backgroundColor: props.color });
const contentStyle = ref(initContentStyle);
const commonBorder = `${props.arrowSize}px solid transparent`;
const initArrowStyle = {
  borderLeft: commonBorder,
  borderRight: commonBorder,
  borderTop: commonBorder,
  borderBottom: commonBorder,
  top: '0px',
  left: '0px',
};
const arrowStyle = ref(initArrowStyle);
const emit = defineEmits(['hover']);
const togglePopover = () => {
  nextTick(() => {
    if (!visible.value || !props.show) return;
    const triggerPosition = triggerRef.value.getBoundingClientRect?.();
    const contentPosition = contentRef.value.getBoundingClientRect?.();
    const { finalContentStyle, finalArrowStyle } = calculatePosition(triggerPosition, contentPosition, props, initContentStyle, initArrowStyle);
    contentStyle.value = { ...initContentStyle, ...finalContentStyle };
    arrowStyle.value = { ...initArrowStyle, ...finalArrowStyle };
  });
};
const clearTimer = () => {
  clearTimeout(hidePopoverTimeout.value);
};
const handleClick = () => {
  if (props.trigger !== 'click') return;
  visible.value = !visible.value;
  togglePopover();
};
const handleMouseEnter = () => {
  if (props.trigger !== 'hover') return;
  emit('hover');
  clearTimer();
  visible.value = true;
  togglePopover();
};
const handleMouseLeave = () => {
  if (props.trigger !== 'hover') return;
  hidePopoverTimeout.value = setTimeout(() => {
    visible.value = false;
    togglePopover();
  }, 1000);
};
useOnClickOutSide([popoverRef], () => {
  visible.value = false;
});
</script>

<style lang="scss">
@import '../style/Popover.scss';
</style>
