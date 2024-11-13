export * from './classNames';
export * from './checkEnv';
export * from './filterObject';

export function findTarget(obj, options) {
  const { key, value } = options;

  return obj.find((item) => item[key] === value);
}
export * from './checkVueVersion';
