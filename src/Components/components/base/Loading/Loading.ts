const LoadingMode = ['circle', 'dot'] as const;
const LoadingLayout = ['row', 'column'] as const;

export const LoadingProps = {
  mode: {
    type: String,
    values: LoadingMode,
    default: 'circle',
  },
  loadingWidth: {
    type: String,
    default: '40px',
  },
  loadingHeight: {
    type: String,
    default: '40px',
  },
  color: {
    type: String,
  },
  text: {
    type: String,
  },
  layout: {
    type: String,
    values: LoadingLayout,
    default: 'column',
  },
} as const;
