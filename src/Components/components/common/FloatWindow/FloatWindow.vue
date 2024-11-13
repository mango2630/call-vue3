<template>
  <div :class="floatWindowContainerClassName">
    <!-- @if process.env.BUILD_TARGET!='MINI' -->
    <FloatWindowPC v-if="TUIGlobal.isPC">
      <slot />
    </FloatWindowPC>
    <!-- @endif -->
    <FloatWindowMobile v-if="!TUIGlobal.isPC">
      <slot />
    </FloatWindowMobile>
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
import { computed, toRefs } from '../../../../adapter-vue';
// @if process.env.BUILD_TARGET!='MINI'
import FloatWindowPC from './desktop/FloatWindow.vue';
// @endif
import FloatWindowMobile from './mobile/FloatWindow.vue';
import { TUIGlobal } from '../../../../TUICallService';
import { classNames } from '../../base/util';
import { useFloatWindowContext } from '../../../hooks';

const { isFloatWindow } = toRefs(useFloatWindowContext());

const floatWindowContainerClassName = computed(() => classNames([
  'float-window-container',
  {
    float: isFloatWindow.value,
    'not-float': !isFloatWindow.value,
    pc: TUIGlobal.isPC,
    mobile: !TUIGlobal.isPC,
  },
]));

</script>

<style lang="scss" scoped>
.float-window-container {
  &.not-float {
    width: 100%;
    height: 100%;
  }

  &.float {
    position: absolute;

    &.pc {
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.mobile {
      top: 150px;
      right: 0;
    }
  }
}
</style>