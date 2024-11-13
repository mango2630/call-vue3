<template>
  <root-portal :enable="!disabled">
    <slot />
  </root-portal>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
}
</script>

<script setup lang="ts">
const props = defineProps(['disabled']);
</script>

<style scoped>
</style>