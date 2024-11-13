<template>
  <div
    :class="classname"
    :style="{
      width,
      marginLeft,
      paddingLeft,
      paddingRight,
    }">
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
import { classNames } from '../../util';
import { colProps } from './Col';
import { RowContextKey } from '../constant';
import { PREFIX } from '../../constants/index';

const props = defineProps(colProps);
const { gutter } = inject(RowContextKey, { gutter: computed(() => 0)});

const classname = classNames([
  `${PREFIX}-col`,
  `${PREFIX}-justify-${props.justify}`,
  `${PREFIX}-align-${props.align}`,
]);

const width = computed(() => `${props.span / 24 * 100}%`);
const marginLeft = computed(() => `${props.offset / 24 * 100}%`);
const paddingLeft = computed(() => `${gutter.value / 2}px`);
const paddingRight = paddingLeft;
</script>

<style lang="scss">
@import './style/Col.scss';
</style>
