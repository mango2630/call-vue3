import { ICustomUIConfig } from "../../TUICallService/const";
import { inject, Ref } from "../../adapter-vue";
import { CustomUIConfigContextKey } from "../context";

export function useCustomUI() {
  return inject<Ref<ICustomUIConfig>>(CustomUIConfigContextKey);
}
