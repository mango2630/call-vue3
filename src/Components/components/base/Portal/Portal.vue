<template>
  <div>
    <PortalMini :disabled="disabled" v-if="IN_MINI_APP" ><slot /></PortalMini>
    <!-- @if process.env.BUILD_TARGET!='MINI' -->
    <PortalVue2 :disabled="disabled" :to="to" v-else-if="isVue2" :source="source" ><slot /></PortalVue2>
    <PortalVue3 :disabled="disabled" :to="to" v-else="isVue3" ><slot /></PortalVue3>
    <!-- @endif -->
  </div>
</template>

<script setup lang="ts">
import { computed } from '../../../../adapter-vue';
import PortalMini from './miniprogram/Portal.vue';
// @if process.env.BUILD_TARGET!='MINI'
import PortalVue2 from './vue2/Portal.vue';
import PortalVue3 from './vue3/Portal.vue';
// @endif
import { PortalProps } from './Portal';
import { checkVueVersion, IN_MINI_APP } from '../util';

defineProps(PortalProps);

const { majorVersion } = checkVueVersion();
const isVue3 = computed(() => majorVersion === '3');
const isVue2 = computed(() => majorVersion === '2');
</script>
