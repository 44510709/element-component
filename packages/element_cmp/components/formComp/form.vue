<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
    :label-width="(formSchema.width ? formSchema.width : 100) + 'px'">
    <!-- 表单 -->
    <el-form-item :label="item.label + ':'" :prop="item.prop" v-for="(item, k) in  formSchema.columns " :key="k">
      <!-- input -->
      <el-input v-model="ruleForm[item.prop]" :style="{ width: item.width + 'px' }" :placeholder="item.placeholder"
        v-if="item.type == 'input'"></el-input>
      <!-- select -->
      <Select :selectData="item" :ruleForm="ruleForm" v-if="item.type == 'select'" />
      <!-- radio -->
      <Radio :radioData="item" :ruleForm="ruleForm" v-if="item.type == 'radio'" />
      <!-- checkbox -->
      <Checkbox :checkData="item" :ruleForm="ruleForm" v-if="item.type == 'checkbox'" />
      <!-- switch -->
      <el-switch v-model="ruleForm[item.prop]" v-if="item.type == 'switch'"
        :style="{ width: item.width + 'px' }"></el-switch>
      <!-- textarea -->
      <el-input type="textarea" v-model="ruleForm[item.prop]" :style="{ width: item.width + 'px' }"
        :placeholder="item.placeholder" v-if="item.type == 'textarea'"></el-input>
      <!-- dateTime -->
      <el-date-picker :type="item.type" :placeholder="item.placeholder || '选择日期'" v-model="ruleForm[item.prop]"
        value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: item.width + 'px' }"
        v-if="item.type == 'datetime'"></el-date-picker>
      <!-- datetimerange -->
      <el-date-picker v-model="ruleForm[item.prop]" type="datetimerange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :style="{ width: item.width + 'px' }"
        v-if="item.type == 'datetimerange'">
      </el-date-picker>
      <!-- tree -->
      <Tree :treeData="item" ref="trees" :ruleForm="ruleForm" v-if="item.type == 'tree'" />
      <!-- upload -->
      <Upload v-if="item.type == 'upload'" ref="upload" :data="item" />
      <!-- 插槽 -->
      <slot v-if="item.slot" :name="item.slot" :ruleForm="ruleForm" :prop="item.prop"></slot>
    </el-form-item>

    <!-- button -->
    <el-form-item class="floor">
      <el-button type="primary" @click="submitForm('ruleForm')" v-if="!formSchema.confirmHide">确定</el-button>
      <el-button @click="cancel" v-if="!formSchema.cancelHide">取 消</el-button>
      <el-button @click="resetForm('ruleForm')" v-if="formSchema.resetHide">重置</el-button>
      <!-- 自定义按钮 -->
      <el-button :type="b.type" @click="call(b.call, b.required)" v-for="(b, k) in formSchema.buttons" :key="k">{{
        b.label
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Upload from '../uploadComp/upload.vue'
import Select from '../Select.vue'
import Radio from '../Radio.vue'
import Checkbox from '../Checkbox.vue'
import Tree from '../Tree.vue'
export default {
  name: 'formComp',
  props: {
    formSchema: Object
  },
  components: { Upload, Select, Radio, Checkbox, Tree },
  data() {
    return {
      ruleForm: {},//表单
      rules: {},//规则
    };
  },
  created() {
    this.init()
  },
  methods: {
    //初始化默认值和规则
    init() {
      let form = {};
      let box = [];
      this.formSchema.columns.forEach((item, i) => {
        //初始化默认值
        switch (item.type) {
          case 'checkbox':
            if (item.default) {
              if (Array.isArray(item.default)) {
                box = box.concat(item.default)
              } else {
                item.default = item.default.split(',')
                box = box.concat(item.default)
              }
            }
            form[item.prop] = box;
            break
          case 'date' || 'datetime' || 'datetimerange':
            if (item.default) {
              if (Array.isArray(item.default)) {
                item.default[0] = new Date(item.default[0])
                item.default[1] = new Date(item.default[1])
              } else {
                form[item.prop] = new Date(item.default)
              }
            }
            break
          case 'upload':
            this.$set(this.formSchema.columns[i], 'fileList', [])
          default:
            form[item.prop] = item.default
            break
        }
      });
      this.ruleForm = form;
      this.addRules()
    },
    //初始化添加校验
    addRules() {
      let ruleObj = {}
      this.formSchema.columns.forEach((item, k) => {
        if (item.required) {
          if (item.type == 'upload') {
            ruleObj[item.prop] = { validator: this.fileMustUpload, trigger: 'change' }
          } else {
            ruleObj[item.prop] = {
              required: item.required || false,
              message: item.message || `${item.label}不能为空`,
              trigger: ['input', 'textarea'].includes(item.type) ? ['blur'] : ['change', 'blur']
            }
          }
        }
      })
      this.rules = ruleObj;
      this.$forceUpdate()
    },
    // 文件上传校验规则
    fileMustUpload(rule, value, callback) {
      let list = this.formSchema.columns.filter(v => v.type == rule.field)
      if (list[0].fileList && list[0].fileList.length <= 0) {
        // 未上传文件
        callback("请上传文件");
      } else if (list[0].limit && list[0].limitRule && list[0].fileList.length < list[0].limit) {
        // 未上传指定个数文件
        callback(`请上传${list[0].limit}张图片`);
      }
      callback();
    },
    //校验
    validFn() {
      let flag;
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 给上传图片赋值
          this.formSchema.columns.forEach(v => {
            if (v.type == 'upload') {
              this.ruleForm[v.prop] = v.fileList
            }
          })
          flag = true;
        } else {
          console.log('error submit!!');
          flag = false;
        }
      });
      return flag;
    },
    //操作按钮 回调
    call(callBack, type) {
      if (type) {//添加校验表单
        if (!this.validFn()) return;
        callBack && callBack(this.ruleForm)
      } else {
        // 给上传图片赋值
        this.formSchema.columns.forEach(v => {
          if (v.type == 'upload') {
            this.ruleForm[v.prop] = v.fileList
          }
        })
        callBack && callBack(this.ruleForm)
      }
    },
    //提交
    submitForm(formName) {
      if (!this.validFn()) return;
      this.$emit('SubmitForm', this.ruleForm)
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //当有tree 清除数据
      this.$refs.trees && this.$refs.trees[0].$children[0].setCheckedKeys([])
      this.formSchema.columns.forEach(v => {
        //上传列表清空
        if (v.type == 'upload') {
          v.fileList = []
        }
        //默认值清空
        if (v.default) {
          this.ruleForm[v.prop] = ''
        }
      })
      this.$emit('formReset')
    },
    //取消
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
::v-deep .floor {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
  padding-right: 20px;
}
</style>
