<template>
  <div v-if="showModal" class="card">
    <div class="card-body">
      <div class="close" @click="handleClose"><CloseIcon /></div>
      <div class="card-wrapper">
        <div class="title">{{ t('browser-authorization') }}</div>
        <div class="button">{{ t(preferences) }}</div>
        <div class="allow">{{ t(privacy) }}</div>
        <div class="image-wrapper">
          <img :src="permitPng" class="image" alt="system permit">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from '../../../../adapter-vue';
import { TUIGlobal, TUIStore } from '../../../../TUICallService';
import CloseIcon from './CloseIcon.vue';
import { useTranslate } from '../../../hooks';
import { NAME, PLATFORM, StoreName } from '../../../../TUICallService/const';
import {
  MacPermitZhPng,
  MacPermitEnPng,
  WinPermitZhPng,
  WinPermitEnPng,
} from '../../../assets/desktop/permission/index';

const permitPngMap = {
  mac: {
    'zh-cn': MacPermitZhPng,
    en: MacPermitEnPng,
  },
  win: {
    'zh-cn': WinPermitZhPng,
    en: WinPermitEnPng,
  },
};

const props = defineProps<{
  platform: PLATFORM,
  language: string,
}>();

const privacy = computed(() => props.platform === 'mac' ? 'mac-privacy' : 'win-privacy');
const preferences = computed(() => props.platform === 'mac' ? 'mac-preferences' : 'win-preferences');
const permitPng = ref(MacPermitZhPng);
const showModal = ref(true);
const t = useTranslate();

const handlePermissionErrorTipChange = (data) => {
  if (data && TUIGlobal.isPC) {
    showModal.value = true;
  }
};
const handleClose = () => {
  showModal.value = false;
};

watch(() => props.language, () => {
  permitPng.value = permitPngMap[props.platform][props.language];
}, {
  immediate: true,
});

onMounted(() => {
  TUIStore.watch(StoreName.CALL, {
    [NAME.SHOW_PERMISSION_TIP]: handlePermissionErrorTipChange,
  }, {
    notifyRangeWhenWatch: NAME.MYSELF,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, {
    [NAME.SHOW_PERMISSION_TIP]: handlePermissionErrorTipChange,
  });
});
</script>

<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  overflow: hidden;
  color: #303133;
  transition: .3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 10%);
  .card-body {
    padding: 20px;
  }
}
.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  position: relative;
  .button {
    box-sizing: border-box;
    background-color: #104ef5;
    color: #fff;
    font-size: 12px;
    height: 37px;
    border-radius: 4px;
    padding: 10px;
  }
  .image-wrapper {
    box-sizing: border-box;
  }
}

.title {
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
}

.desc {
  font-size: 12px;
  margin-bottom: 10px;
}

.button {
  background-color: #104EF5;
  color: #fff;
  font-size: 12px;
  height: 37px;
  border-radius: 4px;
  padding: 10px;
}

.allow {
  font-size: 12px;
  color: #666;
  padding: 10px 0 20px 0;
}

.image {
  width: 100%;
  border-radius: 10px;
}

.close {
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  right: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>
