<template>
<Row :custom-style="{ padding: '2px 5px' }">
  <Col :span="12" justify="start" align="center">
    <TKText
      v-if="showNickName"
      width="100px"
      :truncated="true"
      color="#FFF"
    >
      {{ nickName }}
    </TKText>
    <div v-show="!isMuted && volume">
      <Icon :size="24" :src="MicOnH5"></Icon>
    </div>
    <div v-show="isMuted">
      <Icon :size="24" :src="MicOffH5"></Icon> 
    </div>
  </Col>
  <Col :span="12" justify="end" align="center">
    <div v-if="showNetWorkStatus">
      <TKImage width="24px" height="24px" :src="networkSrc" />
    </div>
    <div v-if="showSwitchCameraButton" class="switch-camera stream-icon" @click.stop="switchCamera">
      <TKImage width="15px" height="15px" :src="SwitchCameraSrc" />
    </div>
    <div v-if="showVirtualBackgroundButton" class="stream-icon" @click.stop="setBlurBackground">
      <TKImage width="15px" height="15px" :src="VirtualBackgroundOpenSrc" />
    </div>
  </Col>
</Row>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
}
</script>
  
<script setup lang="ts">
import { toRefs } from '../../../../adapter-vue';
import { StreamInfoProps } from './StreamInfo';
import Row from "../../base/Layout/Row/Row.vue";
import Col from "../../base/Layout/Col/Col.vue";
import Icon from '../../base/Icon/Icon.vue';
import TKImage from '../../base/TKImage/TKImage.vue';
import TKText from '../../base/TKText/TKText.vue';
import { TUICallKitServer } from '../../../../TUICallService';
import MicOnH5 from '../../../assets/streamInfo/mobile/mic-on-h5.svg';
import MicOffH5 from '../../../assets/streamInfo/mobile/mic-off-h5.svg';
import SwitchCameraSrc from '../../../assets/button/mobile/switch-camera.svg';
import VirtualBackgroundOpenSrc from '../../../assets/button/background-blur-open.svg';
import networkSrc from '../../../assets/streamInfo/networkStatus.png'
import { useCallInfoContext } from '../../../hooks';

defineProps(StreamInfoProps);
const { enableVirtualBackground } = toRefs(useCallInfoContext());

const switchCamera = async () => {
  await TUICallKitServer.switchCamera();
};

const setBlurBackground = async () => {
  await TUICallKitServer.setBlurBackground(!enableVirtualBackground.value);
};
</script>

<style lang="scss" scoped>
.stream-icon {
  width: 30px;
  height: 30px;
  background: #22262e80;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.switch-camera {
  margin: 0px 12px;
}
</style>
