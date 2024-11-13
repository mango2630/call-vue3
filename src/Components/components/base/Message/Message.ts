import { ref, watch } from '../../../../adapter-vue';
import { NAME } from '../constants';
const MessageType = [NAME.SUCCESS, NAME.INFO, NAME.WARNING, NAME.ERROR] as const;

export const MessageProps = {
  isShow: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    values: MessageType,
    default: NAME.INFO,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  offset: {
    type: Number,
    default: 16,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  customClass: {
    type: String,
  },
  customStyle: {
    type: Object
  },
} as const;
export const MessageEmits = {
  onClose: null,
};

export function useMessage(props, emits) {
  const messageContent = ref(props?.message || MessageProps.message.default);
  const messageDuration = ref(props?.duration || MessageProps.duration.default);
  const messageType = ref(props?.type || MessageProps.type.default);
  const messageOffset = ref(props?.offset || MessageProps.offset.default);
  const isShowCloseIcon = ref(props?.showClose || MessageProps.showClose.default);
  const visible = ref<boolean>(false);
  let timerId: any = -1;

  const show = (messageObj?: any) => {
    if (timerId > -1) {
      clearTimeout(timerId);
      timerId = -1;
    }
    visible.value = true;
    updateData(messageObj || {});
    if (messageDuration.value) {
      timerId = setTimeout(() => {
        close();
      }, messageDuration.value);
    }
  };
  const close = () => {
    visible.value = false;
    if (timerId > -1) {
      clearTimeout(timerId);
      timerId = -1;
    }
  };
  const updateData = (messageObj?: any) => {
    const { 
      message = messageContent.value,
      type = messageType.value,
      offset = messageOffset.value,
      duration = messageDuration.value,
      showClose = isShowCloseIcon.value,
    } = messageObj;
    
    // duration 值为 0 时，Message 会一直展示
    messageDuration.value = props?.duration === 0 ? props?.duration : duration;
    messageContent.value = message;
    messageType.value = type;
    messageOffset.value = offset;
    isShowCloseIcon.value = showClose;
  };

  watch(
    () => props?.isShow, 
    (newValue) => {
      if (newValue) {
        show();
      }
    },
    { immediate: true },
  );
  watch(visible, (newValue) => {
    if (!newValue) {
      emits('onClose');
    }
  });

  return { 
    messageContent, 
    messageDuration, 
    messageType, 
    messageOffset, 
    isShowCloseIcon,
    visible,
    show,
    close,
  };
}
