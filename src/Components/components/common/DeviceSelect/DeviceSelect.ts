import { PropType } from '../../../../adapter-vue';
import { DeviceType } from '../../../../TUICallService/const';
export const DeviceSelectProps = {
  deviceType: {
    type: String as PropType<DeviceType>,
  },
  isShowControlBtn: {
    type: Boolean,
    default: false,
  },
};
