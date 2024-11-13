<template>
  <span :style="[timerStyle]">{{ callDuration }}</span>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
}
</script>

<script lang="ts" setup>
import { computed } from '../../../../adapter-vue';
import { TimerProps } from './Timer';

const props = defineProps(TimerProps);

const timerStyle = computed(() => ({
  color: props.color,
  fontSize: props.fontSize,
}));
</script>

