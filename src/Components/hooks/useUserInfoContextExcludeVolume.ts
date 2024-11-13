import { inject } from '../../adapter-vue';
import { TUserInfoExcludeVolumeContextValue, UserInfoExcludeVolumeContextKey } from '../context';

export function useUserInfoExcludeVolumeContext() {
  return inject<TUserInfoExcludeVolumeContextValue>(UserInfoExcludeVolumeContextKey);
}
