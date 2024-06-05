<template>
  <el-tree :data="list" show-checkbox :node-key="treeData.typeProps.value" :props="treeData.prop"
    :default-checked-keys="treeData.default" @check="checkTreeChange" :style="{ width: treeData.width + 'px' }"
    ref="tree">
  </el-tree>
</template>

<script>
import { buildResult } from './utils'
export default {
  name: 'Tree',
  props: {
    treeData: {
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
    let res = await this.treeData.typeProps.api(this.treeData.typeProps.params)
    //需要兼容 不同数据格式层级的返回(apiResult)
    res = this.treeData.typeProps.apiResult && this.treeData.typeProps.apiResult.list ? buildResult(res, this.treeData.typeProps.apiResult.list) : res.data;
    this.list = res;
  },
  methods: {
    //获取tree勾选
    checkTreeChange(data, v) {
      this.ruleForm.tree = v.checkedKeys;
    },
  }
}
</script>

<style></style>