<template>
  <!-- <div style="width: 100%; height: 200%; background: #fff;border:1px solid gray"> -->
  <el-card class="card-style">
    <div slot="header" style="writing-mode: tb">
      <h1>业务逻辑图</h1>
    </div>
    <div id="container" />
  </el-card>
  <!-- </div> -->
</template>

<script>
import G6 from "@antv/g6";

export default {
  data() {
    return {
      graph: null,
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
        nodes: [
          {
            id: "1",
            img: "/panorama/person.svg",
            label: "User",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "2",
            img: "/panorama/four.svg",
            label: "主动请求",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "3",
            img: "/panorama/four.svg",
            label: "自动请求",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "4",
            img: "/panorama/four.svg",
            label: "查询请求",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "5",
            img: "/panorama/four.svg",
            label: "创建",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "6",
            img: "/panorama/four.svg",
            label: "查询执行",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "7",
            img: "/panorama/four.svg",
            label: "付款确认",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "8",
            img: "/panorama/four.svg",
            label: "付款取消",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "9",
            img: "/panorama/right.svg",
            label: "User",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "10",
            img: "/panorama/del.svg",
            label: "User",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "11",
            img: "/panorama/right.svg",
            label: "User",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
        ],
        edges: [
          {
            source: "1",
            target: "2",
          },
          {
            source: "1",
            target: "3",
          },
          {
            source: "1",
            target: "4",
          },
          {
            source: "2",
            target: "5",
          },
          {
            source: "3",
            target: "5",
          },
          {
            source: "4",
            target: "6",
          },
          {
            source: "5",
            target: "7",
          },
          {
            source: "5",
            target: "8",
          },
          {
            source: "7",
            target: "9",
          },
          {
            source: "8",
            target: "10",
          },
          {
            source: "6",
            target: "11",
          },
        ],
      };

      // G6.registerEdge(
      //   "line-arrow",
      //   {
      //     // getPath(points) {
      //     //   console.log(points);
      //     //   const startPoint = points[0];
      //     //   const endPoint = points[1];
      //     //   return [
      //     //     ["M", startPoint.x, startPoint.y],
      //     //     ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
      //     //     ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
      //     //     ["L", endPoint.x, endPoint.y],
      //     //   ];
      //     // },

      //     getPath(points) {
      //       const startPoint = points[0];
      //       const endPoint = points[1];
      //       const leftPointX = startPoint.x + 150;
      //       return [
      //         ["M", startPoint.x, startPoint.y],
      //         ["L", leftPointX, startPoint.y],
      //         ["L", leftPointX, endPoint.y],
      //         ["L", endPoint.x, endPoint.y],
      //       ];
      //     },

      //     getShapeStyle(cfg) {
      //       const startPoint = cfg.startPoint;
      //       const endPoint = cfg.endPoint;
      //       const controlPoints = this.getControlPoints(cfg);
      //       let points = [startPoint]; // the start point
      //       // the control points
      //       if (controlPoints) {
      //         points = points.concat(controlPoints);
      //       }
      //       // the end point
      //       points.push(endPoint);
      //       const path = this.getPath(points);
      //       const style = Object.assign(
      //         {},
      //         G6.Global.defaultEdge.style,
      //         {
      //           stroke: "#BBB",
      //           lineWidth: 1,
      //           path,
      //         },
      //         cfg.style
      //       );
      //       return style;
      //     },
      //   },
      //   "line"
      // );

      // G6.registerEdge(
      //   "line-arrow",
      //   {
      //     getPath(points) {
      //       const startPoint = points[0];
      //       const endPoint = points[1];
      //       const leftPointX = startPoint.x;
      //       return [
      //         ["M", startPoint.x, startPoint.y],
      //         ["L", leftPointX, startPoint.y],
      //         ["L", leftPointX, endPoint.y],
      //         ["L", endPoint.x, endPoint.y],
      //       ];
      //     },

      //     getShapeStyle(cfg) {
      //       const startPoint = cfg.startPoint;
      //       const endPoint = cfg.endPoint;
      //       const controlPoints = this.getControlPoints(cfg);
      //       let points = [startPoint];
      //       if (controlPoints) {
      //         points = points.concat(controlPoints);
      //       }
      //       points.push(endPoint);
      //       const path = this.getPath(points);
      //       const style = Object.assign(
      //         {},
      //         G6.Global.defaultEdge.style,
      //         {
      //           stroke: "#B0B6B8",
      //           lineWidth: 4,
      //           path,
      //         },
      //         cfg.style
      //       );
      //       return style;
      //     },
      //   },

      //   "line"
      // );

      G6.registerEdge("hvh", {
        draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          const shape = group.addShape("path", {
            attrs: {
              stroke: "#333",
              path: [
                ["M", startPoint.x, startPoint.y],
                ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
                ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
                ["L", endPoint.x, endPoint.y],
              ],
            },
          });
          return shape;
        },
      });

      // 获取容器图形
      const container = document.getElementById("container");
      const width = container.scrollWidth || 1190;
      const height = container.scrollHeight || 600;
      console.log(width, height);
      this.graph = new G6.Graph({
        container: "container",
        width,
        height,
        layout: {
          // type: "dagre",
          // rankdir: "LR", // 可选，默认为图的中心
          // ranksep: 70,
          // controlPoints: true,
          // ranker: 'tight-tree',
          type: "dagre",
          // ranker: "network-simplex", // 节点分层算法，可选：'tight-tree' 'longest-path' 'network-simplex'
          rankdir: "LR", // 图的延展方向，可选： 'TB' | 'BT' | 'LR' | 'RL'
          // ranksep: 50, // 图的各个层次之间的间距
          // nodesep: 30, // 同层各个节点之间的间距
          // align: "UL", // 节点对齐方式，可选：'UL' | 'UR' | 'DL' | 'DR' | undefined
          nodeSize: 30,
        },
        defaultNode: {
          // 类型
          type: "image",
          // 大小
          size: 50,
          // 文字样式
          labelCfg: {
            position: "bottom",
            style: {
              fontSize: 20,
              fill: "black",
            },
          },
        },
        defaultEdge: {
          type: "hvh",
          // type: "line-arrow",
          // style: {},
        },
        modes: {
          // default: ["drag-canvas", "zoom-canvas"],
        },
        fitView: true,
      });

      // this.graph.node((node) => {

      //   return {};
      // });

      // 图初始化数据
      this.updateData(data);
      // 渲染画布
      this.renderGraph();
      this.graph.zoom(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  display: flex;
  ::v-deep .el-card__header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    background-color: #ebeef5;
  }
}
</style>
