<template>
  <div class="dashboard-container">
    <!-- 查询表单 -->
    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form">
          <el-form-item label="监控时间">
            <el-time-select
              v-model="form.time"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
              }"
              placeholder="选择时间"
            >
            </el-time-select>
          </el-form-item>

          <el-form-item label="应用名称">
            <el-input v-model="form.name" clearable> </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 三个图表 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content">
          <LineChart
            :width="'100%'"
            :height="'310px'"
            :xAxisData="xAxisData"
            :chartData="chartData1.data"
            :title="'sc-a'"
            :isAreaStyle="false"
            :isShowNode="false"
            :color="color"
            :legend="legend"
          />
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content">
          <LineChart
            :width="'100%'"
            :height="'310px'"
            :xAxisData="xAxisData"
            :chartData="chartData2.data"
            :title="'sc-b'"
            :isAreaStyle="false"
            :isShowNode="false"
            :color="color"
            :legend="legend"
          />
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content">
          <LineChart
            :width="'100%'"
            :height="'310px'"
            :xAxisData="xAxisData"
            :chartData="chartData3.data"
            :title="'sc-c'"
            :isAreaStyle="false"
            :isShowNode="false"
            :color="color"
            :legend="legend"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 三个图表 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content">
          <LineChart
            :width="'100%'"
            :height="'310px'"
            :xAxisData="xAxisData"
            :chartData="chartData4.data"
            :title="'sc-a-blue'"
            :isAreaStyle="false"
            :isShowNode="false"
            :color="color"
            :legend="legend"
          />
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content">
          <LineChart
            :width="'100%'"
            :height="'310px'"
            :xAxisData="xAxisData"
            :chartData="chartData5.data"
            :title="'sc-b-red'"
            :isAreaStyle="false"
            :isShowNode="false"
            :color="color"
            :legend="legend"
          />
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content">
          <LineChart
            :width="'100%'"
            :height="'310px'"
            :xAxisData="xAxisData"
            :chartData="chartData6.data"
            :title="'sc-b-blue'"
            :isAreaStyle="false"
            :isShowNode="false"
            :color="color"
            :legend="legend"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "@/views/echarts/LineChart.vue";

export default {
  name: "EscapeObservation",
  components: { LineChart },
  data() {
    return {
      // 主页查询表单
      form: {
        time: "",
        name: "",
      },

      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },

      legend: {
        top: 20,
      },

      color: ["#409EFF", "#68BBC4", "#58A55C", "#F2BD42", "#F56C6C"],

      xAxisData: ["15:59", "16:00", "16:01", "16:02", "16:03"],

      chartData1: {
        data: [
          {
            name: "total",
            data: [0, 0, 0, 0, 0],
          },
          {
            name: "未打标",
            data: [245, 20, 30, 25, 23],
          },
          {
            name: "red",
            data: [0, 0, 0, 0, 0],
          },
          {
            name: "blue",
            data: [0, 0, 0, 0, 0],
          },
        ],
      },

      chartData2: {
        data: [
          {
            name: "total",
            data: [0, 0, 0, 0, 0],
          },
          {
            name: "未打标",
            data: [245, 20, 30, 25, 23],
          },
          {
            name: "red",
            data: [0, 0, 0, 0, 0],
          },
          {
            name: "blue",
            data: [0, 0, 0, 0, 0],
          },
        ],
      },

      chartData3: {
        data: [
          {
            name: "total",
            data: [950, 100, 50, 50, 120],
          },
          {
            name: "未打标",
            data: [500, 85, 48, 50, 85],
          },
          {
            name: "red",
            data: [480, 85, 48, 50, 85],
          },
          {
            name: "blue",
            data: [0, 0, 0, 0, 0],
          },
        ],
      },

      chartData4: {
        data: [
          {
            name: "total",
            data: [950, 100, 50, 50, 120],
          },
          {
            name: "未打标",
            data: [500, 85, 48, 50, 85],
          },
          {
            name: "red",
            data: [480, 85, 48, 50, 85],
          },
          {
            name: "blue",
            data: [0, 0, 0, 0, 0],
          },
        ],
      },

      chartData5: {
        data: [
          {
            name: "total",
            data: [0, 0, 0, 0, 0],
          },
          {
            name: "未打标",
            data: [245, 20, 30, 25, 23],
          },
          {
            name: "red",
            data: [0, 0, 0, 0, 0],
          },
          {
            name: "blue",
            data: [0, 0, 0, 0, 0],
          },
        ],
      },

      chartData6: {
        data: [
          {
            name: "total",
            data: [0, 0, 0, 0, 0],
          },
          {
            name: "未打标",
            data: [245, 20, 30, 25, 23],
          },
          {
            name: "red",
            data: [0, 0, 0, 0, 0],
          },
          {
            name: "blue",
            data: [0, 0, 0, 0, 0],
          },
        ],
      },
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.grid-content {
  padding: 20px;
  background: #fff;
  min-height: 200px;
  overflow: hidden;
}
</style>
