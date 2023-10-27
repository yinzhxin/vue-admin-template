<template>
  <el-card class="card-style">
    <template #header>
      <div class="card-header">
        <h1>业务逻辑层</h1>
      </div>
    </template>

    <div style="width: 100%; height: 450px">
      <div id="business" ref="card" />
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

  watch: {
    // "$refs.card.$el": {
    //   // immediate: true,
    //   deep: true,
    //   handler(newVal, oldVal) {
    //     const cardWidth = newVal.offsetWidth;
    //     const cardHeight = newVal.offsetHeight;
    //     console.log(`Card width: ${cardWidth}px, height: ${cardHeight}px`);
    //   },
    // },
  },

  mounted() {
    this.initGraph();

    window.addEventListener("resize", this.handleResize);

    // this.$nextTick(() => {
    //   const cardWidth = this.$refs.card.$el.offsetWidth;
    //   const cardHeight = this.$refs.card.$el.offsetHeight;
    //   console.log(`Card width: ${cardWidth}px, height: ${cardHeight}px`);
    // });

    this.$nextTick(() => {
      const businessDiv = document.getElementById("business");
      const businessWidth = businessDiv.offsetWidth;
      const businessHeight = businessDiv.offsetHeight;
      console.log(
        `Business div width: ${businessWidth}px, height: ${businessHeight}px`
      );
    });
  },

  beforeDestroy() {
    // 销毁画布
    this.graph.destroy();
    // 实例销毁
    this.graph = null;

    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      const businessDiv = document.getElementById("business");
      const businessWidth = businessDiv.offsetWidth;
      const businessHeight = businessDiv.offsetHeight;
      console.log(
        `Business div width--: ${businessWidth}px, height--: ${businessHeight}px`
      );
      this.graph.changeSize(businessWidth, businessHeight);
      // this.graph.zoom();

      // this.graph.fitView();
    },
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
      const container = document.getElementById("business");
      const width = container.scrollWidth || 1400;
      const height = container.scrollHeight || 450;
      console.log(width, height);
      this.graph = new G6.Graph({
        container: "business",
        width,
        height,
        fitView: true,
        // fitViewPadding: [20, 40, 50, 20],
        // fitViewPadding: 30,
        fitCenter:true,
        layout: {
          controlPoints: true,
          type: "dagre",
          rankdir: "LR", // 图的延展方向，节点对齐方式，可选： 'TB' | 'BT' | 'LR' | 'RL'
          nodeSize: 20,
          // ranker: "network-simplex", // 节点分层算法，可选：'tight-tree' 'longest-path' 'network-simplex'
          ranksep: 50, // 图的各个层次之间的间距
          nodesep: 20, // 同层各个节点之间的间距
        },
        defaultNode: {
          type: "image", // 类型
          size: 15, // 大小
          labelCfg: {
            position: "bottom",
            style: {
              fontSize: 8,
              fill: "black",
            },
          },
          // style: {
          //   fill: "#000", // 样式属性，元素的填充色
          //   stroke: "#888", // 样式属性，元素的描边色
          //   lineWidth: 3, // 节点描边粗细
          // },
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

      if (typeof window !== "undefined") {
        window.onresize = () => {
          if (!this.graph || this.graph.get("destroyed")) {
            return;
          }
          if (!container || !container.scrollWidth || !container.scrollHeight) {
            return;
          }
          console.log(container.scrollWidth, container.scrollHeight);
          this.graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
      }
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
