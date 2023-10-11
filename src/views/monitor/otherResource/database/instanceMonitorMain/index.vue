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
            <p>EverDB</p>
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
            <div class="grid-content" style="height: 200px">
              <LineChart
                :width="'100%'"
                :height="'120%'"
                :chartData="chartData1.data"
                :xAxisData="chartData1.xAxisData"
                :title="`QPS / TPS`"
                :isShowStyle="false"
                :color="['#5470C6', '#91CC75', '#FAC858']"
              />
            </div>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px">
            <div class="grid-content" style="height: 200px">
              <LineChart
                :width="'100%'"
                :height="'120%'"
                :chartData="chartData2.data"
                :xAxisData="chartData2.xAxisData"
                :title="'数据库连接总数 / 数据库活跃连接总数'"
                :isShowStyle="false"
                :color="['#5470C6', '#91CC75', '#FAC858']"
              />
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content" style="height: 200px">
              <LineChart
                :width="'100%'"
                :height="'120%'"
                :chartData="chartData3.data"
                :xAxisData="chartData3.xAxisData"
                :title="'连接拒绝总数 / 慢SQL超时接次数 / 锁超时次数'"
                :isShowStyle="false"
                :color="['#5470C6', '#91CC75', '#FAC858']"
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

export default {
  name: "Resource2",
  components: { LineChart, Table },
  computed: {},
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
          node: "az3-DB-server0",
          source: "正常",
          type: "主",
          connectionCount: 25,
          activeConnections: 10,
          blockedSessions: 2,
          lockTimeouts: 0,
          statementConflicts: 3,
          cacheHitRate: "98.5%",
          qps: 1200,
          tps: 800,
          spaceUsage: "70%",
          logSpaceUsage: "35%",
          diskUsage: "60%",
          memoryUsage: "40%",
          cpuUsage: "20%",
        },
        {
          node: "az3-DB-server1",
          source: "正常",
          type: "主",
          connectionCount: 25,
          activeConnections: 10,
          blockedSessions: 2,
          lockTimeouts: 0,
          statementConflicts: 3,
          cacheHitRate: "98.5%",
          qps: 1200,
          tps: 800,
          spaceUsage: "70%",
          logSpaceUsage: "35%",
          diskUsage: "60%",
          memoryUsage: "40%",
          cpuUsage: "20%",
        },
        {
          node: "az3-DB-server0",
          source: "正常",
          type: "主",
          connectionCount: 25,
          activeConnections: 10,
          blockedSessions: 2,
          lockTimeouts: 0,
          statementConflicts: 3,
          cacheHitRate: "98.5%",
          qps: 1200,
          tps: 800,
          spaceUsage: "70%",
          logSpaceUsage: "35%",
          diskUsage: "60%",
          memoryUsage: "40%",
          cpuUsage: "20%",
        },
        {
          node: "az3-DB-server1",
          source: "正常",
          type: "主",
          connectionCount: 25,
          activeConnections: 10,
          blockedSessions: 2,
          lockTimeouts: 0,
          statementConflicts: 3,
          cacheHitRate: "98.5%",
          qps: 1200,
          tps: 800,
          spaceUsage: "70%",
          logSpaceUsage: "35%",
          diskUsage: "60%",
          memoryUsage: "40%",
          cpuUsage: "20%",
        },
      ],

      columns: [
        { label: "节点", index: "node" },
        {
          label: "状态",
          index: "source",
          render: (h, data) => {
            return (
              <div>
                {data.row.source == "正常" ? (
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
        { label: "主从", index: "type" },
        { label: "链接数", index: "connectionCount" },
        { label: "活跃连接数", index: "activeConnections" },
        { label: "阻塞会话数", index: "blockedSessions" },
        { label: "锁超时间", index: "lockTimeouts" },
        { label: "语句冲突次数", index: "statementConflicts", width: "120" },
        { label: "缓存命中率", index: "cacheHitRate" },
        { label: "QPS", index: "qps" },
        { label: "TPS", index: "tps" },
        { label: "空间使用率", index: "spaceUsage" },
        { label: "日志空间使用率", index: "logSpaceUsage", width: "120" },
        { label: "磁盘使用率", index: "diskUsage" },
        { label: "内存使用率", index: "memoryUsage" },
        { label: "CPU使用率", index: "cpuUsage" },
      ],

      chartData1: {
        data: [
          {
            name: "a",
            data: [0.35, 0.35, 0, 0.35, 0, 0.35, 0.35],
          },
          {
            name: "b",
            data: [0.25, 0.25, 0.25, 0, 0.25, 0.25, 0],
          },
        ],
        xAxisData: ["9:00", "9:10", "9:20", "9:30", "9:40", "9:50", "10:00"],
      },

      chartData2: {
        data: [
          {
            name: "a",
            data: [9, 9, 9, 9, 9, 9, 9],
          },
          {
            name: "b",
            data: [5, 5, 5, 4, 5, 5, 5],
          },
        ],
        xAxisData: ["9:00", "9:10", "9:20", "9:30", "9:40", "9:50", "10:00"],
      },

      chartData3: {
        data: [
          {
            name: "a",
            data: [9, 9, 9, 9, 9, 9, 9],
          },
          {
            name: "b",
            data: [8, 9, 6, 6, 7, 6, 6],
          },
          {
            name: "c",
            data: [5, 5, 5, 4, 5, 5, 5],
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
