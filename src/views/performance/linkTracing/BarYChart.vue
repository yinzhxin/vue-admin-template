<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";

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
    // console.log("charts is destroyed!!!");
    this.chart.dispose();
    this.chart = null;
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);

      const option = {
        tooltip: {
          showContent: false,
          trigger: "axis", // 坐标轴触发
          axisPointer: {
            shadow: true,
            // 坐标轴指示器配置项
            type: "cross",
            crossStyle: {
              color: "#F56C6C",
              type: "solid",
            },

            axis: "y", // 指示器的坐标轴
            appendToBody: true,
            extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
            label: {
              // show:false
              // backgroundColor: "transparent",
              // color: "black",
              // textShadowOffsetX: -20,
              // textShadowOffsetY: -20,
              // shadowColor: "red",
            },
            link: [],
          },
        },

        grid: {
          left: "-14%",
          right: "5%",
          bottom: 30,
          top: 10,
          containLabel: true,
        },

        xAxis: {
          type: "value",
          // type: "category",
          // data: ["25", "36", "43", "56", "67"], // 指定每个刻度对应的值
          position: "top",
          splitNumber: 9,
          // boundaryGap: false,
          // axisPointer: {
          //   show: true,
          //   snap: false,
          //   type: "line",
          // },
          axisLabel: {
            formatter: (value, index) => {
              if (index === 0) {
                return ""; // 隐藏首尾的标签文字
              } else {
                return value + "ms"; // 显示其他标签文字
              }
            },
            fontSize: 16,
            showMaxLabel: false, // 隐藏最大值标签
          },
        },

        yAxis: {
          show: false,
          type: "category",
          axisTick: {
            show: true,
            lineStyle: {
              width: 10, // 设置刻度线的粗细
            },
          },
          axisPointer: {
            show: true,
            snap: false,
            type: "shadow",
          },
          shadowStyle: {
            color: "#C0C4CC",
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
            emphasis: { focus: "none" },
            showBackground: true,
            itemStyle: {
              color: "rgba(0,0,0,0)",
            },
          },
          {
            data: this.pendingTime,
            name: "pendingTime",
            type: "bar",
            stack: "total",
            opacity: 0.5,
            barWidth: 10, // 设置柱子的粗细
            emphasis: {
              focus: "series",
            },
            showBackground: true,
            backgroundStyle: {},
            label: {
              show: true,
              position: ["0%", "50%"],
              offset: [0, -20],
              fontSize: 16,
              color: "gray",
              formatter: (params) => {
                return params.data + "ms";
              },
            },
            labelLine: {
              show: true,
            },
            itemStyle: {
              borderRadius: 10, // 统一设置四个角的圆角大小
              color: (item) => {
                let res = this.labelList.filter(
                  (elem) => item.name == elem.label
                );
                return res[0].color; // 返回第一个匹配项的颜色
              },
            },
          },
          {
            data: this.stayingTime,
            name: "stayingTime",
            type: "bar",
            stack: "total",
            label: { show: false },
            emphasis: { focus: "none" },
            showBackground: true,
            itemStyle: {
              color: "rgba(0,0,0,0)",
            },
          },
        ],

        barGap: 20, // 减小数值以缩小柱状图之间的间距
      };

      this.chart.setOption(option);
    },
  },
};
</script>
