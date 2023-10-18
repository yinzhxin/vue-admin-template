<template>
  <div>
    <div>
      <div id="container" style=""></div>
      172.22.1.143
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
        :legend="chartData4.legend"
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
        legend: {
          top: 20,
        },
      },
    };
  },

  mounted() {
    this.initGraph();
  },

  beforeDestroy() {
    // 销毁画布
    this.graph.destroy();
    // 实例销毁
    this.graph = null;
  },

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
      const toolbar = new G6.ToolBar({
        position: { x: 0, y: 30 },
      });

      const data = {
        id: "person",
        children: [
          {
            id: "server",
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

      // 获取容器图形
      const container = document.getElementById("container");
      const width = container.scrollWidth || 1190;
      const height = container.scrollHeight || 300;
      console.log(width, height);

      this.graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        plugins: [toolbar],
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
        },
        defaultNode: {
          type: "image",
          size: [60, 60],
        },
        defaultEdge: {
          style: {
            lineDash: [4, 4], // 虚线样式
            stroke: "blue", // 线条颜色
            lineWidth: 1, // 线条宽度
          },
        },

        layout: defaultLayout,
      });

      this.graph.node((node) => {
        if (node.id == "person") {
          node.img = "/topo_images/person.svg";
          node.size = 30;
        }
        if (node.id == "server") {
          node.img = "/topo_images/server.svg";
          node.size = 30;
        }
        return {};
      });

      this.graph.edge((edge) => {
        const label = "4000次/小时 HTTP"; // 标签文字

        const labelCfg = {
          position: "middle",
          style: {
            fill: "#F56C6C", // 文字颜色
            fontSize: 8, // 文字大小
            textAlign: "center",
            textBaseline: "middle",
          },
        };
        return { label, labelCfg };
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
