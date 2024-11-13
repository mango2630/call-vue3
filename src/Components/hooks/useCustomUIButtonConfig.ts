import { watch, ref, toRefs, computed } from '../../adapter-vue';
import { useCustomUI } from './useCustomUI';
import { TUIGlobal, CallStatus } from '../../TUICallService';
import { add, deepClone, findValues, modify } from '../util';
import { VirtualBackgroundMobileConfig } from '../components/common/ButtonPanel/config/VirtualBackgroundMobileConfig';
import { useCallInfoContext } from './useCallInfoContext';
import { useUserInfoExcludeVolumeContext } from './useUserInfoContextExcludeVolume';
import { ButtonPanelConfig } from '../components/common/ButtonPanel/config/InitConfig';

function setVirtualBackgroundConfig(config) {
  const newConfig = deepClone(config);
  modify(newConfig, 'mobile.singleCall.video', VirtualBackgroundMobileConfig);
  add(newConfig, 'pc.singleCall.video.calling[0][2]', { name: 'virtualBackground', props: {} });
  add(newConfig, 'pc.singleCall.video.accept[0][1]', { name: 'virtualBackground', props: {} });
  add(newConfig, 'pc.singleCall.video.connected[0][3]', { name: 'virtualBackground', props: {} });
  add(newConfig, 'pc.groupCall.video.calling[0][3]', { name: 'virtualBackground', props: {} });
  add(newConfig, 'pc.groupCall.video.connected[0][4]', { name: 'virtualBackground', props: {} });
  return newConfig;
}

function setCloseCameraConfig(config, isVideoAvailable, isShowVirtualBackgroundIcon) {
  let newConfig = deepClone(config);
  if(isVideoAvailable){
    modify(newConfig, 'mobile.singleCall.video.connected[1][2].props.show', true);
    if(isShowVirtualBackgroundIcon) {
      setVirtualBackgroundConfig(newConfig);
    }  
  } else {
    modify(newConfig, 'mobile.singleCall.video.connected[1][2].props.show', false);
    if(isShowVirtualBackgroundIcon) {
      modify(newConfig, 'mobile.singleCall.video.connected[1][0].props.show', false);
      modify(newConfig, 'pc.singleCall.video.connected[0][3].props.show', false);
      modify(newConfig, 'pc.groupCall.video.connected[0][4].props.show', false);
    } 
  }
  return newConfig;
}

export function useCustomUIButtonConfig() {
  const { isShowEnableVirtualBackground, callStatus } = toRefs(useCallInfoContext());
  const customUIConfig = useCustomUI();
  const { localUserInfoExcludeVolume: localUserInfo } = toRefs(useUserInfoExcludeVolumeContext());
  const isVideoAvailable = computed(() => localUserInfo?.value.isVideoAvailable || false);
  const isShowVirtualBackgroundIcon = computed(() => isShowEnableVirtualBackground.value && !TUIGlobal.isH5);
  const results = ref([]);

  watch([customUIConfig, isShowEnableVirtualBackground, isVideoAvailable], () => {
    let initConfig = deepClone(ButtonPanelConfig);
    if (isShowVirtualBackgroundIcon.value) {
      initConfig = setVirtualBackgroundConfig(ButtonPanelConfig);
    }
    if(callStatus.value === CallStatus.CONNECTED) {
      initConfig = setCloseCameraConfig(initConfig, isVideoAvailable.value, isShowVirtualBackgroundIcon.value);
    }
    const { button: buttonsConfig } = customUIConfig.value;
    const rs = [];
    function condition(value) {
      return Object.keys(buttonsConfig).includes(value);
    }

    function formatResults({ key, value }) {
      const valueArr = value.split('.');
      let path = valueArr.slice(0, valueArr.length - 1);
      const rowPath = valueArr.slice(0, valueArr.length - 2);
      const rowIndex = rowPath[rowPath.length - 1];
      if (rowIndex === '0') {
        for(let i = 0; i < 3; i++) {
          let newPath = rowPath.slice();
          newPath.push(i);
          newPath.push('customStyle');
          newPath.push('justifyContent');
          newPath = newPath.join('.');
          rs.push({ path: newPath, value: 'center' });
        }
      }
      
      path.push('props');
      path.push('show');
      path = path.join('.');
      return {
        path,
        value: buttonsConfig?.[key]?.show,
      };
    }
  
    findValues(initConfig, condition, '', rs, formatResults);
    rs?.forEach((item) => {
      modify(initConfig, item.path, item.value);
    });
    results.value = initConfig;
  }, {
    immediate: true,
  });

  return results;
}
