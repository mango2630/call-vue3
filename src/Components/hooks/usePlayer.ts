import { ref, onMounted, onUnmounted } from '../../adapter-vue';
import { TUIStore } from '../../TUICallService';
import { NAME, StoreName } from '../../TUICallService/const';

export function usePlayer() {
  const player = ref(TUIStore.getData(StoreName.CALL, NAME.PLAYER));

  const handlePlayerChange = (value) => {
    player.value = value?.map((item) => {
      const { userID, hasVideo, hasAudio } = item;

      return { userID, hasVideo, hasAudio };
    });
  };

  const watchOptions = {
    [NAME.PLAYER]: handlePlayerChange,
  };

  onMounted(() => {
    TUIStore.watch(
      StoreName.CALL,
      watchOptions,
      { notifyRangeWhenWatch: NAME.MYSELF },
    );
  });
  onUnmounted(() => {
    TUIStore.unwatch(StoreName.CALL, watchOptions);
  });

  return player;
}
