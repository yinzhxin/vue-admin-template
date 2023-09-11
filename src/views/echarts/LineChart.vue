<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "LineChart",
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

    // 折线图的标题
    title: {
      type: String,
      default: "",
    },

    // 是否显示图例
    grid: {
      type: Array,
      default: () => {
        return [];
      },
    },

    // 折线图的主题颜色
    color: {
      type: Array,
      default: () => {
        return [];
      },
    },

    // 横坐标的数据
    xAxisData: {
      type: Array,
      default: () => {
        return [];
      },
    },

    // 是否显示折线图的面积阴影，默认显示
    isAreaStyle: {
      type: Boolean,
      default: true,
    },

    // 是否显示折线图结点的数据，默认显示
    isShowStyle: {
      type: Boolean,
      default: true,
    },

    // 折线图图例
    legend: {
      type: Object,
      default: () => {
        return {
          show: false,
        };
      },
    },

    // 折线图在容器内的方位调整
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

      const opacity = this.isAreaStyle ? 0.1 : 0;
      const show = this.isShowStyle ? true : false;

      // 添加属性
      const chartDeal = this.chartData.map((i) => {
        return {
          ...i,
          type: "line",
          areaStyle: { normal: { opacity: opacity } },
          label: {
            show,
            fontSize: 12,
            formatter: "{c}", // 显示节点数据
          },
        };
      });

      const option = {
        title: {
          text: this.title,
        },

        tooltip: {
          trigger: "axis",
        },

        legend: this.legend,
        grid: this.grid,

        xAxis: {
          type: "category", // x 轴类型为类目轴
          boundaryGap: true, // 坐标轴两边留白
          data: this.xAxisData,
        },

        yAxis: {
          type: "value", // x 轴类型为类目轴
        },

        series: chartDeal,

        // 主题颜色
        color: this.color,

        // 添加空隙的配置项，或者使用 barCategoryGap: '20%'
        // barGap: "0",
      };

      // if (this.color.length != 0) {
      //   option = { ...option, color: this.color };
      // }

      this.chart.setOption(option);
    },
  },
};
</script>
