import { inject } from '../../adapter-vue';
import { CallInfoContextKey, TCallInfoContextValue } from '../context';

export function useCallInfoContext() {
  return inject<TCallInfoContextValue>(CallInfoContextKey);
}
