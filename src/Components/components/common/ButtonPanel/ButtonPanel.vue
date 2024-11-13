<template>
  <div :class="buttonPanelClassName">
    <div class="button-group">
      <Grid unit="%" @toggle="handleToggle" :layout="layout" :focus="focus">
        <GridItem index="accept" height="auto" :customStyle="customStyle">
          <Accept />
        </GridItem>
        <GridItem index="reject" height="auto" :customStyle="customStyle">
          <Reject />
        </GridItem>
        <GridItem index="microphone" height="auto" :customStyle="customStyle">
          <Microphone />
        </GridItem>
        <GridItem index="hangup" height="auto" :customStyle="customStyle">
          <Hangup />
        </GridItem>
        <GridItem index="speaker" height="auto" :customStyle="customStyle">
        <Speaker />
        </GridItem>
        <GridItem index="camera" height="auto" :customStyle="customStyle">
          <TKCamera />
        </GridItem>
        <GridItem index="virtualBackground" height="auto" :customStyle="customStyle">
          <VirtualBackground />
        </GridItem>
        <GridItem index="switchCamera" height="auto" :customStyle="customStyle">
          <SwitchCamera />
        </GridItem>
        <GridItem index="inviteUser" height="auto" :customStyle="customStyle">
          <InviteUser />
        </GridItem>
      </Grid>
    </div>
    <div v-if="showButtonPanelBackground" :class="toggleButtonContainerClassName">
      <ToggleButtonPanel />
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

<script lang="ts" setup>
import { ref, computed, toRefs, watch, watchEffect, provide, onMounted, onUnmounted } from '../../../../adapter-vue';
import { NAME, StoreName, TUIGlobal, TUIStore } from '../../../../TUICallService';
import Grid from '../../base/Grid/Grid.vue';
import GridItem from '../../base/Grid/GridItem/GridItem.vue';
import { useButtonPanelLayout } from './hooks/useButtonPanelLayout';
import TKCamera from '../../common/Button/Camera.vue';
import Hangup from '../../common/Button/Hangup.vue';
import Accept from '../../common/Button/Accept.vue';
import Microphone from '../../common/Button/Microphone.vue';
import Reject from '../../common/Button/Reject.vue';
import Speaker from '../../common/Button/Speaker.vue';
import SwitchCamera from '../../common/Button/SwitchCamera.vue';
import VirtualBackground from '../../common/Button/VirtualBackground.vue';
import ToggleButtonPanel from '../../common/Button/ToggleButtonPanel.vue';
import InviteUser from '../../common/Button/InviteUser.vue';
import { IsClickableContextKey, PopoverContextKey } from '../../../context';
import { classNames } from '../../base/util';
import { useButtonPanelStatus, useCallInfoContext, useFocusContext } from '../../../hooks';

const focus = ref(null);
const buttonProps = ref({});
const { isGroupCall } = toRefs(useCallInfoContext());
const { status: panelStatus } = useButtonPanelStatus() || {};
const showButtonPanelBackground = ref(false);
const IsClickableContextValue = ref(false);
const PopoverContextValue = ref('');

const focusElement = useFocusContext();

watchEffect(() => {
  if (showButtonPanelBackground.value) {
    return;
  }

  if (isGroupCall.value && !TUIGlobal.isPC && focusElement.value !== null) {
    showButtonPanelBackground.value = true;
  } else {
    showButtonPanelBackground.value = false;
  }
});

const buttonPanelClassName = computed(() => classNames([
  'button-panel-container',
  {
    pc: TUIGlobal.isPC,
    mobile: !TUIGlobal.isPC,
    h5: TUIGlobal.isH5,
    groupCall: isGroupCall.value,
    singleCall: !isGroupCall.value,
    close: panelStatus?.value === 'close',
    open: panelStatus?.value === 'open',
    showBackGround: showButtonPanelBackground.value,
  },
]));
const toggleButtonContainerClassName = classNames([
  'toggle-button-container',
  { h5: TUIGlobal.isH5 },
]);
const customStyle = TUIGlobal.isH5 ? {
  transitionProperty: 'width,height,left,top',
  transitionDuration: '0.3s',
  transitionTimingFunction: 'ease-in',
} : {};

function handleToggle(value) {
  focus.value = value;
}

const { layout, config } = useButtonPanelLayout();

watch(config, () => {
  const propsConfig = {};
  const flatConfig = config.value.flat();

  for (let item of flatConfig) {
    const { name, props = {} } = item;

    if (props.showText !== false) {
      props.showText = true;
    }
    propsConfig[name] = props;
  }

  buttonProps.value = propsConfig;
}, { immediate: true });

function handleIsClickableChange(value) {
  IsClickableContextValue.value = value;
}

const watchOptions = {
  [NAME.IS_CLICKABLE]: handleIsClickableChange,
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
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});

provide(IsClickableContextKey, IsClickableContextValue);
provide(PopoverContextKey, PopoverContextValue);
</script>

<style lang="scss" scoped>
.button-panel-container {
  position: absolute;
  z-index: 1;
  &.pc {
    width: 60%;
    height: 63px;
    margin: 0 auto;
    bottom: 6%;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
  }

  &.mobile {
    display: flex;
    justify-content: center;
    height: 27%;
    bottom: 0;
    width: 100%;

    &.h5 {
      transition-property: width,height,left,top;
      transition-duration: 0.3s;
      transition-timing-function: ease-in;
    }

    &.groupCall {
      &.showBackGround {
        background-color:#4F586B;
      }
    }

    .button-group {
      position: absolute;
      width: 72%;
      top: 2vh;
      height: 80%;
    }

    &.close {
      height: 14%;
      align-items: center;

      .button-group {
        position: absolute;
        width: 72%;
        right: 6.2vw;
        height: 40px;
        top: auto;
        bottom: auto;
      }
    }
  }

  .button-group {
    position: relative;
    height: 100%;
  }

  .toggle-button-container {
    display: flex;
    align-items: center;
    position: absolute;
    left: 8.2vw;

    &.h5 {
      transition-property: width,height,left,top;
      transition-duration: 0.3s;
      transition-timing-function: ease-in;
    }
  }

  &.open {
    .toggle-button-container {
      bottom: 6vh;
    }
  }
}
</style>
