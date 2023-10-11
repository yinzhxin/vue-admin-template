<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "@/views/echarts/mixins/resize";

export default {
  name: "BarChart",
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

    xAxisData: {
      type: Array,
      default: () => {
        return [];
      },
    },

    color: {
      type: Array,
      default: () => {
        return [];
      },
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
      this.chart = echarts.init(this.$el);

      const option = {
        title: {
          text: this.title,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              interval: (index, value) => {
                if (index == 2 || index == 7 || index == 12) return true;
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: this.title,
            type: "bar",
            barWidth: "60%",
            data: this.chartData,
            color: this.color,
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
};
</script>
