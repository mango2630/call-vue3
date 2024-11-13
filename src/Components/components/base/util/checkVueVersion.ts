import { version } from '../../../../adapter-vue';

export function checkVueVersion() {
  let majorVersion = 'unknow';

  if (typeof version === 'string') {
    majorVersion = version.split('.')[0];
  }

  return { version, majorVersion };
}
