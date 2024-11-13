import { noop } from '../../TUICallService/utils/common-utils';
import { inject, Ref, ref } from '../../adapter-vue'; 
import { translateContextKey } from '../context';

export function useTranslate() {
  return inject<Ref<Function>>(translateContextKey, ref(noop));
}
