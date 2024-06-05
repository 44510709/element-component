<template>
  <div>
    <!-- search -->
    <Search :searchFormSchema="searchFormSchema || {}" :searchForm="searchForm" @screenOut="onload" @reset="reset"
      @insert="insert">
      <!-- 跨组件筛选插槽 -->
      <template v-for="(s, i) in searchFormSchema.columns" #[s.slot]="row">
        <slot :name="s.slot" :row="row"></slot>
      </template>
    </Search>
    <!-- table -->
    <el-table ref="multipleTable" :data="table.data"
      :height="`calc(100vh - ${table.calcHeight ? table.calcHeight : 180}px)`" border stripe style="width: 100%"
      @selection-change="table.multiple ? handleSelectionChange($event) : ''">
      <!-- 支持多选 -->
      <el-table-column type="selection" width="40" v-if="table.multiple"></el-table-column>
      <template v-for="(  col, k  ) in table.columns">
        <!-- 插槽 -->
        <el-table-column :key="k" :prop="col.prop" :label="col.label" :width="col.width"
          :fixed="col.fixed ? col.fixed : false" v-if="col.slot">
          <template slot-scope="scope">
            <slot :name="col.slot" :row="scope.row" :visibleShow="visibleShow"></slot>
          </template>
        </el-table-column>
        <!-- columns -->
        <el-table-column :key="k" :prop="col.prop" :label="col.label" :width="col.width"
          :fixed="col.fixed ? col.fixed : false" v-else>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-if="table.total" class="pagination" style="margin-top:20px" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="table.pageNo" :page-sizes="[10, 20, 30, 40]"
      :page-size="table.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.total">
    </el-pagination>
    <!-- 对话框 -->
    <Dialog ref="dialog" v-if="dialogFormVisible" :dialogFormVisible="dialogFormVisible" :isUpdate="isUpdate"
      :formSchema="formSchema" @SubmitForm="SubmitForm" @formReset="formReset">
      <!-- 跨组件表单插槽 -->
      <template v-for="(s, i) in formSchema.columns" #[s.slot]="row">
        <slot :name="s.slot" :row="row"></slot>
      </template>
    </Dialog>
  </div>
</template>
<script>
import { buildResult } from '../utils'
import Search from './search.vue'
import Dialog from './dialog.vue'
export default {
  name: 'tableComp',
  props: {
    tableSchema: Object,
    searchFormSchema: Object,
    formSchema: {
      type: Object,
      default: { columns: [] }
    }
  },
  components: { Search, Dialog },
  data() {
    return {
      table: {
        api: null,//api
        apiResult: {},
        columns: [],//table列
        data: [],//表单数据
        pageNo: 1,//当前页
        pageSize: 10,//条数
        total: 0,//总条数
      },
      multipleSelection: [],//table多选的值
      searchForm: {},//search 表单筛选
      dialogFormVisible: false,//对话框
      isUpdate: false,//更新还是新增
    }
  },
  methods: {
    //初始化
    async init(val) {
      for (let key in val) {
        //初始化table 赋值
        this.table[key] = val[key];
        //初始化api参数
        if (key == 'params') {
          this.table.pageSize = val[key]['pageSize'] || 10;
          this.table.pageNo = val[key]['pageNo'] || 1;
        }
      }
      this.onload()
    },
    //api参数
    buildParams() {
      let res = {};
      res.pageSize = this.table.pageSize;
      res.pageNo = this.table.pageNo;
      for (const key in this.searchForm) {
        res[key] = this.searchForm[key]
      }
      return res;
    },
    //通过api获取数据
    async onload() {
      let res = await this.table.api(this.buildParams())
      // 需要兼容 不同数据格式层级的返回(apiResult)
      this.table.data = this.table.apiResult && this.table.apiResult.list ? buildResult(res, this.table.apiResult.list) : this.table.data;
      this.table.total = this.table.apiResult && this.table.apiResult.total ? Number(buildResult(res, this.table.apiResult.total)) : this.table.total;
    },
    //分页
    async handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.table.pageSize = val;
      this.table.pageNo = 1;
      this.onload()
    },
    //分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`, this.pageSize);
      this.table.pageNo = val;
      this.onload()
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.table.multipleParams) {
        this.searchForm[this.table.multipleParams] = val;
      } else {
        this.searchForm['multipleSelection'] = val;
      }
    },
    //取消选择多选
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    //重置按钮
    reset() {
      this.$emit('searchReset')
    },
    //新增按钮
    insert() {
      this.formSchema.columns.map(v => v.default = null);
      this.dialogFormVisible = true;
      this.isUpdate = false;
    },
    //获取form数据
    SubmitForm(v) {
      this.$emit('SubmitForm', v)
    },
    //form重置
    formReset() {
      this.$emit('formReset')
    },
    //唤起表单弹窗并且设置默认值
    visibleShow(v) {
      this.dialogFormVisible = true;
      this.isUpdate = true;
      this.formSchema.columns.map(item => {
        for (const key in v) {
          if (key == item.prop) {
            item.default = v[key]
          }
        }
      })
    }
  },
  watch: {
    //监听传值,取所规定需要的数据
    tableSchema: {
      handler(newVal, oldVal) {
        this.init(newVal)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style scoped>
::v-deep .el-table .cell {
  color: black;
}

::v-deep .pagination {
  display: flex;
  justify-content: flex-end;
}
</style>