import { ref, onMounted, onUnmounted } from '../../adapter-vue';
import { TUIStore, TUIGlobal } from '../../TUICallService';
import { NAME, StoreName } from '../../TUICallService/const';
import { isEqual } from '../util';

export function useGetVolumeMap() {
  const volumeMap = ref();
  const remoteUserInfoList = ref(TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST));

  const handleLocalUserInfoChange = (value) => {
    const isAudioAvailable = TUIGlobal.isWeChat ? value.enableMic : value.isAudioAvailable;
    if (isAudioAvailable) {
      volumeMap.value = { ...volumeMap.value, localVideo: value.volume };
    }
  };
  const handleRemoteUserInfoListChange = (value) => {
    const rs = {};
    if (value.length !== remoteUserInfoList.value.length || !isEqual(value, remoteUserInfoList.value)) {
      remoteUserInfoList.value = value;
      remoteUserInfoList.value.forEach(item => {
        const isAudioAvailable = TUIGlobal.isWeChat ? item.hasAudio : item.isAudioAvailable;
        if (isAudioAvailable) {
          const domId = TUIGlobal.isWeChat ? item.userID : item.domId;
          rs[domId] = item.volume;
        }
      });

      volumeMap.value = { ...volumeMap.value, ...rs };
    }
  };

  let watchOptions = {
    [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
    [NAME.REMOTE_USER_INFO_LIST]: handleRemoteUserInfoListChange,
  };

  if (TUIGlobal.isUniPlatform) {
    watchOptions = {
      [NAME.PUSHER]: handleLocalUserInfoChange,
      [NAME.PLAYER]: handleRemoteUserInfoListChange,
    };
  }

  onMounted(() => {
    TUIStore.watch(
      StoreName.CALL,
      watchOptions,
      {
        notifyRangeWhenWatch: NAME.MYSELF,
      },
    );
  });

  onUnmounted(() => {
    TUIStore.unwatch(StoreName.CALL, watchOptions);
  });

  return volumeMap;
}
