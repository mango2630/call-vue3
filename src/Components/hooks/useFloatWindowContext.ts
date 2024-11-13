import { inject } from '../../adapter-vue';
import { FloatWindowContextKey, TFloatWindowContextValue } from '../context';

export function useFloatWindowContext() {
  return inject<TFloatWindowContextValue>(FloatWindowContextKey);
}
