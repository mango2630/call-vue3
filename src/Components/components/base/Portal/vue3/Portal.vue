<template>
  <!-- #ifndef MP-WEIXIN -->
  <Teleport :disabled="disabled" :to="to">
    <slot />
  </Teleport>
  <!-- #endif -->
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
}
</script>

<script setup lang="ts">
defineProps(['disabled', 'to']);
</script>
