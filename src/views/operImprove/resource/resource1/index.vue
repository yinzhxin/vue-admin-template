<template>
  <div class="dashboard-container">
    <el-form
      :inline="true"
      :model="formInline"
      style="display: flex; justify-content: space-between"
    >
      <el-form-item label="数据采样间隔选择">
        <el-time-select
          v-model="formInline.value1"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
          placeholder="选择时间"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="数据更新事件点">
        <span>2023年05月09日 09:45</span>
      </el-form-item>
      <el-form-item label="数据更新频率">
        <el-select
          v-model="formInline.value2"
          placeholder="请选择"
          style="width: 300px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content" style="height: 640px">
          <div class="title-style">
            <p>Redis</p>
            <el-button
              class="btn-style"
              type="text"
              icon="el-icon-message-solid"
            >
            </el-button>
          </div>
          <el-table :data="tableData" style="width: 100%" :show-header="false">
            <el-table-column prop="title" label="" width=""> </el-table-column>
            <el-table-column prop="radio" label="" width="50" fixed="right">
            </el-table-column>
          </el-table>
        </div>
      </el-col>

      <el-col :span="18">
        <el-row>
          <el-col :span="24" style="margin-bottom: 20px">
            <div class="grid-content" style="height: 310px">
              <LineChart
                :width="'100%'"
                :height="'110%'"
                :chart-data="chartData1.data"
                :xAxisData="chartData1.xAxisData"
                :title="`QPS`"
                :isShowStyle="false"
                :color="['#5470C6', '#91CC75']"
              />
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content" style="height: 310px">
              <LineChart
                :width="'100%'"
                :height="'110%'"
                :chart-data="chartData2.data"
                :xAxisData="chartData2.xAxisData"
                :title="'连接使用率'"
                :isShowStyle="false"
                :color="['#5470C6', '#91CC75']"
              />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content">
          <div class="title-style2">
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width: 600px; margin-left: 5px"
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

          <Table :table-data="tableData2" :columns="columns" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import LineChart from "@/views/echarts/LineChart.vue";
import Table from "@/views/components/Table.vue";
import { Divider } from "element-ui";

export default {
  name: "Resource1",
  components: { LineChart, Table },
  data() {
    return {
      formInline: {
        value1: "",
        value2: "",
      },
      options: [],
      value: "",

      tableData: [
        { radio: "3/3", title: "数据结点数量" },
        { radio: "3/3", title: "主节点数" },
        { radio: "3/3", title: "总连接数" },
        { radio: "3/3", title: "总活跃链接数" },
        { radio: "3/3", title: "阻塞会话数" },
      ],

      tableData2: [
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
        {
          node: "16.107.253.122",
          status: "异常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
        {
          node: "16.107.253.122",
          status: "正常",
          qps: "1500",
          diskUsage: "21",
          memoryUsage: "22",
          cpuUsage: "51",
        },
      ],

      columns: [
        { label: "节点", index: "node" },
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
        { label: "QPS", index: "qps" },
        { label: "CPU使用率", index: "cpuUsage" },
        { label: "内存使用率", index: "memoryUsage" },
        { label: "磁盘使用率", index: "diskUsage" },
      ],

      chartData1: {
        data: [
          {
            name: "a",
            data: [2000, 2100, 2000, 2000, 2200, 2000, 2000],
          },
        ],
        xAxisData: ["9:00", "9:10", "9:20", "9:30", "9:40", "9:50", "10:00"],
      },

      chartData2: {
        data: [
          {
            name: "b",
            data: [90, 90, 90, 90, 90, 90, 90],
          },
        ],
        xAxisData: ["9:00", "9:10", "9:20", "9:30", "9:40", "9:50", "10:00"],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
$bg: #fff;
$title-bg: #cde3ed;
$bell-color: #67c23a;

.grid-content {
  background: $bg;
  min-height: 100px;
}

.el-card__header {
  padding: 0px !important;
  border-bottom: 1px solid #ebeef5;
}

.title-style {
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 5px;
  background: $title-bg;
  .btn-style {
    float: right;
    padding: 3px 0;
    color: $bell-color;
    font-size: 25px;
  }
}

.title-style2 {
  display: flex;
  align-items: center;
  height: 50px;
  background: $title-bg;
}
</style>
