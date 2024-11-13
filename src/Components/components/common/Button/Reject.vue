<template>
  <div class="btn-content">
    <Button
      :iconSrc="config.iconSrc"
      :color="config.color"
      :iconSize="config.iconSize"
      :width="props.width || config.width"
      :height="props.height || config.height"
      :shape="config.shape"
      @click="handleClick"
    >
    </Button>
    <TKText
      v-if="config.showText"
      :textStyle="config.textStyle"
      :color="config.textColor"
      :size="config.textSize"
    >
      {{ t('reject') }}
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
import { ref } from '../../../../adapter-vue';
import { TUICallKitServer } from '../../../../TUICallService/index';
import Button from '../../base/Button/Button.vue';
import TKText from '../../base/TKText/TKText.vue';
import { useBtnConfig } from './hooks/useConfig';
import { useTranslate } from '../../../hooks';
import { ButtonProps } from './props/Button';

const props = defineProps(ButtonProps);
const config = useBtnConfig('reject', ref('basicConfig'));
const t = useTranslate();

const handleClick = async () => {
  await TUICallKitServer.reject();
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>
