import tableComp from "./components/tableComp/table.vue";
tableComp.install = (Vue) => {
  Vue.component(tableComp.name, tableComp);
};

export default tableComp;
