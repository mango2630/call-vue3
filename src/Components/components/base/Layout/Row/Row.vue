<template>
  <div :class="classname" :style="[customStyle]" >
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
import { provide, computed } from '../../../../../adapter-vue';
import { rowProps } from './Row';
import { classNames } from '../../util';
import { RowContextKey } from '../constant';
import { PREFIX } from '../../constants/index';

const props = defineProps(rowProps);
const gutter = computed(() => props.gutter);

provide(RowContextKey, {
  gutter,
});

const classname = classNames([
  `${PREFIX}-row`,
  `${PREFIX}-justify-${props.justify}`,
  `${PREFIX}-align-${props.align}`,
]);
</script>

<style lang="scss">
@import './style/Row.scss';
</style>
