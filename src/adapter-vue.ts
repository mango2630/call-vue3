// @if process.env.BUILD_TARGET!='MINI'
// @ts-nocheck
export * from 'vue';
// @endif


// @if process.env.BUILD_TARGET='MINI'
// #ifndef VUE3
// @ts-ignore
import Vue from 'vue';

export * from '@vue/composition-api';
export const version = Vue.version;
// #endif

// #ifdef VUE3
export * from 'vue';
// #endif
// @endif
