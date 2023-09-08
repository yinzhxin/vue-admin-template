<template>
  <!-- 圆角饼图组件 -->
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
// require("echarts/theme/macarons"); // echarts theme
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
          text: "不同来源事件数量走势",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            // console.log(params)
            var series1Name = params[0].seriesName;
            var series2Name = params[1].seriesName;
            var series1Value = params[0].value;
            var series2Value = params[1].value;
            return (
              '<span style="display:inline-block;width:10px;height:10px;background-color:#5087ED;border-radius:50%;margin-right:5px;"></span>' +
              series1Name +
              ": " +
              series1Value +
              "<br />" +
              '<span style="display:inline-block;width:10px;height:10px;background-color:#66BBC3;border-radius:50%;margin-right:5px;"></span>' +
              series2Name +
              ": " +
              series2Value
            );
          },
          // textStyle: {
          //   rich: {
          //     series1: {
          //       color: "blue",
          //     },
          //     series2: {
          //       color: "red",
          //     },
          //   },
          // },
        },
        xAxis: {
          // x轴
          data: ["3月4日", "3月5日", "3月6日", "3月7日", "3月8日"],
        },
        yAxis: {
          // y轴
        },
        series: this.chartData,

        color: ["#5087ED", "#66BBC3"],
        // 添加空隙的配置项
        barGap: "0", // 或者使用 barCategoryGap: '20%',
      };

      this.chart.setOption(option);
    },
  },
};
</script>
