<template>
  <div class="btn-content">
    <Button
      :loading="!isClickable"
      :loadingWidth="config.loadingWidth"
      :loadingHeight="config.loadingHeight"
      :iconSrc="config.iconSrc"
      :color="config.color"
      :iconSize="props.iconSize || config.iconSize"
      :width="props.width || config.width"
      :height="props.height || config.height"
      :shape="config.shape"
      @click="handleClick"
    />
    <TKText
      v-if="config.showText"
      :textStyle="config.textStyle"
      :color="config.textColor"
      :size="config.textSize"
    >
      {{ t('hangup') }}
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
import { computed } from '../../../../adapter-vue';
import { TUICallKitServer } from '../../../../TUICallService/index';
import Button from '../../base/Button/Button.vue';
import TKText from '../../base/TKText/TKText.vue';
import { ButtonProps } from './props/Button';
import { useBtnConfig } from './hooks/useConfig'
import { useIsClickableContext, useTranslate } from '../../../hooks';

const props = defineProps(ButtonProps);
const isClickable = useIsClickableContext();

const hangupState = computed(() => isClickable.value ? 'basicConfig' : 'loadingConfig');
const config = useBtnConfig('hangup', hangupState);
const t = useTranslate();

const handleClick = async () => {
  await TUICallKitServer.hangup();
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>
