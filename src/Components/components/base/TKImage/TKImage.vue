<template>
  <div :class="classname" :style="[imgStyle]">
    <template v-if="hasLoadError && !defaultSrc">
      <slot name="error" />
    </template>
    <template v-else>
      <img
        v-if="!IN_WX_MINI_APP"
        :class="imageClassName"
        :src="imgSrc"
        :style="{ objectFit }"
        @error="handleError"
      />
      <image
        v-if="IN_WX_MINI_APP"
        :class="imageClassName"
        :src="imgSrc"
        :mode="objectFit"
        @error="handleError"
      />
    </template>
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
import { ref, computed, watch } from '../../../../adapter-vue';
import { IN_WX_MINI_APP, classNames } from '../util';
import { ImageProps, MiniProgramImageFitMap, imageEmits } from './TKImage';
import { PREFIX } from '../constants/index';

const props = defineProps(ImageProps);
const emit = defineEmits(imageEmits);
const hasLoadError = ref(false);
const imgSrc = ref(props.src);

watch(() => props.src, () => {
  hasLoadError.value = false;
  imgSrc.value = props.src;
});

const classname = computed(() => classNames([`${PREFIX}-image`]));
const imgStyle = computed(() => {
  return {
    "width": props.width,
    "height": props.height,
    ...props.customStyle,
  }
})
const imageClassName = computed(() => classNames([
  `${PREFIX}-image_inner`,
]));
const objectFit = computed(() => {
  if (IN_WX_MINI_APP) {
    return MiniProgramImageFitMap[props.fit] || MiniProgramImageFitMap.cover;
  } else {
    return props.fit;
  }
});

function handleError(e) {
  hasLoadError.value = true;
  imgSrc.value = props.defaultSrc;
  emit('error', e);
}
</script>

<style lang="scss">
@import './style/TKImage.scss';
</style>