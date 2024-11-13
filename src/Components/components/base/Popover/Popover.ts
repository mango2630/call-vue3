const Trigger = ['click','hover'] as const;
const Placement = ['top', 'bottom', 'left', 'right'] as const;
export const PopoverProps = {
  trigger: {
    type: String,
    values: Trigger,
    default: 'click',
  },
  placement: {
    type: String,
    values: Placement,
    default: 'top',
  },
  color: {
    type: String,
  },
  isShowArrow: {
    type: Boolean,
    default: true,
  },
  arrowSize: {
    type: Number,
    default: 5,
  },
  arrowDistance: {
    type: Number,
    default: 5,
  },
  show: {
    type: Boolean,
  },
  autoClose: {
    type: Number,
    default: 300,
  },
};
