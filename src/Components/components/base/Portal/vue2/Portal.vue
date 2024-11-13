<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'teleport',
  props: {
    to: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    if(this.disabled) return;
    const toEl = document.querySelector(this.to);
    if (toEl) {
      toEl.appendChild(this.$el);
    }
  },
  watch: {
    disabled: {
      immediate: true,
      handler() {
        if (!this.disabled) {
          document.querySelector(this.to)?.appendChild(this.$el)
        } else {
          document.querySelector(this.source)?.appendChild(this.$el)
        }
      },
    },
  },
  destroyed() {
    const toEl = document.querySelector(this.to);
    if (toEl) {
      try {
        toEl.removeChild(this.$el);
      } catch (err) {
        console.debug(err);
      }
    }
  },
}
</script>
