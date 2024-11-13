const ColJustify = ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'] as const;
const ColAlign = ['top', 'middle', 'bottom'] as const;

export const colProps = {
  span: {
    type: Number,
    default: 24,
  },
  justify: {
    type: String,
    values: ColJustify,
    default: 'start',
  },
  align: {
    type: String,
    values: ColAlign,
    default: 'middle',
  },
  offset: {
    type: Number,
    default: 0,
  },
};
