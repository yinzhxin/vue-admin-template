<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
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
              name: "运行中",
              flied: "yxz",
            },
            {
              name: "处理中",
              flied: "clz",
            },
            {
              name: "已停止",
              flied: "ytz",
            },
          ],
          data: [
            {
              label: "部署",
              yxz: 0,
              clz: 0,
              ytz: 0,
            },
            {
              label: "有状态副本集",
              yxz: 0,
              clz: 0,
              ytz: 0,
            },
            {
              label: "守护进程集",
              yxz: 0,
              clz: 0,
              ytz: 0,
            },
          ],
        };
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

      const yAxisData = [];

      this.chartData.data.map((item) => {
        yAxisData.push(item.label);
      });

      let yMax = 8;
      let dataShadow = [];
      for (let i = 0; i < 3; i++) {
        dataShadow.push(yMax);
      }

      const seriesData = this.chartData.fields.map((n) => {
        return {
          name: n.name,
          type: "bar",
          // stack: "total",
          barWidth: 15,
          itemStyle: {
            // borderColor: "#fff",
            // borderWidth: 2,
            borderRadius: 10,
            ...n.itemStyle,
          },
          emphasis: {
            focus: "series",
          },
          showBackground: true,
          data: this.chartData.data.map((item) => item[n.flied]),
        };
      });

      this.chart.setOption({
        title: {
          text: this.title,
        },
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "20%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          z: 10,
          axisTick: {
            show: true,
            boundaryGap: true,
          },
        },
        yAxis: {
          type: "category",
          data: yAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: true,
            boundaryGap: true,
          },
          axisLabel: {
            color: "black",
          },
        },
        series: seriesData,
        color: ["#3F95E6"],
      });
    },
  },
};
</script>
