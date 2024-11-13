<template>
  <div class="btn-content">
    <Button
      :loading="!clickAble"
      :iconSrc="config.iconSrc"
      :color="config.color"
      :iconSize="props.iconSize || config.iconSize"
      :width="props.width || config.width"
      :height="props.height || config.height"
      :shape="config.shape"
      :loadingWidth="config.loadingWidth"
      :loadingHeight="config.loadingHeight"
      :buttonStyle="config.buttonStyle"
      @click="handleClick"
    >
    </Button>
    <TKText 
      v-if="config.showText"
      width="70px"
      :lineClamp="2"
      :textStyle="config.textStyle"
      :color="config.textColor"
      :size="config.textSize"
    >
      {{ t('virtual-background') }}
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
import { ref, computed, toRefs } from '../../../../adapter-vue';
import { TUICallKitServer } from '../../../../TUICallService/index';
import Button from '../../base/Button/Button.vue';
import TKText from '../../base/TKText/TKText.vue';
import { ButtonProps } from './props/Button';
import { useBtnConfig } from './hooks/useConfig';
import { useCallInfoContext, useUserInfoExcludeVolumeContext, useTranslate } from '../../../hooks';

const props = defineProps(ButtonProps);
const clickAble = ref(true);
const { localUserInfoExcludeVolume : localUserInfo } = toRefs(useUserInfoExcludeVolumeContext());
const isVideoAvailable = computed(() => localUserInfo?.value.isVideoAvailable);
const { enableVirtualBackground } = toRefs(useCallInfoContext());
const configState = computed(() => {
  if (!clickAble.value) {
    return 'loadingConfig';
  }

  if (enableVirtualBackground.value) {
    return 'closedConfig';
  }

  return isVideoAvailable.value ? 'basicConfig' : 'disableConfig';
});
const config = useBtnConfig('virtualBackground', configState);
const t = useTranslate();
const handleClick = async () => {
  if(!isVideoAvailable.value) return
  clickAble.value = false;
  await TUICallKitServer.setBlurBackground(!enableVirtualBackground.value);
  clickAble.value = true;
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>

