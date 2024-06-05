### 使用

` <FormView :formSchema="formSchema" @SubmitForm="SubmitForm" />`

##### @SubmitForm 提交表单操作 参数为表单数据

##### formSchema:数据传参数

```
formSchema: {
    width: 100,
    resetHide: true,//默认重置按钮隐藏
    cancelHide: true,//默认查询按钮隐藏
    confirmHide:true,//默认确认按钮隐藏
    columns: [],
    buttons:[]
}
```

- columns`(必传)` : 表单数据-数组

` typeProps.apiResult: 非必传,对 api 返回的结果层数据进行适配,`

```
[{
  type:类型(input,select,radio,switch,checkbox,tree,upload,date,datetime,datetimerange)
  slot(非必传):'test' 插槽
  label:标题
  prop:参数prop
  default(非必传):默认值
  required(非必传):表单校验,
  width(非必传):宽度,
  <!-- typeProps:(/select/radio/checkbox/tree)这几种类型的参数传参 -->
  typeProps: {(/select/radio/checkbox/tree)这几种类型的参数传参
    api: api封装的axios接口,通过api获取数据
    params: { a: 1 }, 非必传,接口参数
    apiResult:{
      list:'data.list'
    },非必传,对api返回的结果层数据进行适配,
    //比如api得到的数据是 data:{ data:{ list:[], total:7 },msg:'' } ---> data.data.list
    label: 'roleName',展示接口返回数据的字段 - 标题
    value: 'roleId'接口返回数据的字段 - 选中的值
    <!-- 上传图片 -->
    limit: 1,// 上传图片个数
    limitRule: true,//上传图片表单校验规则(提交需要校验上传limit张)
    max: 10,// 上传图片大小 M
    description: '描述',//上传图片描述
    call(v) {//上传图片回调
      v.fileList.push({ url: 'http://' + v.data })
    }
  },
}]
```

- buttons`(非必传)`: 表单自定义按钮 有默认`确定和重置取消`按钮

```
buttons: [
  {
    label: '其他',//按钮名称
    type(非必传): 'primary',//按钮风格
    required: true,// 添加校验表单
    call: (data) => {//回调
      console.log(data, 1);
    }
  },
],

```

- width`(非必传)` : label 宽度(默认值 100px),

##### 上传图片返回值(有两个参数)

- data 是接口返回数据,包含 code/data 自己处理上传结果
- fileList 是图片列表 直接 fileList.push({url:接口返回的图片即可以})

###### 示例

```
formSchema: {
  width: 100,
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
      label: 'testSlot',
      prop: 'testSlot',
      slot: 'testForm',
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
