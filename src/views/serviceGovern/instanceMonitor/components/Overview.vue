<template>
  <div>
    <div>
      <!-- <div id="container" style="background: pink"></div> -->
    </div>

    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title1"
        :chartData="chartData1.data"
        :xAxisData="chartData1.xAxisData"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title2"
        :chartData="chartData2.data"
        :xAxisData="chartData2.xAxisData"
        :yAxisFormatter="chartData2.yAxisFormatter"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
    </div>

    <div style="display: flex; margin-top: 20px">
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title3"
        :chartData="chartData3.data"
        :xAxisData="chartData3.xAxisData"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
      <LineChart
        :width="'50%'"
        :height="'280px'"
        :title="title4"
        :chartData="chartData4.data"
        :xAxisData="chartData4.xAxisData"
        :color="color"
        :legend="legend"
        :isAreaStyle="false"
      />
    </div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import LineChart from "@/views/echarts/LineChart.vue";

export default {
  name: "",
  components: { LineChart },
  data() {
    return {
      graph: null,

      // 图表的工具栏
      toolbox: {
        feature: {
          dataZoom: {
            show: true, // 显示数据区域缩放工具
            title: {
              zoom: "区域缩放",
              back: "区域缩放还原",
            },
          },
        },
      },

      // 主题颜色
      color: ["#409EFF", "#68BBC4", "#58A55C", "#F2BD42"],

      // 图表图例
      legend: {
        top: 10,
      },

      title1: "请求数/每分钟",
      chartData1: {
        data: [
          {
            data: [0, 1, 0, 0],
            name: "HTTP入口",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
      },

      title2: "响应时间/每分钟",
      chartData2: {
        data: [
          {
            data: [0, 1, 0, 0],
            name: "HTTP入口",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
        yAxisFormatter: "{value} ms",
        color: ["#409EFF"],
      },

      title3: "错误数/每分钟",
      chartData3: {
        data: [
          {
            data: [0, 1, 0, 0],
            name: "HTTP入口",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
        color: ["#409EFF"],
      },

      title4: "HTTP-状态码统计",
      chartData4: {
        data: [
          {
            data: [0, 1, 0, 0],
            name: "200",
          },
          {
            data: [0, 0, 0, 0],
            name: "2xx",
          },
          {
            data: [0, 0, 0, 0],
            name: "3xx",
          },
          {
            data: [0, 0, 0, 0],
            name: "4xx",
          },
        ],
        xAxisData: ["09:54", "09:55", "09:56", "09:57"],
        color: ["#409EFF", "#68BBC4", "#58A55C", "#F2BD42"],
        legend: {
          top: 10,
        },
      },
    };
  },

  // mounted() {
  //   this.initGraph();
  // },

  // beforeDestroy() {
  //   // 销毁画布
  //   this.graph.destroy();
  //   // 实例销毁
  //   this.graph = null;
  // },

  methods: {
    // 更新图表数据，初次渲染也调用data方法
    updateData(newData) {
      this.graph.data(newData);
    },

    // 渲染图表
    renderGraph() {
      this.graph.render();
    },

    // 初始化图表
    initGraph() {
      const data = {
        id: "person",
        icon: {
          img: "/topo_images/person.svg",
        },
        // label: "root",
        children: [
          {
            id: "service",
            // label: "c1",
          },
        ],
      };

      G6.Util.traverseTree(data, (d) => {
        d.leftIcon = {
          style: {
            fill: "#e6fffb",
            stroke: "#e6fffb",
          },
          img: "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ",
        };
        return true;
      });

      G6.registerEdge("flow-line", {
        draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;

          const { style } = cfg;
          const shape = group.addShape("path", {
            attrs: {
              stroke: style.stroke,
              endArrow: style.endArrow,
              path: [
                ["M", startPoint.x, startPoint.y],
                ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
                ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
                ["L", endPoint.x, endPoint.y],
              ],
            },
          });

          return shape;
        },
      });

      const defaultStateStyles = {
        hover: {
          stroke: "#1890ff",
          lineWidth: 2,
        },
      };

      const defaultNodeStyle = {
        fill: "#91d5ff",
        stroke: "#40a9ff",
        radius: 5,
      };

      const defaultEdgeStyle = {
        stroke: "#91d5ff",
        endArrow: {
          path: "M 0,0 L 12, 6 L 9,0 L 12, -6 Z",
          fill: "#91d5ff",
          d: -20,
        },
      };

      const defaultLayout = {
        type: "compactBox",
        direction: "TB",
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 40;
        },
        getHGap: function getHGap() {
          return 70;
        },
      };

      const defaultLabelCfg = {
        style: {
          fill: "#000",
          fontSize: 12,
        },
      };
      // 获取容器图形
      const container = document.getElementById("container");
      const width = container.scrollWidth || 1190;
      const height = container.scrollHeight || 300;
      console.log(width, height);

      this.graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        linkCenter: true,
        // plugins: [minimap],
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
        },
        defaultNode: {
          // 类型
          type: "donut",
          // 大小
          size: 30,
          // 文字样式
          labelCfg: {
            position: "bottom",
            style: {
              fontSize: 25,
              fill: "black",
            },
          },
        },
        defaultEdge: {
          type: "flow-line",
          style: defaultEdgeStyle,
        },
        nodeStateStyles: defaultStateStyles,
        edgeStateStyles: defaultStateStyles,
        layout: defaultLayout,
      });

      // 图初始化数据
      this.updateData(data);

      // 渲染画布
      this.renderGraph();
      // this.graph.zoom(1);
      this.graph.fitView();
    },
  },
};
</script>
