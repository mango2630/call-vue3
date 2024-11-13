<template>
  <Portal id="source" :disabled="!isFloatWindow" source="#source" to="body">
    <FloatWindow>
      <div
        :class="groupMediaContainerClassName"
        :style="[mediaContainerStyle]"
      >
        <Grid
          :unit="unit"
          :enable-focus="enableFocus"
          :focus="focus"
          :length="streamLength"
          :layout="layout"
          @toggle="changeFocus"
        >
          <GridItem :index="0" :key="localUserInfoExcludeVolume.userId">
            <Pusher
              :domId="localUserInfoExcludeVolume.domId"
              :show-audio-stream="!localUserInfoExcludeVolume.isVideoAvailable"
              :show="visibleStreamIdList.includes(localUserInfoExcludeVolume.domId) && showStream"
            >
              <template v-slot:audio-stream>
                <AudioStream
                  :user-id="localUserInfoExcludeVolume.userId"
                  :username="localUserInfoExcludeVolume.displayUserInfo"
                  :avatar="localUserInfoExcludeVolume.avatar"
                  :is-video-available="localUserInfoExcludeVolume.isVideoAvailable"
                />
              </template>
              <template v-slot:loading>
                <StreamLoading v-if="isPusherLoading" />
              </template>
              <template v-slot:stream-info>
                <TKStreamInfo
                  v-if="!isFloatWindow"
                  :is-self="true"
                  :show-nick-name="showNickName"
                  :showSwitchCameraButton="showSwitchCameraButton"
                  :showVirtualBackgroundButton="showVirtualBackgroundButton"
                  :showNetWorkStatus="isShowNetWork(localUserInfoExcludeVolume.userId)"
                  :nickName="localUserInfoExcludeVolume.displayUserInfo"
                  :isMuted="!localUserInfoExcludeVolume.isAudioAvailable"
                  :volume="volumeMap && volumeMap[localUserInfoExcludeVolume.domId]"
                />
              </template>
            </Pusher>
          </GridItem>
          <GridItem v-for="(remoteStreamItem, index) in remoteUserListExcludeVolume" :key="remoteStreamItem.userId" :index="index + 1">
            <Player
              :domId="remoteStreamItem.domId"
              :show-audio-stream="isShowAudioStream(remoteStreamItem)"
              :show="visibleStreamIdList.includes(remoteStreamItem.domId) && showStream"
            >
              <template v-slot:audio-stream>
                <AudioStream
                  :user-id="remoteStreamItem.userId"
                  :username="remoteStreamItem.displayUserInfo"
                  :avatar="remoteStreamItem.avatar"
                />
              </template>
              <template v-slot:loading>
                <StreamLoading v-if="!remoteStreamItem.isEnter" />
              </template>
              <template v-slot:stream-info>
                <TKStreamInfo
                  v-if="!isFloatWindow"
                  :show-nick-name="TUIGlobal.isPC || String(focus) === String(index + 1)"
                  :show-control-button="false"
                  :showNetWorkStatus="isShowNetWork(remoteStreamItem.userId)"
                  :nickName="remoteStreamItem.displayUserInfo"
                  :is-muted="isMute(remoteStreamItem)"
                  :volume="volumeMap && volumeMap[remoteStreamItem.domId]"
                />
              </template>
            </Player>
          </GridItem>
        </Grid>
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
import { CallMediaType, CallStatus, TUIGlobal, CallRole } from '../../../../TUICallService';
import Pusher from '../../common/Pusher/Pusher.vue';
import Player from '../../common/Player/Player.vue';
import Grid from '../../base/Grid/Grid.vue';
import GridItem from '../../base/Grid/GridItem/GridItem.vue';
import AudioStream from '../../common/AudioStream/AudioStream.vue';
import TKStreamInfo from '../../common/TKStreamInfo/TKStreamInfo.vue';
import FloatWindow from '../../common/FloatWindow/FloatWindow.vue';
import Portal from '../../base/Portal/Portal.vue';
import {
  useUserInfoExcludeVolumeContext,
  useCallInfoContext,
  usePlayer,
  useGetVolumeMap,
  useFloatWindowContext,
  useFocusContext,
  useButtonPanelStatus,
  useGroupCallLayout,
  useCustomUI,
  useNetWorkStatus
} from '../../../hooks';
import { classNames } from '../../base/util';
import StreamLoading from './StreamLoading/StreamLoading.vue';

const bigWindow = ref('local');
const focus = ref(null);
const showSmallWindow = ref(false);
const customUI = useCustomUI();

const { localUserInfoExcludeVolume, remoteUserListExcludeVolume } = toRefs(useUserInfoExcludeVolumeContext());
const { callStatus, callType, isShowEnableVirtualBackground, callRole } = toRefs(useCallInfoContext());
const { netWorkQualityList } = useNetWorkStatus();
const streamLength = computed(() => remoteUserListExcludeVolume.value.length + 1);
const wxPlayer = usePlayer();
const layout = useGroupCallLayout(focus, streamLength);
const volumeMap = useGetVolumeMap();
const { isFloatWindow } = toRefs(useFloatWindowContext());
const focusElement = useFocusContext();
const { status: panelStatus } = useButtonPanelStatus() || {};
const enableFocus = !TUIGlobal.isPC;
const isCurrentUserStreamZoomIn = computed(() => String(focus.value) === '0');
const showControlButton = computed(() => !TUIGlobal.isPC && isCurrentUserStreamZoomIn.value && localUserInfoExcludeVolume.value.isVideoAvailable)

const showSwitchCameraButton = computed(() => showControlButton.value);
const showVirtualBackgroundButton = computed(() => showControlButton.value && isShowEnableVirtualBackground.value && TUIGlobal.isWeChat);
const showNickName = computed(() => TUIGlobal.isPC || isCurrentUserStreamZoomIn.value);
const unit = computed(() => (TUIGlobal.isPC || isFloatWindow.value) ? '%' : 'vw');
const visibleStreamIdList = computed(() => {
  return [localUserInfoExcludeVolume.value, ...remoteUserListExcludeVolume.value].map((stream) => {
    if (isFloatWindow.value) {
      if (volumeMap.value?.[stream.domId] >= 10) {
        return stream.domId;
      }
    } else {
      return stream.domId;
    }
  });
});
const showStream = computed(() => !(
  callRole.value === CallRole.CALLEE
  && callStatus.value === CallStatus.CALLING
  && !isFloatWindow.value
));

const mediaContainerStyle = computed(() => {
  let visibility = '';

  if (callRole.value === CallRole.CALLEE && callStatus.value === CallStatus.CALLING && !isFloatWindow.value) {
    visibility = 'hidden';
  }

  return {
    visibility,
  }
});

function changeFocus(value) {
  focus.value = value;
  focusElement.value = value;
  panelStatus.value = value !== null ? 'close' : 'open';
}

function isShowAudioStream(stream) {
  if (TUIGlobal.isWeChat) {
    return !(wxPlayer.value?.find(item => item.userID === stream.userId)?.hasVideo);
  } else {
    return !stream.isVideoAvailable;
  }
}
function isMute(stream) {
  if (TUIGlobal.isWeChat) {
    return !(wxPlayer.value?.find(item => item.userID === stream.userId)?.hasAudio);
  } else {
    return !stream.isAudioAvailable;
  }
}

function isShowNetWork(userId) {
  if(!netWorkQualityList.value) return;
  const isRemoteUser = userId !== localUserInfoExcludeVolume.value.userId;
  if(!TUIGlobal.isWeChat && isRemoteUser) return;
  const targetNetwork = netWorkQualityList.value.find(item => item.userId === userId);
  return targetNetwork && targetNetwork?.quality >= 4;
}

watch([remoteUserListExcludeVolume, callType], () => {  
  if (remoteUserListExcludeVolume.value?.[0]?.isEnter) {
    bigWindow.value = 'remote';
  }

  if (callType.value === CallMediaType.AUDIO) {
    showSmallWindow.value = false;
  } else {
    showSmallWindow.value = true;
  }
});
const groupMediaContainerClassName = computed(() => classNames([
  'groupcall-media-container',
  {
    mobile: !TUIGlobal.isPC,
    pc: TUIGlobal.isPC,
    'two-layout': streamLength.value === 2 && focus.value === null,
    float: isFloatWindow.value,
  }
]));
const isPusherLoading = computed(() => {
  if (callStatus.value === CallStatus.CALLING) {
    if ((callType.value === CallMediaType.AUDIO && !localUserInfoExcludeVolume.value.isAudioAvailable)
          || (callType.value === CallMediaType.VIDEO && !localUserInfoExcludeVolume.value.isVideoAvailable)) {
      return true;
    }
  }

  return false;
});
</script>

<style lang="scss" scoped>
.groupcall-media-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;

  &.pc {
    border-radius: 12px;
    overflow: hidden;

    &.two-layout {
      margin-top: 20%;
    }

    .tk-toggle-window-item--small {
      top: 2%;
      left: 2%;
      width: 22%;
      height: 21%;
      border-radius: 12px;
      overflow: hidden;
    }
  }

  &.mobile {
    margin-top: 5.5vh;

    &.float {
      margin-top: 0;
    }

    &.two-layout {
      margin-top: 15vh;

      &.float {
        margin-top: 0;
      }
    }
  }
}
</style>
