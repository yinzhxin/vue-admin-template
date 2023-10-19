<template>
  <div>
    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'100%'"
        :height="'280px'"
        :title="title1"
        :chartData="chartData1.data"
        :xAxisData="chartData1.xAxisData"
        :yAxisFormatter="chartData1.yAxisFormatter"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
    </div>

    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'100%'"
        :height="'280px'"
        :title="title2"
        :chartData="chartData2.data"
        :xAxisData="chartData2.xAxisData"
        :yAxisFormatter="chartData2.yAxisFormatter"
        :color="color"
        :legend="chartData2.legend"
        :isAreaStyle="false"
      />
    </div>

    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'100%'"
        :height="'280px'"
        :title="title3"
        :chartData="chartData3.data"
        :xAxisData="chartData3.xAxisData"
        :yAxisFormatter="chartData3.yAxisFormatter"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
    </div>
  </div>
</template>

<script>
import LineChart from "@/views/echarts/LineChart.vue";

export default {
  name: "",
  components: { LineChart },
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

      // 图表数据
      title1: "CPU/每分钟",
      chartData1: {
        data: [
          {
            data: [9, 9, 9, 9],
            name: "总和",
          },
          {
            data: [6, 5, 6, 6],
            name: "用户CPU使用率",
          },
          {
            data: [3, 4, 3, 3],
            name: "系统CPU使用率",
          },
          {
            data: [0, 0, 0, 0],
            name: "等待IO完成的CPU使用率",
          },
        ],
        yAxisFormatter: "{value} %",
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },

      title2: "物理内存/每分钟",
      chartData2: {
        data: [
          {
            data: [3.5, 3.5, 3.5, 3.5],
            name: "总和",
          },
          {
            data: [2, 2, 2, 2],
            name: "系统的PageCache中的内存数",
          },
          {
            data: [1.5, 1.5, 1.5, 1.5],
            name: "系统已经使用的内存",
          },
          {
            data: [0, 0, 0, 0],
            name: "系统BufferCache中的内存数",
          },
          {
            data: [0, 0, 0, 0],
            name: "系统中的空闲内存",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
        yAxisFormatter: "{value} G",
        legend: {
          top: 20,
        },
      },

      title3: "Disk/每分钟",
      chartData3: {
        data: [
          {
            data: [40, 40, 40, 40],
            name: "总和",
          },
          {
            data: [30, 30, 30, 30],
            name: "磁盘空闲数",
          },
          {
            data: [10, 10, 10, 10],
            name: "磁盘使用数",
          },
        ],
        yAxisFormatter: "{value} G",
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },
    };
  },

  methods: {},
};
</script>
