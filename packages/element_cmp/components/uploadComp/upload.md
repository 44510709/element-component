### 使用

`<Uploads :data="item" />`

##### data:数据传参数{fileList,disabled,typeProps}

- fileList`(非必传)`: [],//图片列表
- disabled`(非必传)` :禁用
- typeProps.api`(必传)` : 导入请求 api 只需传 api 即可,
- typeProps.apiResult`(必传)`:{list:'接口返回的数据的层级'}api 返回的结果层进行适配
- typeProps.limit`(非必传)` : 个数
- typeProps.max`(非必传)`: 大小 (M)
- typeProps.description`(非必传)`: '描述',//提示 比如大小个数等显示
- typeProps.limitRule`(非必传)`: true,//表单校验规则(提交需要校验上传 limit 张,limit 必传)

```
{
  fileList:[],
  typeProps: {
    api: upload,
    apiResult: {//非必传,对api返回的结果层数据进行适配,
    //比如api得到的数据是 data:{ data:{ list:[], total:7 },msg:'' } ---> data.data.list
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
}
```

##### 成功回调,返回对象,对象有两个值:

- 第一个值:调用接口返回的数据包含成功和失败
- 第二个值:图片列表(直接 push(接口返回的图片即可))
