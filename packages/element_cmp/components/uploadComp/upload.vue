<template>
  <div>
    <!-- 上传组件 -->
    <!-- httpRequest 覆盖默认上传行为，使用自定义上传行为 -->
    <!-- action 必填项，http-request 覆盖这里可以直接为空 -->
    <!-- limit 最大上传数量 -->
    <el-upload ref="upload" :class="{ hideUpload: hideUploadEdit }" :http-request="handleUpload" action=""
      list-type="picture-card" :limit="data.typeProps.limit" :on-exceed="onExceed" :file-list="data.fileList"
      :before-upload="beforeAvatarUpload" :on-remove="handPictureCardRm" :disabled="data.disabled">
      <i class="el-icon-plus"></i>
    </el-upload>
    <div style="font-size: 12px;">{{ data.typeProps.description }}</div>
  </div>
</template>
<script>
import { buildResult } from '../utils'
export default {
  name: 'Upload',
  props: {
    data: Object,
  },
  data() {
    return {
      // 是否隐藏上传按钮
      hideUploadEdit: false
    }
  },
  methods: {
    // 自定义上传动作
    async handleUpload(file) {
      //上传成功处理数据前不回显图片
      this.$refs.upload.uploadFiles.pop()
      const formData = new FormData()
      formData.append('file', file.file)
      //调用api
      let res = await this.data.typeProps.api(formData)
      //需要兼容 不同数据格式层级的返回(apiResult)
      res = this.data.typeProps.apiResult && this.data.typeProps.apiResult.list ? buildResult(res, this.data.typeProps.apiResult.list) : res.data;
      // 调用api返回
      await this.successCallBack(res)
    },
    //调用接口返回函数
    successCallBack(result) {
      //有两个参数:
      //data 是接口返回数据
      //fileList是图片列表  直接fileList.push(返回数据即可以)
      if (this.data.typeProps.call) {//回调
        this.data.typeProps.call && this.data.typeProps.call({
          data: result,
          fileList: this.data.fileList
        })
      } else {
        this.data.fileList.push({ url: result })
      }
      // 是否隐藏上传按钮
      this.hideUploadEditShow()
    },
    //limit 文件个数
    onExceed() {
      this.$message.warning(`只能选择${this.data.typeProps.limit}张`);
    },
    // 是否隐藏上传按钮
    hideUploadEditShow() {
      try {
        this.hideUploadEdit = this.data.typeProps.limit ? (this.data.fileList.length >= this.data.typeProps.limit) : false;
      } catch {
        this.hideUploadEdit = false
      }
    },
    // 上传之前
    beforeAvatarUpload(file) {
      //判断图片大小
      if (this.data.typeProps.max && ((file.size / 1024 / 1024) > this.data.typeProps.max)) {
        this.$message.warning(`图片必须小于${this.data.typeProps.max}MB`);
        return false;
      }
    },
    //删除
    handPictureCardRm(v) {
      this.data.fileList = this.data.fileList.filter(item => item.url != v.url)
      // 是否隐藏上传按钮
      this.hideUploadEditShow()
    },
  }
}
</script>
<style scoped>
::v-deep .el-upload-list__item {
  transition: none !important;
}

::v-deep .hideUpload .el-upload.el-upload--picture-card {
  display: none;
}
</style>