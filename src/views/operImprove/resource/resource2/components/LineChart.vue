<template>
  <!-- 圆角饼图组件 -->
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "RadiusPieChart",
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
          text: this.title,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: ["9:00", "9:10", "9:20", "9:30", "9:40", "9:50", "10:00"],
        },
        yAxis: {
          type: "value",
        },
        series: this.chartData,

        // color: ["#DEE8FC", "#E3F2F4"],
        // 添加空隙的配置项
        // barGap: "0", // 或者使用 barCategoryGap: '20%',
      };

      this.chart.setOption(option);
    },
  },
};
</script>
