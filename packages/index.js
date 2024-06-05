import tableComp from "./element_cmp";
import uploadComp from "./element_cmp/components/uploadComp";
import formComp from "./element_cmp/components/formComp";
const components = {
  tableComp,
  uploadComp,
  formComp,
};

const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};
/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components,
};
