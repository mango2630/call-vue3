import { inject } from '../../adapter-vue';
import { CallerUserInfoContextKey, TCallerUserInfoValue } from '../context';

export function useCallerUserInfoContext() {
  return inject<TCallerUserInfoValue>(CallerUserInfoContextKey);
}
