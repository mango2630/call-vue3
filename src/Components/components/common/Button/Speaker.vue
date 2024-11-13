<template>
  <div class="btn-content">
    <!-- @if process.env.BUILD_TARGET!='MINI' -->
    <Popover
      color="rgba(107, 117, 138, 0.5)"
      :show="isShowPopover"
      @hover="handleMouseEnter"
      trigger="hover"
    >
      <template #content>
        <DeviceSelect 
          :isShowControlBtn="true"
          :deviceType="DeviceType.SPEAKER">
        </DeviceSelect>
      </template>
      <template #trigger>
        <Button 
          :iconSrc="config.iconSrc"
          :color="config.color"
          :iconSize="props.iconSize || config.iconSize"
          :width="props.width || config.width"
          :height="props.height || config.height"
          :shape="config.shape"
          @click="handleClick"
        >
        </Button>
      </template>
    </Popover>
    <!-- @endif -->
    <!-- @if process.env.BUILD_TARGET='MINI' -->
    <Button
      :iconSrc="config.iconSrc"
      :color="config.color"
      :iconSize="props.iconSize || config.iconSize"
      :width="props.width || config.width"
      :height="props.height || config.height"
      :shape="config.shape"
      @click="handleClick"
    >
    </Button>
    <!-- @endif -->
    <TKText
      v-if="config.showText"
      width="60px"
      :truncated="true"
      :textStyle="config.textStyle"
      :color="config.textColor"
      :size="config.textSize"
      :lineClamp='2'
    >
      {{getButtonText()}}
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
import { computed, toRefs } from '../../../../adapter-vue';
import { TUICallKitServer, TUIGlobal } from '../../../../TUICallService/index';
import { DeviceType } from '../../../../TUICallService/const';
import Button from '../../base/Button/Button.vue';
import TKText from '../../base/TKText/TKText.vue';
// @if process.env.BUILD_TARGET!='MINI'
import Popover from '../../base/Popover/Popover.vue';
import DeviceSelect from '../DeviceSelect/DeviceSelect.vue';
import { useDeviceList } from '../../../hooks';
// @endif
import { useBtnConfig } from './hooks/useConfig';
import { useTranslate } from '../../../hooks';
import { ButtonProps } from './props/Button';
import { useCallInfoContext, usePopover } from '../../../hooks';

const isWeChat = TUIGlobal.isWeChat;
const isPC = TUIGlobal.isPC;
const props = defineProps(ButtonProps);
const { isEarPhone, isMuteSpeaker } = toRefs(useCallInfoContext());
const popoverValue = usePopover();
const t = useTranslate();
const wxConfigState = computed(() => (isEarPhone.value ? 'closedConfig' : 'basicConfig'));
const webConfigState = computed(() => (isMuteSpeaker.value ? 'closedConfig' : 'basicConfig'));
// @if process.env.BUILD_TARGET!='MINI'
const [{ deviceList, currentDeviceId }] = useDeviceList(DeviceType.SPEAKER);
const isShowPopover = computed(() => deviceList.value?.length > 0 && popoverValue.value === 'speaker' && isPC);
// @endif
const config = isWeChat ? useBtnConfig('speaker', wxConfigState) : useBtnConfig('speaker', webConfigState);
const btnText = computed(() => (isEarPhone.value ? t.value('speaker disabled') : t.value('speaker enabled')));
const handleClick = async () => {
  // @if process.env.BUILD_TARGET='MINI'
  TUICallKitServer.setSoundMode();
  // @endif
  // @if process.env.BUILD_TARGET!='MINI'
  if (isMuteSpeaker.value) {
    await TUICallKitServer.unMuteSpeaker();
  } else {
    await TUICallKitServer.muteSpeaker();
  }
  // @endif
};
const getButtonText = () => {
  // @if process.env.BUILD_TARGET='MINI'
  return btnText.value;
  // @endif
  // @if process.env.BUILD_TARGET!='MINI'
  if (isPC) {
    const result = deviceList.value.find(item => item.deviceId === currentDeviceId.value);
    return result ? result.label : t.value('speaker enabled');
  } else {
    return isMuteSpeaker.value ? t.value('speaker disabled') : t.value('speaker enabled');
  };
  // @endif
};
const handleMouseEnter = () => {
  popoverValue.value = 'speaker';
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>
