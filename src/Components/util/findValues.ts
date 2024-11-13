import { isEmpty } from "./isEmpty";

export function findValues(obj, condition, path, results, formatResults) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const currentPath = isEmpty(path) ? key : `${path}.${key}`;
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const itemPath = `${currentPath}.${i}`;
          findValues(value[i], condition, itemPath, results, formatResults);
        }
      } else {
        findValues(value, condition, currentPath, results, formatResults);
      }
    } else if (condition(value)) {
      const result = typeof formatResults === 'function' ? formatResults({ key: value, value: currentPath }) : currentPath;
      results.push(result);
    }
  });
}
