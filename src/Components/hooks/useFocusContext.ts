import { inject, ref } from '../../adapter-vue';
import { FocusContextKey } from '../context';

export function useFocusContext() {
  return inject(FocusContextKey, ref('open'));
}
