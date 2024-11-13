<template>
  <Row>
    <Col :span="12" justify="start" align="center">
      <div class="stream-userInfo">
        <MicrophoneVolume class="mic-volume" :is-muted="isMuted" :volume="volume"></MicrophoneVolume>
        <div class="nickname">
          <TKText color="#fff" :truncated="true" width="80px" size="14px">{{ nickName }}</TKText>
          <TKText color="#fff" v-show="isSelf" size="14px">{{ t('me') }}</TKText>
        </div>
      </div>
    </Col>
    <Col :span="12" justify="center">
      <div v-if="showNetWorkStatus">
        <TKImage width="24px" height="24px" :src="networkSrc" />
      </div>
    </Col>
  </Row>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script setup lang="ts">
import MicrophoneVolume from '../MicrophoneVolume/MicrophoneVolume.vue';
import TKText from '../../base/TKText/TKText.vue';
import TKImage from '../../base/TKImage/TKImage.vue';
import Row from '../../base/Layout/Row/Row.vue';
import Col from '../../base/Layout/Col/Col.vue';
import { useTranslate } from '../../../hooks';
import { StreamInfoProps } from './StreamInfo';
import networkSrc from '../../../assets/streamInfo/networkStatus.png';
import { t } from '../../../../TUICallService';

defineProps(StreamInfoProps);

const t = useTranslate();
</script>

<style lang="scss" scoped>
$stream-info-bg-color: #000000a6;
$stream-info-font-color: #fff;
.stream-userInfo {
  padding: 2px 5px;
  display: flex;
  align-items: center;
  background-color: $stream-info-bg-color;
  color: $stream-info-font-color;

  .nickname {
    display: flex;
  }
}
</style>
