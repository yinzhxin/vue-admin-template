<template>
  <div class="dashboard-container">
    <el-select v-model="value" placeholder="请选择" style="width: 400px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content">
          <div class="title-style">
            <strong>资源配额</strong>
          </div>
          <progress-card :chart-data="chartData2" />
        </div>
      </el-col>

      <el-col :span="9">
        <div class="grid-content">
          <div class="title-style">
            <strong>告警</strong>
          </div>
          <div class="container-text">
            <span class="centered-text"> 未配置告警数据 无告警数据 </span>
          </div>
        </div>
      </el-col>

      <el-col :span="5">
        <div class="grid-content">
          <div class="title-style">
            <strong>事件</strong>
          </div>
          <div class="total-style">
            <div>近一天</div>
            <div>
              <span style="font-size: 50px; font-weight: 400">0</span>
            </div>
            <div>总数</div>
          </div>
          <div
            class="total-style"
            style="justify-content: space-around; margin-top: 60px"
          >
            <div>
              <div class="color-box" style="background: #ea9d42"></div>
              告警
            </div>
            <div>
              <div class="color-box" style="background: #a2f04c"></div>
              正常
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content">
          <RadiusPieChart
            :width="'100%'"
            :height="'300%'"
            :chart-data="chartData"
            :title="`应用`"
          />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <BarYChart
            :width="'100%'"
            :height="'300%'"
            :chart-data="chartData3"
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content">
                <RadiusPieChart
                  :width="'100%'"
                  :height="'300%'"
                  :chart-data="chartData"
                  :title="`容器组`"
                />
              </div>
            </el-col>

            <el-col :span="1">
              <div class="vertical-line"></div>
            </el-col>

            <el-col :span="15">
              <div class="grid-content">
                <el-select
                  v-model="value"
                  placeholder="请选择"
                  style="width: 200px; left: 75%; top: 15px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <LineChart :width="'100%'" :height="'300%'" />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-table
                :data="tableData2"
                border
                style="padding: 0 30px 30px"
                :header-cell-style="{ backgroundColor: '#E8E8E9' }"
                stripe
              >
                <el-table-column
                  v-for="item in columns"
                  :key="item.prop"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width"
                >
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <div class="title-style" style="align-items: center">
            <strong>资源实用率(%)</strong>
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width: 200px; margin-right: 15px"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <LineChart2 :width="'100%'" :height="'300%'" />
        </div>
      </el-col>

      <el-col :span="12">
        <div class="grid-content" style="height: 347px">
          <div class="title-style" style="align-items: center">
            <strong>资源实用量 Top5</strong>
            <i class="el-icon-edit">CPU</i>
            <i class="el-icon-share">内存</i>
            <i class="el-icon-delete">存储</i>
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width: 200px; margin-right: 15px"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div style="padding: 30px 20px 0; overflow-y: auto">
            <el-table
              :data="tableData"
              border
              stripe
              :header-cell-style="{
                backgroundColor: '#E8E8E9',
                height: '20px',
                textAlign: 'center',
              }"
              :cell-style="{ 'text-align': 'center' }"
              size="small"
              max-height="250"
            >
              <el-table-column
                v-for="item in [
                  { label: '容器组名称', prop: 'name' },
                  { label: '内存(Mi)', prop: 'memory', width: '150px' },
                ]"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import RadiusPieChart from "./components/RadiusPieChart";
import BarYChart from "./components/BarYChart";
import LineChart from "./components/LineChart";
import LineChart2 from "./components/LineChart2";
import ProgressCard from "./components/ProgressCard";

export default {
  name: "Dashboard",
  components: {
    RadiusPieChart,
    BarYChart,
    LineChart,
    LineChart2,
    ProgressCard,
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      // 饼状图
      chartData: [
        {
          label: "运行中",
          value: 14,
          itemStyle: { color: "#81B435" },
        },
        {
          label: "部分运行",
          value: 0,
          itemStyle: { color: "#EA9D42" },
        },
        {
          label: "处理中",
          value: 1,
          itemStyle: { color: "#3F95E6" },
        },
        {
          label: "失败/异常",
          value: 0,
          itemStyle: { color: "#BD3026" },
        },
        {
          label: "已停止",
          value: 5,
          itemStyle: { color: "#CECECE" },
        },
        {
          label: "无计算组件",
          value: 5,
          itemStyle: { color: "#EFEFEF" },
        },
      ],
      // 进度条图表
      chartData2: [
        {
          name: "CPU",
          percent: (32 / 200) * 100,
          description: "32/200核",
          ysy: "32核",
          zpe: "200核",
        },
        {
          name: "内存",
          percent: (5 / 300) * 100,
          description: "5/300T",
          ysy: "5Gi",
          zpe: "300Gi",
        },
        {
          name: "存储",
          percent: (120 / 2000) * 100,
          description: "120/2000Gi",
          ysy: "120Gi",
          zpe: "2000Gi",
        },
        {
          name: "Pods数",
          percent: "@integer(0 ,100)",
          description: "201/不限制",
          ysy: "1个",
          zpe: "不限制(512)个",
        },
        {
          name: "PVC数",
          percent: "@integer(0 ,100)",
          description: "0/不限制",
          ysy: "0",
          zpe: "不限制",
        },
      ],
      // 柱状图
      chartData3: {
        fields: [{ name: "运行中", flied: "yxz" }],
        data: [
          { label: "部署", yxz: "4" },
          { label: "有状态副本集", yxz: "0" },
          { label: "守护进程集", yxz: "0" },
        ],
      },
      // 柱状图
      chartData3: {
        fields: [{ name: "运行中", flied: "yxz" }],
        data: [
          { label: "部署", yxz: "4" },
          { label: "有状态副本集", yxz: "0" },
          { label: "守护进程集", yxz: "0" },
        ],
      },
      // 容器组表头
      columns: [
        { label: "名称", prop: "name" },
        { label: "状态", prop: "status" },
        { label: "原因", prop: "reason" },
        { label: "触发时间", prop: "time" },
      ],
      // 容器组表格
      tableData: [
        { name: "ASDA_DSAFSDSV_2321413", memory: "367" },
        { name: "ASDA_DSAFSDSV_2321413", memory: "367" },
        { name: "ASDA_DSAFSDSV_2321413", memory: "367" },
        { name: "ASDA_DSAFSDSV_2321413", memory: "367" },
        { name: "ASDA_DSAFSDSV_2321413", memory: "367" },
        { name: "ASDA_DSAFSDSV_2321413", memory: "367" },
        { name: "ASDA_DSAFSDSV_2321413", memory: "367" },
        { name: "ASDA_DSAFSDSV_2321413", memory: "367" },
      ],
      // 资源使用率表格
      tableData2: [
        {
          name: "FD_DSAFDSVDSV_32543667",
          status: "正常",
          reason: "Container exits with non-zero exit code 137",
          time: "2023-4-29 14:30:20",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  background: #ffffff;
  min-height: 229px;
  // overflow: hidden;
}
.title-style {
  margin-top: 20px;
  padding: 15px 0 0 15px;
  display: flex;
  justify-content: space-between;
}
.total-style {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
}
.container-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 190px;
  .centered-text {
    text-align: center;
    color: #9e9e9e;
  }
}
.color-box {
  display: inline-block;
  vertical-align: bottom;
  width: 20px;
  height: 20px;
}

/* 灰色竖线 */
.vertical-line {
  width: 2px;
  height: 240px;
  margin-top: 40px;
  margin-left: -10px;
  background-color: #e8e8e8;
}

/* 表格样式 */
.el-table--border {
  border: 0px solid #ebeef5;
}
</style>
