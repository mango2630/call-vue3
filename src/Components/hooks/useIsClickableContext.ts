import { inject, Ref } from '../../adapter-vue';
import { IsClickableContextKey } from '../context';

export function useIsClickableContext() {
  return inject<Ref<boolean>>(IsClickableContextKey);
}
