<template>
  <div>
    <div style="display: flex; margin-top: 20px">
      <BarChart
        :width="'100%'"
        :height="'300px'"
        :chart-data="chartData1.data"
        :xAxisData="chartData1.xAxisData"
        :color="chartData1.color"
        :title="`SQL调用统计/每天`"
      />
    </div>

    <div style="display: flex; margin-top: 20px">
      <Table :table-data="tableData2" :columns="columns" />
    </div>
  </div>
</template>

<script>
import LineChart from "@/views/echarts/LineChart.vue";
import BarChart from "@/views/echarts/BarChart.vue";
import Table from "@/views/components/Table.vue";

export default {
  name: "",
  components: { LineChart, BarChart, Table },
  data() {
    return {
      // 图表工具栏
      toolbox: {
        feature: {
          dataZoom: {
            show: true, // 显示数据区域缩放工具
            title: {
              zoom: "区域缩放",
              back: "区域缩放还原",
            },
          },
        },
      },
      // 主题颜色
      color: ["#409EFF", "#68BBC4", "#58A55C", "#F2BD42", "#F56C6C"],

      // 图表图例
      legend: {
        top: 10,
      },

      // 柱状图数据
      chartData1: {
        data: [
          {
            name: "SQL调用统计/每天",
            data: [
              750, 750, 700, 700, 720, 680, 700, 700, 700, 680, 720, 700, 700,
              700, 200,
            ],
          },
        ],
        color: ["#5087ED"],
        xAxisData: [
          "08月01日",
          "08月02日",
          "08月03日",
          "08月04日",
          "08月05日",
          "08月06日",
          "08月07日",
          "08月08日",
          "08月09日",
          "08月10日",
          "08月11日",
          "08月12日",
          "08月13日",
          "08月14日",
          "08月15日",
        ],
      },

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
    };
  },

  methods: {},
};
</script>
