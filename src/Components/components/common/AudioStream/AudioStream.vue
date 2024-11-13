<template>
  <OverlayStream
    :avatar="avatar"
    :bg-image="bgImage"
    :show-avatar="showAvatar"
    :username="username"
    :show-user-name="showUserName"
    :show-mask="!isGroupCall && showViewMask"
    :fit="fit"
    :blur="!isGroupCall"
    :show-mic-volume="showMicVolume"
    :show-tip="!isGroupCall && !isFloatWindow"
    :custom-style="audioStreamStyle"
    :is-small-window="isSmallWindow"
    :is-muted="isMuted"
    :volume="volume"
    bg-color="rgba(0, 0, 0, 0.5)"
    @error="handleError"
  />
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script setup lang="ts">
import { toRefs, computed, ref, watch } from '../../../../adapter-vue';
import { CallMediaType, TUIGlobal } from '../../../../TUICallService';
import OverlayStream from '../OverlayStream/OverlayStream.vue';
import { useCallInfoContext, useFloatWindowContext, useViewBackgroundConfig } from '../../../hooks';
import { AudioStreamProps } from './AudioStream';

const props = defineProps(AudioStreamProps);
const viewBackgroundConfigObj = useViewBackgroundConfig();
const { callType, isGroupCall } = toRefs(useCallInfoContext());
const { isFloatWindow } = toRefs(useFloatWindowContext());
const showAvatar = computed(() => !isGroupCall.value && !TUIGlobal.isPC);
const showUserName = computed(() => isGroupCall.value ? TUIGlobal.isPC : callType.value === CallMediaType.AUDIO);
const showMicVolume = computed(() => !isGroupCall.value && TUIGlobal.isPC && callType.value === CallMediaType.AUDIO);
const audioStreamStyle = computed(() => ({ zIndex: 1 }));
const bgImage = computed(() => viewBackgroundConfigObj.value[props.userId] || props.avatar);
const showViewMask = ref<boolean>(!viewBackgroundConfigObj.value[props.userId]);
const fit = ref<string>(viewBackgroundConfigObj.value[props.userId] ? 'fill' : 'cover');

watch([() => props.userId, viewBackgroundConfigObj], () => {
  if (viewBackgroundConfigObj.value[props.userId]) {
    fit.value = 'fill';
    showViewMask.value = false;
  } else {
    fit.value = 'cover';
    showViewMask.value = true;
  }
}, {
  immediate: true,
})

const handleError = () => {
  showViewMask.value = true;
  fit.value = 'cover';
};
</script>
