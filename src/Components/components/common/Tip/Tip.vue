<template>
  <div>
    <Message :showIcon="false" :class="tipClassName" ref="message" :customStyle="customStyle"></Message>
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
};
</script>

<script setup lang="ts">
import { watch, ref, computed, toRefs } from '../../../../adapter-vue';
import { TUIGlobal } from '../../../../TUICallService';
import Message from '../../base/Message/Message.vue';
import { TipProps } from './Tip';
import { useFloatWindowContext, useTip, useCallInfoContext, useTranslate } from '../../../hooks';
import { filterObject } from '../../base/util';

const { isFloatWindow } = toRefs(useFloatWindowContext());
const { tip, duration } = useTip();
const t = useTranslate();
const { isGroupCall } = toRefs(useCallInfoContext());
const message = ref(null);
const props = defineProps(TipProps);
const isPC = TUIGlobal.isPC;

const tipClassName = computed(() => [props.customClass]);

const singleCustomStyle = computed(() =>
  filterObject({
    color: 'white',
    background: 'none',
    position: 'absolute',
    'z-index': 4,
    'align-items': 'center',
    left: '50%',
    top: `${isPC ? '60%' : '70%'}`,
    transform: 'translate(-50%, -50%)',
    'font-size': isFloatWindow.value ? '12px' : undefined,
  }),
);

const groupCustomStyle = computed(() =>
  filterObject({
    color: 'white',
    background: 'none',
    position: 'static',
    transform: 'none',
    'font-size': isFloatWindow.value ? '12px' : undefined,
  }),
);

const customStyle = computed(() => (isGroupCall.value ? groupCustomStyle.value : singleCustomStyle.value));

watch([tip, t, duration], () => {
  message.value?.show({
    message: t.value(tip.value),
    duration: duration.value,
    offset: 0,
  });
});
</script>
