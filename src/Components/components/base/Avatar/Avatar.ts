const Fit = ['fill', 'contain', 'cover'] as const;
const Shape = ['circle', 'square'] as const;

export const AvatarProps = {
  icon: {
    type: String,
  },
  size: {
    type: [Number, String],
    default: 100,
  },
  shape: {
    type: String,
    values: Shape,
    default: 'square',
  },
  src: {
    type: String,
  },
  defaultSrc: {
    type: String,
  },
  text: {
    type: String,
  },
  fit: {
    type: String,
    values: Fit,
    default: 'cover',
  },
  customClass: {
    type: String,
  },
} as const;

export const avatarEmits = {
  error: (evt) => evt,
};
