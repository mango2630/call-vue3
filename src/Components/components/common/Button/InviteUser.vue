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
      v-if="showText"
      :textStyle="config.textStyle"
      :color="config.textColor"
      :size="config.textSize"
    >
      {{ t('invite member') }}
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
import { ref, watch } from '../../../../adapter-vue';
import { TUIStore, StoreName, NAME } from '../../../../TUICallService/index';
import Button from '../../base/Button/Button.vue';
import TKText from '../../base/TKText/TKText.vue';
import { ButtonProps } from './props/Button';
import { useBtnConfig } from './hooks/useConfig'
import { useTranslate } from '../../../hooks';

const props = defineProps(ButtonProps);
const config = useBtnConfig('inviteUser', ref('basicConfig'));
const t = useTranslate();

const handleClick = async () => {
  TUIStore.update(StoreName.CALL, NAME.SHOW_SELECT_USER, true);
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>
