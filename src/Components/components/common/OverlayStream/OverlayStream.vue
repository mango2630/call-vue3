<template>
<div v-if="showOverlayStream" :class="overlayStreamClassName" :style="[customStyle]">
  <Overlay
    :show="showOverlay"
    :show-background-image="showBackgroundImage"
    :show-mask="showMask"
    :blur="blur"
    :zIndex="overlayZIndex"
    :bgColor="bgColor"
    :bgImage="bgImage || defaultAvatarSrc"
    :fit="fit"
    :defaultSrc="defaultAvatarSrc"
    :customStyle="{ position: 'absolute', width: '100%', height: '100%' }"
    :custom-mask-style="{ 'backdrop-filter': 'blur(12px)', '-webkit-backdrop-filter': 'blur(12px)' }"
    :customClass="customOverlayClass"
    @error="handleError"
    >
    <div class="overlay-stream-content-container">
      <div class="overlay-stream-content">
        <Loading v-if="showLoading" mode="dot" />
        <div class="overlay-stream-avatar">
          <Avatar
            v-if="showAvatar"
            :src="avatar || defaultAvatarSrc"
            :size="avatarSize"
          />
        </div>
        <div class="overlay-stream-info">
          <TKText 
            v-if="showUserName"
            :truncated="true"
            :size="fontSize"
            :color="color"
            width="200px"
            :weight="500"
          >
          {{ username }}
          </TKText>
          <!-- @if process.env.BUILD_TARGET!='MINI' -->
          <MicrophoneVolume v-if="showMicVolume" :isMuted="isMuted" :volume="volume" />
          <!-- @endif -->
        </div>
        <div class="overlay-stream-tip">
          <div v-if="showTip && tip">{{ tip }}</div>
        </div>
      </div>
      <slot></slot>
    </div>
  </Overlay>
</div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  }
}
</script>

<script setup lang="ts">
import { watch, ref, computed, toRefs } from '../../../../adapter-vue';
import Overlay from '../../base/Overlay/Overlay.vue';
import Loading from '../../base/Loading/Loading.vue';
import TKText from '../../base/TKText/TKText.vue';
import Avatar from '../../base/Avatar/Avatar.vue';
// @if process.env.BUILD_TARGET!='MINI'
import MicrophoneVolume from '../MicrophoneVolume/MicrophoneVolume.vue';
// @endif
import { TUIGlobal } from '../../../../TUICallService/index';
import { classNames } from '../../base/util';
import { useFloatWindowContext } from '../../../hooks';
import { OverlayStreamProps, OverlayStreamEmits } from './OverlayStream';
import defaultAvatarSrc from '../../../assets/common/defaultAvatar.svg';

const emit = defineEmits(OverlayStreamEmits);
const props = defineProps(OverlayStreamProps);
const avatarSize = ref(100);
const { isFloatWindow } = toRefs(useFloatWindowContext());
const fontSize = TUIGlobal.isPC ? '40px' : '20px';

watch([() => props.isSmallWindow, isFloatWindow], () => {
  if (isFloatWindow.value) {
    avatarSize.value = props.isSmallWindow ? 20 : 40;
  } else {
    avatarSize.value = props.isSmallWindow ? 40 : 100;
  }
}, {
  immediate: true,
});

const overlayStreamClassName = computed(() => classNames([
  'overlay-stream-container',
  {
    pc: TUIGlobal.isPC,
    mobile: !TUIGlobal.isPC,
    float: isFloatWindow.value,
  },
]));

const handleError = (event) => {
  emit('error', event);
}
</script>

<style lang="scss" scoped>
@import './style/OverlayStream.scss';
</style>
