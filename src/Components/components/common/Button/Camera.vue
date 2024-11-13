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
          :deviceType="DeviceType.CAMERA"/>
      </template>
      <template #trigger>
        <Button 
          :loading="!clickAble"
          :iconSrc="config.iconSrc"
          :color="config.color"
          :iconSize="config.iconSize"
          :width="props.width || config.width"
          :height="props.height || config.height"
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
      v-if='!isPC'
      :loading="!clickAble"
      :iconSrc="config.iconSrc"
      :color="config.color"
      :iconSize="props.iconSize || config.iconSize"
      :width="props.width || config.width"
      :height="props.height || config.height"
      :loadingWidth="config.loadingWidth"
      :loadingHeight="config.loadingHeight"
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
import { useTranslate } from '../../../hooks/useTranslate';

const t = useTranslate();
const props = defineProps(ButtonProps);
const clickAble = ref(true);
const isPC = TUIGlobal.isPC;
const { localUserInfoExcludeVolume : localUserInfo } = toRefs(useUserInfoExcludeVolumeContext());
const targetVideoAvailable = ref(localUserInfo?.value.isVideoAvailable);
const isVideoAvailable = computed(() => localUserInfo?.value.isVideoAvailable);
const popoverValue = usePopover();
// @if process.env.BUILD_TARGET!='MINI'
const [{ deviceList }] = useDeviceList(DeviceType.CAMERA);
const isShowPopover = computed(() => deviceList.value?.length > 0 && popoverValue.value === 'camera');
// @endif
const configState = computed(() => {
  if (!clickAble.value) {
    return 'loadingConfig';
  }

  return isVideoAvailable.value ? 'basicConfig' : 'closedConfig';
});
const btnText = computed(() => (localUserInfo?.value.isVideoAvailable ? t.value('camera enabled') : t.value('camera disabled')));
const config = useBtnConfig('camera', configState);

const handleClick = async () => {
  clickAble.value = false;
  targetVideoAvailable.value = !isVideoAvailable.value;
  if (isVideoAvailable.value) {
    await TUICallKitServer.closeCamera();
  } else {
    await TUICallKitServer.openCamera('localVideo');
  }
  clickAble.value = true;
};
const handleMouseEnter = () => {
  popoverValue.value = 'camera';
}
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>
