<template>
  <div id="float-window-id">
    <FloatWindowSingleCall v-if="!isGroupCall">
      <slot />
    </FloatWindowSingleCall>
    <FloatWindowGroupCall v-else>
      <slot />
    </FloatWindowGroupCall>
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
import { toRefs } from '../../../../../adapter-vue';
import FloatWindowSingleCall from './FloatWindowSingleCall.vue';
import FloatWindowGroupCall from './FloatWindowGroupCall.vue';
import { useCallInfoContext } from '../../../../hooks';

const { isGroupCall } = toRefs(useCallInfoContext());

</script>
