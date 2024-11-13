export const Fit = ['fill', 'contain', 'cover'] as const;
export const MiniProgramImageFitMap = {
  fill: 'scaleToFill',
  contain: 'aspectFit',
  cover: 'aspectFill',
} as const;
export const ImageProps = {
  width: {
    type: String,
    default: '320px',
  },
  height: {
    type: String,
    default: '240px',
  },
  src: {
    type: String,
  },
  fit: {
    type: String,
    values: Fit,
    default: 'fill',
  },
  customStyle: {
    type: Object,
  },
  defaultSrc: {
    type: String,
  },
} as const;

export const imageEmits = {
  error: (evt) => evt,
};
