<template>
  <!-- 圆角饼图组件 -->
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
// require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  name: "TransverseBar",
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
        return {
          fields: [
            {
              name: "正常",
              flied: "yxz",
            },
            {
              name: "异常",
              flied: "clz",
            },
          ],
          data: [
            {
              label: "",
              yxz: 99,
              clz: 1,
            },
          ],
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
      const yAxisData = [];
      this.chartData.data.map((i) => {
        yAxisData.push(i.label);
      });
      const seriesData = this.chartData.fields.map((n) => {
        return {
          name: n.name,
          type: "bar",
          stack: "total",
          barWidth: 20,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 3,
            ...n.itemStyle,
          },
          emphasis: {
            focus: "series",
          },
          data: this.chartData.data.map((i) => i[n.flied]),
        };
      });
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        // legend: {
        //   right: 0,
        //   top: 0,
        //   icon: 'circle',
        //   itemWidth: 8, // 设置宽度
        //   itemHeight: 8
        // },
        grid: {
          // left: '3%',
          // right: '3%',
          bottom: '10%',
          // top: "5%",
          containLabel: true
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: yAxisData,
        },
        series: seriesData,
        color: ["#94D2F4", "#BD3026"],
      });
    },
  },
};
</script>
