<template>
  <el-dialog :title="isUpdate ? '编辑' : '新增'" :visible.sync="show" width="80%" @close="cancel">
    <FormView :formSchema="formSchema" @SubmitForm="SubmitForm" @cancel="cancel" @formReset="formReset">
      <!-- 跨组件插槽 -->
      <template v-for="(s, i) in formSchema.columns" #[s.slot]="data">
        <slot :name="s.slot" :data="data"></slot>
      </template>
    </FormView>
  </el-dialog>
</template>
<script>
import FormView from '../formComp/form.vue'
export default {
  name: 'Dialog',
  props: {
    dialogFormVisible: Boolean,
    isUpdate: Boolean,
    formSchema: Object
  },
  components: { FormView },
  data() {
    return {
      show: this.dialogFormVisible
    }
  },
  methods: {
    //取消
    cancel() {
      this.show = false;
      this.$parent.dialogFormVisible = false;
    },
    //获取form数据
    SubmitForm(v) {
      this.$emit('SubmitForm', v)
    },
    //重置
    formReset() {
      this.$emit('formReset', v)
    }
  }
}
</script>
<style scoped>
::v-deep .el-dialog__body {
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}

::v-deep .el-dialog__body {
  padding: 20px 0 0 0;
}
</style>