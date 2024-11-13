<template>
  <div v-show="isShow">
    <JoinGroupCardPC v-if="isPC" :userListInfo="groupCallMembers" @joinGroupCall="handleClick"/>
    <JoinGroupCardMobile v-else :userListInfo="groupCallMembers" @joinGroupCall="handleClick" />
    <Message ref="message"></Message>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from '../../../../adapter-vue';
import { TUIGlobal, CallStatus, TUICallKitServer, NAME} from '../../../../TUICallService';
import { useJoinGroupCall } from '../../../hooks/index';
import Message from '../../base/Message/Message.vue';
import JoinGroupCardPC from './desktop/JoinGroupCard.vue';
import JoinGroupCardMobile from './mobile/JoinGroupCard.vue';

const isPC = ref(TUIGlobal.isPC);
const message = ref(null);
const { groupId, roomId, roomIdType, callMediaType, groupCallMembers, callStatus } = toRefs(useJoinGroupCall());
const isShow = computed(() =>  groupId && callStatus?.value === CallStatus.IDLE && groupCallMembers.value.length );

const handleClick = async () => {
  if (groupCallMembers.value.length > 9) {
    message.value.show({
      message: 'Supports a maximum of 9 people for simultaneous calls',
      type: 'success',
    })
    return;
  }
  const joinGroupCallParams = {
    type: callMediaType.value,
    groupID: groupId.value,
    roomID: roomIdType.value === 1 ? Number(roomId.value) : 0,
    strRoomID: String(roomId.value),
  }
  try {
    await TUICallKitServer.joinInGroupCall(joinGroupCallParams);
  } catch(error) {
    console.error(`${NAME.PREFIX}joinInGroupCall fail: ${error}`);
  }
}
</script>
