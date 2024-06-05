import formComp from "./form.vue";
formComp.install = (Vue) => {
  Vue.component(formComp.name, formComp);
};

export default formComp;
