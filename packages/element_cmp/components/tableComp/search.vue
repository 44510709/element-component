<template>
  <!-- search -->
  <div class="s-header">
    <!-- 搜索栏 -->
    <template v-for="(s, k) in searchFormSchema.columns">
      <!-- select -->
      <label v-if="s.type == 'select'">{{ s.label }}:
        <Select class="m20" :selectData="s" :ruleForm="searchForm" />
      </label>
      <!-- input -->
      <label v-if="s.type == 'input'">{{ s.label }}:
        <el-input class="m20" v-model="searchForm[s.prop]" :style="{ width: s.width + 'px' }"
          :placeholder="'请填写' + (s.placeholder || s.label)"></el-input>
      </label>
      <!-- dateTime -->
      <label v-if="s.type == 'datetime'">{{ s.label }}
        <el-date-picker class="m20" :type="s.type" :placeholder="s.placeholder || '选择日期'" v-model="searchForm[s.prop]"
          value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: s.width + 'px' }"></el-date-picker>
      </label>
      <!-- datetimerange -->
      <label v-if="s.type == 'datetimerange'">{{ s.label }}:
        <el-date-picker class="m20" v-model="dateTimes" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :style="{ width: s.width + 'px' }"
          @change="changeDate($event, s)">
        </el-date-picker>
      </label>
      <!-- 插槽 -->
      <label v-if="s.slot">
        <slot :name="s.slot" :data="s" :formData="searchForm"></slot>
      </label>
    </template>
    <!-- 搜索栏默认按钮 -->
    <el-button @click="reset()" v-if="!searchFormSchema.resetHide">重置</el-button>
    <el-button type="primary" @click="screenOut()" v-if="!searchFormSchema.searchHide">查询</el-button>
    <el-button type="primary" @click="insert()" v-if="!searchFormSchema.insertHide">新增</el-button>
    <!-- 自定义按钮 -->
    <template v-for="(s, k) in searchFormSchema.buttons">
      <el-button :type="s.type || ''" @click="call(s.call)">{{ s.label }}</el-button>
    </template>
  </div>
</template>
<script>
import Select from '../Select.vue'
export default {
  name: 'Search',
  props: {
    searchFormSchema: Object,
    searchForm: Object,//搜索栏
  },
  components: { Select },
  data() {
    return {
      dateTimes: [],//区间日期
    }
  },
  methods: {
    //选择日期范围 重新设置接口的查询字段
    changeDate(v, data) {
      if (!data.paramsTime) return;
      let index = 0;
      for (let key in data.paramsTime) {
        delete this.searchForm[data.prop];
        this.searchForm[key] = v[index];
        index++;
      }
      console.log(this.searchForm, 11);
    },
    //查询
    screenOut() {
      this.$emit('screenOut')
    },
    //重置
    reset() {
      for (const key in this.searchForm) {
        this.searchForm[key] = ''
      }
      this.dateTimes = []
      this.$parent.toggleSelection()
      this.$emit('reset')
    },
    //新增
    insert() {
      this.$emit('insert')
    },
    //插槽按钮 回调
    call(callBack) {
      callBack && callBack(this.searchForm)
    },
  }
}
</script>
<style scoped>
.s-header {
  margin-bottom: 20px;
}

.m20 {
  margin: 20px;
}
</style>