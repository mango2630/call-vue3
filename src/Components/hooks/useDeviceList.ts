import { ref, onMounted, onUnmounted } from '../../adapter-vue';
import { TUIStore } from '../../TUICallService';
import { DeviceType, NAME, StoreName } from '../../TUICallService/const';

export function useDeviceList(deviceType: DeviceType) {
  const deviceList = ref([]);
  const currentDeviceId = ref('');

  const handleDeviceListChange = (value) => {
    switch (deviceType) {
      case DeviceType.CAMERA:
        deviceList.value = value?.cameraList || [];
        currentDeviceId.value = value?.currentCamera?.deviceId || '';
        break;
      case DeviceType.MICROPHONE:
        deviceList.value = value?.microphoneList || [];
        currentDeviceId.value = value?.currentMicrophone?.deviceId || '';
        break;
      case DeviceType.SPEAKER:
        deviceList.value = value?.speakerList || [];
        currentDeviceId.value = value?.currentSpeaker?.deviceId || '';
        break;
      default:
        break;
    }
  };

  const updateCurrentDeviceId = (value) => {
    currentDeviceId.value = value;
  };

  onMounted(() => {
    TUIStore.watch(
      StoreName.CALL,
      {
        [NAME.DEVICE_LIST]: handleDeviceListChange,
      },
      {
        notifyRangeWhenWatch: NAME.MYSELF,
      },
    );
  });

  onUnmounted(() => {
    TUIStore.unwatch(StoreName.CALL, {
      [NAME.DEVICE_LIST]: handleDeviceListChange,
    });
  });

  return [{ deviceList, currentDeviceId }, { updateCurrentDeviceId }] as const;
}
