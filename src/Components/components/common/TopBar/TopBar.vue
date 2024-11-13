<template >
<div :style="customStyle" class="top-bar-container">
  <!-- @if process.env.BUILD_TARGET!='MINI' -->
  <Row v-if="isPC">
    <Col :span="8" />
    <Col :span="8" justify="center" align="center">
      <Timer v-if="showTimer" :call-duration="callDuration" />
    </Col>
    <Col :span="8" justify="end" align="center">
      <Row>
        <Col :span="18" />
        <Col :span="3" justify="center">
          <Minimize v-if="showMinimize" />
        </Col>
        <Col :span="3" justify="center">
          <FullScreen v-if="allowedFullScreen" />
        </Col>
      </Row>
    </Col>
  </Row>
  <!-- @endif -->
  <Row v-if="!isPC">
    <Col :span="8" align="center">
      <Row>
        <Col :span="8" justify="center">
          <Minimize v-if="!isPC && showMinimize" />
        </Col>
        <Col :span="16" />
      </Row>
    </Col>
    <Col :span="8" justify="center" align="center">
      <Timer v-if="showTimer" :call-duration="callDuration" />
    </Col>
    <Col :span="8" justify="end" align="center">
      <Row>
        <Col :span="16" />
        <Col :span="8" justify="center">
          <InviteUser v-if="showInviteUser" :show-text="isPC" />
        </Col>
      </Row>
    </Col>
  </Row>
</div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
}
</script>

<script setup lang="ts">
import { toRefs, computed, ref, onMounted, onUnmounted } from '../../../../adapter-vue';
import { useCallInfoContext, useCallDuration, useCustomUI } from '../../../hooks';
import { CallRole, CallStatus, FeatureButton, NAME, StoreName, TUIGlobal, TUIStore } from '../../../../TUICallService';
import { TopBarProps } from './TopBar';
import Row from '../../base/Layout/Row/Row.vue';
import Col from '../../base/Layout/Col/Col.vue';
import Minimize from '../Button/Minimize.vue';
// @if process.env.BUILD_TARGET!='MINI'
import FullScreen from '../Button/FullScreen.vue';
// @endif
import InviteUser from '../Button/InviteUser.vue';
import Timer from '../Timer/Timer.vue';

defineProps(TopBarProps);
const isPC = TUIGlobal.isPC;
const { callStatus, isGroupCall, callRole, allowedFullScreen } = toRefs(useCallInfoContext());
const { callDuration } = useCallDuration();
const customUIConfig = useCustomUI();
const showTimer = computed(() => (callStatus.value === CallStatus.CONNECTED));
const showMinimize = ref(TUIStore.getData(StoreName.CALL, NAME.ENABLE_FLOAT_WINDOW));
const showInviteUser = computed(() => {
  if (
    !isGroupCall.value
    || customUIConfig.value.button?.[FeatureButton.InviteUser]?.show === false
  ) {
    return false;
  }

  if (callStatus.value === CallStatus.CALLING) {
    return callRole.value === CallRole.CALLER;
  }

  return true;
});
function handleEnableFloatWindowChange(value) {
  showMinimize.value = value;
}
const watchOptions = {
  [NAME.ENABLE_FLOAT_WINDOW]: handleEnableFloatWindowChange,
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
  TUIStore.unwatch(StoreName.CALL, {
    ...watchOptions,
  });
});
</script>

<style lang="scss" scoped>
.top-bar-container {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 5.8%;
  display: flex;
  align-items: center;
}
</style>
