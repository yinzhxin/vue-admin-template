<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="HTTP 请求">
          <!-- <h3>HTTP 请求</h3> -->
        </el-form-item>

        <el-form-item label="目标类型">
          <el-select v-model="formInline.type" placeholder="">
            <el-option label="应用" value="app"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="应用">
          <el-select v-model="formInline.app" placeholder="">
            <el-option label="归因分析服务" value="one"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="实例">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div style="display: flex; margin-top: 20px"></div>

    <div style="display: flex; margin-top: 20px"></div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
    };
  },

  methods: {},
};
</script>
