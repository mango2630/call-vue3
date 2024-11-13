const Size = ['small','middle','large'] as const;
const Direction = ['row','column'] as const;
const Shape = ['circle','round'] as const;

export const ButtonProps = {
  iconSrc: {
    type: String,
  },
  iconSize: {
    type: Number,
  },
  text: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingColor: {
    type: String,
    default: '#fff',
  },
  loadingWidth: {
    type: String,
    default: '40px',
  },
  loadingHeight: {
    type: String,
    default: '40px',
  },
  size: {
    type: String,
    values: Size,
    default: 'middle',
  },
  width: {
    type: String,
  },
  height: {
    type: String,
  },
  color: {
    type: String,
  },
  direction: {
    type: String,
    values: Direction,
    default: 'row',
  },
  shape: {
    type: String,
    values: Shape,
  },
  buttonStyle: {
    type: Object,
  },
  buttonTextStyle: {
    type: Object,
  },
};
