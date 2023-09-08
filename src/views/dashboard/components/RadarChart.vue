<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "RadarChart",
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
        // 图表标题
        title: {},
        // 图例组件，展示不同系列（即数据集）的名称
        legend: {
          bottom: "5%",
        },
        // 提示框组件，悬停时显示数据详细信息
        tooltip: {
          trigger: "axis", // 触发方式为坐标轴（'axis'）
          confine: true, // 设定限制在图标内（'confine:true'）
        },
        // 直角坐标系内绘图网格
        grid: {
          left: "3%",
          // right: '3%',
          bottom: "10%",
          // top: "5%",
          containLabel: true, // 保持直角坐标系内绘图网格
        },
        // 雷达图坐标系组件，指定了雷达图上各个轴线的名称（indicator）和最大值（max）
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "接管速度", max: 6500 },
            { name: "处置速度", max: 30000 },
            { name: "工作量", max: 38000 },
            { name: "平均效率", max: 52000 },
            { name: "评分", max: 25000 },
          ],
        },
        // 系列列表
        series: [
          {
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 9000],
                name: "一线运维",
              },
              {
                value: [5000, 14000, 28000, 26000, 20000],
                name: "二线运维",
              },
              {
                value: [6000, 16000, 14000, 26000, 19000],
                name: "应用运维",
              },
            ],
          },
        ],
        // 图标颜色设置
        // color: ["#DEE8FC", "#E3F2F4"],
      };

      this.chart.setOption(option);
    },
  },
};
</script>
