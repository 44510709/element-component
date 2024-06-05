<template>
  <el-radio-group v-model="ruleForm[radioData.prop]" :style="{ width: radioData.width + 'px' }">
    <el-radio :label="o[radioData.typeProps.value]" v-for="(o, k) in list" :key="k">{{
      o[radioData.typeProps.label] }}</el-radio>
  </el-radio-group>
</template>

<script>
import { buildResult } from './utils'
export default {
  name: 'Radio',
  props: {
    radioData: {
      type: Object,
      default: {}
    },
    ruleForm: Object
  },
  data() {
    return {
      list: []
    }
  },
  async created() {
    //通过api获取数据
    let res = await this.radioData.typeProps.api(this.radioData.typeProps.params)
    //需要兼容 不同数据格式层级的返回(apiResult)
    res = this.radioData.typeProps.apiResult && this.radioData.typeProps.apiResult.list ? buildResult(res, this.radioData.typeProps.apiResult.list) : res.data;
    this.list = res;
  }
}
</script>

<style scoped>
::v-deep .el-radio {
  margin-bottom: 20px;
}
</style>