<template>
  <div :style="{ height: '100%'}">
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
import { provide, watch, ref } from '../../../../adapter-vue';
import { ChangeFocusEmits, GridContextKey, GridProps } from './Grid';

const props = defineProps(GridProps);
const focus = ref(props.focus);
const layout = ref(props.layout);
const unit = ref(props.unit);
const emit = defineEmits(ChangeFocusEmits);

function handleFocusChange(value) {
  emit('toggle', value);
}

watch(() => props.focus, () => focus.value = props.focus);
watch(() => props.layout, () => layout.value = props.layout);
watch(() => props.unit, () => unit.value = props.unit);

provide(GridContextKey, {
  layout,
  enableFocus: props.enableFocus,
  handleFocusChange,
  focus,
  unit,
});
</script>
