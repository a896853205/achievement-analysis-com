/**
 * 读取地址栏参数
 * @param key
 */
export const readUrlParams = ( key ) => {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const result = window.location.search.substr(1).match(reg);
  if (result !== null) {
      return unescape(result[2]);
  } else {
      return null;
  }
};
