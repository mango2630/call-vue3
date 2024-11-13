import { watch, ref } from '../../adapter-vue';
import { useCustomUI } from './useCustomUI';

export function useViewBackgroundConfig() {
  const customUIConfig = useCustomUI();
  const viewBackgroundObj = ref(customUIConfig.value.viewBackground);
  watch(customUIConfig, () => {
    viewBackgroundObj.value = customUIConfig.value.viewBackground;
  });
  
  return viewBackgroundObj;
}
