<template>
  <div :style="[style]" :class="buttonClassName" @click="handleClick">
    <Loading
      v-if="loading"
      :loadingWidth="loadingWidth"
      :loadingHeight="loadingHeight"
      :color="loadingColor"
    />
    <Icon v-if="iconSrc && !loading" :size="iconSize" :src="iconSrc"></Icon>
    <div
      v-if="text"
      :style="[buttonTextStyle]"
      :class="buttonTextClassName"
    >
      {{ text }}
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
import { computed } from '../../../../adapter-vue';
import Loading from '../Loading/Loading.vue';
import Icon from '../Icon/Icon.vue';
import { classNames, IS_PC } from '../util';
import { ButtonProps } from './Button';
import { PREFIX } from '../constants/index';

const props = defineProps(ButtonProps);
const buttonTextClassName = `${PREFIX}-button--content`;
const style = computed(() => ({
  width: props.width,
  height: props.height,
  backgroundColor: props.color,
  flexDirection: props.direction,
  cursor: IS_PC ? 'pointer' : 'auto',
  ...props.buttonStyle,
}));

const buttonClassName = classNames([
  `${PREFIX}-button`,
  {[`${PREFIX}-${props.shape}`]: props.shape},
   `${PREFIX}-button--${props.size}`
]);

const emit = defineEmits(['click']);
const handleClick = (event) => {
  !props.loading && emit('click', event);
};
</script>

<style lang="scss">
@import './style/Button.scss';
</style>
