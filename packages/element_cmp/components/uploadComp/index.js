import uploadComp from "./upload.vue";
uploadComp.install = (Vue) => {
  Vue.component(uploadComp.name, uploadComp);
};

export default uploadComp;
