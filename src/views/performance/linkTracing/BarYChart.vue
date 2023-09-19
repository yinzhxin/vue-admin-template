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

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
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

          data: [
            "GET:/demo/{name}",
            "balance/api/auth",
            "/api/auth",
            "POST/api/auth",
            "balance/api/auth",
            "/api/auth",
            "POST/api/auth",
            "Kafka/api/auth",
            "balance/api/auth",
            "/api/auth",
            "POST/api/auth",
            "balance/api/auth",
            "/api/auth",
            "POST/api/auth",
            "com/api/auth",
            "letter/api/auth",
            "connect/api/auth",
          ],

          // reverse: true, // 反转 Y 轴坐标轴的顺序
          inverse: true,
        },
        series: [
          {
            name: "duringTime",
            type: "bar",
            barWidth: 10, // 设置柱子的粗细
            borderRadius: 10,
            stack: "total",
            label: {
              // show: true,
              show: false,
            },
            emphasis: {
              focus: "series",
            },
            data: [
              3, 4, 3, 5, 25, 15, 30, 20, 25, 29, 39, 33, 15, 2, 35, 2, 17,
            ],
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",
              },
            },
            showBackground: true,
          },
          {
            name: "pendingTime",
            type: "bar",
            stack: "total",
            label: {
              show: true,
              position: "top",
            },
            emphasis: {
              focus: "series",
            },
            data: [
              78, 34, 3, 35, 5, 45, 10, 40, 30, 36, 11, 37, 15, 48, 25, 43, 33,
            ],
            itemStyle: {
              normal: {
                color: (item) => {
                  // console.log(item)
                  const value = item.data; // 获取数据值
                  const colorList = [
                    "#9A60B4",
                    "#BE76DE",
                    "#CF81F2",
                    "#EA7CCC",
                    "#EE8AF8",
                    "#3F48CC",
                    "#0094D4",
                    "#00A2E8",
                    "#00ABF5",
                    "#99D9EA",
                    "#22B14C",
                    "#B5E61D",
                  ]; // 定义颜色列表
                  if (value == 78) {
                    return colorList[0];
                  } else if (value == 34) {
                    return colorList[1];
                  } else if (value == 3) {
                    return colorList[2];
                  } else if (value == 35) {
                    return colorList[3];
                  } else if (value == 5) {
                    return colorList[4];
                  } else if (value == 45) {
                    return colorList[5];
                  } else if (value == 10) {
                    return colorList[7];
                  } else if (value == 40) {
                    return colorList[8];
                  } else if (value == 30) {
                    return colorList[3];
                  } else if (value == 36) {
                    return colorList[4];
                  } else if (value == 11) {
                    return colorList[5];
                  } else if (value == 37) {
                    return colorList[6];
                  } else if (value == 15) {
                    return colorList[7];
                  } else if (value == 15) {
                    return colorList[7];
                  } else if (value == 48) {
                    return colorList[8];
                  } else if (value == 25) {
                    return colorList[9];
                  } else if (value == 25) {
                    return colorList[9];
                  } else if (value == 43) {
                    return colorList[10];
                  } else {
                    return colorList[10];
                  }
                },
              },
              borderRadius: 5, // 统一设置四个角的圆角大小
            },
            showBackground: true,
            backgroundStyle: {
              opacity: 0.3,
            },
          },
          {
            name: "stayingTime",
            type: "bar",
            stack: "total",
            label: {
              // show: true,
              show: false,
            },
            emphasis: {
              focus: "series",
            },
            data: [
              19, 62, 94, 60, 70, 40, 60, 40, 45, 35, 50, 30, 70, 50, 40, 55,
              50,
            ],
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",
              },
            },
            showBackground: true,
          },
        ],
        barGap: 1, // 减小数值以缩小柱状图之间的间距
      };

      this.chart.setOption(option);
    },
  },
};
</script>
