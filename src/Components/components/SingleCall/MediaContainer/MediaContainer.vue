<template>
  <Portal id="source" :disabled="!isFloatWindow" source="#source" to="body">
    <FloatWindow>
      <div :class="singleMediaContainerClassName">
        <ToggleWindow
          :big-window="largeViewName"
          :show-small-window="showSmallWindow"
          @toggle="handleToggle"
        >
          <ToggleWindowItem :value="ViewName.LOCAL" :key="ViewName.LOCAL">
            <Pusher
              :domId="localUserInfoExcludeVolume.domId"
              :show-audio-stream="!localUserInfoExcludeVolume.isVideoAvailable"
            >
              <template v-slot:audio-stream>
                <AudioStream
                  :userId="localUserInfoExcludeVolume.userId"
                  :username="localUserInfoExcludeVolume.displayUserInfo"
                  :avatar="localUserInfoExcludeVolume.avatar"
                  :is-video-available="localUserInfoExcludeVolume.isVideoAvailable"
                  :is-small-window="!(largeViewName === ViewName.LOCAL)"
                  :is-muted="!localUserInfoExcludeVolume.isAudioAvailable"
                  :volume="volumeMap && volumeMap[localUserInfoExcludeVolume.domId]"
                />
              </template>
              <template v-slot:stream-info>
                <TKStreamInfo
                  v-if="callType === CallMediaType.VIDEO"
                  :nick-name="localUserInfoExcludeVolume.displayUserInfo"
                  :is-self="true"
                  :is-muted="!localUserInfoExcludeVolume.isAudioAvailable"
                  :volume="volumeMap && volumeMap[localUserInfoExcludeVolume.domId]"
                />
              </template>
            </Pusher>
          </ToggleWindowItem>
          <ToggleWindowItem :value="ViewName.REMOTE" :key="ViewName.REMOTE">
            <Player
              :dom-id="playerDomId"
              :show-audio-stream="!isPusherVideoAvailable"
            >
              <template v-slot:audio-stream>
                <AudioStream
                  :userId="remoteUserListExcludeVolume[0] && remoteUserListExcludeVolume[0].userId"
                  :username="remoteUserListExcludeVolume[0] && remoteUserListExcludeVolume[0].displayUserInfo"
                  :avatar="remoteUserListExcludeVolume[0] && remoteUserListExcludeVolume[0].avatar"
                  :is-video-available="isPusherVideoAvailable"
                  :is-small-window="!(largeViewName === ViewName.REMOTE)"
                  :is-muted="remoteUserListExcludeVolume[0] && !remoteUserListExcludeVolume[0].isAudioAvailable"
                  :volume="remoteStreamVolume"
                />
              </template>
              <template v-slot:stream-info>
                <TKStreamInfo
                  v-if="callType === CallMediaType.VIDEO"
                  :nick-name="remoteUserListExcludeVolume[0] && remoteUserListExcludeVolume[0].displayUserInfo"
                  :is-muted="remoteUserListExcludeVolume[0] && !remoteUserListExcludeVolume[0].isAudioAvailable"
                  :volume="remoteStreamVolume"
                />
              </template>
            </Player>
          </ToggleWindowItem>
        </ToggleWindow>
      </div>
    </FloatWindow>
</Portal>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script setup lang="ts">
import { ref, watch, toRefs, computed } from '../../../../adapter-vue';
import { CallMediaType, CallStatus, TUIGlobal } from '../../../../TUICallService';
import ToggleWindow from '../../base/ToggleWindow/ToggleWindow.vue';
import Portal from '../../base/Portal/Portal.vue';
import ToggleWindowItem from '../../base/ToggleWindow/ToggleWindowItem/ToggleWindowItem.vue';
import TKStreamInfo from '../../common/TKStreamInfo/TKStreamInfo.vue';
import Pusher from '../../common/Pusher/Pusher.vue';
import Player from '../../common/Player/Player.vue';
import AudioStream from '../../common/AudioStream/AudioStream.vue';
import FloatWindow from '../../common/FloatWindow/FloatWindow.vue';
import {
  useUserInfoExcludeVolumeContext,
  useCallInfoContext,
  useGetVolumeMap,
  usePlayer,
  useFloatWindowContext,
} from '../../../hooks';
import { useGetLargeViewName } from '../hooks/useGetLargeViewName';
import { classNames } from '../../base/util';
import { ViewName } from '../../../../TUICallService/const/index';

const largeViewName = useGetLargeViewName();
const showSmallWindow = ref(true);
const { isFloatWindow } = toRefs(useFloatWindowContext());
function toggle() {
  isFloatWindow.value = !isFloatWindow.value;
}
const { localUserInfoExcludeVolume, remoteUserListExcludeVolume } = toRefs(useUserInfoExcludeVolumeContext());
const volumeMap = useGetVolumeMap();
const { callType, callStatus } = toRefs(useCallInfoContext());
const wxPlayer = usePlayer();

const isPusherVideoAvailable = computed(() => TUIGlobal.isWeChat
  ? wxPlayer.value?.find(item => item?.userID === remoteUserListExcludeVolume.value?.[0]?.userId)?.hasVideo
  : remoteUserListExcludeVolume.value?.[0]?.isVideoAvailable
);
const playerDomId = computed(() => remoteUserListExcludeVolume.value?.[0]?.domId);
const remoteStreamVolume = computed(() => volumeMap.value?.[remoteUserListExcludeVolume.value?.[0]?.domId]);

watch([callType, callStatus], () => {
  if (callType.value === CallMediaType.AUDIO || callStatus.value === CallStatus.CALLING) {
    showSmallWindow.value = false;
  } else {
    showSmallWindow.value = true;
  }
}, {
  immediate: true,
});

const singleMediaContainerClassName = computed(() => classNames([
  'singlecall-media-container',
  {
    mobile: !TUIGlobal.isPC,
    pc: TUIGlobal.isPC,
    float: isFloatWindow.value,
  }
]));

function handleToggle(value) {
  largeViewName.value = value;
}
</script>

<style lang="scss" scoped>
.singlecall-media-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;

  &.float {
    position: relative;
  }

  &.pc {
    border-radius: 12px;
    overflow: hidden;
  }
}
.roggle-btn {
  position: absolute;
  left: 100px;
  z-index: 100;
  top: 0;
}
</style>
