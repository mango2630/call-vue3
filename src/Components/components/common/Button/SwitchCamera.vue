<template>
  <div class="btn-content">
    <Button
      :iconSrc="config.iconSrc"
      :iconSize="config.iconSize"
      :color="config.color"
      :width="config.width"
      :height="config.height"
      :buttonStyle="config.buttonStyle"
      shape="circle"
      @click="handleClick"
    >
    </Button>
    <TKText
      v-if="config.showText"
      :textStyle="config.textStyle"
      :color="config.textColor"
      :size="config.textSize"
    >
      {{ t('switch camera') }}
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
import { toRefs, computed } from '../../../../adapter-vue';
import { TUICallKitServer } from '../../../../TUICallService/index';
import Button from '../../base/Button/Button.vue';
import TKText from '../../base/TKText/TKText.vue';
import { useBtnConfig } from './hooks/useConfig'
import { useTranslate } from '../../../hooks';
import { useUserInfoExcludeVolumeContext } from '../../../hooks';

const { localUserInfoExcludeVolume : localUserInfo } = toRefs(useUserInfoExcludeVolumeContext());
const isVideoAvailable = computed(() => localUserInfo?.value.isVideoAvailable);
const configState = computed(() => {
  return isVideoAvailable.value ? 'basicConfig' : 'disableConfig';
});
const config = useBtnConfig('switchCamera', configState);
const t = useTranslate();

const handleClick = async () => {
  if(!isVideoAvailable.value) return
  await TUICallKitServer.switchCamera();
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>
