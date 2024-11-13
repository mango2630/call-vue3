<template>
  <div>
    <!-- @if process.env.BUILD_TARGET!='MINI' -->
    <StreamInfoPC
      v-if="isPC"
      :nickName="nickName"
      :isSelf="isSelf"
      :isMuted="isMuted"
      :volume="volume"
      :showNetWorkStatus="showNetWorkStatus"
    />
    <!-- @endif -->
    <StreamInfoMobile
      v-if="isGroupCall && !isPC"
      :showSwitchCameraButton="showSwitchCameraButton"
      :showVirtualBackgroundButton="showVirtualBackgroundButton"
      :showNetWorkStatus="showNetWorkStatus"
      :nickName="nickName"
      :showNickName="showNickName"
      :isSelf="isSelf"
      :isMuted="isMuted"
      :volume="volume"
    />
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
import { TUIGlobal } from '../../../../TUICallService';
// @if process.env.BUILD_TARGET!='MINI'
import StreamInfoPC from './StreamInfoPC.vue';
// @endif
import StreamInfoMobile from './StreamInfoMobile.vue';
import { StreamInfoProps } from './StreamInfo';
import { useCallInfoContext } from '../../../hooks';

const { isGroupCall } = useCallInfoContext();
const isPC = TUIGlobal.isPC;
defineProps(StreamInfoProps);
</script>
