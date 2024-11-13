<template>
  <div v-if="visible" :class="messageClassName" :style="[messageStyle]">
    <div :class="typeIconClassName" v-show="showIcon">
      <Icon :src="IconSrcMap[messageType]"></Icon>
    </div>
    <span>{{ messageContent }}</span>
    <div v-show="isShowCloseIcon" :class="closeIconClassName" @click="close">
      <Icon :src="CloseSrc"></Icon>
    </div>
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
import { computed } from '../../../../adapter-vue';
import Icon from '../Icon/Icon.vue';
import { classNames } from '../util';
import { PREFIX } from '../constants/index';
import { MessageProps, MessageEmits, useMessage } from './Message';
import ErrorSrc from '../assets/message/error.svg';
import SuccessSrc from '../assets/message/success.svg';
import WaringSrc from '../assets/message/warning.svg';
import InfoSrc from '../assets/message/info.svg';
import CloseSrc from '../assets/message/close.svg';

const props = defineProps(MessageProps);
const emits = defineEmits(MessageEmits);
const { messageContent, messageType, messageOffset, isShowCloseIcon, visible, show, close } = useMessage(props, emits);
const messageClassName = computed(() => classNames([
  `${PREFIX}-message`,
  `${PREFIX}-message--${messageType.value}`,
  props.customClass,
]));
const typeIconClassName = computed(() => classNames([`${PREFIX}-message_icon`]));
const closeIconClassName = computed(() => classNames([`${PREFIX}-message_close`]));
const top = computed(() => `${messageOffset.value}px`);
const messageStyle = computed(() => ({top: top.value, ...props.customStyle}));

const IconSrcMap = {
  info: InfoSrc,
  waring: WaringSrc,
  success: SuccessSrc,
  error: ErrorSrc,
};

defineExpose({
  show,
  close,
});
</script>

<style lang="scss">
@import './style/Message.scss';
</style>
