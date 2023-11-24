<template>
  <el-card class="card-style">
    <template #header>
      <div class="card-header">
        <h1>应用逻辑层</h1>
      </div>
    </template>

    <div style="width: 1200px; height: 400px">
      <div id="application" />
    </div>
  </el-card>
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
      const data = {
        nodes: [
          {
            id: "1",
            img: "/panorama_images/earth.svg",
            label: "请求",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "2",
            img: "/panorama_images/earth.svg",
            label: "响应",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "3",
            img: "/panorama_images/tree.svg",
            label: "ELB",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "4",
            img: "/panorama_images/cube.svg",
            label: "APP",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "5",
            img: "/panorama_images/cube.svg",
            label: "APP",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "6",
            img: "/panorama_images/cubes.svg",
            label: "db",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "7",
            img: "/panorama_images/cubes.svg",
            label: "db",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "8",
            img: "/panorama_images/database.svg",
            label: "redis",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "9",
            img: "/panorama_images/database.svg",
            label: "redis",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "10",
            img: "/panorama_images/tree.svg",
            label: "ELB",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "11",
            img: "/panorama_images/tree.svg",
            label: "ELB",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "12",
            img: "/panorama_images/cube.svg",
            label: "APP",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
          {
            id: "13",
            img: "/panorama_images/cube.svg",
            label: "APP",
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
          },
        ],
        edges: [
          {
            source: "1",
            target: "3",
          },
          {
            source: "2",
            target: "3",
          },
          {
            source: "3",
            target: "4",
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
            source: "4",
            target: "10",
          },
          {
            source: "5",
            target: "11",
          },
          {
            source: "4",
            target: "8",
          },
          {
            source: "5",
            target: "9",
          },
          {
            source: "10",
            target: "12",
          },
          {
            source: "11",
            target: "13",
          },
        ],
      };

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
      const container = document.getElementById("application");
      const width = container.scrollWidth || 1100;
      const height = container.scrollHeight || 450;
      console.log(width, height);
      this.graph = new G6.Graph({
        container: "application",
        width,
        height,
        fitView: true,
        fitCenter: true,
        // fitViewPadding: 20,
        layout: {
          controlPoints: true,
          type: "dagre",
          rankdir: "LR", // 图的延展方向，节点对齐方式，可选： 'TB' | 'BT' | 'LR' | 'RL'
          nodeSize: 20,
          // ranker: "network-simplex", // 节点分层算法，可选：'tight-tree' 'longest-path' 'network-simplex'
          ranksep: 30, // 图的各个层次之间的间距
          nodesep: 10, // 同层各个节点之间的间距
        },
        defaultNode: {
          type: "image", // 类型
          size: 30, // 大小
          labelCfg: {
            position: "bottom",
            style: {
              fontSize: 12,
              fill: "black",
            },
          },
        },
        nodeStateStyles: {},
        defaultEdge: {
          type: "hvh",
        },
        modes: {
          // default: ["drag-canvas", "zoom-canvas"],
        },
      });

      data.nodes.forEach((node) => {
        node.stateStyles = {
          hover: {
            cursor: "pointer",
          },
        };
      });

      this.graph.on("node:mouseenter", (e) => {
        const nodeItem = e.item;
        this.graph.setItemState(nodeItem, "hover", true);
      });

      this.graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item;
        this.graph.setItemState(nodeItem, "hover", false);
      });

      // 图初始化数据
      this.updateData(data);
      // 渲染画布
      this.renderGraph();
      // this.graph.zoom(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-style {
  display: flex;
  ::v-deep .el-card__header {
    // padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    background-color: #bbb;
    writing-mode: tb;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
