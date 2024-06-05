<template>
  <Table ref="table" :tableSchema="tableSchema" :searchFormSchema="searchFormSchema" :formSchema="formSchema"
    @searchReset="searchReset" @formReset="formReset" @SubmitForm="SubmitForm">
    <!-- 搜索栏插槽示例 -->
    <template #test="scoped">
      <el-input style="width: 100px;" v-model="scoped.row.formData['test']" placeholder="请输入内容"></el-input>
    </template>
    <!-- 表单插槽示例 -->
    <template #testForm="scope">
      <el-switch v-model="scope.row.data.ruleForm['testSlot']" active-color="#13ce66" inactive-color="#ff4949">
      </el-switch>
    </template>
    <!-- 表格tag标签插槽 -->
    <template #Tag="scoped">
      <el-tag>
        {{ scoped.row.platformName }}
      </el-tag>
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
  </Table>
</template>
<script>
import Table from './components/tableComp/table.vue'
import { list2, list, del, treelist, upload } from '../../examples/api/test'
export default {
  name: "tableComp",
  components: { Table },
  data() {
    return {
      tableSchema: {
        api: list,
        apiResult: {//对api返回的结果层数据进行适配,比如得到的数据是data:{data:{list:[]}} ---> data.data.list
          list: 'data.data.list',
          total: 'data.data.total'
        },
        params: {
          pageNo: 1,
          pageSize: 10
        },
        multiple: true,//支持多选
        multipleParams: 'ids',//接收参数名 默认参数名multipleSelection
        columns: [
          {
            label: '状态',
            prop: 'id',
            width: 200,//表单+搜索 默认自适应
          },
          {
            label: '姓名',
            prop: 'name',
            width: 200,
          },
          {
            label: '日期',
            prop: 'createTime',
            width: 200,
          },
          {
            slot: 'Tag',
            label: '标签',
            prop: 'platformName',
            width: '180',
          },
          {
            slot: 'Button',
            label: '操作',
            prop: 'button',
            width: '200',
            fixed: 'right'
          },

        ],
      },
      searchFormSchema: {
        // resetHide: true,//默认重置按钮隐藏
        // searchHide: true,//默认查询按钮隐藏
        // insertHide: true,//默认新增按钮隐藏
        columns: [
          {
            slot: 'test',
            prop: 'test',
          },
          {
            slot: 'test2',
          },
          {
            type: 'datetimerange',
            label: '日期',
            prop: 'createTime',
            width: 200,
            search: true,
            placeholder: '日期',
            paramsTime: {
              start: '',
              end: ''
            }
          }, {
            type: 'input',
            label: '姓名',
            prop: 'name',
            width: 200,
            placeholder: '姓名2'
          },
          {
            label: '状态',
            prop: 'id',
            tableWidth: '180',//表格宽度 默认自适应
            width: 200,//表单+搜索 默认自适应
            type: 'select',
            placeholder: '1',
            // multiple: true,
            // multipleType: 'string',
            typeProps: {
              list: [//自定义数据
                { label: '待上架', value: 0 },
                { label: '已上架', value: 1 },
                { label: '已下架', value: 2 }
              ],
              api: list2,//api数据
              apiResult: {
                list: 'data.data'
              },
              label: 'name',//接口字段显示label
              value: 'id',//接口字段 取值
            },
            // hide: true
          }
        ],
        buttons: [{
          slot: 'add',
          label: '添加',
          prop: 'add',
          type: 'primary',//按钮风格
          call: (v) => {
            console.log(v);
          }
        },
        {
          slot: 'delAll',
          label: '批量删除',
          prop: 'delAll',
          type: 'primary',//按钮风格
          call: (v) => {
            console.log(v);
          }
        },]
      },
      formSchema: {
        // width: 100,
        resetHide: true,//默认重置按钮隐藏
        cancelHide: true,//默认查询按钮隐藏
        columns: [
          {
            width: 500,
            type: 'select',
            label: '活动列表',
            prop: 'platformName',
            default: '',
            required: true,
            typeProps: {
              api: list,
              params: { a: 1 },
              apiResult: {
                list: 'data.data.list'
              },
              label: 'name',
              value: 'id'
            }
          },
          {
            type: 'switch',
            label: '配送',
            prop: 'pss',
          },
          {
            type: 'datetime',
            label: 'testSlot1',
            prop: 'testSlot1',
            // slot: 'testForm',
            default: false
          },
          {
            type: 'checkbox',
            label: '类型21',
            prop: 'platformId',
            typeProps: {
              api: list,
              apiResult: {
                list: 'data.data.list'
              },
              label: 'name',
              value: 'id'
            }
          },
          {
            width: 400,
            type: 'tree',
            label: 'tree',
            prop: 'tree',
            default: [3],
            required: true,// 校验
            typeProps: {
              api: treelist,
              apiResult: {
                list: 'data.data'
              },
              label: 'value',
              value: 'id'
            },
          },
          {
            type: 'upload',// upload
            label: '上传',// 标题
            prop: 'upload',
            required: true,// 校验
            typeProps: {
              api: upload,
              apiResult: {
                list: 'data.data'
              },
              limit: 1,// 个数
              limitRule: true,//表单校验规则(提交需要校验上传limit张)
              max: 10,// 大小 M
              description: '描述',//描述
              call(v) {//回调
                v.fileList.push({ url: 'http://' + v.data })
              }
            },
          },
        ],
        buttons: [
          {
            label: '其他',
            type: 'primary',
            required: true,// 校验
            call: (data) => {
              console.log(data, 1);
            }
          },
        ],
      }
    }
  },
  methods: {
    //提交表单
    SubmitForm(v) {
      console.log(v, 123);
    },
    //添加插槽数据到formsearch
    setData(v, data) {
      data['test'] = v;
    },
    //默认重置按钮这边可以处理一些插槽的特殊值
    searchReset() {
      console.log(111);
    },
    edit(v) {
      v.visibleShow(v.row)
    },
    async del(row) {
      del({ id: row.id }).then(res => {
        console.log(res);
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        // location.reload();
      })
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
