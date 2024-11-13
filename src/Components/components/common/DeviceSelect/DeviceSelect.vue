<template>
  <div class="device-selector-container">
    <div class="scroll-container">
      <div class="scroll-content">
        <div v-for="device in deviceList" :key="device.deviceId">
          <TKText
            width="100%"
            color="#ffff"
            :truncated="true"
            size="14px"
            class="device-item"
            :class="{ select: currentDeviceId === device.deviceId }"
            @click="() => handleClickDeviceItem(device.deviceId)"
          >
          {{ device.label }}
          </TKText>
        </div>
      </div>
    </div>
    <div class="control-item"></div>
    <TKText
      v-if="isShowControlBtn"
      width="100%"
      color="#ffff"
      :truncated="true"
      size="14px"
      class="device-item"
      @click="switchStatus" 
    >
      {{ deviceText }}
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
import { DeviceType } from '../../../../TUICallService/const';
import TKText from '../../base/TKText/TKText.vue';
import { useDeviceList, usePopover, useUserInfoExcludeVolumeContext, useCallInfoContext, useTranslate } from '../../../hooks';
import { DeviceSelectProps } from './DeviceSelect';

const props = defineProps(DeviceSelectProps);
const [{ deviceList, currentDeviceId }, { updateCurrentDeviceId }] = useDeviceList(props.deviceType);
const { localUserInfoExcludeVolume: localUserInfo } = toRefs(useUserInfoExcludeVolumeContext());
const { isMuteSpeaker } = toRefs(useCallInfoContext());
const popoverValue = usePopover();
const t = useTranslate();

const handleClickDeviceItem = async (deviceId: string) => {
  try {
    updatePopover();
    await TUICallKitServer.switchDevice({
      deviceType: props.deviceType,
      deviceId,
    });
    updateCurrentDeviceId(deviceId);
  } catch (err) {
    console.debug(err);
  }
};
const switchStatus = async () => {
  updatePopover();
  if (props.deviceType === DeviceType.CAMERA) {
    if (localUserInfo.value?.isVideoAvailable) {
      await TUICallKitServer.closeCamera();
    } else {
      await TUICallKitServer.openCamera('localVideo');
    }
  }

  if (props.deviceType === DeviceType.MICROPHONE) {
    if (localUserInfo.value?.isAudioAvailable) {
      await TUICallKitServer.closeMicrophone();
    } else {
      await TUICallKitServer.openMicrophone();
    }
  }

  if (props.deviceType === DeviceType.SPEAKER) {
    if (isMuteSpeaker.value) {
      await TUICallKitServer.unMuteSpeaker();
    } else {
      await TUICallKitServer.muteSpeaker();
    }
  }
};
const deviceText = computed(() => {
  if (props.deviceType === DeviceType.CAMERA) {
    return localUserInfo?.value.isVideoAvailable ? t.value('close camera') : t.value('open camera');
  }
  if (props.deviceType === DeviceType.MICROPHONE) {
    return localUserInfo?.value?.isAudioAvailable ? t.value('close microphone') : t.value('open microphone');
  }
  if (props.deviceType === DeviceType.SPEAKER) {
    return isMuteSpeaker.value ? t.value('open speaker') : t.value('close speaker');
  }
});

const updatePopover = () => {
  popoverValue.value = 'close';
};
</script>

<style lang="scss" scoped>
.device-selector-container {
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  font-weight: 500;

  .device-item {
    overflow: hidden;
    padding: 5px 3px;
    text-align: left;
    line-height: 16px;
    cursor: pointer;

    &:hover {
      border-radius: 5px;
      background: #ffffff52;
    }

    &.select {
      background-color: #0f101433;
      border-radius: 3px;
    }
  }

  .control-item {
    width: 100%;
    height: 1px;
    background-color: #ffffff33;
  }
}

.scroll-container {
  width: 100%;
  overflow: hidden;

  .scroll-content {
    max-height: 60px;
    margin-right: -26px;
    overflow: hidden auto;
    padding-right: 20px;
  }
}
</style>
