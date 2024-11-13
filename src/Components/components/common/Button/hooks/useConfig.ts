import { CallRole, CallStatus, TUIGlobal, CallMediaType } from '../../../../../TUICallService';
import { watch, ref, toRefs, Ref } from '../../../../../adapter-vue';
import { useButtonPanelStatus, useCallInfoContext } from '../../../../hooks';
import { InitialUI, closedPanelUI, defaultButtonUI } from '../../../config/button/index';

export const useBtnConfig = (type: string, state: Ref<string>) => {
  const key1 = TUIGlobal.isPC ? 'pc' : 'mobile';
  const { status: panelStatus } = useButtonPanelStatus();
  const { callStatus, callRole, isGroupCall, callType } = toRefs(useCallInfoContext());
  const btnConfig = ref(defaultButtonUI?.[type]?.[state.value]);

  watch(
    [state, panelStatus, callStatus, isGroupCall, callType],
    () => {
      const key2 = isGroupCall.value ? 'groupCall' : 'singleCall';
      const key3 = callType.value === CallMediaType.AUDIO ? 'audio' : 'video';
      let key4 = '';
      if (callStatus.value === CallStatus.CALLING) {
        key4 = callRole.value === CallRole.CALLER ? 'calling' : 'accept';
      } else if (callStatus.value === CallStatus.CONNECTED) {
        key4 = 'connected';
      }
      let config = InitialUI;
      if (panelStatus.value === 'close') {
        // @ts-ignore
        config = closedPanelUI;
      }
      btnConfig.value = config?.[key1]?.[key2]?.[key3]?.[key4]?.[type]?.[state.value] || {};
    },
    { immediate: true },
  );
  return btnConfig;
};
