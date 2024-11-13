<template>
  <div class="btn-content">
    <Button
      :iconSrc="config.iconSrc"
      :color="config.color"
      :iconSize="props.iconSize || config.iconSize"
      :width="props.width || config.width"
      :height="props.height || config.height"
      :shape="config.shape"
      :loading="!clickAble"
      :loadingWidth="config.loadingWidth"
      :loadingHeight="config.loadingHeight"
      @click="handleClick"
    >
    </Button>
    <TKText 
      v-if="config.showText"
      :textStyle="config.textStyle"
      :color="config.textColor"
      :size="config.textSize"
    >
      {{ t('accept') }}
    </TKText>
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script lang="ts" setup>
import { ref, computed } from '../../../../adapter-vue';
import { TUICallKitServer, t } from '../../../../TUICallService/index';
import Button from '../../base/Button/Button.vue';
import TKText from '../../base/TKText/TKText.vue';
import { ButtonProps } from './props/Button';
import { useBtnConfig } from './hooks/useConfig';
import { useTranslate } from '../../../hooks';

const clickAble = ref(true);
const props = defineProps(ButtonProps);
const configState = computed(() => {
  if (!clickAble.value) {
    return 'loadingConfig';
  }

  return 'basicConfig';
});
const config = useBtnConfig('accept', configState);
const t = useTranslate();

const handleClick = async () => {
  clickAble.value = false;
  await TUICallKitServer.accept();
  clickAble.value = true;
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>

