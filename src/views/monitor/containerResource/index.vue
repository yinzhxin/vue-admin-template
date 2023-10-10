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
          <div class="title-style"><strong>资源配额</strong></div>
          <ProgressCard :chart-data="chartData2" />
        </div>
      </el-col>

      <el-col :span="9">
        <div class="grid-content">
          <div class="title-style"><strong>告警</strong></div>
          <div class="warning-style">
            <span class="warning-content"> 未配置告警数据 无告警数据 </span>
          </div>
        </div>
      </el-col>

      <el-col :span="5">
        <div class="grid-content">
          <div class="title-style"><strong>事件</strong></div>
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
              <div class="color-box" style="background: #ea9d42" />
              告警
            </div>
            <div>
              <div class="color-box" style="background: #a2f04c" />
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
            :chart-data="chartData.data"
            :color="chartData.color"
            :label="chartData.label"
            :radius="chartData.radius"
            :center="chartData.center"
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
            :title="`计算组件`"
          />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-bottom: 0px">
      <el-col :span="24">
        <div class="grid-content">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content">
                <RadiusPieChart
                  :width="'100%'"
                  :height="'300%'"
                  :chart-data="chartData.data"
                  :color="chartData.color"
                  :label="chartData.label"
                  :radius="chartData.radius"
                  :center="chartData.center"
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
                <LineChart
                  :width="'100%'"
                  :height="'300%'"
                  :chart-data="chartData4.data"
                  :xAxisData="chartData4.xAxisData"
                  :grid="chartData4.grid"
                  :legend="chartData4.legend"
                  :isAreaStyle="false"
                  :color="['#BBF37F', '#D0685D', '#3F95E6']"
                />
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <div style="padding: 0 30px 30px">
                <Table :table-data="tableData2" :columns="columns2" />
              </div>
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
          <LineChart
            :width="'100%'"
            :height="'300%'"
            :chart-data="chartData5.data"
            :xAxisData="chartData5.xAxisData"
            :grid="chartData5.grid"
            :legend="chartData5.legend"
            :isAreaStyle="false"
            :color="['#BBF37F', '#68BBC4', '#84BC86']"
          />
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

          <div style="padding: 30px 20px 0">
            <Table
              :table-data="tableData"
              :columns="columns"
              :maxHeight="250"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LineChart from "@/views/echarts/LineChart.vue";
import RadiusPieChart from "@/views/echarts/RadiusPieChart.vue";

import Table from "@/views/components/Table.vue";

import BarYChart from "./components/BarYChart";
import ProgressCard from "./components/ProgressCard";

export default {
  name: "StructOverview",
  components: {
    RadiusPieChart,
    BarYChart,
    LineChart,
    ProgressCard,
    Table,
  },
  data() {
    return {
      options: [
        { value: "选项1", label: "黄金糕" },
        { value: "选项2", label: "双皮奶" },
      ],

      value: "",

      // 饼状图
      chartData: {
        data: [
          {
            label: "运行中",
            value: 14,
          },
          {
            label: "部分运行",
            value: 0,
          },
          {
            label: "处理中",
            value: 1,
          },
          {
            label: "失败/异常",
            value: 0,
          },
          {
            label: "已停止",
            value: 5,
          },
          {
            label: "无计算组件",
            value: 5,
          },
        ],
        color: [
          "#EA9D42",
          "#81B435",
          "#3F95E6",
          "#BD3026",
          "#CECECE",
          "#EFEFEF",
        ],
        radius: ["45%", "50%"],
        center: ["35%", "50%"],
        // 饼图图形上的文本标签
        label: {
          show: true,
          position: "center",
          fontSize: "20px",
          formatter(params) {
            return `200 个`;
          },
        },
      },

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
          percent: (5 / 200) * 100,
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
          percent: (120 / 2000) * 100,
          description: "201/不限制",
          ysy: "1个",
          zpe: "不限制(512)个",
        },
        {
          name: "PVC数",
          percent: (120 / 2000) * 100,
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

      // 折线图1
      chartData4: {
        data: [
          {
            name: "运行中",
            data: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
          },
          {
            name: "异常",
            data: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
          },
          {
            name: "共",
            data: [31, 31, 31, 31, 31, 31, 32, 32, 31, 31, 31, 31, 31],
          },
        ],
        grid: {
          left: "2%",
          right: "26%",
          top: "15%",
          containLabel: true,
        },
        legend: {
          orient: "vertical",
          left: "75%",
          top: "7%",
          data: ["运行中", "异常", "共"],
        },
        xAxisData: [
          "14:00",
          "14:05",
          "14:10",
          "14:15",
          "14:20",
          "14:25",
          "14:30",
          "14:35",
          "14:40",
          "14:45",
          "14:50",
          "14:55",
          "15:00",
        ],
      },

      // 折线图2
      chartData5: {
        data: [
          {
            name: "CPU",
            data: [25, 25, 25, 25, 25, 25, 18, 18, 25, 25, 25, 25, 25],
          },
          {
            name: "内存",
            data: [12, 12, 12, 12, 12, 12, 10, 10, 12, 12, 12, 12, 12],
          },
          {
            name: "存储",
            data: [35, 35, 35, 35, 35, 35, 33, 33, 35, 35, 35, 35, 35],
          },
        ],
        xAxisData: [
          "14:00",
          "14:05",
          "14:10",
          "14:15",
          "14:20",
          "14:25",
          "14:30",
          "14:35",
          "14:40",
          "14:45",
          "14:50",
          "14:55",
          "15:00",
        ],
        // 方位调整
        grid: {
          containLabel: true,
        },
        // 图例配置
        legend: {
          bottom: "7%",
          data: ["CPU", "内存", "存储"],
        },
      },

      // 资源使用量表头
      columns: [
        { label: "容器组名称", index: "name", align: "center" },
        { label: "内存", index: "memory", align: "center" },
      ],

      // 资源使用量表格
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

      // 容器组表头
      columns2: [
        { label: "名称", index: "name" },
        {
          label: "状态",
          index: "status",
          render: (h, data) => {
            return (
              <div>
                {data.row.status == "正常" ? (
                  <span style="color:#67C23A">
                    <i class="el-icon-success" />
                  </span>
                ) : (
                  <span style="color:#F56C6C">
                    <i class="el-icon-error" />
                  </span>
                )}
              </div>
            );
          },
        },
        { label: "原因", index: "reason" },
        { label: "触发时间", index: "time" },
      ],

      // 容器组表格
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
$bg: #ffffff;
$dividing-line: #e8e8e8; //与li-underline颜色相同
$text-color: #9e9e9e;

.grid-content {
  background: $bg;
  min-height: 229px;
}

/* 左上角标题样式*/
.title-style {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 15px 0 0 15px;
}

/* 事件样式 */
.total-style {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  .color-box {
    display: inline-block;
    vertical-align: bottom;
    width: 20px;
    height: 20px;
  }
}

/* 告警样式*/
.warning-style {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 190px;
  .warning-content {
    text-align: center;
    color: $text-color;
  }
}

/* 灰色分割线样式 */
.vertical-line {
  width: 2px;
  height: 240px;
  margin: 40px 0 0 -10px;
  background-color: $dividing-line;
}

/* 表格样式 */
.el-table--border {
  border: 0px solid #ebeef5;
  &::after {
    width: 0px;
  }
}
</style>
