<template>
  <div :class="toggleWindowContainerClassName">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
}
</script>

<script setup lang="ts">
import { watch, provide, toRef, ref } from '../../../../adapter-vue';
import { ToggleWindowProps, ToggleWindowEmits } from './ToggleWindow';
import { ToggleWindowContextKey } from './constant';
import { PREFIX } from '../constants/index';

const props = defineProps(ToggleWindowProps);
const emit = defineEmits(ToggleWindowEmits);

const currentBigWindow = ref(props.bigWindow);
const toggleWindowContainerClassName = `${PREFIX}-toggle-window`;
const toggleWindow = (value) => {
  currentBigWindow.value = value;
  emit('toggle', value);
};

watch(() => props.bigWindow, () => {  
  currentBigWindow.value = props.bigWindow;
});

provide(ToggleWindowContextKey, {
  bigWindow: currentBigWindow,
  toggleWindow,
  smallWindowWidth: toRef(props, 'smallWindowWidth'),
  smallWindowHeight: toRef(props, 'smallWindowHeight'),
  showSmallWindow: toRef(props, 'showSmallWindow'),
});
</script>

<style lang="scss">
@import './style/ToggleWindow.scss';
</style>
