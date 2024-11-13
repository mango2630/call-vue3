<template>
  <div :class="localClass">
    <div class="stream-box">
      <live-pusher
        class="stream"
        :url="pusher.url"
        :mode="pusher.mode"
        :autopush="true"
        :enable-camera="pusher.enableCamera"
        :enable-mic="true"
        :muted="!pusher.enableMic"
        :enable-agc="true"
        :enable-ans="true"
        :enable-ear-monitor="pusher.enableEarMonitor"
        auto-focus="false"
        :zoom="pusher.enableZoom"
        :min-bitrate="pusher.minBitrate"
        :max-bitrate="pusher.maxBitrate"
        :video-width="pusher.videoWidth"
        :video-height="pusher.videoHeight"
        :beauty="pusher.beautyLevel"
        :whiteness="pusher.whitenessLevel"
        :orientation="pusher.videoOrientation"
        :aspect="pusher.videoAspect"
        :device-position="pusher.frontCamera"
        :remote-mirror="pusher.enableRemoteMirror"
        :local-mirror="pusher.localMirror"
        :background-mute="pusher.enableBackgroundMute"
        :audio-quality="pusher.audioQuality"
        :audio-volume-type="pusher.audioVolumeType"
        :audio-reverb-type="pusher.audioReverbType"
        :waiting-img="pusher.waitingImage"
        :beauty-style="pusher.beautyStyle"
        :filter="pusher.filter"
        @statechange="pusherStateChangeHandler"
        @netstatus="pusherNetStatus"
        @error="pusherErrorHandler"
        @audiovolumenotify="pusherAudioVolumeNotify"
      ></live-pusher>
    </div>
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
import { TUICallKitServer, StoreName, NAME, TUIStore } from '../../../../../TUICallService/index';
import { onMounted, ref, onUnmounted } from '../../../../../adapter-vue';
const pusher = ref(TUIStore.getData(StoreName.CALL, NAME.PUSHER));
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const props = defineProps({
  localClass: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['toggleViewSize']);

const handlePusherChange = (value) => {
  pusher.value = Object.assign({}, pusher.value, value);
};

const handleCallStatusChange = (value) => {
  callStatus.value = value;
};

const watchOptions = {
  [NAME.PUSHER]: handlePusherChange,
  [NAME.CALL_STATUS]: handleCallStatusChange,
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, watchOptions, { notifyRangeWhenWatch: NAME.MYSELF });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});

function pusherStateChangeHandler(e: any) {
  TUICallKitServer._tuiCallEngine._pusherStateChangeHandler(e);
}

function pusherNetStatus(e: any) {
  TUICallKitServer._tuiCallEngine._pusherNetStatus(e);
}

function pusherErrorHandler(e: any) {
  TUICallKitServer.handlePusherError(e);
}

function pusherAudioVolumeNotify(e: any) {
  TUICallKitServer._tuiCallEngine._pusherAudioVolumeNotify(e);
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>
