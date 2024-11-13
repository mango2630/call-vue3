<template>
  <div
    class="dialog"
    :class="[props.isH5 ? 'dialog-h5' : '', center ? 'center' : '']"
    @click.stop.prevent="toggleView(clickType.OUTSIDE)"
  >
    <main
      class="dialog-main"
      :class="[!backgroundDialog ? 'dialog-main-back' : '']"
      @click.stop.prevent="toggleView(clickType.INSIDE)"
    >
      <header class="dialog-main-header" v-if="isHeaderShowDialog">
        <h1 class="dialog-main-title">{{ showTitle }}</h1>
        <i class="icon icon-close" @click="close"></i>
      </header>
      <div
        class="dialog-main-content"
        :class="[props.isH5 ? 'dialog-main-content-uniapp' : '']"
      >
        <slot />
      </div>
      <footer class="dialog-main-footer" v-if="isFooterShowDialog">
        <button class="btn btn-cancel" @click="close">{{ t('Cancel') }}</button>
        <button class="btn btn-default" @click="submit">{{ t('Done') }}</button>
      </footer>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, defineProps, defineEmits } from "../../../../../../adapter-vue";
import { useTranslate } from '../../../../../hooks';

const clickType = {
  OUTSIDE: "outside",
  INSIDE: "inside",
};
const props = defineProps({
  isHeaderShow: {
    type: Boolean,
    default: true,
  },
  isFooterShow: {
    type: Boolean,
    default: true,
  },
  background: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "",
  },
  center: {
    type: Boolean,
    default: false,
  },
  isH5: {
    type: Boolean,
    default: false,
  },
});

const isHeaderShowDialog = ref(true);
const isFooterShowDialog = ref(true);
const backgroundDialog = ref(true);
const showTitle = ref("");
const t = useTranslate();

watchEffect(() => {
  showTitle.value = props.title;
  isHeaderShowDialog.value = props.isHeaderShow;
  isFooterShowDialog.value = props.isFooterShow;
  backgroundDialog.value = props.background;
});

const emits = defineEmits(["cancel", "submit"]);

const toggleView = (type: string) => {
  if (type === clickType.OUTSIDE) {
    close();
  }
};

const close = () => {
  emits("cancel");
};

const submit = () => {
  emits("submit");
};
</script>
<style scoped src="./style/dialog.css"></style>
