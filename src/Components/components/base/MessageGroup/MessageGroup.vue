<template>
  <div>
    <Message 
      v-for="(item, index) in messageList"
      :isShow="item.isShow"
      :message="item.message"
      :type="item.type"
      :offset="handleOffset(index)"
      :duration="item.duration"
      :showClose="item.showClose"
      :key="index"
      ></Message>
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  }
}
</script>

<script setup lang="ts">
import { watch } from '../../../../adapter-vue';
import Message from '../Message/Message.vue';
const props = defineProps(['messageList']);
const handleOffset = (index: number) => {
  return 16 + 50 * index; // 16 represents the default offset, and 50 is the distance between the two messages
}
watch(
  () => props.messageList,
  () => {},
  { immediate: true },
)
</script>

