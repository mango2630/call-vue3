import { ref, toRefs, watch } from '../../../../../adapter-vue';
import { CallMediaType, CallRole, CallStatus, TUIGlobal } from '../../../../../TUICallService';
import { useButtonPanelStatus, useCallInfoContext, useCustomUIButtonConfig } from '../../../../hooks';

export function useButtonPanelLayout() {
  const sortedLayout = ref([]);
  const buttonPanelConfig = ref([]);
  const { callStatus, isGroupCall, callType, callRole } = toRefs(useCallInfoContext());
  const { status: panelStatus } = useButtonPanelStatus() || {};
  const customUIButtonConfig = useCustomUIButtonConfig();

  watch([callStatus, isGroupCall, callType, callRole, panelStatus, customUIButtonConfig],
    () => {
      let initConfig = customUIButtonConfig.value;
      const key1 = TUIGlobal.isPC ? 'pc' : 'mobile';
      const key2 = isGroupCall.value ? 'groupCall' : 'singleCall';
      const key3 = callType.value === CallMediaType.AUDIO ? 'audio' : 'video';
      // eslint-disable-next-line no-nested-ternary
      let key4 = callStatus.value === CallStatus.CALLING
        ? callRole.value === CallRole.CALLER ? 'calling' : 'accept'
        : callStatus.value;
      
      if (isGroupCall && panelStatus?.value === 'close') {
        key4 = 'close_' + key4;
      }
      const config = initConfig?.[key1]?.[key2]?.[key3]?.[key4] || [];
      buttonPanelConfig.value = config;
      const layout = [];
      let index = 0;

      for (let i = 0; i < config.length; i++) {
        const filterButtonArray = i === 0 ? config[i].filter((item) => item?.props?.show !== false) : config[i];
        config[i] = filterButtonArray;
        const width = 12 / filterButtonArray.length;
        const height = 3;
    
        for (let j = 0; j < filterButtonArray.length; j++) {
          layout[index++] = {
            i: filterButtonArray[j].name,
            x: j * width,
            y: i * width,
            w: width,
            h: height,
            // @ts-ignore
            customStyle: filterButtonArray[j].customStyle,
            customProps: filterButtonArray[j].props,
          };
        }
      }

      index = 0;
      let rs = [];
      for (let i = 0; i < config.flat().length; i++) {
        rs[i] = layout[index++];
      }

      rs = rs.filter(item => item.i);
      sortedLayout.value = rs;
    }, {
      immediate: true,
    });
  return { layout: sortedLayout, config: buttonPanelConfig } as const;
}
