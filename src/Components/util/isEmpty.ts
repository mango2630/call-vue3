export function isEmpty(obj) {
  if (obj === null || obj === undefined) {
    return true;
  }

  if (typeof obj === 'string' && obj.trim().length === 0) {
    return true;
  }

  if (Array.isArray(obj) || typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }

  return false;
}
