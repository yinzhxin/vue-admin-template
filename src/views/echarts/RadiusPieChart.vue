<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
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
      default: "",
    },

    // 主题颜色
    color: {
      type: Array,
      default: () => {
        return [];
      },
    },

    // 饼图图形上的文本标签，series的元素
    label: {
      type: Object,
      default: () => {
        return {
          show: false,
        };
      },
    },

    //  饼图的半径
    radius: {
      type: Array,
      default: () => {
        return [];
      },
    },

    // 饼图的中心（圆心）坐标
    center: {
      type: Array,
      default: () => {
        return [];
      },
    },

    isShowLegend: {
      type: Boolean,
      default: true,
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

      // 求和
      const total = this.chartData.reduce((pre, cur) => {
        return pre + cur.value;
      }, 0);

      // 添加属性
      const chartDeal = this.chartData.map((i) => {
        return { ...i, name: i.label };
      });

      const option = {
        // 标题组件，包含主标题和副标题
        title: {
          show: true, // 是否显示标题组件
          text: this.title, // 主标题文本
        },

        // 提示框组件
        tooltip: {
          // 触发类型：数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
          trigger: "item",
        },

        // 图例组件。
        legend: {
          show: this.isShowLegend,
          top: "center", // 图例组件离容器上侧的距离，在容器垂直居中
          left: "60%", // 图例组件离容器右侧的距离，相对容器右侧的距离
          orient: "vertical", // 图例列表的布局朝向
          icon: "roundRect", // 图例项的图标样式，是圆角矩形
          // itemWidth: 8, // 图例标记的图形宽度
          // itemHeight: 8, // 图例标记的图形高度
          textStyle: {
            fontSize: 15, // 图例文本的字体大小
          },
          // 自定义格式化函数，根据图例名称返回对应的数值
          formatter: function (name) {
            let res = chartDeal.filter((item) => {
              return item.name == name;
            });
            return `${name}  ${res[0].value}`;
          },
        },

        series: [
          {
            // 饼图
            type: "pie",

            // 饼图的半径，可以设置为百分比字符串或具体数值，半径为 45%，外半径为 70%
            // radius: ["45%", "70%"],
            radius: this.radius,

            // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标，示例中设置在容器的35%横坐标和55%纵坐标处
            // center: ["35%", "55%"],
            center: this.center,

            // 饼图图形上的文本标签配置
            label: this.label,

            // 高亮样式（鼠标悬停时）
            emphasis: {
              label: {
                show: true, // 是否显示标签，默认为false
              },
            },

            // 标签的视觉引导线样式配置，可以根据需求进行设置
            labelLine: {
              show: false, // 是否显示标签的视觉引导线
            },

            // 饼图的数据
            data: chartDeal,

            // 主题颜色
            color: this.color,

            // 图形样式
            // itemStyle: {
            //   color: "#fff", // 饼图的填充色
            //   borderRadius: 10, // 图形的圆角半径
            //   borderColor: "#fff", // 图形的边框颜色
            //   borderWidth: 2, // 图形的边框宽度，表示内圆角半径和外圆角半径都是2px
            // },
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
};
</script>
