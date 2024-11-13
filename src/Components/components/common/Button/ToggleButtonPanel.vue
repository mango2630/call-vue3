<template>
  <div class="btn-content">
    <Button
      :iconSrc="config.iconSrc"
      :color="config.color"
      :iconSize="props.iconSize || config.iconSize"
      :width="props.width || config.width"
      :height="props.height || config.height"
      :shape="config.shape"
      @click="handleClick"
    >
    </Button>
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
import { ref } from '../../../../adapter-vue';
import Button from '../../base/Button/Button.vue';
import { ButtonProps } from './props/Button';
import { useBtnConfig } from './hooks/useConfig';
import { useButtonPanelStatus } from '../../../hooks';

const { status: panelStatus } = useButtonPanelStatus();

const props = defineProps(ButtonProps);
const config = useBtnConfig('toggleButtonPanel', ref('basicConfig'));

const handleClick = async () => {
  panelStatus.value = panelStatus.value === 'close' ? 'open' : 'close';
};
</script>

<style lang="scss" scoped>
@import './style/common.scss';
</style>

