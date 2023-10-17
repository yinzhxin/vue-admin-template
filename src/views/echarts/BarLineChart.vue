<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "BarLineChart",
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

    // 主题颜色
    color: {
      type: Array,
      default: () => {
        return [];
      },
    },

    // y轴的刻度标签，默认只显示数值
    yAxisFormatter: {
      type: String,
      default: "{value}",
    },

    // 柱宽
    barWidth: {
      type: String,
      default: "",
    },

    // 让刻度线与标签对齐
    alignWithLabel: {
      type: Boolean,
      default: false,
    },

    interval: {
      type: Object,
      default: () => {
        return {};
      },
    },

    grid: {
      type: Object,
      default: () => {
        return {
          show: false,
        };
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

      // 添加属性
      // const chartDeal = this.chartData.map((i) => {
      //   return {
      //     ...i,
      //     // 图表类型
      //     type: "bar",
      //     // 柱宽
      //     barWidth: this.barWidth,
      //   };
      // });

      const option = {
        title: {
          text: this.title,
        },

        grid: this.grid,

        // 提示框组件
        tooltip: {
          trigger: "axis", // 触发类型，表示以坐标轴触发显示提示框
          axisPointer: {
            type: "line", // 坐标轴指示器类型，表示以阴影形式显示指示器
          },
        },

        // x轴
        xAxis: [
          {
            type: "category", // x轴类型为类目轴
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: this.alignWithLabel, // 让刻度线与标签对齐
            },
            axisLabel: {
              interval: 0,
              rotate: 30,
            },
          },
        ],

        // y轴
        yAxis: [
          {
            type: "value",
            name: this.chartData[0].name,
            splitLine: {
              show: false, //显示分割线
            },
          },
          {
            type: "value",
            name: this.chartData[1].name,
            splitLine: {
              show: true,
            },
          },
        ],

        // 数据
        series: this.chartData,

        // 主题颜色
        color: this.color,

        // 添加空隙，或者使用 barCategoryGap: '20%'
        barGap: "0",
      };

      this.chart.setOption(option);
    },
  },
};
</script>
