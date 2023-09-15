<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="topo">
          <div class="topo-container">
            <!-- 上半部分 -->
            <!-- <div class="topo-top"></div> -->

            <!-- 创建容器 -->
            <div id="container" style="background: #f6f9fc"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import G6 from "@antv/g6";

export default {
  name: "Topology1",

  mounted() {
    this.initGraph();
    // console.log(window.location);
  },

  methods: {
    initGraph() {
      const data = {
        nodes: [
          {
            id: "1",
            label: "PC端",
            cluster: "a",
          },
          {
            id: "2",
            label: "移动端",
            cluster: "a",
          },
          {
            id: "3",
            label: "防火墙设备模块",
            cluster: "b",
          },
          {
            id: "4",
            label: "交换机设备模块",
            cluster: "b",
          },
          {
            id: "5",
            label: "Web入口模块",
            cluster: "c",
          },
          {
            id: "6",
            label: "Kafka模块",
            cluster: "d",
          },
          {
            id: "7",
            label: "Zookeeper模块",
            cluster: "d",
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
            source: "4",
            target: "5",
          },
          {
            source: "5",
            target: "6",
          },
        ],
      };

      const colors = [
        "#BDD2FD",
        "#BDEFDB",
        "#C2C8D5",
        "#FBE5A2",
        "#F6C3B7",
        "#B6E3F5",
        "#D3C6EA",
        "#FFD8B8",
        "#AAD8D8",
        "#FFD6E7",
      ];

      const strokes = [
        "#5B8FF9",
        "#5AD8A6",
        "#5D7092",
        "#F6BD16",
        "#E8684A",
        "#6DC8EC",
        "#9270CA",
        "#FF9D4D",
        "#269A99",
        "#FF99C3",
      ];

      const container = document.getElementById("container");
      const width = container.scrollWidth;
      const height = container.scrollHeight || 780;

      const layout = {
        type: "dagre",
        direction: "TB", // 从上到下布局
        rankdir: "TB", // 可选，默认为图的中心
        nodeSep: 10, // 节点之间的间距
        rankSep: -10, // 层级之间的间距
        controlPoints: true,
      };

      const nodes = data.nodes;
      const clusterMap = new Map();
      let clusterId = 0;
      // 存储每个 cluster 对应的 x 坐标
      const coords = {};

      nodes.forEach((node) => {
        // cluster
        if (node.cluster && clusterMap.get(node.cluster) === undefined) {
          clusterMap.set(node.cluster, clusterId);
          clusterId++;
        }

        const cid = clusterMap.get(node.cluster);

        if (!node.style) {
          node.style = {};
        }

        node.style.fill = colors[cid % colors.length];
        node.style.stroke = strokes[cid % strokes.length];

        // 设置节点的 rank 和 x 坐标，每个 cluster 的节点 x 坐标相同
        node.rank = cid;
        coords[cid] = coords[cid] || {};
        coords[cid].x = coords[cid].x || 0;
        node.x = coords[cid].x;
        coords[cid].x += node.size + layout.nodeSep;
      });

      const graph = new G6.Graph({
        container: "container",
        width,
        height,
        modes: {
          // default: ["drag-canvas", "drag-node"],
        },
        layout,
        animate: true,
        // 默认节点的样式: 尺寸、填充色、描边线宽
        defaultNode: {
          size: 60,
          color: "#5B8FF9",
          style: {
            lineWidth: 2,
            fill: "#C6E5FF",
          },
          nodeStateStyles: {
            hover: {
              // keyShape 的状态样式
              fill: "#d3adf7",
            },
          },
          labelCfg: {
            position: "bottom", // 将标签文字放置在节点中心
            style: {
              fill: "black", // 设置标签文字颜色
              fontSize: 18, // 设置标签文字大小
            },
          },
        },
        defaultEdge: {
          // type: "cubic-horizontal",
          type: "cubic-vertical",
          style: {
            endArrow: {
              path: "M 0,0 L 8,4 L 8,-4 Z",
              fill: "#e2e2e2",
            },
          },
        },
      });

      // 将 coords 传递给坐标系
      // graph.coord().config({
      //   // 如果不设置 x，coord 默认会自动计算，此时节点的位置可能会发生变化
      //   x: coords,
      // });

      graph.data(data);
      graph.render();
    },
  },
};
</script>

<style lang="scss" scoped>
.topo {
  background-color: #fff;
  // padding: 20px;
  .topo-container {
    padding: 10px;
    height: 800px;
    background-image: linear-gradient(#f4f4f4 1px, transparent 0),
      linear-gradient(90deg, #f4f4f4 1px, transparent 0);
    background-size: 10px 10px;
    .topo-top {
      height: 170px;
      background-color: #fff;
      border: 2px solid #c8c8c8;
    }
  }
}
</style>
