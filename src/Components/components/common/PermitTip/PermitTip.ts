import { createVNode, render } from '../../../../adapter-vue';
// @ts-ignore
import PermitTipComp from './PermitTip.vue';

const PermitTip: any = {};
let instance: any = null;
let seed = 1;

export const createToast = () => {
  const appendTo = document.body;
  const container = document.createElement('div');

  if (instance) {
    appendTo.removeChild(instance.el);
    render(null, container);
  }

  const vnode = createVNode(PermitTipComp, {
    index: `permit-item-${seed++}`, // eslint-disable-line
    destroy() {
      render(null, container);
    },
  });
  render(vnode, container);
  appendTo.appendChild(container.firstElementChild!);
  instance = vnode;
};

PermitTip.show = () => createToast();

export {
  PermitTip,
};
