<template>
  <div class="btn-content">
    <!-- @if process.env.BUILD_TARGET!='MINI' -->
    <Popover 
      v-if="isPC"
      color="rgba(107, 117, 138, 0.5)"
      :show="isShowPopover"
      @hover="handleMouseEnter"
      trigger="hover"
    >
      <template #content>
        <DeviceSelect
          :isShowControlBtn='true'
          :deviceType="DeviceType.MICROPHONE"/>
      </template>
      <template #trigger>
        <Button 
          :loading="!clickAble"
          :iconSrc="config.iconSrc"
          :color="config.color"
          :iconSize="config.iconSize"
          :width="config.width"
          :height="config.height"
          :loadingWidth="config.loadingWidth"
          :loadingHeight="config.loadingHeight"
          :shape="config.shape"
          @click="handleClick"
        >
        </Button>
      </template>
    </Popover>
    <!-- @endif -->
    <Button
      v-if="!isPC"
      :loading="!clickAble"
      :iconSrc="config.iconSrc"
      :color="config.color"
      :iconSize="config.iconSize"
      :width="config.width"
      :height="config.height"
      :loadingWidth="config.loadingWidth"
      :loadingHeight="config.loadingHeight"
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
      {{ btnText }}
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
import { computed, toRefs, ref } from '../../../../adapter-vue';
import { TUICallKitServer, TUIGlobal } from '../../../../TUICallService/index';
import { DeviceType } from '../../../../TUICallService/const';
import Button from '../../base/Button/Button.vue';
import TKText from '../../base/TKText/TKText.vue';
// @if process.env.BUILD_TARGET!='MINI'
import Popover from '../../base/Popover/Popover.vue';
import DeviceSelect from '../DeviceSelect/DeviceSelect.vue';
import { useDeviceList } from '../../../hooks';
// @endif
import { useUserInfoExcludeVolumeContext, usePopover } from '../../../hooks';
import { ButtonProps } from './props/Button';
import { useBtnConfig } from './hooks/useConfig'
import { useTranslate } from '../../../hooks';

defineProps(ButtonProps);
const isPC = TUIGlobal.isPC;
const clickAble = ref(true);
const { localUserInfoExcludeVolume : localUserInfo } = toRefs(useUserInfoExcludeVolumeContext());
const popoverValue = usePopover();
// @if process.env.BUILD_TARGET!='MINI'
const [{ deviceList }] = useDeviceList(DeviceType.MICROPHONE);
const isShowPopover = computed(() => deviceList.value?.length > 0 && popoverValue.value === 'microphone');
// @endif
const configState = computed(() => {
  if (!clickAble.value) {
    return 'loadingConfig';
  }

  return localUserInfo?.value.isAudioAvailable ? 'basicConfig' : 'closedConfig';
});
const config = useBtnConfig('microphone', configState);
const t = useTranslate();
const btnText = computed(() => (localUserInfo?.value.isAudioAvailable ? t.value('microphone enabled') : t.value('microphone disabled')));
const handleClick = async () => {
  if (localUserInfo?.value.isAudioAvailable) {
    await TUICallKitServer.closeMicrophone();
  } else {
    await TUICallKitServer.openMicrophone();
  }
};
const handleMouseEnter = () => {
  popoverValue.value = 'microphone';
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>
