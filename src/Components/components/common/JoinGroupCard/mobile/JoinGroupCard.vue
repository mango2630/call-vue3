<template>
<div class="banner-h5">
  <div class="top"  @click="handleClick">
    <div class="left">
      <TKImage class="call-icon" :src="CallIcon" width="16px" height="16px" :customStyle="CallIconStyle" />
      <span class="text"> {{userListInfo.length}} {{ t('people on the call') }} </span>
    </div>
    <TKImage :src="ArrowsIcon" width="9px" height="9px" />
  </div>
  <div class="content-box" v-show="isShowContent">
    <div class="content">
      <div class="avatar-box">
        <TKImage
          v-for="userInfo in userListInfo"
          :src="userInfo?.avatar" 
          :customStyle="avatarImgStyle" 
          :defaultSrc="defaultAvatarSrc"
          fit="cover" 
          width="50px" 
          height="50px"
        />
      </div>
      <div class="btn" @click.stop="handleJoinGroup">{{ t('join') }}</div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from '../../../../../adapter-vue';
import { IUserInfo } from '../../../../../TUICallService/interface/index';
import TKImage from '../../../base/TKImage/TKImage.vue';
import { useTranslate } from '../../../../hooks';
import CallIcon from '../../../../assets/common/call.svg';
import ArrowsIcon from '../../../../assets/common/arrows.svg';
import defaultAvatarSrc from '../../../../assets/common/defaultAvatar.svg';

defineProps({
  userListInfo: {
    type: Array<IUserInfo>,
    default: []
  }
});

const t = useTranslate();
const CallIconStyle = ref({ margin: '8px 10px 8px 0px' });
const avatarImgStyle = ref({
  margin: '6px',
  borderRadius: '4px',
});
const isShowContent = ref<boolean>(false);
const emit = defineEmits(['joinGroupCall']);
const handleJoinGroup = () => {
  emit('joinGroupCall');
  isShowContent.value = false;
};
const handleClick = () => {
  isShowContent.value = !isShowContent.value;
};

</script>

<style lang="scss">
@import './JoinGroupCard.scss';
</style>
