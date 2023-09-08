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
          // text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          orient: "vertical",
          left: "75%",
          top: "7%",
          data: ["运行中", "异常", "共"],
        },
        grid: {
          left: 0,
          right: "26%",
          // bottom: "20%",
          top: "10%",
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
            name: "运行中",
            type: "line",
            // stack: "Total",
            data: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
            label: {
              show: true,
              color: "#BBF37F",
              fontSize: 12,
              formatter: "{c}", // 显示节点数据
            },
          },
          {
            name: "异常",
            type: "line",
            // stack: "Total",
            data: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
            label: {
              show: true,
              color: "#D0685D",
              fontSize: 12,
              formatter: "{c}", // 显示节点数据
            },
          },
          {
            name: "共",
            type: "line",
            // stack: "Total",
            data: [31, 31, 31, 31, 31, 31, 32, 32, 31, 31, 31, 31, 31],
            label: {
              show: true,
              color: "#3F95E6",
              fontSize: 12,
              formatter: "{c}", // 显示节点数据
            },
          },
        ],

        color: ["#BBF37F", "#D0685D", "#3F95E6"],
      };

      this.chart.setOption(option);
    },
  },
};
</script>
