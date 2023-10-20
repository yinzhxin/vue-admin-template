<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "../mixins/resize";

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
      type: Object,
      default: () => {
        return {};
      },
    },
    title: {
      type: String,
      default: "",
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
      let series = this.chartData.yData.map((el) => {
        return {
          type: "line",
          ...el,
        };
      });
      this.chart = echarts.init(this.$el);
      const option = {
        title: {
          text: this.title ? this.title : "",
          textStyle: {
            fontWeight: "normal",
            fontSize: "12",
          },
          left: 40,
          top: 5,
        },
        legend: {
          top: 25,
          right: 100,
        },
        tooltip: {
          trigger: "axis", // 触发方式为坐标轴（'axis'）
          confine: true, // 设定限制在图标内（'confine:true'）
        },
        grid: {
          // left: 15,
          // right: 10,
          // bottom: "15%",
          // top: "5%",
          // containLabel: true, // 保持直角坐标系内绘图网格
        },
        xAxis: {
          type: "category",
          data: this.chartData.xData,
        },
        yAxis: {
          type: "value",
        },
        series: series,
      };

      this.chart.setOption(option);
    },
  },
};
</script>
