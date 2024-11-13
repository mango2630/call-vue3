import { CallStatus, LayoutMode, ViewName } from '../../../../TUICallService/const';
import { ref, watch, toRefs } from '../../../../adapter-vue';
import { useCallInfoContext, useCustomUI, useUserInfoExcludeVolumeContext } from '../../../hooks';

export function useGetLargeViewName() {
  const config = useCustomUI();
  const { callStatus } = toRefs(useCallInfoContext());
  const largeViewName = ref(ViewName.LOCAL);
  const { remoteUserListExcludeVolume } = toRefs(useUserInfoExcludeVolumeContext());

  watch([remoteUserListExcludeVolume, config, callStatus], () => {
    if (callStatus.value === CallStatus.CALLING) {
      return;
    }

    const c2cLayoutModes = [LayoutMode.RemoteInLargeView, LayoutMode.LocalInLargeView];
    const customLayoutMode = config.value?.layoutMode;
    if (c2cLayoutModes.includes(customLayoutMode)) {
      // @ts-ignore
      largeViewName.value = config.value?.layoutMode;
      return;
    }

    if (remoteUserListExcludeVolume.value?.[0]?.isEnter) {
      largeViewName.value = ViewName.REMOTE;
    }
  }, {
    immediate: true,
  });

  return largeViewName;
}
