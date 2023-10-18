<template>
  <div>
    <el-card class="margin-bottom">
      <div slot="header" class="clearfix">
        <span>归因分析服务</span>
      </div>
      <el-form class="form" label-width="150px" :model="ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="应用运行环境">
              <el-select
                v-model="ruleForm.appEnvironment"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in appEnvironmentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select></el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="AZ">
              <el-select v-model="ruleForm.az" placeholder="请选择">
                <el-option
                  v-for="item in azOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Java环境">
              <el-select
                v-model="ruleForm.javaEnvironment"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in javaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select></el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="文件上传方式">
              <el-select
                v-model="ruleForm.fileMode"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in fileModeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select></el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上传JAR包">
              <div class="flex-between">
                <el-upload class="upload-demo" action="">
                  <el-button type="primary">选择文件</el-button>
                </el-upload>
                <el-input
                  placeholder="文件"
                  style="width: 80%; margin-left: 10px"
                  disabled
                ></el-input>
              </div> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="版本">
              <div class="flex-between">
                <el-input
                  style="width: 60%"
                  v-model="ruleForm.edition"
                ></el-input>
                <span class="text-color">用时间戳作为版本号</span>
              </div>
            </el-form-item></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="时区">
              <el-select
                v-model="ruleForm.timeZone"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select></el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-collapse>
        <el-collapse-item>
          <template slot="title"> 启动命令 </template>
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title"> 环境变量 </template>
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title"> 持久化存储 </template>
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title"> 本地存储 </template>
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title"> 应用生命周期管理 </template>
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title"> 日志收集设置 </template>
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title"> Java启动参数配置 </template>
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title"> 限流降级配置 </template>
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card class="margin-top flex-end">
      <el-button type="primary">确认</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        appEnvironment: "标准java运行环境",
        az: "all",
        javaEnvironment: "Open JDK 8",
        fileMode: "上传JAR包",
        edition: "2023-4-29 11:12:13",
        timeZone: "UTC+8",
      },
      appEnvironmentOptions: [
        {
          label: "标准java运行环境",
          value: "标准java运行环境",
        },
      ],
      azOptions: [
        {
          label: "全部",
          value: "all",
        },
      ],
      javaOptions: [
        {
          label: "Open JDK 8",
          value: "Open JDK 8",
        },
      ],
      fileModeOptions: [
        {
          label: "上传JAR包",
          value: "上传JAR包",
        },
      ],
      timeOptions: [
        {
          label: "UTC+8",
          value: "UTC+8",
        },
      ],
    };
  },
  watch: {},
  created() {},
  computed: {},
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.form {
  padding: 0 80px;
}
.el-row {
  margin-bottom: 0;
}
</style>
