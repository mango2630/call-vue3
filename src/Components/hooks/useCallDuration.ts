import { NAME, StoreName, TUIStore } from '../../TUICallService';
import { ref, onMounted, onUnmounted } from '../../adapter-vue';

export function useCallDuration() {
  const callDuration  = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_DURATION));

  const handleCallDurationChange = (value) => {
    callDuration.value = value;
  };

  onMounted(() => {
    TUIStore.watch(
      StoreName.CALL,
      {
        [NAME.CALL_DURATION]: handleCallDurationChange,
      },
      {
        notifyRangeWhenWatch: NAME.MYSELF,
      },
    );
  });
  onUnmounted(() => {
    TUIStore.unwatch(
      StoreName.CALL,
      {
        [NAME.CALL_DURATION]: handleCallDurationChange,
      }
    );
  });

  return { callDuration };
}
