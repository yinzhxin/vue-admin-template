<template>
  <div class="dashboard-container">
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form">
          <el-form-item label="">
            <span style="font-weight: 700; font-size: 20px">应用选择</span>
          </el-form-item>

          <el-form-item label="">
            <el-input
              v-model="form.value"
              placeholder="应用查找"
              style="width: 300px"
            />
          </el-form-item>

          <el-form-item label="">
            <el-button>查找</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6" v-for="item in 4" :key="item">
        <div class="grid-content">
          <div class="title-style">
            <strong>资源配额</strong>
            <el-button type="text">配置</el-button>
          </div>
          <div class="content-style">
            <div>业务单元 3x3</div>
            <div>灰度单元 3x3</div>
            <div>公共单元 3x3</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col
        :span="8"
        v-for="item in 15"
        :key="item"
        style="margin-bottom: 20px"
      >
        <div class="grid-content shadow-on-hover">
          <div class="title-style">
            <strong>AZ1-香山 业务单元1</strong>
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </div>
          <div style="display: flex; flex-direction: column; width: 60%">
            <div class="switch-style">
              <div>现状</div>
              <div>就绪</div>
            </div>
            <div class="switch-style">
              <div>实时流量占比</div>
              <div>100%</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UnitTrafficSwitching",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      form: {
        value: "",
      },
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
.grid-content {
  padding: 5px 10px;
  background: #fff;
  min-height: 150px;
  overflow: hidden;
}
.shadow-on-hover {
  min-height: 150px;
}
.shadow-on-hover:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.title-style {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.content-style {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.switch-style {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
