<template>
  <div :class="remoteClass">
    <live-player
      v-if="item && (item.hasAudio || item.hasVideo)"
      class="stream"
      :id="item.id"
      :data-userid="item.userID"
      :data-streamid="item.streamID"
      :data-streamtype="item.streamType"
      :src="item.src"
      mode="RTC"
      :autoplay="item.autoplay"
      :mute-audio="item.muteAudio"
      :mute-video="item.muteVideo"
      :orientation="item.orientation"
      :object-fit="item.objectFit"
      :background-mute="item.enableBackgroundMute"
      :min-cache="item.minCache"
      :max-cache="item.maxCache"
      :sound-mode="soundMode"
      :enable-recv-message="item.enableRecvMessage"
      :auto-pause-if-navigate="item.autoPauseIfNavigate"
      :auto-pause-if-open-native="item.autoPauseIfOpenNative"
      @statechange="playerStateChange"
      @fullscreenchange="playerFullscreenChange"
      @netstatus="playNetStatus"
      @audiovolumenotify="playerAudioVolumeNotify"
    />
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, computed } from '../../../../../adapter-vue';
import { TUICallKitServer, StoreName, NAME, TUIStore, AudioPlayBackDevice } from '../../../../../TUICallService/index';

const playerList = ref(TUIStore.getData(StoreName.CALL, NAME.PLAYER));
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const soundMode = ref(TUIStore.getData(StoreName.CALL, NAME.IS_EAR_PHONE) ? AudioPlayBackDevice.EAR : AudioPlayBackDevice.SPEAKER);
const props = defineProps({
  remoteClass: {
    type: String,
    required: true,
  },
  domId: {
    type: String,
  },
});

const handlePlayerListChange = (value) => {
  playerList.value = JSON.parse(JSON.stringify(value));
};

const item = computed(() => {
  return playerList.value?.find((player) => player?.userID === props.domId);
});

const handleCallStatusChange = (value) => {
  callStatus.value = value;
};

const handEarPhoneChange = (value) => {
  soundMode.value = value ? AudioPlayBackDevice.EAR : AudioPlayBackDevice.SPEAKER;
};

const watchOptions = {
  [NAME.PLAYER]: handlePlayerListChange,
  [NAME.CALL_STATUS]: handleCallStatusChange,
  [NAME.IS_EAR_PHONE]: handEarPhoneChange,
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, watchOptions, { notifyRangeWhenWatch: NAME.MYSELF });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});

function playerStateChange(e: any) {
  TUICallKitServer._tuiCallEngine._playerStateChange(e);
}

function playerFullscreenChange(e: any) {
  // TUICallKitServer._tuiCallEngine._playNetStatus(e);
}

function playNetStatus(e: any) {
  TUICallKitServer._tuiCallEngine._playNetStatus(e);
}

function playerAudioVolumeNotify(e: any) {
  TUICallKitServer._tuiCallEngine._playerAudioVolumeNotify(e);
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>
