<template>
  <div
    v-if="show"
    :class="gridItemClassName"
    :style="[style]"
    @click="handleClick"
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
import { inject, computed, ref, watchEffect, watch, onUnmounted } from '../../../../../adapter-vue';
import { GridContextKey } from '../Grid';
import { PREFIX } from '../../constants/index';
import { IS_PC, IS_H5, classNames, findTarget } from '../../util';

const props = defineProps(['index', 'height', 'customStyle']);
const {
  layout,
  enableFocus,
  handleFocusChange,
  focus,
  unit,
} = inject(GridContextKey);

const colWidth = 100 / 12;
const rowHeight = colWidth;
const style = ref({});
const gridItemClassName = classNames([
  `${PREFIX}-grid-item`,
  {
    pc: IS_PC,
    mobile: !IS_PC,
    h5: IS_H5,
  },
]);

const handleClick = () => {
  const value = String(props.index) === String(focus.value) ? null : props.index;
  enableFocus && handleFocusChange(value);
};

const show = computed(() => !!findTarget(layout.value, { key: 'i', value: props.index}));

watchEffect(() => {
  const target = findTarget(layout.value, { key: 'i', value: props.index});

  if (!target) return;
  
  const { x, y, w, h, customStyle, customProps } = target;
  style.value = {
    width: w * colWidth + unit.value,
    height: props.height || h * rowHeight + unit.value,
    left: x * colWidth + unit.value,
    top: y * rowHeight + unit.value,
    position: 'absolute',
    visibility: customProps?.show === false ? 'hidden' : '',
    ...props.customStyle,
    ...customStyle,
  };  
});

onUnmounted(() => {
  if (String(props.index) === String(focus.value)) {
    enableFocus && handleFocusChange(null);
  }
});
</script>

<style lang="scss">
@import './style/GridItem.scss';
</style>
