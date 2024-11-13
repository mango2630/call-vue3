import { ref, onMounted, onUnmounted } from '../../adapter-vue';
import { TUIStore } from '../../TUICallService';
import { NAME, StoreName } from '../../TUICallService/const';

export function useNetWorkStatus() {
  const netWorkQualityList = ref(TUIStore.getData(StoreName.CALL, NAME.NETWORK_STATUS));

  const handleNetWorkStatusChange = (value) => {
    netWorkQualityList.value = value;
  };

  onMounted(() => {
    TUIStore.watch(
      StoreName.CALL,
      {
        [NAME.NETWORK_STATUS]: handleNetWorkStatusChange,
      },
      {
        notifyRangeWhenWatch: NAME.MYSELF,
      },
    );
  });
  onUnmounted(() => {
    TUIStore.unwatch(StoreName.CALL, {
      [NAME.NETWORK_STATUS]: handleNetWorkStatusChange,
    });
  });

  return { netWorkQualityList };
}
