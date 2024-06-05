##### Table 组件

```
<Table ref="table" :tableSchema="tableSchema" :searchFormSchema="searchFormSchema" :formSchema="formSchema"   @SubmitForm="SubmitForm" >
    <!-- 插槽:最下方示例 -->
</Table>
```

- searchFormSchema:筛选数据
- tableSchema:表格数据
- formSchema:表单数据
- @searchReset:默认重置的其他数据类型的操作(一般不需要)
- @formReset:默认重置的其他数据类型的操作(一般不需要)
- @SubmitForm:表单数据

##### 数据传参数 tableSchema/searchFormSchema/formSchema

##### tableSchema:表格参数

- api:API
- apiResult:`对api返回的结果层数据进行适配,比如得到的数据是data:{data:{list:[]}} ---> data.data.list`
- params:请求参数
- multiple:支持表格多选
- multipleParams:定义接收表格多选参数名,默认参数名 multipleSelection
- columns:表格参数
- calcHeight:表格高度 (这里是 100vh 减去的值)默认:180

```
tableSchema: {
    api: list,//API请求
    apiResult: {
      list: 'data.data.list',//接口返回的数据的层级
      total: 'data.data.total'//接口返回的数据的层级
    },
    params: {//请求参数
      pageNo: 1,
      pageSize: 10
    },
    multiple: true,//支持表格多选
    multipleParams: 'ids',//定义接收表格多选参数名,默认参数名multipleSelection
    columns: [
      {
        width(非必传):宽度,
        label:标题
        prop:参数prop
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
```

##### searchFormSchema:筛选栏参数

- resetHide:默认重置按钮隐藏
- searchHide:默认查询按钮隐藏
- insertHide:默认新增按钮隐藏
- columns:表格参数/Array
- buttons:自定义按钮/Array

```
searchFormSchema: {
  resetHide:true,
  columns: [
    {
      width:宽度,
      type:'input'/'select'/'datetimerange'/'datetime'
      label: 标题,
      slot: 插槽(无需填写type),
      prop: 参数名,
      placeholder:空提示,
      paramsTime: {//自定义日期区间 type=datetimerange 开始结束的字段名
        start: '',
        end: ''
      },
      multiple: true,//设置select多选
      multipleType: 'string',//设置select多选的值类型是字符串,默认数组
      typeProps: {//select参数
        list: [ //自定义数据
          { label: '待上架', value: 0 },
          { label: '已上架', value: 1 },
          { label: '已下架', value: 2 }
        ],
        api: list2, //api数据
        apiResult: { //接口返回的数据的层级
          list: 'data.data'
        },
        label: 'name',//接口字段显示label
        value: 'id',//接口字段 取值
      },
    },
  ],
  buttons: [
  {
    slot: 'delAll',//插槽
    label: '批量删除',//标题
    prop: 'delAll',//参数
    type: 'primary',//按钮风格
    call: (v) => {//回调
      console.log(v);
    }
  }]
}
```

#### 示例

```
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
      type: 'input',
      label: '姓名',
      prop: 'name',
      width: 200,
      placeholder: '姓名2'
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
    },
    {
      label: '状态',
      prop: 'id',
      width: 200,
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
      },
    }
  ],
  buttons: [
  {
    slot: 'delAll',
    label: '批量删除',
    prop: 'delAll',
    type: 'primary',//按钮风格
    call: (v) => {
      console.log(v);
    }
  }]
}

```

##### formSchema:表格参数

- width:label 宽度
- resetHide: true,//默认重置按钮隐藏
- cancelHide:默认取消按钮隐藏
- confirmHide:默认确认按钮隐藏
- columns:[],//数据
- buttons:[],//自定义按钮
- columns:type:`input/select/switch/radio/checkbox/textarea/datetime/datetimerange/tree/upload/slot`

```
formSchema: {
  width: 100,//label宽度默认100
  resetHide: true,//默认重置按钮隐藏
  cancelHide: true,//默认查询按钮隐藏
  columns: [
    {
      width: 宽度
      type: 类型 (input/select/switch/radio/checkbox/textarea/datetime/datetimerange/tree/upload/slot)
      label:标题
      prop: 参数
      default:默认值
      required: 校验,
      slot:插槽,
      typeProps: {//类型参数
        api: API,
        params: { a: 1 },//API参数
        apiResult: {//API返回数据层级
          list: 'data.data.list'
        },
        label: 'name',//显示字段
        value: 'id'//显示value
        <!-- upload -->
        limit: 1,// 个数
        limitRule: true,//表单校验规则(提交需要校验上传limit张)
        max: 10,// 大小 M
        description: '描述',//描述
        call(v) {//回调
          v.fileList.push({ url: 'http://' + v.data })
        }
      }
    }
  ],
  buttons: [
    {
      label: '其他',
      type: 'primary',
      required: true,// 增加表单校验
      call: (data) => {
        console.log(data, 1);
      }
    },
  ],
}

```

#### 示例

```
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
```

#### Table 组件示例

- 编辑注意点,下边有示例 `scoped包含两个参数 1.当前选中的列表scoped.row 2.form表单显示方法visibleShow, 需要将列表数据传参数form表单显示方法visibleShow(scoped.row)`

```
<Table ref="table" :tableSchema="tableSchema" :searchFormSchema="searchFormSchema" :formSchema="formSchema"
    @reset="reset" @SubmitForm="SubmitForm">
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
```

```
export default {
  name: "tableComp",
  components: { Table },
  data() {
    return {}
  },
  methods: {
    //编辑
    edit(data) {
      //visibleShow弹窗显示
      //row列表数据
      data.visibleShow(data.row)
    },
    //删除
    async del(row) {
      del({ id: row.id }).then(res => {
        console.log(res);
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        // location.reload();
      })
    },
    //提交表单
    SubmitForm(v) {
      console.log(v);
    },
    //默认重置按钮这边可以处理一些插槽的特殊值
    searchReset() {
      console.log(111);
    },
    //默认重置按钮这边可以处理一些插槽的特殊值
    searchReset(){
      console.log(111);
    }
  }
};
```
