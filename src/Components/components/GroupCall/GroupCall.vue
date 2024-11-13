<template>
  <div class="groupcall-container">
    <TopBar />
    <Waiting v-if="callStatus === CallStatus.CALLING && callRole === CallRole.CALLEE && !isFloatWindow" />
    <MediaContainer />
    <Tip />
    <ButtonPanel />
    <BackGround />
    <SelectUser
      v-if="showSelectUser"
      :isNeedSearch="true"
      :userList="groupMemberList"
      :isPC="TUIGlobal.isPC"
      :total="memberCount"
      @confirm="handleSelectedResult"
      @cancel="handleCancel"
      @getMore="getMoreMemberList"
      @search="handleSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, toRefs, onMounted, onUnmounted } from '../../../adapter-vue';
import TopBar from '../common/TopBar/TopBar.vue';
import Waiting from '../common/Waiting/Waiting.vue';
import MediaContainer from './MediaContainer/MediaContainer.vue';
import Tip from '../common/Tip/Tip.vue';
import ButtonPanel from '../common/ButtonPanel/ButtonPanel.vue';
import SelectUser from '../common/SelectUser/SelectUser.vue';
import BackGround from './BackGround/BackGround.vue';
import { ButtonPanelContextKey, FocusContextKey } from '../../context';
import { useCallInfoContext, useFloatWindowContext, useUserInfoExcludeVolumeContext } from '../../hooks';
import { CallRole, CallStatus, TUIGlobal, TUIStore, TUICallKitServer, StoreName, NAME } from '../../../TUICallService';

const focusElement = ref(null);
const buttonPanelStatus = ref('open');
const showSelectUser = ref(false);
const memberCount = ref(0);
const groupMemberList = ref([]);
const backupGroupMemberList = ref([]);
const offset = ref(0);
const count: number = 30;

const FocusContextValue = focusElement;
const ButtonPanelContextValue = { status: buttonPanelStatus };


const { callRole, callStatus } = toRefs(useCallInfoContext());
const { isFloatWindow } = toRefs(useFloatWindowContext());
const { localUserInfoExcludeVolume, remoteUserListExcludeVolume } = toRefs(useUserInfoExcludeVolumeContext());

const handleShowSelectUser = async (value: boolean) => {
  showSelectUser.value = value;
  if (showSelectUser.value) {
    await getGroupMemberList();
    const groupProfile = await TUICallKitServer.getGroupProfile();
    memberCount.value = groupProfile.memberCount;
  }
}
const handleCancel = () => {
  showSelectUser.value = false;
  TUIStore.update(StoreName.CALL, NAME.SHOW_SELECT_USER, false);
  offset.value = 0;
  groupMemberList.value = [];
}
const getMoreMemberList = async () => {
  offset.value += count;
  await getGroupMemberList();
}
const getGroupMemberList = async () => {
  const memberList = await TUICallKitServer.getGroupMemberList(count, offset.value);
  const inCallUserIdList = [...remoteUserListExcludeVolume.value, localUserInfoExcludeVolume.value].map(obj => obj.userId);
  groupMemberList.value.push(...memberList);
  groupMemberList.value = groupMemberList.value.map(obj => {
    if (inCallUserIdList.includes(obj.userID)) {
      obj = { ...obj, isDisabled: true };
    }
    return obj;
  });
  backupGroupMemberList.value = groupMemberList.value;
};
const handleSelectedResult = async (selectedUserInfoList: Array<any>) => {
  try {
    if (selectedUserInfoList.length <= 0) {
      return ;
    }
    showSelectUser.value = false;
    TUIStore.update(StoreName.CALL, NAME.SHOW_SELECT_USER, false);
    offset.value = 0;
    const userIDList = selectedUserInfoList.map(obj => obj.userID);
    await TUICallKitServer.inviteUser({userIDList});
    groupMemberList.value = [];
  } catch (error) {
    console.debug(error);
  }
};
const handleSearch = (searchValue: string) => {
  if (searchValue) {
    groupMemberList.value = groupMemberList.value.filter(obj => {
      return obj.userID.includes(searchValue) || obj.nick.includes(searchValue)
    });
  } else {
    groupMemberList.value = backupGroupMemberList.value;
  }
};

const watchOptions = {
  [NAME.SHOW_SELECT_USER]: handleShowSelectUser,
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, watchOptions, { notifyRangeWhenWatch: NAME.MYSELF });
});
onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});

ButtonPanelContextValue.status = ref('open');
FocusContextValue.value = null;
provide(ButtonPanelContextKey, ButtonPanelContextValue);
provide(FocusContextKey, FocusContextValue);
</script>

<style lang="scss" scoped>
.groupcall-container {
  height: 100%;
}
</style>
