<template>
  <div class="waiting-container">
    <OverlayStream
      :username="username"
      :avatar="avatar"
      :bg-image="bgImage"
      :show-avatar="!TUIGlobal.isPC"
      :show-loading="false"
      bg-color="#22262ed9"
      :show-mask="showMask"
      :show-background-image="showBackgroundImage"
      :tip="tip"
      :fit="fit"
      @error="handleError"
    >
    <div v-if="!TUIGlobal.isPC && isGroupCall" class="groupcall-info">
      <div class="tip">
        <TKText color="#FFF">{{ remoteUserListExcludeVolume.length }}{{ t('people in the call') }}</TKText>
      </div>
      <div class="avatar-group">
        <div v-for="item in remoteUserListExcludeVolume" class="avatar-item">
          <Avatar size="100%" :src="item.avatar || defaultAvatarSrc" />
        </div>
      </div>
    </div>
    </OverlayStream>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, ref, watchEffect } from '../../../../adapter-vue';
import { TUIGlobal } from '../../../../TUICallService';
import OverlayStream from '../../common/OverlayStream/OverlayStream.vue';
import Avatar from '../../base/Avatar/Avatar.vue';
import TKText from '../../base/TKText/TKText.vue';
import {
  useCallInfoContext,
  useCallerUserInfoContext,
  useUserInfoExcludeVolumeContext,
  useViewBackgroundConfig,
  useTranslate,
} from '../../../hooks';
import defaultAvatarSrc from '../../../assets/common/defaultAvatar.svg';

const { localUserInfoExcludeVolume, remoteUserListExcludeVolume } = toRefs(useUserInfoExcludeVolumeContext());
const { callerUserInfo } = toRefs(useCallerUserInfoContext());
const { isGroupCall } = toRefs(useCallInfoContext());
const viewBackgroundConfigObj = useViewBackgroundConfig();
const t = useTranslate();

const username = computed(() => !isGroupCall.value
  ? remoteUserListExcludeVolume.value?.[0]?.displayUserInfo
  : callerUserInfo.value.displayUserInfo);
const avatar = computed(() => !isGroupCall.value
  ? remoteUserListExcludeVolume.value?.[0]?.avatar
  : callerUserInfo.value.avatar);
const showBackgroundImage = computed(() => isGroupCall.value ? true : !localUserInfoExcludeVolume.value.isVideoAvailable);
const tip = computed(() => isGroupCall.value ? t.value('Invited group call') : null);
const bgImage = computed(() => {
  if (isGroupCall.value) {
    return viewBackgroundConfigObj.value[callerUserInfo.value.userId] || avatar.value;
  } else {
    return viewBackgroundConfigObj.value[remoteUserListExcludeVolume.value?.[0]?.userId] || avatar.value;
  }
});
const showMask = ref<boolean>(false);
const fit = ref<string>('fill');
let triggerError = ref<boolean>(false);

watchEffect(() => {
  if (triggerError.value) {
    showMask.value = isGroupCall.value ? true : !localUserInfoExcludeVolume.value.isVideoAvailable;
    fit.value = 'cover';

    return;
  }

  if (isGroupCall.value) {
    showMask.value = !viewBackgroundConfigObj.value[callerUserInfo.value.userId];
    fit.value = viewBackgroundConfigObj.value[callerUserInfo.value.userId] ? 'fill' : 'cover';
  } else {
    showMask.value = !localUserInfoExcludeVolume.value.isVideoAvailable && !viewBackgroundConfigObj.value[remoteUserListExcludeVolume.value?.[0]?.userId];
    fit.value = viewBackgroundConfigObj.value[remoteUserListExcludeVolume.value?.[0]?.userId] ? 'fill' : 'cover';
  }
});

const handleError = () => {
  triggerError.value = true;
}
</script>

<style lang="scss" scoped>
.waiting-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.groupcall-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  z-index: 1;
  color: #FFF;
  width: 100%;

  .avatar-group {
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    align-items: center;
    justify-content: center;
    max-width: 70%;

    .avatar-item {
      width: 10vw;
      height: 10vw;
      margin-left: 10px;
      margin-top: 10px;
    }
  }
}
</style>
