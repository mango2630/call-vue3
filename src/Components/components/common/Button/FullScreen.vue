<template>
  <Button 
    :iconSrc="config.iconSrc"
    :iconSize="config.iconSize"
    @click="handleClick"
  >
  </Button>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
};
</script>

<script lang="ts" setup>
import { ref } from '../../../../adapter-vue';
import { toggleScreen } from '../../../util';
import Button from '../../base/Button/Button.vue';
import { useBtnConfig } from './hooks/useConfig'

const config = useBtnConfig('fullScreen', ref('basicConfig'));
const handleClick = async () => {
  await toggleScreen('tuicallkit-id');
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>
