<template>
  <div>
    <!-- <div style="display: flex; margin-top: 20px">
      <BarChart
        :width="'100%'"
        :height="'300px'"
        :chart-data="chartData1"
        :title="`不同来源事件数量走势`"
      />
    </div> -->

    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'100%'"
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
      title1: "CPU",
      // 柱状图数据
      chartData: [
        {
          name: "应用扩缩容",
          data: [1, 2, 2, 3, 2],
        },
        {
          name: "扩缩容达到上下线",
          data: [1, 1, 1, 1, 1],
        },
      ],

      title2: "物理内存",
      chartData2: {
        data: [
          {
            data: [250, 250, 250, 250],
            name: "内存使用量",
          },
          {
            data: [0, 0, 0, 0],
            name: "内存配额",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
        yAxisFormatter: "{value} M",
      },

      title3: "网络流量 (Byte)",
      chartData3: {
        data: [
          {
            data: [500, 600, 500, 500],
            name: "网络接收的字节数",
          },
          {
            data: [1000, 900, 1000, 1100],
            name: "网络发送的字节数",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },

      title4: "网络数据包 (个)",
      chartData4: {
        data: [
          {
            data: [4, 3, 3, 2],
            name: "网络发送的报文数",
          },
          {
            data: [0, 0, 0, 0],
            name: "网络发送丢弃的报文数",
          },
          {
            data: [0, 0, 0, 0],
            name: "网络接收丢弃的报文数",
          },
          {
            data: [0, 0, 0, 0],
            name: "网络发送的错误数",
          },
          {
            data: [0, 0, 0, 0],
            name: "网络接收的错误数",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },
    };
  },

  methods: {},
};
</script>
