<template>
  <!-- 圆角饼图组件 -->
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "LineChart",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },

    chartData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    title: {
      type: String,
      default: "总数",
    },
  },

  data() {
    return {
      chart: null,
    };
  },

  watch: {
    chartData: {
      handler(newVal, oldVal) {
        this.initChart();
      },
      deep: true,
    },
  },

  mounted() {
    // 初始化
    this.$nextTick(() => {
      this.initChart();
    });
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);

      const option = {
        title: {
          // text: "资源实用率(%)",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // left: "75%",
          // top: "7%",
          bottom: "7%",
          data: ["CPU", "内存", "存储"],
        },
        grid: {
          containLabel: true,
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {},
          // },
        },
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: [
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
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "CPU",
            type: "line",
            // stack: "Total",
            data: [25, 25, 25, 25, 25, 25, 18, 18, 25, 25, 25, 25, 25],
            label: {
              show: true,
              color: "#BBF37F",
              fontSize: 12,
              formatter: "{c}", // 显示节点数据
            },
          },
          {
            name: "内存",
            type: "line",
            // stack: "Total",
            data: [12, 12, 12, 12, 12, 12, 10, 10, 12, 12, 12, 12, 12],
            label: {
              show: true,
              color: "#68BBC4",
              fontSize: 12,
              formatter: "{c}", // 显示节点数据
            },
          },
          {
            name: "存储",
            type: "line",
            // stack: "Total",
            data: [35, 35, 35, 35, 35, 35, 33, 33, 35, 35, 35, 35, 35],
            label: {
              show: true,
              color: "#84BC86",
              fontSize: 12,
              formatter: "{c}", // 显示节点数据
            },
          },
        ],

        color: ["#BBF37F", "#68BBC4", "#84BC86"],
      };

      this.chart.setOption(option);
    },
  },
};
</script>
