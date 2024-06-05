//处理apiResult 接口返回多层数据的取值
export function buildResult(data, key) {
  // 循环apiResult分割值
  let keys = key.split(".");
  let res = data;
  // 获取result数据
  for (let k in keys) {
    if (res[keys[k]]) {
      res = res[keys[k]];
    } else {
      console.log("取不到api对应层级的值");
      return false;
    }
  }
  return res;
}
