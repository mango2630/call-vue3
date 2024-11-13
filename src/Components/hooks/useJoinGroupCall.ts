import { ref, onMounted, onUnmounted } from '../../adapter-vue';
import { TUIStore } from '../../TUICallService';
import { NAME, StoreName } from '../../TUICallService/const';

export function useJoinGroupCall() {
  const roomId = ref(TUIStore.getData(StoreName.CALL, NAME.ROOM_ID));
  const roomIdType = ref(TUIStore.getData(StoreName.CALL, NAME.ROOM_ID_TYPE));
  const groupId = ref(TUIStore.getData(StoreName.CALL, NAME.GROUP_ID));
  const callMediaType = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
  const groupCallMembers = ref(TUIStore.getData(StoreName.CALL, NAME.GROUP_CALL_MEMBERS));
  const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));

  const handleRoomIDChange = (value) => {
    roomId.value = value;
  };
  const handleGroupIDChange = (value) => {
    groupId.value = value;
  };
  const handleCallMediaTypeChange = (value) => {
    callMediaType.value = value;
  };
  const handleGroupCallMembersChange = (value) => {
    groupCallMembers.value = value;
  };
  const handleCallStatusChange = (value) => {
    callStatus.value = value;
  };
  const handleRoomIdTypeChange = (value) => {
    roomIdType.value = value;
  };

  const watchOptions = {
    [NAME.ROOM_ID]: handleRoomIDChange,
    [NAME.GROUP_ID]: handleGroupIDChange,
    [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
    [NAME.GROUP_CALL_MEMBERS]: handleGroupCallMembersChange,
    [NAME.CALL_STATUS]: handleCallStatusChange,
    [NAME.ROOM_ID_TYPE]: handleRoomIdTypeChange,
  };

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

  return {
    roomId,
    roomIdType,
    groupId,
    callMediaType,
    groupCallMembers,
    callStatus,
  };
};
