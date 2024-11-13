<template>
  <TDialog
    :isH5="!isPC"
    :isHeaderShow="false"
    :isFooterShow="false"
    :background="false"
    @cancel="handleSelectUserCancel"
  >
    <TTransfer
      :isSearch="props.isNeedSearch"
      :title="props.title"
      :list="props.userList"
      :isH5="!isPC"
      :isRadio="props.isRadio"
      :total="props.total"
      @getMore="handleTransferGetMore"
      @search="handleTransferSearchUser"
      @submit="handleTransferSubmit"
      @cancel="handleSelectUserCancel"
    />
  </TDialog>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, watchEffect } from "../../../../adapter-vue";
import TDialog from "./components/Dialog/TDialog.vue";
import TTransfer from "./components/Transfer/TTransfer.vue";

const emits = defineEmits(["confirm", "cancel", "search", "getMore"]);

const props = defineProps({
  isRadio: {
    type: Boolean,
    default: false,
  },
  isNeedSearch: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  userList: {
    type: Array,
    default: () => {
      return [];
    },
  },
  total: {
    type: Number,
    default: 0,
  },
  isPC: {
    type: Boolean,
    default: true,
  },
});

const handleSelectUserCancel = () => {
  emits("cancel");
};

const handleTransferSubmit = (dataList: any) => {
  emits("confirm", dataList);
};

const handleTransferSearchUser = (userID: string) => {
  emits("search", userID);
};

const handleTransferGetMore = () => {
  emits("getMore");
};
</script>
