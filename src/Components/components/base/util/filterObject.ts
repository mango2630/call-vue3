export function filterObject(obj) {
  const filteredObj = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined) {
      filteredObj[key] = obj[key];
    }
  }

  return filteredObj;
}
