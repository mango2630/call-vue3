
<template>
  <div class="stream-loading-container">
    <Loading mode="dot" color="#FFF" loadingWidth="50px" loadingHeight="50px" />
  </div>
</template>

<script lang="ts" setup>
import Loading from '../../../base/Loading/Loading.vue';
</script>

<style scoped>
.stream-loading-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
