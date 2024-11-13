import { isObject } from './isObject';

export const isEqual = (obj1, obj2) => {
  // 判断obj1或者obj2 只要有一个不是对象或者数组
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型 (!!! 参与equal的不会是函数)
    return obj1 === obj2;
  }
  if (obj1 === obj2) {
    return true;
  }
  /**
   * @description 俩个都是数组或者对象,而且不相等
   * 1. 先取出obj1,obj2的keys,比较个数  
   * 2. Object.keys返回的key是放到数组中的 
   * 3. 数组是以索引为key
   * 4. 对象是以属性为key
   * 5. 判断俩个对象的keys长度
   */
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }
  /**
   * 以obj1 为基准,和obj2 依次递归比较
   */
  // eslint-disable-next-line guard-for-in
  for (let key in obj1) {
    // 比较当前key的value
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false;
    }
  }
  /**
   * 全部相等
   */
  return true;
};
