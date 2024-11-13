const Unit = ['%', 'vw'];

export const GridProps = {
  length: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    values: Unit,
    default: '%',
  },
  enableFocus: {
    type: Boolean,
    default: false,
  },
  layout: {
    type: Array,
  },
  focus: {
    type: [String, Number],
  },
} as const;

export const ChangeFocusEmits = ['change', 'toggle'];
export const GridContextKey = 'GridContextKey';
