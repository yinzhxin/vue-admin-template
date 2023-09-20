<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";
import { options } from "runjs";

export default {
  name: "BarYChart",
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
    pendingTime: {
      type: Array,
      default: () => {
        return [];
      },
    },
    duringTime: {
      type: Array,
      default: () => {
        return [];
      },
    },
    stayingTime: {
      type: Array,
      default: () => {
        return [];
      },
    },
    labelList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    label: {
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: (params) => {
            let seriesName = params[0].seriesName;
            let dataName = params[0].name;
            let value = params[0].value;
            if (seriesName === "pendingTime") {
              return dataName + ": " + value;
            } else {
              return;
            }
          },
        },

        grid: {
          left: "-14%",
          right: "5%",
          bottom: 30,
          top: 5,
          containLabel: true,
          backgroundColor: "gray", // 设置柱子占据的背景色
        },

        xAxis: {
          type: "value",
          position: "top",
          splitNumber: 9,
        },

        yAxis: {
          show: false,
          type: "category",
          axisTick: {
            show: true,
            lineStyle: {
              width: 2, // 设置刻度线的粗细
            },
          },

          data: this.label,

          inverse: true, // 反转 Y 轴坐标轴的顺序
        },

        series: [
          {
            data: this.duringTime,
            name: "duringTime",
            type: "bar",
            stack: "total",
            label: { show: false },
            emphasis: { focus: "series" },
            showBackground: true,
            itemStyle: {
              normal: { color: "rgba(0,0,0,0)" },
            },
          },
          {
            data: this.stayingTime,
            name: "stayingTime",
            type: "bar",
            stack: "total",
            label: { show: false },
            emphasis: { focus: "series" },
            showBackground: true,
            itemStyle: {
              normal: { color: "rgba(0,0,0,0)" },
            },
          },
          {
            data: this.pendingTime,
            name: "pendingTime",
            type: "bar",
            stack: "total",
            barWidth: 10, // 设置柱子的粗细
            label: {
              show: true,
              position: "top",
            },
            emphasis: {
              focus: "series",
            },
            showBackground: true,
            itemStyle: {
              borderRadius: 5, // 统一设置四个角的圆角大小
              normal: {
                color: (item) => {
                  console.log(item);
                  let res = this.labelList.filter((elem) => {
                    console.log(elem.label);
                    item.name == elem.label;
                    return
                  });
                  // console.log(res)
                  return res.color;
                },
              },
            },
          },
        ],
        barGap: 1, // 减小数值以缩小柱状图之间的间距
      };

      this.chart.setOption(option);
    },
  },
};
</script>
