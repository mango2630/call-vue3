import { ref, onMounted, onUnmounted } from '../../adapter-vue';
import { TUIStore } from '../../TUICallService';
import { NAME, StoreName } from '../../TUICallService/const';

export function useTip() {
  const tip = ref('');
  const show = ref(true);
  const duration = ref(0);

  const handleCallTipsChange = (value) => {
    if (typeof value === 'object') {

      tip.value = value.text;
      duration.value = value.duration || 0;
    } else {
      tip.value = value;
    }
  };

  onMounted(() => {
    TUIStore.watch(
      StoreName.CALL,
      {
        [NAME.CALL_TIPS]: handleCallTipsChange,
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
        [NAME.CALL_TIPS]: handleCallTipsChange,
      },
    );
  });

  return { tip, show, duration };
}
