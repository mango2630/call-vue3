import { inject, ref } from '../../adapter-vue';
import { ButtonPanelContextKey, TButtonPanelContextValue } from '../context';

export function useButtonPanelStatus() {
  return inject<TButtonPanelContextValue>(ButtonPanelContextKey, { status: ref('open') });
}
