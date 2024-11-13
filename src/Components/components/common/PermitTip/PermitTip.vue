<template>
  <div class="tip">
    <div class="card">
      <SystemPermitTip
        :platform="platform"
        :language="language"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, computed } from '../../../../adapter-vue';
import { NAME, StoreName, TUIStore, TUIGlobal } from '../../../../TUICallService';
import { PLATFORM } from '../../../../TUICallService/const/index';
import SystemPermitTip from './SystemPermitTip.vue';

const platform = computed(() => (TUIGlobal.isMAC ? PLATFORM.MAC : PLATFORM.WIN));
const language = ref(TUIStore.getData(StoreName.CALL, NAME.LANGUAGE));

const updateLanguage = value => language.value = value;

onMounted(() => {
  TUIStore.watch(StoreName.CALL, {
    [NAME.LANGUAGE]: updateLanguage,
  }, {
    notifyRangeWhenWatch: NAME.MYSELF,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, {
    [NAME.LANGUAGE]: updateLanguage,
  });
});
</script>

<style lang='scss' scoped>
.tips {
  width: 100%;
  height: 100%;
}
.card {
  position: fixed;
  right: 0;
  bottom: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 10%);
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  overflow: hidden;
  color: #303133;
  transition: .3s;
}
.tag {
  position: fixed;
  left: 0;
  top: 0;
  width: 320px;
  text-align: left;
}
</style>
