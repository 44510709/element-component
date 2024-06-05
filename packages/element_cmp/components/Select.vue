<template>
  <el-select v-model="ruleForm[selectData.prop]" filterable
    :placeholder="`请选择${selectData.placeholder ? selectData.placeholder : selectData.label}`"
    :multiple="selectData.multiple" :style="{ width: selectData.width + 'px' }" @change="change">
    <el-option v-for="(item, k) in list" :key="item.value" :label="item[selectData.typeProps.label] || item.label"
      :value="item[selectData.typeProps.value] || item.value">
    </el-option>
  </el-select>
</template>

<script>
import { buildResult } from './utils'
export default {
  name: 'Select',
  props: {
    selectData: {
      type: Object,
      default: {}
    },
    ruleForm: Object
  },
  data() {
    return {
      list: [],
    }
  },
  async created() {
    //
    if (this.selectData.typeProps.list && this.selectData.typeProps.list.length > 0) {
      this.list = this.selectData.typeProps.list;
      return false;
    }
    //通过api获取数据
    let res = await this.selectData.typeProps.api(this.selectData.typeProps.params)
    //需要兼容 不同数据格式层级的返回(apiResult)
    res = this.selectData.typeProps.apiResult && this.selectData.typeProps.apiResult.list ? buildResult(res, this.selectData.typeProps.apiResult.list) : res.data;
    this.list = res;
  },
  methods: {
    change(v) {
      if (this.selectData.multiple && this.selectData.multipleType == 'string') { //如果多选并且要求值不是数组转字符串
        this.$parent.ruleForm[this.selectData.prop] = v.join(',');
        return false;
      }
      this.ruleForm[this.selectData.prop] = v;
    }
  }
}
</script>

<style></style>