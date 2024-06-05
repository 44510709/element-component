<template>
  <el-checkbox-group v-model="ruleForm[checkData.prop]" :style="{ width: checkData.width + 'px' }">
    <el-checkbox :label="o[checkData.typeProps.value]" v-for="(o, k) in list" :key="k">{{ o[checkData.typeProps.label]
    }}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import { buildResult } from './utils'
export default {
  name: 'Select',
  props: {
    checkData: {
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
    let res = await this.checkData.typeProps.api(this.checkData.typeProps.params)
    //需要兼容 不同数据格式层级的返回(apiResult)
    res = this.checkData.typeProps.apiResult && this.checkData.typeProps.apiResult.list ? buildResult(res, this.checkData.typeProps.apiResult.list) : res.data;
    this.list = res;
  }
}
</script>

<style></style>