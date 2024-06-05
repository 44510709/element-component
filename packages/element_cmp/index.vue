<template>
  <tableComp :tableSchema="tableSchema" :searchFormSchema="searchFormSchema" :formSchema="formSchema"
    @SubmitForm="SubmitForm">
    <!-- 表格tag标签插槽 -->
    <template #avatar="scoped">
      <img :src="scoped.row.avatar" alt="" width="100" height="100">
    </template>
    <template #createTime="scoped">
      {{ new Date(scoped.row.createTime) }}
    </template>
    <!-- 表格操作按钮 -->
    <template #Button="scoped">
      <el-button @click.native.prevent="edit(scoped)" type="text" size="small">
        编辑
      </el-button>
      <el-popconfirm style="margin-left: 10px;" title="确定删除吗？" @confirm="del(scoped.row)">
        <el-button slot="reference" type="text" size="small">
          删除
        </el-button>
      </el-popconfirm>
    </template>
  </tableComp>
</template>
<script>
import Table from './components/tableComp/table.vue'
import { tableSchema, searchFormSchema, formSchema } from './data'
export default {
  name: "Wcmp",
  components: { Table },
  data() {
    return {
      tableSchema,
      searchFormSchema,
      formSchema
    }
  },
  methods: {
    //提交表单
    SubmitForm(v) {
      console.log(v, 123);
    },
    edit(v) {
      console.log(v);
      v.visibleShow(v.row)
    },
    async del(row) {
      console.log(row);
    }
  }
};
</script>

<style scoped>
.icon {
  margin: 0 10px;
}

.icon:hover {
  cursor: pointer;
}
</style>
