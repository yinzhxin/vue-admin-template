<template>
  <div>
    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title1"
        :chartData="chartData1.data"
        :xAxisData="chartData1.xAxisData"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title2"
        :chartData="chartData2.data"
        :xAxisData="chartData2.xAxisData"
        :yAxisFormatter="chartData2.yAxisFormatter"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
    </div>

    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title3"
        :chartData="chartData3.data"
        :xAxisData="chartData3.xAxisData"
        :yAxisFormatter="chartData3.yAxisFormatter"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title4"
        :chartData="chartData4.data"
        :xAxisData="chartData4.xAxisData"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
    </div>

    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title5"
        :chartData="chartData5.data"
        :xAxisData="chartData5.xAxisData"
        :yAxisFormatter="chartData5.yAxisFormatter"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title6"
        :chartData="chartData6.data"
        :xAxisData="chartData6.xAxisData"
        :yAxisFormatter="chartData6.yAxisFormatter"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
    </div>

    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'100%'"
        :height="'280px'"
        :title="title7"
        :chartData="chartData7.data"
        :xAxisData="chartData7.xAxisData"
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
      color: ["#409EFF", "#68BBC4", "#58A55C", "#F2BD42"],

      // 图表图例
      legend: {
        top: 10,
      },

      // 图表数据
      title1: "GC瞬时次数",
      chartData1: {
        data: [
          {
            data: [0, 0, 0, 0],
            name: "FullGC次数",
          },
          {
            data: [0, 2, 0, 2],
            name: "YoungGC次数",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },

      title2: "GC瞬时耗时",
      chartData2: {
        data: [
          {
            data: [0, 0, 0, 0],
            name: "FullGC耗时",
          },
          {
            data: [0, 1.5, 0, 1.5],
            name: "YoungGC耗时",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
        yAxisFormatter: "{value} ms",
      },

      title3: "堆内存详情/每分钟",
      chartData3: {
        data: [
          {
            data: [100, 150, 100, 200],
            name: "使用总和",
          },
          {
            data: [50, 50, 50, 50],
            name: "老年代",
          },
          {
            data: [0, 0, 0, 0],
            name: "年轻代Survivor区",
          },
          {
            data: [50, 100, 50, 150],
            name: "年轻代Eden区",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
        yAxisFormatter: "{value} M",
      },

      title4: "元空间详情/每分钟",
      chartData4: {
        data: [
          {
            data: [75, 75, 75, 75],
            name: "无空间",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },

      title5: "非堆内存/每分钟",
      chartData5: {
        data: [
          {
            data: [0, 0, 0, 0],
            name: "最初字节数",
          },
          {
            data: [110, 110, 110, 110],
            name: "提交字节数",
          },
          {
            data: [0, 0, 0, 0],
            name: "最大字节数",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
        yAxisFormatter: "{value} M",
      },

      title6: "直接缓冲区/每分钟",
      chartData6: {
        data: [
          {
            data: [450, 450, 450, 450],
            name: "DirectBuffer总大小",
          },
          {
            data: [450, 450, 450, 450],
            name: "DirectBuffer使用大小",
          },
        ],
        yAxisFormatter: "{value} K",
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },

      title7: "JVM线程数/每分钟",
      chartData7: {
        data: [
          {
            data: [130, 130, 130, 130],
            name: "初始字节数",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },
    };
  },

  methods: {},
};
</script>
