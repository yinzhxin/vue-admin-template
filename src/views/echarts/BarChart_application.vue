<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";

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
      const chartDeal = this.chartData.map((i) => {
        return { ...i, type: "bar" };
      });

      const option = {
        // 标题组件，包含主标题和副标题
        title: {
          show: true,
          text: this.title,
        },

        // 提示框组件
        tooltip: {
          // 触发类型，表示以坐标轴触发显示提示框
          trigger: "axis",
          // 坐标轴指示器类型，表示以阴影形式显示指示器
          axisPointer: {
            type: "shadow",
          },
          // 提示框的内容格式化函数
          formatter: function (params) {
            var series1Name = params[0].seriesName; // 第一个系列的名称
            var series2Name = params[1].seriesName; // 第二个系列的名称
            var series1Value = params[0].value; // 第一个系列的值
            var series2Value = params[1].value; // 第二个系列的值
            return (
              '<span style="display:inline-block;width:10px;height:10px;background-color:#5087ED;border-radius:50%;margin-right:5px;"></span>' + // 自定义样式的小圆点
              series1Name +
              " : " +
              series1Value +
              "<br />" +
              '<span style="display:inline-block;width:10px;height:10px;background-color:#66BBC3;border-radius:50%;margin-right:5px;"></span>' + // 自定义样式的小圆点
              series2Name +
              " : " +
              series2Value
            );
          },
          // 返回自定义格式化后的文本内容
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

        // x轴
        xAxis: {
          data: ["3月4日", "3月5日", "3月6日", "3月7日", "3月8日"],
        },
        // y轴
        yAxis: {},

        // 数据
        series: chartDeal,

        // 主题颜色
        color: ["#5087ED", "#66BBC3"],

        // 添加空隙，或者使用 barCategoryGap: '20%'
        barGap: "0",
      };

      this.chart.setOption(option);
    },
  },
};
</script>
