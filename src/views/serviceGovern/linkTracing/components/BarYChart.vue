<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "@/views/echarts/mixins/resize";

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
          axis: "y", // 指示器的坐标轴
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#F56C6C",
              // color: "gray",
              type: "solid",
            },
          },
        },

        grid: {
          left: "-30%",
          right: "5%",
          top: 0, //拉伸距离顶部高度
          bottom: 10, //拉伸距离底部高度
          containLabel: true,
        },

        xAxis: {
          type: "value",
          position: "top",
          axisLabel: {
            formatter: (value, index) => {
              return value + "ms";
            },
            fontSize: 14,
            showMaxLabel: false, // 隐藏最大值标签
            showMinLabel: false,
          },
          // splitNumber: 9,
          // boundaryGap: false,
          // axisPointer: {
          //   show: true,
          //   snap: false,
          //   type: "line",
          // },
        },

        yAxis: {
          show: false,
          data: this.label,
          inverse: true, // 反转 Y 轴坐标轴的顺序
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
              offset: [0, -18],
              fontSize: 14,
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
                // console.log(item)
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
      };

      this.chart.setOption(option);
    },
  },
};
</script>
