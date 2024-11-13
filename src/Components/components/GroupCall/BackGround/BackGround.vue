<template>
  <Overlay
    bgColor="#22262ed9"
    :bgImage="defaultAvatarSrc"
    :customStyle="{ position: 'absolute', zIndex: 0 }"
  />
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
}
</script>

<script lang="ts" setup>
import Overlay from '../../base/Overlay/Overlay.vue';
import defaultAvatarSrc from '../../../assets/common/defaultAvatar.svg';
</script>
