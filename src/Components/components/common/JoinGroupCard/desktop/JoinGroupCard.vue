<template>
  <div class="banner-pc">
    <div class="top" @click="handleClick">
      <TKImage class="call-icon" :src="CallIcon" width="16px" height="16px" />
      <span class="text"> {{userListInfo.length}} {{ t('people on the call') }} </span>
    </div>
    <div class="content" v-show="isShowContent">
      <div class="content-arrows"></div>
      <div class="avatar-box">
        <TKImage 
          class="avatar"
          v-for="userInfo in userListInfo"
          :src="userInfo?.avatar" 
          :defaultSrc="defaultAvatarSrc"
          fit="cover" 
          width="32px" 
          height="32px"
        />
      </div>
      <div class="btn" @click="handleJoinGroup">{{ t('join') }}</div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref } from '../../../../../adapter-vue';
import { IUserInfo } from '../../../../../TUICallService/interface/index';
import { useTranslate } from '../../../../hooks';
import TKImage from '../../../base/TKImage/TKImage.vue';
import CallIcon from '../../../../assets/common/call.svg';
import defaultAvatarSrc from '../../../../assets/common/defaultAvatar.svg';

defineProps({
  userListInfo: {
    type: Array<IUserInfo>,
    default: []
  }
});

const emit = defineEmits(['joinGroupCall']);
const isShowContent = ref<boolean>(false);
const t = useTranslate();

const handleJoinGroup = () => {
  emit('joinGroupCall');
  isShowContent.value = false;
}
const handleClick = () => {
  isShowContent.value = !isShowContent.value;
}

</script>

<style lang="scss">
@import './JoinGroupCard.scss';
</style>