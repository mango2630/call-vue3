const RowJustify = ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'] as const;
const RowAlign = ['top', 'middle' , 'bottom'] as const;

export const rowProps = {
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String,
    values: RowJustify,
    default: 'start',
  },
  align: {
    type: String,
    values: RowAlign,
    default: 'top',
  },
  customStyle: {
    type: Object,
    default: () => {},
  },
} as const;
