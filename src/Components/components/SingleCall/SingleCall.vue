<template>
  <div class="singlecall-container">
    <TopBar />
    <Waiting v-if="callStatus === CallStatus.CALLING" />
    <MediaContainer />
    <Tip />
    <ButtonPanel />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from '../../../adapter-vue';
import { CallStatus } from '../../../TUICallService';
import TopBar from '../common/TopBar/TopBar.vue';
import Waiting from '../common/Waiting/Waiting.vue';
import MediaContainer from './MediaContainer/MediaContainer.vue';
import Tip from '../common/Tip/Tip.vue';
import ButtonPanel from '../common/ButtonPanel/ButtonPanel.vue';
import { useCallInfoContext } from '../../hooks';

const { callStatus } = toRefs(useCallInfoContext());
</script>

<style lang="scss" scoped>
.singlecall-container {
  height: 100%;
}
</style>