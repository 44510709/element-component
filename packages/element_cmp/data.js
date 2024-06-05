import { list2, list, del, treelist, upload } from "../../examples/api/test";
export const tableSchema = {
  api: list, //API请求
  apiResult: {
    list: "data.data.list", //接口返回的数据的层级
    total: "data.data.total", //接口返回的数据的层级
  },
  params: {
    //请求参数
    pageNo: 1,
    pageSize: 10,
  },
  columns: [
    {
      label: "id",
      prop: "id",
    },
    {
      label: "用户昵称",
      prop: "nickName",
    },
    {
      slot: "avatar",
      label: "用户头像",
      prop: "avatar",
    },
    {
      label: "品牌",
      prop: "platformName",
    },
    {
      label: "用户手机号",
      prop: "phoneNumber",
    },
    {
      slot: "createTime",
      label: "创建时间",
      prop: "createTime",
    },
    {
      slot: "Button",
      label: "操作",
      prop: "button",
      width: "200",
      fixed: "right",
    },
  ],
};

export const searchFormSchema = {
  columns: [
    {
      type: "input",
      label: "手机号",
      prop: "phoneNumber",
      width: 200,
    },
    {
      type: "select",
      label: "品牌",
      prop: "platformId",
      width: 200,
      typeProps: {
        //select参数
        api: list2, //api数据
        apiResult: {
          //接口返回的数据的层级
          list: "data.data",
        },
        label: "name", //接口字段显示label
        value: "id", //接口字段 取值
      },
    },
    {
      type: "datetimerange",
      label: "时间",
      prop: "paramsTime",
      width: 200,
      paramsTime: {
        //自定义日期区间 type=datetimerange 开始结束的字段名
        startTime: "",
        endTime: "",
      },
    },
  ],
  buttons: [
    {
      slot: "delAll", //插槽
      label: "批量删除", //标题
      prop: "delAll", //参数
      type: "primary", //按钮风格
      call: (v) => {
        //回调
        console.log(v);
      },
    },
  ],
};

export const formSchema = {
  columns: [
    {
      type: "input",
      label: "姓名",
      prop: "name",
      width: 200,
      placeholder: "姓名2",
    },
    {
      type: "datetimerange",
      label: "日期",
      prop: "createTime",
      width: 200,
      search: true,
      placeholder: "日期",
      paramsTime: {
        start: "",
        end: "",
      },
    },
    {
      label: "状态",
      prop: "id",
      width: 200,
      type: "select",
      placeholder: "1",
      // multiple: true,
      // multipleType: 'string',
      typeProps: {
        list: [
          //自定义数据
          { label: "待上架", value: 0 },
          { label: "已上架", value: 1 },
          { label: "已下架", value: 2 },
        ],
      },
    },
    {
      type: "upload", // upload
      label: "上传", // 标题
      prop: "upload",
      required: true, // 校验
      typeProps: {
        api: upload,
        apiResult: {
          list: "data.data",
        },
        limit: 1, // 个数
        limitRule: true, //表单校验规则(提交需要校验上传limit张)
        max: 10, // 大小 M
        description: "描述", //描述
        call(v) {
          //回调
          v.fileList.push({ url: "http://" + v.data });
        },
      },
    },
  ],
  buttons: [],
};
