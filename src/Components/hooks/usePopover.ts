import { inject, Ref } from '../../adapter-vue';
import { PopoverContextKey } from '../context';

export function usePopover() {
  return inject<Ref<string>>(PopoverContextKey);
}
